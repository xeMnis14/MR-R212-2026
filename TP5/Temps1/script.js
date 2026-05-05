// ============================
// PROBLÈMES JS À TROUVER :
// - onclick inline (pas addEventListener) -> CORRIGÉ
// - getElementById au lieu de querySelector -> CORRIGÉ
// - element.style au lieu de classList -> CORRIGÉ
// - pas de gestion clavier (Escape, Tab) -> CORRIGÉ
// - pas d'attributs aria -> CORRIGÉ
// - données et affichage mélangés (toujours présent, mais hors scope actuel)
// - var au lieu de const -> CORRIGÉ
// ============================

const projets = [
  { id: 1, titre: "Site vitrine", description: "Un site pour une boulangerie locale. Design responsive et moderne.", tags: ["HTML", "CSS"] },
  { id: 2, titre: "Quiz interactif", description: "Application de quiz avec score et timer.", tags: ["JS", "HTML"] },
  { id: 3, titre: "Portfolio v1", description: "Ma première version de portfolio.", tags: ["HTML", "CSS"] },
  { id: 4, titre: "Dashboard météo", description: "Tableau de bord météo avec API Open Meteo.", tags: ["JS", "CSS"] },
  { id: 5, titre: "Blog tech", description: "Blog statique sur le développement web.", tags: ["HTML", "CSS", "JS"] },
  { id: 6, titre: "Jeu du pendu", description: "Jeu du pendu en JavaScript vanilla.", tags: ["JS"] }
];

function afficherProjets(liste) {
  const grille = document.querySelector('#grille');
  grille.innerHTML = '';
  
  for (let i = 0; i < liste.length; i++) {
    const p = liste[i];
    const carte = document.createElement('div');
    carte.className = 'carte-projet';
    
    // On injecte le texte
    carte.innerHTML = '<div class="carte-titre">' + p.titre + '</div>' +
      '<div class="carte-description">' + p.description + '</div>' +
      '<div class="carte-tags">' + p.tags.map(function (t) { return '<span>' + t + '</span>'; }).join('') + '</div>';
      
    // On crée le bouton séparément pour utiliser addEventListener au lieu du onclick inline
    const bouton = document.createElement('button');
    bouton.className = 'carte-bouton';
    bouton.setAttribute('aria-expanded', 'false');
    bouton.textContent = 'Voir détail';
    
    bouton.addEventListener('click', function() {
        ouvrirModale(p.id, this);
    });
    
    carte.appendChild(bouton);
    grille.appendChild(carte);
  }
}

function filtrer(event, tag) {
  const filtres = document.querySelectorAll('.filtre');
  for (let i = 0; i < filtres.length; i++) {
    filtres[i].classList.remove('actif');
  }
  
  if (event && event.currentTarget) {
    event.currentTarget.classList.add('actif');
  }

  if (tag === 'tous') {
    afficherProjets(projets);
  } else {
    const filtresProjets = projets.filter(function (p) { return p.tags.indexOf(tag) !== -1; });
    afficherProjets(filtresProjets);
  }
}

let boutonOuvertureActif = null;

function ouvrirModale(id, bouton) {
  let projet = null;
  for (let i = 0; i < projets.length; i++) {
    if (projets[i].id === id) {
      projet = projets[i];
      break;
    }
  }
  if (!projet) return;

  document.querySelector('#modale-body').innerHTML =
    '<h2>' + projet.titre + '</h2>' +
    '<p>' + projet.description + '</p>' +
    '<p>Tags : ' + projet.tags.join(', ') + '</p>';

  const modale = document.querySelector('#modale');
  
  modale.classList.add('modale-ouverte');
  modale.setAttribute('aria-hidden', 'false');

  if (bouton) {
    boutonOuvertureActif = bouton;
    bouton.setAttribute('aria-expanded', 'true');
  }

  const modaleFermer = document.querySelector('.modale-fermer');
  if (modaleFermer) {
      modaleFermer.focus();
  }
}

function fermerModale() {
  const modale = document.querySelector('#modale');
  
  modale.classList.remove('modale-ouverte');
  modale.setAttribute('aria-hidden', 'true');

  if (boutonOuvertureActif) {
    boutonOuvertureActif.setAttribute('aria-expanded', 'false');
    boutonOuvertureActif.focus();
  }
}

// Affichage initial
afficherProjets(projets);


// ============================
// INITIALISATION DES ÉVÉNEMENTS (Remplacement des onclick inline)
// ============================

// Gérer les clics sur les filtres sans utiliser l'attribut onclick du HTML
const elementsFiltres = document.querySelectorAll('.filtre');
for (let i = 0; i < elementsFiltres.length; i++) {
    elementsFiltres[i].addEventListener('click', function(e) {
        // On récupère le texte du filtre pour savoir quel tag utiliser
        let tag = this.textContent.trim();
        if (tag === 'Tous') tag = 'tous';
        filtrer(e, tag);
    });
}

// Gérer le clic sur le bouton fermer de la modale
const btnFermerModale = document.querySelector('.modale-fermer');
if (btnFermerModale) {
    btnFermerModale.addEventListener('click', fermerModale);
}


// ============================
// AJOUTS POUR L'ACCESSIBILITÉ (Clavier & ARIA)
// ============================

const modaleInit = document.querySelector('#modale');
modaleInit.setAttribute('aria-hidden', 'true');

document.addEventListener('keydown', (event) => {
  const modale = document.querySelector('#modale');
  if (event.key === 'Escape' && modale.classList.contains('modale-ouverte')) {
    fermerModale();
  }
});

function initialiserNavigationClavier() {
  const filtres = document.querySelectorAll('.filtre');
  for (let i = 0; i < filtres.length; i++) {
    filtres[i].setAttribute('tabindex', '0');
    filtres[i].addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        event.target.click(); // Déclenche notre EventListener 'click'
      }
    });
  }

  const btnFermer = document.querySelector('.modale-fermer');
  if (btnFermer) {
    btnFermer.setAttribute('tabindex', '0');
    btnFermer.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        fermerModale();
      }
    });
  }
}

initialiserNavigationClavier();