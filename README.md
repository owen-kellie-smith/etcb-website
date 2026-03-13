# etcb-website
![site checks](https://github.com/owen-kellie-smith/etcb-website/actions/workflows/site-checks.yml/badge.svg)

**Live site:**  https://www.exmouthtownband.co.uk/     [How?](#domain-name-management-info)

---

## How to contribute

To propose any change, either create a new [issue](https://github.com/owen-kellie-smith/etcb-website/issues) and describe what you would like to see or create what you would like to see and seek approval for it i.e.
1. [Fork](https://github.com/owen-kellie-smith/etcb-website/fork) the repository.
2. [Check](#getting-started-with-this-repo) the repo passes all the current tests.
3. Make your changes.
4. [Check](#getting-started-with-this-repo) the changed repo still passes all the tests.
5. Submit a pull request.

The website is in the [docs](docs) folder.

If you are proposing an edit for an existing menu item (e.g. to #contact) then make the edit to the relevant fragment e.g. in `docs/contact.html`, commit your change and submit a pull request. 

If you are proposing a new menu item (e.g. `#practices`) for the [current format](#current-format), then you need **three** changes:

1. **Create the content fragment** e.g. copy `docs/contact.html` to `docs/practices.html`  
   Edit the redirect script at the very top so that visiting the file directly sends users to the correct page.  Your new page will look like (once you have finished):
   ```html
   <script data-redirect>location.replace('./index.html#practices');</script>

   <h1>Practices</h1>
   <p>New content that describes practices ...</p>
   <p>Practice venues sometimes change so check ... etc ...</p>
   ```

2. **Register the page** in `docs/js/import.js`  
   Add the new page key to both arrays near the top of `docs/js/import.js`:
   ```js
   const VALID_PAGES = ['latest', 'about', ..., 'practices'];

   const PAGE_TITLES = {
     ...
     practices: 'ETCB - Practices',
   };
   ```

3. **Add a menu link** in `docs/includes/menu.html`  
   Use a `href="#events"` hash link (not a `.html` file link):
   ```html
   <li><a href="#rehearsals">Rehearsals</a></li>
   ```
   
4. (Optional) Add your menu item to the list of hashPages tested in `tests/pages.spec.ts`.

   
### Current format

The site is a single-page application. Only `docs/index.html` is ever loaded by the browser. Clicking a menu link changes the URL hash (e.g. `#contact`), and the router in `docs/js/import.js` fetches the matching fragment file (`contact.html`) and inserts its content into the page (which hopefully is less flickery than a full page reload).

---

## Getting started with this repo

### Download the repo and run tests
```
git clone https://github.com/<your-github-user-name>/etcb-website.git
cd avo-website
npm install
npx playwright install
npm run check
```

If everything works you will see something like (for each of several browsers)
```
✓ internal links and assets are valid
✓ homepage loads
✓ latest page loads via hash route
✓ about page loads via hash route
...
```

To view the site locally:
```
python3 -m http.server 4173 
```
then open `http://localhost:4173`



---
## Domain name management (info)
As a demo, [exmouthtownband.co.uk is registered (at fasthosts), for a year until March 2027. Fasthosts DNS settings forward to Cloudflare.](https://www.whois.com/whois/exmouthtownband.co.uk) Cloudflare [has a CNAME for www(.exmouthtownband.co.uk) which is owen-kellie-smith.github.io](https://mxtoolbox.com/SuperTool.aspx?action=mx%3awww.exmouthtownband.co.uk&run=toolpage).  Github fowards to avo-website/docs via this repo > Settings > Pages (Custom Domain) which created [a CNAME in docs](docs/CNAME).

---
## License

MIT

---

## Authors

See GitHub contributors for the list of contributors to this project.

