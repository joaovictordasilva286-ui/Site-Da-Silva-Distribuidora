const WHATSAPP_NUMBER = "5546984156908";
const DEFAULT_MESSAGE = "Olá! Vim pelo site da Da Silva Distribuidora e gostaria de fazer um pedido.";
const CART_KEY = "daSilvaCartV1";
const getWhatsAppUrl = (message=DEFAULT_MESSAGE) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

document.querySelectorAll("[data-whatsapp]").forEach(el=>{el.href=getWhatsAppUrl();el.target="_blank";el.rel="noopener noreferrer";});
const menuToggle=document.querySelector('.menu-toggle'),mainNav=document.querySelector('.main-nav');
menuToggle?.addEventListener('click',()=>{const o=mainNav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(o))});
mainNav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mainNav.classList.remove('open')));
const reveals=document.querySelectorAll('.reveal');
if('IntersectionObserver'in window){const ob=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');ob.unobserve(e.target)}}),{threshold:.1});reveals.forEach(e=>ob.observe(e))}else reveals.forEach(e=>e.classList.add('visible'));
const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();

let cart=[];try{cart=JSON.parse(localStorage.getItem(CART_KEY)||'[]')}catch{cart=[]}
const $=s=>document.querySelector(s),drawer=$('#cartDrawer'),backdrop=$('#cartBackdrop'),itemsEl=$('#cartItems'),countEl=$('#cartCount'),totalEl=$('#cartTotal');
function save(){localStorage.setItem(CART_KEY,JSON.stringify(cart));renderCart()}
function openCart(){drawer?.classList.add('open');backdrop?.classList.add('open');drawer?.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}
function closeCart(){drawer?.classList.remove('open');backdrop?.classList.remove('open');drawer?.setAttribute('aria-hidden','true');document.body.style.overflow=''}
function esc(s=''){return s.replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function renderCart(){if(!drawer)return;const total=cart.reduce((a,i)=>a+i.qty,0);countEl.textContent=total;totalEl.textContent=total;drawer.classList.toggle('is-empty',!cart.length);itemsEl.innerHTML=cart.map((i,n)=>`<div class="cart-item"><div class="cart-item-top"><div><h3>${esc(i.name)}</h3><p>${esc(i.details)}</p></div><button class="cart-remove" data-remove="${n}" aria-label="Remover">×</button></div><div class="cart-controls"><div class="qty-control"><button data-minus="${n}" aria-label="Diminuir">−</button><span>${i.qty}</span><button data-plus="${n}" aria-label="Aumentar">+</button></div></div><input class="cart-note" data-note="${n}" value="${esc(i.note||'')}" placeholder="Sabor, tamanho ou observação (opcional)"></div>`).join('')}
document.addEventListener('click',e=>{const add=e.target.closest('[data-cart-add]');if(add){const name=add.dataset.product,details=add.dataset.details||'';const found=cart.find(i=>i.name===name&&i.details===details);found?found.qty++:cart.push({name,details,qty:1,note:''});save();add.textContent='Adicionado ✓';add.classList.add('added');setTimeout(()=>{add.textContent='Adicionar ao carrinho';add.classList.remove('added')},900);return}const plus=e.target.closest('[data-plus]'),minus=e.target.closest('[data-minus]'),rem=e.target.closest('[data-remove]');if(plus){cart[+plus.dataset.plus].qty++;save()}if(minus){const i=+minus.dataset.minus;cart[i].qty--;if(cart[i].qty<1)cart.splice(i,1);save()}if(rem){cart.splice(+rem.dataset.remove,1);save()}});
itemsEl?.addEventListener('input',e=>{if(e.target.matches('[data-note]')){cart[+e.target.dataset.note].note=e.target.value;localStorage.setItem(CART_KEY,JSON.stringify(cart))}});
$('#cartFab')?.addEventListener('click',openCart);$('#cartClose')?.addEventListener('click',closeCart);backdrop?.addEventListener('click',closeCart);$('#cartClear')?.addEventListener('click',()=>{if(confirm('Limpar todos os itens do carrinho?')){cart=[];save()}});
$('#cartCheckout')?.addEventListener('click',()=>{if(!cart.length)return;const total=cart.reduce((a,i)=>a+i.qty,0);let msg='Olá! Vim pelo site da Da Silva Distribuidora e gostaria de fazer este pedido:\n\n🛒 *MEU PEDIDO*\n\n';cart.forEach(i=>{msg+=`• *${i.name}*\n  Quantidade: ${i.qty}\n`;if(i.details)msg+=`  Apresentação: ${i.details}\n`;if(i.note?.trim())msg+=`  Observação: ${i.note.trim()}\n`;msg+='\n'});msg+=`Total de unidades: *${total}*\n\nPoderiam confirmar a disponibilidade e os valores, por favor?`;window.open(getWhatsAppUrl(msg),'_blank','noopener,noreferrer')});
renderCart();
