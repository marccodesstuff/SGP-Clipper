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

## Installation

This extension is not published on any store — install it manually using the steps below.

### 1. Download the extension

Clone this repository or download it as a ZIP and extract it:

```bash
git clone https://github.com/your-username/sgpb-copy-extension.git
```

### 2a. Chrome

1. Open `chrome://extensions/` (or **⋮ Menu → Extensions → Manage Extensions**)
2. Toggle **Developer mode** ON (top-right corner)
3. Click **Load unpacked** and select the extension folder
4. The extension "SGPBusiness Copy" should appear in your extensions list

To update after pulling new changes, click the **↻ reload** button on the extension card.

### 2b. Firefox

1. Open `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on…**
3. Select the `manifest.json` file inside the extension folder
4. The extension will be loaded for the current session (temporary add-ons are removed when Firefox closes)

> **Tip:** For permanent installation, package the extension as an `.xpi` file and install it via `about:addons`.

### 3. Verify it works

- Navigate to any company page on sgpbusiness.com, e.g. `https://www.sgpbusiness.com/company/Daseti`
- Two small buttons should appear next to the company name heading:
  - **📋 Clipboard icon** — copies name & UEN
  - **📊 Grid icon** — copies URL, name & UEN for Google Sheets

## Project Structure

```
sgpb-copy-extension/
├── manifest.json   # Extension config (Manifest V3, Chrome + Firefox)
├── content.js      # Content script — extracts data & injects buttons
├── styles.css      # Copy button styles & animations
├── reference/      # Reference HTML for development
└── README.md
```

## How It Works

1. The content script reads the page `<title>` (format: `ENTITY_NAME (UEN) - ...`) to extract the entity name and UEN
2. Two small buttons are injected next to the `<h1>` heading:
   - **Clipboard icon** — copies name + UEN as plain text
   - **Grid icon** — copies URL + name + UEN as an HTML table row so Google Sheets preserves the hyperlink and splits the values across columns
3. A brief green "Copied!" tooltip confirms each action

## License

MIT
