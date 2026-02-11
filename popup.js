(function () {
    "use strict";

    const textarea = document.getElementById("system-prompt");
    const saveBtn = document.getElementById("save-btn");
    const statusMsg = document.getElementById("status-msg");

    // ── Load saved prompt on open ────────────────────────────────────────
    chrome.storage.local.get("systemPrompt", function (data) {
        if (data.systemPrompt) {
            textarea.value = data.systemPrompt;
        }
    });

    // ── Save prompt ──────────────────────────────────────────────────────
    saveBtn.addEventListener("click", function () {
        const prompt = textarea.value.trim();

        chrome.storage.local.set({ systemPrompt: prompt }, function () {
            statusMsg.textContent = "✓ Saved!";

            setTimeout(function () {
                statusMsg.textContent = "";
            }, 2000);
        });
    });
})();
