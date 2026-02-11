# SGP Clipper

> A Chrome extension that adds quick-copy buttons to [sgpbusiness.com](https://www.sgpbusiness.com) company pages — grab the entity name, UEN, and page URL in one click.

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

Since this extension is not published on the Chrome Web Store, it must be installed manually in **Developer Mode**.

### 1. Download the extension

Clone this repository or download it as a ZIP and extract it:

```bash
git clone https://github.com/your-username/sgpb-copy-extension.git
```

### 2. Open Chrome Extensions page

- Open Google Chrome
- Type `chrome://extensions/` in the address bar and press Enter
- Alternatively, go to **⋮ Menu → Extensions → Manage Extensions**

### 3. Enable Developer Mode

- In the top-right corner of the Extensions page, toggle **Developer mode** to **ON**
- Three new buttons will appear: _Load unpacked_, _Pack extension_, and _Update_

### 4. Load the extension

- Click **Load unpacked**
- Navigate to the `sgpb-copy-extension` folder and select it
- The extension "SGPBusiness Copy" should now appear in your extensions list

### 5. Verify it works

- Navigate to any company page on sgpbusiness.com, e.g. `https://www.sgpbusiness.com/company/Daseti`
- Two small buttons should appear next to the company name heading:
  - **📋 Clipboard icon** — copies name & UEN
  - **📊 Grid icon** — copies URL, name & UEN for Google Sheets

### Updating the extension

After pulling new changes or editing the code, go back to `chrome://extensions/` and click the **↻ reload** button on the extension card to pick up the latest version.

## Project Structure

```
sgpb-copy-extension/
├── manifest.json   # Chrome extension config (Manifest V3)
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
