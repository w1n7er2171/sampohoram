let tripsData = [];

document.addEventListener("DOMContentLoaded", () => {
  fetch('/trips.json')
    .then(res => res.json())
    .then(data => {
      tripsData = data;
      renderTrips(data);
    });
});

function renderTrips(data) {
  const container = document.getElementById('trips');

  data.forEach(trip => {
    const card = document.createElement('div');
    card.className = 'trip-card';

    card.innerHTML = `
      <img src="${trip.coverImage}" />

      <div class="trip-info">
        <h3>${trip.title}</h3>
        <p>${trip.shortDescription}</p>
        <small>${trip.distanceKm} km • ${trip.durationDays} дні</small>
      </div>
    `;

    card.addEventListener('click', () => openModal(trip));

    container.appendChild(card);
  });
}

const modal = document.getElementById('modal');
const closeBtn = document.getElementById('close');

/* OPEN */
function openModal(trip) {
  modal.classList.add('show');

  document.getElementById('m-title').textContent = trip.title;
  document.getElementById('m-image').src = trip.coverImage;
  document.getElementById('m-desc').textContent = trip.fullDescription;
  document.getElementById('m-route').src = trip.routeImage;

  document.getElementById('m-stats').innerHTML = `
    <span>${trip.region}</span>
    <span>${trip.distanceKm} km</span>
    <span>${trip.durationDays} днів</span>
  `;

  const sources = document.getElementById('m-sources');
  sources.innerHTML = "";

  trip.sources.forEach(s => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="${s.url}" target="_blank">${s.title}</a>`;
    sources.appendChild(li);
  });
}

/* CLOSE BUTTON */
closeBtn.addEventListener('click', () => {
  modal.classList.remove('show');
});

/* CLICK OUTSIDE MODAL */
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('show');
  }
});
