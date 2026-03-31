<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Translator App</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f4f4f4;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }
    .container {
      background: white;
      padding: 20px;
      border-radius: 12px;
      width: 400px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }
    h2 { text-align: center; }
    textarea {
      width: 100%;
      height: 100px;
      margin-bottom: 10px;
      padding: 10px;
      border-radius: 8px;
      border: 1px solid #ccc;
      resize: none;
    }
    select, button {
      width: 100%;
      padding: 10px;
      margin-top: 5px;
      border-radius: 8px;
      border: 1px solid #ccc;
    }
    button {
      background: #4CAF50;
      color: white;
      cursor: pointer;
    }
    button:hover {
      background: #45a049;
    }
    .output {
      margin-top: 15px;
      padding: 10px;
      background: #f9f9f9;
      border-radius: 8px;
      min-height: 50px;
    }
    .actions {
      display: flex;
      gap: 10px;
      margin-top: 10px;
    }
    .actions button {
      flex: 1;
      background: #007BFF;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Language Translator</h2>

    <textarea id="inputText" placeholder="Enter text..."></textarea>

    <select id="sourceLang">
      <option value="en">English</option>
      <option value="ur">Urdu</option>
      <option value="es">Spanish</option>
      <option value="fr">French</option>
    </select>

    <select id="targetLang">
      <option value="ur">Urdu</option>
      <option value="en">English</option>
      <option value="es">Spanish</option>
      <option value="fr">French</option>
    </select>

    <button onclick="translateText()">Translate</button>

    <div class="output" id="outputText">Translated text will appear here...</div>

    <div class="actions">
      <button onclick="copyText()">Copy</button>
      <button onclick="speakText()">Speak</button>
    </div>
  </div>

  <script>
    async function translateText() {
      const text = document.getElementById('inputText').value;
      const source = document.getElementById('sourceLang').value;
      const target = document.getElementById('targetLang').value;

      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        document.getElementById('outputText').innerText = data.responseData.translatedText;
      } catch (error) {
        document.getElementById('outputText').innerText = 'Error translating text';
      }
    }

    function copyText() {
      const text = document.getElementById('outputText').innerText;
      navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    }

    function speakText() {
      const text = document.getElementById('outputText').innerText;
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = document.getElementById('targetLang').value;
      window.speechSynthesis.speak(speech);
    }
  </script>
</body>
</html>
