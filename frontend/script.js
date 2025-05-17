const categorySelect = document.getElementById("category");
const form = document.getElementById("cardForm");
const dynamicFields = document.getElementById("dynamicFields");
const resultBox = document.getElementById("result");

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
  const payload = {
    category: selected,
    [selected]: {} // dynamischer Property-Name
  };
  
  fields.forEach(f => {
    payload[selected][f.id] = document.getElementById(f.id).value;
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
