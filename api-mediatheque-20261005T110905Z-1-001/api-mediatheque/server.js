const express = require("express");
const app = express();
app.use(express.json());

// Données en mémoire : elles sont perdues à chaque redémarrage du serveur.
const auteurs = [
  { id: 1, nom: "Antoine de Saint-Exupéry", nationalite: "française" },
  { id: 2, nom: "Victor Hugo", nationalite: "française" },
  { id: 3, nom: "Agatha Christie", nationalite: "britannique" },
  { id: 4, nom: "Haruki Murakami", nationalite: "japonaise" },
];

let livres = [
  { id: 1, titre: "Le Petit Prince", genre: "conte", annee: 1943, disponible: true, auteurId: 1 },
  { id: 2, titre: "Vol de nuit", genre: "roman", annee: 1931, disponible: false, auteurId: 1 },
  { id: 3, titre: "Les Misérables", genre: "roman", annee: 1862, disponible: true, auteurId: 2 },
  { id: 4, titre: "Notre-Dame de Paris", genre: "roman", annee: 1831, disponible: false, auteurId: 2 },
  { id: 5, titre: "Les Contemplations", genre: "poésie", annee: 1856, disponible: true, auteurId: 2 },
  { id: 6, titre: "Le Crime de l'Orient-Express", genre: "policier", annee: 1934, disponible: true, auteurId: 3 },
  { id: 7, titre: "Ils étaient dix", genre: "policier", annee: 1939, disponible: true, auteurId: 3 },
  { id: 8, titre: "Mort sur le Nil", genre: "policier", annee: 1937, disponible: false, auteurId: 3 },
];

// Route d'exemple : la liste de tous les livres
app.get("/livres", (req, res) => {
  res.json(livres);
});

app.get("/livres/:id", (req, res) => {
 if (req.body.titre === undefined || req.body.titre === "") {
    return res.status(400).json({ erreur: "Le titre est obligatoire" });
  }
  if (req.body.genre === undefined || req.body.genre === "") {
    return res.status(400).json({ erreur: "Le genre est obligatoire" });
  }
  if (req.body.annee === undefined || req.body.annee === "") {
    return res.status(400).json({ erreur: "L'année est obligatoire" });
  }
  if (req.body.auteurId === undefined || req.body.auteurId === "") {
    return res.status(400).json({ erreur: "L'auteurId est obligatoire" });
  }
})
// POST /produits -> ajoute un produit envoye dans le corps de la requete
app.post("/livres", (req, res) => {
  if (!req.body.titre) {                          // donnee obligatoire manquante
    return res.status(400).json({ erreur: "Le titre est obligatoire" });
  }
  const nouveau = {
    id: livres.length + 1,
    titre: req.body.titre,
    auteurId: req.body.auteurId,
    disponible: true

  };
  livres.push(nouveau);                       // on ajoute au tableau
  res.status(201).json(nouveau);                // 201 = cree
});

app.delete("/livres/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = livres.findIndex((p) => p.id === id);
  if (index === -1) {                           // -1 = pas trouve
    return res.status(404).json({ erreur: "livre introuvable" });
  }
  livres.splice(index, 1);                    // retire 1 element a cette position
  res.status(200).json({ message: "livre supprime" });
});

app.listen(3000, () => {
  console.log("API de la médiathèque démarrée sur http://localhost:3000");
});
