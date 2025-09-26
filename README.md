PetPalooza Fullstack (core) - Dynamic Navbar & Footer

- backend/: Django project named `core` with an app `shop` exposing API endpoints:
    /api/site-images/
    /api/navbar-items/
    /api/footer-sections/
    /api/categories/
    /api/products/

- frontend/: React + Tailwind app (fetches content from backend using axios configured in src/api.js)

Instructions:
1. Start backend (follow backend/README.md)
2. Start frontend (follow frontend/README.md)
3. Use Django admin to add NavbarItem, FooterSection, SiteImage, Category, Product entries; the frontend will display them automatically.
