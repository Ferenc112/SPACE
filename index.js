// API URL
const API_URL = 'http://api.open-notify.org/astros.json';

// DOM elemek
const foElem = document.getElementById('fo');
const kartyakElem = document.getElementById('kartyak');
const stationSelect = document.getElementById('station');

let allPeople = [];
let allCrafts = [];

stationSelect.addEventListener('change', () => {
  renderKartyak();
});

fetch(API_URL)
  .then(response => response.json())
  .then(data => {
    foElem.textContent = `Jelenleg ${data.number} fő tartózkodik az űrben.`;
    allPeople = data.people;
    allCrafts = [...new Set(data.people.map(p => p.craft))];
    // Szűrő feltöltése
    stationSelect.innerHTML = '';
    const optAll = document.createElement('option');
    optAll.value = '';
    optAll.textContent = 'Összes Űrállomás';
    stationSelect.appendChild(optAll);
    allCrafts.forEach(craft => {
      const opt = document.createElement('option');
      opt.value = craft;
      opt.textContent = craft;
      stationSelect.appendChild(opt);
    });
    renderKartyak();
  })
  .catch(err => {
    foElem.textContent = 'Hiba történt az adatok betöltésekor.';
  });

function renderKartyak() {
  const szurt = stationSelect.value ? allPeople.filter(p => p.craft === stationSelect.value) : allPeople;
  kartyakElem.innerHTML = '';
  szurt.forEach(person => {
    const kartya = document.createElement('div');
    kartya.className = 'kartya';
    kartya.innerHTML = `<strong>${person.name}</strong><br><span>Űrállomás: ${person.craft}</span>`;
    kartyakElem.appendChild(kartya);
  });
}
