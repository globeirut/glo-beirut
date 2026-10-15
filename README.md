# Glō Beirut website: simple guide

## Files
- `index.html` the page shell. `css/style.css` the look. `js/app.js` the shop logic.
- **`js/config.js` is the ONLY file you normally edit**: settings, 12 products, ingredients, image paths.

## Before launch (edit js/config.js)
1. `instagram`: your Instagram link (the button appears automatically).
2. `deliveryFee`: a number like `4`, or leave `null`.
3. `whishInstructions`: your Whish Money payment details.
4. `INGREDIENTS`: paste your real ingredient list between the quotes.
5. Review the DRAFT return and privacy text in `js/app.js` (search "draft").

## Photos (no coding needed)
Save a photo with EXACTLY this name in the folder, then refresh:
- Logo: `images/logo/logo.png` (transparent PNG)
- Hero: `images/homepage/homepage-hero.jpg`
- Brand story: `images/brand/brand-story.jpg`; campaign: `images/campaigns/campaign-image.jpg`
- Products: `images/products/crystal-product.jpg`, `silk-product.jpg`, `aura-product.jpg`, `amethyst-product.jpg`, `halo-product.jpg`, `opal-product.jpg`, `sage-product.jpg`, `solstice-product.jpg`, `muse-product.jpg`, `cloud-product.jpg`, `blush-product.jpg`, `eclipse-product.jpg`
- Extra gallery photos: in `config.js`, edit a product's `images` list, e.g. `images: ["images/products/halo-product.jpg","images/products/halo-closeup.jpg"]`.
- Sizes: product 1200x1500 px (4:5), hero 1600x2000, JPG under 300 KB. Full packaging is shown uncropped.
Until a file exists, an elegant placeholder shows. No rebuild needed, just refresh.

## Preview and publish (free)
- Preview: double-click `index.html`. (Fonts need internet.)
- Publish free: Netlify Drop (app.netlify.com/drop), drag the whole folder in. Or GitHub Pages / Cloudflare Pages.

## Ordering: how it really works
There is no server. "Prepare my order" opens an email draft to globeirut1@gmail.com (or the customer copies the text to Instagram). Orders are only received when the customer sends it. The cart is saved in the customer's browser only. For automatic order capture later, ask Claude to add a free form service (e.g. Formspree) or a WhatsApp handoff (needs your number).
