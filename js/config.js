/* ===== EDIT THIS FILE to change settings, products and image paths ===== */
const SITE = {
  email: "globeirut1@gmail.com",
  instagram: "",          // PUT YOUR INSTAGRAM URL HERE, e.g. "https://instagram.com/yourname"
  deliveryFee: null,      // PUT A NUMBER (e.g. 4) when confirmed. null = "confirmed with your order"
  deliveryTime: "3–5 days",
  whishInstructions: "", // PUT YOUR WHISH MONEY PAYMENT INSTRUCTIONS HERE
  orderKey: "",           // PASTE YOUR WEB3FORMS ACCESS KEY HERE (see README). Empty = email-draft fallback
  price: 12,
  tiers: [[3, 0.15], [2, 0.10]]  // [units, discount]: 3+ units 15%, 2 units 10%
};
/* Site-wide images. Put files in the folders shown. Leave a path "" to show a placeholder. */
const IMAGES = {
  logo: "images/logo/logo.png",
  hero: "images/homepage/homepage-hero.jpg",
  story: "images/brand/brand-story.jpg",
  campaign: "images/campaigns/campaign-image.jpg"
};
/* Paste your real ingredient list between the quotes: */
const INGREDIENTS = "";
const SHADES = ["Crystal","Silk","Aura","Amethyst","Halo","Opal","Sage","Solstice","Muse","Cloud","Blush","Eclipse"];
const PRODUCTS = SHADES.map(n => {
  const id = n.toLowerCase();
  return {
    id, name: n, price: SITE.price, available: true,
    // First image is the main one. Add more files to this list for a gallery.
    images: [`images/products/${id}-product.jpg`],
    desc: id === "sage"
      ? "A pale, aloe-like green in the tube that appears lighter on the lips."
      : `${n}: a Glō Drip lip oil with a glass-like shine.`,
    ingredients: INGREDIENTS,
    specs: ["Lip oil (not a gloss)","4 ml","Vegan","Lightweight, non-sticky feel","No plumping effect"]
  };
});
