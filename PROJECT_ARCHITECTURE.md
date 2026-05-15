# Architecture OptiVista Pro — SaaS pour Opticiens (Maroc)

## 1. Vision Technique
Système Cloud multi-tenant conçu pour l'efficacité opérationnelle. Isolation des données via `tenant_id` sur toutes les entités métier.

## 2. Stratégie Multi-Tenant
- **Niveau Application** : Le middleware Next.js intercepte les requêtes. Le `tenantId` est récupéré via le contexte de session (Auth.js) ou le slug d'URL `/app/[slug]/...`.
- **Niveau Base de Données** : Utilisation d'un schéma partagé (Shared Schema, ID isolation). 
- **Filtrage Prisma** : Un middleware Prisma injecte automatiquement le `tenant_id` dans chaque requête `findMany`, `update`, etc.

## 3. RoadMap MVP (30 Jours)

### Semaine 1 : Fondations & Auth
- Set up Next.js 15 + Prisma.
- Auth.js avec rôles (Admin/Employé).
- Dashboard vide et navigation latérale responsive.
- Création du profil Boutique (Tenant).

### Semaine 2 : Gestion Clients & Produits
- Module Client (CRUD) avec historique automatique.
- Module Inventaire (Montures/Verres) avec alertes de stock bas.
- Recherche universelle performante.

### Semaine 3 : Devis, Facturation & PDF
- Compositeur de devis (recherche produit + ajout manuel).
- Calcul dynamique (TVA, Acompte, Reste).
- Génération PDF via **React-PDF** ou template HTML -> Edge Functions.
- Pipeline de conversion Devis -> Facture.

### Semaine 4 : Automation & IA
- Webhook n8n pour envoi automatique de rappels WhatsApp (via API Ultramsg ou Twilio).
- Générateur IA de contenu marketing (Prompts pré-établis pour Opticiens).
- Rappels de renouvellement (6 mois / 1 an).

## 4. Architecture n8n (recommandée)
- **Workflow A : Landing Leads** -> Enregistre en DB + Notif Slack.
- **Workflow B : Commande Prête** -> Déclenché par changement de statut en Next.js -> Envoi WhatsApp client.
- **Workflow C : IA Marketing** -> Next.js envoie un sujet -> n8n appelle OpenAI -> Retourne un post social complet.

## 5. Stratégie Déploiement (Docker + VPS)
```yaml
# docker-compose.prod.yml
services:
  web:
    image: optivista-web
    env_file: .env.production
    ports: ["3000:3000"]
  
  db:
    image: postgres:15-alpine
    volumes: ["pgdata:/var/lib/postgresql/data"]
  
  redis: # Pour le cache et les sessions
    image: redis:alpine

  caddy:
    image: caddy:latest
    ports: ["80:80", "443:443"]
    volumes: ["./Caddyfile:/etc/caddy/Caddyfile"]
```

## 6. Sécurité & Scale
- **Sauvegardes** : Automatisation via `pg_dump` vers S3 (Backblaze B2 ou MinIO) toutes les 6h.
- **Permissions** : Middleware `canAccess(resource)` pour vérifier que l'employé appartient bien au tenant.
- **Audit Log** : Table `ActivityLog` pour tracer chaque modification critique (suppression devis, modification prix).

## 7. Modèle Économique (Pricing)
- **Pack Start** : 1 boutique, 2 employés, 50 clients/mois. (Gratuit ou prix d'appel).
- **Pack Pro** : Utilisateurs illimités, WhatsApp Illimité, Rapports PDF. (Abonnement mensuel).
- **Pack Elite** : Multi-boutiques, Intégration IA complète, Support VIP.
