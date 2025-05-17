const categorySelect = document.getElementById("category");
const form = document.getElementById("cardForm");
const dynamicFields = document.getElementById("dynamicFields");
const resultBox = document.getElementById("result");
let uuid;

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
  
  fields.forEach(f => {
    payload.category_data[f.id] = document.getElementById(f.id).value;
  });

  // Dummy-Wartezeit + Fake-Antwort für Demo
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
    //const base64image = data.base64_img;
    uuid = data.img_uuid;
    document.getElementById("cardImage").src = "data:image/png;base64," + data.base64_img;
    document.getElementById("downloadButton").style.display = "inline";
  } catch (error) {
    document.getElementById("cardText").textContent =
      "Fehler beim Abrufen der Karte. (Backend vermutlich noch nicht aktiv)";
    document.getElementById("cardImage").src = "";
  }
});


downloadButton.addEventListener("click", async function () {
  if (!uuid) {
    alert("Bitte zuerst eine Karte generieren.");
    return;
  }

  try {
    const response = await fetch(`http://localhost:8000/download/${uuid}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `card_${uuid}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } else {
      alert("Fehler beim Herunterladen der Karte.");
    }
  } catch (error) {
    alert("Fehler beim Herunterladen der Karte.");
  }
});
