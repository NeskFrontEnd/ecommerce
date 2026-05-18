(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function s(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(i){if(i.ep)return;i.ep=!0;const a=s(i);fetch(i.href,a)}})();function F(e){const t=[...e];for(let s=t.length-1;s>0;s-=1){const r=Math.floor(Math.random()*(s+1));[t[s],t[r]]=[t[r],t[s]]}return t}function wt(e,t){return F(e).slice(0,t)}function ys(e){const t=e||{correct:0,total:0};return t.total?Math.round(t.correct/t.total*100):0}const ws=/[\u0000-\u001F\u007F]/g,Ls=/\s+/g,Lt=80,at=120,ks=120;function L(e){return String(e??"").replace(ws,"").trim().replace(Ls," ")}function T(e){return L(e).toLowerCase()}function Z(e,t){if(!e)throw new Error(t)}function Ce(e,t,s){if(e.length>t)throw new Error(s)}function y(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function k(e,t=0){const s=Number(e);return Number.isFinite(s)?s:t}function E(e,t=null){if(e==null||e==="")return t;const s=Number(e);return!Number.isInteger(s)||s<0?t:s}function ot(e,t,s,r=t){const i=k(e,r);return Math.min(s,Math.max(t,i))}const Ue="quizled_v2",D="default-list",Ss=new Set(["all","favorites","mistakes","custom","guided-learning"]),Is=new Set(["flashcards","learn","match","test","mistakes","guided-learning"]),$s=new Set(["intro","recall","input","test"]),Ee=new Set(["base","past","participle","ua"]),kt=new Set(["fill-missing","build-row","restore-order"]);function te(){return{count:"all",timer:0,countMode:"preset",timerMode:"preset",countCustom:25,timerCustom:30}}function Re(){return{flashcards:{correct:0,total:0,solved:{}},learn:{correct:0,total:0,solved:{}},match:{correct:0,total:0,solved:{}},test:{correct:0,total:0,solved:{}},"guided-learning":{correct:0,total:0,solved:{}}}}function ee(){return{en:"",ua:""}}const n={currentListId:D,lists:[],wordsByList:{},progressByList:{},progressByModeByList:{},dailyLearned:{},dailyGuidedLearned:{},memoryByWord:{},mistakes:{},favorites:{},flashcardStats:{},irregularVerbs:[],irregularVerbProgress:{},irregularVerbSession:null,activeSession:null,guidedSession:null,settings:te()};function j(){n.lists.some(t=>t.id===n.currentListId)||(n.currentListId=D),n.lists.some(t=>t.id===n.currentListId)||(n.lists=[...n.lists,{id:n.currentListId,name:"Мій список",createdAt:Date.now()}]),n.wordsByList[n.currentListId]||(n.wordsByList[n.currentListId]=[]),n.progressByList[n.currentListId]||(n.progressByList[n.currentListId]={correct:0,total:0}),n.progressByModeByList[n.currentListId]||(n.progressByModeByList[n.currentListId]=Re())}function De(e,t){const s=E(e?.id);if(s===null)return null;const r=T(e?.en),i=T(e?.ua);return!r||!i?null:{...e,id:s,en:r,ua:i,listId:t}}function xs(e,t,s=n.wordsByList){const r=E(t,null);return r===null?null:(Array.isArray(s?.[e])?s[e]:[]).find(a=>Number(a?.id)===r)||null}function _(e,t,s=n.wordsByList){return Array.isArray(e)?e.map(r=>{const i=De(r,t);if(i)return i;const a=xs(t,y(r)?r.id:r,s);return a?{...a,listId:t}:null}).filter(Boolean):[]}function He(e){return Array.isArray(e)?e.map(t=>E(t,null)).filter(t=>t!==null):[]}function Es(e,t="all"){const s=L(e);return Ss.has(s)?s:t}function pe(e,t){const s=E(e,0)??0;return!Number.isInteger(t)||t<=0?0:Math.min(t-1,s)}function de(e){return Math.max(0,k(e,0))}function Bs(e){if(!y(e))return{};const t={};return Object.entries(e).forEach(([s,r])=>{const i=E(s,null);i===null||typeof r!="boolean"||(t[i]=r)}),t}function Ns(e){if(!Array.isArray(e))return[];const t=new Set;return e.map(s=>{if(!y(s))return null;const r=E(s.uid,null),i=E(s.pairId,null),a=L(s.lang).toUpperCase(),o=L(s.text);return r===null||i===null||!o||a!=="EN"&&a!=="UA"||t.has(r)?null:(t.add(r),{uid:r,pairId:i,lang:a,text:o,matched:!!s.matched})}).filter(Boolean)}function St(e,t,s=[],r=n.wordsByList){if(!y(e))return null;const i=_(e.items,t,r),a=_(e.baseItems,t,r),o=_(e.deckItems,t,r),d=_(e.queue,t,r),f=i.length?i:s,m=a.length?a:f,g=d.length?d:o.length?o:m;return!f.length||!g.length?null:{items:f,baseItems:m,queue:g,deckItems:g,missedIds:He(e.missedIds),sessionResults:Bs(e.sessionResults),index:pe(e.index,g.length),shown:!!e.shown}}function It(e,t,s=[],r=n.wordsByList){if(!y(e))return null;const i=_(e.items,t,r),a=i.length?i:s,o=_(e.queue,t,r),d=o.length?o:a;return!a.length||!d.length?null:{items:a,queue:d,wrongQueue:He(e.wrongQueue),sessionCorrect:de(e.sessionCorrect),sessionWrong:de(e.sessionWrong),index:pe(e.index,d.length)}}function $t(e,t,s=[],r=n.wordsByList){if(!y(e))return null;const i=_(e.items,t,r),a=i.length?i:s;return a.length?{items:a,index:pe(e.index,a.length)}:null}function xt(e,t,s,r,i=n.wordsByList){if(!y(t))return null;if(e==="recall"){const a=St(t,s,r,i);return a?{index:a.index,queue:a.queue,baseItems:a.baseItems,deckItems:a.deckItems,missedIds:a.missedIds,sessionResults:a.sessionResults,shown:a.shown}:null}if(e==="input"){const a=It(t,s,r,i);return a?{index:a.index,queue:a.queue,wrongQueue:a.wrongQueue,sessionCorrect:a.sessionCorrect,sessionWrong:a.sessionWrong}:null}if(e==="test"){const a=$t(t,s,r,i);return a?{index:a.index}:null}return null}function Ms(e){if(!y(e))return null;const t=L(e.mode),s=E(e.verbId,null);if(!kt.has(t)||s===null)return null;if(t==="fill-missing"){const a=L(e.target);return Ee.has(a)?{mode:t,verbId:s,target:a}:null}const r=Array.isArray(e.targets)?[...new Set(e.targets.map(a=>L(a)).filter(a=>Ee.has(a)))]:[];if(t==="build-row"){const a=L(e.anchor);return!Ee.has(a)||!r.length?null:{mode:t,verbId:s,anchor:a,targets:r}}const i=Array.isArray(e.options)?e.options.map(a=>{if(!y(a))return null;const o=L(a.field),d=L(a.value);return!Ee.has(o)||!d?null:{field:o,value:d}}).filter(Boolean):[];return!r.length||!i.length?null:{mode:t,verbId:s,targets:r,options:i}}function lt(e,t=null){return Array.isArray(e)?e.map(s=>Ms(s)).filter(s=>s&&(!t||s.mode===t)):[]}function Et(e){return L(e)}function Bt(e){Z(e,"Назва списку не може бути порожньою."),Ce(e,Lt,"Назва списку не може бути довшою за 80 символів.")}function As(){return`list-${Date.now()}-${Math.random().toString(36).slice(2,8)}`}function Cs(e,t){const s=(t||[]).map(i=>Number(i.id)).filter(i=>Number.isFinite(i)),r=new Set(s);s.forEach(i=>{delete n.mistakes[i],delete n.favorites[i],delete n.flashcardStats[i],delete n.memoryByWord[i],delete n.memoryByWord[`${e}:${i}`]}),Object.keys(n.dailyLearned||{}).forEach(i=>{n.dailyLearned[i]&&s.forEach(a=>delete n.dailyLearned[i][a])}),Object.keys(n.dailyGuidedLearned||{}).forEach(i=>{n.dailyGuidedLearned[i]&&s.forEach(a=>delete n.dailyGuidedLearned[i][a])}),Object.keys(n.progressByModeByList||{}).forEach(i=>{const a=n.progressByModeByList[i];!a||typeof a!="object"||Object.keys(a).forEach(o=>{const d=a[o]?.solved;d&&Object.keys(d).forEach(f=>{r.has(Number(f))&&delete d[f]})})})}Object.defineProperty(n,"items",{get(){return j(),n.wordsByList[n.currentListId]||[]},set(e){j();const t=Array.isArray(e)?e:[];n.wordsByList[n.currentListId]=t.map(s=>De(s,n.currentListId)).filter(Boolean)}});Object.defineProperty(n,"progress",{get(){return j(),n.progressByList[n.currentListId]},set(e){j(),n.progressByList[n.currentListId]={correct:Number(e?.correct)||0,total:Number(e?.total)||0}}});Object.defineProperty(n,"progressByMode",{get(){return j(),n.progressByModeByList[n.currentListId]},set(e){j(),n.progressByModeByList[n.currentListId]=e}});j();function Je(){j()}function $(){try{localStorage.setItem(Ue,JSON.stringify(n))}catch{return null}return null}function Vs(){try{const e=localStorage.getItem(Ue);if(!e)return null;const t=JSON.parse(e);return y(t)?js(t):null}catch{return null}}function dt(){return{id:D,name:"Мій список",createdAt:Date.now()}}function Rs(e,t){const s=Array.isArray(e)?e.map(a=>{if(!y(a))return null;const o=L(a.id),d=L(a.name);return!o||!d||d.length>Lt?null:{id:o,name:d,createdAt:k(a.createdAt,Date.now())}}).filter(Boolean):[],r=s.some(a=>a.id===t),i=s.some(a=>a.id===D);return(!r&&!i||!i&&t===D)&&s.unshift(dt()),s}function Ds(e,t){const s={},r=y(e)?e:{};return t.forEach(i=>{const a=Array.isArray(r[i.id])?r[i.id]:[];s[i.id]=a.map(o=>De(o,i.id)).filter(Boolean)}),s}function qs(e,t){const s=y(e)?e:{},r={};return t.forEach(i=>{const a=y(s[i.id])?s[i.id]:{};r[i.id]={correct:k(a.correct,0),total:k(a.total,0)}}),r}function Ts(e){if(!y(e))return{};const t={};return Object.keys(e).forEach(s=>{const r=E(s,null);r===null||!e[s]||(t[r]=!0)}),t}function ct(e,t){const s=y(e)?e:{},r={},i=Object.keys(Re());return t.forEach(a=>{const o=y(s[a.id])?s[a.id]:{};r[a.id]={},i.forEach(d=>{const f=y(o[d])?o[d]:{};r[a.id][d]={correct:k(f.correct,0),total:k(f.total,0),solved:Ts(f.solved)}})}),r}function Os(e){const t=L(e);if(!t)return!1;const s=t.split(":").pop();return E(s,null)!==null}function Ps(e){if(!y(e))return{};const t={};return Object.entries(e).forEach(([s,r])=>{!Os(s)||!y(r)||(t[s]={strength:k(r.strength,0),lastReviewedAt:k(r.lastReviewedAt,0)})}),t}function je(e,t){if(!y(e))return{};const s={};return Object.entries(e).forEach(([r,i])=>{const a=E(r,null);if(a===null)return;const o=t(i);o!==null&&(s[a]=o)}),s}function zs(e){return je(e,t=>y(t)?{know:k(t.know,0),miss:k(t.miss,0),streak:k(t.streak,0),mastered:!!t.mastered}:null)}function Fs(e){if(!y(e))return{};const t={};return Object.entries(e).forEach(([s,r])=>{const i=E(s,null);i===null||!y(r)||(t[i]={},["base","past","participle","ua"].forEach(a=>{const o=y(r[a])?r[a]:{};t[i][a]={correct:k(o.correct,0),total:k(o.total,0),streak:k(o.streak,0),weak:!!o.weak}}))}),t}function Ye(e,t=null){if(!y(e))return te();const s=te(),r=Number.isInteger(t)&&t>0?t:null,i=E(e.countCustom,null),a=k(e.timerCustom,NaN),o=i!==null&&i>=1,d=o?r?Math.min(r,i):i:s.countCustom,f=Number.isFinite(a)?ot(a,30,7200,s.timerCustom):s.timerCustom,m=e.countMode==="custom"&&o?"custom":s.countMode,g=e.timerMode==="custom"&&Number.isFinite(a)&&a>=30?"custom":s.timerMode,v=e.count==="all"?"all":E(e.count,null),b=v==="all"?"all":v===null?s.count:r?Math.min(r,v):v,h=Number(e.timer),p=Number.isFinite(h)&&h>=0?ot(h,0,7200,s.timer):s.timer;return{count:b,timer:p,countMode:m,timerMode:g,countCustom:d,timerCustom:f}}function _s(e,t){const s=Ye(e,t);return e?.countMode==="custom"&&s.countMode!=="custom"?{settings:s,error:`Вкажіть кількість слів від 1 до ${t}.`}:e?.timerMode==="custom"&&s.timerMode!=="custom"?{settings:s,error:"Вкажіть час від 30 секунд до 120 хвилин."}:{settings:s,error:""}}function Nt(e,t=D,s=n.wordsByList){if(!y(e))return null;const r=L(e.mode);if(!Is.has(r))return null;const i=L(e.listId)||t,a=_(e.items,i,s);if(!a.length)return null;const o={mode:r,listId:i,source:Es(e.source,r==="guided-learning"?"guided-learning":"all"),items:a};if(r==="flashcards"){const d=St(e,i,a,s);return d?{...o,baseItems:d.baseItems,queue:d.queue,deckItems:d.deckItems,missedIds:d.missedIds,sessionResults:d.sessionResults,index:d.index,shown:d.shown}:null}if(r==="learn"||r==="mistakes"){const d=It(e,i,a,s);return d?{...o,queue:d.queue,wrongQueue:d.wrongQueue,sessionCorrect:d.sessionCorrect,sessionWrong:d.sessionWrong,index:d.index}:null}if(r==="test"){const d=$t(e,i,a,s);return d?{...o,index:d.index}:null}if(r==="match"){const d=Ns(e.cards),f=E(e.pairs,null);if(!d.length||f===null||f<1)return null;const m=Math.min(de(e.matchedCount),f),g=E(e.firstUid,null);return{...o,cards:d,pairs:f,matchedCount:m,firstUid:g!==null&&d.some(v=>v.uid===g)?g:null}}return o}function Mt(e,t=D,s=n.wordsByList){if(!y(e))return null;const r=L(e.listId)||t,i=L(e.phase);if(!$s.has(i))return null;const a=_(e.items,r,s);return a.length?{listId:r,phase:i,items:a,currentIndex:pe(e.currentIndex,a.length),correct:de(e.correct),wrongQueue:He(e.wrongQueue),resumeState:xt(i,e.resumeState,r,a,s)}:null}function At(e){if(!y(e))return null;const t=L(e.mode);if(!kt.has(t))return null;const s=lt(e.queue,t);return s.length?{mode:t,queue:s,index:pe(e.index,s.length),correct:de(e.correct),wrong:de(e.wrong),wrongQueue:lt(e.wrongQueue,t)}:null}function js(e){const t=L(e.currentListId)||D,s=Rs(e.lists,t),r=s.some(a=>a.id===t)?t:D,i=Ds(e.wordsByList,s);return{currentListId:r,lists:s,wordsByList:i,progressByList:qs(e.progressByList,s),progressByModeByList:ct(e.progressByModeByList,s),items:Array.isArray(e.items)?e.items.map(a=>De(a,r)).filter(Boolean):[],progress:y(e.progress)?{correct:k(e.progress.correct,0),total:k(e.progress.total,0)}:{correct:0,total:0},progressByMode:ct({[r]:e.progressByMode},[{id:r}])[r],dailyLearned:y(e.dailyLearned)?e.dailyLearned:{},dailyGuidedLearned:y(e.dailyGuidedLearned)?e.dailyGuidedLearned:{},memoryByWord:Ps(e.memoryByWord),mistakes:je(e.mistakes,a=>{const o=k(a,NaN);return Number.isFinite(o)&&o>0?o:null}),favorites:je(e.favorites,a=>a?!0:null),flashcardStats:zs(e.flashcardStats),irregularVerbs:Array.isArray(e.irregularVerbs)?e.irregularVerbs:[],irregularVerbProgress:Fs(e.irregularVerbProgress),irregularVerbSession:At(e.irregularVerbSession),activeSession:Nt(e.activeSession,r,i),guidedSession:Mt(e.guidedSession,r,i),settings:Ye(e.settings)}}function Gs(){localStorage.removeItem(Ue)}function Ws(){n.irregularVerbs=[],n.irregularVerbProgress={},n.irregularVerbSession=null}function Ct(){const e=new Set(n.items.map(t=>t.id));return Object.keys(n.mistakes).map(Number).filter(t=>e.has(t)&&n.mistakes[t]>0)}function Vt(){const e=Ct();return n.items.filter(t=>e.includes(t.id))}function Xe(e){n.favorites[e]?delete n.favorites[e]:n.favorites[e]=!0,$()}function Rt(){const e=new Set(n.items.map(t=>t.id));return Object.keys(n.favorites).map(Number).filter(t=>e.has(t)&&n.favorites[t])}function Qs(){const e=Rt();return n.items.filter(t=>e.includes(t.id))}function ce(e){if(n.activeSession&&n.activeSession.mode==="guided-learning"&&n.guidedSession&&(n.guidedSession.listId||n.currentListId)===n.currentListId){const s=xt(n.guidedSession.phase,e,n.currentListId,_(n.guidedSession.items,n.currentListId));s?(typeof s.index=="number"&&(n.guidedSession.currentIndex=s.index),n.guidedSession.resumeState=s):e&&(n.guidedSession.resumeState=null),$();return}n.activeSession=e?Nt({...e,listId:n.currentListId},n.currentListId):null,$()}function A(){if(n.activeSession&&n.activeSession.mode==="guided-learning"&&n.guidedSession&&(n.guidedSession.listId||n.currentListId)===n.currentListId){$();return}n.activeSession=null,$()}function Us(e){const t=n.settings.countMode==="custom"?Number(n.settings.countCustom)||0:n.settings.count,s=F([...e]);return t==="all"?s:s.slice(0,Math.min(Number(t),s.length))}function Dt(e){return e==="favorites"?Qs():e==="mistakes"?Vt():n.items}function Hs(){return Object.values(n.wordsByList).flat()}function qt(e){const t=n.lists.find(s=>s.id===e);return t?(n.currentListId=t.id,j(),!0):!1}function Js(e){const t=Et(e);Bt(t);const s={id:As(),name:t,createdAt:Date.now()};return n.lists=[...n.lists,s],n.wordsByList[s.id]=[],n.progressByList[s.id]={correct:0,total:0},n.progressByModeByList[s.id]=Re(),n.currentListId=s.id,n.activeSession=null,n.guidedSession=null,$(),s}function Ys(e,t){const s=Et(t);return Bt(s),n.lists.find(i=>i.id===e)?(n.lists=n.lists.map(i=>i.id===e?{...i,name:s}:i),$(),!0):!1}function Xs(e){if(!n.lists.some(r=>r.id===e))return!1;const t=n.activeSession?.listId===e,s=n.wordsByList[e]||[];return Cs(e,s),delete n.wordsByList[e],delete n.progressByList[e],delete n.progressByModeByList[e],n.lists=n.lists.filter(r=>r.id!==e),n.lists.length?n.currentListId===e&&(n.currentListId=n.lists[0].id):(n.currentListId=D,n.lists=[{id:D,name:"Мій список",createdAt:Date.now()}]),t&&(n.activeSession=null),n.guidedSession?.listId===e&&(n.guidedSession=null),j(),$(),!0}function Tt(e,t=n.currentListId){return`${t}:${e}`}function Ot(e){const t=n.memoryByWord[Tt(e)]||n.memoryByWord[e]||{};return{strength:Number(t.strength)||0,lastReviewedAt:Number(t.lastReviewedAt)||0}}function Pt(e,t){const s=n.memoryByWord[`${t}:${e}`]||n.memoryByWord[e]||{};return{strength:Number(s.strength)||0,lastReviewedAt:Number(s.lastReviewedAt)||0}}function zt(e){const t=n.wordsByList[e]||[];return t.length?t.reduce((r,i)=>{const a=Pt(i.id,e);return r+Math.max(0,Math.min(3,Number(a.strength)||0))},0)/t.length:0}function Ks(e){return e>=7?.3:e>=4?.5:e>=2?.7:e>=1?.88:1}function Zs(e,t,s=Date.now()){if(!t)return e;const r=Math.floor((s-t)/(1440*60*1e3));return e*Ks(r)}function en(e,t){if(typeof e!="number"||t!=="learn"&&t!=="test")return;const s=Ke();n.dailyLearned[s]||(n.dailyLearned[s]={}),n.dailyLearned[s][e]=!0}function tn(e){if(typeof e!="number")return;const t=Ke();n.dailyGuidedLearned[t]||(n.dailyGuidedLearned[t]={}),n.dailyGuidedLearned[t][e]=!0}function sn(e){typeof e!="number"||!n.guidedSession||(Array.isArray(n.guidedSession.wrongQueue)||(n.guidedSession.wrongQueue=[]),n.guidedSession.wrongQueue.includes(e)||n.guidedSession.wrongQueue.push(e))}function nn(e){n.mistakes[e]=(n.mistakes[e]||0)+1}function rn(e){n.mistakes[e]&&delete n.mistakes[e]}function ut(e){const t={flashcards:{correct:0,total:0,solved:{}},learn:{correct:0,total:0,solved:{}},match:{correct:0,total:0,solved:{}},test:{correct:0,total:0,solved:{}},"guided-learning":{correct:0,total:0,solved:{}}};return Object.keys(t).forEach(s=>{const r=e&&e[s]?e[s]:{};t[s]={correct:Number(r.correct)||0,total:Number(r.total)||0,solved:r.solved||{}}}),t}function Ft(e){return n.flashcardStats[e]||{know:0,miss:0,streak:0,mastered:!1}}function an(e,t){const s=Ft(e),r={know:s.know+(t?1:0),miss:s.miss+(t?0:1),streak:t?s.streak+1:0,mastered:!1};return r.mastered=r.streak>=3&&r.miss<=1,n.flashcardStats[e]=r,$(),r}function on(e){const t=Ft(e);return t.mastered?"mastered":t.streak>=2?"known":t.miss>t.know?"weak":"new"}function ln(e){const t={weak:[],new:[],known:[],mastered:[]};return e.forEach(s=>t[on(s.id)].push(s)),[...F(t.weak),...F(t.new),...F(t.known),...F(t.mastered)]}function Ke(){const e=new Date,t=e.getFullYear(),s=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${t}-${s}-${r}`}function ue(e,t,s){const r=n.activeSession&&n.activeSession.mode==="guided-learning"&&n.guidedSession,i=r&&(n.guidedSession.phase==="input"||n.guidedSession.phase==="test"),a=r?"guided-learning":s;if(n.progress.total+=1,e&&(n.progress.correct+=1),a&&n.progressByMode[a]&&(n.progressByMode[a].total+=1,e&&(n.progressByMode[a].correct+=1,r&&(n.guidedSession.correct=(n.guidedSession.correct||0)+1),typeof t=="number"&&(n.progressByMode[a].solved[t]=!0,r?tn(t):en(t,s)))),i&&!e&&sn(t),typeof t=="number"){const o=Ot(t),d=e?Math.min(3,r&&o.strength===0?2:o.strength+1):0;n.memoryByWord[Tt(t)]={strength:d,lastReviewedAt:Date.now()},e?rn(t):nn(t)}$()}function dn(){const e=Date.now();return n.items.map(t=>{const s=Ot(t.id),r=Zs(s.strength,s.lastReviewedAt,e),i=s.lastReviewedAt?Math.floor((e-s.lastReviewedAt)/(1440*60*1e3)):9999;return{item:t,strength:s.strength,lastReviewedAt:s.lastReviewedAt,shouldReview:r<2||i>=2}}).filter(t=>t.shouldReview).sort((t,s)=>t.strength!==s.strength?t.strength-s.strength:t.lastReviewedAt-s.lastReviewedAt).map(t=>t.item)}function cn(){const e=n.items.length||0;if(!e)return{totalWords:0,averageStrength:0,memoryPercent:0,wordsToReviewCount:0,statusText:"Додайте слова, щоб побачити стан памʼяті."};const t=zt(n.currentListId),s=Math.max(0,Math.min(100,Math.round(t/3*100)));let r="Потрібно відновити знання";return s>=90?r="Ти знаєш усі слова":s>=70?r="Потрібно трохи повторити":s>=40&&(r="Ти починаєш забувати слова"),{totalWords:e,averageStrength:t,memoryPercent:s,wordsToReviewCount:dn().length,statusText:r}}function _t(e,t,s){const r=t||{},i=new Set(s||[]),a=e.filter(m=>r[m.id]===!0&&!i.has(m.id)),o=e.filter(m=>r[m.id]===!0&&i.has(m.id)),d=e.filter(m=>r[m.id]===!1),f=e.filter(m=>i.has(m.id));return{confidentItems:a,recoveredItems:o,unresolvedItems:d,weakItems:f}}function Ze(e){const t=zt(e);return Math.max(0,Math.min(100,Math.round(t/3*100)))}function jt(e){return(n.wordsByList[e]||[]).some(s=>{const r=Pt(s.id,e);return r.lastReviewedAt>0||r.strength>0})}function Gt(e){return`${n.currentListId}:${e}`}function et(e){return{en:T(e?.en),ua:T(e?.ua)}}function Wt(e){Z(e.en,"Заповніть обидва поля: english і ukrainian."),Z(e.ua,"Заповніть обидва поля: english і ukrainian."),Ce(e.en,at,"Поля english і ukrainian мають бути не довші за 120 символів."),Ce(e.ua,at,"Поля english і ukrainian мають бути не довші за 120 символів.")}function un(){return Hs().reduce((e,t)=>Math.max(e,Number(t.id)||0),0)+1}function mn(e,t){const s=et(t),r=n.items.find(a=>a.id!==e&&a.en===s.en&&a.ua===s.ua);if(r)return{type:"duplicate",item:r,normalized:s};const i=n.items.find(a=>a.id!==e&&(a.en===s.en||a.ua===s.ua));return i?{type:"overlap",item:i,normalized:s,reason:item.en===s.en&&item.ua!==s.ua?"Однакове english, але інший переклад.":item.ua===s.ua&&item.en!==s.en?"Однакове ukrainian, але інше слово.":"Схожа пара вже є у словнику."}:{type:null,item:null,normalized:s}}function Qt(e,t){const{en:s,ua:r}=et(t);Wt({en:s,ua:r}),e?n.items=n.items.map(i=>i.id===e?{...i,en:s,ua:r,listId:n.currentListId}:i):n.items=[...n.items,{id:un(),listId:n.currentListId,en:s,ua:r}],A(),$()}function fn(e,t,s){const{en:r,ua:i}=et(s);Wt({en:r,ua:i}),n.items=n.items.map(a=>a.id===e?{...a,en:r,ua:i}:a).filter(a=>a.id!==t||t===e),t&&t!==e&&(delete n.mistakes[t],delete n.favorites[t],delete n.flashcardStats[t],delete n.memoryByWord[t],delete n.memoryByWord[Gt(t)],Object.keys(n.dailyLearned).forEach(a=>n.dailyLearned[a]&&delete n.dailyLearned[a][t]),Object.keys(n.dailyGuidedLearned).forEach(a=>n.dailyGuidedLearned[a]&&delete n.dailyGuidedLearned[a][t]),Object.keys(n.progressByMode).forEach(a=>{n.progressByMode[a]?.solved&&delete n.progressByMode[a].solved[t]})),A(),$()}function vn(e){n.items=n.items.filter(t=>t.id!==e),delete n.mistakes[e],delete n.favorites[e],delete n.flashcardStats[e],delete n.memoryByWord[e],delete n.memoryByWord[Gt(e)],Object.keys(n.dailyLearned).forEach(t=>n.dailyLearned[t]&&delete n.dailyLearned[t][e]),Object.keys(n.dailyGuidedLearned).forEach(t=>n.dailyGuidedLearned[t]&&delete n.dailyGuidedLearned[t][e]),Object.keys(n.progressByMode).forEach(t=>{n.progressByMode[t]?.solved&&delete n.progressByMode[t].solved[e]}),A(),$()}const G=["base","past","participle","ua"],gn={base:"Base",past:"Past Simple",participle:"Past Participle",ua:"Українська"};function le(e){return gn[e]||e}function tt(e){return{base:T(e?.base),past:T(e?.past),participle:T(e?.participle),ua:T(e?.ua)}}function ye(e){return n.irregularVerbProgress[e]||(n.irregularVerbProgress[e]={}),G.forEach(t=>{const s=n.irregularVerbProgress[e][t]||{};n.irregularVerbProgress[e][t]={correct:Number(s.correct)||0,total:Number(s.total)||0,streak:Number(s.streak)||0,weak:!!s.weak}}),n.irregularVerbProgress[e]}function bn(e){const t={},s=e&&typeof e=="object"?e:{};return Object.keys(s).forEach(r=>{t[r]={},G.forEach(i=>{const a=s[r]?.[i]||{};t[r][i]={correct:Number(a.correct)||0,total:Number(a.total)||0,streak:Number(a.streak)||0,weak:!!a.weak}})}),t}function hn(e){return(Array.isArray(e)?e:[]).map(s=>({id:Number(s.id),...tt(s),createdAt:Number(s.createdAt)||Date.now(),updatedAt:Number(s.updatedAt)||Number(s.createdAt)||Date.now()})).filter(s=>Number.isFinite(s.id)&&s.base&&s.past&&s.participle&&s.ua)}function Ut(e){Z(e.base,"Заповніть усі 4 поля."),Z(e.past,"Заповніть усі 4 поля."),Z(e.participle,"Заповніть усі 4 поля."),Z(e.ua,"Заповніть усі 4 поля."),G.forEach(t=>{Ce(e[t],ks,"Кожне поле дієслова має бути не довше за 120 символів.")})}function mt(e){return`${e.base}::${e.past}::${e.participle}::${e.ua}`}function Ht(e,t=null){if(n.irregularVerbs.find(i=>i.id!==t&&mt(i)===mt(e)))throw new Error("Таке неправильне дієслово вже є.");if(n.irregularVerbs.find(i=>i.id!==t&&i.base===e.base))throw new Error("Дієслово з такою базовою формою вже є.")}function pn(){return n.irregularVerbs.reduce((e,t)=>Math.max(e,Number(t.id)||0),0)+1}function yn(e){const t=tt(e);Ut(t),Ht(t);const s=Date.now(),r={id:pn(),...t,createdAt:s,updatedAt:s};return n.irregularVerbs=[...n.irregularVerbs,r],ye(r.id),n.irregularVerbSession=null,$(),r}function wn(e,t){const s=Number(e),r=n.irregularVerbs.find(o=>o.id===s);if(!r)throw new Error("Неправильне дієслово не знайдено.");const i=tt(t);Ut(i),Ht(i,s);const a={...r,...i,updatedAt:Date.now()};return n.irregularVerbs=n.irregularVerbs.map(o=>o.id===s?a:o),ye(s),n.irregularVerbSession=null,$(),a}function Ln(e){const t=Number(e);n.irregularVerbs=n.irregularVerbs.filter(s=>s.id!==t),delete n.irregularVerbProgress[t],n.irregularVerbSession?.queue?.some(s=>s.verbId===t)&&(n.irregularVerbSession=null),$()}function Jt(e){const t=Number(e);return n.irregularVerbs.find(s=>s.id===t)||null}function Yt(e,t,s){const r=Jt(e);return!r||!G.includes(t)?!1:String(s||"").trim().toLowerCase()===r[t]}function ft(e,t){const s={};return G.forEach(r=>{Object.prototype.hasOwnProperty.call(t||{},r)&&(s[r]=Yt(e,r,t[r]))}),s}function kn(e,t,s){if(!G.includes(t))return null;const r=ye(Number(e)),i=r[t];return r[t]={correct:i.correct+(s?1:0),total:i.total+1,streak:s?i.streak+1:0,weak:s?i.streak+1<2&&i.total>0?i.weak:!1:!0},$(),r[t]}function Sn(e){return G.map(t=>({mode:"fill-missing",verbId:e.id,target:t}))}function In(e){return{mode:"build-row",verbId:e.id,anchor:"ua",targets:["base","past","participle"]}}function $n(e){return{mode:"restore-order",verbId:e.id,targets:[...G],options:F(G.map(t=>({field:t,value:e[t]})))}}function vt(e){const t=n.irregularVerbProgress[e.verbId]||{};return e.target?t[e.target]?.weak?0:1:e.targets?.some(s=>t[s]?.weak)?0:1}function xn(e="fill-missing"){return n.irregularVerbs.flatMap(s=>(ye(s.id),e==="build-row"?[In(s)]:e==="restore-order"?[$n(s)]:Sn(s))).sort((s,r)=>vt(s)-vt(r))}function Xt(){let e=0,t=0,s=0;return n.irregularVerbs.forEach(r=>{const i=ye(r.id);G.forEach(a=>{e+=i[a].total,t+=i[a].correct,i[a].weak&&(s+=1)})}),{totalVerbs:n.irregularVerbs.length,weakForms:s,accuracy:e?Math.round(t/e*100):0}}function gt(e){n.irregularVerbSession=e?At(e):null,$()}function ze(){n.irregularVerbSession=null,$()}const Kt={};function En(e){Object.assign(Kt,e)}function l(e,...t){const s=Kt[e];if(!s)throw new Error(`Route "${e}" is not registered.`);const r=s(...t);return typeof window<"u"&&window.requestAnimationFrame(()=>window.scrollTo({top:0,left:0})),r}function st(e,t="all"){if(e==="guided-learning"){l("startGuidedLearning");return}const s=Us(Dt(t));if(!s.length){l("showList");return}e==="flashcards"&&l("showFlashcards",s,t),e==="learn"&&l("showLearn",s,t),e==="match"&&l("showMatch",s,t),e==="test"&&l("showTest",s,t),e==="mistakes"&&l("showMistakesReview",s)}function Ne(){const e=n.activeSession;if(!e){l("showList");return}if(e.listId&&e.listId!==n.currentListId){A(),l("showList");return}e.mode==="flashcards"?l("showFlashcards",e.items,e.source||"all",e):e.mode==="learn"?l("showLearn",e.items,e.source||"all",e):e.mode==="match"?l("showMatch",e.items,e.source||"all",e):e.mode==="test"?l("showTest",e.items,e.source||"all",e):e.mode==="mistakes"?l("showMistakesReview",e.items,e):e.mode==="guided-learning"?l("showGuidedLearning"):(A(),l("showList"))}function we(){if(!(n.activeSession&&n.activeSession.mode==="guided-learning"&&n.guidedSession))return!1;const e=n.guidedSession.listId||n.currentListId,t=n.activeSession.listId||n.currentListId;return e===n.currentListId&&t===n.currentListId}function Le(e){n.guidedSession=Mt({...e,listId:e?.listId||n.currentListId},n.currentListId),$()}function se(){n.guidedSession=null,$()}function Zt(){return document.getElementById("app")}function B(e){Zt().innerHTML=e}function S(e,...t){e&&e.replaceChildren(...t.filter(Boolean))}function q(e,t){e&&(e.textContent=String(t??""))}function c(e,t={}){const s=document.createElement(e),{className:r="",id:i="",text:a,attrs:o={}}=t;return r&&(s.className=r),i&&(s.id=i),a!==void 0&&q(s,a),Object.entries(o).forEach(([d,f])=>{f!=null&&s.setAttribute(d,String(f))}),s}function u(e,t){const s=document.getElementById(e);s&&s.addEventListener("click",t)}const bt={name:"Langli",resetLabel:"Скинути прогрес"},Bn=`<div class="logo-icon"><svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="6" height="6" rx="1.5" fill="white"/>
    <rect x="10" y="2" width="6" height="6" rx="1.5" fill="rgba(255,255,255,0.5)"/>
    <rect x="2" y="10" width="6" height="6" rx="1.5" fill="rgba(255,255,255,0.5)"/>
    <rect x="10" y="10" width="6" height="6" rx="1.5" fill="white"/>
  </svg></div>`,Be={flashcards:'<svg width="22" height="22" fill="none" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="3" stroke="currentColor" stroke-width="2"/><path d="M8 12h8M12 8v8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',learn:'<svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',match:'<svg width="22" height="22" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/><rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/><rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/><rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/></svg>',test:'<svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M9 11l3 3L22 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'};function N(e={}){const{actions:t=`<button class="btn-ghost" id="reset-btn">${bt.resetLabel}</button>`}=e;return`<header class="list-header">
    <div class="header-inner">
      <div class="logo">
        ${Bn}
        <span class="logo-name">${bt.name}</span>
      </div>
      <div class="header-actions">${t}</div>
    </div>
  </header>`}function Nn(e,t=""){return`<div class="section-label-row">
    <div class="section-label">${e}</div>
    ${t}
  </div>`}function H(e="tb-back",t="Назад"){return`<button class="settings-back-btn" id="${e}" type="button">← ${t}</button>`}function ie({screenClass:e="screen",pageClass:t="",title:s="",subtitle:r="",backButton:i="",content:a=""}={}){const o=["inner-panel-page",t].filter(Boolean).join(" ");return`<div class="${e}">
    <div class="${o}">
      <div class="settings-panel-head inner-panel-head">
        ${i||"<span></span>"}
        <div class="settings-panel-title">${s}</div>
        <div class="settings-panel-sub">${r}</div>
      </div>
      <div class="inner-panel-body">${a}</div>
    </div>
  </div>`}function Mn({screenClass:e="screen",pageClass:t="settings-page",title:s="",subtitle:r="",backButton:i="",content:a="",footer:o=""}={}){return`<div class="${e}">
    <div class="${t}">
      <div class="settings-panel-head">
        ${i||H()}
        <div class="settings-panel-title">${s}</div>
        <div class="settings-panel-sub">${r}</div>
      </div>
      ${a}
      ${o}
    </div>
  </div>`}function fe({screenClass:e="screen session-screen",layoutClass:t="session-layout",headClass:s="settings-panel-head",title:r="",subtitle:i="",content:a="",actions:o=""}={}){return`<div class="${e}">
    <div class="${t}">
      <div class="${s}">
        ${H()}
        <div class="settings-panel-title">${r}</div>
        <div class="settings-panel-sub">${i}</div>
      </div>
      ${a}
      ${o}
    </div>
  </div>`}function ke({screenClass:e="screen result-screen",layoutClass:t="result-session-layout",headClass:s="settings-panel-head result-session-head",title:r="",subtitle:i="",content:a=""}={}){return`<div class="${e}">
    <div class="${t}">
      <div class="${s}">
        ${H()}
        <div class="settings-panel-title">${r}</div>
        <div class="settings-panel-sub">${i}</div>
      </div>
      ${a}
    </div>
  </div>`}function es({title:e,body:t,actions:s=[]}){const r=document.createElement("div");r.className="modal-overlay";const i=document.createElement("div");i.className="modal-card";const a=document.createElement("div");a.className=e?"modal-card-title":"report-title",a.textContent=e,i.appendChild(a);const o=document.createElement("div");o.className=t?.className||"modal-card-body",o.textContent=t?.text||"",i.appendChild(o);const d=document.createElement("div");return d.className=t?.actionsClassName||"modal-card-actions",s.forEach(f=>{const m=document.createElement("button");m.type="button",m.id=f.id,m.className=f.className,m.textContent=f.label,d.appendChild(m)}),i.appendChild(d),r.appendChild(i),r}let X=null,ne=0,Me=null;function K(){X&&(clearInterval(X),X=null),ne=0}function he(){Me&&(clearTimeout(Me),Me=null)}function ts(e,t){he(),Me=setTimeout(e,t)}function ss(){return ne?Math.max(0,Math.ceil((ne-Date.now())/1e3)):0}function qe(){return n.settings.timerMode==="custom"?Number(n.settings.timerCustom)||0:n.settings.timer}function ns(e){const t=Math.floor(e/60),s=e%60;return`${String(t).padStart(2,"0")}:${String(s).padStart(2,"0")}`}function rs(e){if(e<60)return`${e} сек`;const t=Math.floor(e/60),s=e%60;return s?`${t} хв ${s} сек`:`${t} хв`}function Se(e,t){const s=qe()?`<span class="session-timer">⏱ <span id="session-timer-value">${ns(ss())}</span></span>`:"";return`<div class="session-meta"><span>${e}/${t}</span>${s}</div>`}function nt(e){if(!qe()||!ne)return;const t=()=>{const s=ss(),r=document.getElementById("session-timer-value"),i=document.querySelector(".session-timer");r&&(r.textContent=ns(s)),i&&i.classList.toggle("is-warning",s<=5),s<=0&&(K(),e())};t(),X||(X=setInterval(t,1e3))}function Ie(e){K();const t=qe();t&&(ne=Date.now()+t*1e3,nt(e))}function $e(e){qe()&&ne&&(X&&clearInterval(X),X=null,nt(e))}function O(e,t){const s=document.getElementById("timeup-modal");s&&s.remove();const r=es({title:"Час завершився",body:{text:"Можна додати ще час і продовжити поточну сесію або повернутись на головний екран.",className:"report-reasons",actionsClassName:"editor-actions"},actions:[{id:"timeup-extend-btn",className:"btn btn-primary btn-block",label:"Додати 1 хв"},{id:"timeup-home-btn",className:"btn btn-outline btn-block",label:"На головний"}]});r.id="timeup-modal",Zt().appendChild(r),u("timeup-extend-btn",()=>{document.getElementById("timeup-modal")?.remove(),e()}),u("timeup-home-btn",()=>{document.getElementById("timeup-modal")?.remove(),t()})}function P(e,t=60){ne=Date.now()+t*1e3,nt(e)}function M(){const e=es({title:"Скинути прогрес?",body:{text:"Увесь прогрес, словник і неправильні дієслова будуть видалені. Цю дію не можна скасувати."},actions:[{id:"confirm-reset-btn",className:"btn btn-err btn-block",label:"Так, скинути"},{id:"cancel-reset-btn",className:"btn btn-ghost btn-block",label:"Скасувати"}]});document.body.appendChild(e),e.querySelector("#confirm-reset-btn").addEventListener("click",()=>{e.remove(),An()}),e.querySelector("#cancel-reset-btn").addEventListener("click",()=>e.remove()),e.addEventListener("click",t=>{t.target===e&&e.remove()})}function An(){Gs(),A(),n.currentListId=D,n.lists=[{id:D,name:"Мій список",createdAt:Date.now()}],n.wordsByList={},n.progressByList={},n.progressByModeByList={},n.items=[],n.progress={correct:0,total:0},n.progressByMode=Re(),n.dailyLearned={},n.dailyGuidedLearned={},n.memoryByWord={},n.mistakes={},n.favorites={},n.flashcardStats={},Ws(),n.guidedSession=null,n.settings=te(),K(),l("showImport")}const ht=[{key:"intro",num:1,label:"Ознайомлення",desc:"Картки EN → UA"},{key:"recall",num:2,label:"Картки",desc:"Автоматичне перегортання"},{key:"input",num:3,label:"Навчання",desc:"Введи відповідь"},{key:"test",num:4,label:"Тест",desc:"Вибір варіанту"}];function Cn(e){const t=ht.findIndex(s=>s.key===e);return`<aside class="guided-tracker">
    <div class="ssb-label">Фази навчання</div>
    <div class="guided-phases">
      ${ht.map((s,r)=>{const i=r<t;return`<div class="guided-phase${r===t?" active":""}${i?" done":""}">
          <div class="guided-phase-dot">${i?"✓":s.num}</div>
          <div class="guided-phase-info">
            <div class="guided-phase-name">${s.label}</div>
            <div class="guided-phase-desc">${s.desc}</div>
          </div>
        </div>`}).join("")}
    </div>
  </aside>`}function Ge(){if(!n.guidedSession){l("showList");return}if((n.guidedSession.listId||n.currentListId)!==n.currentListId){se(),A(),l("showList");return}const e=n.guidedSession.phase,t=n.guidedSession.items||[];if(!t.length&&e!=="intro"){se(),A(),l("showList");return}e==="intro"?l("showGuidedLearning"):e==="recall"?l("showFlashcards",t,"guided-learning",Rn(t)):e==="input"?l("showLearn",t,"guided-learning",Dn(t)):e==="test"?l("showTest",t,"guided-learning",qn()):l("showList")}function Vn(){const e=[...n.items];if(!e.length){B(`${N()}${ie({pageClass:"guided-empty-page",title:"Покрокове навчання",subtitle:"Немає слів",backButton:H(),content:`
          <div class="learn-area">
            <div class="sec-label">Словник порожній</div>
            <div class="empty-list-copy">Додайте хоча б одну пару, щоб почати навчання.</div>
          </div>
          <div class="card-actions">
            <button class="btn btn-primary btn-block" id="guided-add-words-btn">Додати слова</button>
          </div>
        `})}`),u("tb-back",()=>l("showList")),u("reset-btn",M),u("guided-add-words-btn",()=>l("showManageVocabulary"));return}Le({listId:n.currentListId,items:e,currentIndex:0,phase:"intro",correct:0,wrongQueue:[],resumeState:null}),n.activeSession={mode:"guided-learning",source:"guided-learning",listId:n.currentListId,items:e},$(),is()}function is(){if(!n.guidedSession){A(),l("showList");return}if((n.guidedSession.listId||n.currentListId)!==n.currentListId){se(),A(),l("showList");return}if(n.guidedSession.phase!=="intro"){Ge();return}const e=n.guidedSession.items.length;B(`${N()}${ie({pageClass:"guided-page",title:"Покрокове навчання",subtitle:`${e} слів`,backButton:H(),content:`<div class="guided-layout">

      <div class="guided-content">
        <div class="guided-intro-card">
          <div class="guided-intro-icon">🎓</div>
          <div class="guided-intro-title">Покрокове навчання</div>
          <div class="guided-intro-sub">${e} слів · 4 фази</div>
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

      ${Cn("intro")}

        </div>`})}`),u("tb-back",()=>l("showList")),u("reset-btn",M),u("guided-next-btn",()=>{Le({...n.guidedSession,phase:"recall",currentIndex:0,wrongQueue:[],resumeState:null}),Ge()})}function Rn(e){return n.guidedSession.resumeState?n.guidedSession.resumeState:n.guidedSession.currentIndex>0?{index:n.guidedSession.currentIndex,queue:e,baseItems:e,deckItems:e,missedIds:n.guidedSession.wrongQueue||[],sessionResults:{}}:null}function Dn(e){return n.guidedSession.resumeState?n.guidedSession.resumeState:n.guidedSession.currentIndex>0?{index:n.guidedSession.currentIndex,queue:[...e],wrongQueue:n.guidedSession.wrongQueue||[],sessionCorrect:n.guidedSession.correct||0,sessionWrong:(n.guidedSession.wrongQueue||[]).length}:null}function qn(){return n.guidedSession.resumeState?n.guidedSession.resumeState:n.guidedSession.currentIndex>0?{index:n.guidedSession.currentIndex}:null}function Tn(){K();const e=n.items.length>0;B(`${N()}${ie({pageClass:"import-page",title:"Додати словник",subtitle:"Ручне створення",backButton:e?'<button class="settings-back-btn" id="tb-back" type="button">← Назад</button>':"<span></span>",content:`<div class="import-layout"><div class="import-form">${On()}</div></div>`})}`),e&&u("tb-back",()=>l("showList")),u("reset-btn",M),u("manual-start-btn",()=>l("showManageVocabulary",null,ee(),!0))}function On(){return`<div class="manual-start">
    <div class="fmt-box">
      <div class="manual-copy">Створіть словник вручну: додавайте, редагуйте і видаляйте пари слів у простому редакторі.</div>
      <div class="manual-copy">Після цього одразу зможете перейти до режимів навчання й керування списками.</div>
    </div>
    <button class="btn btn-primary btn-block" id="manual-start-btn">Почати вручну →</button>
  </div>`}const Pn={"fill-missing":"Заповни пропуск","build-row":"Побудуй трійку","restore-order":"Віднови рядок"};let x={editingId:null,error:"",draft:{base:"",past:"",participle:"",ua:""},confirmDeleteId:null};function pt(){return{editingId:null,error:"",draft:{base:"",past:"",participle:"",ua:""},confirmDeleteId:null}}function zn(){const e=Xt();return`<div class="today-stats irregular-stats">
    <div class="today-stat"><div class="today-stat-value">${e.totalVerbs}</div><div class="today-stat-label">Дієслів</div></div>
    <div class="today-stat"><div class="today-stat-value accent">${e.weakForms}</div><div class="today-stat-label">Форм на повтор</div></div>
    <div class="today-stat"><div class="today-stat-value">${e.accuracy}%</div><div class="today-stat-label">Точність</div></div>
  </div>`}function Fn(){const e=x.editingId?n.irregularVerbs.find(t=>t.id===x.editingId):null;return`<div class="irregular-form">
    <div class="sec-label">${e?"Редагувати дієслово":"Додати дієслово"}</div>
    <div class="irregular-form-grid">
      <input class="text-in" id="iv-base" placeholder="Base: be">
      <input class="text-in" id="iv-past" placeholder="Past Simple: was">
      <input class="text-in" id="iv-participle" placeholder="Past Participle: been">
      <input class="text-in" id="iv-ua" placeholder="Українською: бути">
    </div>
    <div class="list-field-error" id="iv-form-error"${x.error?"":" hidden"}></div>
    <div class="list-create-btns">
      <button class="btn btn-primary" id="iv-save-btn">${e?"Зберегти":"Додати"}</button>
      ${e?'<button class="btn btn-ghost" id="iv-cancel-edit-btn">Скасувати</button>':""}
    </div>
  </div>`}function ae(){const e=Xt();B(`${N()}${ie({pageClass:"irregular-page",title:"Неправильні дієслова",subtitle:`${e.totalVerbs} дієслів`,backButton:H(),content:`
        ${zn()}
        <div class="card-actions">
          <button class="btn btn-primary btn-block" id="iv-start-btn"${n.irregularVerbs.length?"":" disabled"}>Почати тренування</button>
        </div>
        <div id="irregular-modes-root"></div>
        ${Fn()}
        <div id="irregular-table-root"></div>
      `})}`);const t=x.editingId?n.irregularVerbs.find(i=>i.id===x.editingId):null,s=x.error?x.draft:t||x.draft;document.getElementById("iv-base").value=s.base||"",document.getElementById("iv-past").value=s.past||"",document.getElementById("iv-participle").value=s.participle||"",document.getElementById("iv-ua").value=s.ua||"";const r=document.getElementById("iv-form-error");r&&x.error&&q(r,x.error),jn(document.getElementById("irregular-modes-root")),Gn(document.getElementById("irregular-table-root")),Wn()}function _n(){return{base:document.getElementById("iv-base")?.value||"",past:document.getElementById("iv-past")?.value||"",participle:document.getElementById("iv-participle")?.value||"",ua:document.getElementById("iv-ua")?.value||""}}function yt(e){const t=xn(e);t.length&&l("showIrregularVerbSession",e,t)}function jn(e){if(!e)return;const t=c("div",{className:"modes-section irregular-modes"}),s=c("div",{className:"modes-header"});s.append(c("span",{className:"modes-title",text:"Тренування"}));const r=c("div",{className:"modes-grid"});Object.entries(Pn).forEach(([i,a])=>{const o=c("button",{className:"mode-card",attrs:{"data-iv-mode":i}});n.irregularVerbs.length||(o.disabled=!0),o.append(c("div",{className:"mode-name",text:a}),c("div",{className:"mode-desc",text:i==="fill-missing"?"Введи одну форму":i==="build-row"?"Введи три форми":"Розстав значення"})),r.append(o)}),t.append(s,r),S(e,t)}function Gn(e){if(!e)return;if(!n.irregularVerbs.length){const r=c("div",{className:"learn-area irregular-empty"});r.append(c("div",{className:"sec-label",text:"Немає дієслів"}),c("div",{className:"empty-list-copy",text:"Додайте перший рядок у форматі base, Past Simple, Past Participle і український переклад."})),S(e,r);return}const t=c("div",{className:"irregular-table"}),s=c("div",{className:"irregular-table-head"});["Base","Past Simple","Past Participle","Українська",""].forEach(r=>s.append(c("span",{text:r}))),t.append(s),n.irregularVerbs.forEach(r=>{const i=c("div",{className:"irregular-row"});i.append(c("span",{text:r.base}),c("span",{text:r.past}),c("span",{text:r.participle}),c("span",{text:r.ua}));const a=c("span",{className:"irregular-row-actions"});a.append(c("button",{className:"mini-btn",text:"Редагувати",attrs:{"data-iv-edit":r.id}}),c("button",{className:"mini-btn danger",text:"Видалити",attrs:{"data-iv-delete":r.id}})),i.append(a),t.append(i)}),S(e,t)}function Wn(){u("tb-back",()=>l("showList")),u("reset-btn",M),u("iv-start-btn",()=>yt("fill-missing")),u("iv-save-btn",()=>{x.draft=_n();try{x.editingId?wn(x.editingId,x.draft):yn(x.draft),x=pt(),ae()}catch(e){x.error=e.message,ae()}}),u("iv-cancel-edit-btn",()=>{x=pt(),ae()}),document.querySelectorAll("[data-iv-edit]").forEach(e=>{e.addEventListener("click",()=>{x.editingId=Number(e.dataset.ivEdit),x.error="",ae()})}),document.querySelectorAll("[data-iv-delete]").forEach(e=>{e.addEventListener("click",()=>{Ln(Number(e.dataset.ivDelete)),ae()})}),document.querySelectorAll("[data-iv-mode]").forEach(e=>{e.addEventListener("click",()=>yt(e.dataset.ivMode))})}function Qn(e){return{flashcards:"Картки",learn:"Навчання",match:"Пари",test:"Тест",mistakes:"Повтор помилок","guided-learning":"Покрокове навчання"}[e]||"Сесія"}function Un(e){if(!e)return"";if(e.mode==="guided-learning"&&n.guidedSession){const r=n.guidedSession.items?n.guidedSession.items.length:0,i=n.guidedSession.currentIndex||0;return`Етап: ${n.guidedSession.phase||"intro"} • ${i}/${r}`}if(e.mode==="match")return`Знайдено ${e.matchedCount||0} з ${e.pairs||0}`;const t=e.index||0,s=e.items?e.items.length:0;return`Пройдено ${t} з ${s}`}function me(){Je(),K(),n.settings=te();const e=Ct().length,t=Rt().length,s=cn(),r=n.lists.find(o=>o.id===n.currentListId),i=r?r.name:"Мій список",a=Hn(n.dailyLearned);B(`<div class="home-wrapper">
    ${N()}

    <div class="app-layout">
      <aside class="sidebar">

        <div class="sidebar-section sidebar-lists">
          <div class="section-label">Списки</div>
          <nav class="lists-nav" id="home-lists-nav">
            <button class="add-list-btn" id="add-list-btn">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
              Новий список
            </button>
          </nav>
        </div>

        <div class="sidebar-section">
          <div class="section-label">Окремий розділ</div>
          <button class="list-item irregular-entry" id="irregular-verbs-btn">
            <span class="list-item-name">Неправильні дієслова</span>
            <span class="list-item-count">${n.irregularVerbs.length}</span>
          </button>
        </div>

        <div class="sidebar-section sidebar-progress">
          <div class="section-label">Стан памʼяті</div>
          <div class="progress-header">
            <div class="progress-percent">${s.memoryPercent}%</div>
          </div>
          <div class="progress-subtitle" id="memory-status-text"></div>
          <div class="progress-bar-wrap">
            <div class="progress-bar-fill" style="width:${s.memoryPercent}%"></div>
          </div>
          <div class="progress-meta">
            <div class="meta-item">
              <div class="meta-value">${n.items.length}</div>
              <div class="meta-label">Слів</div>
            </div>
            <div class="meta-item">
              <div class="meta-value">${e}</div>
              <div class="meta-label">Помилок</div>
            </div>
            <div class="meta-item">
              <div class="meta-value">${t}</div>
              <div class="meta-label">Обраних</div>
            </div>
          </div>
        </div>

        <div class="sidebar-section sidebar-streak streak-card">
          <div class="streak-inner">
            <div class="streak-icon">🔥</div>
            <div class="streak-text">
              <div class="streak-number">${a} ${Jn(a)}</div>
              <div class="streak-desc">Серія без пропусків</div>
            </div>
          </div>
        </div>

      </aside>

      <main class="main-content">
        ${n.items.length?Yn(i,s,e):rr()}
        ${n.items.length?Xn(e,t):""}
        ${n.items.length?Kn():""}
      </main>
    </div>

    <div class="mobile-cta-bar">
      <button class="btn btn-primary" id="btn-guided-learning-mobile" style="width:100%">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M7 4l7 5-7 5V4z" fill="white"/></svg>
        ${n.activeSession?"Продовжити сесію →":"Почати навчання"}
      </button>
    </div>
  </div>`),q(document.getElementById("memory-status-text"),s.statusText),er(document.getElementById("home-lists-nav")),q(document.getElementById("today-list-title"),i),sr(document.getElementById("vocab-preview-root")),u("m-flash",()=>l("showSessionSettings","flashcards")),u("m-learn",()=>l("showSessionSettings","learn")),u("m-match",()=>l("showSessionSettings","match")),u("m-test",()=>l("showSessionSettings","test")),u("m-mistakes",()=>l("showMistakesHub")),u("m-favorites",()=>l("showSessionSettings","learn","favorites")),u("btn-guided-learning",()=>n.activeSession?Ne():l("startGuidedLearning")),u("btn-guided-learning-mobile",()=>n.activeSession?Ne():l("startGuidedLearning")),u("add-list-btn",()=>l("showListsManagement")),u("irregular-verbs-btn",()=>l("showIrregularVerbs")),u("lists-btn",()=>l("showListsManagement")),u("manage-list-btn",()=>l("showManageVocabulary")),u("empty-list-add-btn",()=>l("showManageVocabulary")),u("vocab-open-all-btn",()=>l("showManageVocabulary")),u("resume-btn",Ne),u("resume-cancel-btn",()=>{we()&&se(),A(),me()}),u("reset-btn",M),document.querySelectorAll("[data-list-id]").forEach(o=>{o.addEventListener("click",()=>nr(o.dataset.listId))}),document.querySelectorAll("[data-fav-id]").forEach(o=>{o.addEventListener("click",()=>{Xe(Number(o.dataset.favId)),me()})})}function Hn(e){let t=0;const s=new Date(Ke());for(;;){const r=s.getFullYear(),i=String(s.getMonth()+1).padStart(2,"0"),a=String(s.getDate()).padStart(2,"0"),o=`${r}-${i}-${a}`;if(!Object.keys(e[o]||{}).length)break;t++,s.setDate(s.getDate()-1)}return t}function Jn(e){return e===1?"день":e>=2&&e<=4?"дні":"днів"}function Yn(e,t,s){const i=new Date().toLocaleDateString("uk-UA",{day:"numeric",month:"long"}),a=n.activeSession?`<div class="today-resume">
        <div class="today-resume-meta">
          <div class="today-resume-label">Незавершена сесія</div>
          <div class="today-resume-title">${Qn(n.activeSession)}</div>
          <div class="today-resume-sub">${Un(n.activeSession)}</div>
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
        ${s===0?'<div class="hint-text">Повторень<br>не заплановано</div>':""}
      </div>`;return`<div class="today-block">
    <div class="today-top">
      <div class="today-title" id="today-list-title"></div>
      <div class="today-date">Сьогодні, ${i}</div>
    </div>
    <div class="today-stats">
      <div class="today-stat">
        <div class="today-stat-value accent">${s}</div>
        <div class="today-stat-label">На повторення</div>
      </div>
      <div class="today-stat">
        <div class="today-stat-value">${t.memoryPercent}%</div>
        <div class="today-stat-label">Памʼять</div>
      </div>
      <div class="today-stat">
        <div class="today-stat-value">${n.items.length}</div>
        <div class="today-stat-label">Слів</div>
      </div>
    </div>
    ${a}
  </div>`}function Xn(e,t){return`<div class="modes-section">
    <div class="modes-header">
      <span class="modes-title">Інші режими</span>
    </div>
    <div class="modes-grid">
      <button class="mode-card primary-mode" id="m-learn">
        <div class="mode-icon">${Be.learn}</div>
        <div class="mode-name">Навчання</div>
        <div class="mode-desc">Введи відповідь</div>
        <div class="mode-tag">Рекомендовано</div>
      </button>
      <button class="mode-card primary-mode" id="m-flash">
        <div class="mode-icon">${Be.flashcards}</div>
        <div class="mode-name">Картки</div>
        <div class="mode-desc">Перегортання</div>
      </button>
      <button class="mode-card" id="m-match">
        <div class="mode-icon">${Be.match}</div>
        <div class="mode-name">Пари</div>
        <div class="mode-desc">Зʼєднай картки</div>
      </button>
      <button class="mode-card" id="m-test">
        <div class="mode-icon">${Be.test}</div>
        <div class="mode-name">Тест</div>
        <div class="mode-desc">Вибір варіанту</div>
      </button>
    </div>
    ${e?`<div style="height:12px"></div>
    <button class="btn btn-outline btn-block" id="m-mistakes">Повторити ${e} слів з помилками</button>`:""}
    ${t?`<div style="height:8px"></div>
    <button class="btn btn-outline btn-block" id="m-favorites">Вчити ${t} обраних слів</button>`:""}
  </div>`}function Kn(){const e=n.items.length;return`<div class="vocab-section">
    <div class="vocab-header">
      <span class="vocab-title">Словник</span>
      <div class="vocab-actions">
        <button class="link-btn" id="lists-btn">Списки</button>
        <button class="link-btn" id="manage-list-btn">Відкрити всі →</button>
      </div>
    </div>
    <div class="vocab-preview" id="vocab-preview-root"></div>
    ${e>5?`<div class="vocab-cta">
      Показано 5 з ${e} слів · <button id="vocab-open-all-btn">Переглянути всі</button>
    </div>`:""}
  </div>`}function Zn(e){const t=c("button",{className:`list-item${e.id===n.currentListId?" active":""}`,attrs:{"data-list-id":e.id}});return t.append(c("span",{className:"list-item-name",text:e.name}),c("span",{className:"list-item-count",text:(n.wordsByList[e.id]||[]).length})),t}function er(e){if(!e)return;const t=document.getElementById("add-list-btn");S(e,...(n.lists||[]).map(s=>Zn(s)),t)}function tr(e){const t=c("div",{className:"vocab-word"}),s=c("div",{className:"word-pair"});return s.append(c("span",{className:"word-en",text:e.en}),c("div",{className:"word-sep"}),c("span",{className:"word-ua",text:e.ua})),t.append(s,c("div",{className:`word-status${n.mistakes[e.id]?" weak":""}`})),t}function sr(e){e&&S(e,...n.items.slice(0,5).map(t=>tr(t)))}function nr(e){!e||e===n.currentListId||!qt(e)||(we()&&se(),A(),$(),me())}function rr(){return`<div class="today-block">
    <div class="today-top">
      <div class="today-title">Список порожній</div>
    </div>
    <div class="mastery-subtitle">Додайте перші слова, щоб почати навчання.</div>
    <div style="height:16px"></div>
    <button class="btn btn-primary btn-block" id="empty-list-add-btn">Додати слова</button>
  </div>`}let w={creating:!1,createError:"",renamingId:null,renameError:"",confirmDeleteId:null};function ir(e){return(n.wordsByList[e]||[]).length?jt(e)?Ze(e)>=100?"Повторити слова":"Продовжити навчання":"Почати навчання":"Додати слова"}function ar(e){return(n.wordsByList[e]||[]).length?jt(e)?Ze(e)>=100?"review":"continue":"start":"add"}function or(){return w.creating?`<div class="list-create-form">
    <input
      type="text"
      class="list-name-field${w.createError?" has-error":""}"
      id="new-list-input"
      placeholder="Назва нового списку..."
      autofocus
    >
    <div class="list-field-error" id="new-list-error"${w.createError?"":" hidden"}></div>
    <div class="list-create-btns">
      <button class="btn btn-primary" id="save-new-list-btn">Створити</button>
      <button class="btn btn-ghost" id="cancel-create-btn">Скасувати</button>
    </div>
  </div>`:""}function R(){B(`${N()}${ie({pageClass:"lists-manage-page",title:"Списки",subtitle:`${n.lists.length} ${ur(n.lists.length)}`,backButton:H(),content:`
        <div class="sec">
          <div class="sec-head">
            <div class="sec-label">Управління списками</div>
            ${w.creating?"":'<button class="btn btn-outline" id="create-list-btn">Створити список</button>'}
          </div>
          ${or()}
          <div class="list-manage-wrap" id="list-manage-wrap"></div>
        </div>
      `})}`);const e=document.getElementById("new-list-error");e&&w.createError&&(e.hidden=!1,q(e,w.createError)),dr(document.getElementById("list-manage-wrap")),cr()}function Y(e,t,s){return c("button",{className:e,text:s,attrs:t})}function lr(e){const t=n.wordsByList[e.id]||[],s=Ze(e.id),r=e.id===n.currentListId,i=w.renamingId===e.id,a=w.confirmDeleteId===e.id,o=c("div",{className:`list-manage-row${r?" active":""}`});if(i){const m=c("div",{className:"list-rename-form"}),g=c("input",{id:`rename-input-${e.id}`,className:`list-name-field${w.renameError?" has-error":""}`,attrs:{type:"text",autofocus:"autofocus"}});g.value=e.name,m.append(g),w.renameError&&m.append(c("div",{className:"list-field-error",text:w.renameError}));const v=c("div",{className:"list-create-btns"});return v.append(Y("btn btn-primary",{"data-save-rename":e.id},"Зберегти"),Y("btn btn-ghost",{id:"cancel-rename-btn"},"Скасувати")),m.append(v),o.append(m),o}const d=c("div",{className:"list-manage-head"});if(d.append(c("div",{className:"list-manage-name",text:e.name})),r&&d.append(c("span",{className:"list-badge",text:"Активний"})),o.append(d,c("div",{className:"list-manage-meta",text:`${t.length} слів • ${s}%`})),a){const m=c("div",{className:"list-delete-confirm"});return m.append(c("span",{className:"list-delete-question",text:`Видалити список «${e.name}»?`}),Y("btn btn-sm btn-err",{"data-confirm-delete":e.id},"Так, видалити"),Y("btn btn-ghost btn-sm",{id:"cancel-delete-btn"},"Скасувати")),o.append(m),o}const f=c("div",{className:"list-manage-actions"});return f.append(Y("mini-btn",{"data-list-open":e.id},ir(e.id)),Y("mini-btn",{"data-list-select":e.id},"Зробити активним"),Y("mini-btn",{"data-list-rename":e.id},"Редагувати"),Y("mini-btn danger",{"data-list-delete":e.id},"Видалити")),o.append(f),o}function dr(e){e&&S(e,...(n.lists||[]).map(t=>lr(t)))}function cr(){u("tb-back",()=>{w=oe(),l("showList")}),u("reset-btn",M),u("create-list-btn",()=>{w.creating=!0,w.createError="",R(),document.getElementById("new-list-input")?.focus()}),u("save-new-list-btn",()=>{const t=document.getElementById("new-list-input"),s=t?t.value.trim():"";try{Js(s),w=oe(),R()}catch(r){w.createError=r.message,R()}}),u("cancel-create-btn",()=>{w.creating=!1,w.createError="",R()}),document.getElementById("new-list-input")?.addEventListener("keydown",t=>{t.key==="Enter"&&document.getElementById("save-new-list-btn")?.click(),t.key==="Escape"&&document.getElementById("cancel-create-btn")?.click()}),document.querySelectorAll("[data-list-open]").forEach(t=>{t.addEventListener("click",()=>mr(t.dataset.listOpen))}),document.querySelectorAll("[data-list-select]").forEach(t=>{t.addEventListener("click",()=>{as(t.dataset.listSelect)&&(w=oe(),R())})}),document.querySelectorAll("[data-list-rename]").forEach(t=>{t.addEventListener("click",()=>{w.renamingId=t.dataset.listRename,w.renameError="",R(),document.getElementById(`rename-input-${w.renamingId}`)?.focus(),document.getElementById(`rename-input-${w.renamingId}`)?.select()})}),document.querySelectorAll("[data-save-rename]").forEach(t=>{t.addEventListener("click",()=>{const s=t.dataset.saveRename,r=document.getElementById(`rename-input-${s}`),i=r?r.value.trim():"";try{Ys(s,i),w=oe(),R()}catch(a){w.renameError=a.message,R()}})}),u("cancel-rename-btn",()=>{w.renamingId=null,w.renameError="",R()}),(n.lists||[]).map(t=>t.id).forEach(t=>{document.getElementById(`rename-input-${t}`)?.addEventListener("keydown",s=>{s.key==="Enter"&&[...document.querySelectorAll("[data-save-rename]")].find(i=>i.dataset.saveRename===t)?.click(),s.key==="Escape"&&document.getElementById("cancel-rename-btn")?.click()})}),document.querySelectorAll("[data-list-delete]").forEach(t=>{t.addEventListener("click",()=>{w.confirmDeleteId=t.dataset.listDelete,R()})}),document.querySelectorAll("[data-confirm-delete]").forEach(t=>{t.addEventListener("click",()=>{Xs(t.dataset.confirmDelete),w=oe(),R()})}),u("cancel-delete-btn",()=>{w.confirmDeleteId=null,R()})}function oe(){return{creating:!1,createError:"",renamingId:null,renameError:"",confirmDeleteId:null}}function ur(e){return e===1?"список":e>=2&&e<=4?"списки":"списків"}function as(e){return qt(e)?(se(),A(),$(),!0):!1}function mr(e){if(!as(e))return;const s=ar(e);if(s==="add"){l("showManageVocabulary");return}if(s==="review"){st("flashcards");return}l("startGuidedLearning")}function fr(){Je(),w=oe(),R()}function Q(e=null,t=ee(),s=!1,r="",i=null){const a=e?n.items.find(g=>g.id===e):null,o=e&&!t.en&&!t.ua?{en:a.en,ua:a.ua}:t,d=n.items.length;B(`${N()}${ie({pageClass:"vocab-page",title:"Словник",subtitle:s?"Ручне створення":`${d} ${vr(d)}`,backButton:H(),content:`<div class="vocab-layout">

      <aside class="vocab-form-pane">
        <div class="sec-label">${e?"Редагувати пару":"Додати пару"}</div>
        <label class="custom-field">
          <span>English</span>
          <input id="pair-en" class="text-in" type="text" autocomplete="off" spellcheck="false" placeholder="hello">
        </label>
        <label class="custom-field">
          <span>Ukrainian</span>
          <input id="pair-ua" class="text-in" type="text" autocomplete="off" spellcheck="false" placeholder="привіт">
        </label>
        <div class="err-msg" id="vocab-error"${r?' style="display:block"':""}></div>
        <div id="merge-box-root"></div>
        <div class="editor-actions">
          <button class="btn btn-primary btn-block" id="save-pair-btn">${e?"Зберегти зміни":"Додати пару"}</button>
          ${e?'<button class="btn btn-outline btn-block" id="cancel-edit-btn">Скасувати</button>':""}
        </div>
      </aside>

      <main class="vocab-list-pane">
        <div class="vocab-list-header">
          <div class="vocab-list-header-top">
            <div class="sec-label" style="margin-bottom:0">Список пар (${d})</div>
            ${!s&&d?'<button class="btn-ghost" id="done-manage-btn">Готово</button>':""}
          </div>
          ${d?'<input type="text" id="vocab-search" class="vocab-search" placeholder="🔍 Пошук слів..." autocomplete="off">':""}
        </div>
        <div class="word-list" id="vocab-word-list"></div>
        ${s?`<button class="btn btn-outline btn-block" id="finish-manual-btn" ${d?"":"disabled"}>Перейти до режимів</button>`:""}
      </main>

        </div>`})}`),document.getElementById("pair-en").value=o.en||"",document.getElementById("pair-ua").value=o.ua||"";const f=document.getElementById("vocab-error");f&&r&&q(f,r),gr(document.getElementById("merge-box-root"),i),hr(document.getElementById("vocab-word-list"),e),u("tb-back",s?()=>l("showImport"):()=>l("showList")),u("reset-btn",M),u("done-manage-btn",()=>l("showList")),u("cancel-edit-btn",()=>Q(null,ee(),s)),u("finish-manual-btn",()=>l("showList")),u("save-pair-btn",()=>pr(e,s)),u("merge-existing-btn",()=>{fn(i.item.id,e,o),Q(null,ee(),s)}),u("keep-separate-btn",()=>{Qt(e,o),Q(null,ee(),s)});const m=document.getElementById("vocab-search");m&&m.addEventListener("input",g=>{const v=g.target.value.toLowerCase().trim();document.querySelectorAll(".manage-row").forEach(b=>{const h=!v||(b.dataset.search||"").includes(v);b.style.display=h?"":"none"})}),["pair-en","pair-ua"].forEach(g=>{const v=document.getElementById(g);v&&v.addEventListener("keydown",b=>{b.key==="Enter"&&(b.preventDefault(),document.getElementById("save-pair-btn")?.click())})}),yr(s)}function vr(e){return e===1?"пара":e>=2&&e<=4?"пари":"пар"}function gr(e,t){if(!e)return;if(!t){S(e);return}const s=c("div",{className:"ui-card merge-box"});s.append(c("div",{className:"report-title",text:"Схожа пара вже існує"}),c("div",{className:"report-reasons",text:t.reason}),c("div",{className:"merge-pair",text:`${t.item.en} → ${t.item.ua}`}));const r=c("div",{className:"editor-actions"});r.append(c("button",{id:"merge-existing-btn",className:"btn btn-outline btn-block",text:"Оновити існуючу"}),c("button",{id:"keep-separate-btn",className:"btn btn-primary btn-block",text:"Додати окремо"})),s.append(r),S(e,s)}function br(e,t){const s=c("div",{className:`manage-row${t===e.id?" editing":""}`});s.dataset.search=`${e.en} ${e.ua}`.toLowerCase();const r=c("div",{className:"manage-pair"});r.append(c("span",{className:"wen",text:e.en}),c("span",{className:"wsep",text:"→"}),c("span",{className:"wua",text:e.ua}));const i=c("div",{className:"manage-actions"});return i.append(c("button",{className:"mini-btn",text:"Редагувати",attrs:{"data-edit-id":e.id}}),c("button",{className:"mini-btn danger",text:"Видалити",attrs:{"data-delete-id":e.id}})),s.append(r,i),s}function hr(e,t){if(e){if(!n.items.length){S(e,c("div",{className:"empty-list-copy",text:"Поки що немає жодної пари. Додайте першу зліва."}));return}S(e,...n.items.map(s=>br(s,t)))}}function pr(e,t){const s={en:document.getElementById("pair-en").value,ua:document.getElementById("pair-ua").value},r=mn(e,s);try{if(r.type==="duplicate")throw new Error("Така пара вже є у словнику.");if(r.type==="overlap"){Q(e,s,t,"",r);return}Qt(e,s),Q(null,ee(),t)}catch(i){Q(e,s,t,i.message)}}function yr(e){document.querySelectorAll("[data-edit-id]").forEach(t=>{t.addEventListener("click",()=>{const s=n.items.find(r=>r.id===Number(t.dataset.editId));Q(s.id,{en:s.en,ua:s.ua},e)})}),document.querySelectorAll("[data-delete-id]").forEach(t=>{t.addEventListener("click",()=>{vn(Number(t.dataset.deleteId)),Q(null,ee(),e)})})}function ge(e,t="all",s=!1){K(),s||(n.settings=te());const r=Dt(t);if(!r.length){l("showList");return}const i=r.length;n.settings=Ye(n.settings,i);const a=Math.max(1,Math.ceil(i/4)),o=Math.max(1,Math.ceil(i/2)),d=[{value:a,label:`25% (${a})`},{value:o,label:`Середнє (${o})`},{value:"all",label:`Усі (${i})`}].filter((b,h,p)=>p.findIndex(I=>I.value===b.value)===h),f=d.some(b=>b.value===n.settings.count)?n.settings.count:"all",m=Math.min(i,Math.max(1,Number(n.settings.countCustom)||1)),g=Math.max(30,Number(n.settings.timerCustom)||30),v={flashcards:"Картки",learn:"Навчання",match:"Пари",test:"Тест",mistakes:"Повтор помилок","guided-learning":"Покрокове навчання"}[e];B(`${N()}${Mn({title:v,subtitle:"Налаштування сесії",content:`<div class="settings-layout">

        <div class="settings-section settings-col">
          <div class="settings-col-title">Кількість слів</div>
          <div class="settings-block">
            <div class="settings-subtitle">Швидкий старт</div>
            <div class="settings-grid" id="count-preset-grid"></div>
            <div class="settings-subtitle">Свій варіант</div>
            <div id="count-custom-root"></div>
          </div>
        </div>

        <div class="settings-section settings-col">
          <div class="settings-col-title">Таймер</div>
          <div class="settings-block">
            <div class="settings-subtitle">Готові варіанти</div>
            <div class="settings-grid" id="timer-preset-grid"></div>
            <div class="settings-subtitle">Свій варіант</div>
            <div id="timer-custom-root"></div>
          </div>
        </div>

      </div>`,footer:`<div class="settings-note">Є готові пресети для швидкого старту і окремий шлях для точного ручного налаштування. Таймер завершує сесію автоматично.</div>
      <div class="settings-cta">
        <div id="ss-error" class="err-msg" style="display:none;margin-bottom:10px"></div>
        <button class="btn btn-primary btn-block" id="ss-start">${We(n.settings)}</button>
      </div>`})}`),u("tb-back",()=>l("showList")),u("reset-btn",M),u("ss-start",()=>wr(e,t,i)),q(document.querySelector(".settings-panel-title"),v),kr(document.getElementById("count-preset-grid"),d,f),Sr(document.getElementById("timer-preset-grid")),Ir(document.getElementById("count-custom-root"),i,m),$r(document.getElementById("timer-custom-root"),g),Lr(e,t),xr(i)}function We(){return"Почати"}function wr(e,t,s){const r=document.getElementById("ss-error"),i={...n.settings,countCustom:document.getElementById("count-custom-input")?.value??n.settings.countCustom},{settings:a,error:o}=_s(i,s);if(n.settings=a,o){r.textContent=o,r.style.display="block";return}r.style.display="none",st(e,t)}function Lr(e,t){u("count-custom-toggle",()=>{n.settings.countMode="custom",ge(e,t,!0)}),u("timer-custom-toggle",()=>{n.settings.timerMode="custom",ge(e,t,!0)}),document.querySelectorAll("[data-count]").forEach(s=>{s.addEventListener("click",()=>{n.settings.countMode="preset",n.settings.count=s.dataset.count==="all"?"all":Number(s.dataset.count),ge(e,t,!0)})}),document.querySelectorAll("[data-timer]").forEach(s=>{s.addEventListener("click",()=>{n.settings.timerMode="preset",n.settings.timer=Number(s.dataset.timer),ge(e,t,!0)})})}function kr(e,t,s){e&&S(e,...t.map(r=>c("button",{className:`btn-select setting-btn${n.settings.countMode==="preset"&&s===r.value?" active":""}`,text:r.label,attrs:{"data-count":r.value,type:"button"}})))}function Sr(e){if(!e)return;S(e,...[{value:0,label:"Без таймера"},{value:30,label:"30 сек"},{value:60,label:"1 хв"},{value:180,label:"3 хв"}].map(s=>c("button",{className:`btn-select setting-btn${n.settings.timerMode==="preset"&&n.settings.timer===s.value?" active":""}`,text:s.label,attrs:{"data-timer":s.value,type:"button"}})))}function Ir(e,t,s){if(!e)return;if(n.settings.countMode!=="custom"){S(e,c("button",{id:"count-custom-toggle",className:"btn-select setting-wide",text:"Точна кількість слів",attrs:{type:"button"}}));return}const r=c("input",{id:"count-custom-input",className:"custom-input",attrs:{type:"number",min:1,max:t,inputmode:"numeric"}});r.value=String(s),S(e,c("label",{className:"custom-field custom-field-inline"})),e.firstChild.append(c("span",{text:"Слів у сесію"}),os("count",[c("button",{className:"stepper-btn",text:"−",attrs:{type:"button","data-step-target":"count","data-step-dir":-1}}),r,c("button",{className:"stepper-btn",text:"+",attrs:{type:"button","data-step-target":"count","data-step-dir":1}})]),c("small",{text:`Доступно до ${t} слів.`}))}function $r(e,t){if(!e)return;if(n.settings.timerMode!=="custom"){S(e,c("button",{id:"timer-custom-toggle",className:"btn-select setting-wide",text:"Свій час",attrs:{type:"button"}}));return}const s=c("div",{id:"timer-custom-display",className:"custom-display",attrs:{"aria-live":"polite"}});q(s,rs(t)),S(e,c("label",{className:"custom-field custom-field-inline"})),e.firstChild.append(c("span",{text:"Тривалість сесії"}),os("timer",[c("button",{className:"stepper-btn",text:"−",attrs:{type:"button","data-step-target":"timer","data-step-dir":-1}}),s,c("button",{className:"stepper-btn",text:"+",attrs:{type:"button","data-step-target":"timer","data-step-dir":1}})]),c("small",{text:"Від 30 сек до 120 хв, крок 15 сек."}))}function os(e,t){const s=c("div",{className:"stepper"});return s.dataset.stepperTarget=e,s.append(...t),s}function xr(e,t,s,r,i,a){document.querySelectorAll("[data-step-target]").forEach(o=>{o.addEventListener("click",()=>{const d=o.dataset.stepTarget,f=Number(o.dataset.stepDir);if(d==="count"){const m=document.getElementById("count-custom-input"),g=Number(m.value)||1,v=Math.min(e,Math.max(1,g+f));m.value=v,n.settings.countCustom=v;const b=document.getElementById("ss-start");b&&(b.textContent=We(n.settings))}if(d==="timer"){const m=document.getElementById("timer-custom-display"),g=Number(n.settings.timerCustom)||30,v=Math.min(7200,Math.max(30,g+f*15));n.settings.timerCustom=v,m&&(m.textContent=rs(v));const b=document.getElementById("ss-start");b&&(b.textContent=We(n.settings))}})})}function Er(e){const t=c("div",{className:"r-word-row"});return t.append(c("span",{className:"r-word-en",text:e?.en||""}),c("span",{className:"r-word-sep",text:"—"}),c("span",{className:"r-word-ua",text:e?.ua||""})),t}function be(e,t,s=""){if(e){if(!Array.isArray(t)||!t.length){if(!s){S(e);return}S(e,c("div",{className:"fc-empty",text:s}));return}S(e,...t.map(r=>Er(r)))}}function Br(e,t,s,r,i){if(we()&&n.guidedSession.phase==="input"){Le({...n.guidedSession,phase:"test",currentIndex:0,resumeState:null}),l("launchGuidedPhase");return}A();const a=n.items.filter(m=>[...new Set(r)].includes(m.id)),o=n.items.filter(m=>!r.includes(m.id)),d=t+s,f=d?Math.round(t/d*100):0;B(`${N()}${ke({layoutClass:"result-session-layout loop-result-layout",title:`${e} завершено`,subtitle:`${t}/${d}`,content:`<div class="result-session-body">
        <div class="result-session-hero">
          <div class="result-session-kicker">Підсумок сесії</div>
          <div class="result-session-title">${a.length?"Є помилки для повторення":"Сесію закрито"}</div>
          <div class="result-session-sub">${t} правильних • ${s} помилок</div>
          <div class="result-session-score"><span>${f}%</span><small>точність</small></div>
        </div>

        <div class="result-session-side">
          <div class="result-stats result-session-stats">
            <div class="result-stat">
              <div class="result-stat-value ok">${t}</div>
              <div class="result-stat-label">Правильно</div>
            </div>
            <div class="result-stat">
              <div class="result-stat-value err">${s}</div>
              <div class="result-stat-label">Помилки</div>
            </div>
            <div class="result-stat">
              <div class="result-stat-value">${d}</div>
              <div class="result-stat-label">Всього</div>
            </div>
          </div>
          <div class="result-session-note ${a.length?"needs-review":"is-complete"}">
            ${a.length?`Повтори ${a.length} ${a.length===1?"слово":"слів"}, щоб закрити помилки.`:"Помилок немає. Можна перейти на головну або повторити сесію."}
          </div>
        </div>
      </div>

      ${a.length?`<div class="result-detail-sections">
            <div class="result-words-section">
              <div class="result-words-title ok">Правильно (${t})</div>
              <div id="loop-correct-items"></div>
            </div>
            <div class="result-words-section">
              <div class="result-words-title err">Помилки (${a.length})</div>
              <div id="loop-wrong-items"></div>
            </div>
          </div>`:""}

      <div class="result-actions result-session-actions">
        <button class="btn btn-primary" id="loop-retry-btn">Повторити</button>
        <button class="btn btn-outline" id="loop-home-btn">На головну</button>
      </div>
    `})}`),u("tb-back",()=>l("showList")),u("reset-btn",M),be(document.getElementById("loop-correct-items"),o.slice(0,10)),be(document.getElementById("loop-wrong-items"),a),u("loop-retry-btn",i),u("loop-home-btn",()=>l("showList"))}function ls(e,t,s){const{confidentItems:r,recoveredItems:i,unresolvedItems:a}=_t(e,t,s),o=r.length+i.length;B(`${N()}${ke({layoutClass:"result-session-layout flashcards-result-layout",title:"Результат карток",subtitle:`${o} закрито • ${a.length} слабких`,content:`<div class="result-detail-sections fc-breakdown">
        <div class="result-words-section">
          <div class="result-words-title ok">Знав відразу (${r.length})</div>
          <div id="flashcards-confident-items"></div>
        </div>
        <div class="result-words-section">
          <div class="result-words-title accent">Закрив після повтору (${i.length})</div>
          <div id="flashcards-recovered-items"></div>
        </div>
        <div class="result-words-section">
          <div class="result-words-title err">Ще не знаю (${a.length})</div>
          <div id="flashcards-unresolved-items"></div>
        </div>
      </div>

      <div class="result-actions result-session-actions">
        ${r.length||i.length?'<button class="btn btn-outline" id="known-test-btn">Тест закритих</button>':""}
        ${a.length?'<button class="btn btn-primary" id="unknown-learn-btn">Вчити слабкі</button>':""}
        <button class="btn btn-outline" id="flash-detail-home-btn">На головну</button>
      </div>
    `})}`),u("tb-back",()=>l("showList")),u("reset-btn",M),be(document.getElementById("flashcards-confident-items"),r,"У цій сесії не було слів, які ви закрили з першої спроби."),be(document.getElementById("flashcards-recovered-items"),i,"Поки що немає слів у цій групі."),be(document.getElementById("flashcards-unresolved-items"),a,"Всі слабкі слова були закриті!"),u("known-test-btn",()=>l("showTest",[...r,...i],"custom")),u("unknown-learn-btn",()=>l("showLearn",a,"custom")),u("flash-detail-home-btn",()=>l("showList"))}function Nr(e,t,s,r){if(we()&&n.guidedSession.phase==="recall"){const g=new Set(r||[]),v=e.filter(b=>g.has(b.id));Le({...n.guidedSession,items:v.length?v:e,phase:"input",currentIndex:0,wrongQueue:[],resumeState:null}),l("launchGuidedPhase");return}A();const{confidentItems:i,recoveredItems:a,weakItems:o}=_t(e,s,r),d=i.length+a.length,f=e.length?Math.round(d/e.length*100):0,m=o.length>0;B(`${N()}${ke({layoutClass:"flashcards-summary-layout",headClass:"settings-panel-head flashcards-summary-head",title:"Картки завершено",subtitle:`${d}/${e.length}`,content:`<div class="flashcards-summary-body">
        <div class="flashcards-summary-hero">
          <div class="flashcards-summary-kicker">Підсумок сесії</div>
          <div class="flashcards-summary-title">${m?"Є слова для повторення":"Сесію закрито"}</div>
          <div class="flashcards-summary-sub">${d} закрито • ${o.length} слабких</div>
          <div class="flashcards-summary-score">
            <span>${f}%</span>
            <small>закрито</small>
          </div>
        </div>

        <div class="flashcards-summary-side">
          <div class="result-stats flashcards-summary-stats">
            <div class="result-stat">
              <div class="result-stat-value ok">${d}</div>
              <div class="result-stat-label">Закрито</div>
            </div>
            <div class="result-stat">
              <div class="result-stat-value err">${o.length}</div>
              <div class="result-stat-label">Слабких</div>
            </div>
            <div class="result-stat">
              <div class="result-stat-value">${e.length}</div>
              <div class="result-stat-label">Всього</div>
            </div>
          </div>

          <div class="flashcards-summary-note ${m?"needs-review":"is-complete"}">
            ${m?`Повтори ${o.length} слабких ${o.length===1?"слово":"слів"}, щоб закрити прогалини.`:"Слабких слів немає. Можна перейти до деталей або повернутися на головну."}
          </div>
        </div>
      </div>

      <div class="result-actions flashcards-summary-actions">
        ${m?'<button class="btn btn-primary" id="flash-shuffle-btn">Повторити слабкі</button>':'<button class="btn btn-primary" id="flash-result-btn">Детальний результат</button>'}
        ${m?'<button class="btn btn-outline" id="flash-result-btn">Детальний результат</button>':""}
        <button class="btn btn-outline" id="flash-rerun-btn">Перемішати</button>
        <button class="btn btn-outline" id="flash-home-btn">На головну</button>
      </div>
    `})}`),u("tb-back",()=>l("showList")),u("reset-btn",M),u("flash-result-btn",()=>ls(e,s,r)),u("flash-rerun-btn",()=>l("showFlashcards",F(e),t)),u("flash-shuffle-btn",()=>l("showFlashcards",o,t)),u("flash-home-btn",()=>l("showList"))}function Mr(e,t){if(we()&&n.guidedSession.phase==="test"){const i=[...new Set(n.guidedSession.wrongQueue||[])];if(i.length){const a=new Set(i);Le({...n.guidedSession,items:(n.guidedSession.items||[]).filter(o=>a.has(o.id)),phase:"input",currentIndex:0,wrongQueue:[],resumeState:null}),l("launchGuidedPhase");return}K(),se(),A(),l("showList");return}K(),A();const s=ys(n.progress),r=s>=80;B(`${N()}${ke({layoutClass:"result-session-layout complete-result-layout",title:`${e} завершено`,subtitle:`${s}%`,content:`<div class="result-session-body">
        <div class="result-session-hero">
          <div class="result-session-kicker">Підсумок режиму</div>
          <div class="result-session-title">${r?"Сильний результат":"Є що закріпити"}</div>
          <div class="result-session-sub">${n.progress.correct} правильних з ${n.progress.total}</div>
          <div class="result-session-score"><span>${s}%</span><small>памʼять</small></div>
        </div>

        <div class="result-session-side">
          <div class="result-stats result-session-stats">
            <div class="result-stat">
              <div class="result-stat-value ok">${n.progress.correct}</div>
              <div class="result-stat-label">Правильно</div>
            </div>
            <div class="result-stat">
              <div class="result-stat-value">${n.progress.total}</div>
              <div class="result-stat-label">Всього</div>
            </div>
          </div>
          <div class="result-session-note ${r?"is-complete":"needs-review"}">
            ${r?"Результат стабільний. Можна перейти до списку або повторити режим для закріплення.":"Повтори режим, щоб підняти відсоток і стабілізувати знання."}
          </div>
        </div>
      </div>

      <div class="result-actions result-session-actions">
        <button class="btn btn-primary" id="retry-btn">Повторити</button>
        <button class="btn btn-outline" id="list-btn">До списку</button>
      </div>
    `})}`),u("tb-back",()=>l("showList")),u("reset-btn",M),u("retry-btn",t),u("list-btn",()=>l("showList"))}function Te(e,t=!1){return t?`<button class="btn-ghost fav-inline-btn flashcard-fav${n.favorites[e]?" active":""}" data-inline-fav="${e}" data-inline-fav-compact="1" aria-label="Додати в обране">${n.favorites[e]?"★":"☆"}</button>`:`<button class="btn-ghost fav-inline-btn${n.favorites[e]?" active":""}" data-inline-fav="${e}">${n.favorites[e]?"★ В обраному":"☆ В обране"}</button>`}function Oe(){document.querySelectorAll("[data-inline-fav]").forEach(e=>{e.addEventListener("click",t=>{t.stopPropagation(),Xe(Number(e.dataset.inlineFav));const s=n.favorites[Number(e.dataset.inlineFav)];e.textContent=e.dataset.inlineFavCompact?s?"★":"☆":s?"★ В обраному":"☆ В обране",e.classList.toggle("active",!!s)})})}function ve({current:e=null,total:t=null,label:s="Прогрес",correct:r=null,wrong:i=null,correctLabel:a="✓ Вірно",wrongLabel:o="✕ Помилки"}={}){const d=Number.isFinite(e)&&Number.isFinite(t)&&t>0,f=d?Math.round(e/t*100):0;return`<aside class="session-sidebar">
    ${d?`<div>
      <div class="ssb-label">${s}</div>
      <div class="ssb-progress-text">${e}/${t}</div>
      <div class="ssb-progress-sub">${f}% виконано</div>
      <div class="ssb-bar-wrap"><div class="ssb-bar-fill" style="width:${f}%"></div></div>
    </div>`:""}
    ${r!==null||i!==null?`<div>
      <div class="ssb-label">Статистика</div>
      <div class="ssb-stats">
        ${r!==null?`<div class="ssb-stat ok"><span class="ssb-stat-label">${a}</span><span class="ssb-stat-value">${r}</span></div>`:""}
        ${i!==null?`<div class="ssb-stat err"><span class="ssb-stat-label">${o}</span><span class="ssb-stat-value">${i}</span></div>`:""}
      </div>
    </div>`:""}
  </aside>`}function Ar(e,t="all",s=null){const r=s?.baseItems||e;let i=s?.queue||s?.deckItems||ln(e),a=s?.missedIds||[],o=s?.sessionResults||Cr(s),d=s?.index||0,f=!!s?.shown,m=!1;Ie(()=>O(()=>P(()=>O(()=>P(()=>l("showList")),()=>l("showList"))),()=>l("showList")));function g(){const b=i[d],h=Object.values(o).filter(Boolean).length,p=Object.values(o).filter(I=>I===!1).length;ce({mode:"flashcards",source:t,items:e,baseItems:r,queue:i,missedIds:a,sessionResults:o,index:d,shown:f,deckItems:i}),B(`${N()}${fe({layoutClass:"session-layout flashcards-session-layout",headClass:"settings-panel-head flashcards-session-head",title:"Картки",subtitle:Se(Math.min(d+1,r.length),r.length),content:`<div class="flashcards-session-body">
          <div class="session-main">
            <div class="card-wrap flashcards-card-wrap"><div class="flashcard${f?" shown":""}" id="flashcard-main">
              ${Te(b.id,!0)}
              <div class="flashcard-inner">
                <div class="flashcard-face flashcard-front"><div class="card-lang">Англійська</div><div class="card-word" id="flashcard-front-word"></div><div class="flashcard-hint">Натисніть щоб перевернути</div></div>
                <div class="flashcard-face flashcard-back"><div class="card-lang">Українська</div><div class="card-word card-word-accent" id="flashcard-back-word"></div><div class="flashcard-hint">Натисніть щоб повернути</div></div>
              </div>
            </div>
          </div>
          </div>
          ${ve({current:Math.min(d+1,i.length),total:i.length,correct:h,wrong:p,label:"Картки"})}
        </div>`,actions:'<div class="card-actions flashcards-card-actions"><button class="btn btn-ok" id="fc-ok">✓ Знав</button><button class="btn btn-err" id="fc-no">✗ Не знав</button></div>'})}`),m||(window.scrollTo({top:0,left:0}),m=!0),u("tb-back",()=>l("showList")),u("reset-btn",M),q(document.getElementById("flashcard-front-word"),b.en),q(document.getElementById("flashcard-back-word"),b.ua),$e(()=>O(()=>P(()=>l("showList")),()=>l("showList"))),Oe(),u("fc-ok",()=>v(!0)),u("fc-no",()=>v(!1)),u("flashcard-main",()=>{f=!f,document.getElementById("flashcard-main")?.classList.toggle("shown",f),ce({mode:"flashcards",source:t,items:e,baseItems:r,queue:i,missedIds:a,sessionResults:o,index:d,shown:f,deckItems:i})})}function v(b){const h=i[d];ue(b,h.id,"flashcards"),an(h.id,b),o[h.id]=b,!b&&!a.includes(h.id)&&a.push(h.id),d+=1,f=!1,d>=i.length?l("showFlashcardsSummary",r,t,o,a):g()}g()}function Cr(e){if(!e)return{};const t={};return(e.knownIds||[]).forEach(s=>{t[s]=!0}),(e.unknownIds||[]).forEach(s=>{t[s]!==!0&&(t[s]=!1)}),t}function Vr({ok:e,prefix:t,emphasis:s=""}){const r=document.createElement("div");if(r.className=e?"fb-ok":"fb-bad",e)return r.textContent=t,r;if(r.append(document.createTextNode(t)),s){const i=document.createElement("strong");i.textContent=s,r.append(i)}return r}function Ve(e,t){e&&e.replaceChildren(Vr(t))}function Rr(e,t="all",s=null){let r=s?.index||0,i=s?.queue||[...e],a=s?.wrongQueue||[],o=s?.sessionCorrect||0,d=s?.sessionWrong||0,f=null;Ie(()=>O(()=>P(()=>l("showList")),()=>l("showList")));function m(){he(),f&&document.removeEventListener("keydown",f),f=null;const g=i[r],v=Math.random()>.5,b=v?g.en:g.ua,h=v?g.ua:g.en;let p=!1;ce({mode:"learn",source:t,items:e,queue:i,wrongQueue:a,sessionCorrect:o,sessionWrong:d,index:r}),B(`${N()}${fe({layoutClass:"session-layout learn-session-layout",headClass:"settings-panel-head learn-session-head",title:"Навчання",subtitle:Se(Math.min(r+1,i.length),i.length),content:`<div class="learn-session-body">
          <div class="session-main">
          <div class="learn-area">
            <div class="card-lang">${v?"Англійська":"Українська"}</div><div class="learn-word" id="learn-prompt-word"></div>${Te(g.id)}
            <div class="ans-label">Введіть ${v?"Українська":"Англійська"}</div>
            <input id="lrn-in" class="text-in" type="text" autocomplete="off" autocorrect="off" spellcheck="false" placeholder="Ваша відповідь..."/>
            <div id="lrn-fb"></div>
            ${a.length?`<div class="session-loop-note">На повтор у цій сесії: ${a.length}</div>`:""}
          </div>
          </div>
          ${ve({current:Math.min(r+1,i.length),total:i.length,correct:o,wrong:d,label:"Навчання"})}
        </div>`,actions:'<div class="card-actions learn-card-actions"><button class="btn btn-primary btn-block" id="lrn-btn">Перевірити</button></div>'})}`),u("tb-back",()=>l("showList")),u("reset-btn",M),q(document.getElementById("learn-prompt-word"),b),$e(()=>O(()=>P(()=>l("showList")),()=>l("showList"))),Oe();const I=document.getElementById("lrn-in"),C=document.getElementById("lrn-fb"),V=document.getElementById("lrn-btn");setTimeout(()=>I?.focus(),60);const z=()=>{if(p)return W();const J=I.value.toLowerCase().trim();if(!J)return;const xe=J===h;ue(xe,g.id,"learn"),xe?o+=1:(d+=1,i.push(g),a.push(g.id)),p=!0,I.disabled=!0,I.className=`text-in ${xe?"ok":"bad"}`,Ve(C,xe?{ok:!0,prefix:"✓ Правильно!"}:{ok:!1,prefix:"✗ Правильна відповідь: ",emphasis:h}),V.textContent="Далі →",ts(W,t==="guided-learning"?600:3500)},W=()=>{he(),f&&document.removeEventListener("keydown",f),f=null,r+=1,r>=i.length?l("showLoopResult","Навчання",o,d,a,()=>l("launchMode","learn",t)):m()};V.addEventListener("click",z),I.addEventListener("keydown",J=>{J.key==="Enter"&&z()}),f=J=>{J.key!=="Enter"||J.target?.id==="lrn-in"||(J.preventDefault(),z())},document.addEventListener("keydown",f)}m()}function Dr(e){return e==="build-row"?"Побудуй трійку":e==="restore-order"?"Віднови рядок":"Заповни пропуск"}function qr(e,t){return{mode:e,queue:t||[],index:0,correct:0,wrong:0,wrongQueue:[]}}function ds(e="fill-missing",t=null,s=null){const r=s||(t?qr(e,t):n.irregularVerbSession);let i=null;if(!r?.queue?.length){ze(),l("showIrregularVerbs");return}function a(){i&&document.removeEventListener("keydown",i),i=null;const m=r.queue[r.index],g=Jt(m?.verbId);if(!g){ze(),l("showIrregularVerbs");return}gt(r),B(`${N()}${fe({layoutClass:"session-layout irregular-session-layout",headClass:"settings-panel-head irregular-session-head",title:Dr(r.mode),subtitle:`${r.index+1}/${r.queue.length}`,content:`<div class="irregular-session-body">
          <div class="session-main"><div id="iv-task-root"></div></div>
          ${ve({correct:r.correct,wrong:r.wrong,correctLabel:"Вірно",wrongLabel:"Помилки"})}
        </div>`,actions:'<div class="card-actions irregular-card-actions"><button class="btn btn-primary btn-block" id="iv-check-btn">Перевірити</button></div>'})}`),Tr(document.getElementById("iv-task-root"),m,g),f(m,g)}function o(){if(r.index+=1,r.index>=r.queue.length){if(r.wrongQueue?.length){r.queue=[...r.wrongQueue],r.wrongQueue=[],r.index=0,a();return}ze(),l("showIrregularVerbs");return}a()}function d(m,g){const v=Object.values(m),b=v.length>0&&v.every(Boolean);return Object.entries(m).forEach(([h,p])=>{kn(g.verbId,h,p)}),b?r.correct+=1:(r.wrong+=1,r.wrongQueue.push(g)),gt(r),b}function f(m,g){let v=!1;u("tb-back",()=>l("showIrregularVerbs")),u("reset-btn",M);const b=()=>{if(v)return;let p;if(m.mode==="restore-order"){const C={};m.targets.forEach(V=>{const z=[...document.querySelectorAll("[data-iv-slot]")].find(W=>W.dataset.ivSlot===V);C[V]=z?.dataset.value||""}),p=ft(m.verbId,C)}else if(m.mode==="build-row"){const C={};m.targets.forEach(V=>{C[V]=document.getElementById(`iv-answer-${V}`)?.value||""}),p=ft(m.verbId,C)}else p={[m.target]:Yt(m.verbId,m.target,document.getElementById("iv-answer")?.value||"")};v=!0,document.getElementById("iv-check-btn").disabled=!0;const I=d(p,m);Or(I,m,g),setTimeout(o,I?700:1400)};u("iv-check-btn",b),document.querySelectorAll("[data-iv-option-index]").forEach(p=>{p.addEventListener("click",()=>{const I=[...document.querySelectorAll("[data-iv-slot]")].find(C=>!C.dataset.value);I&&(I.dataset.value=p.dataset.value,I.dataset.optionIndex=p.dataset.ivOptionIndex,I.textContent=p.dataset.value,p.disabled=!0)})}),document.querySelectorAll("[data-iv-slot]").forEach(p=>{p.addEventListener("click",()=>{if(!p.dataset.value)return;const C=[...document.querySelectorAll("[data-iv-option-index]")].find(V=>V.dataset.ivOptionIndex===p.dataset.optionIndex);C&&(C.disabled=!1),p.dataset.value="",p.dataset.optionIndex="",p.textContent=le(p.dataset.ivSlot)})});const h=m.mode==="build-row"?m.targets.map(p=>document.getElementById(`iv-answer-${p}`)).filter(Boolean):[document.getElementById("iv-answer")].filter(Boolean);h.forEach(p=>{p.addEventListener("keydown",I=>{I.key==="Enter"&&(I.preventDefault(),b())})}),setTimeout(()=>h[0]?.focus(),60),i=p=>{p.key==="Enter"&&(h.includes(p.target)||(p.preventDefault(),b()))},document.addEventListener("keydown",i)}a()}function Tr(e,t,s){if(!e)return;if(t.mode==="build-row"){const a=c("div",{className:"learn-area irregular-exercise"});a.append(c("div",{className:"card-lang",text:le(t.anchor)}),c("div",{className:"learn-word",text:s[t.anchor]})),t.targets.forEach(o=>{a.append(c("div",{className:"ans-label",text:le(o)}),c("input",{id:`iv-answer-${o}`,className:"text-in",attrs:{autocomplete:"off",autocorrect:"off",spellcheck:"false"}}))}),a.append(c("div",{id:"iv-feedback"})),S(e,a);return}if(t.mode==="restore-order"){const a=c("div",{className:"learn-area irregular-exercise"}),o=c("div",{className:"irregular-options"}),d=c("div",{className:"irregular-slots"});t.options.forEach((f,m)=>{o.append(c("button",{className:"test-opt",text:f.value,attrs:{"data-iv-option-index":m,"data-value":f.value}}))}),t.targets.forEach(f=>{d.append(c("button",{className:"test-opt irregular-slot",text:le(f),attrs:{"data-iv-slot":f}}))}),a.append(c("div",{className:"test-hint",text:"Розстав значення у правильні колонки"}),o,d,c("div",{id:"iv-feedback"})),S(e,a);return}const r=c("div",{className:"learn-area irregular-exercise"}),i=c("div",{className:"irregular-pattern"});["base","past","participle","ua"].forEach(a=>{i.append(c("span",{className:a===t.target?"missing":"",text:a===t.target?"___":s[a]}))}),r.append(c("div",{className:"test-hint",text:"Заповни пропущену форму"}),i,c("div",{className:"ans-label",text:le(t.target)}),c("input",{id:"iv-answer",className:"text-in",attrs:{autocomplete:"off",autocorrect:"off",spellcheck:"false"}}),c("div",{id:"iv-feedback"})),S(e,r)}function Or(e,t,s){const r=document.getElementById("iv-feedback");if(!r)return;if(e){Ve(r,{ok:!0,prefix:"Правильно!"});return}const i=t.target?s[t.target]:(t.targets||[]).map(a=>`${le(a)}: ${s[a]}`).join(" · ");Ve(r,{ok:!1,prefix:"Правильно: ",emphasis:i})}function Pr(e,t="all",s=null){const r=s?.pairs||Math.min(8,e.length);let i=s?.cards||_r(wt(e,r),r),a=typeof s?.firstUid=="number"&&i.find(v=>v.uid===s.firstUid)||null,o=s?.matchedCount||0,d=!1,f=!1;Ie(()=>O(()=>P(()=>l("showList")),()=>l("showList")));function m(){ce({mode:"match",source:t,items:e,cards:i,pairs:r,matchedCount:o,firstUid:a?a.uid:null}),B(`${N()}${fe({layoutClass:"session-layout match-session-layout",headClass:"settings-panel-head match-session-head",title:"Пари",subtitle:Se(o,r),content:`<div class="match-session-body">
          <div class="session-main">
            <div class="match-grid" id="match-grid"></div>
          </div>
          ${ve({current:o,total:r,label:"Пари"})}
        </div>`})}`),f||(window.scrollTo({top:0,left:0}),f=!0),u("tb-back",()=>l("showList")),u("reset-btn",M),$e(()=>O(()=>P(()=>l("showList")),()=>l("showList"))),Fr(document.getElementById("match-grid"),i),a&&Fe(a.uid)?.classList.add("sel"),document.querySelectorAll(".mc:not([disabled])").forEach(v=>{v.addEventListener("click",()=>{if(d)return;const b=Number(v.dataset.uid),h=i.find(p=>p.uid===b);if(!(!h||h.matched)){if(a&&a.uid===b){a=null,m();return}if(!a){a=h,v.classList.add("sel");return}g(h,b)}})})}function g(v,b){if(a.pairId===v.pairId&&a.lang!==v.lang){a.matched=!0,v.matched=!0,o+=1,ue(!0,a.pairId,"match"),a=null,m(),o===r&&setTimeout(()=>l("showComplete","Пари",()=>l("launchMode","match",t)),400);return}d=!0,ue(!1,null,"match");const h=a;a=null,m(),setTimeout(()=>{Fe(h.uid)?.classList.add("flash"),Fe(b)?.classList.add("flash"),setTimeout(()=>{d=!1,m()},650)},10)}m()}function zr(e){const t=c("button",{className:`mc${e.matched?" matched":""}`,attrs:{"data-uid":e.uid}});return e.matched&&(t.disabled=!0),t.append(c("span",{className:"mc-lang",text:e.lang}),c("span",{className:"mc-text",text:e.text})),t}function Fr(e,t){e&&S(e,...(t||[]).map(s=>zr(s)))}function Fe(e){return[...document.querySelectorAll(".mc")].find(t=>Number(t.dataset.uid)===Number(e))||null}function _r(e,t){const s=[];return e.forEach((r,i)=>{s.push({uid:i,text:r.en,lang:"EN",pairId:r.id,matched:!1}),s.push({uid:i+t,text:r.ua,lang:"UA",pairId:r.id,matched:!1})}),F(s)}function jr(e){return c("button",{className:"test-opt",text:e,attrs:{"data-val":e}})}function Gr(e,t){if(!e)return;const s=Array.isArray(t)?t:[];S(e,...s.map(r=>jr(r)))}function Wr(e,t="all",s=null){let r=s?.index||0,i=0,a=0;Ie(()=>O(()=>P(()=>l("showList")),()=>l("showList")));function o(){const f=e[r],m=f.ua,g=F([m,...wt(e.filter(v=>v.id!==f.id).map(v=>v.ua),Math.min(3,e.length-1))]);ce({mode:"test",source:t,items:e,index:r}),B(`${N()}${fe({layoutClass:"session-layout test-session-layout",headClass:"settings-panel-head test-session-head",title:"Тест",subtitle:Se(r+1,e.length),content:`<div class="test-session-body">
          <div class="session-main">
          <div class="test-area">
            <div class="card-lang">Англійська</div><div class="test-word" id="test-prompt-word"></div>${Te(f.id)}
            <div class="test-hint">Оберіть переклад українською:</div>
            <div class="test-opts" id="test-options"></div>
          </div>
          </div>
          ${ve({current:r+1,total:e.length,correct:i,wrong:a,label:"Тест"})}
        </div>`})}`),u("tb-back",()=>l("showList")),u("reset-btn",M),q(document.getElementById("test-prompt-word"),f.en),$e(()=>O(()=>P(()=>l("showList")),()=>l("showList"))),Oe(),Gr(document.getElementById("test-options"),g),document.querySelectorAll(".test-opt").forEach(v=>{v.addEventListener("click",()=>{document.querySelectorAll(".test-opt").forEach(h=>{h.disabled=!0});const b=v.dataset.val===m;b?i+=1:a+=1,ue(b,f.id,"test"),document.querySelectorAll(".test-opt").forEach(h=>{h.dataset.val===m?h.classList.add("correct"):h===v&&!b&&h.classList.add("wrong")}),setTimeout(()=>d(),t==="guided-learning"?600:950)})})}function d(){r+=1,r>=e.length?t==="mistakes"?l("showMistakesFollowup",e):l("showComplete","Тест",()=>l("launchMode","test",t)):o()}o()}function cs(){const e=Vt();if(!e.length){l("showList");return}const t=e.length;B(`${N()}${ie({pageClass:"mistakes-page",title:"Повтор помилок",subtitle:`${t} ${Qe(t)}`,backButton:H(),content:`<div class="mistakes-layout">

      <div class="mistakes-words-pane">
        <div class="vocab-list-header">
          <div class="vocab-list-header-top">
            ${Nn("Слова на повтор")}
          </div>
        </div>
        <div class="word-list" id="mistakes-word-list"></div>
      </div>

      <aside class="mistakes-actions-pane">
        <div class="mistakes-summary-card">
          <div class="mistakes-count">${t}</div>
          <div class="mistakes-count-label">${Qe(t)} потребують повтору</div>
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

        </div>`})}`),u("tb-back",()=>l("showList")),u("reset-btn",M),u("mistakes-start-test-btn",()=>l("showSessionSettings","test","mistakes")),u("mistakes-start-learn-btn",()=>l("showSessionSettings","learn","mistakes")),u("mistakes-start-flash-btn",()=>l("showSessionSettings","flashcards","mistakes")),Qr(document.getElementById("mistakes-word-list"),e),document.querySelectorAll("[data-fav-id]").forEach(s=>{s.addEventListener("click",()=>{Xe(Number(s.dataset.favId)),cs()})})}function Qr(e,t){e&&S(e,...(t||[]).map(s=>{const r=c("div",{className:"word-row"});return r.append(c("button",{className:`fav-btn${n.favorites[s.id]?" active":""}`,text:n.favorites[s.id]?"★":"☆",attrs:{"data-fav-id":s.id}}),c("div",{className:"word-pair",text:`${s.en} — ${s.ua}`})),r}))}function Ur(e){B(`${N()}${ke({layoutClass:"result-session-layout mistakes-followup-layout",title:"Тест завершено",subtitle:"Повтор помилок",content:`<div class="result-session-body">
        <div class="result-session-hero">
          <div class="result-session-kicker">Наступний крок</div>
          <div class="result-session-title">Закріпимо ці слова</div>
          <div class="result-session-sub">Режим навчання допоможе закрити помилки вручну.</div>
          <div class="result-session-score"><span>${e.length}</span><small>${Qe(e.length)}</small></div>
        </div>

        <div class="result-session-side">
          <div class="result-session-note needs-review">Пройди слова ще раз у форматі введення відповіді. Помилки автоматично повернуться на повтор у межах сесії.</div>
        </div>
      </div>

      <div class="result-actions result-session-actions">
        <button class="btn btn-primary" id="mistakes-learn-btn">До навчання</button>
        <button class="btn btn-outline" id="mistakes-home-btn">На головну</button>
      </div>
    `})}`),u("tb-back",()=>l("showList")),u("reset-btn",M),u("mistakes-learn-btn",()=>l("showLearn",e,"mistakes")),u("mistakes-home-btn",()=>l("showList"))}function Hr(e,t=null){let s=t?.index||0,r=t?.queue||[...e],i=t?.wrongQueue||[],a=t?.sessionCorrect||0,o=t?.sessionWrong||0;if(!r.length){l("showList");return}Ie(()=>O(()=>P(()=>l("showList")),()=>l("showList")));function d(){he();const f=r[s],m=Math.random()>.5,g=m?f.en:f.ua,v=m?f.ua:f.en;let b=!1;ce({mode:"mistakes",source:"mistakes",items:e,queue:r,wrongQueue:i,sessionCorrect:a,sessionWrong:o,index:s}),B(`${N()}${fe({layoutClass:"session-layout learn-session-layout mistakes-review-session-layout",headClass:"settings-panel-head learn-session-head",title:"Повтор помилок",subtitle:Se(Math.min(s+1,r.length),r.length),content:`<div class="learn-session-body">
          <div class="session-main">
          <div class="learn-area">
            <div class="card-lang">${m?"Англійська":"Українська"}</div>
            <div class="learn-word" id="mistakes-prompt-word"></div>
            ${Te(f.id)}
            <div class="ans-label">Введіть ${m?"Українська":"Англійська"}</div>
            <input id="mr-in" class="text-in" type="text" autocomplete="off" autocorrect="off" spellcheck="false" placeholder="Ваша відповідь..."/>
            <div id="mr-fb"></div>
            ${i.length?`<div class="session-loop-note">Ще лишилось закрити: ${i.length}</div>`:""}
          </div>
          </div>
          ${ve({current:Math.min(s+1,r.length),total:r.length,correct:a,wrong:o,label:"Прогрес",correctLabel:"✓ Закрито",wrongLabel:"↺ На повтор"})}
        </div>`,actions:'<div class="card-actions learn-card-actions"><button class="btn btn-primary btn-block" id="mr-btn">Перевірити</button></div>'})}`),u("tb-back",()=>l("showList")),u("reset-btn",M),q(document.getElementById("mistakes-prompt-word"),g),$e(()=>O(()=>P(()=>l("showList")),()=>l("showList"))),Oe();const h=document.getElementById("mr-in"),p=document.getElementById("mr-fb"),I=document.getElementById("mr-btn");setTimeout(()=>h?.focus(),60);const C=()=>{if(b)return V();const z=h.value.toLowerCase().trim();if(!z)return;const W=z===v;ue(W,f.id,"learn"),W?a+=1:(o+=1,r.push(f),i.push(f.id)),b=!0,h.disabled=!0,h.className=`text-in ${W?"ok":"bad"}`,Ve(p,W?{ok:!0,prefix:"✓ Помилка закрита"}:{ok:!1,prefix:"✗ Правильна відповідь: ",emphasis:v}),I.textContent="Далі →",ts(V,3500)},V=()=>{he(),s+=1,s>=r.length?l("showLoopResult","Повтор помилок",a,o,i,()=>l("launchMode","mistakes","mistakes")):d()};I.addEventListener("click",C),h.addEventListener("keydown",z=>{z.key==="Enter"&&C()})}d()}function Qe(e){return e===1?"слово":e>=2&&e<=4?"слова":"слів"}const Jr="appDB",Yr=1,us=["lists","words","memory","sessions"];let _e=null;function ms(){return typeof indexedDB<"u"}function Xr(){return ms()?new Promise((e,t)=>{const s=indexedDB.open(Jr,Yr);s.onupgradeneeded=()=>{const r=s.result;us.forEach(i=>{if(!r.objectStoreNames.contains(i)){const a=r.createObjectStore(i,{keyPath:"id"});i==="words"&&a.createIndex("by_listId","listId",{unique:!1}),i==="memory"&&(a.createIndex("by_listId","listId",{unique:!1}),a.createIndex("by_wordId","wordId",{unique:!1})),i==="sessions"&&a.createIndex("by_listId","listId",{unique:!1})}})},s.onsuccess=()=>e(s.result),s.onerror=()=>t(s.error||new Error("Failed to open IndexedDB."))}):Promise.reject(new Error("IndexedDB is not available."))}async function fs(){return _e||(_e=Xr()),_e}async function Kr(e,t){const s=await fs();return new Promise((r,i)=>{const o=s.transaction(e,"readwrite").objectStore(e).put(t);o.onsuccess=()=>r(o.result),o.onerror=()=>i(o.error||new Error(`Failed to write to ${e}.`))})}function Zr(){return ms()}const ei="quizled_store_";function U(e){return L(e)}function ti(e){return Array.isArray(e)?e.map(t=>L(t)).filter(Boolean):[]}function si(e){if(!y(e))return null;const t=U(e.id),s=L(e.name);return!t||!s?null:{...e,id:t,name:s,createdAt:k(e.createdAt,0)}}function ni(e){if(!y(e))return null;const t=U(e.id),s=U(e.listId),r=T(e.en),i=T(e.ua);return!t||!s||!r||!i?null:{...e,id:t,listId:s,en:r,ua:i}}function ri(e){if(!y(e))return null;const t=U(e.id),s=U(e.wordId),r=U(e.listId);return!t||!s||!r?null:{...e,id:t,wordId:s,listId:r,strength:k(e.strength,0),lastReviewedAt:k(e.lastReviewedAt,0)}}function ii(e){if(!y(e))return null;const t=U(e.id),s=U(e.listId),r=L(e.phase);return!t||!s||!r?null:{...e,id:t,listId:s,currentIndex:E(e.currentIndex,0)??0,phase:r,queue:ti(e.queue)}}function vs(e,t){switch(e){case"lists":return si(t);case"words":return ni(t);case"memory":return ri(t);case"sessions":return ii(t);default:{if(!y(t))return null;const s=U(t.id);return s?{...t,id:s}:null}}}function ai(e,t){return y(t)?Object.values(t).reduce((s,r)=>{const i=vs(e,r);return i?.id&&(s[i.id]=i),s},{}):{}}function gs(){if(typeof localStorage>"u")throw new Error("localStorage is not available.");return localStorage}function bs(e){return`${ei}${e}`}function oi(e){const s=gs().getItem(bs(e));if(!s)return{};try{const r=JSON.parse(s),i=ai(e,r);return JSON.stringify(i)!==JSON.stringify(r)&&hs(e,i),i}catch{return{}}}function hs(e,t){gs().setItem(bs(e),JSON.stringify(t||{}))}async function li(e,t){const s=vs(e,t);if(!s)throw new Error(`Invalid record for store "${e}".`);const r=oi(e);return r[s.id]=s,hs(e,r),s.id}let Ae=!1;function di(e){if(!us.includes(e))throw new Error(`Unsupported store "${e}".`)}async function ci(){if(!Zr())return Ae=!1,!1;try{return await fs(),Ae=!0,!0}catch{return Ae=!1,!1}}async function Pe(e,t){return di(e),Ae?Kr(e,t):li(e,t)}const ui="quizled_v2",ps="quizled_migration_done_v1",re="default-list";function rt(){return typeof localStorage<"u"}function mi(){if(!rt())return null;const e=localStorage.getItem(ui);if(!e)return null;try{const t=JSON.parse(e);return t&&typeof t=="object"?t:null}catch{return null}}function fi(){return rt()?localStorage.getItem(ps)==="true":!1}function vi(){rt()&&localStorage.setItem(ps,"true")}function it(e){return`${re}:word:${String(e)}`}function gi(e){if(!y(e))return null;const t=E(e.id),s=T(e.en),r=T(e.ua);return t===null||!s||!r?null:{id:t,en:s,ua:r}}function bi(e,t){return Array.isArray(e)?e.map(s=>s&&typeof s=="object"?s.id:s).map(s=>E(s)).filter(s=>s!==null&&(!t||t.has(s))).map(s=>it(s)):[]}async function hi(e){const t=Array.isArray(e)?e:[],s=new Set;for(const r of t){const i=gi(r);i&&(await Pe("words",{id:it(i.id),listId:re,en:i.en,ua:i.ua}),s.add(i.id))}return s}async function pi(e,t){const s=y(e)?e:{},r=Object.entries(s);for(const[i,a]of r){const o=E(i);if(o===null||!t.has(o)||!y(a))continue;const d=it(o);await Pe("memory",{id:`${re}:memory:${o}`,wordId:d,listId:re,strength:k(a?.strength,0),lastReviewedAt:k(a?.lastReviewedAt,0)})}}async function yi(e,t){const s=e?.activeSession||null,r=e?.guidedSession||null,i=r?.items||s?.queue||s?.items||[];await Pe("sessions",{id:`${re}:session:main`,listId:re,currentIndex:k(r?.currentIndex??s?.index??0,0),phase:L(r?.phase||s?.mode||"idle")||"idle",queue:bi(i,t)})}async function wi(){if(fi())return{skipped:!0,reason:"already_migrated"};await Pe("lists",{id:re,name:"Мій список",createdAt:Date.now()});const e=mi();if(e){const t=await hi(e.items);await pi(e.memoryByWord,t),await yi(e,t)}return vi(),{skipped:!1,migrated:!!e}}En({launchGuidedPhase:Ge,launchMode:st,resumeActiveSession:Ne,showComplete:Mr,showFlashcards:Ar,showFlashcardsResult:ls,showFlashcardsSummary:Nr,showGuidedLearning:is,showImport:Tn,showIrregularVerbs:ae,showIrregularVerbSession:ds,showLearn:Rr,showList:me,showListsManagement:fr,showLoopResult:Br,showManageVocabulary:Q,showMatch:Pr,showMistakesFollowup:Ur,showMistakesHub:cs,showMistakesReview:Hr,showSessionSettings:ge,showTest:Wr,startGuidedLearning:Vn});Li();async function Li(){if(await ci())try{await wi()}catch{}const t=Vs();if(t){if(n.lists=Array.isArray(t.lists)?t.lists:n.lists,t.currentListId&&(n.currentListId=t.currentListId),n.wordsByList=t.wordsByList||n.wordsByList,n.progressByList=t.progressByList||n.progressByList,t.progressByModeByList&&typeof t.progressByModeByList=="object"){const s={};Object.keys(t.progressByModeByList).forEach(r=>{s[r]=ut(t.progressByModeByList[r])}),n.progressByModeByList=s}if(t.items?.length&&(n.items=t.items,n.progress=t.progress||{correct:0,total:0},n.progressByMode=ut(t.progressByMode)),n.dailyLearned=t.dailyLearned||{},n.dailyGuidedLearned=t.dailyGuidedLearned||{},n.memoryByWord=t.memoryByWord||{},n.mistakes=t.mistakes||{},n.favorites=t.favorites||{},n.flashcardStats=t.flashcardStats||{},n.irregularVerbs=hn(t.irregularVerbs),n.irregularVerbProgress=bn(t.irregularVerbProgress),n.irregularVerbSession=t.irregularVerbSession||null,n.activeSession=t.activeSession||null,n.guidedSession=t.guidedSession||null,n.settings=te(),Je(),n.irregularVerbSession?.queue?.length){ds();return}me()}else me()}
