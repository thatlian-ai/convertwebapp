import { NextRequest, NextResponse } from "next/server";

// Helper for Base64 URL decoding
function decodeBase64Url(str: string) {
    // Restore standard Base64 characters
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    // Pad with =
    while (str.length % 4) str += '=';
    // Decode
    return atob(str);
}

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    try {
        const { path: pathSegments } = await params;

        if (!pathSegments || pathSegments.length === 0) {
            return new NextResponse("Invalid proxy URL", { status: 400 });
        }

        // First segment is the Base64 encoded target base URL
        const encodedBaseUrl = pathSegments[0];
        let baseUrl = "";
        try {
            baseUrl = decodeBase64Url(encodedBaseUrl);
        } catch (e) {
            return new NextResponse("Invalid URL encoding", { status: 400 });
        }

        // The rest of the segments form the path on the target
        const targetPath = pathSegments.slice(1).join("/");

        // Construct the full target URL
        const searchParams = req.nextUrl.searchParams.toString();
        const queryString = searchParams ? `?${searchParams}` : "";

        // Ensure baseUrl doesn't have trailing slash if we're also adding path
        // But usually URL has protocol.
        const cleanBaseUrl = baseUrl.replace(/\/$/, "");
        const fullUrl = `${cleanBaseUrl}/${targetPath}${queryString}`;

        const response = await fetch(fullUrl, {
            method: req.method,
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
            },
        });

        const contentType = response.headers.get("content-type") || "";

        if (contentType.includes("text/html")) {
            let html = await response.text();

            // Use the encoded base URL for the proxy base path
            const proxyBasePath = `/api/proxy/${encodedBaseUrl}/`;

            // Inject Base tag and Mobile Viewport to force mobile rendering in simulator
            const viewportTag = `<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />`;
            const baseTag = `<base href="${proxyBasePath}" />`;
            const headerInjections = `${viewportTag}${baseTag}`;

            if (html.includes("<head>")) {
                html = html.replace("<head>", `<head>${headerInjections}`);
            } else if (html.includes("<html>")) {
                html = html.replace("<html>", `<html><head>${headerInjections}</head>`);
            } else {
                html = `${headerInjections}${html}`;
            }

            // Rewrite root-relative URLs (starting with / but not //)
            // Matches href="/...", src="/...", action="/...", poster="/...", component-url="/...", renderer-url="/..."
            // We use the proxyBasePath which already includes the trailing slash
            const proxyUrl = proxyBasePath;

            // Handle double quotes
            html = html.replace(/(href|src|action|poster|component-url|renderer-url)=(["'])\/(?!\/)/g, `$1=$2${proxyUrl}`);

            // Handle CSS url('/...') inside the HTML (e.g. inline styles)
            html = html.replace(/url\((["']?)\/(?!\/)/g, `url($1${proxyUrl}`);

            // Rewrite ABSOLUTE URLs that match the target base URL
            // Users might click links like <a href="https://vailamtahministry.com/about">
            // We need to rewrite these to /api/proxy/ENCODED_URL/about
            if (baseUrl) {
                // Remove trailing slash for regex
                const cleanBase = baseUrl.replace(/\/$/, "");
                // Escape regex special chars
                const escapedBase = cleanBase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

                // Rewrite https://target.com/foo to /api/proxy/[encodedBase]/foo
                // We need to be careful with the [encodedBase] part.
                // Actually, if we just point to the proxy root + relative path, it works because of the wildcard.
                // But the proxy wildcard expects /api/proxy/[ENC_BASE]/[PATH]

                // So replacer:
                // match: href="https://target.com/foo"
                // replace: href="/api/proxy/[ENC_BASE]/foo"

                const regex = new RegExp(`(href|src|action)=["']${escapedBase}(/[^"']*)?["']`, 'g');

                // We can't easily use string replace with a dynamic encoded param for *each* match if we wanted to change the base...
                // But the base is constant for this request (it's the 'encodedBaseUrl' param).
                // So we can just rewrite to the proxyBasePath + path

                // The regex matches the whole attribute: href="https://target.com/foo"
                // capture group 1: href/src
                // capture group 2: /foo (the path)

                html = html.replace(regex, (match, attr, path) => {
                    // path might be undefined if it was just the root
                    const safePath = path || "";
                    // Remove leading slash from path if proxyBasePath has it?
                    // proxyBasePath is /api/proxy/[ENC]/
                    // safePath is /foo
                    // Result: /api/proxy/[ENC]//foo (double slash).
                    // Let's strip one slash.
                    const relativePath = safePath.startsWith("/") ? safePath.slice(1) : safePath;
                    return `${attr}="${proxyBasePath}${relativePath}"`;
                });
            }

            // Inject navigation tracking script
            // This tells the Simulator parent when the URL changes so we can show/hide the Back button
            const navScript = `
            <script>
                (function() {
                    function notifyParent() {
                        try {
                            // Send the current href to the parent (Simulator)
                            window.parent.postMessage({ 
                                type: 'convert-webapp-nav-update', 
                                url: window.location.href 
                            }, '*');
                        } catch(e) { console.error(e); }
                    }
                    window.addEventListener('load', notifyParent);
                    window.addEventListener('popstate', notifyParent);
                    // Also notify immediately in case load already fired
                    notifyParent();
                })();
            </script>
            `;

            if (html.includes("</body>")) {
                html = html.replace("</body>", `${navScript}</body>`);
            } else {
                html += navScript;
            }

            return new NextResponse(html, {
                headers: {
                    "Content-Type": "text/html",
                    "Access-Control-Allow-Origin": "*",
                },
            });
        }

        const buffer = await response.arrayBuffer();
        return new NextResponse(buffer, {
            status: response.status,
            headers: {
                "Content-Type": contentType,
            }
        });

    } catch (error) {
        console.error("Proxy error:", error);
        return new NextResponse("Proxy Error", { status: 500 });
    }
}
