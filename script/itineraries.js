fetch('data/cruise-dataset-template.json')
  .then(res => res.json())
  .then(db => {
    const marketsContainer = document.getElementById('markets');
    const brandsContainer = document.getElementById('brands');

    db.cruise_lines.forEach(line => {
      // --- If cruise line has regions, treat as "Markets" ---
      if (line.regions && Array.isArray(line.regions)) {
        line.regions.forEach(region => {
          const marketSection = document.createElement('div');
          marketSection.classList.add('market-section');

          // Market title
          const marketTitle = document.createElement('h2');
          marketTitle.textContent = `${region.region} (${line.name})`;
          marketTitle.classList.add('section-title');
          marketSection.appendChild(marketTitle);

          // Ships row
          const shipsRow = document.createElement('div');
          shipsRow.classList.add('ships-row');
          region.ships?.forEach(ship => {
            shipsRow.appendChild(createShipCard(ship));
          });
          marketSection.appendChild(shipsRow);

          // Contacts
          if (region.contacts) {
            marketSection.appendChild(createContacts(region.contacts));
          }

          marketsContainer.appendChild(marketSection);
        });
      }
      // --- If cruise line has no regions, treat as "Brand" ---
      else {
        const brandSection = document.createElement('div');
        brandSection.classList.add('brand-section');

        // Brand title
        const brandTitle = document.createElement('h2');
        brandTitle.textContent = line.name;
        brandTitle.classList.add('section-title');
        brandSection.appendChild(brandTitle);

        // Ships row
        const shipsRow = document.createElement('div');
        shipsRow.classList.add('ships-row');
        line.ships?.forEach(ship => {
          shipsRow.appendChild(createShipCard(ship));
        });
        brandSection.appendChild(shipsRow);

        // Contacts
        if (line.contacts) {
          brandSection.appendChild(createContacts(line.contacts));
        }

        brandsContainer.appendChild(brandSection);
      }
    });
  });

// Helper to create a ship card
function createShipCard(ship) {
  const card = document.createElement('div');
  card.classList.add('ship-card');
  card.innerHTML = `
    <h3>${ship.name}</h3>
    <p><b>Class:</b> ${ship.class || ''}</p>
    <p><b>Home Port:</b> ${ship.home_port || ''}</p>
    <p><b>Itinerary:</b> ${Array.isArray(ship.itinerary) ? ship.itinerary.join(', ') : (ship.itinerary || '')}</p>
  `;
  return card;
}

// Helper to create contacts list
function createContacts(contacts) {
  const container = document.createElement('div');
  container.classList.add('contacts');
  contacts.forEach(c => {
    const p = document.createElement('p');
    p.innerHTML = `<b>${c.country}:</b> ${c.phone || ''} ${c.email || ''} ${c.website || ''}`;
    container.appendChild(p);
  });
  return container;
}
