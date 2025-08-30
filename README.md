# SWAPI Character Report Generator

Pure browser web app that generates DOCX reports for Star Wars characters using data from the SWAPI (no server required).

## Features

- Generate DOCX reports for any Star Wars character (IDs 1-82)
- Uses docxtemplater + pizzip in-browser for dynamic document generation
- No Node/Express server required
- Automatic file download after generation

## Project Structure

```
├── index.html         # Main web page with the form and "Generate Report" button
├── styles.css         # CSS styles for the interface
├── app.js             # Client-side JavaScript logic: fetch data, fill template, generate DOCX
├── template.docx      # DOCX template file with placeholders
├── package.json       # Optional: project metadata and npm scripts
├── utils.js           # Auxiliary helper functions (e.g. fetch with proxy, format dates)
└── README.md          # Project documentation
```

## Prerequisites

- Any modern browser

## Installation

1. Clone the repository or download the folder
2. No npm install is required

## Usage

1. Open `index.html` directly in your browser (double-click on Windows or open with any browser)
2. Upload your `template.docx`
3. Enter a character ID (1-82) and click **Generate report**
4. The DOCX file will be automatically downloaded

## Template Format

The `template.docx` file uses [docxtemplater syntax](https://docxtemplater.com/docs/tag-types/).

### Example

You can find the base template here: [Download template.docx](./template.docx?raw=true)

## Notes

- Works offline after initial load of CDN scripts
- If the browser blocks file access for local files, serve via a simple static server or enable local file access

## Deployment

### GitHub Pages

This project is configured for automatic deployment to GitHub Pages:

1. Push your code to a GitHub repository
2. Go to Settings → Pages
3. Select "GitHub Actions" as source
4. The app will be available at `https://yourusername.github.io/repository-name`

### Manual Deployment

For other static hosting services (Netlify, Vercel, etc.):

1. Upload all files to your hosting provider
2. Set `index.html` as the entry point
3. No build process required

## Live Demo

The project is available on GitHub Pages:  
👉 [SWAPI Character Report Generator](https://fahrenheit911.github.io/swapi-docx-report-browser/)
