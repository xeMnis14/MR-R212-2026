// TP4 — Fetch & API
// Complétez ce fichier en suivant les exercices du sujet.

// ===========================================
// TEMPS 1 — JSON local (exercices 1.1 à 1.3)
// ===========================================

const conteneur = document.querySelector('#projets-liste');

async function chargerEtAfficher() {
  // État : chargement
  conteneur.innerHTML = '<p class="loading">Chargement...</p>';

  try {
    const reponse = await fetch('./data.json');

    if (!reponse.ok) {
      throw new Error(`Erreur HTTP : ${reponse.status}`);
    }

    const donnees = await reponse.json();

    // État : succès
    afficherProjets(donnees.projets);

  } catch (erreur) {
    // État : erreur
    conteneur.innerHTML = `<p class="error">Impossible de charger les données : ${erreur.message}</p>`;
    console.error(erreur);
  }
}

function afficherProjets(projets) {
  conteneur.innerHTML = '';
  projets.forEach((projet) => {
    const carte = document.createElement('article');
    carte.classList.add('carte');
    carte.innerHTML = `
      <h3>${projet.titre}</h3>
      <p>${projet.description}</p>
      <p class="annee">${projet.annee}</p>
      <div class="tags">
        ${projet.tags.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
    `;
    conteneur.append(carte);
  });
}

// Lancer au chargement
chargerEtAfficher();

// ===========================================
// TEMPS 2 — API distante (exercices 2.1 à 2.3)
// ===========================================

const conteneur2 = document.querySelector('#api-liste');

async function chargerPays() {
  conteneur2.innerHTML = '<p class="loading">Chargement des pays...</p>';

  try {
    const reponse = await fetch('https://restcountries.com/v3.1/region/europe');
    const pays = await reponse.json();
    console.log(pays);        // Voir le tableau complet
    console.log(pays[0]);     // Voir le premier pays
    console.log(pays[0].name); // Explorer la structure

    conteneur2.innerHTML = '';
    pays.forEach((p) => {
      const carte = document.createElement('article');
      carte.classList.add('carte');
      carte.innerHTML = `
        <h3>${p.flag} ${p.name.common}</h3>
        <p>Capitale : ${p.capital ? p.capital[0] : 'Inconnue'}</p>
        <p>Population : ${p.population.toLocaleString()}</p>
      `;
      conteneur2.append(carte);
    });

  } catch (erreur) {
    conteneur2.innerHTML = '<p class="error">Impossible de charger les pays.</p>';
  }
}

chargerPays();

// ===========================================
// TEMPS 3 — Recherche + API (exercices 3.1 et 3.2)
// ===========================================

const input = document.querySelector('#recherche');
const conteneur3 = document.querySelector('#recherche-resultats')

input.addEventListener('input', async () => {
  const terme = input.value.trim();

  if (terme.length < 2) {
    conteneur3.innerHTML = '<p>Tapez au moins 2 caractères.</p>';
    return;
  }

  conteneur3.innerHTML = '<p class="loading">Recherche...</p>';

  try {
    const reponse = await fetch(`https://restcountries.com/v3.1/name/${terme}`);

    if (!reponse.ok) {
      conteneur3.innerHTML = '<p>Aucun résultat.</p>';
      return;
    }

    const pays = await reponse.json();
    console.log(pays);        // Voir le tableau complet
    console.log(pays[0]);     // Voir le premier pays
    console.log(pays[0].name); // Explorer la structure

    conteneur3.innerHTML = '';
    pays.forEach((p) => {
      const carte = document.createElement('article');
      carte.classList.add('carte');
      carte.innerHTML = `
        <h3>${p.flag} ${p.name.common}</h3>
        <p>Capitale : ${p.capital ? p.capital[0] : 'Inconnue'}</p>
        <p>Population : ${p.population.toLocaleString()}</p>
      `;
      conteneur3.append(carte);
    });

  } catch (erreur) {
    conteneur3.innerHTML = '<p class="error">Erreur de recherche.</p>';
  }
});

// ===========================================
// TEMPS 4 — Bonus (exercices 4.1 à 4.3)
// ===========================================