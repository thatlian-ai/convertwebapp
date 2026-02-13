import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { url } = body;

        if (!url) {
            return NextResponse.json({ valid: false, error: "URL is required" }, { status: 400 });
        }

        // Attempt to fetch the URL
        // We use GET instead of HEAD because some sites (like Google Sites/Ministry sites) 
        // don't send X-Frame-Options on HEAD requests.
        const response = await fetch(url, {
            method: "GET",
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

        if (xFrameOptions === "deny" || xFrameOptions === "sameorigin" || xFrameOptions === "allow-from") {
            canEmbed = false;
        }

        if (csp && (csp.includes("frame-ancestors") || csp.includes("frame-src"))) {
            // If frame-ancestors is present, it likely restricts embedding unless explicitly allowed.
            // Since we are running on localhost or a different domain, existing directives usually block us.
            canEmbed = false;
        }

        // Dedicated fix for the user's primary domain which is known to block embedding
        if (url.includes("vailamtahministry.com")) {
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
