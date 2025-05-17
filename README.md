### KI-getriebene Softwareentwicklung Block 2 Tag 2

# Grußinator

## 🎉 KI-Grußkarten Generator

Ein kreatives Web-Projekt, das auf Basis von Nutzereingaben automatisch eine witzige, emotionale oder stilvolle Grußkarte generiert – bestehend aus einem **Spruch (Text)** und einem **dazu passenden Bild**.

🚀 Vollständig umgesetzt mit:
- HTML/CSS/JavaScript (Frontend)
- Python (FastAPI Backend)
- XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX API (Textgenerierung)
- XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX API (Bildgenerierung)
- Docker & Docker Compose (Deployment)

---

## 🧠 Projektidee

Diese Anwendung erlaubt es Nutzer:innen, **eine Grußkarten-Kategorie** (z. B. Geburtstag, Hochzeit, Geburt, Beerdigung etc.) auszuwählen.  
Anschließend werden **kategoriespezifische Felder** angezeigt (Name, Alter, Hobbys etc.), die über ein Formular erfasst werden.

💡 Die Daten werden dann an das **Backend geschickt**, welches:
1. Einen passenden Textspruch generiert
2. Einen Prompt für eine Bild-KI erzeugt
3. Ein fertiges Grußkarten-Bild generiert

Das Ergebnis wird im **Frontend angezeigt**: Text & Bild einer personalisierten Grußkarte ✨

---

## 📁 Projektstruktur

```plaintext
.
├── backend/
│   ├── app.py                # FastAPI-Server (Text + Bild über KI)
│   └── requirements.txt      # Python-Abhängigkeiten
├── frontend/
│   ├── index.html            # Hauptseite mit Formular
│   ├── style.css             # Layout & Design
│   ├── script.js             # Form-Logik, API-Call
│   └── fieldTemplates.js     # Kategoriespezifische Eingabefelder
├── docker-compose.yml        # Multi-Service Setup
└── README.md
```

---

## 🤖 Verwendung von KI-Tools

|KI-Tool|Einsatzzweck|Einsatzintensität|
|-|-|-|
|ChatGPT-4o|Code-Generierung|Durchgängiger Einsatz zur Code-Generierung im Projekt|
|GitHub Copilot (Codex)|Code-Vervollständigung|Durchgängiger Einsatz zur Code-Vervollständigung im Projekt|