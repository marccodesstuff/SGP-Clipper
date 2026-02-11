(function () {
    "use strict";

    // ---------------------------------------------------------------------------
    // 1. Extract entity name & UEN from the page <title>
    //    Title format: "ENTITY_NAME (UEN) - Singapore Entity"
    // ---------------------------------------------------------------------------
    const titleText = document.title || "";
    const titleMatch = titleText.match(/^(.+?)\s*\(([^)]+)\)/);

    if (!titleMatch) {
        // Not a recognised entity page – do nothing.
        return;
    }

    const entityName = titleMatch[1].trim(); // e.g. "DASETI"
    const uen = titleMatch[2].trim();        // e.g. "53239839D"
    const copyText = `${entityName}\n${uen}`;

    // ---------------------------------------------------------------------------
    // 2. Locate the heading that displays the entity name
    // ---------------------------------------------------------------------------
    const heading = document.querySelector("h1");
    if (!heading) return;

    // Make sure the heading's parent can position the button correctly
    heading.style.display = "inline-flex";
    heading.style.alignItems = "center";
    heading.style.flexWrap = "wrap";

    // ---------------------------------------------------------------------------
    // 3. Create the copy button
    // ---------------------------------------------------------------------------
    const btn = document.createElement("button");
    btn.className = "sgpb-copy-btn";
    btn.title = "Copy name & UEN";
    btn.setAttribute("aria-label", "Copy entity name and UEN");

    // Clipboard SVG icon (16×16)
    btn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>`;

    // ---------------------------------------------------------------------------
    // 4. Copy-to-clipboard handler with visual feedback
    // ---------------------------------------------------------------------------
    btn.addEventListener("click", async function (e) {
        e.preventDefault();
        e.stopPropagation();

        try {
            await navigator.clipboard.writeText(copyText);
        } catch (_err) {
            // Fallback for older browsers / insecure contexts
            const ta = document.createElement("textarea");
            ta.value = copyText;
            ta.style.position = "fixed";
            ta.style.opacity = "0";
            document.body.appendChild(ta);
            ta.select();
            document.execCommand("copy");
            document.body.removeChild(ta);
        }

        // Visual feedback
        btn.classList.add("sgpb-copy-btn--copied");
        btn.setAttribute("data-tooltip", "Copied!");

        setTimeout(function () {
            btn.classList.remove("sgpb-copy-btn--copied");
            btn.removeAttribute("data-tooltip");
        }, 1500);
    });

    // ---------------------------------------------------------------------------
    // 5. Create the "Copy for Sheets" button
    // ---------------------------------------------------------------------------
    const sheetsBtn = document.createElement("button");
    sheetsBtn.className = "sgpb-copy-btn sgpb-copy-btn--sheets";
    sheetsBtn.title = "Copy for Google Sheets (URL · Name · UEN)";
    sheetsBtn.setAttribute("aria-label", "Copy URL, entity name and UEN for Google Sheets");

    // Grid/table SVG icon
    sheetsBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="3" y1="9" x2="21" y2="9"></line>
      <line x1="3" y1="15" x2="21" y2="15"></line>
      <line x1="9" y1="3" x2="9" y2="21"></line>
      <line x1="15" y1="3" x2="15" y2="21"></line>
    </svg>`;

    sheetsBtn.addEventListener("click", async function (e) {
        e.preventDefault();
        e.stopPropagation();

        const pageUrl = window.location.href;

        // HTML: a table row so Sheets puts each value in its own cell.
        // The URL is an <a> tag so Sheets keeps it as a clickable hyperlink.
        const htmlContent =
            `<table><tr>` +
            `<td><a href="${pageUrl}">${pageUrl}</a></td>` +
            `<td>${entityName}</td>` +
            `<td>${uen}</td>` +
            `</tr></table>`;

        // Plain text fallback: tab-separated so Sheets still splits columns.
        const plainContent = `${pageUrl}\t${entityName}\t${uen}`;

        try {
            await navigator.clipboard.write([
                new ClipboardItem({
                    "text/html": new Blob([htmlContent], { type: "text/html" }),
                    "text/plain": new Blob([plainContent], { type: "text/plain" }),
                }),
            ]);
        } catch (_err) {
            // Fallback: copy plain tab-separated text
            const ta = document.createElement("textarea");
            ta.value = plainContent;
            ta.style.position = "fixed";
            ta.style.opacity = "0";
            document.body.appendChild(ta);
            ta.select();
            document.execCommand("copy");
            document.body.removeChild(ta);
        }

        // Visual feedback
        sheetsBtn.classList.add("sgpb-copy-btn--copied");
        sheetsBtn.setAttribute("data-tooltip", "Copied!");

        setTimeout(function () {
            sheetsBtn.classList.remove("sgpb-copy-btn--copied");
            sheetsBtn.removeAttribute("data-tooltip");
        }, 1500);
    });

    // ---------------------------------------------------------------------------
    // 6. Insert both buttons after the heading text
    // ---------------------------------------------------------------------------
    heading.appendChild(btn);
    heading.appendChild(sheetsBtn);
})();
