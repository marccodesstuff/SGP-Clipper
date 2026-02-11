# SGP Clipper

> A browser extension for **Chrome** and **Firefox** that adds quick-copy buttons to [sgpbusiness.com](https://www.sgpbusiness.com) company pages — grab the entity name, UEN, and page URL in one click.

## Features

### 📋 Copy Name & UEN
Copies the business legal name and UEN on separate lines:
```
DASETI
53239839D
```

### 📊 Copy for Google Sheets
Copies the **URL** (as a clickable link), **entity name**, and **UEN** so that pasting into Google Sheets fills 3 columns:

| URL | Entity Name | UEN |
|-----|-------------|-----|
| [https://www.sgpbusiness.com/company/Daseti](https://www.sgpbusiness.com/company/Daseti) | DASETI | 53239839D |

### 📝 Copy with System Prompt
The extension allows you to combine the entity data with a custom **System Prompt** and optional additional links. This is ideal for quickly generating formatted descriptions or research notes.

1. Set your **System Prompt** in the extension settings (click the extension icon).
2. On a company page, use the **Document icon** button.
3. (Optional) Paste additional links into the text field next to the button to include them in the copy.

## Settings & Customization

Click the extension icon in your browser toolbar to open the **SGP Clipper Settings**. Here you can:
- **Save a System Prompt**: A persistent text block that will be prepended to your copies when using the "Copy with Prompt" feature.
- **Persistent Storage**: Your prompt is saved locally in your browser and persists across sessions.

## Installation

This extension is not published on any store — install it manually using the steps below.

### 1. Download the extension

Clone this repository or download it as a ZIP and extract it:

```bash
git clone https://github.com/marccodesstuff/SGP-Clipper.git
```

### 2a. Chrome

1. Open `chrome://extensions/` (or **⋮ Menu → Extensions → Manage Extensions**)
2. Toggle **Developer mode** ON (top-right corner)
3. Click **Load unpacked** and select the `SGP-Clipper` folder
4. The extension **"SGPBusiness Copy"** should appear in your extensions list

To update after pulling new changes, click the **↻ reload** button on the extension card.

### 2b. Firefox

1. Open `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on…**
3. Select the `manifest.json` file inside the `SGP-Clipper` folder
4. The extension will be loaded for the current session (temporary add-ons are removed when Firefox closes)

> **Tip:** For permanent installation, package the extension as an `.xpi` file and install it via `about:addons`.

### 3. Verify it works

- Navigate to any company page on sgpbusiness.com, e.g. `https://www.sgpbusiness.com/company/Daseti`
- You will see the copy tools injected below the main entity heading:
  - **📋 Clipboard icon** — copies name & UEN
  - **📊 Grid icon** — copies URL, name & UEN for Google Sheets
  - **📄 Document icon + Link field** — copies prompt + data + links

## Project Structure

```
SGP-Clipper/
├── manifest.json   # Extension config (Manifest V3, Chrome + Firefox)
├── content.js      # Content script — extracts data & injects UI
├── styles.css      # UI styles & animations
├── popup.html      # Settings popup UI
├── popup.js        # Settings logic & storage handling
├── popup.css       # Settings styling
├── RELEASE.md      # Version history & release notes
├── reference/      # Reference HTML for development
└── README.md
```

## How It Works

1. **Extraction**: The content script reads the page `<title>` and `<h1>` to extract the entity name and UEN.
2. **UI Injection**: Functional buttons are injected directly into the page DOM.
3. **Storage**: The extension uses `chrome.storage.local` (or `browser.storage.local`) to save your custom system prompt.
4. **Clipboard**: Uses the `Clipboard API` to write formatted text (plain text and HTML).
