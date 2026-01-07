// API URL
const API_URL = 'http://api.open-notify.org/astros.json';

// DOM elemek
const foElem = document.getElementById('fo');
const kartyakElem = document.getElementById('kartyak');

// Adatok lekérése és megjelenítése
fetch(API_URL)
  .then(response => response.json())
  .then(data => {
    // Hányan vannak az űrben
    foElem.textContent = `Jelenleg ${data.number} fő tartózkodik az űrben.`;

    // Kártyák létrehozása
    kartyakElem.innerHTML = '';
    data.people.forEach(person => {
      const kartya = document.createElement('div');
      kartya.className = 'kartya';
      kartya.innerHTML = `<strong>${person.name}</strong><br><span>Űrállomás: ${person.craft}</span>`;
      kartyakElem.appendChild(kartya);
    });
  })
  .catch(err => {
    foElem.textContent = 'Hiba történt az adatok betöltésekor.';
  });
