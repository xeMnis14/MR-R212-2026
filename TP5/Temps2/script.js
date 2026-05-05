const mesProjets = [
    {
        id: 1,
        titre: "Site d'agence de voyage",
        description: "Mon tout premier site web réalisé en HTML et CSS. Mise en page classique et responsive.",
        tags: ["HTML", "CSS"]
    },
    {
        id: 2,
        titre: "Jeu du serpent (Snake)",
        description: "Le grand classique reproduit entièrement en JavaScript avec manipulation du DOM.",
        tags: ["JS"]
    },
    {
        id: 3,
        titre: "Application Météo",
        description: "Une petite application qui utilise fetch pour récupérer la météo locale via une API.",
        tags: ["JS", "HTML", "CSS"]
    },
    {
        id: 4,
        titre: "Portfolio Maquette",
        description: "L'intégration de la première maquette de mon portfolio avant de le refaire de zéro.",
        tags: ["HTML", "CSS"]
    }
];

const grille = document.querySelector('#grille-projets');
const boutonsFiltres = document.querySelectorAll('.filtre');

function afficherProjets(listeProjets) {
    grille.innerHTML = '';

    listeProjets.forEach(projet => {
        const carte = document.createElement('div');
        carte.className = 'carte-projet';

        let tagsHtml = '';
        projet.tags.forEach(tag => {
            tagsHtml += `<span>${tag}</span> `;
        });

        carte.innerHTML = `
      <h3>${projet.titre}</h3>
      <p>${projet.description.substring(0, 50)}...</p> <!-- Petite description coupée -->
      <div class="tags-container" style="margin-bottom: 10px; font-size: 0.8em; color: var(--bleu-mmi);">
        <strong>Tags:</strong> ${tagsHtml}
      </div>
    `;

        const btnDetail = document.createElement('button');
        btnDetail.textContent = 'Voir le détail';
        btnDetail.setAttribute('aria-expanded', 'false');

        btnDetail.addEventListener('click', () => {
            ouvrirModale(projet, btnDetail);
        });

        carte.appendChild(btnDetail);
        grille.appendChild(carte);
    });
}

boutonsFiltres.forEach(bouton => {
    bouton.addEventListener('click', (event) => {
        boutonsFiltres.forEach(btn => btn.classList.remove('actif'));
        event.currentTarget.classList.add('actif');

        const tagChoisi = event.currentTarget.getAttribute('data-tag');

        if (tagChoisi === 'tous') {
            afficherProjets(mesProjets);
        } else {
            const projetsFiltres = mesProjets.filter(projet => projet.tags.includes(tagChoisi));
            afficherProjets(projetsFiltres);
        }
    });
});

const modale = document.querySelector('#modale');
const modaleBody = document.querySelector('#modale-body');
const btnFermer = document.querySelector('.modale-fermer');
let boutonPrecedent = null;

function ouvrirModale(projet, boutonDeclencheur) {
    boutonPrecedent = boutonDeclencheur;
    boutonDeclencheur.setAttribute('aria-expanded', 'true');

    modaleBody.innerHTML = `
    <h3 id="modale-titre">${projet.titre}</h3>
    <p><strong>Description complète :</strong> <br> ${projet.description}</p>
    <p><em>Technologies utilisées : ${projet.tags.join(', ')}</em></p>
  `;

    modale.classList.add('modale-ouverte');
    modale.setAttribute('aria-hidden', 'false');

    btnFermer.focus();
}

function fermerModale() {
    modale.classList.remove('modale-ouverte');
    modale.setAttribute('aria-hidden', 'true');

    if (boutonPrecedent) {
        boutonPrecedent.setAttribute('aria-expanded', 'false');
        boutonPrecedent.focus();
    }
}

btnFermer.addEventListener('click', fermerModale);

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modale.classList.contains('modale-ouverte')) {
        fermerModale();
    }
});

afficherProjets(mesProjets);