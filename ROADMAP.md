# Roadmap MVP 30 Jours — OptiVista Pro

## 🎯 Objectif
Lancer une version stable (v1.0) permettant à un opticien de gérer ses clients, ses ventes et ses factures sans papier.

---

## 🛠 Phase 1 : Infrastructure & Noyau (Jours 1-7)
- [ ] **J1-J2** : Initialisation du projet (Next.js 15, Prisma, Tailwind).
- [ ] **J3** : Définition du schéma PostgreSQL final et vagues de migration.
- [ ] **J4-J5** : Système Multi-Tenant (Middleware Next.js + Isolation Prisma).
- [ ] **J6-J7** : Module Auth (Login/Signup par boutique, gestion des rôles).

## 👥 Phase 2 : CRM & Ordonnances (Jours 8-14)
- [ ] **J8-J10** : Module Clients complet (CRUD, recherche floue, notes).
- [ ] **J11-J13** : Module Ordonnances (Saisie OD/OG détaillée, calcul d'addition).
- [ ] **J14** : Dashboard Clients (KPIs : nouveaux clients, taux de renouvellement).

## 📦 Phase 3 : Ventes & Stocks (Jours 15-21)
- [ ] **J15-J16** : Gestion de l'inventaire (Montures, Verres, Accessoires).
- [ ] **J17-J19** : Compositeur de Devis (Panier, réductions, gestion des acomptes).
- [ ] **J20-J21** : Conversion Devis -> Facture & Génération PDF (avec logo du tenant).

## 🤖 Phase 4 : Automation & Onboarding (Jours 22-28)
- [ ] **J22-J23** : Connecteur n8n (Webhooks de vente, rappels WhatsApp).
- [ ] **J24-J25** : Module IA Marketing (Génération de posts Insta/Facebook via Gemini).
- [ ] **J26-J28** : Système d'abonnement (Stripe Billing + accès par palier).

## 🚀 Phase 5 : Déploiement & QA (Jours 29-30)
- [ ] **J29** : Audit de sécurité (RLS database, validation des champs).
- [ ] **J30** : Mise en ligne sur VPS via Docker + Caddy (SSL automatique).

---

## 💸 Stratégie Monetization
1. **Essai 14 jours** gratuit.
2. **Standard (190 DH / mois)** : 1 boutique, 2 utilisateurs.
3. **Business (390 DH / mois)** : Utilisateurs illimités + Rappels WhatsApp + IA Marketing.
4. **Enterprise (Sur Devis)** : Multi-boutiques, Export comptable personnalisé.
