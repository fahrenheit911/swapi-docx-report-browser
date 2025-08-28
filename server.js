const express = require('express');
const { createReport } = require('docx-templates');
const fetch = require('isomorphic-fetch');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('.'));

app.post('/generate-docx', async (req, res) => {
  try {
    const { characterId } = req.body;

    console.log('Received request for character:', characterId);

    if (!characterId || characterId < 1 || characterId > 82) {
      return res.status(400).json({ error: 'Invalid character ID (1-82)' });
    }

    const response = await fetch(
      `https://swapi.info/api/people/${characterId}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const character = await response.json();

    const data = {
      character: {
        name: character.name,
        height: character.height,
        mass: character.mass,
        hair_color: character.hair_color,
        skin_color: character.skin_color,
        eye_color: character.eye_color,
        birth_year: character.birth_year,
        gender: character.gender,
        homeworld: character.homeworld,
        films: Array.isArray(character.films) ? character.films : [],
        species: Array.isArray(character.species) ? character.species : [],
        vehicles: Array.isArray(character.vehicles) ? character.vehicles : [],
        starships: Array.isArray(character.starships)
          ? character.starships
          : [],
        created: character.created,
        edited: character.edited,
        url: character.url,
      },
    };

    console.log('Character:', data.character.name);

    const template = fs.readFileSync('template.docx');

    const buffer = await createReport({
      template,
      data,
      cmdDelimiter: ['+++', '+++'],
      errorHandler: () => '',
      failFast: false,
    });

    const filename = `character-${characterId}-${data.character.name.replace(
      /\s+/g,
      '-'
    )}.docx`;
    fs.writeFileSync(filename, buffer);

    console.log('DOCX report saved:', filename);

    res.download(filename, filename, (err) => {
      if (err) {
        console.error('Error sending file:', err);
      }
      fs.unlinkSync(filename);
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Send POST request to /generate-docx to generate DOCX`);
});
