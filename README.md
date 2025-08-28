# SWAPI Character Report Generator

A web application that generates DOCX reports for Star Wars characters using data from the SWAPI (Star Wars API).

## Features

- Generate DOCX reports for any Star Wars character (IDs 1-82)
- Uses docx-templates for dynamic document generation
- Modern web interface with real-time status updates
- Automatic file download after generation

## Project Structure

```
├── index.html          # Main web interface
├── styles.css          # CSS styles
├── client.js           # Client-side JavaScript
├── server.js           # Express server
├── template.docx       # DOCX template file
├── package.json        # Dependencies and scripts
└── README.md           # This file
```

## Prerequisites

- Node.js (v14 or higher)
- npm

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd docx-templates-swapi
```

2. Install dependencies:

```bash
npm install
```

## Usage

1. Start the server:

```bash
npm start
```

2. Open your browser and navigate to:

```
http://localhost:3000
```

3. Enter a character ID (1-82) and click "Generate Report"

4. The DOCX file will be automatically downloaded

## API Endpoints

- `GET /` - Main application page
- `POST /generate-docx` - Generate DOCX report
  - Body: `{ "characterId": number }`
  - Returns: DOCX file for download
- `GET /health` - Server health check

## Template Format

The `template.docx` file uses docx-templates syntax with `+++` delimiters:

```
Name: +++INS character.name+++
Height: +++INS character.height+++
Mass: +++INS character.mass+++
```

## Dependencies

- **express** - Web server framework
- **docx-templates** - DOCX template engine
- **isomorphic-fetch** - HTTP client

## Development

To run the original simple example:

```bash
npm run dev
```

## License

MIT License
