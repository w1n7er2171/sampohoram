let tripsData = [];

fetch('./data/trips.json')
  .then(res => res.json())
  .then(data => {
    tripsData = data;
    renderTrips(data);
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

function openModal(trip) {
  document.getElementById('modal').classList.remove('hidden');

  document.getElementById('m-title').textContent = trip.title;
  document.getElementById('m-image').src = trip.coverImage;
  document.getElementById('m-desc').textContent = trip.fullDescription;
  document.getElementById('m-route').src = trip.routeImage;

  document.getElementById('m-stats').innerHTML = `
    <p>${trip.distanceKm} km</p>
    <p>${trip.durationDays} днів</p>
    <p>${trip.region}</p>
  `;

  const sources = document.getElementById('m-sources');
  sources.innerHTML = "";

  trip.sources.forEach(s => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="${s.url}" target="_blank">${s.title}</a>`;
    sources.appendChild(li);
  });
}

document.getElementById('close').onclick = () => {
  document.getElementById('modal').classList.add('hidden');
};

window.onclick = (e) => {
  if (e.target.id === 'modal') {
    document.getElementById('modal').classList.add('hidden');
  }
};
