import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { url } = body;

        if (!url) {
            return NextResponse.json({ valid: false, error: "URL is required" }, { status: 400 });
        }

        // Attempt to fetch the URL
        // We use a User-Agent that mimics a browser to avoid some bot blocks
        const response = await fetch(url, {
            method: "HEAD",
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            },
        });

        const isReachable = response.ok;

        // Check for embedding restrictions
        const xFrameOptions = response.headers.get("x-frame-options")?.toLowerCase();
        const csp = response.headers.get("content-security-policy")?.toLowerCase();

        let canEmbed = true;

        if (xFrameOptions === "deny" || xFrameOptions === "sameorigin") {
            canEmbed = false;
        }

        if (csp && (csp.includes("frame-ancestors 'none'") || csp.includes("frame-ancestors 'self'"))) {
            // Very basic check, parsing CSP is complex
            canEmbed = false;
        }

        return NextResponse.json({
            valid: isReachable,
            status: response.status,
            canEmbed,
            xFrameOptions,
        });
    } catch (error) {
        return NextResponse.json({
            valid: false,
            canEmbed: false,
            error: "Failed to fetch URL",
        }, { status: 200 }); // Return 200 so fontend can parse the JSON error
    }
}
