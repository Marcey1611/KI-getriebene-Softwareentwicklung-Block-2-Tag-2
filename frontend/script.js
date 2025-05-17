const categorySelect = document.getElementById("category");
const form = document.getElementById("cardForm");
const dynamicFields = document.getElementById("dynamicFields");
const resultBox = document.getElementById("result");

// Felder für jede Kategorie definieren
const fieldTemplates = {
  birthday: [
    { id: "name", label: "Name", type: "text" },
    { id: "age", label: "Alter", type: "number" },
    { id : "charakter", label: "Charaktereigenschaft", type: "text" },
    { id: "interests", label: "Hobbys/Interessen", type: "text" },
    { id: "style", label: "Stil (witzig, süß, etc.)", type: "text" },
    { id: "specials", label: "Sonderwünsche", type: "text" }
  ],
  wedding: [
    { id: "name1", label: "Name 1", type: "text" },
    { id: "interests1", label: "Hobbys/Interessen von 1", type: "text" },
    { id: "name2", label: "Name 2", type: "text" },
    { id: "interests2", label: "Hobbys/Interessen von 2", type: "text" },
    { id: "style", label: "Stil (romantisch, humorvoll)", type: "text" },
    { id: "specials", label: "Sonderwünsche", type: "text" }
  ],
  christmas: [
    { id: "name", label: "Name/Familie", type: "text" },
    { id: "style", label: "Stil (witzig, besinnlich)", type: "text" },
    { id: "specials", label: "Sonderwünsche", type: "text" }
  ],
  funeral: [
    { id: "name", label: "Familie/Name", type: "text" },
    { id: "style", label: "Stil (aufbauend, seelisch)", type: "text" },
    { id: "specials", label: "Sonderwünsche", type: "text" }
  ],
  birth: [
    { id: "name", label: "Name", type: "text" },
    { id: "familyName", label: "Familienname", type: "text" },
    { id: "wishes", label: "Wünsche (Gesundheit, Glück)", type: "text" },
    { id: "style", label: "Stil (witzig, besinnlich)", type: "text" },
    { id: "specials", label: "Sonderwünsche", type: "text" }
  ],
  thankyoucard: [
    { id: "name", label: "Name", type: "text" },
    { id: "style", label: "Stil (witzig, besinnlich)", type: "text" },
    { id: "specials", label: "Sonderwünsche", type: "text" }
  ],
  congrats: [
    { id: "name", label: "Name des Empfängers", type: "text" },
    { id: "reason", label: "Wofür wird gratuliert?", type: "text" },
    { id: "style", label: "Stil (herzhaft, cool, etc.)", type: "text" },
    { id: "specials", label: "Sonderwünsche", type: "text" }
  ],
  somethingelse: [
    { id: "name", label: "Name des Empfängers", type: "text" },
    { id: "reason", label: "Was ist der Anlass?", type: "text" },
    { id: "info", label: "Zusätzliche Infos", type: "text" },
    { id: "style", label: "Stil (herzhaft, cool, etc.)", type: "text" },
    { id: "specials", label: "Sonderwünsche", type: "text" }
  ]
};

// Dynamisches Erzeugen von Feldern
categorySelect.addEventListener("change", () => {
  const selected = categorySelect.value;
  dynamicFields.innerHTML = "";
  resultBox.classList.add("hidden");

  if (selected && fieldTemplates[selected]) {
    fieldTemplates[selected].forEach(field => {
      const label = document.createElement("label");
      label.setAttribute("for", field.id);
      label.textContent = field.label;

      const input = document.createElement("input");
      input.type = field.type;
      input.id = field.id;
      input.name = field.id;
      input.required = true;

      dynamicFields.appendChild(label);
      dynamicFields.appendChild(input);
    });

    form.classList.remove("hidden");
  } else {
    form.classList.add("hidden");
  }
});

// Form absenden
form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const selected = categorySelect.value;
  const fields = fieldTemplates[selected];

  // Werte sammeln
  const payload = { category: selected };
  fields.forEach(f => {
    payload[f.id] = document.getElementById(f.id).value;
  });

  // Dummy-Wartezeit + Fake-Antwort für Demo
  resultBox.classList.remove("hidden");
  document.getElementById("cardText").textContent = "KI denkt gerade nach...";
  document.getElementById("cardImage").src = "";

  try {
    const response = await fetch("http://localhost:8000/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    document.getElementById("cardText").textContent = data.text;
    document.getElementById("cardImage").src = data.image_url;
  } catch (error) {
    document.getElementById("cardText").textContent =
      "Fehler beim Abrufen der Karte. (Backend vermutlich noch nicht aktiv)";
    document.getElementById("cardImage").src = "";
  }
});
