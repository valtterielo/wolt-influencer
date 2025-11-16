// AI/AISearch.js

function log(...args) {
    console.log("[SearchAI]", ...args);
}

export async function semanticSearch(apiKey, query, videos) {
    const trimmed = query.trim();
    if (!trimmed) {
        // No query -> everything matches
        return videos.map((v) => v.id);
    }

    const payload = {
        user_query: trimmed,
        videos: videos.map((v) => ({
            id: v.id,
            name: v.name,
            tags: v.tags || [],
        })),
    };

    log("Sending semantic search payload:", payload);

    let response;
    try {
        response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gpt-4.1-mini",
                // Don't use response_format to keep it simple
                messages: [
                    {
                        role: "system",
                        content: `
You help match a user search query to restaurant review videos.

You will receive JSON with:
- "user_query": what the user typed
- "videos": array of { id, name, tags }

Return ONLY a JSON object like:
{ "matches": ["1", "3"] }

"matches" must be an array of video IDs (strings) that best match the query,
even if the exact word doesn't appear in the tags.

IMPORTANT: Respond with valid JSON only, no explanation, no extra text.
                        `,
                    },
                    {
                        role: "user",
                        content: JSON.stringify(payload),
                    },
                ],
            }),
        });
    } catch (err) {
        log("Network error in semanticSearch:", err);
        throw err;
    }

    let json;
    try {
        json = await response.json();
    } catch (err) {
        log("Failed to parse semanticSearch JSON:", err);
        throw new Error("Invalid JSON from OpenAI");
    }

    if (json.error) {
        log("semantic search error:", json.error);
        throw new Error(json.error.message);
    }

    const message = json.choices?.[0]?.message;
    log("Raw AI message:", message);

    // IMPORTANT: parse the JSON string in message.content
    let parsed;
    try {
        parsed = JSON.parse(message.content);
    } catch (err) {
        log("Failed to parse message.content JSON:", err, "content was:", message.content);
        throw new Error("AI returned non-JSON content");
    }

    const matches = parsed.matches || [];
    log("Parsed matches:", matches);

    return matches;
}
