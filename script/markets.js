fetch('data/cruise-dataset-template.json')
  .then(r => r.json())
  .then(db => {
    const marketsContainer = document.getElementById('markets');

    db.cruise_lines.forEach(line => {
      if (!Array.isArray(line.regions)) return;

      line.regions.forEach(region => {
        // Section wrapper
        const marketSection = document.createElement('div');
        marketSection.classList.add('market-section');

        // Market title
        const marketTitle = document.createElement('h2');
        marketTitle.textContent = `${region.region} (${line.name})`;
        marketSection.appendChild(marketTitle);

        // Row container for ships
        const shipsRow = document.createElement('div');
        shipsRow.classList.add('ships-row');

        (region.ships || []).forEach(ship => {
          const card = document.createElement('div');
          card.classList.add('ship-card');
          card.innerHTML = `
            <h3>${ship.name}</h3>
            <p><b>Class:</b> ${ship.class || ''}</p>
            <p><b>Home Port:</b> ${ship.home_port || ''}</p>
            <p><b>Itinerary:</b> ${
              Array.isArray(ship.itinerary) ? ship.itinerary.join(', ') : (ship.itinerary || '')
            }</p>
            <p><b>Price/Rates:</b> ${ship.price_or_rates || ''}</p>
          `;
          shipsRow.appendChild(card);
        });

        // Append to section
        marketSection.appendChild(shipsRow);
        marketsContainer.appendChild(marketSection);
      });
    });
  })
  .catch(err => console.error('Failed to load dataset:', err));
