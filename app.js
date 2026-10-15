const $=s=>document.querySelector(s), app=$("#app"), fmt=n=>"$"+n.toFixed(2);
let cart={}; try{cart=JSON.parse(localStorage.getItem("glo-cart")||"{}")}catch(e){}
const units=()=>Object.values(cart).reduce((a,b)=>a+b,0);
const save=()=>{try{localStorage.setItem("glo-cart",JSON.stringify(cart))}catch(e){}; $("#count").textContent=units()};
const prod=id=>PRODUCTS.find(p=>p.id===id);
Object.keys(cart).forEach(k=>{if(!prod(k))delete cart[k]});
const clamp=q=>Math.min(20,Math.max(1,parseInt(q)||1));
function calc(){let u=units(),sub=0;for(const id in cart)sub+=cart[id]*prod(id).price;
 const t=SITE.tiers.find(t=>u>=t[0]),rate=t?t[1]:0,disc=Math.round(sub*rate*100)/100;
 return{u,sub,rate,disc,net:sub-disc,fee:SITE.deliveryFee,total:sub-disc+(SITE.deliveryFee||0)}}
const OFFER="Buy 2, save 10% | Buy 3+, save 15%";
function img(src,label,cls=""){return `<figure class="ph ${cls}"><span>${label}</span>${src?`<img src="${src}" alt="${label}" loading="lazy" onerror="this.remove()">`:""}</figure>`}
const card=p=>`<article class="card"><a href="#/product/${p.id}">${img(p.images[0],"Glō Drip lip oil in "+p.name,"r45")}<h3>${p.name}</h3></a><p>${fmt(p.price)}</p><button class="btn sm" data-add="${p.id}">Add to cart</button></article>`;
function logo(){const i=new Image();i.alt="Glō Beirut";i.onload=()=>{$("#logo").innerHTML="";$("#logo").append(i);$("#flogo").innerHTML=`<img src="${IMAGES.logo}" alt="Glō Beirut">`};i.src=IMAGES.logo}
const views={
home:()=>`<section class="hero"><div><h1 class="chrome">Glō Beirut</h1><p class="tag">Glow differently.</p><a class="btn" href="#/shop">Shop the Collection</a><p class="offer">${OFFER}</p></div>${img(IMAGES.hero,"Glō Drip hero photograph","r45")}</section>
<section class="sec"><h2>The Collection</h2><div class="grid">${PRODUCTS.map(card).join("")}</div></section>
<section class="band"><h2>The Offer</h2><p>Applied automatically in your cart. No code needed.</p><p class="big">Buy 2, save 10%<br>Buy 3 or more, save 15%</p></section>
<section class="sec two"><div><h2>Glō Drip</h2><ul class="feat"><li>Glass-like shine</li><li>Lightweight feel</li><li>Non-sticky feel</li><li>Vegan formulation</li></ul><p>A lip oil, not a gloss. 4 ml per tube.</p></div>${img(IMAGES.campaign,"Glō Drip campaign image","r45")}</section>
<section class="sec two">${img(IMAGES.story,"Glō Beirut brand photograph","r45")}<div><h2>Glō Beirut</h2><p>Quiet luxury, made for every day. Glō Beirut is a Lebanese beauty brand for those who love beautiful cosmetics and a polished finish.</p></div></section>
<section class="sec"><h2>Payment and delivery</h2><p>Pay by cash on delivery or Whish Money. We deliver throughout Lebanon in an estimated ${SITE.deliveryTime}.</p></section>
<section class="band"><h2 class="chrome">Glow differently.</h2><a class="btn" href="#/shop">Explore the collection</a></section>`,
shop:()=>`<section class="sec"><h1>Shop all</h1><p class="offer">${OFFER}</p><div class="grid">${PRODUCTS.map(card).join("")}</div></section>`,
product:id=>{const p=prod(id);if(!p)return views.shop();return `<section class="sec two pd">
<div>${img(p.images[0],"Glō Drip lip oil in "+p.name,"r45")}${p.images.length>1?`<div class="thumbs">${p.images.slice(1).map(s=>img(s,p.name+" detail","sq")).join("")}</div>`:""}</div>
<div><h1>${p.name}</h1><p class="price">${fmt(p.price)}</p><p>${p.desc}</p><p class="offer">${OFFER}</p>
<label>Quantity <input id="q" type="number" min="1" max="20" value="1"></label><button class="btn" data-add="${p.id}" data-q>Add to cart</button>
<details open><summary>Details</summary><ul>${p.specs.map(s=>`<li>${s}</li>`).join("")}</ul></details>
<details><summary>Ingredients</summary><p>${p.ingredients||"Ingredient list coming soon."}</p></details>
<details><summary>Payment and delivery</summary><p>Cash on delivery or Whish Money. Delivery across Lebanon, estimated ${SITE.deliveryTime}.</p></details></div></section>`},
cart:()=>{const ids=Object.keys(cart);if(!ids.length)return `<section class="sec"><h1>Your cart</h1><p>Your cart is empty.</p><a class="btn" href="#/shop">Shop the collection</a></section>`;
 return `<section class="sec narrow"><h1>Your cart</h1><p class="offer">${OFFER}</p>${ids.map(id=>{const p=prod(id);return `<div class="row"><span>${p.name}<br><small>${fmt(p.price)}</small></span><input type="number" min="1" max="20" value="${cart[id]}" aria-label="Quantity for ${p.name}" data-qty="${id}"><button class="lnk" data-rm="${id}">Remove</button></div>`}).join("")}${totals()}<a class="btn" href="#/checkout">Checkout</a></section>`},
checkout:()=>{if(!units())return views.cart();return `<section class="sec narrow"><h1>Checkout</h1><p class="note">Submitting prepares your order as an email to Glō Beirut. It is not received until you send that email.</p>${totals()}
<form id="co"><label>Full name<input name="name" required autocomplete="name"></label><label>Phone number<input name="phone" type="tel" required autocomplete="tel"></label><label>Area or district in Lebanon<input name="area" required></label><label>Delivery address<textarea name="addr" required rows="3"></textarea></label><label>Delivery instructions (optional)<textarea name="notes" rows="2"></textarea></label><label>Email (optional)<input name="email" type="email"></label>
<fieldset><legend>Payment method</legend><label class="inl"><input type="radio" name="pay" value="Cash on delivery" checked> Cash on delivery</label><label class="inl"><input type="radio" name="pay" value="Whish Money"> Whish Money</label><p class="note">${SITE.whishInstructions||"Whish Money payment instructions will be confirmed with your order."}</p></fieldset>
<button class="btn" type="submit">Prepare my order</button></form></section>`},
sent:()=>`<section class="sec narrow"><h1>One more step</h1><p><b>Your order has not been sent yet.</b> Send the email draft, or copy the text and message us on Instagram. We confirm each order after we receive it.</p><div class="acts"><a class="btn" id="mail">Open email draft</a><button class="btn ghost" id="copy">Copy order text</button>${SITE.instagram?`<a class="btn ghost" href="${SITE.instagram}" target="_blank" rel="noopener">Instagram DM</a>`:""}</div><pre>${window._order||""}</pre></section>`,
info:()=>`<section class="sec narrow"><h1>Shipping, payment and policies</h1><p class="note">DRAFT policies for owner review before publishing.</p><h2>Delivery</h2><p>Throughout Lebanon. Estimated ${SITE.deliveryTime}; this is an estimate, not a guaranteed date. ${SITE.deliveryFee==null?"The delivery fee is confirmed with your order.":"Delivery fee: "+fmt(SITE.deliveryFee)+"."}</p><h2>Payment</h2><p>Cash on delivery, or Whish Money.</p><h2>Returns (draft)</h2><p>[Owner to confirm return and refund policy before launch.]</p><h2>Privacy (draft)</h2><p>We ask for your name, phone number and address only to process your order. This website has no accounts or tracking. Details you submit reach us only through the email or message you send.</p></section>`,
contact:()=>`<section class="sec narrow"><h1>Contact</h1><p>Questions about shades, orders, delivery or payment:</p><p><a href="mailto:${SITE.email}">${SITE.email}</a></p>${SITE.instagram?`<p><a href="${SITE.instagram}" target="_blank" rel="noopener">Message us on Instagram</a></p>`:""}<h2>Business inquiries</h2><p>Wholesale or private-label: <a href="mailto:${SITE.email}?subject=Business%20inquiry">email us</a>.</p></section>`};
function totals(){const c=calc();return `<div class="tot"><p>Subtotal <span>${fmt(c.sub)}</span></p>${c.disc?`<p>Discount (${Math.round(c.rate*100)}%) <span>−${fmt(c.disc)}</span></p>`:""}<p>Merchandise <span>${fmt(c.net)}</span></p><p>Delivery <span>${c.fee==null?"Confirmed with order":fmt(c.fee)}</span></p><p class="gt">Total <span>${fmt(c.total)}${c.fee==null?" + delivery":""}</span></p></div>`}
function route(){const [,r,a]=(location.hash||"#/").split("/");const v=r?views[r]:views.home;app.innerHTML=(v||views.home)(a);document.title=(r==="product"&&prod(a)?prod(a).name+" | ":"")+"Glō Beirut";window.scrollTo(0,0);save()}
addEventListener("hashchange",route);
document.addEventListener("click",e=>{const t=e.target;
 if(t.dataset.add){const q=t.hasAttribute("data-q")?clamp($("#q").value):1;cart[t.dataset.add]=Math.min(20,(cart[t.dataset.add]||0)+q);save();t.textContent="Added";setTimeout(()=>t.textContent="Add to cart",1200)}
 if(t.dataset.rm){delete cart[t.dataset.rm];save();route()}
 if(t.id==="copy")navigator.clipboard.writeText(window._order).then(()=>t.textContent="Copied")});
document.addEventListener("change",e=>{if(e.target.dataset.qty){cart[e.target.dataset.qty]=clamp(e.target.value);save();route()}});
document.addEventListener("submit",e=>{if(e.target.id!=="co")return;e.preventDefault();const f=new FormData(e.target),c=calc();
 window._order=`Glō Beirut order\n`+Object.keys(cart).map(id=>`${cart[id]} x ${prod(id).name}`).join("\n")+`\nSubtotal ${fmt(c.sub)}; discount -${fmt(c.disc)}; total ${fmt(c.total)} + delivery (to be confirmed)\nName: ${f.get("name")}\nPhone: ${f.get("phone")}\nArea: ${f.get("area")}\nAddress: ${f.get("addr")}\nNotes: ${f.get("notes")}\nEmail: ${f.get("email")}\nPayment: ${f.get("pay")}`;
 app.innerHTML=views.sent();$("#mail").href=`mailto:${SITE.email}?subject=${encodeURIComponent("New order")}&body=${encodeURIComponent(window._order)}`;window.scrollTo(0,0)});
$("#yr").textContent=new Date().getFullYear();$("#fmail").href="mailto:"+SITE.email;$("#fmail").textContent=SITE.email;
if(SITE.instagram){$("#figl").href=SITE.instagram;$("#figl").textContent="Instagram"}
$("#logo").textContent="Glō Beirut";$("#flogo").textContent="Glō Beirut";logo();route();
