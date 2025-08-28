async function simpleExample() {
  try {
    const characterId = document.getElementById('characterId').value;

    console.log('Input value received:', characterId);

    if (!characterId || characterId < 1 || characterId > 82) {
      showStatus('Please enter a valid character ID (1-82)', 'error');
      return;
    }

    showStatus('Generating DOCX report...', 'info');
    disableButton(true);

    const response = await fetch('/generate-docx', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ characterId: parseInt(characterId) }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `HTTP error! status: ${response.status}`
      );
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `character-${characterId}.docx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    showStatus('DOCX report successfully created and downloaded!', 'success');
  } catch (error) {
    console.error(error);
    showStatus(`Error: ${error.message}`, 'error');
  } finally {
    disableButton(false);
  }
}

function showStatus(message, type) {
  const statusElement = document.getElementById('status');
  statusElement.textContent = message;
  statusElement.className = `status ${type}`;
  statusElement.style.display = 'block';
}

function disableButton(disabled) {
  const button = document.getElementById('generateBtn');
  button.disabled = disabled;
  button.textContent = disabled ? 'Generating...' : 'Generate Report';
}
