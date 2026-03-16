# Greco Autogroup

> Site SWIGS - Cree le 2026-03-11

## Informations

| Champ | Valeur |
|-------|--------|
| **Nom** | Greco Autogroup |
| **Slug** | `grecoautogroup` |
| **Domaine** | A definir |
| **Type** | website |
| **Repo** | `swigsstaking/grecoautogroup-website` |

## Design System

| Champ | Valeur |
|-------|--------|
| **Style** | Dark premium automobile |
| **Background principal** | `#030C1D` |
| **Sections / blocs** | `#062148` |
| **Couleur accent** | `#13427E` |
| **Texte principal** | `#F2F2F2` |
| **Texte secondaire** | `#8696A5` |
| **Font titres** | Bodoni Moda (serif) |
| **Font corps** | Jost (sans-serif) |
| **Effets** | Gradient backgrounds, backdrop blur nav, subtle glow decorations |

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, stats, services, pourquoi nous choisir, CTA |
| Notre Histoire | `/notre-histoire` | Histoire, timeline, valeurs |
| Vehicules | `/vehicules` | Listing dynamique avec recherche et filtres |
| Vehicule Detail | `/vehicules/:id` | Fiche individuelle vehicule (galerie, specs, CTA contact) |
| Services | `/services` | Achat, Vente, Depot-vente (ancres #achat, #vente, #depot-vente) |
| Contact | `/contact` | Coordonnees + formulaire de contact |

## Infos Business

| Champ | Valeur |
|-------|--------|
| **Telephone** | non renseigne |
| **Email** | non renseigne |
| **Adresse** | non renseigne |
| **Horaires** | non renseigne |
| **Reseaux** | non renseigne |

## SEO

- **Description** : Greco Autogroup - Agence specialisee dans l'achat, la vente et le depot-vente de vehicules d'occasion.
- **Mots-cles** : achat automobile, vente voiture, depot vente, voiture occasion, Greco Autogroup
- **Langue** : fr

## Contenu fourni par le client

Contenu placeholder - a remplacer par le contenu client.

## Inspiration

- Site apprecie par le client : https://juraautomobile.ch/
- Structure inspiree : hero plein ecran, compteurs/stats, sections alternees, navigation fixe

## Deploiement

```bash
# Serveur : 192.168.110.73
ssh swigs@192.168.110.73
cd ~/swigs-apps/grecoautogroup-website
git pull origin main
npm install
npm run build
sudo cp -r dist/* /var/www/grecoautogroup/
```

## CORS

Domaine a ajouter dans `~/swigs-apps/swigs-cms-backend/.env` :
```
https://DOMAINE_A_DEFINIR,https://www.DOMAINE_A_DEFINIR
```

## Notes

- Mode sombre avec palette bleue foncee imposee par le client
- Pages vehicules dynamiques (listing + fiches individuelles) alimentees par l'API SWIGS
- Services structures avec ancres pour navigation directe (achat, vente, depot-vente)
- Dropdown dans la navigation pour les sous-services
