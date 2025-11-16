import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system/legacy";

function log(...args) {
    console.log("[AI]", ...args);
}

async function resolveFileUri(uri) {
    if (typeof uri === "string") {
        log("resolveFileUri: Using string path:", uri);
        return uri;
    }

    log("resolveFileUri: Resolving module asset...");
    const asset = await Asset.fromModule(uri).downloadAsync();

    log("resolveFileUri: Local URI:", asset.localUri);

    return asset.localUri;
}

async function ensureAssetFullyDownloaded(uri) {
    const asset = Asset.fromModule(uri);
    await asset.downloadAsync();

    // Verify file exists and has size (> 0 bytes)
    const info = await FileSystem.getInfoAsync(asset.localUri);
    console.log("[AI] File size:", info.size);

    if (!info.exists || info.size < 5000) {
        throw new Error("Downloaded video is too small — asset failed to load.");
    }

    return asset.localUri;
}

//use whisper to turn audio to text
export async function transcribeVideo(apiKey, fileUri) {
    log("=== Starting transcription ===");

    const realPath = await ensureAssetFullyDownloaded(fileUri);
    log("Real path:", realPath);

    const formData = new FormData();
    formData.append("file", {
        uri: realPath,
        name: "video.mp4",
        type: "video/mp4",
    });
    formData.append("model", "gpt-4o-transcribe");

    let response;
    try {
        response = await fetch(
            "https://api.openai.com/v1/audio/transcriptions",
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "multipart/form-data",
                },
                body: formData,
            }
        );
    } catch (err) {
        log("Network FAILURE before any response:", err);
        throw err;
    }

    const raw = await response.text();
    log("HTTP status:", response.status);
    log("HTTP body:", raw);

    if (!raw || raw.trim().length === 0) {
        throw new Error("OpenAI returned an EMPTY BODY");
    }

    let json;
    try {
        json = JSON.parse(raw);
    } catch (err) {
        throw new Error("OpenAI returned NON-JSON body:\n" + raw);
    }

    if (json.error) {
        throw new Error(json.error.message);
    }

    return json.text;
}

//tag extraction
export async function extractTags(apiKey, transcript) {
    log("=== Starting tag extraction ===");
    log("Transcript preview:", transcript.slice(0, 80) + "...");

    let response, json;

    try {
        response = await fetch(
            "https://api.openai.com/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "gpt-4.1-mini",
                    response_format: { type: "json_object" },
                    messages: [
                        {
                            role: "system",
                            content: `Extract descriptive restaurant tags from this text. 
Return JSON as: { "tags": ["tag1", "tag2", ...] }
Rules:
- Max 12 tags
- Minimum 6 tags
- Single-word tags only
- Focus on food category, dishes and atmosphere as most important
- Lowercase
- No duplicates
- Ordered by relevance
- Dont come up with words, use the ones in the given text or synonyms.`,
                        },
                        {
                            role: "user",
                            content: transcript,
                        },
                    ],
                }),
            }
        );

        json = await response.json();
    } catch (err) {
        log("Tag extraction network/JSON error:", err);
        throw new Error("Tag extraction request failed: " + err.message);
    }

    if (json.error) {
        log("Tag extraction API error:", json.error);
        throw new Error(json.error.message);
    }

    const assistant = json.choices?.[0]?.message;
    log("Raw GPT message:", assistant);

    // GPT returned JSON as a string → parse it
    let parsed;
    try {
        parsed = JSON.parse(assistant.content);
    } catch (err) {
        log("Failed to parse GPT JSON:", err);
        parsed = {};
    }

    const tags = parsed.tags || [];

    log("Extracted tags:", tags);

    return tags;
}

export async function analyzeVideoForTags(apiKey, video) {
    log("=== AI Pipeline START ===");
    log("Analyzing video:", video.name);

    const transcript = await transcribeVideo(apiKey, video.uri);

    const tags = await extractTags(apiKey, transcript);

    log("=== AI Pipeline COMPLETE ===");
    log("Final tags:", tags);

    return tags;
}
