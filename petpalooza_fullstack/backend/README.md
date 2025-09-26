Django backend (development scaffold) - Project: core

Setup:
1. Create virtualenv and install requirements:
   python -m venv venv
   source venv/bin/activate   (or venv\Scripts\activate on Windows)
   pip install -r requirements.txt

2. Run migrations and create superuser:
   python manage.py migrate
   python manage.py createsuperuser

3. Start dev server:
   python manage.py runserver

Admin:
- Use Django admin to add NavbarItem (title, url, order, parent) to build menus (parent allows dropdowns).
- Upload SiteImage (e.g. navbar, footer logos) and add FooterSection entries for footer content.
- Add Categories and Products; their images will be served by the API.
