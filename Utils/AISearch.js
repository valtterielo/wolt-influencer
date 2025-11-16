// AI/AISearch.js

function log(...args) {
    console.log("[SearchAI]", ...args);
}

export async function semanticSearch(apiKey, query, videos) {
    try {
        const trimmed = query.trim();
        if (!trimmed) return videos.map(v => v.id);

        const payload = {
            user_query: trimmed,
            videos: videos.map(v => ({
                id: v.id,
                name: v.name,
                tags: v.tags || [],
            })),
        };

        log("Sending semantic search payload:", payload);

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gpt-4.1-mini",
                response_format: { type: "json_object" },
                messages: [
                    {
                        role: "system",
                        content: `
You are a semantic search selector.

### REQUIRED OUTPUT FORMAT
Return ONLY valid JSON:
{ "matches": ["1","3","7"] }

No explanation. No extra text. No markdown.

### YOUR TASK
Given:
- "user_query": search text
- "videos": array of { id, name, tags }

Determine which videos best match the meaning of the query, even if:
- tags do not include the literal term
- the match is based on cuisine similarity, food type, vibe, or style

### RULES
- Output must always be valid JSON.
- If no strong matches exist, return: { "matches": [] }
- Prefer videos whose *food style* or *vibe* matches query.
- The word "json" appears here to satisfy OpenAI validation.
`
                    },
                    {
                        role: "user",
                        content: JSON.stringify(payload),
                    },
                ],
            }),
        });

        let json;
        try {
            json = await response.json();
        } catch (err) {
            log("JSON decode error:", err);
            return videos.map(v => v.id);
        }

        if (json.error) {
            log("semantic search error:", json.error);
            return videos.map(v => v.id);
        }

        const message = json.choices?.[0]?.message;
        if (!message?.content) {
            log("message.content missing");
            return videos.map(v => v.id);
        }

        let parsed;
        try {
            parsed = JSON.parse(message.content);
        } catch (err) {
            log("Bad JSON in content:", message.content);
            return videos.map(v => v.id);
        }

        if (!parsed || !Array.isArray(parsed.matches)) {
            log("No valid matches — fallback");
            return videos.map(v => v.id);
        }

        return parsed.matches;

    } catch (err) {
        log("semanticSearch crashed:", err);
        return videos.map(v => v.id);
    }
}
