const categorySelect = document.getElementById("category");
const form = document.getElementById("cardForm");
const dynamicFields = document.getElementById("dynamicFields");
const resultBox = document.getElementById("result");
let uuid;
const safeInputPattern = /^[a-zA-Z0-9 .,!?()_:;'\"-]*$/;

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
    category_data: {} // dynamischer Property-Name
  };
  
  //Whitelist-basierte Validierung
  fields.forEach(f => {
    const value = document.getElementById(f.id).value;

    if (!safeInputPattern.test(value)) {
      alert(`Ungültige Eingabe im Feld "${f.label}". Bitte nur Buchstaben, Zahlen und gängige Satzzeichen verwenden.`);
      throw new Error("Eingabe enthält unerlaubte Zeichen");
    }

    if (value.length > 250) {
      alert(`Zu lange Eingabe im Feld "${f.label}". Maximal 250 Zeichen erlaubt.`);
      throw new Error("Eingabe zu lang");
    }

    payload.category_data[f.id] = value;
  });

  // Dummy-Wartezeit
  resultBox.classList.remove("hidden");
  document.getElementById("cardText").textContent = "KI denkt gerade nach...";
  document.getElementById("cardImage").src = "";

  try {
    const response = await fetch("http://localhost:8000/generate-card", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    console.log(response.data)
    document.getElementById("cardText").textContent = data.prompt;
    document.getElementById("cardImage").src = "data:image/png;base64," + data.base64_img;
  } catch (error) {
    document.getElementById("cardText").textContent =
      "Fehler beim Abrufen der Karte. (Backend vermutlich noch nicht aktiv)";
    document.getElementById("cardImage").src = "";
  }
});