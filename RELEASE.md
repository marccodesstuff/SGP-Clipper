# 🚀 SGP Clipper v1.0

The first release of **SGP Clipper** — a Chrome extension for quickly copying business entity information from [sgpbusiness.com](https://www.sgpbusiness.com).

---

## ✨ Features

### 📋 Copy Name & UEN
One-click copy of the business legal name and UEN, formatted on separate lines — ready to paste anywhere.

```
DASETI
53239839D
```

### 📊 Copy for Google Sheets
Copies the **page URL**, **entity name**, and **UEN** in a Sheets-friendly format. Pasting into Google Sheets fills **3 columns automatically**:

| URL (clickable link) | Entity Name | UEN |
|---|---|---|
| https://www.sgpbusiness.com/company/Daseti | DASETI | 53239839D |

- The URL is preserved as a **clickable hyperlink**
- Entity name and UEN paste as plain text

### 🎯 Visual Feedback
A green **"Copied!"** tooltip confirms every copy action — no guessing whether it worked.

---

## 📦 Installation

This is an unpacked Chrome extension. See the [README](README.md) for full installation instructions.

> **Quick start:** `chrome://extensions/` → Developer Mode ON → Load unpacked → select this folder

---

## 🛠 Technical Details

- **Manifest V3** Chrome extension
- Runs only on `sgpbusiness.com/company/*` pages
- No external dependencies
- No data collection or network requests
