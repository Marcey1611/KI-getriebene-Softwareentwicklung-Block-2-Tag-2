document.getElementById("cardForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const occasion = document.getElementById("occasion").value;
  const interests = document.getElementById("interests").value;
  const tone = document.getElementById("tone").value;

  const response = await fetch("http://localhost:8000/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      occasion,
      interests,
      tone
    })
  });

  const data = await response.json();

  document.getElementById("cardText").textContent = data.text;
  document.getElementById("cardImage").src = data.image_url;
  document.getElementById("result").classList.remove("hidden");
});
