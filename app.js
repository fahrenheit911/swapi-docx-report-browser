async function generate() {
  const docs = document.getElementById('doc');
  const characterId = document.getElementById('characterId').value;

  if (!docs.files.length) {
    alert('Please upload a DOCX template!');
    return;
  }

  if (!characterId) {
    alert('Please enter character ID!');
    return;
  }

  try {
    const character = await fetchCharacterWithFallback(characterId);

    const reader = new FileReader();
    reader.readAsBinaryString(docs.files.item(0));

    reader.onload = function (evt) {
      try {
        const content = evt.target.result;
        const zip = new PizZip(content);
        const doc = new window.docxtemplater(zip, {
          paragraphLoop: true,
          linebreaks: true,
        });

        const films = Array.isArray(character.films) ? character.films : [];
        const species = Array.isArray(character.species)
          ? character.species
          : [];
        const vehicles = Array.isArray(character.vehicles)
          ? character.vehicles
          : [];
        const starships = Array.isArray(character.starships)
          ? character.starships
          : [];

        doc.render({
          name: character.name,
          height: character.height,
          mass: character.mass,
          hair_color: character.hair_color,
          skin_color: character.skin_color,
          eye_color: character.eye_color,
          birth_year: character.birth_year,
          gender: character.gender,
          homeworld: character.homeworld,
          films,
          species,
          vehicles,
          starships,
          created: formatDate(character.created),
          edited: formatDate(character.edited),
        });

        saveAs(doc.toBlob(), `character-${characterId}.docx`);
      } catch (e) {
        console.error('DOCX render error', e);
        alert('Failed to render DOCX. Check template placeholders.');
      }
    };
  } catch (e) {
    console.error('Fetch error', e);
    alert('Failed to fetch character. Try again later.');
  }
}

async function fetchCharacterWithFallback(characterId) {
  const endpoints = [
    `https://swapi.py4e.com/api/people/${characterId}/`,
    `https://swapi.dev/api/people/${characterId}/`,
    `https://cors.isomorphic-git.org/https://swapi.dev/api/people/${characterId}/`,
  ];
  let lastError = null;
  for (const url of endpoints) {
    try {
      const response = await fetch(url, {
        cache: 'no-store',
        redirect: 'follow',
        mode: 'cors',
      });
      if (response.ok) {
        const data = await response.json();

        const homeworldData = await fetchJsonWithProxy(data.homeworld).catch(
          () => null
        );
        const homeworldName =
          homeworldData && homeworldData.name ? homeworldData.name : '';

        const filmTitles = await mapUrlsToTitles(data.films);

        const [speciesNames, vehicleNames, starshipNames] = await Promise.all([
          mapUrlsToNames(data.species),
          mapUrlsToNames(data.vehicles),
          mapUrlsToNames(data.starships),
        ]);

        return {
          ...data,
          homeworld: homeworldName,
          films: filmTitles,
          species: speciesNames,
          vehicles: vehicleNames,
          starships: starshipNames,
        };
      }
      lastError = new Error(`HTTP ${response.status}`);
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError || new Error('Unknown fetch error');
}
