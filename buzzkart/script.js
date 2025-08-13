const S=(q,el=document)=>el.querySelector(q), SS=(q,el=document)=>[...el.querySelectorAll(q)];
const cfg={admin_password:'',amazon_tag:'',temu_affiliate_id:'',utm_source:'buzzkart'};
let products=[]; // loaded from products.json

async function loadConfig(){ try{ const r=await fetch('config.json'); Object.assign(cfg, await r.json()); }catch(e){} }
async function loadProducts(){ try{ const r=await fetch('products.json'); products = await r.json(); }catch(e){ products=[]; } }

async function loadRates(){ try{ const r=await fetch('https://api.exchangerate.host/latest?base=USD'); const j=await r.json(); return j.rates; }catch(e){ return null; } }
function fmtPrice(usd, rates, shown='USD'){ const v=Number(usd||0); let out=`$${v.toFixed(2)} USD`; if(rates && rates[shown] && shown!=='USD'){ out += ` • ≈ ${(v*rates[shown]).toFixed(0)} ${shown}`; } if(shown!=='NOK' && rates && rates['NOK']){ out += ` • ≈ ${(v*rates['NOK']).toFixed(0)} NOK`; } return out; }
function aff(url){ try{ const u=new URL(url); if(u.hostname.includes('amazon.') && cfg.amazon_tag && !u.searchParams.get('tag')) u.searchParams.set('tag', cfg.amazon_tag);
 if(u.hostname.includes('temu.') && cfg.temu_affiliate_id && !u.searchParams.get('affiliateId')) u.searchParams.set('affiliateId', cfg.temu_affiliate_id);
 if(cfg.utm_source && !u.searchParams.get('utm_source')) u.searchParams.set('utm_source', cfg.utm_source); return u.toString(); }catch(e){ const j=url.includes('?')?'&':'?'; return url+j+'utm_source='+(cfg.utm_source||'buzzkart'); } }

function renderFeed(view,rates,cur){ const mount=S('.feed'); mount.innerHTML=''; let list=[...products];
 if(view==='newest'){ list.sort((a,b)=>(b.added_at||0)-(a.added_at||0)); }
 if(view==='temu'||view==='aliexpress'||view==='amazon'||view==='pod'){ list=list.filter(p=>p.source===view); }
 // 'foryou' simple shuffle + prefer liked categories
 const liked = JSON.parse(localStorage.getItem('bk_likes')||'[]');
 if(view==='foryou' && liked.length){ const topCats = {}; liked.forEach(id=>{ const p=products.find(x=>x.id===id); (p?.categories||[]).forEach(c=> topCats[c]=(topCats[c]||0)+1 ); }); list.sort((a,b)=> ((b.categories||[]).some(c=>topCats[c])?1:0) - ((a.categories||[]).some(c=>topCats[c])?1:0) ); }
 list.forEach(p=>{ const art=document.createElement('article'); art.className='post';
   const media=document.createElement('div'); media.className='media';
   if(p.video){ const v=document.createElement('video'); v.src=p.video; v.autoplay=true; v.muted=true; v.loop=true; v.playsInline=true; media.appendChild(v); }
   else { const img=document.createElement('img'); img.src=p.image||'assets/placeholder.png'; img.alt=p.title||''; media.appendChild(img); }
   const overlay=document.createElement('div'); overlay.className='overlay';
   overlay.innerHTML=`<div class="title">${p.title||'Product'}</div><div class="price">${fmtPrice(p.price_usd||0, rates, cur)}</div><div class="desc">${p.description||''}</div>`;
   const actions=document.createElement('div'); actions.className='actions';
   const like=document.createElement('button'); like.textContent='♥'; like.title='Like'; like.onclick=()=>{ const arr=new Set(JSON.parse(localStorage.getItem('bk_likes')||'[]')); arr.has(p.id)?arr.delete(p.id):arr.add(p.id); localStorage.setItem('bk_likes', JSON.stringify([...arr])); like.textContent= like.textContent==='♥'?'❤':'♥'; };
   const share=document.createElement('button'); share.textContent='⤴'; share.title='Share'; share.onclick=()=>{ const link=location.origin+location.pathname.replace(/\/[^/]*$/,'')+'p/'+encodeURIComponent(p.id)+'.html'; navigator.clipboard.writeText(link); alert('Copied: '+link); };
   const shop=document.createElement('button'); shop.textContent='🛒'; shop.title='Shop'; const openShop=()=>window.open(aff(p.url),'_blank');
   shop.onclick=openShop; media.onclick=openShop; overlay.onclick=openShop;
   actions.append(like,share,shop);
   art.append(media, overlay, actions); mount.appendChild(art);
 });}

async function init(){
  await loadConfig(); await loadProducts();
  const rates = await loadRates();
  const curSel = S('#currency'); ['USD','NOK','EUR','GBP','SEK','DKK','AUD','CAD'].forEach(c=>{ const o=document.createElement('option'); o.value=c; o.textContent=c; curSel.appendChild(o); });
  curSel.value='USD'; curSel.onchange=()=>{ renderFeed(document.body.getAttribute('data-view')||'foryou', rates, curSel.value); };
  S('#themeToggle').onclick=()=> document.body.classList.toggle('light');
  renderFeed(document.body.getAttribute('data-view')||'foryou', rates, curSel.value);
}
window.addEventListener('DOMContentLoaded', init);
