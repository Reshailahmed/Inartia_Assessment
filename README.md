# HRMS Backend – Deployment Assessment

This is the backend service for the HRMS assessment project. It provides APIs for managing offers, templates, and time utilities.  
The app is deployed on **Railway** with a managed PostgreSQL database.

---

## 🚀 Live Deployment
Base URL: [https://inartiaassessment-production.up.railway.app](https://inartiaassessment-production.up.railway.app)

### Available Endpoints
- `GET /api/offers` → List all offers
- `POST /api/offers` → Create a new offer
- `PUT /api/offers/:id` → Update an existing offer
- `DELETE /api/offers/:id` → Delete an offer
- `GET /api/template` → Fetch templates
- `GET /api/time` → Get server time

---

## 📌 Running Locally

### 1. Clone Repo
```bash
git clone <repo-url>
cd hrms-backend
