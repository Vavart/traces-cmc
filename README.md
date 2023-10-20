# Traces CMC (Computer Mediated Communication)

Création d'un modèle générique de traces de forum de discussion et affichage de ces traces dans une interface web.

## Prérequis
- PHP 7.2 (ou supérieur) si vous voulez importer la base de données dans PHPMyAdmin
- Node 12.16.1 (ou supérieur) si vous voulez lancer le script de génération des traces

## Installation
- Cloner le projet
- Installez les dépendances : `npm install`
- Importer la base de données dans PHPMyAdmin (fichier `data/traceforum.sql`)
- Créer un fichier `.env` basé sur le `.env.template` et renseigner vos informations de connexion à la base de données

## Génération des traces
- Lancer le script de mapping de la base de données en fichier JSON : `node scripts/mapping.mjs`
- Lancer le script de génération des traces : `node scripts/getIndicators.mjs`

## Accéder à l'interface web
- L'interface est accessible à `src/index.html` et également à [https://vavart.github.io/traces-cmc/src/](https://vavart.github.io/traces-cmc/src/)
