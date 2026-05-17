(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const d of a)if(d.type==="childList")for(const l of d.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function i(a){const d={};return a.integrity&&(d.integrity=a.integrity),a.referrerPolicy&&(d.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?d.credentials="include":a.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function n(a){if(a.ep)return;a.ep=!0;const d=i(a);fetch(a.href,d)}})();function A(s){const e=[...s];for(let i=e.length-1;i>0;i-=1){const n=Math.floor(Math.random()*(i+1));[e[i],e[n]]=[e[n],e[i]]}return e}function js(s,e){return A(s).slice(0,e)}function ue(s){const e=s||{correct:0,total:0};return e.total?Math.round(e.correct/e.total*100):0}const ps="quizled_v2",O="default-list";function Y(){return{count:"all",timer:0,countMode:"preset",timerMode:"preset",countCustom:25,timerCustom:30}}function os(){return{flashcards:{correct:0,total:0,solved:{}},learn:{correct:0,total:0,solved:{}},match:{correct:0,total:0,solved:{}},test:{correct:0,total:0,solved:{}},"guided-learning":{correct:0,total:0,solved:{}}}}function q(){return{en:"",ua:""}}const t={currentListId:O,lists:[],wordsByList:{},progressByList:{},progressByModeByList:{},dailyLearned:{},dailyGuidedLearned:{},memoryByWord:{},mistakes:{},favorites:{},flashcardStats:{},activeSession:null,guidedSession:null,pendingImport:null,settings:Y()};function M(){t.lists.some(e=>e.id===t.currentListId)||(t.currentListId=O),t.lists.some(e=>e.id===t.currentListId)||(t.lists=[...t.lists,{id:t.currentListId,name:"Мій список",createdAt:Date.now()}]),t.wordsByList[t.currentListId]||(t.wordsByList[t.currentListId]=[]),t.progressByList[t.currentListId]||(t.progressByList[t.currentListId]={correct:0,total:0}),t.progressByModeByList[t.currentListId]||(t.progressByModeByList[t.currentListId]=os())}function ve(s,e){return{...s,id:Number(s.id),en:String(s.en||""),ua:String(s.ua||""),listId:e}}function Cs(s){return String(s||"").trim()}function be(){return`list-${Date.now()}-${Math.random().toString(36).slice(2,8)}`}function me(s,e){const i=(e||[]).map(a=>Number(a.id)).filter(a=>Number.isFinite(a)),n=new Set(i);i.forEach(a=>{delete t.mistakes[a],delete t.favorites[a],delete t.flashcardStats[a],delete t.memoryByWord[a],delete t.memoryByWord[`${s}:${a}`]}),Object.keys(t.dailyLearned||{}).forEach(a=>{t.dailyLearned[a]&&i.forEach(d=>delete t.dailyLearned[a][d])}),Object.keys(t.dailyGuidedLearned||{}).forEach(a=>{t.dailyGuidedLearned[a]&&i.forEach(d=>delete t.dailyGuidedLearned[a][d])}),Object.keys(t.progressByModeByList||{}).forEach(a=>{const d=t.progressByModeByList[a];!d||typeof d!="object"||Object.keys(d).forEach(l=>{const c=d[l]?.solved;c&&Object.keys(c).forEach(b=>{n.has(Number(b))&&delete c[b]})})})}Object.defineProperty(t,"items",{get(){return M(),t.wordsByList[t.currentListId]||[]},set(s){M();const e=Array.isArray(s)?s:[];t.wordsByList[t.currentListId]=e.map(i=>ve(i,t.currentListId)).filter(i=>Number.isFinite(i.id))}});Object.defineProperty(t,"progress",{get(){return M(),t.progressByList[t.currentListId]},set(s){M(),t.progressByList[t.currentListId]={correct:Number(s?.correct)||0,total:Number(s?.total)||0}}});Object.defineProperty(t,"progressByMode",{get(){return M(),t.progressByModeByList[t.currentListId]},set(s){M(),t.progressByModeByList[t.currentListId]=s}});M();function ys(){M()}function y(){try{localStorage.setItem(ps,JSON.stringify(t))}catch{return null}return null}function ge(){try{const s=localStorage.getItem(ps);return s?JSON.parse(s):null}catch{return null}}function he(){localStorage.removeItem(ps)}function Ns(){const s=new Set(t.items.map(e=>e.id));return Object.keys(t.mistakes).map(Number).filter(e=>s.has(e)&&t.mistakes[e]>0)}function Os(){const s=Ns();return t.items.filter(e=>s.includes(e.id))}function ws(s){t.favorites[s]?delete t.favorites[s]:t.favorites[s]=!0,y()}function Ts(){const s=new Set(t.items.map(e=>e.id));return Object.keys(t.favorites).map(Number).filter(e=>s.has(e)&&t.favorites[e])}function fe(){const s=Ts();return t.items.filter(e=>s.includes(e.id))}function Q(s){if(t.activeSession&&t.activeSession.mode==="guided-learning"&&t.guidedSession&&(t.guidedSession.listId||t.currentListId)===t.currentListId){s&&typeof s.index=="number"&&(t.guidedSession.currentIndex=s.index),s&&(t.guidedSession.resumeState=s),y();return}t.activeSession=s?{...s,listId:t.currentListId}:null,y()}function k(){if(t.activeSession&&t.activeSession.mode==="guided-learning"&&t.guidedSession&&(t.guidedSession.listId||t.currentListId)===t.currentListId){y();return}t.activeSession=null,y()}function pe(s){const e=t.settings.countMode==="custom"?Number(t.settings.countCustom)||0:t.settings.count,i=A([...s]);return e==="all"?i:i.slice(0,Math.min(Number(e),i.length))}function Rs(s){return s==="favorites"?fe():s==="mistakes"?Os():t.items}function ye(){return Object.values(t.wordsByList).flat()}function qs(s){const e=t.lists.find(i=>i.id===s);return e?(t.currentListId=e.id,M(),!0):!1}function we(s){const e=Cs(s);if(!e)throw new Error("Назва списку не може бути порожньою.");const i={id:be(),name:e,createdAt:Date.now()};return t.lists=[...t.lists,i],t.wordsByList[i.id]=[],t.progressByList[i.id]={correct:0,total:0},t.progressByModeByList[i.id]=os(),t.currentListId=i.id,t.activeSession=null,t.guidedSession=null,y(),i}function $e(s,e){const i=Cs(e);if(!i)throw new Error("Назва списку не може бути порожньою.");return t.lists.find(a=>a.id===s)?(t.lists=t.lists.map(a=>a.id===s?{...a,name:i}:a),y(),!0):!1}function ke(s){if(!t.lists.some(n=>n.id===s))return!1;const e=t.activeSession?.listId===s,i=t.wordsByList[s]||[];return me(s,i),delete t.wordsByList[s],delete t.progressByList[s],delete t.progressByModeByList[s],t.lists=t.lists.filter(n=>n.id!==s),t.lists.length?t.currentListId===s&&(t.currentListId=t.lists[0].id):(t.currentListId=O,t.lists=[{id:O,name:"Мій список",createdAt:Date.now()}]),e&&(t.activeSession=null),t.guidedSession?.listId===s&&(t.guidedSession=null),M(),y(),!0}function Fs(s,e=t.currentListId){return`${e}:${s}`}function Gs(s){const e=t.memoryByWord[Fs(s)]||t.memoryByWord[s]||{};return{strength:Number(e.strength)||0,lastReviewedAt:Number(e.lastReviewedAt)||0}}function Ps(s,e){const i=t.memoryByWord[`${e}:${s}`]||t.memoryByWord[s]||{};return{strength:Number(i.strength)||0,lastReviewedAt:Number(i.lastReviewedAt)||0}}function Ws(s){const e=t.wordsByList[s]||[];return e.length?e.reduce((n,a)=>{const d=Ps(a.id,s);return n+Math.max(0,Math.min(3,Number(d.strength)||0))},0)/e.length:0}function Le(s){return s>=7?.3:s>=4?.5:s>=2?.7:s>=1?.88:1}function Se(s,e,i=Date.now()){if(!e)return s;const n=Math.floor((i-e)/(1440*60*1e3));return s*Le(n)}function Ee(s,e){if(typeof s!="number"||e!=="learn"&&e!=="test")return;const i=$s();t.dailyLearned[i]||(t.dailyLearned[i]={}),t.dailyLearned[i][s]=!0}function Ie(s){if(typeof s!="number")return;const e=$s();t.dailyGuidedLearned[e]||(t.dailyGuidedLearned[e]={}),t.dailyGuidedLearned[e][s]=!0}function Be(s){typeof s!="number"||!t.guidedSession||(Array.isArray(t.guidedSession.wrongQueue)||(t.guidedSession.wrongQueue=[]),t.guidedSession.wrongQueue.includes(s)||t.guidedSession.wrongQueue.push(s))}function xe(s){t.mistakes[s]=(t.mistakes[s]||0)+1}function Me(s){t.mistakes[s]&&delete t.mistakes[s]}function As(s){const e={flashcards:{correct:0,total:0,solved:{}},learn:{correct:0,total:0,solved:{}},match:{correct:0,total:0,solved:{}},test:{correct:0,total:0,solved:{}},"guided-learning":{correct:0,total:0,solved:{}}};return Object.keys(e).forEach(i=>{const n=s&&s[i]?s[i]:{};e[i]={correct:Number(n.correct)||0,total:Number(n.total)||0,solved:n.solved||{}}}),e}function Qs(s){return t.flashcardStats[s]||{know:0,miss:0,streak:0,mastered:!1}}function Ae(s,e){const i=Qs(s),n={know:i.know+(e?1:0),miss:i.miss+(e?0:1),streak:e?i.streak+1:0,mastered:!1};return n.mastered=n.streak>=3&&n.miss<=1,t.flashcardStats[s]=n,y(),n}function De(s){const e=Qs(s);return e.mastered?"mastered":e.streak>=2?"known":e.miss>e.know?"weak":"new"}function je(s){const e={weak:[],new:[],known:[],mastered:[]};return s.forEach(i=>e[De(i.id)].push(i)),[...A(e.weak),...A(e.new),...A(e.known),...A(e.mastered)]}function $s(){const s=new Date,e=s.getFullYear(),i=String(s.getMonth()+1).padStart(2,"0"),n=String(s.getDate()).padStart(2,"0");return`${e}-${i}-${n}`}function z(s,e,i){const n=t.activeSession&&t.activeSession.mode==="guided-learning"&&t.guidedSession,a=n&&(t.guidedSession.phase==="input"||t.guidedSession.phase==="test"),d=n?"guided-learning":i;if(t.progress.total+=1,s&&(t.progress.correct+=1),d&&t.progressByMode[d]&&(t.progressByMode[d].total+=1,s&&(t.progressByMode[d].correct+=1,n&&(t.guidedSession.correct=(t.guidedSession.correct||0)+1),typeof e=="number"&&(t.progressByMode[d].solved[e]=!0,n?Ie(e):Ee(e,i)))),a&&!s&&Be(e),typeof e=="number"){const l=Gs(e),c=s?Math.min(3,n&&l.strength===0?2:l.strength+1):0;t.memoryByWord[Fs(e)]={strength:c,lastReviewedAt:Date.now()},s?Me(e):xe(e)}y()}function Ce(){const s=Date.now();return t.items.map(e=>{const i=Gs(e.id),n=Se(i.strength,i.lastReviewedAt,s),a=i.lastReviewedAt?Math.floor((s-i.lastReviewedAt)/(1440*60*1e3)):9999;return{item:e,strength:i.strength,lastReviewedAt:i.lastReviewedAt,shouldReview:n<2||a>=2}}).filter(e=>e.shouldReview).sort((e,i)=>e.strength!==i.strength?e.strength-i.strength:e.lastReviewedAt-i.lastReviewedAt).map(e=>e.item)}function Ne(){const s=t.items.length||0;if(!s)return{totalWords:0,averageStrength:0,memoryPercent:0,wordsToReviewCount:0,statusText:"Додайте слова, щоб побачити стан памʼяті."};const e=Ws(t.currentListId),i=Math.max(0,Math.min(100,Math.round(e/3*100)));let n="Потрібно відновити знання";return i>=90?n="Ти знаєш усі слова":i>=70?n="Потрібно трохи повторити":i>=40&&(n="Ти починаєш забувати слова"),{totalWords:s,averageStrength:e,memoryPercent:i,wordsToReviewCount:Ce().length,statusText:n}}function zs(s,e,i){const n=e||{},a=new Set(i||[]),d=s.filter(u=>n[u.id]===!0&&!a.has(u.id)),l=s.filter(u=>n[u.id]===!0&&a.has(u.id)),c=s.filter(u=>n[u.id]===!1),b=s.filter(u=>a.has(u.id));return{confidentItems:d,recoveredItems:l,unresolvedItems:c,weakItems:b}}function ks(s){const e=Ws(s);return Math.max(0,Math.min(100,Math.round(e/3*100)))}function _s(s){return(t.wordsByList[s]||[]).some(i=>{const n=Ps(i.id,s);return n.lastReviewedAt>0||n.strength>0})}function Vs(s){return`${t.currentListId}:${s}`}function Ls(s){return{en:String(s.en||"").trim().toLowerCase(),ua:String(s.ua||"").trim().toLowerCase()}}function Oe(){return ye().reduce((s,e)=>Math.max(s,Number(e.id)||0),0)+1}function Te(s){let e;try{e=JSON.parse(s)}catch{throw new Error("JSON не валідний. Перевірте формат.")}const i=e?.vocabulary||{},n=[...Array.isArray(i.words)?i.words:[],...Array.isArray(i.phrases)?i.phrases:[]],a={total:n.length,valid:0,skipped:0,missingEnglish:0,missingUkrainian:0,duplicates:0},d=new Set,l=[];if(n.forEach((c,b)=>{const u=String(c?.english||"").trim().toLowerCase(),h=String(c?.ukrainian||"").trim().toLowerCase();if(!u){a.skipped+=1,a.missingEnglish+=1;return}if(!h){a.skipped+=1,a.missingUkrainian+=1;return}const v=`${u}::${h}`;if(d.has(v)){a.skipped+=1,a.duplicates+=1;return}d.add(v),a.valid+=1,l.push({id:b+1,en:u,ua:h})}),!l.length)throw new Error("Не знайдено жодної валідної пари. Додайте хоча б одну english/ukrainian пару.");return{items:l,report:a}}function Re(s,e){const i=Ls(e),n=t.items.find(d=>d.id!==s&&d.en===i.en&&d.ua===i.ua);if(n)return{type:"duplicate",item:n,normalized:i};const a=t.items.find(d=>d.id!==s&&(d.en===i.en||d.ua===i.ua));return a?{type:"overlap",item:a,normalized:i,reason:item.en===i.en&&item.ua!==i.ua?"Однакове english, але інший переклад.":item.ua===i.ua&&item.en!==i.en?"Однакове ukrainian, але інше слово.":"Схожа пара вже є у словнику."}:{type:null,item:null,normalized:i}}function Hs(s,e){const{en:i,ua:n}=Ls(e);if(!i||!n)throw new Error("Заповніть обидва поля: english і ukrainian.");s?t.items=t.items.map(a=>a.id===s?{...a,en:i,ua:n,listId:t.currentListId}:a):t.items=[...t.items,{id:Oe(),listId:t.currentListId,en:i,ua:n}],k(),y()}function qe(s,e,i){const{en:n,ua:a}=Ls(i);t.items=t.items.map(d=>d.id===s?{...d,en:n,ua:a}:d).filter(d=>d.id!==e||e===s),e&&e!==s&&(delete t.mistakes[e],delete t.favorites[e],delete t.flashcardStats[e],delete t.memoryByWord[e],delete t.memoryByWord[Vs(e)],Object.keys(t.dailyLearned).forEach(d=>t.dailyLearned[d]&&delete t.dailyLearned[d][e]),Object.keys(t.dailyGuidedLearned).forEach(d=>t.dailyGuidedLearned[d]&&delete t.dailyGuidedLearned[d][e]),Object.keys(t.progressByMode).forEach(d=>{t.progressByMode[d]?.solved&&delete t.progressByMode[d].solved[e]})),k(),y()}function Fe(s){t.items=t.items.filter(e=>e.id!==s),delete t.mistakes[s],delete t.favorites[s],delete t.flashcardStats[s],delete t.memoryByWord[s],delete t.memoryByWord[Vs(s)],Object.keys(t.dailyLearned).forEach(e=>t.dailyLearned[e]&&delete t.dailyLearned[e][s]),Object.keys(t.dailyGuidedLearned).forEach(e=>t.dailyGuidedLearned[e]&&delete t.dailyGuidedLearned[e][s]),Object.keys(t.progressByMode).forEach(e=>{t.progressByMode[e]?.solved&&delete t.progressByMode[e].solved[s]}),k(),y()}const Us={};function Ge(s){Object.assign(Us,s)}function r(s,...e){const i=Us[s];if(!i)throw new Error(`Route "${s}" is not registered.`);const n=i(...e);return typeof window<"u"&&window.requestAnimationFrame(()=>window.scrollTo({top:0,left:0})),n}function Ss(s,e="all"){if(s==="guided-learning"){r("startGuidedLearning");return}const i=pe(Rs(e));if(!i.length){r("showList");return}s==="flashcards"&&r("showFlashcards",i,e),s==="learn"&&r("showLearn",i,e),s==="match"&&r("showMatch",i,e),s==="test"&&r("showTest",i,e),s==="mistakes"&&r("showMistakesReview",i)}function as(){const s=t.activeSession;if(!s){r("showList");return}if(s.listId&&s.listId!==t.currentListId){k(),r("showList");return}s.mode==="flashcards"?r("showFlashcards",s.items,s.source||"all",s):s.mode==="learn"?r("showLearn",s.items,s.source||"all",s):s.mode==="match"?r("showMatch",s.items,s.source||"all",s):s.mode==="test"?r("showTest",s.items,s.source||"all",s):s.mode==="mistakes"?r("showMistakesReview",s.items,s):s.mode==="guided-learning"?r("showGuidedLearning"):(k(),r("showList"))}function K(){if(!(t.activeSession&&t.activeSession.mode==="guided-learning"&&t.guidedSession))return!1;const s=t.guidedSession.listId||t.currentListId,e=t.activeSession.listId||t.currentListId;return s===t.currentListId&&e===t.currentListId}function X(s){t.guidedSession={...s,listId:s?.listId||t.currentListId},y()}function F(){t.guidedSession=null,y()}function Js(){return document.getElementById("app")}function w(s){Js().innerHTML=s}function o(s,e){const i=document.getElementById(s);i&&i.addEventListener("click",e)}const S=`<div class="logo-icon"><svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="6" height="6" rx="1.5" fill="white"/>
    <rect x="10" y="2" width="6" height="6" rx="1.5" fill="rgba(255,255,255,0.5)"/>
    <rect x="2" y="10" width="6" height="6" rx="1.5" fill="rgba(255,255,255,0.5)"/>
    <rect x="10" y="10" width="6" height="6" rx="1.5" fill="white"/>
  </svg></div>`,ns={flashcards:'<svg width="22" height="22" fill="none" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="3" stroke="currentColor" stroke-width="2"/><path d="M8 12h8M12 8v8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',learn:'<svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',match:'<svg width="22" height="22" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/><rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/><rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/><rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/></svg>',test:'<svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M9 11l3 3L22 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'};function g(s){return String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Pe(s){return`<span class="wen">${g(s.en)}</span><span class="wsep">→</span><span class="wua">${g(s.ua)}</span>`}function We(s){return{flashcards:"Картки",learn:"Навчання",match:"Пари",test:"Тест",mistakes:"Повтор помилок","guided-learning":"Покрокове навчання"}[s]||"Сесія"}function Qe(s){if(!s)return"";if(s.mode==="guided-learning"&&t.guidedSession){const n=t.guidedSession.items?t.guidedSession.items.length:0,a=t.guidedSession.currentIndex||0;return`Етап: ${t.guidedSession.phase||"intro"} • ${a}/${n}`}if(s.mode==="match")return`Знайдено ${s.matchedCount||0} з ${s.pairs||0}`;const e=s.index||0,i=s.items?s.items.length:0;return`Пройдено ${e} з ${i}`}let N=null,G=0,ds=null;function T(){N&&(clearInterval(N),N=null),G=0}function H(){ds&&(clearTimeout(ds),ds=null)}function Ys(s,e){H(),ds=setTimeout(s,e)}function Ks(){return G?Math.max(0,Math.ceil((G-Date.now())/1e3)):0}function cs(){return t.settings.timerMode==="custom"?Number(t.settings.timerCustom)||0:t.settings.timer}function Xs(s){const e=Math.floor(s/60),i=s%60;return`${String(e).padStart(2,"0")}:${String(i).padStart(2,"0")}`}function Zs(s){if(s<60)return`${s} сек`;const e=Math.floor(s/60),i=s%60;return i?`${e} хв ${i} сек`:`${e} хв`}function Z(s,e){const i=cs()?`<span class="session-timer">⏱ <span id="session-timer-value">${Xs(Ks())}</span></span>`:"";return`<div class="session-meta"><span>${s}/${e}</span>${i}</div>`}function Es(s){if(!cs()||!G)return;const e=()=>{const i=Ks(),n=document.getElementById("session-timer-value"),a=document.querySelector(".session-timer");n&&(n.textContent=Xs(i)),a&&a.classList.toggle("is-warning",i<=5),i<=0&&(T(),s())};e(),N||(N=setInterval(e,1e3))}function ss(s){T();const e=cs();e&&(G=Date.now()+e*1e3,Es(s))}function es(s){cs()&&G&&(N&&clearInterval(N),N=null,Es(s))}function I(s,e){const i=document.getElementById("timeup-modal");i&&i.remove(),Js().insertAdjacentHTML("beforeend",`<div class="modal-overlay" id="timeup-modal">
    <div class="modal-card">
      <div class="report-title">Час завершився</div>
      <div class="report-reasons">Можна додати ще час і продовжити поточну сесію або повернутись на головний екран.</div>
      <div class="editor-actions">
        <button class="btn btn-primary btn-block" id="timeup-extend-btn">Додати 1 хв</button>
        <button class="btn btn-outline btn-block" id="timeup-home-btn">На головний</button>
      </div>
    </div>
  </div>`),o("timeup-extend-btn",()=>{document.getElementById("timeup-modal")?.remove(),s()}),o("timeup-home-btn",()=>{document.getElementById("timeup-modal")?.remove(),e()})}function B(s,e=60){G=Date.now()+e*1e3,Es(s)}function U(){ys(),T(),t.settings=Y();const s=Ns().length,e=Ts().length,i=Ne(),n=t.lists.find(l=>l.id===t.currentListId),a=n?n.name:"Мій список",d=ze(t.dailyLearned);w(`<div class="home-wrapper">
    <header class="list-header">
      <div class="header-inner">
        <div class="logo">
          ${S}
          <span class="logo-name">Quizled</span>
        </div>
        <div class="header-actions">
          <button class="btn-ghost" id="reset-btn">Скинути прогрес</button>
        </div>
      </div>
    </header>

    <div class="app-layout">
      <aside class="sidebar">

        <div class="sidebar-section sidebar-lists">
          <div class="section-label">Списки</div>
          <nav class="lists-nav">
            ${t.lists.map(l=>`<button class="list-item${l.id===t.currentListId?" active":""}" data-list-id="${g(l.id)}">
              <span class="list-item-name">${g(l.name)}</span>
              <span class="list-item-count">${(t.wordsByList[l.id]||[]).length}</span>
            </button>`).join("")}
            <button class="add-list-btn" id="add-list-btn">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
              Новий список
            </button>
          </nav>
        </div>

        <div class="sidebar-section sidebar-progress">
          <div class="section-label">Стан памʼяті</div>
          <div class="progress-header">
            <div class="progress-percent">${i.memoryPercent}%</div>
          </div>
          <div class="progress-subtitle">${g(i.statusText)}</div>
          <div class="progress-bar-wrap">
            <div class="progress-bar-fill" style="width:${i.memoryPercent}%"></div>
          </div>
          <div class="progress-meta">
            <div class="meta-item">
              <div class="meta-value">${t.items.length}</div>
              <div class="meta-label">Слів</div>
            </div>
            <div class="meta-item">
              <div class="meta-value">${s}</div>
              <div class="meta-label">Помилок</div>
            </div>
            <div class="meta-item">
              <div class="meta-value">${e}</div>
              <div class="meta-label">Обраних</div>
            </div>
          </div>
        </div>

        <div class="sidebar-section sidebar-streak streak-card">
          <div class="streak-inner">
            <div class="streak-icon">🔥</div>
            <div class="streak-text">
              <div class="streak-number">${d} ${_e(d)}</div>
              <div class="streak-desc">Серія без пропусків</div>
            </div>
          </div>
        </div>

      </aside>

      <main class="main-content">
        ${t.items.length?Ve(a,i,s):Ye()}
        ${t.items.length?He(s,e):""}
        ${t.items.length?Ue():""}
      </main>
    </div>

    <div class="mobile-cta-bar">
      <button class="btn btn-primary" id="btn-guided-learning-mobile" style="width:100%">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M7 4l7 5-7 5V4z" fill="white"/></svg>
        ${t.activeSession?"Продовжити сесію →":"Почати навчання"}
      </button>
    </div>
  </div>`),o("m-flash",()=>r("showSessionSettings","flashcards")),o("m-learn",()=>r("showSessionSettings","learn")),o("m-match",()=>r("showSessionSettings","match")),o("m-test",()=>r("showSessionSettings","test")),o("m-mistakes",()=>r("showMistakesHub")),o("m-favorites",()=>r("showSessionSettings","learn","favorites")),o("btn-guided-learning",()=>t.activeSession?as():r("startGuidedLearning")),o("btn-guided-learning-mobile",()=>t.activeSession?as():r("startGuidedLearning")),o("add-list-btn",()=>r("showListsManagement")),o("lists-btn",()=>r("showListsManagement")),o("manage-list-btn",()=>r("showManageVocabulary")),o("empty-list-add-btn",()=>r("showManageVocabulary")),o("vocab-open-all-btn",()=>r("showManageVocabulary")),o("resume-btn",as),o("resume-cancel-btn",()=>{K()&&F(),k(),U()}),o("reset-btn",$),document.querySelectorAll("[data-list-id]").forEach(l=>{l.addEventListener("click",()=>Je(l.dataset.listId))}),document.querySelectorAll("[data-fav-id]").forEach(l=>{l.addEventListener("click",()=>{ws(Number(l.dataset.favId)),U()})})}function ze(s){let e=0;const i=new Date($s());for(;;){const n=i.getFullYear(),a=String(i.getMonth()+1).padStart(2,"0"),d=String(i.getDate()).padStart(2,"0"),l=`${n}-${a}-${d}`;if(!Object.keys(s[l]||{}).length)break;e++,i.setDate(i.getDate()-1)}return e}function _e(s){return s===1?"день":s>=2&&s<=4?"дні":"днів"}function Ve(s,e,i){const a=new Date().toLocaleDateString("uk-UA",{day:"numeric",month:"long"}),d=t.activeSession?`<div class="today-resume">
        <div class="today-resume-meta">
          <div class="today-resume-label">Незавершена сесія</div>
          <div class="today-resume-title">${We(t.activeSession)}</div>
          <div class="today-resume-sub">${Qe(t.activeSession)}</div>
        </div>
        <div class="today-resume-actions">
          <button class="btn btn-primary" id="btn-guided-learning" style="flex:1;min-height:48px">Продовжити →</button>
          <button class="btn-ghost resume-cancel" id="resume-cancel-btn">Відмінити</button>
        </div>
      </div>`:`<div class="cta-row">
        <button class="btn btn-primary" id="btn-guided-learning" style="flex:1;min-height:52px">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M7 4l7 5-7 5V4z" fill="white"/></svg>
          Почати навчання
        </button>
        ${i===0?'<div class="hint-text">Повторень<br>не заплановано</div>':""}
      </div>`;return`<div class="today-block">
    <div class="today-top">
      <div class="today-title">${g(s)}</div>
      <div class="today-date">Сьогодні, ${a}</div>
    </div>
    <div class="today-stats">
      <div class="today-stat">
        <div class="today-stat-value accent">${i}</div>
        <div class="today-stat-label">На повторення</div>
      </div>
      <div class="today-stat">
        <div class="today-stat-value">${e.memoryPercent}%</div>
        <div class="today-stat-label">Памʼять</div>
      </div>
      <div class="today-stat">
        <div class="today-stat-value">${t.items.length}</div>
        <div class="today-stat-label">Слів</div>
      </div>
    </div>
    ${d}
  </div>`}function He(s,e){return`<div class="modes-section">
    <div class="modes-header">
      <span class="modes-title">Інші режими</span>
    </div>
    <div class="modes-grid">
      <button class="mode-card primary-mode" id="m-learn">
        <div class="mode-icon">${ns.learn}</div>
        <div class="mode-name">Навчання</div>
        <div class="mode-desc">Введи відповідь</div>
        <div class="mode-tag">Рекомендовано</div>
      </button>
      <button class="mode-card primary-mode" id="m-flash">
        <div class="mode-icon">${ns.flashcards}</div>
        <div class="mode-name">Картки</div>
        <div class="mode-desc">Перегортання</div>
      </button>
      <button class="mode-card" id="m-match">
        <div class="mode-icon">${ns.match}</div>
        <div class="mode-name">Пари</div>
        <div class="mode-desc">Зʼєднай картки</div>
      </button>
      <button class="mode-card" id="m-test">
        <div class="mode-icon">${ns.test}</div>
        <div class="mode-name">Тест</div>
        <div class="mode-desc">Вибір варіанту</div>
      </button>
    </div>
    ${s?`<div style="height:12px"></div>
    <button class="btn btn-outline btn-block" id="m-mistakes">Повторити ${s} слів з помилками</button>`:""}
    ${e?`<div style="height:8px"></div>
    <button class="btn btn-outline btn-block" id="m-favorites">Вчити ${e} обраних слів</button>`:""}
  </div>`}function Ue(){const s=t.items.slice(0,5),e=t.items.length;return`<div class="vocab-section">
    <div class="vocab-header">
      <span class="vocab-title">Словник</span>
      <div class="vocab-actions">
        <button class="link-btn" id="lists-btn">Списки</button>
        <button class="link-btn" id="manage-list-btn">Відкрити всі →</button>
      </div>
    </div>
    <div class="vocab-preview">
      ${s.map(i=>`<div class="vocab-word">
        <div class="word-pair">
          <span class="word-en">${g(i.en)}</span>
          <div class="word-sep"></div>
          <span class="word-ua">${g(i.ua)}</span>
        </div>
        <div class="word-status${t.mistakes[i.id]?" weak":""}"></div>
      </div>`).join("")}
    </div>
    ${e>5?`<div class="vocab-cta">
      Показано 5 з ${e} слів · <button id="vocab-open-all-btn">Переглянути всі</button>
    </div>`:""}
  </div>`}function Je(s){!s||s===t.currentListId||!qs(s)||(K()&&F(),k(),y(),U())}function Ye(){return`<div class="today-block">
    <div class="today-top">
      <div class="today-title">Список порожній</div>
    </div>
    <div class="mastery-subtitle">Додайте перші слова, щоб почати навчання.</div>
    <div style="height:16px"></div>
    <button class="btn btn-primary btn-block" id="empty-list-add-btn">Додати слова</button>
  </div>`}function $(){const s=document.createElement("div");s.className="modal-overlay",s.innerHTML=`<div class="modal-card">
    <div class="modal-card-title">Скинути прогрес?</div>
    <div class="modal-card-body">Увесь прогрес і словник будуть видалені. Цю дію не можна скасувати.</div>
    <div class="modal-card-actions">
      <button class="btn btn-err btn-block" id="confirm-reset-btn">Так, скинути</button>
      <button class="btn btn-ghost btn-block" id="cancel-reset-btn">Скасувати</button>
    </div>
  </div>`,document.body.appendChild(s),s.querySelector("#confirm-reset-btn").addEventListener("click",()=>{s.remove(),Ke()}),s.querySelector("#cancel-reset-btn").addEventListener("click",()=>s.remove()),s.addEventListener("click",e=>{e.target===s&&s.remove()})}function Ke(){he(),t.currentListId=O,t.lists=[{id:O,name:"Мій список",createdAt:Date.now()}],t.wordsByList={},t.progressByList={},t.progressByModeByList={},t.items=[],t.progress={correct:0,total:0},t.progressByMode=os(),t.dailyLearned={},t.dailyGuidedLearned={},t.memoryByWord={},t.mistakes={},t.favorites={},t.flashcardStats={},t.guidedSession=null,t.settings=Y(),T(),r("showImport")}const Ds=[{key:"intro",num:1,label:"Ознайомлення",desc:"Картки EN → UA"},{key:"recall",num:2,label:"Картки",desc:"Автоматичне перегортання"},{key:"input",num:3,label:"Навчання",desc:"Введи відповідь"},{key:"test",num:4,label:"Тест",desc:"Вибір варіанту"}];function se(){return`<header class="list-header">
    <div class="header-inner">
      <div class="logo">
        ${S}
        <span class="logo-name">Quizled</span>
      </div>
      <div class="header-actions">
        <button class="btn-ghost" id="reset-btn">Скинути прогрес</button>
      </div>
    </div>
  </header>`}function Xe(s){const e=Ds.findIndex(i=>i.key===s);return`<aside class="guided-tracker">
    <div class="ssb-label">Фази навчання</div>
    <div class="guided-phases">
      ${Ds.map((i,n)=>{const a=n<e;return`<div class="guided-phase${n===e?" active":""}${a?" done":""}">
          <div class="guided-phase-dot">${a?"✓":i.num}</div>
          <div class="guided-phase-info">
            <div class="guided-phase-name">${i.label}</div>
            <div class="guided-phase-desc">${i.desc}</div>
          </div>
        </div>`}).join("")}
    </div>
  </aside>`}function gs(){if(!t.guidedSession){r("showList");return}if((t.guidedSession.listId||t.currentListId)!==t.currentListId){F(),k(),r("showList");return}const s=t.guidedSession.phase,e=t.guidedSession.items||[];if(!e.length&&s!=="intro"){F(),k(),r("showList");return}s==="intro"?r("showGuidedLearning"):s==="recall"?r("showFlashcards",e,"guided-learning",st(e)):s==="input"?r("showLearn",e,"guided-learning",et(e)):s==="test"?r("showTest",e,"guided-learning",tt()):r("showList")}function Ze(){const s=[...t.items];if(!s.length){w(`<div class="screen">
      ${se()}
      <div class="inner-panel-page guided-empty-page">
        <div class="settings-panel-head inner-panel-head">
          <button class="settings-back-btn" id="tb-back" type="button">← Назад</button>
          <div class="settings-panel-title">Покрокове навчання</div>
          <div class="settings-panel-sub">Немає слів</div>
        </div>
        <div class="inner-panel-body">
          <div class="learn-area">
            <div class="sec-label">Словник порожній</div>
            <div class="empty-list-copy">Додайте хоча б одну пару, щоб почати навчання.</div>
          </div>
          <div class="card-actions">
            <button class="btn btn-primary btn-block" id="guided-add-words-btn">Додати слова</button>
          </div>
        </div>
      </div>
    </div>`),o("tb-back",()=>r("showList")),o("reset-btn",$),o("guided-add-words-btn",()=>r("showManageVocabulary"));return}X({listId:t.currentListId,items:s,currentIndex:0,phase:"intro",correct:0,wrongQueue:[],resumeState:null}),t.activeSession={mode:"guided-learning",source:"guided-learning",listId:t.currentListId,items:s},y(),ee()}function ee(){if(!t.guidedSession){k(),r("showList");return}if((t.guidedSession.listId||t.currentListId)!==t.currentListId){F(),k(),r("showList");return}if(t.guidedSession.phase!=="intro"){gs();return}const s=t.guidedSession.items.length;w(`<div class="screen">
    ${se()}
    <div class="inner-panel-page guided-page">
      <div class="settings-panel-head inner-panel-head">
        <button class="settings-back-btn" id="tb-back" type="button">← Назад</button>
        <div class="settings-panel-title">Покрокове навчання</div>
        <div class="settings-panel-sub">${s} слів</div>
      </div>
      <div class="inner-panel-body">
        <div class="guided-layout">

      <div class="guided-content">
        <div class="guided-intro-card">
          <div class="guided-intro-icon">🎓</div>
          <div class="guided-intro-title">Покрокове навчання</div>
          <div class="guided-intro-sub">${s} слів · 4 фази</div>
          <div class="guided-intro-desc">
            Програма проведе вас через чотири фази — від ознайомлення до перевірки.
            Слова з помилками автоматично повертаються на повтор.
          </div>
          <div class="guided-intro-steps">
            <div class="guided-intro-step">
              <span class="guided-step-num">1</span>
              <span>Ознайомтесь зі словами через картки (EN→UA)</span>
            </div>
            <div class="guided-intro-step">
              <span class="guided-step-num">2</span>
              <span>Введіть переклад вручну</span>
            </div>
            <div class="guided-intro-step">
              <span class="guided-step-num">3</span>
              <span>Пройдіть тест з вибором варіанту</span>
            </div>
            <div class="guided-intro-step">
              <span class="guided-step-num">4</span>
              <span>Помилки автоматично повторяться</span>
            </div>
          </div>
          <button class="btn btn-primary btn-block" id="guided-next-btn" style="margin-top:8px">Почати →</button>
        </div>
      </div>

      ${Xe("intro")}

        </div>
      </div>
    </div>
  </div>`),o("tb-back",()=>r("showList")),o("reset-btn",$),o("guided-next-btn",()=>{X({...t.guidedSession,phase:"recall",currentIndex:0,wrongQueue:[],resumeState:null}),gs()})}function st(s){return t.guidedSession.resumeState?t.guidedSession.resumeState:t.guidedSession.currentIndex>0?{index:t.guidedSession.currentIndex,queue:s,baseItems:s,deckItems:s,missedIds:t.guidedSession.wrongQueue||[],sessionResults:{}}:null}function et(s){return t.guidedSession.resumeState?t.guidedSession.resumeState:t.guidedSession.currentIndex>0?{index:t.guidedSession.currentIndex,queue:[...s],wrongQueue:t.guidedSession.wrongQueue||[],sessionCorrect:t.guidedSession.correct||0,sessionWrong:(t.guidedSession.wrongQueue||[]).length}:null}function tt(){return t.guidedSession.resumeState?t.guidedSession.resumeState:t.guidedSession.currentIndex>0?{index:t.guidedSession.currentIndex}:null}function us(s,e=!1){return e?`<button class="btn-ghost fav-inline-btn flashcard-fav${t.favorites[s]?" active":""}" data-inline-fav="${s}" data-inline-fav-compact="1" aria-label="Додати в обране">${t.favorites[s]?"★":"☆"}</button>`:`<button class="btn-ghost fav-inline-btn${t.favorites[s]?" active":""}" data-inline-fav="${s}">${t.favorites[s]?"★ В обраному":"☆ В обране"}</button>`}function vs(){document.querySelectorAll("[data-inline-fav]").forEach(s=>{s.addEventListener("click",e=>{e.stopPropagation(),ws(Number(s.dataset.inlineFav));const i=t.favorites[Number(s.dataset.inlineFav)];s.textContent=s.dataset.inlineFavCompact?i?"★":"☆":i?"★ В обраному":"☆ В обране",s.classList.toggle("active",!!i)})})}function it(s){if(!s)return"";const e=[];return s.missingEnglish&&e.push(`${s.missingEnglish} без english`),s.missingUkrainian&&e.push(`${s.missingUkrainian} без ukrainian`),s.duplicates&&e.push(`${s.duplicates} дублікати`),`<div class="ui-card report-box">
    <div class="report-title">Перевірка імпорту</div>
    <div class="report-stats">
      <span>Знайдено: ${s.total}</span>
      <span>Валідно: ${s.valid}</span>
      <span>Пропущено: ${s.skipped}</span>
    </div>
    ${e.length?`<div class="report-reasons">${e.join(" • ")}</div>`:'<div class="report-reasons">Усі пари валідні.</div>'}
    <button class="btn btn-primary btn-block" id="confirm-import-btn">Завантажити ${s.valid} пар</button>
  </div>`}function nt(){return`<header class="list-header">
    <div class="header-inner">
      <div class="logo">
        ${S}
        <span class="logo-name">Quizled</span>
      </div>
      <div class="header-actions">
        <button class="btn-ghost" id="reset-btn">Скинути прогрес</button>
      </div>
    </div>
  </header>`}function ls(s="json"){T(),t.pendingImport=null;const e=t.items.length>0;w(`<div class="screen">
    ${nt()}
    <div class="inner-panel-page import-page">
      <div class="settings-panel-head inner-panel-head">
        ${e?'<button class="settings-back-btn" id="tb-back" type="button">← Назад</button>':"<span></span>"}
        <div class="settings-panel-title">Додати словник</div>
        <div class="settings-panel-sub">${s==="json"?"JSON імпорт":"Ручне створення"}</div>
      </div>
      <div class="inner-panel-body">
        <div class="import-layout">

      <div class="import-guide">
        <span class="guide-section-label">Формат JSON</span>
        <button class="guide-toggle-btn" id="guide-toggle">
          Формат JSON
          <svg class="guide-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="guide-body" id="guide-body">
          <div class="fmt-box">
            <pre class="fmt-pre">{
  "vocabulary": {
    "words": [
      {
        "english": "hello",
        "ukrainian": "привіт"
      }
    ],
    "phrases": [
      {
        "english": "good morning",
        "ukrainian": "добрий ранок"
      }
    ]
  }
}</pre>
          </div>
          <div class="import-tips">
            <div class="import-tip">✓ До 500 пар за один імпорт</div>
            <div class="import-tip">✓ Підтримуються слова та фрази</div>
            <div class="import-tip">✓ Дублікати автоматично пропускаються</div>
            <div class="import-tip">✓ Детальний звіт після перевірки</div>
          </div>
        </div>
      </div>

      <div class="import-form">
        <div class="import-switch">
          <button class="btn-select switch-btn${s==="json"?" active":""}" id="import-json-btn">JSON</button>
          <button class="btn-select switch-btn${s==="manual"?" active":""}" id="import-manual-btn">Вручну</button>
        </div>
        ${s==="json"?at():dt()}
      </div>

        </div>
      </div>
    </div>
  </div>`),e&&o("tb-back",()=>r("showList")),o("reset-btn",$),o("guide-toggle",()=>{const i=document.getElementById("guide-body"),n=document.getElementById("guide-toggle"),a=i.classList.toggle("is-open");n.classList.toggle("is-open",a)}),o("import-json-btn",()=>ls("json")),o("import-manual-btn",()=>ls("manual")),o("manual-start-btn",()=>r("showManageVocabulary",null,q(),!0)),o("validate-btn",rt),o("demo-btn",()=>{document.getElementById("json-in").value=JSON.stringify(lt(),null,2)})}function at(){return`<textarea id="json-in" class="json-in" placeholder="Вставте JSON тут..." spellcheck="false"></textarea>
    <div id="imp-err" class="err-msg"></div>
    <button class="btn btn-primary btn-block" id="validate-btn">Перевірити JSON</button>
    <div class="demo-row"><button id="demo-btn">Спробувати демо-дані</button></div>
    <div id="import-report-slot"></div>`}function dt(){return`<div class="manual-start">
    <div class="fmt-box">
      <div class="manual-copy">Створіть словник вручну: додавайте, редагуйте і видаляйте пари слів у простому редакторі.</div>
    </div>
    <button class="btn btn-primary btn-block" id="manual-start-btn">Почати вручну →</button>
  </div>`}function rt(){const s=document.getElementById("json-in").value.trim(),e=document.getElementById("imp-err"),i=document.getElementById("import-report-slot");e.style.display="none",i.innerHTML="";try{t.pendingImport=Te(s),i.innerHTML=it(t.pendingImport.report),o("confirm-import-btn",()=>{t.currentListId=O,t.lists=[{id:O,name:"Мій список",createdAt:Date.now()}],t.wordsByList={},t.progressByList={},t.progressByModeByList={},t.items=t.pendingImport.items,t.progress={correct:0,total:0},t.progressByMode=os(),t.dailyLearned={},t.dailyGuidedLearned={},t.memoryByWord={},t.mistakes={},t.favorites={},t.flashcardStats={},t.activeSession=null,t.guidedSession=null,t.pendingImport=null,y(),r("showList")})}catch(n){e.textContent=n.message,e.style.display="block"}}function lt(){return{vocabulary:{words:[{english:"hello",ukrainian:"привіт"},{english:"goodbye",ukrainian:"до побачення"},{english:"thank you",ukrainian:"дякую"},{english:"please",ukrainian:"будь ласка"},{english:"yes",ukrainian:"так"},{english:"no",ukrainian:"ні"},{english:"water",ukrainian:"вода"},{english:"food",ukrainian:"їжа"},{english:"house",ukrainian:"будинок"},{english:"friend",ukrainian:"друг"},{english:"love",ukrainian:"кохання"},{english:"time",ukrainian:"час"},{english:"work",ukrainian:"робота"},{english:"day",ukrainian:"день"},{english:"night",ukrainian:"ніч"},{english:"sun",ukrainian:"сонце"}],phrases:[{english:"good morning",ukrainian:"добрий ранок"},{english:"how are you",ukrainian:"як справи"},{english:"nice to meet you",ukrainian:"приємно познайомитись"},{english:"i don't understand",ukrainian:"я не розумію"}]}}}let p={creating:!1,createError:"",renamingId:null,renameError:"",confirmDeleteId:null};function ot(){return`<header class="list-header">
    <div class="header-inner">
      <div class="logo">
        ${S}
        <span class="logo-name">Quizled</span>
      </div>
      <div class="header-actions">
        <button class="btn-ghost" id="reset-btn">Скинути прогрес</button>
      </div>
    </div>
  </header>`}function ct(s){return(t.wordsByList[s]||[]).length?_s(s)?ks(s)>=100?"Повторити слова":"Продовжити навчання":"Почати навчання":"Додати слова"}function ut(s){return(t.wordsByList[s]||[]).length?_s(s)?ks(s)>=100?"review":"continue":"start":"add"}function vt(){return p.creating?`<div class="list-create-form">
    <input
      type="text"
      class="list-name-field${p.createError?" has-error":""}"
      id="new-list-input"
      placeholder="Назва нового списку..."
      autofocus
    >
    ${p.createError?`<div class="list-field-error">${g(p.createError)}</div>`:""}
    <div class="list-create-btns">
      <button class="btn btn-primary" id="save-new-list-btn">Створити</button>
      <button class="btn btn-ghost" id="cancel-create-btn">Скасувати</button>
    </div>
  </div>`:""}function bt(s){const e=t.wordsByList[s.id]||[],i=ks(s.id),n=s.id===t.currentListId,a=p.renamingId===s.id,d=p.confirmDeleteId===s.id,l=a?`<div class="list-rename-form">
        <input
          type="text"
          class="list-name-field${p.renameError?" has-error":""}"
          id="rename-input-${g(s.id)}"
          value="${g(s.name)}"
          autofocus
        >
        ${p.renameError?`<div class="list-field-error">${g(p.renameError)}</div>`:""}
        <div class="list-create-btns">
          <button class="btn btn-primary" data-save-rename="${g(s.id)}">Зберегти</button>
          <button class="btn btn-ghost" id="cancel-rename-btn">Скасувати</button>
        </div>
      </div>`:`<div class="list-manage-head">
        <div class="list-manage-name">${g(s.name)}</div>
        ${n?'<span class="list-badge">Активний</span>':""}
      </div>
      <div class="list-manage-meta">${e.length} слів • ${i}%</div>`,c=a?"":d?`<div class="list-delete-confirm">
        <span class="list-delete-question">Видалити список «${g(s.name)}»?</span>
        <button class="btn btn-sm btn-err" data-confirm-delete="${g(s.id)}">Так, видалити</button>
        <button class="btn btn-ghost btn-sm" id="cancel-delete-btn">Скасувати</button>
      </div>`:`<div class="list-manage-actions">
        <button class="mini-btn" data-list-open="${g(s.id)}">${ct(s.id)}</button>
        <button class="mini-btn" data-list-select="${g(s.id)}">Зробити активним</button>
        <button class="mini-btn" data-list-rename="${g(s.id)}">Редагувати</button>
        <button class="mini-btn danger" data-list-delete="${g(s.id)}">Видалити</button>
      </div>`;return`<div class="list-manage-row${n?" active":""}">
    ${l}
    ${c}
  </div>`}function L(){w(`<div class="screen">
    ${ot()}
    <div class="inner-panel-page lists-manage-page">
      <div class="settings-panel-head inner-panel-head">
        <button class="settings-back-btn" id="tb-back" type="button">← Назад</button>
        <div class="settings-panel-title">Списки</div>
        <div class="settings-panel-sub">${t.lists.length} ${gt(t.lists.length)}</div>
      </div>
      <div class="inner-panel-body">
        <div class="sec">
          <div class="sec-head">
            <div class="sec-label">Управління списками</div>
            ${p.creating?"":'<button class="btn btn-outline" id="create-list-btn">Створити список</button>'}
          </div>
          ${vt()}
          <div class="list-manage-wrap">
            ${(t.lists||[]).map(s=>bt(s)).join("")}
          </div>
        </div>
      </div>
    </div>
  </div>`),mt()}function mt(){o("tb-back",()=>{p=W(),r("showList")}),o("reset-btn",$),o("create-list-btn",()=>{p.creating=!0,p.createError="",L(),document.getElementById("new-list-input")?.focus()}),o("save-new-list-btn",()=>{const e=document.getElementById("new-list-input"),i=e?e.value.trim():"";try{we(i),p=W(),L()}catch(n){p.createError=n.message,L()}}),o("cancel-create-btn",()=>{p.creating=!1,p.createError="",L()}),document.getElementById("new-list-input")?.addEventListener("keydown",e=>{e.key==="Enter"&&document.getElementById("save-new-list-btn")?.click(),e.key==="Escape"&&document.getElementById("cancel-create-btn")?.click()}),document.querySelectorAll("[data-list-open]").forEach(e=>{e.addEventListener("click",()=>ht(e.dataset.listOpen))}),document.querySelectorAll("[data-list-select]").forEach(e=>{e.addEventListener("click",()=>{te(e.dataset.listSelect)&&(p=W(),L())})}),document.querySelectorAll("[data-list-rename]").forEach(e=>{e.addEventListener("click",()=>{p.renamingId=e.dataset.listRename,p.renameError="",L(),document.getElementById(`rename-input-${p.renamingId}`)?.focus(),document.getElementById(`rename-input-${p.renamingId}`)?.select()})}),document.querySelectorAll("[data-save-rename]").forEach(e=>{e.addEventListener("click",()=>{const i=e.dataset.saveRename,n=document.getElementById(`rename-input-${i}`),a=n?n.value.trim():"";try{$e(i,a),p=W(),L()}catch(d){p.renameError=d.message,L()}})}),o("cancel-rename-btn",()=>{p.renamingId=null,p.renameError="",L()}),(t.lists||[]).map(e=>e.id).forEach(e=>{document.getElementById(`rename-input-${e}`)?.addEventListener("keydown",i=>{i.key==="Enter"&&document.querySelector(`[data-save-rename="${e}"]`)?.click(),i.key==="Escape"&&document.getElementById("cancel-rename-btn")?.click()})}),document.querySelectorAll("[data-list-delete]").forEach(e=>{e.addEventListener("click",()=>{p.confirmDeleteId=e.dataset.listDelete,L()})}),document.querySelectorAll("[data-confirm-delete]").forEach(e=>{e.addEventListener("click",()=>{ke(e.dataset.confirmDelete),p=W(),L()})}),o("cancel-delete-btn",()=>{p.confirmDeleteId=null,L()})}function W(){return{creating:!1,createError:"",renamingId:null,renameError:"",confirmDeleteId:null}}function gt(s){return s===1?"список":s>=2&&s<=4?"списки":"списків"}function te(s){return qs(s)?(F(),k(),y(),!0):!1}function ht(s){if(!te(s))return;const i=ut(s);if(i==="add"){r("showManageVocabulary");return}if(i==="review"){Ss("flashcards");return}r("startGuidedLearning")}function ft(){ys(),p=W(),L()}function pt(){return`<header class="list-header">
    <div class="header-inner">
      <div class="logo">
        ${S}
        <span class="logo-name">Quizled</span>
      </div>
      <div class="header-actions">
        <button class="btn-ghost" id="reset-btn">Скинути прогрес</button>
      </div>
    </div>
  </header>`}function D(s=null,e=q(),i=!1,n="",a=null){const d=s?t.items.find(u=>u.id===s):null,l=s&&!e.en&&!e.ua?{en:d.en,ua:d.ua}:e,c=t.items.length;w(`<div class="screen">
    ${pt()}
    <div class="inner-panel-page vocab-page">
      <div class="settings-panel-head inner-panel-head">
        <button class="settings-back-btn" id="tb-back" type="button">← Назад</button>
        <div class="settings-panel-title">Словник</div>
        <div class="settings-panel-sub">${i?"Ручне створення":`${c} ${yt(c)}`}</div>
      </div>
      <div class="inner-panel-body">
        <div class="vocab-layout">

      <aside class="vocab-form-pane">
        <div class="sec-label">${s?"Редагувати пару":"Додати пару"}</div>
        <label class="custom-field">
          <span>English</span>
          <input id="pair-en" class="text-in" type="text" value="${g(l.en||"")}" autocomplete="off" spellcheck="false" placeholder="hello">
        </label>
        <label class="custom-field">
          <span>Ukrainian</span>
          <input id="pair-ua" class="text-in" type="text" value="${g(l.ua||"")}" autocomplete="off" spellcheck="false" placeholder="привіт">
        </label>
        ${n?`<div class="err-msg" style="display:block">${g(n)}</div>`:""}
        ${a?wt(a):""}
        <div class="editor-actions">
          <button class="btn btn-primary btn-block" id="save-pair-btn">${s?"Зберегти зміни":"Додати пару"}</button>
          ${s?'<button class="btn btn-outline btn-block" id="cancel-edit-btn">Скасувати</button>':""}
        </div>
      </aside>

      <main class="vocab-list-pane">
        <div class="vocab-list-header">
          <div class="vocab-list-header-top">
            <div class="sec-label" style="margin-bottom:0">Список пар (${c})</div>
            ${!i&&c?'<button class="btn-ghost" id="done-manage-btn">Готово</button>':""}
          </div>
          ${c?'<input type="text" id="vocab-search" class="vocab-search" placeholder="🔍 Пошук слів..." autocomplete="off">':""}
        </div>
        <div class="word-list" id="vocab-word-list">${$t(s)}</div>
        ${i?`<button class="btn btn-outline btn-block" id="finish-manual-btn" ${c?"":"disabled"}>Перейти до режимів</button>`:""}
      </main>

        </div>
      </div>
    </div>
  </div>`),o("tb-back",i?()=>r("showImport","manual"):()=>r("showList")),o("reset-btn",$),o("done-manage-btn",()=>r("showList")),o("cancel-edit-btn",()=>D(null,q(),i)),o("finish-manual-btn",()=>r("showList")),o("save-pair-btn",()=>kt(s,i)),o("merge-existing-btn",()=>{qe(a.item.id,s,l),D(null,q(),i)}),o("keep-separate-btn",()=>{Hs(s,l),D(null,q(),i)});const b=document.getElementById("vocab-search");b&&b.addEventListener("input",u=>{const h=u.target.value.toLowerCase().trim();document.querySelectorAll(".manage-row").forEach(v=>{const m=!h||(v.dataset.search||"").includes(h);v.style.display=m?"":"none"})}),["pair-en","pair-ua"].forEach(u=>{const h=document.getElementById(u);h&&h.addEventListener("keydown",v=>{v.key==="Enter"&&(v.preventDefault(),document.getElementById("save-pair-btn")?.click())})}),Lt(i)}function yt(s){return s===1?"пара":s>=2&&s<=4?"пари":"пар"}function wt(s){return`<div class="ui-card merge-box">
    <div class="report-title">Схожа пара вже існує</div>
    <div class="report-reasons">${g(s.reason)}</div>
    <div class="merge-pair">${g(s.item.en)} → ${g(s.item.ua)}</div>
    <div class="editor-actions">
      <button class="btn btn-outline btn-block" id="merge-existing-btn">Оновити існуючу</button>
      <button class="btn btn-primary btn-block" id="keep-separate-btn">Додати окремо</button>
    </div>
  </div>`}function $t(s){return t.items.length?t.items.map(e=>{const i=`${e.en} ${e.ua}`.toLowerCase();return`<div class="manage-row${s===e.id?" editing":""}" data-search="${g(i)}">
      <div class="manage-pair">
        <span class="wen">${g(e.en)}</span>
        <span class="wsep">→</span>
        <span class="wua">${g(e.ua)}</span>
      </div>
      <div class="manage-actions">
        <button class="mini-btn" data-edit-id="${e.id}">Редагувати</button>
        <button class="mini-btn danger" data-delete-id="${e.id}">Видалити</button>
      </div>
    </div>`}).join(""):'<div class="empty-list-copy">Поки що немає жодної пари. Додайте першу зліва.</div>'}function kt(s,e){const i={en:document.getElementById("pair-en").value,ua:document.getElementById("pair-ua").value},n=Re(s,i);try{if(n.type==="duplicate")throw new Error("Така пара вже є у словнику.");if(n.type==="overlap"){D(s,i,e,"",n);return}Hs(s,i),D(null,q(),e)}catch(a){D(s,i,e,a.message)}}function Lt(s){document.querySelectorAll("[data-edit-id]").forEach(e=>{e.addEventListener("click",()=>{const i=t.items.find(n=>n.id===Number(e.dataset.editId));D(i.id,{en:i.en,ua:i.ua},s)})}),document.querySelectorAll("[data-delete-id]").forEach(e=>{e.addEventListener("click",()=>{Fe(Number(e.dataset.deleteId)),D(null,q(),s)})})}function J(s,e="all",i=!1){T(),i||(t.settings=Y());const n=Rs(e);if(!n.length){r("showList");return}const a=n.length,d=Math.max(1,Math.ceil(a/4)),l=Math.max(1,Math.ceil(a/2)),c=[{value:d,label:`25% (${d})`},{value:l,label:`Середнє (${l})`},{value:"all",label:`Усі (${a})`}].filter((m,f,x)=>x.findIndex(E=>E.value===m.value)===f),b=c.some(m=>m.value===t.settings.count)?t.settings.count:"all",u=Math.min(a,Math.max(1,Number(t.settings.countCustom)||1)),h=Math.max(30,Number(t.settings.timerCustom)||30),v={flashcards:"Картки",learn:"Навчання",match:"Пари",test:"Тест",mistakes:"Повтор помилок","guided-learning":"Покрокове навчання"}[s];w(`<div class="screen">
    <header class="list-header">
      <div class="header-inner">
        <div class="logo">
          ${S}
          <span class="logo-name">Quizled</span>
        </div>
        <div class="header-actions">
          <button class="btn-ghost" id="reset-btn">Скинути прогрес</button>
        </div>
      </div>
    </header>

    <div class="settings-page">
      <div class="settings-panel-head">
        <button class="settings-back-btn" id="tb-back" type="button">← Назад</button>
        <div class="settings-panel-title">${v}</div>
        <div class="settings-panel-sub">Налаштування сесії</div>
      </div>
      <div class="settings-layout">

        <div class="settings-section settings-col">
          <div class="settings-col-title">Кількість слів</div>
          <div class="settings-block">
            <div class="settings-subtitle">Швидкий старт</div>
            <div class="settings-grid">
              ${c.map(m=>`<button class="btn-select setting-btn${t.settings.countMode==="preset"&&b===m.value?" active":""}" data-count="${m.value}">${m.label}</button>`).join("")}
            </div>
            <div class="settings-subtitle">Свій варіант</div>
            ${t.settings.countMode==="custom"?`<label class="custom-field custom-field-inline">
                  <span>Слів у сесію</span>
                  <div class="stepper">
                    <button class="stepper-btn" type="button" data-step-target="count" data-step-dir="-1">−</button>
                    <input id="count-custom-input" class="custom-input" type="number" min="1" max="${a}" value="${u}" inputmode="numeric">
                    <button class="stepper-btn" type="button" data-step-target="count" data-step-dir="1">+</button>
                  </div>
                  <small>Доступно до ${a} слів.</small>
                </label>`:'<button class="btn-select setting-wide" id="count-custom-toggle" type="button">Точна кількість слів</button>'}
          </div>
        </div>

        <div class="settings-section settings-col">
          <div class="settings-col-title">Таймер</div>
          <div class="settings-block">
            <div class="settings-subtitle">Готові варіанти</div>
            <div class="settings-grid">
              ${[{value:0,label:"Без таймера"},{value:30,label:"30 сек"},{value:60,label:"1 хв"},{value:180,label:"3 хв"}].map(m=>`<button class="btn-select setting-btn${t.settings.timerMode==="preset"&&t.settings.timer===m.value?" active":""}" data-timer="${m.value}">${m.label}</button>`).join("")}
            </div>
            <div class="settings-subtitle">Свій варіант</div>
            ${t.settings.timerMode==="custom"?`<label class="custom-field custom-field-inline">
                  <span>Тривалість сесії</span>
                  <div class="stepper">
                    <button class="stepper-btn" type="button" data-step-target="timer" data-step-dir="-1">−</button>
                    <div class="custom-display" id="timer-custom-display" aria-live="polite">${Zs(h)}</div>
                    <button class="stepper-btn" type="button" data-step-target="timer" data-step-dir="1">+</button>
                  </div>
                  <small>Від 30 сек до 120 хв, крок 15 сек.</small>
                </label>`:'<button class="btn-select setting-wide" id="timer-custom-toggle" type="button">Свій час</button>'}
          </div>
        </div>

      </div>
      <div class="settings-note">Є готові пресети для швидкого старту і окремий шлях для точного ручного налаштування. Таймер завершує сесію автоматично.</div>
      <div class="settings-cta">
        <div id="ss-error" class="err-msg" style="display:none;margin-bottom:10px"></div>
        <button class="btn btn-primary btn-block" id="ss-start">${hs(t.settings)}</button>
      </div>
    </div>
  </div>`),o("tb-back",()=>r("showList")),o("reset-btn",$),o("count-custom-toggle",()=>{t.settings.countMode="custom",J(s,e,!0)}),o("timer-custom-toggle",()=>{t.settings.timerMode="custom",J(s,e,!0)}),o("ss-start",()=>St(s,e,a)),Et(s,e),It(a)}function hs(){return"Почати"}function St(s,e,i){const n=document.getElementById("ss-error");if(t.settings.countMode==="custom"){const a=Number(document.getElementById("count-custom-input")?.value);if(!a||a<1||a>i){n.textContent=`Вкажіть кількість слів від 1 до ${i}.`,n.style.display="block";return}t.settings.countCustom=a}if(t.settings.timerMode==="custom"){const a=Number(t.settings.timerCustom);if(!a||a<30||a>7200){n.textContent="Вкажіть час від 30 секунд до 120 хвилин.",n.style.display="block";return}}n.style.display="none",Ss(s,e)}function Et(s,e){document.querySelectorAll("[data-count]").forEach(i=>{i.addEventListener("click",()=>{t.settings.countMode="preset",t.settings.count=i.dataset.count==="all"?"all":Number(i.dataset.count),J(s,e,!0)})}),document.querySelectorAll("[data-timer]").forEach(i=>{i.addEventListener("click",()=>{t.settings.timerMode="preset",t.settings.timer=Number(i.dataset.timer),J(s,e,!0)})})}function It(s,e,i,n,a,d){document.querySelectorAll("[data-step-target]").forEach(l=>{l.addEventListener("click",()=>{const c=l.dataset.stepTarget,b=Number(l.dataset.stepDir);if(c==="count"){const u=document.getElementById("count-custom-input"),h=Number(u.value)||1,v=Math.min(s,Math.max(1,h+b));u.value=v,t.settings.countCustom=v;const m=document.getElementById("ss-start");m&&(m.textContent=hs(t.settings))}if(c==="timer"){const u=document.getElementById("timer-custom-display"),h=Number(t.settings.timerCustom)||30,v=Math.min(7200,Math.max(30,h+b*15));t.settings.timerCustom=v,u&&(u.textContent=Zs(v));const m=document.getElementById("ss-start");m&&(m.textContent=hs(t.settings))}})})}function Is(){return`<header class="list-header">
    <div class="header-inner">
      <div class="logo">
        ${S}
        <span class="logo-name">Quizled</span>
      </div>
      <div class="header-actions">
        <button class="btn-ghost" id="reset-btn">Скинути прогрес</button>
      </div>
    </div>
  </header>`}function V(s){return`<div class="r-word-row">
    <span class="r-word-en">${g(s.en)}</span>
    <span class="r-word-sep">—</span>
    <span class="r-word-ua">${g(s.ua)}</span>
  </div>`}function Bt(s,e,i,n,a){if(K()&&t.guidedSession.phase==="input"){X({...t.guidedSession,phase:"test",currentIndex:0,resumeState:null}),r("launchGuidedPhase");return}k();const d=t.items.filter(u=>[...new Set(n)].includes(u.id)),l=t.items.filter(u=>!n.includes(u.id)),c=e+i,b=c?Math.round(e/c*100):0;w(`<div class="screen result-screen">
    ${Is()}
    <div class="result-session-layout loop-result-layout">
      <div class="settings-panel-head result-session-head">
        <button class="settings-back-btn" id="tb-back" type="button">← Назад</button>
        <div class="settings-panel-title">${s} завершено</div>
        <div class="settings-panel-sub">${e}/${c}</div>
      </div>

      <div class="result-session-body">
        <div class="result-session-hero">
          <div class="result-session-kicker">Підсумок сесії</div>
          <div class="result-session-title">${d.length?"Є помилки для повторення":"Сесію закрито"}</div>
          <div class="result-session-sub">${e} правильних • ${i} помилок</div>
          <div class="result-session-score"><span>${b}%</span><small>точність</small></div>
        </div>

        <div class="result-session-side">
          <div class="result-stats result-session-stats">
            <div class="result-stat">
              <div class="result-stat-value ok">${e}</div>
              <div class="result-stat-label">Правильно</div>
            </div>
            <div class="result-stat">
              <div class="result-stat-value err">${i}</div>
              <div class="result-stat-label">Помилки</div>
            </div>
            <div class="result-stat">
              <div class="result-stat-value">${c}</div>
              <div class="result-stat-label">Всього</div>
            </div>
          </div>
          <div class="result-session-note ${d.length?"needs-review":"is-complete"}">
            ${d.length?`Повтори ${d.length} ${d.length===1?"слово":"слів"}, щоб закрити помилки.`:"Помилок немає. Можна перейти на головну або повторити сесію."}
          </div>
        </div>
      </div>

      ${d.length?`<div class="result-detail-sections">
            <div class="result-words-section">
              <div class="result-words-title ok">Правильно (${e})</div>
              ${l.slice(0,10).map(V).join("")}
            </div>
            <div class="result-words-section">
              <div class="result-words-title err">Помилки (${d.length})</div>
              ${d.map(V).join("")}
            </div>
          </div>`:""}

      <div class="result-actions result-session-actions">
        <button class="btn btn-primary" id="loop-retry-btn">Повторити</button>
        <button class="btn btn-outline" id="loop-home-btn">На головну</button>
      </div>
    </div>
  </div>`),o("tb-back",()=>r("showList")),o("reset-btn",$),o("loop-retry-btn",a),o("loop-home-btn",()=>r("showList"))}function ie(s,e,i){const{confidentItems:n,recoveredItems:a,unresolvedItems:d}=zs(s,e,i),l=n.length+a.length;w(`<div class="screen result-screen">
    ${Is()}
    <div class="result-session-layout flashcards-result-layout">
      <div class="settings-panel-head result-session-head">
        <button class="settings-back-btn" id="tb-back" type="button">← Назад</button>
        <div class="settings-panel-title">Результат карток</div>
        <div class="settings-panel-sub">${l} закрито • ${d.length} слабких</div>
      </div>

      <div class="result-detail-sections fc-breakdown">
        <div class="result-words-section">
          <div class="result-words-title ok">Знав відразу (${n.length})</div>
          ${n.length?n.map(V).join(""):'<div class="fc-empty">У цій сесії не було слів, які ви закрили з першої спроби.</div>'}
        </div>
        <div class="result-words-section">
          <div class="result-words-title accent">Закрив після повтору (${a.length})</div>
          ${a.length?a.map(V).join(""):'<div class="fc-empty">Поки що немає слів у цій групі.</div>'}
        </div>
        <div class="result-words-section">
          <div class="result-words-title err">Ще не знаю (${d.length})</div>
          ${d.length?d.map(V).join(""):'<div class="fc-empty">Всі слабкі слова були закриті!</div>'}
        </div>
      </div>

      <div class="result-actions result-session-actions">
        ${n.length||a.length?'<button class="btn btn-outline" id="known-test-btn">Тест закритих</button>':""}
        ${d.length?'<button class="btn btn-primary" id="unknown-learn-btn">Вчити слабкі</button>':""}
        <button class="btn btn-outline" id="flash-detail-home-btn">На головну</button>
      </div>
    </div>
  </div>`),o("tb-back",()=>r("showList")),o("reset-btn",$),o("known-test-btn",()=>r("showTest",[...n,...a],"custom")),o("unknown-learn-btn",()=>r("showLearn",d,"custom")),o("flash-detail-home-btn",()=>r("showList"))}function xt(s,e,i,n){if(K()&&t.guidedSession.phase==="recall"){const h=new Set(n||[]),v=s.filter(m=>h.has(m.id));X({...t.guidedSession,items:v.length?v:s,phase:"input",currentIndex:0,wrongQueue:[],resumeState:null}),r("launchGuidedPhase");return}k();const{confidentItems:a,recoveredItems:d,weakItems:l}=zs(s,i,n),c=a.length+d.length,b=s.length?Math.round(c/s.length*100):0,u=l.length>0;w(`<div class="screen result-screen">
    <header class="list-header">
      <div class="header-inner">
        <div class="logo">
          ${S}
          <span class="logo-name">Quizled</span>
        </div>
        <div class="header-actions">
          <button class="btn-ghost" id="reset-btn">Скинути прогрес</button>
        </div>
      </div>
    </header>

    <div class="flashcards-summary-layout">
      <div class="settings-panel-head flashcards-summary-head">
        <button class="settings-back-btn" id="tb-back" type="button">← Назад</button>
        <div class="settings-panel-title">Картки завершено</div>
        <div class="settings-panel-sub">${c}/${s.length}</div>
      </div>

      <div class="flashcards-summary-body">
        <div class="flashcards-summary-hero">
          <div class="flashcards-summary-kicker">Підсумок сесії</div>
          <div class="flashcards-summary-title">${u?"Є слова для повторення":"Сесію закрито"}</div>
          <div class="flashcards-summary-sub">${c} закрито • ${l.length} слабких</div>
          <div class="flashcards-summary-score">
            <span>${b}%</span>
            <small>закрито</small>
          </div>
        </div>

        <div class="flashcards-summary-side">
          <div class="result-stats flashcards-summary-stats">
            <div class="result-stat">
              <div class="result-stat-value ok">${c}</div>
              <div class="result-stat-label">Закрито</div>
            </div>
            <div class="result-stat">
              <div class="result-stat-value err">${l.length}</div>
              <div class="result-stat-label">Слабких</div>
            </div>
            <div class="result-stat">
              <div class="result-stat-value">${s.length}</div>
              <div class="result-stat-label">Всього</div>
            </div>
          </div>

          <div class="flashcards-summary-note ${u?"needs-review":"is-complete"}">
            ${u?`Повтори ${l.length} слабких ${l.length===1?"слово":"слів"}, щоб закрити прогалини.`:"Слабких слів немає. Можна перейти до деталей або повернутися на головну."}
          </div>
        </div>
      </div>

      <div class="result-actions flashcards-summary-actions">
        ${u?'<button class="btn btn-primary" id="flash-shuffle-btn">Повторити слабкі</button>':'<button class="btn btn-primary" id="flash-result-btn">Детальний результат</button>'}
        ${u?'<button class="btn btn-outline" id="flash-result-btn">Детальний результат</button>':""}
        <button class="btn btn-outline" id="flash-rerun-btn">Перемішати</button>
        <button class="btn btn-outline" id="flash-home-btn">На головну</button>
      </div>
    </div>
  </div>`),o("tb-back",()=>r("showList")),o("reset-btn",$),o("flash-result-btn",()=>ie(s,i,n)),o("flash-rerun-btn",()=>r("showFlashcards",A(s),e)),o("flash-shuffle-btn",()=>r("showFlashcards",l,e)),o("flash-home-btn",()=>r("showList"))}function Mt(s,e){if(K()&&t.guidedSession.phase==="test"){const a=[...new Set(t.guidedSession.wrongQueue||[])];if(a.length){const d=new Set(a);X({...t.guidedSession,items:(t.guidedSession.items||[]).filter(l=>d.has(l.id)),phase:"input",currentIndex:0,wrongQueue:[],resumeState:null}),r("launchGuidedPhase");return}T(),F(),k(),r("showList");return}T(),k();const i=ue(t.progress),n=i>=80;w(`<div class="screen result-screen">
    ${Is()}
    <div class="result-session-layout complete-result-layout">
      <div class="settings-panel-head result-session-head">
        <button class="settings-back-btn" id="tb-back" type="button">← Назад</button>
        <div class="settings-panel-title">${s} завершено</div>
        <div class="settings-panel-sub">${i}%</div>
      </div>

      <div class="result-session-body">
        <div class="result-session-hero">
          <div class="result-session-kicker">Підсумок режиму</div>
          <div class="result-session-title">${n?"Сильний результат":"Є що закріпити"}</div>
          <div class="result-session-sub">${t.progress.correct} правильних з ${t.progress.total}</div>
          <div class="result-session-score"><span>${i}%</span><small>памʼять</small></div>
        </div>

        <div class="result-session-side">
          <div class="result-stats result-session-stats">
            <div class="result-stat">
              <div class="result-stat-value ok">${t.progress.correct}</div>
              <div class="result-stat-label">Правильно</div>
            </div>
            <div class="result-stat">
              <div class="result-stat-value">${t.progress.total}</div>
              <div class="result-stat-label">Всього</div>
            </div>
          </div>
          <div class="result-session-note ${n?"is-complete":"needs-review"}">
            ${n?"Результат стабільний. Можна перейти до списку або повторити режим для закріплення.":"Повтори режим, щоб підняти відсоток і стабілізувати знання."}
          </div>
        </div>
      </div>

      <div class="result-actions result-session-actions">
        <button class="btn btn-primary" id="retry-btn">Повторити</button>
        <button class="btn btn-outline" id="list-btn">До списку</button>
      </div>
    </div>
  </div>`),o("tb-back",()=>r("showList")),o("reset-btn",$),o("retry-btn",e),o("list-btn",()=>r("showList"))}function At(s,e,i={}){const n=e?Math.round(s/e*100):0,{correct:a=null,wrong:d=null,label:l="Прогрес"}=i;return`<aside class="session-sidebar">
    <div>
      <div class="ssb-label">${l}</div>
      <div class="ssb-progress-text">${s}/${e}</div>
      <div class="ssb-progress-sub">${n}% виконано</div>
      <div class="ssb-bar-wrap"><div class="ssb-bar-fill" style="width:${n}%"></div></div>
    </div>
    ${a!==null||d!==null?`<div>
      <div class="ssb-label">Статистика</div>
      <div class="ssb-stats">
        ${a!==null?`<div class="ssb-stat ok"><span class="ssb-stat-label">✓ Вірно</span><span class="ssb-stat-value">${a}</span></div>`:""}
        ${d!==null?`<div class="ssb-stat err"><span class="ssb-stat-label">✕ Помилки</span><span class="ssb-stat-value">${d}</span></div>`:""}
      </div>
    </div>`:""}
  </aside>`}function Dt(s,e="all",i=null){const n=i?.baseItems||s;let a=i?.queue||i?.deckItems||je(s),d=i?.missedIds||[],l=i?.sessionResults||jt(i),c=i?.index||0,b=!!i?.shown,u=!1;ss(()=>I(()=>B(()=>I(()=>B(()=>r("showList")),()=>r("showList"))),()=>r("showList")));function h(){const m=a[c],f=Object.values(l).filter(Boolean).length,x=Object.values(l).filter(E=>E===!1).length;Q({mode:"flashcards",source:e,items:s,baseItems:n,queue:a,missedIds:d,sessionResults:l,index:c,shown:b,deckItems:a}),w(`<div class="screen session-screen">
      <header class="list-header">
        <div class="header-inner">
          <div class="logo">
            ${S}
            <span class="logo-name">Quizled</span>
          </div>
          <div class="header-actions">
            <button class="btn-ghost" id="reset-btn">Скинути прогрес</button>
          </div>
        </div>
      </header>

      <div class="session-layout flashcards-session-layout">
        <div class="settings-panel-head flashcards-session-head">
          <button class="settings-back-btn" id="tb-back" type="button">← Назад</button>
          <div class="settings-panel-title">Картки</div>
          <div class="settings-panel-sub">${Z(Math.min(c+1,n.length),n.length)}</div>
        </div>
        <div class="flashcards-session-body">
          <div class="session-main">
            <div class="card-wrap flashcards-card-wrap"><div class="flashcard${b?" shown":""}" id="flashcard-main">
              ${us(m.id,!0)}
              <div class="flashcard-inner">
                <div class="flashcard-face flashcard-front"><div class="card-lang">Англійська</div><div class="card-word">${g(m.en)}</div><div class="flashcard-hint">Натисніть щоб перевернути</div></div>
                <div class="flashcard-face flashcard-back"><div class="card-lang">Українська</div><div class="card-word card-word-accent">${g(m.ua)}</div><div class="flashcard-hint">Натисніть щоб повернути</div></div>
              </div>
            </div>
          </div>
          </div>
          ${At(Math.min(c+1,a.length),a.length,{correct:f,wrong:x,label:"Картки"})}
        </div>
        <div class="card-actions flashcards-card-actions"><button class="btn btn-ok" id="fc-ok">✓ Знав</button><button class="btn btn-err" id="fc-no">✗ Не знав</button></div>
      </div>
    </div>`),u||(window.scrollTo({top:0,left:0}),u=!0),o("tb-back",()=>r("showList")),o("reset-btn",$),es(()=>I(()=>B(()=>r("showList")),()=>r("showList"))),vs(),o("fc-ok",()=>v(!0)),o("fc-no",()=>v(!1)),o("flashcard-main",()=>{b=!b,document.getElementById("flashcard-main")?.classList.toggle("shown",b),Q({mode:"flashcards",source:e,items:s,baseItems:n,queue:a,missedIds:d,sessionResults:l,index:c,shown:b,deckItems:a})})}function v(m){const f=a[c];z(m,f.id,"flashcards"),Ae(f.id,m),l[f.id]=m,!m&&!d.includes(f.id)&&d.push(f.id),c+=1,b=!1,c>=a.length?r("showFlashcardsSummary",n,e,l,d):h()}h()}function jt(s){if(!s)return{};const e={};return(s.knownIds||[]).forEach(i=>{e[i]=!0}),(s.unknownIds||[]).forEach(i=>{e[i]!==!0&&(e[i]=!1)}),e}function Ct(s,e,i={}){const n=e?Math.round(s/e*100):0,{correct:a=null,wrong:d=null,label:l="Прогрес"}=i;return`<aside class="session-sidebar">
    <div>
      <div class="ssb-label">${l}</div>
      <div class="ssb-progress-text">${s}/${e}</div>
      <div class="ssb-progress-sub">${n}% виконано</div>
      <div class="ssb-bar-wrap"><div class="ssb-bar-fill" style="width:${n}%"></div></div>
    </div>
    ${a!==null||d!==null?`<div>
      <div class="ssb-label">Статистика</div>
      <div class="ssb-stats">
        ${a!==null?`<div class="ssb-stat ok"><span class="ssb-stat-label">✓ Вірно</span><span class="ssb-stat-value">${a}</span></div>`:""}
        ${d!==null?`<div class="ssb-stat err"><span class="ssb-stat-label">✕ Помилки</span><span class="ssb-stat-value">${d}</span></div>`:""}
      </div>
    </div>`:""}
  </aside>`}function Nt(s,e="all",i=null){let n=i?.index||0,a=i?.queue||[...s],d=i?.wrongQueue||[],l=i?.sessionCorrect||0,c=i?.sessionWrong||0,b=null;ss(()=>I(()=>B(()=>r("showList")),()=>r("showList")));function u(){H(),b&&document.removeEventListener("keydown",b),b=null;const h=a[n],v=Math.random()>.5,m=v?h.en:h.ua,f=v?h.ua:h.en;let x=!1;Q({mode:"learn",source:e,items:s,queue:a,wrongQueue:d,sessionCorrect:l,sessionWrong:c,index:n}),w(`<div class="screen session-screen">
      <header class="list-header">
        <div class="header-inner">
          <div class="logo">
            ${S}
            <span class="logo-name">Quizled</span>
          </div>
          <div class="header-actions">
            <button class="btn-ghost" id="reset-btn">Скинути прогрес</button>
          </div>
        </div>
      </header>

      <div class="session-layout learn-session-layout">
        <div class="settings-panel-head learn-session-head">
          <button class="settings-back-btn" id="tb-back" type="button">← Назад</button>
          <div class="settings-panel-title">Навчання</div>
          <div class="settings-panel-sub">${Z(Math.min(n+1,a.length),a.length)}</div>
        </div>
        <div class="learn-session-body">
          <div class="session-main">
          <div class="learn-area">
            <div class="card-lang">${v?"Англійська":"Українська"}</div><div class="learn-word">${g(m)}</div>${us(h.id)}
            <div class="ans-label">Введіть ${v?"Українська":"Англійська"}</div>
            <input id="lrn-in" class="text-in" type="text" autocomplete="off" autocorrect="off" spellcheck="false" placeholder="Ваша відповідь..."/>
            <div id="lrn-fb"></div>
            ${d.length?`<div class="session-loop-note">На повтор у цій сесії: ${d.length}</div>`:""}
          </div>
          </div>
          ${Ct(Math.min(n+1,a.length),a.length,{correct:l,wrong:c,label:"Навчання"})}
        </div>
        <div class="card-actions learn-card-actions"><button class="btn btn-primary btn-block" id="lrn-btn">Перевірити</button></div>
      </div>
    </div>`),o("tb-back",()=>r("showList")),o("reset-btn",$),es(()=>I(()=>B(()=>r("showList")),()=>r("showList"))),vs();const E=document.getElementById("lrn-in"),ts=document.getElementById("lrn-fb"),_=document.getElementById("lrn-btn");setTimeout(()=>E?.focus(),60);const j=()=>{if(x)return R();const C=E.value.toLowerCase().trim();if(!C)return;const is=C===f;z(is,h.id,"learn"),is?l+=1:(c+=1,a.push(h),d.push(h.id)),x=!0,E.disabled=!0,E.className=`text-in ${is?"ok":"bad"}`,ts.innerHTML=is?'<div class="fb-ok">✓ Правильно!</div>':`<div class="fb-bad">✗ Правильна відповідь: <strong>${g(f)}</strong></div>`,_.textContent="Далі →",Ys(R,e==="guided-learning"?600:3500)},R=()=>{H(),b&&document.removeEventListener("keydown",b),b=null,n+=1,n>=a.length?r("showLoopResult","Навчання",l,c,d,()=>r("launchMode","learn",e)):u()};_.addEventListener("click",j),E.addEventListener("keydown",C=>{C.key==="Enter"&&j()}),b=C=>{C.key!=="Enter"||C.target?.id==="lrn-in"||(C.preventDefault(),j())},document.addEventListener("keydown",b)}u()}function Ot(s,e,i={}){const n=e?Math.round(s/e*100):0,{correct:a=null,wrong:d=null,label:l="Прогрес"}=i;return`<aside class="session-sidebar">
    <div>
      <div class="ssb-label">${l}</div>
      <div class="ssb-progress-text">${s}/${e}</div>
      <div class="ssb-progress-sub">${n}% виконано</div>
      <div class="ssb-bar-wrap"><div class="ssb-bar-fill" style="width:${n}%"></div></div>
    </div>
    ${a!==null||d!==null?`<div>
      <div class="ssb-label">Статистика</div>
      <div class="ssb-stats">
        ${a!==null?`<div class="ssb-stat ok"><span class="ssb-stat-label">✓ Вірно</span><span class="ssb-stat-value">${a}</span></div>`:""}
        ${d!==null?`<div class="ssb-stat err"><span class="ssb-stat-label">✕ Помилки</span><span class="ssb-stat-value">${d}</span></div>`:""}
      </div>
    </div>`:""}
  </aside>`}function Tt(s,e="all",i=null){const n=i?.pairs||Math.min(8,s.length);let a=i?.cards||Rt(js(s,n),n),d=typeof i?.firstUid=="number"&&a.find(v=>v.uid===i.firstUid)||null,l=i?.matchedCount||0,c=!1,b=!1;ss(()=>I(()=>B(()=>r("showList")),()=>r("showList")));function u(){Q({mode:"match",source:e,items:s,cards:a,pairs:n,matchedCount:l,firstUid:d?d.uid:null}),w(`<div class="screen session-screen">
      <header class="list-header">
        <div class="header-inner">
          <div class="logo">
            ${S}
            <span class="logo-name">Quizled</span>
          </div>
          <div class="header-actions">
            <button class="btn-ghost" id="reset-btn">Скинути прогрес</button>
          </div>
        </div>
      </header>

      <div class="session-layout match-session-layout">
        <div class="settings-panel-head match-session-head">
          <button class="settings-back-btn" id="tb-back" type="button">← Назад</button>
          <div class="settings-panel-title">Пари</div>
          <div class="settings-panel-sub">${Z(l,n)}</div>
        </div>
        <div class="match-session-body">
          <div class="session-main">
            <div class="match-grid">${a.map(v=>`<button class="mc${v.matched?" matched":""}" data-uid="${v.uid}" ${v.matched?"disabled":""}><span class="mc-lang">${g(v.lang)}</span><span class="mc-text">${g(v.text)}</span></button>`).join("")}</div>
          </div>
          ${Ot(l,n,{label:"Пари"})}
        </div>
      </div>
    </div>`),b||(window.scrollTo({top:0,left:0}),b=!0),o("tb-back",()=>r("showList")),o("reset-btn",$),es(()=>I(()=>B(()=>r("showList")),()=>r("showList"))),d&&document.querySelector(`.mc[data-uid="${d.uid}"]`)?.classList.add("sel"),document.querySelectorAll(".mc:not([disabled])").forEach(v=>{v.addEventListener("click",()=>{if(c)return;const m=Number(v.dataset.uid),f=a.find(x=>x.uid===m);if(!(!f||f.matched)){if(d&&d.uid===m){d=null,u();return}if(!d){d=f,v.classList.add("sel");return}h(f,m)}})})}function h(v,m){if(d.pairId===v.pairId&&d.lang!==v.lang){d.matched=!0,v.matched=!0,l+=1,z(!0,d.pairId,"match"),d=null,u(),l===n&&setTimeout(()=>r("showComplete","Пари",()=>r("launchMode","match",e)),400);return}c=!0,z(!1,null,"match");const f=d;d=null,u(),setTimeout(()=>{document.querySelector(`.mc[data-uid="${f.uid}"]`)?.classList.add("flash"),document.querySelector(`.mc[data-uid="${m}"]`)?.classList.add("flash"),setTimeout(()=>{c=!1,u()},650)},10)}u()}function Rt(s,e){const i=[];return s.forEach((n,a)=>{i.push({uid:a,text:n.en,lang:"EN",pairId:n.id,matched:!1}),i.push({uid:a+e,text:n.ua,lang:"UA",pairId:n.id,matched:!1})}),A(i)}function qt(s,e,i={}){const n=e?Math.round(s/e*100):0,{correct:a=null,wrong:d=null,label:l="Прогрес"}=i;return`<aside class="session-sidebar">
    <div>
      <div class="ssb-label">${l}</div>
      <div class="ssb-progress-text">${s}/${e}</div>
      <div class="ssb-progress-sub">${n}% виконано</div>
      <div class="ssb-bar-wrap"><div class="ssb-bar-fill" style="width:${n}%"></div></div>
    </div>
    ${a!==null||d!==null?`<div>
      <div class="ssb-label">Статистика</div>
      <div class="ssb-stats">
        ${a!==null?`<div class="ssb-stat ok"><span class="ssb-stat-label">✓ Вірно</span><span class="ssb-stat-value">${a}</span></div>`:""}
        ${d!==null?`<div class="ssb-stat err"><span class="ssb-stat-label">✕ Помилки</span><span class="ssb-stat-value">${d}</span></div>`:""}
      </div>
    </div>`:""}
  </aside>`}function Ft(s,e="all",i=null){let n=i?.index||0,a=0,d=0;ss(()=>I(()=>B(()=>r("showList")),()=>r("showList")));function l(){const b=s[n],u=b.ua,h=A([u,...js(s.filter(v=>v.id!==b.id).map(v=>v.ua),Math.min(3,s.length-1))]);Q({mode:"test",source:e,items:s,index:n}),w(`<div class="screen session-screen">
      <header class="list-header">
        <div class="header-inner">
          <div class="logo">
            ${S}
            <span class="logo-name">Quizled</span>
          </div>
          <div class="header-actions">
            <button class="btn-ghost" id="reset-btn">Скинути прогрес</button>
          </div>
        </div>
      </header>

      <div class="session-layout test-session-layout">
        <div class="settings-panel-head test-session-head">
          <button class="settings-back-btn" id="tb-back" type="button">← Назад</button>
          <div class="settings-panel-title">Тест</div>
          <div class="settings-panel-sub">${Z(n+1,s.length)}</div>
        </div>
        <div class="test-session-body">
          <div class="session-main">
          <div class="test-area">
            <div class="card-lang">Англійська</div><div class="test-word">${g(b.en)}</div>${us(b.id)}
            <div class="test-hint">Оберіть переклад українською:</div>
            <div class="test-opts">${h.map(v=>`<button class="test-opt" data-val="${g(v)}">${g(v)}</button>`).join("")}</div>
          </div>
          </div>
          ${qt(n+1,s.length,{correct:a,wrong:d,label:"Тест"})}
        </div>
      </div>
    </div>`),o("tb-back",()=>r("showList")),o("reset-btn",$),es(()=>I(()=>B(()=>r("showList")),()=>r("showList"))),vs(),document.querySelectorAll(".test-opt").forEach(v=>{v.addEventListener("click",()=>{document.querySelectorAll(".test-opt").forEach(f=>{f.disabled=!0});const m=v.dataset.val===u;m?a+=1:d+=1,z(m,b.id,"test"),document.querySelectorAll(".test-opt").forEach(f=>{f.dataset.val===u?f.classList.add("correct"):f===v&&!m&&f.classList.add("wrong")}),setTimeout(()=>c(),e==="guided-learning"?600:950)})})}function c(){n+=1,n>=s.length?e==="mistakes"?r("showMistakesFollowup",s):r("showComplete","Тест",()=>r("launchMode","test",e)):l()}l()}function Bs(){return`<header class="list-header">
    <div class="header-inner">
      <div class="logo">
        ${S}
        <span class="logo-name">Quizled</span>
      </div>
      <div class="header-actions">
        <button class="btn-ghost" id="reset-btn">Скинути прогрес</button>
      </div>
    </div>
  </header>`}function ne(){const s=Os();if(!s.length){r("showList");return}const e=s.length;w(`<div class="screen">
    ${Bs()}
    <div class="inner-panel-page mistakes-page">
      <div class="settings-panel-head inner-panel-head">
        <button class="settings-back-btn" id="tb-back" type="button">← Назад</button>
        <div class="settings-panel-title">Повтор помилок</div>
        <div class="settings-panel-sub">${e} ${fs(e)}</div>
      </div>
      <div class="inner-panel-body">
        <div class="mistakes-layout">

      <div class="mistakes-words-pane">
        <div class="vocab-list-header">
          <div class="vocab-list-header-top">
            <div class="sec-label" style="margin-bottom:0">Слова на повтор</div>
          </div>
        </div>
        <div class="word-list">
          ${s.map(i=>`<div class="word-row">
            <button class="fav-btn${t.favorites[i.id]?" active":""}" data-fav-id="${i.id}">${t.favorites[i.id]?"★":"☆"}</button>
            ${Pe(i)}
          </div>`).join("")}
        </div>
      </div>

      <aside class="mistakes-actions-pane">
        <div class="mistakes-summary-card">
          <div class="mistakes-count">${e}</div>
          <div class="mistakes-count-label">${fs(e)} потребують повтору</div>
        </div>
        <div class="mistakes-modes">
          <div class="ssb-label">Оберіть режим</div>
          <button class="mistakes-mode-btn primary" id="mistakes-start-test-btn">
            <div class="mistakes-mode-icon">☑</div>
            <div class="mistakes-mode-info">
              <div class="mistakes-mode-name">Тест</div>
              <div class="mistakes-mode-desc">Вибір варіанту</div>
            </div>
          </button>
          <button class="mistakes-mode-btn" id="mistakes-start-learn-btn">
            <div class="mistakes-mode-icon">✏</div>
            <div class="mistakes-mode-info">
              <div class="mistakes-mode-name">Навчання</div>
              <div class="mistakes-mode-desc">Введи відповідь</div>
            </div>
          </button>
          <button class="mistakes-mode-btn" id="mistakes-start-flash-btn">
            <div class="mistakes-mode-icon">🃏</div>
            <div class="mistakes-mode-info">
              <div class="mistakes-mode-name">Картки</div>
              <div class="mistakes-mode-desc">Перегортання</div>
            </div>
          </button>
        </div>
      </aside>

        </div>
      </div>
    </div>
  </div>`),o("tb-back",()=>r("showList")),o("reset-btn",$),o("mistakes-start-test-btn",()=>r("showSessionSettings","test","mistakes")),o("mistakes-start-learn-btn",()=>r("showSessionSettings","learn","mistakes")),o("mistakes-start-flash-btn",()=>r("showSessionSettings","flashcards","mistakes")),document.querySelectorAll("[data-fav-id]").forEach(i=>{i.addEventListener("click",()=>{ws(Number(i.dataset.favId)),ne()})})}function Gt(s){w(`<div class="screen result-screen">
    ${Bs()}
    <div class="result-session-layout mistakes-followup-layout">
      <div class="settings-panel-head result-session-head">
        <button class="settings-back-btn" id="tb-back" type="button">← Назад</button>
        <div class="settings-panel-title">Тест завершено</div>
        <div class="settings-panel-sub">Повтор помилок</div>
      </div>

      <div class="result-session-body">
        <div class="result-session-hero">
          <div class="result-session-kicker">Наступний крок</div>
          <div class="result-session-title">Закріпимо ці слова</div>
          <div class="result-session-sub">Режим навчання допоможе закрити помилки вручну.</div>
          <div class="result-session-score"><span>${s.length}</span><small>${fs(s.length)}</small></div>
        </div>

        <div class="result-session-side">
          <div class="result-session-note needs-review">Пройди слова ще раз у форматі введення відповіді. Помилки автоматично повернуться на повтор у межах сесії.</div>
        </div>
      </div>

      <div class="result-actions result-session-actions">
        <button class="btn btn-primary" id="mistakes-learn-btn">До навчання</button>
        <button class="btn btn-outline" id="mistakes-home-btn">На головну</button>
      </div>
    </div>
  </div>`),o("tb-back",()=>r("showList")),o("reset-btn",$),o("mistakes-learn-btn",()=>r("showLearn",s,"mistakes")),o("mistakes-home-btn",()=>r("showList"))}function Pt(s,e=null){let i=e?.index||0,n=e?.queue||[...s],a=e?.wrongQueue||[],d=e?.sessionCorrect||0,l=e?.sessionWrong||0;if(!n.length){r("showList");return}ss(()=>I(()=>B(()=>r("showList")),()=>r("showList")));function c(){H();const b=n[i],u=Math.random()>.5,h=u?b.en:b.ua,v=u?b.ua:b.en;let m=!1;Q({mode:"mistakes",source:"mistakes",items:s,queue:n,wrongQueue:a,sessionCorrect:d,sessionWrong:l,index:i}),w(`<div class="screen session-screen">
      ${Bs()}

      <div class="session-layout learn-session-layout mistakes-review-session-layout">
        <div class="settings-panel-head learn-session-head">
          <button class="settings-back-btn" id="tb-back" type="button">← Назад</button>
          <div class="settings-panel-title">Повтор помилок</div>
          <div class="settings-panel-sub">${Z(Math.min(i+1,n.length),n.length)}</div>
        </div>
        <div class="learn-session-body">
          <div class="session-main">
          <div class="learn-area">
            <div class="card-lang">${u?"Англійська":"Українська"}</div>
            <div class="learn-word">${g(h)}</div>
            ${us(b.id)}
            <div class="ans-label">Введіть ${u?"Українська":"Англійська"}</div>
            <input id="mr-in" class="text-in" type="text" autocomplete="off" autocorrect="off" spellcheck="false" placeholder="Ваша відповідь..."/>
            <div id="mr-fb"></div>
            ${a.length?`<div class="session-loop-note">Ще лишилось закрити: ${a.length}</div>`:""}
          </div>
          </div>
          ${Wt(Math.min(i+1,n.length),n.length,d,l)}
        </div>
        <div class="card-actions learn-card-actions">
          <button class="btn btn-primary btn-block" id="mr-btn">Перевірити</button>
        </div>
      </div>
    </div>`),o("tb-back",()=>r("showList")),o("reset-btn",$),es(()=>I(()=>B(()=>r("showList")),()=>r("showList"))),vs();const f=document.getElementById("mr-in"),x=document.getElementById("mr-fb"),E=document.getElementById("mr-btn");setTimeout(()=>f?.focus(),60);const ts=()=>{if(m)return _();const j=f.value.toLowerCase().trim();if(!j)return;const R=j===v;z(R,b.id,"learn"),R?d+=1:(l+=1,n.push(b),a.push(b.id)),m=!0,f.disabled=!0,f.className=`text-in ${R?"ok":"bad"}`,x.innerHTML=R?'<div class="fb-ok">✓ Помилка закрита</div>':`<div class="fb-bad">✗ Правильна відповідь: <strong>${g(v)}</strong></div>`,E.textContent="Далі →",Ys(_,3500)},_=()=>{H(),i+=1,i>=n.length?r("showLoopResult","Повтор помилок",d,l,a,()=>r("launchMode","mistakes","mistakes")):c()};E.addEventListener("click",ts),f.addEventListener("keydown",j=>{j.key==="Enter"&&ts()})}c()}function Wt(s,e,i,n){const a=e?Math.round(s/e*100):0;return`<aside class="session-sidebar">
    <div>
      <div class="ssb-label">Прогрес</div>
      <div class="ssb-progress-text">${s}/${e}</div>
      <div class="ssb-progress-sub">${a}% виконано</div>
      <div class="ssb-bar-wrap"><div class="ssb-bar-fill" style="width:${a}%"></div></div>
    </div>
    <div>
      <div class="ssb-label">Статистика</div>
      <div class="ssb-stats">
        <div class="ssb-stat ok"><span class="ssb-stat-label">✓ Закрито</span><span class="ssb-stat-value">${i}</span></div>
        <div class="ssb-stat err"><span class="ssb-stat-label">↺ На повтор</span><span class="ssb-stat-value">${n}</span></div>
      </div>
    </div>
  </aside>`}function fs(s){return s===1?"слово":s>=2&&s<=4?"слова":"слів"}const Qt="appDB",zt=1,ae=["lists","words","memory","sessions"];let ms=null;function de(){return typeof indexedDB<"u"}function _t(){return de()?new Promise((s,e)=>{const i=indexedDB.open(Qt,zt);i.onupgradeneeded=()=>{const n=i.result;ae.forEach(a=>{if(!n.objectStoreNames.contains(a)){const d=n.createObjectStore(a,{keyPath:"id"});a==="words"&&d.createIndex("by_listId","listId",{unique:!1}),a==="memory"&&(d.createIndex("by_listId","listId",{unique:!1}),d.createIndex("by_wordId","wordId",{unique:!1})),a==="sessions"&&d.createIndex("by_listId","listId",{unique:!1})}})},i.onsuccess=()=>s(i.result),i.onerror=()=>e(i.error||new Error("Failed to open IndexedDB."))}):Promise.reject(new Error("IndexedDB is not available."))}async function re(){return ms||(ms=_t()),ms}async function Vt(s,e){const i=await re();return new Promise((n,a)=>{const l=i.transaction(s,"readwrite").objectStore(s).put(e);l.onsuccess=()=>n(l.result),l.onerror=()=>a(l.error||new Error(`Failed to write to ${s}.`))})}function Ht(){return de()}const Ut="quizled_store_";function le(){if(typeof localStorage>"u")throw new Error("localStorage is not available.");return localStorage}function oe(s){return`${Ut}${s}`}function Jt(s){const i=le().getItem(oe(s));if(!i)return{};try{const n=JSON.parse(i);return n&&typeof n=="object"?n:{}}catch{return{}}}function Yt(s,e){le().setItem(oe(s),JSON.stringify(e||{}))}async function Kt(s,e){if(!e||typeof e!="object"||!e.id)throw new Error("Record must be an object with id.");const i=Jt(s);return i[e.id]=e,Yt(s,i),e.id}let rs=!1;function Xt(s){if(!ae.includes(s))throw new Error(`Unsupported store "${s}".`)}async function Zt(){if(!Ht())return rs=!1,!1;try{return await re(),rs=!0,!0}catch{return rs=!1,!1}}async function bs(s,e){return Xt(s),rs?Vt(s,e):Kt(s,e)}const si="quizled_v2",ce="quizled_migration_done_v1",P="default-list";function xs(){return typeof localStorage<"u"}function ei(){if(!xs())return null;const s=localStorage.getItem(si);if(!s)return null;try{const e=JSON.parse(s);return e&&typeof e=="object"?e:null}catch{return null}}function ti(){return xs()?localStorage.getItem(ce)==="true":!1}function ii(){xs()&&localStorage.setItem(ce,"true")}function Ms(s){return`${P}:word:${String(s)}`}function ni(s){return Array.isArray(s)?s.map(e=>e&&typeof e=="object"?e.id:e).filter(e=>e!=null).map(e=>Ms(e)):[]}async function ai(s){const e=Array.isArray(s)?s:[];for(const i of e)!i||i.id===void 0||i.id===null||await bs("words",{id:Ms(i.id),listId:P,en:String(i.en||""),ua:String(i.ua||"")})}async function di(s){const i=Object.entries(s&&typeof s=="object"?s:{});for(const[n,a]of i){const d=Ms(n);await bs("memory",{id:`${P}:memory:${n}`,wordId:d,listId:P,strength:Number(a?.strength)||0,lastReviewedAt:Number(a?.lastReviewedAt)||0})}}async function ri(s){const e=s?.activeSession||null,i=s?.guidedSession||null,n=i?.items||e?.queue||e?.items||[];await bs("sessions",{id:`${P}:session:main`,listId:P,currentIndex:Number(i?.currentIndex??e?.index??0)||0,phase:String(i?.phase||e?.mode||"idle"),queue:ni(n)})}async function li(){if(ti())return{skipped:!0,reason:"already_migrated"};await bs("lists",{id:P,name:"Мій список",createdAt:Date.now()});const s=ei();return s&&(await ai(s.items),await di(s.memoryByWord),await ri(s)),ii(),{skipped:!1,migrated:!!s}}Ge({launchGuidedPhase:gs,launchMode:Ss,resumeActiveSession:as,showComplete:Mt,showFlashcards:Dt,showFlashcardsResult:ie,showFlashcardsSummary:xt,showGuidedLearning:ee,showImport:ls,showLearn:Nt,showList:U,showListsManagement:ft,showLoopResult:Bt,showManageVocabulary:D,showMatch:Tt,showMistakesFollowup:Gt,showMistakesHub:ne,showMistakesReview:Pt,showSessionSettings:J,showTest:Ft,startGuidedLearning:Ze});oi();async function oi(){if(await Zt())try{await li()}catch{}const e=ge();if(e){if(t.lists=Array.isArray(e.lists)?e.lists:t.lists,e.currentListId&&(t.currentListId=e.currentListId),t.wordsByList=e.wordsByList||t.wordsByList,t.progressByList=e.progressByList||t.progressByList,e.progressByModeByList&&typeof e.progressByModeByList=="object"){const i={};Object.keys(e.progressByModeByList).forEach(n=>{i[n]=As(e.progressByModeByList[n])}),t.progressByModeByList=i}e.items?.length&&(t.items=e.items,t.progress=e.progress||{correct:0,total:0},t.progressByMode=As(e.progressByMode)),t.dailyLearned=e.dailyLearned||{},t.dailyGuidedLearned=e.dailyGuidedLearned||{},t.memoryByWord=e.memoryByWord||{},t.mistakes=e.mistakes||{},t.favorites=e.favorites||{},t.flashcardStats=e.flashcardStats||{},t.activeSession=e.activeSession?{...e.activeSession,listId:e.activeSession.listId||t.currentListId}:null,t.guidedSession=e.guidedSession?{...e.guidedSession,listId:e.guidedSession.listId||t.currentListId}:null,t.settings=Y(),ys(),U()}else ls()}
