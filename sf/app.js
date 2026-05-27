(()=>{var Ee=[],$e=null,Z=null;function C(e,t){Ee.push({pattern:e,handler:t,regex:Et(e)})}function y(e){window.location.hash=e}function J(){window.history.back()}function kt(){let e=window.location.hash;return e&&e.slice(1)||"/"}function Re(e){Z=e}function Ce(){window.addEventListener("hashchange",ke),ke()}function ke(){let e=kt();for(let t of Ee){let s=e.match(t.regex);if(s){let n=Rt(t.pattern,s);$e={pattern:t.pattern,path:e,params:n},Z==null||Z($e),t.handler(n);return}}y("/")}function Et(e){let t=e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/:([a-zA-Z]+)/g,"([^/]+)");return new RegExp(`^${t}$`)}function Rt(e,t){let s=[...e.matchAll(/:([a-zA-Z]+)/g)].map(i=>i[1]),n={};return s.forEach((i,a)=>{n[i]=t[a+1]}),n}var Ct="supafast";var P=null;function le(){return P||(P=new Promise((e,t)=>{let s=indexedDB.open(Ct,1);s.onupgradeneeded=n=>{let i=n.target.result;Dt(i,n.oldVersion)},s.onsuccess=n=>e(n.target.result),s.onerror=n=>{P=null,t(n.target.error)},s.onblocked=()=>{console.warn("[DB] Upgrade blocked \u2014 close other tabs")}}),P)}function Dt(e,t){if(t<1){let s=e.createObjectStore("exercises",{keyPath:"id"});s.createIndex("category","category",{unique:!1}),s.createIndex("isCustom","isCustom",{unique:!1}),s.createIndex("name","name",{unique:!1});let n=e.createObjectStore("workouts",{keyPath:"id"});n.createIndex("updatedAt","updatedAt",{unique:!1}),n.createIndex("createdAt","createdAt",{unique:!1});let i=e.createObjectStore("sessions",{keyPath:"id"});i.createIndex("startedAt","startedAt",{unique:!1}),i.createIndex("workoutId","workoutId",{unique:!1}),i.createIndex("status","status",{unique:!1}),i.createIndex("dateKey","dateKey",{unique:!1})}}async function v(e,t,s){let n=await le(),i=Array.isArray(e)?e:[e],a=n.transaction(i,t),r={};i.forEach(l=>{r[l]=a.objectStore(l)});try{return await s(r)}catch(l){throw a.abort(),l}}function S(e){return new Promise((t,s)=>{e.onsuccess=n=>t(n.target.result),e.onerror=n=>s(n.target.error)})}function h(e){let t=Math.max(0,Math.floor(e)),s=Math.floor(t/60),n=t%60;return`${String(s).padStart(2,"0")}:${String(n).padStart(2,"0")}`}function b(e){let t=Math.max(0,Math.floor(e)),s=Math.floor(t/3600),n=Math.floor(t%3600/60),i=t%60;return s>0?`${s} \u0433\u043E\u0434 ${n} \u0445\u0432`:n>0&&i>0?`${n} \u0445\u0432 ${i} \u0441`:n>0?`${n} \u0445\u0432`:`${i} \u0441`}function M(e){return new Date(e).toLocaleDateString("uk-UA",{day:"numeric",month:"short"})}function B(e){return new Date(e).toISOString().slice(0,10)}function de(e){return!e&&e!==0?"\u2014":`${e%1===0?e:e.toFixed(1)} \u043A\u0433`}function Q(e){return e.reduce((t,s)=>t+(s.reps||0)*(s.weightKg||0),0)}function I(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,e=>{let t=Math.random()*16|0;return(e==="x"?t:t&3|8).toString(16)})}var N="exercises";async function R(){return v(N,"readonly",({exercises:e})=>S(e.getAll()))}async function De(e){let t={id:I(),name:e.name,category:e.category||"strength",type:e.type||"weighted",muscleGroups:e.muscleGroups||[],isCustom:!0,defaultSets:e.defaultSets??3,defaultReps:e.defaultReps??null,defaultWeightKg:e.defaultWeightKg??null,defaultRestSec:e.defaultRestSec??90,defaultDurationSec:e.defaultDurationSec??null,notes:e.notes||"",createdAt:Date.now()};return await v(N,"readwrite",({exercises:s})=>S(s.add(t))),t}async function Te(e,t){return v(N,"readwrite",({exercises:s})=>new Promise((n,i)=>{let a=s.get(e);a.onsuccess=r=>{let l=r.target.result;if(!l)return i(new Error("Exercise not found"));let d={...l,...t,id:e,updatedAt:Date.now()},u=s.put(d);u.onsuccess=()=>n(d),u.onerror=c=>i(c.target.error)},a.onerror=r=>i(r.target.error)}))}async function Le(e){return v(N,"readwrite",({exercises:t})=>S(t.delete(e)))}async function qe(e){await v(N,"readwrite",({exercises:t})=>(e.forEach(s=>t.put(s)),Promise.resolve()))}var Ae=[{id:"bi-squat",name:"\u041F\u0440\u0438\u0441\u0456\u0434\u0430\u043D\u043D\u044F",category:"strength",type:"weighted",muscleGroups:["quads","glutes"],isCustom:!1,defaultSets:3,defaultReps:12,defaultWeightKg:null,defaultRestSec:90,defaultDurationSec:null,notes:""},{id:"bi-rdl",name:"\u0420\u0443\u043C\u0443\u043D\u0441\u044C\u043A\u0430 \u0442\u044F\u0433\u0430",category:"strength",type:"weighted",muscleGroups:["hamstrings","glutes"],isCustom:!1,defaultSets:3,defaultReps:12,defaultWeightKg:null,defaultRestSec:90,defaultDurationSec:null,notes:""},{id:"bi-glute-bridge",name:"\u042F\u0433\u043E\u0434\u0438\u0447\u043D\u0438\u0439 \u043C\u0456\u0441\u0442",category:"strength",type:"weighted",muscleGroups:["glutes"],isCustom:!1,defaultSets:3,defaultReps:15,defaultWeightKg:null,defaultRestSec:60,defaultDurationSec:null,notes:"1 \u0441\u0435\u043A \u043F\u0430\u0443\u0437\u0430 \u0437\u0432\u0435\u0440\u0445\u0443"},{id:"bi-hip-thrust",name:"\u0425\u0456\u043F \u0442\u0440\u0430\u0441\u0442",category:"strength",type:"weighted",muscleGroups:["glutes","hamstrings"],isCustom:!1,defaultSets:3,defaultReps:12,defaultWeightKg:null,defaultRestSec:90,defaultDurationSec:null,notes:""},{id:"bi-lunges",name:"\u0412\u0438\u043F\u0430\u0434\u0438",category:"strength",type:"bodyweight",muscleGroups:["quads","glutes"],isCustom:!1,defaultSets:3,defaultReps:10,defaultWeightKg:null,defaultRestSec:60,defaultDurationSec:null,notes:"\u041D\u0430 \u043A\u043E\u0436\u043D\u0443 \u043D\u043E\u0433\u0443"},{id:"bi-leg-press",name:"\u0416\u0438\u043C \u043D\u043E\u0433\u0430\u043C\u0438",category:"strength",type:"weighted",muscleGroups:["quads","glutes"],isCustom:!1,defaultSets:3,defaultReps:12,defaultWeightKg:null,defaultRestSec:90,defaultDurationSec:null,notes:""},{id:"bi-leg-curl",name:"\u0421\u0433\u0438\u043D\u0430\u043D\u043D\u044F \u043D\u0456\u0433 \u043B\u0435\u0436\u0430\u0447\u0438",category:"strength",type:"weighted",muscleGroups:["hamstrings"],isCustom:!1,defaultSets:3,defaultReps:12,defaultWeightKg:null,defaultRestSec:60,defaultDurationSec:null,notes:""},{id:"bi-calf-raise",name:"\u041F\u0456\u0434\u0439\u043E\u043C \u043D\u0430 \u043D\u043E\u0441\u043A\u0438",category:"strength",type:"weighted",muscleGroups:["calves"],isCustom:!1,defaultSets:3,defaultReps:20,defaultWeightKg:null,defaultRestSec:45,defaultDurationSec:null,notes:""},{id:"bi-sumo-squat",name:"\u0421\u0443\u043C\u043E \u043F\u0440\u0438\u0441\u0456\u0434\u0430\u043D\u043D\u044F",category:"strength",type:"weighted",muscleGroups:["quads","glutes","adductors"],isCustom:!1,defaultSets:3,defaultReps:12,defaultWeightKg:null,defaultRestSec:90,defaultDurationSec:null,notes:""},{id:"bi-step-up",name:"\u041F\u0456\u0434\u0439\u043E\u043C \u043D\u0430 \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0443",category:"strength",type:"bodyweight",muscleGroups:["quads","glutes"],isCustom:!1,defaultSets:3,defaultReps:10,defaultWeightKg:null,defaultRestSec:60,defaultDurationSec:null,notes:"\u041D\u0430 \u043A\u043E\u0436\u043D\u0443 \u043D\u043E\u0433\u0443"},{id:"bi-goblet-squat",name:"Goblet squat",category:"strength",type:"weighted",muscleGroups:["quads","glutes"],isCustom:!1,defaultSets:3,defaultReps:10,defaultWeightKg:null,defaultRestSec:90,defaultDurationSec:null,notes:"\u0413\u0430\u043D\u0442\u0435\u043B\u044C \u0430\u0431\u043E \u0433\u0438\u0440\u044F \u0434\u043E \u0433\u0440\u0443\u0434\u0435\u0439"},{id:"bi-bulgarian-ssq",name:"\u0411\u043E\u043B\u0433\u0430\u0440\u0441\u044C\u043A\u0456 \u0432\u0438\u043F\u0430\u0434\u0438",category:"strength",type:"weighted",muscleGroups:["quads","glutes"],isCustom:!1,defaultSets:3,defaultReps:10,defaultWeightKg:null,defaultRestSec:90,defaultDurationSec:null,notes:"\u041D\u0430 \u043A\u043E\u0436\u043D\u0443 \u043D\u043E\u0433\u0443"},{id:"bi-sumo-dl",name:"\u0421\u0443\u043C\u043E \u0442\u044F\u0433\u0430",category:"strength",type:"weighted",muscleGroups:["glutes","hamstrings"],isCustom:!1,defaultSets:3,defaultReps:8,defaultWeightKg:null,defaultRestSec:120,defaultDurationSec:null,notes:""},{id:"bi-pullup",name:"\u041F\u0456\u0434\u0442\u044F\u0433\u0443\u0432\u0430\u043D\u043D\u044F",category:"strength",type:"bodyweight",muscleGroups:["lats","biceps"],isCustom:!1,defaultSets:3,defaultReps:6,defaultWeightKg:null,defaultRestSec:120,defaultDurationSec:null,notes:""},{id:"bi-band-pull",name:"\u0422\u044F\u0433\u0430 \u0440\u0435\u0437\u0438\u043D\u043A\u0438",category:"strength",type:"weighted",muscleGroups:["lats","rhomboids"],isCustom:!1,defaultSets:3,defaultReps:15,defaultWeightKg:null,defaultRestSec:60,defaultDurationSec:null,notes:""},{id:"bi-row-db",name:"\u0422\u044F\u0433\u0430 \u0433\u0430\u043D\u0442\u0435\u043B\u0456 \u0432 \u043D\u0430\u0445\u0438\u043B\u0456",category:"strength",type:"weighted",muscleGroups:["lats","rhomboids"],isCustom:!1,defaultSets:3,defaultReps:12,defaultWeightKg:null,defaultRestSec:90,defaultDurationSec:null,notes:""},{id:"bi-row-cable",name:"\u0413\u043E\u0440\u0438\u0437\u043E\u043D\u0442\u0430\u043B\u044C\u043D\u0430 \u0442\u044F\u0433\u0430",category:"strength",type:"weighted",muscleGroups:["lats","rhomboids"],isCustom:!1,defaultSets:3,defaultReps:12,defaultWeightKg:null,defaultRestSec:90,defaultDurationSec:null,notes:""},{id:"bi-lat-pulldown",name:"\u0422\u044F\u0433\u0430 \u0434\u043E \u0433\u0440\u0443\u0434\u0435\u0439",category:"strength",type:"weighted",muscleGroups:["lats"],isCustom:!1,defaultSets:3,defaultReps:12,defaultWeightKg:null,defaultRestSec:90,defaultDurationSec:null,notes:""},{id:"bi-back-ext",name:"\u0413\u0456\u043F\u0435\u0440\u0435\u043A\u0441\u0442\u0435\u043D\u0437\u0456\u044F",category:"strength",type:"bodyweight",muscleGroups:["erectors","glutes"],isCustom:!1,defaultSets:3,defaultReps:15,defaultWeightKg:null,defaultRestSec:60,defaultDurationSec:null,notes:""},{id:"bi-hang",name:"\u0412\u0438\u0441 \u043D\u0430 \u0442\u0443\u0440\u043D\u0456\u043A\u0443",category:"strength",type:"timed",muscleGroups:["lats","grip"],isCustom:!1,defaultSets:3,defaultReps:null,defaultWeightKg:null,defaultRestSec:60,defaultDurationSec:30,notes:""},{id:"bi-active-hang",name:"\u0410\u043A\u0442\u0438\u0432\u043D\u0438\u0439 \u0432\u0438\u0441",category:"strength",type:"timed",muscleGroups:["lats","grip"],isCustom:!1,defaultSets:3,defaultReps:null,defaultWeightKg:null,defaultRestSec:60,defaultDurationSec:25,notes:"\u041B\u043E\u043F\u0430\u0442\u043A\u0438 \u0432\u043D\u0438\u0437 \u0456 \u043D\u0430\u0437\u0430\u0434"},{id:"bi-passive-hang",name:"\u041F\u0430\u0441\u0438\u0432\u043D\u0438\u0439 \u0432\u0438\u0441",category:"strength",type:"timed",muscleGroups:["lats","grip","spine"],isCustom:!1,defaultSets:3,defaultReps:null,defaultWeightKg:null,defaultRestSec:45,defaultDurationSec:20,notes:"\u041F\u043E\u0432\u043D\u0435 \u0440\u043E\u0437\u0441\u043B\u0430\u0431\u043B\u0435\u043D\u043D\u044F"},{id:"bi-pushup",name:"\u0412\u0456\u0434\u0436\u0438\u043C\u0430\u043D\u043D\u044F",category:"strength",type:"bodyweight",muscleGroups:["chest","triceps"],isCustom:!1,defaultSets:3,defaultReps:15,defaultWeightKg:null,defaultRestSec:60,defaultDurationSec:null,notes:""},{id:"bi-bench-db",name:"\u0416\u0438\u043C \u0433\u0430\u043D\u0442\u0435\u043B\u0435\u0439 \u043B\u0435\u0436\u0430\u0447\u0438",category:"strength",type:"weighted",muscleGroups:["chest","triceps"],isCustom:!1,defaultSets:3,defaultReps:12,defaultWeightKg:null,defaultRestSec:90,defaultDurationSec:null,notes:""},{id:"bi-incline-db",name:"\u0416\u0438\u043C \u043D\u0430 \u043F\u043E\u0445\u0438\u043B\u0456\u0439 \u043B\u0430\u0432\u0446\u0456",category:"strength",type:"weighted",muscleGroups:["chest","triceps"],isCustom:!1,defaultSets:3,defaultReps:12,defaultWeightKg:null,defaultRestSec:90,defaultDurationSec:null,notes:""},{id:"bi-flyes",name:"\u0420\u043E\u0437\u0432\u0435\u0434\u0435\u043D\u043D\u044F \u0433\u0430\u043D\u0442\u0435\u043B\u0435\u0439",category:"strength",type:"weighted",muscleGroups:["chest"],isCustom:!1,defaultSets:3,defaultReps:12,defaultWeightKg:null,defaultRestSec:60,defaultDurationSec:null,notes:""},{id:"bi-dips",name:"\u0412\u0456\u0434\u0436\u0438\u043C\u0430\u043D\u043D\u044F \u043D\u0430 \u0431\u0440\u0443\u0441\u0430\u0445",category:"strength",type:"bodyweight",muscleGroups:["chest","triceps"],isCustom:!1,defaultSets:3,defaultReps:8,defaultWeightKg:null,defaultRestSec:90,defaultDurationSec:null,notes:""},{id:"bi-ohp-db",name:"\u0416\u0438\u043C \u0433\u0430\u043D\u0442\u0435\u043B\u0435\u0439 \u0441\u0442\u043E\u044F\u0447\u0438",category:"strength",type:"weighted",muscleGroups:["shoulders","triceps"],isCustom:!1,defaultSets:3,defaultReps:12,defaultWeightKg:null,defaultRestSec:90,defaultDurationSec:null,notes:""},{id:"bi-lateral-raise",name:"\u0420\u043E\u0437\u0432\u0435\u0434\u0435\u043D\u043D\u044F \u043D\u0430 \u043F\u043B\u0435\u0447\u0456",category:"strength",type:"weighted",muscleGroups:["shoulders"],isCustom:!1,defaultSets:3,defaultReps:15,defaultWeightKg:null,defaultRestSec:60,defaultDurationSec:null,notes:""},{id:"bi-front-raise",name:"\u041F\u0456\u0434\u0439\u043E\u043C \u0433\u0430\u043D\u0442\u0435\u043B\u0435\u0439 \u0432\u043F\u0435\u0440\u0435\u0434",category:"strength",type:"weighted",muscleGroups:["shoulders"],isCustom:!1,defaultSets:3,defaultReps:12,defaultWeightKg:null,defaultRestSec:60,defaultDurationSec:null,notes:""},{id:"bi-face-pull",name:"Face pull",category:"strength",type:"weighted",muscleGroups:["shoulders","rhomboids"],isCustom:!1,defaultSets:3,defaultReps:15,defaultWeightKg:null,defaultRestSec:60,defaultDurationSec:null,notes:""},{id:"bi-bicep-curl",name:"\u041F\u0456\u0434\u0439\u043E\u043C \u043D\u0430 \u0431\u0456\u0446\u0435\u043F\u0441",category:"strength",type:"weighted",muscleGroups:["biceps"],isCustom:!1,defaultSets:3,defaultReps:12,defaultWeightKg:null,defaultRestSec:60,defaultDurationSec:null,notes:""},{id:"bi-hammer-curl",name:"\u041C\u043E\u043B\u043E\u0442\u043A\u043E\u0432\u0438\u0439 \u043F\u0456\u0434\u0439\u043E\u043C",category:"strength",type:"weighted",muscleGroups:["biceps","brachialis"],isCustom:!1,defaultSets:3,defaultReps:12,defaultWeightKg:null,defaultRestSec:60,defaultDurationSec:null,notes:""},{id:"bi-tricep-ext",name:"\u0420\u043E\u0437\u0433\u0438\u043D\u0430\u043D\u043D\u044F \u043D\u0430 \u0442\u0440\u0438\u0446\u0435\u043F\u0441",category:"strength",type:"weighted",muscleGroups:["triceps"],isCustom:!1,defaultSets:3,defaultReps:12,defaultWeightKg:null,defaultRestSec:60,defaultDurationSec:null,notes:""},{id:"bi-skullcrusher",name:"\u0424\u0440\u0430\u043D\u0446\u0443\u0437\u044C\u043A\u0438\u0439 \u0436\u0438\u043C",category:"strength",type:"weighted",muscleGroups:["triceps"],isCustom:!1,defaultSets:3,defaultReps:12,defaultWeightKg:null,defaultRestSec:60,defaultDurationSec:null,notes:""},{id:"bi-plank",name:"\u041F\u043B\u0430\u043D\u043A\u0430",category:"strength",type:"timed",muscleGroups:["core"],isCustom:!1,defaultSets:3,defaultReps:null,defaultWeightKg:null,defaultRestSec:45,defaultDurationSec:40,notes:""},{id:"bi-side-plank",name:"\u0411\u043E\u043A\u043E\u0432\u0430 \u043F\u043B\u0430\u043D\u043A\u0430",category:"strength",type:"timed",muscleGroups:["core","obliques"],isCustom:!1,defaultSets:2,defaultReps:null,defaultWeightKg:null,defaultRestSec:30,defaultDurationSec:30,notes:"\u041D\u0430 \u043A\u043E\u0436\u043D\u0443 \u0441\u0442\u043E\u0440\u043E\u043D\u0443"},{id:"bi-wall-sit",name:"\u041F\u0440\u0438\u0441\u0456\u0434\u0430\u043D\u043D\u044F \u0431\u0456\u043B\u044F \u0441\u0442\u0456\u043D\u0438",category:"strength",type:"timed",muscleGroups:["quads"],isCustom:!1,defaultSets:3,defaultReps:null,defaultWeightKg:null,defaultRestSec:60,defaultDurationSec:30,notes:""},{id:"bi-dead-bug",name:"Dead bug",category:"strength",type:"bodyweight",muscleGroups:["core"],isCustom:!1,defaultSets:3,defaultReps:10,defaultWeightKg:null,defaultRestSec:45,defaultDurationSec:null,notes:"\u041F\u043E\u0432\u0456\u043B\u044C\u043D\u0438\u0439 \u0442\u0435\u043C\u043F"},{id:"bi-crunch",name:"\u041A\u0440\u0430\u043D\u0447\u0456",category:"strength",type:"bodyweight",muscleGroups:["core"],isCustom:!1,defaultSets:3,defaultReps:20,defaultWeightKg:null,defaultRestSec:45,defaultDurationSec:null,notes:""},{id:"bi-leg-raise",name:"\u041F\u0456\u0434\u0439\u043E\u043C \u043D\u0456\u0433 \u043B\u0435\u0436\u0430\u0447\u0438",category:"strength",type:"bodyweight",muscleGroups:["core","hip-flexors"],isCustom:!1,defaultSets:3,defaultReps:15,defaultWeightKg:null,defaultRestSec:45,defaultDurationSec:null,notes:""},{id:"bi-russian-twist",name:"Russian Twist",category:"strength",type:"bodyweight",muscleGroups:["core","obliques"],isCustom:!1,defaultSets:3,defaultReps:20,defaultWeightKg:null,defaultRestSec:45,defaultDurationSec:null,notes:""},{id:"bi-pallof-press",name:"Pallof press",category:"strength",type:"weighted",muscleGroups:["core"],isCustom:!1,defaultSets:3,defaultReps:12,defaultWeightKg:null,defaultRestSec:45,defaultDurationSec:null,notes:""},{id:"bi-bike",name:"\u0412\u0435\u043B\u043E\u0442\u0440\u0435\u043D\u0430\u0436\u0435\u0440",category:"cardio",type:"cardio",muscleGroups:["cardio"],isCustom:!1,defaultSets:1,defaultReps:null,defaultWeightKg:null,defaultRestSec:0,defaultDurationSec:1200,notes:"120\u2013140 bpm \xB7 \u043A\u0430\u0434\u0435\u043D\u0441 75\u201390"},{id:"bi-treadmill",name:"\u0411\u0456\u0433\u043E\u0432\u0430 \u0434\u043E\u0440\u0456\u0436\u043A\u0430",category:"cardio",type:"cardio",muscleGroups:["cardio"],isCustom:!1,defaultSets:1,defaultReps:null,defaultWeightKg:null,defaultRestSec:0,defaultDurationSec:1200,notes:""},{id:"bi-rowing",name:"\u0413\u0440\u0435\u0431\u043D\u0438\u0439 \u0442\u0440\u0435\u043D\u0430\u0436\u0435\u0440",category:"cardio",type:"cardio",muscleGroups:["cardio","back"],isCustom:!1,defaultSets:1,defaultReps:null,defaultWeightKg:null,defaultRestSec:0,defaultDurationSec:1200,notes:""},{id:"bi-jump-rope",name:"\u0421\u043A\u0430\u043A\u0430\u043B\u043A\u0430",category:"cardio",type:"timed",muscleGroups:["cardio"],isCustom:!1,defaultSets:3,defaultReps:null,defaultWeightKg:null,defaultRestSec:60,defaultDurationSec:60,notes:""},{id:"bi-burpee",name:"\u0411\u0435\u0440\u043F\u0456",category:"cardio",type:"bodyweight",muscleGroups:["cardio","full-body"],isCustom:!1,defaultSets:3,defaultReps:10,defaultWeightKg:null,defaultRestSec:60,defaultDurationSec:null,notes:""},{id:"bi-mountain-climb",name:"Mountain climbers",category:"cardio",type:"bodyweight",muscleGroups:["cardio","core"],isCustom:!1,defaultSets:3,defaultReps:20,defaultWeightKg:null,defaultRestSec:45,defaultDurationSec:null,notes:""},{id:"bi-hip-flexor",name:"\u0420\u043E\u0437\u0442\u044F\u0436\u043A\u0430 \u0437\u0433\u0438\u043D\u0430\u0447\u0456\u0432 \u0441\u0442\u0435\u0433\u043D\u0430",category:"mobility",type:"timed",muscleGroups:["hip-flexors"],isCustom:!1,defaultSets:2,defaultReps:null,defaultWeightKg:null,defaultRestSec:30,defaultDurationSec:45,notes:"\u041D\u0430 \u043A\u043E\u0436\u043D\u0443 \u043D\u043E\u0433\u0443"},{id:"bi-hamstring-str",name:"\u0420\u043E\u0437\u0442\u044F\u0436\u043A\u0430 \u0437\u0430\u0434\u043D\u044C\u043E\u0457 \u043F\u043E\u0432\u0435\u0440\u0445\u043D\u0456",category:"mobility",type:"timed",muscleGroups:["hamstrings"],isCustom:!1,defaultSets:2,defaultReps:null,defaultWeightKg:null,defaultRestSec:30,defaultDurationSec:45,notes:"\u041D\u0430 \u043A\u043E\u0436\u043D\u0443 \u043D\u043E\u0433\u0443"},{id:"bi-pigeon",name:"\u041F\u043E\u0437\u0430 \u0433\u043E\u043B\u0443\u0431\u0430",category:"mobility",type:"timed",muscleGroups:["glutes","hip-flexors"],isCustom:!1,defaultSets:2,defaultReps:null,defaultWeightKg:null,defaultRestSec:30,defaultDurationSec:60,notes:"\u041D\u0430 \u043A\u043E\u0436\u043D\u0443 \u043D\u043E\u0433\u0443"},{id:"bi-cat-cow",name:"\u041A\u0456\u0442-\u043A\u043E\u0440\u043E\u0432\u0430",category:"mobility",type:"bodyweight",muscleGroups:["spine"],isCustom:!1,defaultSets:1,defaultReps:10,defaultWeightKg:null,defaultRestSec:0,defaultDurationSec:null,notes:"\u041F\u043E\u0432\u0456\u043B\u044C\u043D\u043E"},{id:"bi-worlds-gr",name:"World's greatest stretch",category:"mobility",type:"bodyweight",muscleGroups:["full-body"],isCustom:!1,defaultSets:2,defaultReps:5,defaultWeightKg:null,defaultRestSec:30,defaultDurationSec:null,notes:"\u041D\u0430 \u043A\u043E\u0436\u043D\u0443 \u043D\u043E\u0433\u0443"},{id:"bi-shoulder-str",name:"\u0420\u043E\u0437\u0442\u044F\u0436\u043A\u0430 \u043F\u043B\u0435\u0447\u0435\u0439",category:"mobility",type:"timed",muscleGroups:["shoulders"],isCustom:!1,defaultSets:2,defaultReps:null,defaultWeightKg:null,defaultRestSec:20,defaultDurationSec:30,notes:"\u041D\u0430 \u043A\u043E\u0436\u043D\u0443 \u0440\u0443\u043A\u0443"},{id:"bi-thoracic-rot",name:"\u0420\u043E\u0442\u0430\u0446\u0456\u044F \u0433\u0440\u0443\u0434\u043D\u043E\u0433\u043E \u0432\u0456\u0434\u0434\u0456\u043B\u0443",category:"mobility",type:"bodyweight",muscleGroups:["spine","thoracic"],isCustom:!1,defaultSets:2,defaultReps:10,defaultWeightKg:null,defaultRestSec:30,defaultDurationSec:null,notes:"\u041D\u0430 \u043A\u043E\u0436\u043D\u0443 \u0441\u0442\u043E\u0440\u043E\u043D\u0443"},{id:"bi-ankle-mob",name:"\u041C\u043E\u0431\u0456\u043B\u044C\u043D\u0456\u0441\u0442\u044C \u0433\u043E\u043C\u0456\u043B\u043A\u043E\u0441\u0442\u043E\u043F\u0430",category:"mobility",type:"bodyweight",muscleGroups:["ankles"],isCustom:!1,defaultSets:2,defaultReps:10,defaultWeightKg:null,defaultRestSec:20,defaultDurationSec:null,notes:"\u041D\u0430 \u043A\u043E\u0436\u043D\u0443 \u043D\u043E\u0433\u0443"},{id:"bi-foam-roll",name:"\u041C\u0430\u0441\u0430\u0436 \u0440\u043E\u043B\u0438\u043A\u043E\u043C",category:"mobility",type:"timed",muscleGroups:["full-body"],isCustom:!1,defaultSets:1,defaultReps:null,defaultWeightKg:null,defaultRestSec:0,defaultDurationSec:90,notes:"1\u20132 \u0445\u0432 \u043D\u0430 \u0433\u0440\u0443\u043F\u0443"},{id:"bi-childs-pose",name:"\u041F\u043E\u0437\u0430 \u0434\u0438\u0442\u0438\u043D\u0438",category:"mobility",type:"timed",muscleGroups:["lats","spine"],isCustom:!1,defaultSets:1,defaultReps:null,defaultWeightKg:null,defaultRestSec:0,defaultDurationSec:60,notes:""}],K={strength:"\u0421\u0438\u043B\u0430",cardio:"\u041A\u0430\u0440\u0434\u0456\u043E",mobility:"\u041C\u043E\u0431\u0456\u043B\u044C\u043D\u0456\u0441\u0442\u044C"},We={weighted:"\u0417\u0432\u0430\u0436\u0435\u043D\u0430",bodyweight:"\u0412\u043B\u0430\u0441\u043D\u0430 \u0432\u0430\u0433\u0430",timed:"\u0417\u0430 \u0447\u0430\u0441\u043E\u043C",cardio:"\u041A\u0430\u0440\u0434\u0456\u043E"},ze={quads:"\u041A\u0432\u0430\u0434\u0440\u0438\u0446\u0435\u043F\u0441",hamstrings:"\u0417\u0430\u0434\u043D\u044F \u0441\u0442\u0435\u0433\u043D\u0430",glutes:"\u0421\u0456\u0434\u043D\u0438\u0446\u0456",calves:"\u041B\u0438\u0442\u043A\u0438",adductors:"\u041F\u0440\u0438\u0432\u0456\u0434\u043D\u0456","hip-flexors":"\u0417\u0433\u0438\u043D\u0430\u0447\u0456 \u0441\u0442\u0435\u0433\u043D\u0430",lats:"\u0428\u0438\u0440\u043E\u043A\u0438\u0439 \u0441\u043F\u0438\u043D\u0438",rhomboids:"\u0420\u043E\u043C\u0431\u043E\u043F\u043E\u0434\u0456\u0431\u043D\u0456",erectors:"\u0420\u043E\u0437\u0433\u0438\u043D\u0430\u0447\u0456 \u0441\u043F\u0438\u043D\u0438",chest:"\u0413\u0440\u0443\u0434\u0438",shoulders:"\u041F\u043B\u0435\u0447\u0456",biceps:"\u0411\u0456\u0446\u0435\u043F\u0441",triceps:"\u0422\u0440\u0438\u0446\u0435\u043F\u0441",brachialis:"\u041F\u043B\u0435\u0447\u043E\u0432\u0438\u0439 \u043C'\u044F\u0437",core:"\u041A\u043E\u0440",obliques:"\u041A\u043E\u0441\u0438\u0439 \u043F\u0440\u0435\u0441","full-body":"\u0412\u0441\u0435 \u0442\u0456\u043B\u043E",cardio:"\u041A\u0430\u0440\u0434\u0456\u043E",grip:"\u0425\u0432\u0430\u0442",spine:"\u0425\u0440\u0435\u0431\u0435\u0442",thoracic:"\u0413\u0440\u0443\u0434\u043D\u0438\u0439 \u0432\u0456\u0434\u0434\u0456\u043B",ankles:"\u0413\u043E\u043C\u0456\u043B\u043A\u043E\u0441\u0442\u043E\u043F",back:"\u0421\u043F\u0438\u043D\u0430"};var Tt=[{id:"home",label:"\u0413\u043E\u043B\u043E\u0432\u043D\u0430",icon:"icon-home",path:"/"},{id:"workouts",label:"\u041F\u043B\u0430\u043D\u0438",icon:"icon-dumbbell",path:"/workouts"},{id:"history",label:"\u0406\u0441\u0442\u043E\u0440\u0456\u044F",icon:"icon-calendar",path:"/history"},{id:"profile",label:"\u041F\u0440\u043E\u0444\u0456\u043B\u044C",icon:"icon-person",path:"/profile"}],T=null;function Ie(){T=document.getElementById("bottom-nav"),T&&(Me("/"),Re(e=>Me(e.path)))}function E(){T&&T.classList.remove("hidden")}function ee(){T&&T.classList.add("hidden")}function Me(e){T&&(T.innerHTML=Tt.map(t=>`
      <button class="sf-nav-item ${(t.path==="/"?e==="/":e.startsWith(t.path))?"active":""}" data-nav-path="${t.path}" aria-label="${t.label}">
        <svg class="icon" style="width:22px;height:22px" aria-hidden="true"><use href="#${t.icon}"/></svg>
        <span class="sf-nav-label">${t.label}</span>
      </button>`).join(""),T.querySelectorAll("[data-nav-path]").forEach(t=>{t.addEventListener("click",()=>y(t.dataset.navPath))}))}var L=null;function Ke(){var e;L=document.getElementById("bottom-bar"),L||(L=document.createElement("div"),L.id="bottom-bar",L.className="bottom-bar hidden",(e=document.getElementById("app"))==null||e.appendChild(L))}function Ge(){L&&L.classList.add("hidden")}var F="workouts";async function te(){return(await v(F,"readonly",({workouts:t})=>S(t.getAll()))).sort((t,s)=>(s.updatedAt||0)-(t.updatedAt||0))}async function G(e){return v(F,"readonly",({workouts:t})=>S(t.get(e)))}async function _e(e){let t=Date.now(),s={id:I(),name:e.name||"\u0411\u0435\u0437 \u043D\u0430\u0437\u0432\u0438",description:e.description||"",tags:e.tags||[],exercises:e.exercises||[],createdAt:t,updatedAt:t};return await v(F,"readwrite",({workouts:n})=>S(n.add(s))),s}async function je(e,t){return v(F,"readwrite",({workouts:s})=>new Promise((n,i)=>{let a=s.get(e);a.onsuccess=r=>{let l=r.target.result;if(!l)return i(new Error("Workout not found"));let d={...l,...t,id:e,updatedAt:Date.now()},u=s.put(d);u.onsuccess=()=>n(d),u.onerror=c=>i(c.target.error)},a.onerror=r=>i(r.target.error)}))}async function He(e){return v(F,"readwrite",({workouts:t})=>S(t.delete(e)))}var _="sessions";async function q(){return(await v(_,"readonly",({sessions:t})=>S(t.getAll()))).sort((t,s)=>(s.startedAt||0)-(t.startedAt||0))}async function Lt(e){return v(_,"readonly",({sessions:t})=>S(t.get(e)))}async function Pe(e){return(await v(_,"readonly",({sessions:s})=>{let n=s.index("workoutId");return S(n.getAll(e))})).filter(s=>s.status==="completed").sort((s,n)=>(n.startedAt||0)-(s.startedAt||0))[0]||null}async function Be(e,t){let s=Date.now(),n={id:I(),workoutId:e,workoutName:t,startedAt:s,endedAt:null,totalDuration:0,status:"in-progress",dateKey:B(s),exercises:[]};return await v(_,"readwrite",({sessions:i})=>S(i.add(n))),n}async function Ne(e,t){return v(_,"readwrite",({sessions:s})=>new Promise((n,i)=>{let a=s.get(e);a.onsuccess=r=>{let l=r.target.result;if(!l)return i(new Error("Session not found"));let d={...l,...t,id:e},u=s.put(d);u.onsuccess=()=>n(d),u.onerror=c=>i(c.target.error)},a.onerror=r=>i(r.target.error)}))}async function Fe(e,t){let s=Date.now(),n=await Lt(e);if(!n)throw new Error("Session not found");let i=Math.floor((s-n.startedAt)/1e3);return Ne(e,{status:"completed",endedAt:s,totalDuration:i,exercises:t})}async function Oe(e){return Ne(e,{status:"abandoned",endedAt:Date.now()})}async function Ue(e){return v(_,"readwrite",({sessions:t})=>S(t.delete(e)))}async function se(){let t=(await q()).filter(a=>a.status==="completed");if(!t.length)return 0;let s=new Set(t.map(a=>a.dateKey)),n=0,i=new Date;for(;;){let a=i.toISOString().slice(0,10);if(!s.has(a)){if(n===0&&a===B(Date.now())){i.setDate(i.getDate()-1);continue}break}n++,i.setDate(i.getDate()-1)}return n}async function Ve(e){var m,g,$;ue(),e.innerHTML=`<div class="screen" style="padding-bottom:var(--nav-height)">
    <div style="padding:calc(env(safe-area-inset-top,52px) + 4px) 20px 0">
      <div class="mono" style="font-size:10px;color:var(--dim);text-transform:uppercase;letter-spacing:.12em">SUPAFIT</div>
      <div style="font-family:var(--font-display);font-size:clamp(52px,16vw,76px);line-height:.88;color:var(--acid);margin-top:2px">SF.</div>
    </div>
  </div>`;let[t,s,n,i]=await Promise.all([te(),q(),se(),R()]),a=Object.fromEntries(i.map(w=>[w.id,w])),r=s.filter(w=>w.status==="completed"),l=r.reduce((w,D)=>w+(D.exercises||[]).reduce((Y,wt)=>Y+(wt.sets||[]).reduce(($t,we)=>$t+(we.reps||0)*(we.weightKg||0),0),0),0),d=t[0]||null,u=r[0]||null,c=d?Math.round(d.exercises.reduce((w,D)=>w+(D.sets||3)*((D.restSec||90)+45),360)/60):0,f=e.querySelector(".screen");f.innerHTML=`
    <div style="padding:calc(env(safe-area-inset-top,52px) + 4px) 20px 0">
      <div class="mono" style="font-size:10px;color:var(--dim);text-transform:uppercase;letter-spacing:.12em">SUPAFIT</div>
      <div style="font-family:var(--font-display);font-size:clamp(52px,16vw,76px);line-height:.88;color:var(--acid);margin-top:2px">SF.</div>
    </div>

    <div class="sf-stats-grid" style="padding:18px 20px 0">
      ${ce(n,"\u0434\u043D\u0456\u0432 \u043F\u0456\u0434\u0440\u044F\u0434")}
      ${ce(r.length,"\u0442\u0440\u0435\u043D\u0443\u0432\u0430\u043D\u044C")}
      ${ce(qt(l),"\u043A\u0433 \u043E\u0431'\u0454\u043C")}
    </div>

    ${d?`
    <div style="padding:22px 20px 0">
      <div class="mono" style="font-size:10px;color:var(--dim);text-transform:uppercase;letter-spacing:.1em;margin-bottom:10px">\u0421\u042C\u041E\u0413\u041E\u0414\u041D\u0406</div>
      <div class="home-today-card" id="today-card" data-id="${d.id}">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px">
          <div>
            <div style="font-weight:700;font-size:17px">${d.name}</div>
            ${d.description?`<div class="mono" style="font-size:11px;color:var(--dim);margin-top:2px">${d.description}</div>`:""}
          </div>
          <span class="mono" style="font-size:10px;color:var(--acid);background:var(--acid-dim);padding:3px 10px;border-radius:999px;white-space:nowrap">~${c} \u0445\u0432</span>
        </div>
        ${d.exercises.slice(0,5).map((w,D)=>{let Y=a[w.exerciseId];return Y?`
            <div style="display:flex;gap:10px;padding:6px 0;border-top:${D?"1px solid var(--muted)":"none"};align-items:center">
              <span class="mono" style="font-size:10px;color:var(--dim);min-width:20px">${String(D+1).padStart(2,"0")}</span>
              <span style="font-size:13px;font-weight:600;flex:1">${Y.name}</span>
              <span class="mono" style="font-size:11px;color:var(--dim)">${w.sets}\xD7${w.reps??"\u2014"}</span>
            </div>`:""}).join("")}
        ${d.exercises.length>5?`<div class="mono" style="font-size:10px;color:var(--dim);padding-top:4px">+ \u0449\u0435 ${d.exercises.length-5}</div>`:""}
      </div>
      <button class="btn btn-primary btn-xl btn-full" id="btn-start" style="margin-top:14px">
        <svg class="icon icon-lg"><use href="#icon-play"/></svg>
        \u041F\u041E\u0427\u0410\u0422\u0418 \u0422\u0420\u0415\u041D\u0423\u0412\u0410\u041D\u041D\u042F
      </button>
    </div>`:`
    <div style="padding:22px 20px 0">
      <div class="empty-state" style="padding:var(--space-8) 0">
        <div class="empty-state-icon">\u{1F4AA}</div>
        <div class="empty-state-title">\u041D\u0435\u043C\u0430\u0454 \u043F\u043B\u0430\u043D\u0456\u0432</div>
        <p class="text-dim text-sm">\u0421\u0442\u0432\u043E\u0440\u0438 \u043F\u0435\u0440\u0448\u0438\u0439 \u043F\u043B\u0430\u043D \u0442\u0440\u0435\u043D\u0443\u0432\u0430\u043D\u043D\u044F</p>
        <button class="btn btn-primary" id="btn-create">\u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438 \u043F\u043B\u0430\u043D</button>
      </div>
    </div>`}

    ${u?`
    <div style="padding:18px 20px 20px">
      <div class="mono" style="font-size:10px;color:var(--dim);text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px">\u041E\u0421\u0422\u0410\u041D\u041D\u042F \u0421\u0415\u0421\u0406\u042F</div>
      <div style="background:var(--line);border-radius:14px;padding:12px;border:1px solid var(--muted);display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-weight:600;font-size:13px">${u.workoutName}</div>
          <div class="mono" style="font-size:11px;color:var(--dim);margin-top:1px">${M(u.startedAt)} \xB7 ${b(u.totalDuration||0)}</div>
        </div>
        <span class="mono" style="font-size:10px;color:var(--acid);background:var(--acid-dim);padding:3px 8px;border-radius:999px">\u2713</span>
      </div>
    </div>`:""}
  `,(m=f.querySelector("#btn-start"))==null||m.addEventListener("click",()=>{y(`/session/${d.id}`)}),(g=f.querySelector("#btn-create"))==null||g.addEventListener("click",()=>y("/workout/new")),($=f.querySelector("#today-card"))==null||$.addEventListener("click",()=>{d&&y(`/session/${d.id}`)})}function ce(e,t){return`<div class="sf-stat-card"><div class="sf-stat-value">${e}</div><div class="sf-stat-label">${t}</div></div>`}function qt(e){return e>=1e3?(e/1e3).toFixed(1)+"K":Math.round(e).toString()}function ue(){if(document.getElementById("home-styles"))return;let e=document.createElement("style");e.id="home-styles",e.textContent=`
    .home-today-card{background:var(--line);border-radius:20px;padding:16px;border:1px solid var(--muted);cursor:pointer;-webkit-tap-highlight-color:transparent}
    .home-today-card:active{border-color:rgba(198,244,50,0.3)}
  `,document.head.appendChild(e)}async function Xe(e){pe(),e.innerHTML=`
    <div class="screen" style="padding-bottom:var(--nav-height)">
      <div style="display:flex;justify-content:space-between;align-items:center;padding:calc(env(safe-area-inset-top,52px) + 4px) 20px 0">
        <h1 style="font-family:var(--font-display);font-size:34px">\u041F\u041B\u0410\u041D\u0418</h1>
        <button id="btn-new" style="width:40px;height:40px;border-radius:999px;background:var(--acid);border:none;display:flex;align-items:center;justify-content:center;cursor:pointer">
          <svg class="icon" style="color:var(--ink)"><use href="#icon-plus"/></svg>
        </button>
      </div>
      <div id="plans-list" style="padding:20px;display:flex;flex-direction:column;gap:10px">
        <div class="mono" style="font-size:10px;color:var(--dim);text-align:center;padding:var(--space-8) 0">\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F...</div>
      </div>
    </div>`,e.querySelector("#btn-new").addEventListener("click",()=>y("/workout/new")),await Ye(e.querySelector("#plans-list"))}async function Ye(e){let t=await te();if(!t.length){e.innerHTML=`
      <div class="empty-state">
        <div class="empty-state-icon">\u{1F3CB}\uFE0F</div>
        <div class="empty-state-title">\u041D\u0435\u043C\u0430\u0454 \u043F\u043B\u0430\u043D\u0456\u0432</div>
        <p class="text-dim text-sm">\u041D\u0430\u0442\u0438\u0441\u043D\u0438 "+" \u0449\u043E\u0431 \u0441\u0442\u0432\u043E\u0440\u0438\u0442\u0438 \u043F\u0435\u0440\u0448\u0438\u0439 \u043F\u043B\u0430\u043D</p>
      </div>`;return}e.innerHTML=t.map(s=>At(s)).join(""),e.querySelectorAll(".plan-card").forEach(s=>{s.addEventListener("click",()=>y(`/workout/${s.dataset.id}`))}),e.querySelectorAll('[data-action="delete"]').forEach(s=>{s.addEventListener("click",async n=>{if(n.stopPropagation(),!!confirm("\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u0446\u0435\u0439 \u043F\u043B\u0430\u043D?"))try{await He(s.dataset.id),x("\u0412\u0438\u0434\u0430\u043B\u0435\u043D\u043E","success"),await Ye(e)}catch{x("\u041F\u043E\u043C\u0438\u043B\u043A\u0430","error")}})})}function At(e){var i,a;let t=((i=e.exercises)==null?void 0:i.length)||0,s=((a=e.exercises)==null?void 0:a.reduce((r,l)=>r+(l.sets||0),0))||0,n=[`<span class="plan-tag">${t} \u0432\u043F\u0440\u0430\u0432</span>`,`<span class="plan-tag">${s} \u0441\u0435\u0442\u0456\u0432</span>`,...(e.tags||[]).map(r=>`<span class="plan-tag plan-tag-accent">${r}</span>`)].join("");return`
    <div class="plan-card" data-id="${e.id}">
      <div style="flex:1">
        <div style="font-weight:700;font-size:15px">${e.name}</div>
        <div style="font-size:12px;color:var(--dim);margin-top:2px">${t} \u0432\u043F\u0440\u0430\u0432 \xB7 ${s} \u0441\u0435\u0442\u0456\u0432</div>
        <div class="plan-card-tags">${n}</div>
      </div>
      <svg class="icon" style="color:var(--dim);flex-shrink:0"><use href="#icon-chevron-right"/></svg>
    </div>`}function pe(){if(document.getElementById("workouts-styles"))return;let e=document.createElement("style");e.id="workouts-styles",e.textContent="",document.head.appendChild(e)}function Ze(e,t){let s=document.createElement("div");s.style.cssText="position:absolute;inset:0;z-index:200;background:var(--ink);display:flex;flex-direction:column;animation:sfFade .3s ease both;overflow:hidden",s.innerHTML=`
    <div style="display:flex;align-items:center;justify-content:space-between;padding:calc(env(safe-area-inset-top,52px) + 4px) 20px 14px">
      <h2 style="font-family:var(--font-display);font-size:24px">\u041E\u0411\u0420\u0410\u0422\u0418 \u0412\u041F\u0420\u0410\u0412\u0423</h2>
      <button id="picker-close" style="width:36px;height:36px;border-radius:999px;background:var(--muted);border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--paper)">
        <svg class="icon icon-sm"><use href="#icon-x"/></svg>
      </button>
    </div>
    <div style="padding:0 20px 10px">
      <input id="picker-search" type="search" placeholder="\u041F\u043E\u0448\u0443\u043A \u0432\u043F\u0440\u0430\u0432\u0438..."
        style="width:100%;padding:12px 16px;background:var(--line);border:1px solid var(--muted);border-radius:12px;color:var(--paper);font-family:var(--font-sans);font-size:1rem;outline:none"
        autocomplete="off" autocorrect="off"/>
    </div>
    <div id="picker-list" style="flex:1;overflow-y:auto;padding:0 20px 20px"></div>
  `,(document.getElementById("app")||document.body).appendChild(s);let n="";function i(){let a=e;n&&(a=a.filter(d=>d.name.toLowerCase().includes(n.toLowerCase())));let r=s.querySelector("#picker-list");if(!a.length){r.innerHTML='<p class="mono" style="font-size:10px;color:var(--dim);text-align:center;padding:var(--space-8) 0">\u041D\u0456\u0447\u043E\u0433\u043E \u043D\u0435 \u0437\u043D\u0430\u0439\u0434\u0435\u043D\u043E</p>';return}let l={};a.forEach(d=>{l[d.category]||(l[d.category]=[]),l[d.category].push(d)}),r.innerHTML=Object.entries(l).map(([d,u])=>`
      <div style="font-family:var(--font-mono);font-size:10px;color:var(--acid);text-transform:uppercase;letter-spacing:.08em;padding:12px 0 6px;border-bottom:1px solid var(--line)">${K[d]||d}</div>
      ${u.map(c=>`
        <div data-pick-id="${c.id}" style="padding:12px 0;border-bottom:1px solid var(--line);cursor:pointer;display:flex;justify-content:space-between;align-items:center;-webkit-tap-highlight-color:transparent">
          <span style="font-size:14px;font-weight:500">${c.name}</span>
          <svg class="icon" style="color:var(--acid);flex-shrink:0"><use href="#icon-plus"/></svg>
        </div>`).join("")}
    `).join(""),r.querySelectorAll("[data-pick-id]").forEach(d=>{d.addEventListener("click",()=>{s.remove(),t(d.dataset.pickId)})})}s.querySelector("#picker-search").addEventListener("input",a=>{n=a.target.value,i()}),s.querySelector("#picker-close").addEventListener("click",()=>s.remove()),setTimeout(()=>{var a;return(a=s.querySelector("#picker-search"))==null?void 0:a.focus()},300),i()}var ne=[],p=[],O=null,A=-1;async function fe(e,t){O=t.id&&t.id!=="new"?t.id:null,ne=await R();let s=null;O?(s=await G(O),p=s!=null&&s.exercises?s.exercises.map(n=>({...n})):[]):p=[],A=-1,Wt(e,s)}function Wt(e,t){me(),e.innerHTML=`
    <div class="screen" style="padding-bottom:80px">
      <div style="display:flex;align-items:center;gap:10px;padding:calc(env(safe-area-inset-top,52px) + 4px) 20px 0">
        <button id="btn-back" style="background:none;border:none;color:var(--dim);cursor:pointer;padding:4px">
          <svg class="icon icon-lg"><use href="#icon-chevron-left"/></svg>
        </button>
        <span class="mono" style="font-size:10px;color:var(--dim);text-transform:uppercase;letter-spacing:.1em">\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438 \u043F\u043B\u0430\u043D</span>
      </div>

      <div style="padding:8px 20px 0">
        <div id="plan-title" style="font-family:var(--font-display);font-size:30px;margin-bottom:2px">${(t==null?void 0:t.name)||"\u041D\u043E\u0432\u0438\u0439 \u043F\u043B\u0430\u043D"}</div>
        <div id="plan-summary" class="mono" style="font-size:11px;color:var(--dim)"></div>
        <input class="input" id="input-name" type="text" placeholder="\u041D\u0430\u0437\u0432\u0430 \u043F\u043B\u0430\u043D\u0443"
          value="${(t==null?void 0:t.name)||""}" maxlength="80" style="margin-top:10px"/>
      </div>

      <div style="padding:14px 20px;display:flex;flex-direction:column;gap:8px">
        <div class="mono" style="font-size:10px;color:var(--dim);text-transform:uppercase;letter-spacing:.08em">\u0412\u041F\u0420\u0410\u0412\u0418</div>
        <div id="plan-list"></div>
        <button id="btn-open-picker" class="editor-add-btn">
          <svg class="icon" style="color:var(--acid)"><use href="#icon-plus"/></svg>
          \u0414\u043E\u0434\u0430\u0442\u0438 \u0432\u043F\u0440\u0430\u0432\u0443
        </button>
      </div>

      <div style="position:fixed;bottom:calc(var(--nav-height) + var(--safe-bottom));left:50%;transform:translateX(-50%);width:100%;max-width:var(--screen-max);padding:12px 20px;background:rgba(10,10,10,0.95);border-top:1px solid var(--line);backdrop-filter:blur(8px)">
        <button class="btn btn-primary btn-full" id="btn-save" style="height:52px">\u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438</button>
      </div>
    </div>`,H(e,t),e.querySelector("#btn-back").addEventListener("click",J),e.querySelector("#btn-save").addEventListener("click",()=>Mt(e)),e.querySelector("#btn-open-picker").addEventListener("click",()=>{Ze(ne,s=>{zt(s,e,t)})}),e.querySelector("#input-name").addEventListener("input",s=>{let n=e.querySelector("#plan-title");n&&(n.textContent=s.target.value||"\u041D\u043E\u0432\u0438\u0439 \u043F\u043B\u0430\u043D")})}function H(e,t){let s=e.querySelector("#plan-list"),n=e.querySelector("#plan-summary"),i=p.reduce((a,r)=>a+(r.sets||0),0);if(n&&(n.textContent=`${p.length} \u0432\u043F\u0440\u0430\u0432 \xB7 ${i} \u0441\u0435\u0442\u0456\u0432`),!p.length){s.innerHTML='<p class="mono" style="font-size:10px;color:var(--dim);text-align:center;padding:var(--space-4) 0">\u0421\u043F\u0438\u0441\u043E\u043A \u043F\u043E\u0440\u043E\u0436\u043D\u0456\u0439 \u2014 \u0434\u043E\u0434\u0430\u0439 \u0432\u043F\u0440\u0430\u0432\u0438 \u043D\u0438\u0436\u0447\u0435</p>';return}s.innerHTML=p.map((a,r)=>{let l=ne.find(m=>m.id===a.exerciseId);if(!l)return"";let d=r===A,u=a.type==="timed"||a.type==="cardio",c=a.type==="bodyweight",f=u?`${a.sets}\xD7${b(a.durationSec??30)} \xB7 \u0432\u0456\u0434\u043F. ${b(a.restSec??90)}`:c?`${a.sets}\xD7${a.reps??"\u2014"} \xB7 \u0432\u0456\u0434\u043F. ${b(a.restSec??90)}`:`${a.sets}\xD7${a.reps??"\u2014"} \xB7 ${a.weightKg??0}\u043A\u0433 \xB7 \u0432\u0456\u0434\u043F. ${b(a.restSec??90)}`;return`
      <div class="editor-card" data-index="${r}" style="border-color:${d?"rgba(198,244,50,0.25)":"var(--muted)"}">
        <div class="editor-card-header" data-toggle="${r}">
          <div style="flex:1">
            <div style="display:flex;align-items:center;gap:8px">
              <span class="mono" style="font-size:10px;color:var(--dim)">${String(r+1).padStart(2,"0")}</span>
              <span style="font-weight:700;font-size:14px">${l.name}</span>
            </div>
            <div class="mono" style="font-size:11px;color:var(--dim);margin-top:4px">${f}</div>
            ${a.notes?`<div style="font-size:11px;color:var(--dim);margin-top:2px;font-style:italic">${a.notes}</div>`:""}
          </div>
          <svg class="icon" style="color:var(--dim)"><use href="#icon-${d?"x":"chevron-right"}"/></svg>
        </div>
        ${d?`
        <div style="padding:0 14px 14px;border-top:1px solid var(--muted);padding-top:12px;display:flex;flex-direction:column;gap:12px">
          <div style="display:flex;gap:10px;flex-wrap:wrap">
            ${j("\u0421\u0435\u0442\u0456\u0432","sets",r,a.sets??3,1,1)}
            ${u?j("\u0422\u0440\u0438\u0432\u0430\u043B.(\u0441)","duration",r,a.durationSec??30,5,5):c?j("\u041F\u043E\u0432\u0442.","reps",r,a.reps??10,1,0):j("\u041F\u043E\u0432\u0442.","reps",r,a.reps??10,1,0)+j("\u0412\u0430\u0433\u0430","weight",r,a.weightKg??0,2.5,0)}
            ${j("\u0412\u0456\u0434\u043F.(\u0441)","rest",r,a.restSec??90,15,0)}
          </div>
          <input class="input" type="text" data-field="notes" data-index="${r}"
            placeholder="\u041A\u043E\u043C\u0435\u043D\u0442\u0430\u0440 \u0434\u043E \u0432\u043F\u0440\u0430\u0432\u0438..." value="${a.notes||""}"
            style="background:var(--muted);border-color:rgba(255,255,255,0.06)"/>
          <div style="display:flex;gap:6px">
            ${r>0?`<button class="btn btn-dim btn-sm" style="flex:1" data-move-up="${r}">\u2191 \u0412\u0438\u0449\u0435</button>`:'<div style="flex:1"></div>'}
            ${r<p.length-1?`<button class="btn btn-dim btn-sm" style="flex:1" data-move-down="${r}">\u2193 \u041D\u0438\u0436\u0447\u0435</button>`:'<div style="flex:1"></div>'}
          </div>
          <button class="editor-delete-btn" data-remove="${r}">\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u0432\u043F\u0440\u0430\u0432\u0443</button>
        </div>`:""}
      </div>`}).join(""),s.querySelectorAll("[data-toggle]").forEach(a=>{a.addEventListener("click",()=>{let r=Number(a.dataset.toggle);A=A===r?-1:r,H(e,t)})}),s.querySelectorAll(".ms-btn").forEach(a=>{a.addEventListener("click",()=>{let r=Number(a.dataset.idx),l=a.dataset.field,d=parseFloat(a.dataset.step),u=a.dataset.dir==="+"?1:-1,c=parseFloat(a.dataset.min),f=l==="sets"?p[r].sets??3:l==="reps"?p[r].reps??10:l==="weight"?p[r].weightKg??0:l==="duration"?p[r].durationSec??30:p[r].restSec??90,m=Math.max(c,+(f+u*d).toFixed(1));l==="sets"&&(p[r].sets=m),l==="reps"&&(p[r].reps=m),l==="weight"&&(p[r].weightKg=m),l==="duration"&&(p[r].durationSec=m),l==="rest"&&(p[r].restSec=m);let g=a.parentElement.querySelector(".ms-val");g&&(g.textContent=m);let $=e.querySelector("#plan-summary");$&&($.textContent=`${p.length} \u0432\u043F\u0440\u0430\u0432 \xB7 ${p.reduce((w,D)=>w+(D.sets||0),0)} \u0441\u0435\u0442\u0456\u0432`)})}),s.querySelectorAll('[data-field="notes"]').forEach(a=>{a.addEventListener("input",r=>{p[Number(a.dataset.index)].notes=r.target.value})}),s.querySelectorAll("[data-remove]").forEach(a=>{a.addEventListener("click",()=>{p.splice(Number(a.dataset.remove),1),A=-1,H(e,t)})}),s.querySelectorAll("[data-move-up]").forEach(a=>{a.addEventListener("click",()=>{let r=Number(a.dataset.moveUp);[p[r-1],p[r]]=[p[r],p[r-1]],A=r-1,H(e,t)})}),s.querySelectorAll("[data-move-down]").forEach(a=>{a.addEventListener("click",()=>{let r=Number(a.dataset.moveDown);[p[r],p[r+1]]=[p[r+1],p[r]],A=r+1,H(e,t)})})}function j(e,t,s,n,i,a){return`<div class="ms-wrap">
    <span class="ms-label">${e}</span>
    <div class="ms-row">
      <button class="ms-btn" data-idx="${s}" data-field="${t}" data-dir="-" data-step="${i}" data-min="${a}">\u2212</button>
      <span class="ms-val">${n}</span>
      <button class="ms-btn" data-idx="${s}" data-field="${t}" data-dir="+" data-step="${i}" data-min="${a}">+</button>
    </div>
  </div>`}function zt(e,t,s){let n=ne.find(i=>i.id===e);n&&(p.push({exerciseId:n.id,order:p.length,type:n.type||"weighted",sets:n.defaultSets??3,reps:n.defaultReps??null,weightKg:n.defaultWeightKg??0,restSec:n.defaultRestSec??90,durationSec:n.defaultDurationSec??null,notes:n.notes||""}),A=p.length-1,H(t,s))}async function Mt(e){let t=e.querySelector("#input-name").value.trim();if(!t){x("\u0412\u0432\u0435\u0434\u0438 \u043D\u0430\u0437\u0432\u0443 \u043F\u043B\u0430\u043D\u0443","error");return}if(!p.length){x("\u0414\u043E\u0434\u0430\u0439 \u0445\u043E\u0447\u0430 \u0431 \u043E\u0434\u043D\u0443 \u0432\u043F\u0440\u0430\u0432\u0443","error");return}let s={name:t,description:"",tags:[],exercises:p.map((n,i)=>({...n,order:i}))};try{O?await je(O,s):await _e(s),x("\u0417\u0431\u0435\u0440\u0435\u0436\u0435\u043D\u043E \u2713","success"),y("/workouts")}catch{x("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0431\u0435\u0440\u0435\u0436\u0435\u043D\u043D\u044F","error")}}function me(){if(document.getElementById("editor-styles"))return;let e=document.createElement("style");e.id="editor-styles",e.textContent=`
    .editor-card{background:var(--line);border-radius:16px;border:1px solid var(--muted);overflow:hidden;margin-bottom:8px}
    .editor-card-header{padding:14px;display:flex;justify-content:space-between;align-items:center;cursor:pointer;-webkit-tap-highlight-color:transparent}
    .editor-delete-btn{padding:10px;background:transparent;border:1px solid var(--red);border-radius:10px;color:var(--red);font-family:var(--font-mono);font-size:1rem;cursor:pointer;font-weight:600;width:100%}
    .editor-add-btn{padding:14px;background:var(--acid-dim);border:1px dashed rgba(198,244,50,0.3);border-radius:16px;color:var(--acid);font-family:var(--font-sans);font-size:1rem;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;width:100%}
  `,document.head.appendChild(e)}async function Je(e,t){e.innerHTML=`
    <div class="screen" style="padding-bottom:100px">
      <div style="display:flex;align-items:center;gap:10px;padding:calc(env(safe-area-inset-top,52px) + 4px) 20px 0">
        <button id="btn-back" style="background:none;border:none;color:var(--dim);cursor:pointer;padding:4px">
          <svg class="icon icon-lg"><use href="#icon-chevron-left"/></svg>
        </button>
        <span class="mono" style="font-size:10px;color:var(--dim);text-transform:uppercase;letter-spacing:.1em">\u041F\u0435\u0440\u0435\u0434 \u0441\u0442\u0430\u0440\u0442\u043E\u043C</span>
      </div>
      <div id="preview-body" style="padding:12px 20px 0;display:flex;flex-direction:column;gap:16px">
        <p class="mono" style="font-size:11px;color:var(--dim)">\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F...</p>
      </div>
      <div style="position:fixed;bottom:calc(var(--nav-height) + var(--safe-bottom));left:50%;transform:translateX(-50%);width:100%;max-width:var(--screen-max);padding:12px 20px;background:rgba(10,10,10,0.95);border-top:1px solid var(--line);backdrop-filter:blur(8px)">
        <button class="btn btn-primary btn-xl btn-full" id="btn-start" disabled>
          <svg class="icon"><use href="#icon-play"/></svg>
          \u041F\u043E\u0447\u0430\u0442\u0438 \u0442\u0440\u0435\u043D\u0443\u0432\u0430\u043D\u043D\u044F
        </button>
      </div>
    </div>`,e.querySelector("#btn-back").addEventListener("click",J);let[s,n,i]=await Promise.all([G(t.id),R(),Pe(t.id)]),a=e.querySelector("#preview-body"),r=e.querySelector("#btn-start");if(!s){a.innerHTML='<p style="color:var(--red);font-size:14px">\u0422\u0440\u0435\u043D\u0443\u0432\u0430\u043D\u043D\u044F \u043D\u0435 \u0437\u043D\u0430\u0439\u0434\u0435\u043D\u043E</p>';return}let l=Object.fromEntries(n.map(c=>[c.id,c])),d=s.exercises.reduce((c,f)=>c+(f.sets||0),0),u=Math.round(s.exercises.reduce((c,f)=>c+(f.sets||0)*((f.restSec||60)+45),360)/60);a.innerHTML=`
    <!-- Title -->
    <div>
      <div style="font-family:var(--font-display);font-size:clamp(28px,10vw,44px);line-height:.9;text-transform:uppercase;margin-bottom:10px">${s.name}</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">
        <span class="tag tag-accent">~${u} \u0445\u0432</span>
        <span class="tag">${s.exercises.length} \u0432\u043F\u0440\u0430\u0432</span>
        <span class="tag">${d} \u0441\u0435\u0442\u0456\u0432</span>
        ${(s.tags||[]).map(c=>`<span class="tag">${c}</span>`).join("")}
      </div>
    </div>

    <!-- Last session -->
    ${i?`
    <div style="background:var(--line);border:1px solid var(--muted);border-radius:16px;padding:14px">
      <div class="mono" style="font-size:9px;color:var(--dim);text-transform:uppercase;letter-spacing:.1em;margin-bottom:8px">\u041C\u0438\u043D\u0443\u043B\u043E\u0433\u043E \u0440\u0430\u0437\u0443</div>
      <div style="display:flex;justify-content:space-between;align-items:center">
        <span style="font-size:13px;font-weight:600">${M(i.startedAt)}</span>
        <span class="mono" style="font-size:12px;color:var(--acid)">${b(i.totalDuration||0)}</span>
      </div>
    </div>`:""}

    <!-- Exercise list -->
    <div>
      <div class="mono" style="font-size:10px;color:var(--dim);text-transform:uppercase;letter-spacing:.08em;margin-bottom:10px">\u041F\u0440\u043E\u0433\u0440\u0430\u043C\u0430</div>
      ${s.exercises.map((c,f)=>{let m=l[c.exerciseId];if(!m)return"";let g=i?It(i,c.exerciseId):"";return`
          <div style="padding:12px 0;border-bottom:1px solid var(--line);display:flex;gap:12px;align-items:flex-start">
            <span class="mono" style="font-size:10px;color:var(--dim);min-width:20px;padding-top:2px">${String(f+1).padStart(2,"0")}</span>
            <div style="flex:1">
              <div style="font-size:14px;font-weight:700">${m.name}</div>
              <div class="mono" style="font-size:11px;color:var(--dim);margin-top:3px">
                ${c.sets} \u0441\u0435\u0442\u0456\u0432 \xB7 ${c.reps??"\u2014"} \u043F\u043E\u0432\u0442.${c.weightKg?" \xB7 "+de(c.weightKg):""} \xB7 \u0432\u0456\u0434\u043F. ${c.restSec??90}\u0441
              </div>
              ${g}
            </div>
          </div>`}).join("")}
    </div>

    <!-- Structure -->
    <div style="background:var(--line);border:1px solid var(--muted);border-radius:16px;padding:14px">
      <div class="mono" style="font-size:9px;color:var(--dim);text-transform:uppercase;letter-spacing:.1em;margin-bottom:12px">\u0421\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430</div>
      <div style="display:flex;flex-direction:column;gap:10px">
        ${ae("icon-fire","var(--orange)","\u0420\u043E\u0437\u043C\u0438\u043D\u043A\u0430","3 \u0445\u0432")}
        ${ae("icon-dumbbell","var(--acid)","\u0422\u0440\u0435\u043D\u0443\u0432\u0430\u043D\u043D\u044F",`${s.exercises.length} \u0432\u043F\u0440\u0430\u0432`)}
        ${ae("icon-snow","var(--ltblue)","\u0417\u0430\u043C\u0438\u043D\u043A\u0430","3 \u0445\u0432")}
        ${ae("icon-chart","var(--dim)","\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430","\u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0438")}
      </div>
    </div>
  `,r.disabled=!1,r.addEventListener("click",()=>y(`/session/${t.id}/active`))}function It(e,t){var a,r;let s=(a=e.exercises)==null?void 0:a.find(l=>l.exerciseId===t);if(!((r=s==null?void 0:s.sets)!=null&&r.length))return"";let n=s.sets[s.sets.length-1],i=[];return n.reps&&i.push(`${n.reps} \u043F\u043E\u0432\u0442.`),n.weightKg&&i.push(de(n.weightKg)),i.length?`<div class="mono" style="font-size:10px;color:var(--acid);margin-top:4px">\u2191 \u041C\u0438\u043D\u0443\u043B\u043E\u0433\u043E: ${i.join(" \xD7 ")}</div>`:""}function ae(e,t,s,n){return`
    <div style="display:flex;align-items:center;gap:10px">
      <svg class="icon" style="color:${t};flex-shrink:0"><use href="#${e}"/></svg>
      <span style="font-size:13px;font-weight:600;flex:1">${s}</span>
      <span class="mono" style="font-size:11px;color:var(--dim)">${n}</span>
    </div>`}var W=class{constructor(t,s=0){this.mode=t,this.initialSec=s,this.elapsed=0,this._running=!1,this._paused=!1,this._startTs=null,this._rafId=null,this._tickCb=null,this._completeCb=null}onTick(t){return this._tickCb=t,this}onComplete(t){return this._completeCb=t,this}get isRunning(){return this._running&&!this._paused}get isPaused(){return this._paused}get isStopped(){return!this._running}get elapsedSec(){return this.elapsed}start(){this._running&&!this._paused||(this._paused?(this._paused=!1,this._startTs=performance.now()):(this.elapsed=0,this._running=!0,this._paused=!1,this._startTs=performance.now()),this._tick())}pause(){!this._running||this._paused||(this._accumulateElapsed(),this._paused=!0,cancelAnimationFrame(this._rafId))}stop(){return this._accumulateElapsed(),this._running=!1,this._paused=!1,cancelAnimationFrame(this._rafId),this._fire(),this.elapsed}reset(){this.stop(),this.elapsed=0,this._running=!1,this._paused=!1}_accumulateElapsed(){this._startTs!==null&&(this.elapsed+=(performance.now()-this._startTs)/1e3,this._startTs=null)}_tick(){this._rafId=requestAnimationFrame(()=>{var n;if(!this._running||this._paused)return;let t=performance.now(),s=this.elapsed+(t-this._startTs)/1e3;if(this.mode==="countdown"){let i=Math.max(0,this.initialSec-s);if(this._fireWith(s,i),i<=0){this._accumulateElapsed(),this._running=!1,(n=this._completeCb)==null||n.call(this);return}}else this._fireWith(s,null);this._tick()})}_fireWith(t,s){var l;let n=s!==null?s:t,i=Math.floor(n/60),a=Math.floor(n%60),r=`${String(i).padStart(2,"0")}:${String(a).padStart(2,"0")}`;(l=this._tickCb)==null||l.call(this,{display:r,elapsed:t,remaining:s})}_fire(){let t=this.elapsed,s=this.mode==="countdown"?Math.max(0,this.initialSec-t):null;this._fireWith(t,s)}};var z=220,ge=10,ve=(z-ge)/2,U=2*Math.PI*ve;function ie(e,t){let s=Math.min(1,Math.max(0,e)),n=U-s*U;return`
    <div class="ring-wrap">
      <svg width="${z}" height="${z}">
        <circle cx="${z/2}" cy="${z/2}" r="${ve}"
          stroke="var(--muted)" stroke-width="${ge}" fill="none"/>
        <circle cx="${z/2}" cy="${z/2}" r="${ve}"
          stroke="${t}" stroke-width="${ge}" fill="none"
          stroke-linecap="round"
          stroke-dasharray="${U.toFixed(2)}"
          stroke-dashoffset="${n.toFixed(2)}"
          class="ring-progress"
          style="transition:stroke-dashoffset .8s ease"/>
      </svg>
      <div class="ring-inner" id="ring-inner"></div>
    </div>`}function V(e,t,s){let n=e.querySelector(".ring-progress");if(!n)return;let i=Math.min(1,Math.max(0,t));n.setAttribute("stroke-dashoffset",(U-i*U).toFixed(2)),s&&n.setAttribute("stroke",s)}function Qe(e,t){let s=e.exercises.slice(0,4).map((n,i)=>{let a=t[n.exerciseId],l=n.type==="timed"||n.type==="cardio"?`${n.sets}\xD7${n.durationSec??30}\u0441`:`${n.sets}\xD7${n.reps??"\u2014"}`;return a?`
      <div style="display:flex;gap:10px;padding:5px 0;border-top:${i?"1px solid var(--line)":"none"};align-items:center">
        <span class="mono" style="font-size:10px;color:var(--dim);min-width:20px">${String(i+1).padStart(2,"0")}</span>
        <span style="font-size:13px;font-weight:600;flex:1">${a.name}</span>
        <span class="mono" style="font-size:11px;color:var(--dim)">${l}</span>
      </div>`:""}).join("");return`
    <div style="position:absolute;inset:0;background:var(--ink);display:flex;flex-direction:column;align-items:center;overflow:auto">
      <div style="padding:calc(env(safe-area-inset-top,52px) + 4px) 24px 0;text-align:center;width:100%;position:relative">
        <button id="btn-exit" style="position:absolute;top:max(14px,env(safe-area-inset-top,52px));left:20px;background:none;border:none;color:var(--dim);cursor:pointer;padding:4px">
          <svg class="icon icon-lg"><use href="#icon-x"/></svg>
        </button>
        <svg class="icon icon-xl" style="color:var(--orange);margin-bottom:10px;display:block;margin-left:auto;margin-right:auto"><use href="#icon-fire"/></svg>
        <div class="mono" style="font-size:10px;color:var(--dim);text-transform:uppercase;letter-spacing:.1em;margin-bottom:4px">\u0424\u0430\u0437\u0430 1 / 3</div>
        <h1 style="font-family:var(--font-display);font-size:44px;line-height:.9">\u0420\u041E\u0417\u041C\u0418\u041D\u041A\u0410</h1>
        <p style="font-size:13px;color:var(--dim);margin-top:6px">\u041B\u0435\u0433\u043A\u0435 \u043A\u0430\u0440\u0434\u0456\u043E, \u0440\u0443\u0445\u043B\u0438\u0432\u0456\u0441\u0442\u044C \u0441\u0443\u0433\u043B\u043E\u0431\u0456\u0432</p>
      </div>
      <div style="flex:1;display:flex;align-items:center;justify-content:center">
        ${ie(0,"var(--orange)")}
      </div>
      <div style="width:100%;padding:0 20px">
        <div class="mono" style="font-size:10px;color:var(--dim);text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px">\u0421\u044C\u043E\u0433\u043E\u0434\u043D\u0456</div>
        ${s}
      </div>
      <div style="width:100%;padding:20px">
        <button class="btn btn-ghost btn-full" id="btn-skip-warmup" style="height:52px">
          <svg class="icon icon-sm"><use href="#icon-skip"/></svg>
          \u041F\u0440\u043E\u043F\u0443\u0441\u0442\u0438\u0442\u0438
        </button>
      </div>
    </div>`}function et(e,t,s,n){let i=e.exercises[n],a=t[i.exerciseId],r=s[n]||[],l=e.exercises.length,d=i.reps??10,u=i.weightKg??0,c=i.type==="timed"||i.type==="cardio",f=i.type==="bodyweight",m=c?`<div style="text-align:center;padding:8px 20px">
        <div class="mono" style="font-size:10px;color:var(--dim);text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px">\u0426\u0406\u041B\u042C</div>
        <div style="font-family:var(--font-display);font-size:48px;color:var(--acid);line-height:1">${b(i.durationSec??30)}</div>
      </div>`:`<div style="display:flex;gap:16px;justify-content:center;padding:12px 20px">
        ${f?"":`<div class="sf-stepper">
          <span class="sf-stepper-label">\u0412\u0410\u0413\u0410</span>
          <div class="sf-stepper-row">
            <button class="sf-stepper-btn" id="btn-wt-dec">\u2212</button>
            <div><span class="sf-stepper-val" id="val-weight">${u}</span><span class="sf-stepper-unit">\u043A\u0433</span></div>
            <button class="sf-stepper-btn" id="btn-wt-inc">+</button>
          </div>
        </div>`}
        <div class="sf-stepper">
          <span class="sf-stepper-label">\u041F\u041E\u0412\u0422</span>
          <div class="sf-stepper-row">
            <button class="sf-stepper-btn" id="btn-reps-dec">\u2212</button>
            <span class="sf-stepper-val" id="val-reps">${d}</span>
            <button class="sf-stepper-btn" id="btn-reps-inc">+</button>
          </div>
        </div>
      </div>`;return`
    <div style="position:absolute;inset:0;background:var(--ink);display:flex;flex-direction:column;overflow:auto">
      <div class="sf-top-bar">
        <div class="sf-top-bar-left">
          <button id="btn-exit" style="background:none;border:none;color:var(--dim);cursor:pointer;padding:4px">
            <svg class="icon"><use href="#icon-chevron-left"/></svg>
          </button>
          <span class="mono" style="font-size:10px;color:var(--dim);text-transform:uppercase;letter-spacing:.1em">${(a==null?void 0:a.category)??""}</span>
        </div>
        <div class="sf-top-bar-right">
          <span id="total-time">00:00</span> \xB7 ${n+1}/${l}
        </div>
      </div>

      <div style="text-align:center;padding:0 20px 10px">
        <h2 style="font-family:var(--font-display);font-size:clamp(22px,7vw,30px);text-transform:uppercase;line-height:.9">${(a==null?void 0:a.name)??"\u2014"}</h2>
      </div>

      <div style="display:flex;justify-content:center;padding:0 20px">
        ${ie(r.length/(i.sets||1),"var(--acid)")}
      </div>

      ${m}

      <div class="sf-set-log" id="set-log">
        ${ye(r,i.sets,!1)}
      </div>

      ${i.notes?`<p style="font-size:12px;color:var(--dim);text-align:center;font-style:italic;margin:8px 20px;padding:4px 8px;background:var(--line);border-radius:10px">${i.notes}</p>`:""}

      <div style="padding:12px 20px 28px;display:flex;gap:12px;flex-direction:column;margin-top:auto">
        <button class="btn btn-primary btn-xl btn-full" id="btn-start-set">
          <svg class="icon icon-lg"><use href="#icon-play"/></svg>
          \u0421\u0422\u0410\u0420\u0422
        </button>
        <div style="display:none;gap:12px" id="active-controls">
          <button id="btn-pause" style="width:72px;height:72px;border-radius:999px;background:var(--muted);border:1px solid rgba(255,255,255,0.08);color:var(--paper);display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0">
            <svg class="icon icon-lg"><use href="#icon-pause"/></svg>
          </button>
          <button class="btn btn-danger btn-full" id="btn-stop-set" style="height:72px;font-size:15px">
            <svg class="icon icon-lg"><use href="#icon-stop"/></svg>
            \u0421\u0422\u041E\u041F
          </button>
        </div>
      </div>
    </div>`}function ye(e,t,s){return Array.from({length:t},(n,i)=>{let a=e[i],r=i===e.length,l=a?"var(--acid)":r?"var(--paper)":"var(--dim)",d="";if(a){let u=a.reps!==null&&a.reps!==void 0,c=a.weightKg!==null&&a.weightKg!==void 0&&a.weightKg>0,f=u?c?`${a.reps}\xD7${a.weightKg}\u043A\u0433`:`${a.reps} \u043F\u043E\u0432\u0442.`:"";d=`<svg class="icon icon-sm" style="color:var(--acid)"><use href="#icon-check"/></svg>
        <span class="mono" style="font-size:11px;color:var(--dim)">${h(a.durationSec)}</span>
        ${f?`<span class="mono" style="font-size:11px;color:var(--dim)">${f}</span>`:""}`}else r?d=`<span class="mono" style="font-size:11px;color:var(--acid)">${s?"\u25CF \u0410\u041A\u0422\u0418\u0412\u041D\u0418\u0419":"\u25B8 \u0413\u041E\u0422\u041E\u0412\u0418\u0419"}</span>`:d='<span class="mono" style="font-size:11px;color:var(--muted)">\u2014</span>';return`<div class="sf-set-row ${r?"is-current":""}">
      <span class="sf-set-name" style="color:${l}">\u0421\u0435\u0442 ${i+1}</span>
      <div style="display:flex;gap:8px;align-items:center;flex:1">${d}</div>
    </div>`}).join("")}function tt(e,t,s){let n=t?"\u0412\u0406\u0414\u041F\u041E\u0427\u0418\u041D\u041E\u041A \u041C\u0406\u0416 \u0412\u041F\u0420\u0410\u0412\u0410\u041C\u0418":"\u0412\u0406\u0414\u041F\u041E\u0427\u0418\u041D\u041E\u041A",i=s?`
    <div style="width:100%;padding:0 24px;margin-bottom:14px">
      <div style="background:var(--line);border-radius:16px;padding:14px;border:1px solid var(--muted)">
        <div class="mono" style="font-size:10px;color:var(--dim);text-transform:uppercase;margin-bottom:4px;letter-spacing:.08em">${t?"\u041D\u0430\u0441\u0442\u0443\u043F\u043D\u0430 \u0432\u043F\u0440\u0430\u0432\u0430":"\u041D\u0430\u0441\u0442\u0443\u043F\u043D\u0438\u0439 \u0441\u0435\u0442"}</div>
        <div style="font-weight:700;font-size:14px">${s.name}</div>
        <div class="mono" style="font-size:12px;color:var(--dim);margin-top:2px">${s.detail}</div>
      </div>
    </div>`:"";return`
    <div style="position:absolute;inset:0;background:var(--ink);display:flex;flex-direction:column;align-items:center">
      <div style="padding:calc(env(safe-area-inset-top,52px) + 4px) 24px 0;text-align:center;position:relative;width:100%">
        <button id="btn-exit" style="position:absolute;top:max(14px,env(safe-area-inset-top,52px));left:20px;background:none;border:none;color:var(--dim);cursor:pointer;padding:4px">
          <svg class="icon icon-lg"><use href="#icon-x"/></svg>
        </button>
        <div class="mono" style="font-size:11px;color:var(--dim);text-transform:uppercase;letter-spacing:.1em">${n}</div>
      </div>
      <div style="flex:1;display:flex;align-items:center;justify-content:center">
        ${ie(0,"var(--blue)")}
      </div>
      ${i}
      <div style="width:100%;padding:0 20px 28px;display:flex;gap:12px">
        <button id="btn-pause" style="width:72px;height:72px;border-radius:999px;background:var(--muted);border:1px solid rgba(255,255,255,0.06);color:var(--paper);display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0">
          <svg class="icon"><use href="#icon-pause"/></svg>
        </button>
        <button class="btn btn-orange btn-full" id="btn-skip-rest" style="height:72px">
          <svg class="icon icon-sm"><use href="#icon-skip"/></svg>
          \u041F\u0440\u043E\u043F\u0443\u0441\u0442\u0438\u0442\u0438
        </button>
      </div>
    </div>`}function st(){return`
    <div style="position:absolute;inset:0;background:var(--ink);display:flex;flex-direction:column;align-items:center">
      <div style="padding:calc(env(safe-area-inset-top,52px) + 4px) 24px 0;text-align:center;position:relative;width:100%">
        <button id="btn-exit" style="position:absolute;top:max(14px,env(safe-area-inset-top,52px));left:20px;background:none;border:none;color:var(--dim);cursor:pointer;padding:4px">
          <svg class="icon icon-lg"><use href="#icon-x"/></svg>
        </button>
        <svg class="icon icon-xl" style="color:var(--ltblue);margin-bottom:10px;display:block;margin-left:auto;margin-right:auto"><use href="#icon-snow"/></svg>
        <div class="mono" style="font-size:10px;color:var(--dim);text-transform:uppercase;letter-spacing:.1em;margin-bottom:4px">\u0424\u0430\u0437\u0430 3 / 3</div>
        <h1 style="font-family:var(--font-display);font-size:44px;line-height:.9">\u0417\u0410\u041C\u0418\u041D\u041A\u0410</h1>
        <p style="font-size:13px;color:var(--dim);margin-top:6px">\u0420\u043E\u0437\u0442\u044F\u0436\u043A\u0430, \u0433\u043B\u0438\u0431\u043E\u043A\u0435 \u0434\u0438\u0445\u0430\u043D\u043D\u044F</p>
      </div>
      <div style="flex:1;display:flex;align-items:center;justify-content:center">
        ${ie(0,"var(--ltblue)")}
      </div>
      <div style="width:100%;padding:0 20px 28px">
        <button class="btn btn-ghost btn-full" id="btn-skip-cooldown" style="height:52px">
          <svg class="icon icon-sm"><use href="#icon-skip"/></svg>
          \u041F\u0440\u043E\u043F\u0443\u0441\u0442\u0438\u0442\u0438
        </button>
      </div>
    </div>`}function nt(){return`
    <div class="exit-modal-overlay" id="exit-modal">
      <div class="exit-modal-box">
        <div class="exit-modal-icon">
          <svg class="icon icon-lg"><use href="#icon-x"/></svg>
        </div>
        <h3 style="font-family:var(--font-display);font-size:22px;margin-bottom:6px">\u0417\u0410\u0412\u0415\u0420\u0428\u0418\u0422\u0418?</h3>
        <p style="font-size:13px;color:var(--dim);line-height:1.5;margin-bottom:20px">\u041F\u0440\u043E\u0433\u0440\u0435\u0441 \u043F\u043E\u0442\u043E\u0447\u043D\u043E\u0433\u043E \u0442\u0440\u0435\u043D\u0443\u0432\u0430\u043D\u043D\u044F \u0431\u0443\u0434\u0435 \u0432\u0442\u0440\u0430\u0447\u0435\u043D\u043E</p>
        <div style="display:flex;flex-direction:column;gap:10px">
          <button class="btn btn-danger btn-full" id="btn-exit-confirm" style="height:52px">\u0422\u0430\u043A, \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u0438</button>
          <button class="btn btn-sec btn-full" id="btn-exit-cancel" style="height:52px">\u041F\u0440\u043E\u0434\u043E\u0432\u0436\u0438\u0442\u0438</button>
        </div>
      </div>
    </div>`}function at(){if(document.getElementById("session-styles"))return;let e=document.createElement("style");e.id="session-styles",e.textContent="",document.head.appendChild(e)}function k(e,t,s,n){let i=e.querySelector("#ring-inner");i&&(i.innerHTML=`
    <div class="ring-timer" style="color:${s}">${t}</div>
    ${n?`<div class="ring-sublabel">${n}</div>`:""}`)}function he(e,t){let s=e.querySelector("#total-time");s&&(s.textContent=h(t))}function it(e,t){var n,i,a,r;let s=(l,d,u)=>{let c=e.querySelector(l);if(!c)return;let f=u?parseFloat(c.textContent):parseInt(c.textContent,10),m=Math.max(0,u?+(f+d).toFixed(1):f+d);c.textContent=m,l==="#val-reps"&&(t.reps=m),l==="#val-weight"&&(t.wt=m)};(n=e.querySelector("#btn-reps-inc"))==null||n.addEventListener("click",()=>s("#val-reps",1,!1)),(i=e.querySelector("#btn-reps-dec"))==null||i.addEventListener("click",()=>s("#val-reps",-1,!1)),(a=e.querySelector("#btn-wt-inc"))==null||a.addEventListener("click",()=>s("#val-weight",.5,!0)),(r=e.querySelector("#btn-wt-dec"))==null||r.addEventListener("click",()=>s("#val-weight",-.5,!0))}function ot(e,t,s){return e.exercises.map((n,i)=>{let a=t[n.exerciseId],r=s[i],l=r.reduce((d,u)=>d+(u.durationSec||0),0);return{exerciseId:n.exerciseId,exerciseName:(a==null?void 0:a.name)||"\u0412\u043F\u0440\u0430\u0432\u0430",sets:r,totalDurationSec:l,avgSetDurationSec:r.length?Math.round(l/r.length):0}})}function xe(e,t){return`<div class="sf-stat-card"><div class="sf-stat-value">${e}</div><div class="sf-stat-label">${t}</div></div>`}function rt(e,t,s){let n=t.reduce((l,d)=>l+d.sets.length,0),i=t.reduce((l,d)=>l+d.sets.reduce((u,c)=>u+(c.reps||0)*(c.weightKg||0),0),0),a=b(s),r=t.map(l=>{let d=l.sets.every(g=>!g.weightKg),u=d&&l.sets.every(g=>!g.reps),c=d?0:l.sets.reduce((g,$)=>g+($.reps||0)*($.weightKg||0),0),f=l.sets.map(g=>{let $=[`${g.setNumber} \u0441\u0435\u0442`];return u||$.push(`${g.reps} \u043F\u043E\u0432\u0442.`),d||$.push(`${g.weightKg} \u043A\u0433`),$.push(h(g.durationSec||0)),`<div class="mono" style="font-size:11px;color:var(--dim);padding:4px 0;border-top:1px solid var(--muted)">${$.join(" \xB7 ")}</div>`}).join(""),m=[];return c>0&&m.push(`\u041E\u0431'\u0454\u043C ${Math.round(c)} \u043A\u0433`),m.push(`\u0427\u0430\u0441 ${b(l.totalDurationSec)}`),`
      <div style="background:var(--line);border-radius:14px;padding:12px;margin-bottom:8px;border:1px solid var(--muted)">
        <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:2px">
          <div style="font-weight:700;font-size:13px">${l.exerciseName}</div>
          <div class="mono" style="font-size:10px;color:var(--dim)">\u0421\u0435\u0442\u0456\u0432: ${l.sets.length}</div>
        </div>
        ${f}
        <div style="display:flex;gap:12px;margin-top:6px;padding-top:6px;border-top:1px solid var(--muted)">
          ${m.map(g=>`<span class="mono" style="font-size:10px;color:var(--acid)">${g}</span>`).join("")}
        </div>
      </div>`}).join("");return`
    <div style="position:absolute;inset:0;background:var(--ink);display:flex;flex-direction:column;overflow:auto;padding-bottom:calc(var(--nav-height) + var(--safe-bottom))">
      <div style="padding:calc(env(safe-area-inset-top,52px) + 4px) 24px 0;text-align:center">
        <div class="finish-checkmark">
          <svg class="icon icon-xl" style="color:var(--ink)"><use href="#icon-check"/></svg>
        </div>
        <div class="mono" style="font-size:10px;color:var(--acid);text-transform:uppercase;letter-spacing:.1em;margin-bottom:6px">\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E</div>
        <h1 style="font-family:var(--font-display);font-size:clamp(34px,11vw,48px);line-height:.9">${e}</h1>
      </div>
      <div class="sf-stats-grid" style="padding:24px 20px">
        ${xe(a,"\u0422\u0440\u0438\u0432\u0430\u043B\u0456\u0441\u0442\u044C")}
        ${xe(n,"\u0421\u0435\u0442\u0456\u0432")}
        ${xe(i>0?Math.round(i)+" \u043A\u0433":"\u2014","\u041E\u0431'\u0454\u043C")}
      </div>
      <div style="padding:0 20px">
        <div class="mono" style="font-size:10px;color:var(--dim);text-transform:uppercase;letter-spacing:.08em;margin-bottom:10px">\u041F\u043E \u0432\u043F\u0440\u0430\u0432\u0430\u0445</div>
        ${r}
      </div>
      <div style="padding:20px;margin-top:auto">
        <button class="btn btn-primary btn-xl btn-full" id="btn-finish">
          <svg class="icon icon-lg"><use href="#icon-home"/></svg>
          \u041D\u0410 \u0413\u041E\u041B\u041E\u0412\u041D\u0423
        </button>
      </div>
    </div>`}var be=180,Se=180,o=null;function Kt(){o={phase:"warmup",workout:null,exerciseMap:{},sessionId:null,currentExIdx:0,goTo:null,completedSets:[],setStartedAt:null,timer:null,container:null,reps:0,wt:0,duration:0,tt:0,ttInterval:null}}async function ft(e,t){at(),Kt(),o.container=e,ee(),Ge();let[s,n]=await Promise.all([G(t.id),R()]);if(!s){x("\u0422\u0440\u0435\u043D\u0443\u0432\u0430\u043D\u043D\u044F \u043D\u0435 \u0437\u043D\u0430\u0439\u0434\u0435\u043D\u043E","error"),y("/workouts");return}o.workout=s,o.exerciseMap=Object.fromEntries(n.map(a=>[a.id,a])),o.completedSets=s.exercises.map(()=>[]);let i=await Be(s.id,s.name);o.sessionId=i.id,Gt(),_t()}function Gt(){o.ttInterval=setInterval(()=>{o.tt++,he(o.container,o.tt)},1e3)}function mt(){clearInterval(o.ttInterval),o.ttInterval=null}function _t(){var e;o.phase="warmup",o.container.innerHTML=Qe(o.workout,o.exerciseMap),oe(),(e=o.container.querySelector("#btn-skip-warmup"))==null||e.addEventListener("click",lt),k(o.container,h(be),"var(--orange)","\u0417\u0410\u041B\u0418\u0428\u0418\u041B\u041E\u0421\u042C"),o.timer=new W("countdown",be),o.timer.onTick(({remaining:t})=>{V(o.container,1-t/be,"var(--orange)"),k(o.container,h(t),"var(--orange)","\u0417\u0410\u041B\u0418\u0428\u0418\u041B\u041E\u0421\u042C")}),o.timer.onComplete(lt),o.timer.start()}function lt(){X(),gt(0)}function gt(e){var s;o.phase="ready",o.currentExIdx=e,o.goTo=null;let t=o.workout.exercises[e];o.reps=t.reps??10,o.wt=t.weightKg??0,o.duration=t.durationSec??30,o.container.innerHTML=et(o.workout,o.exerciseMap,o.completedSets,e),he(o.container,o.tt),k(o.container,"00:00","var(--acid)",`\u0421\u0435\u0442 ${o.completedSets[e].length+1}/${t.sets}`),oe(),it(o.container,o),(s=o.container.querySelector("#btn-start-set"))==null||s.addEventListener("click",jt)}function jt(){var r,l;o.phase="active",o.setStartedAt=Date.now();let e=o.container.querySelector("#btn-start-set"),t=o.container.querySelector("#active-controls");e==null||e.style.setProperty("display","none"),t&&(t.style.display="flex");let s=o.workout.exercises[o.currentExIdx],n=o.completedSets[o.currentExIdx],i=s.type==="timed"||s.type==="cardio",a=o.duration;o.container.querySelector("#set-log").innerHTML=ye(n,s.sets,!0),i?(k(o.container,h(a),"var(--acid)",`\u0421\u0435\u0442 ${n.length+1}/${s.sets}`),o.timer=new W("countdown",a),o.timer.onTick(({remaining:d})=>{V(o.container,1-d/a,"var(--acid)"),k(o.container,h(d),"var(--acid)",`\u0421\u0435\u0442 ${n.length+1}/${s.sets}`)}),o.timer.onComplete(dt)):(o.timer=new W("stopwatch"),o.timer.onTick(({elapsed:d})=>{k(o.container,h(d),"var(--acid)",`\u0421\u0435\u0442 ${n.length+1}/${s.sets}`)})),o.timer.start(),(r=o.container.querySelector("#btn-pause"))==null||r.addEventListener("click",vt),(l=o.container.querySelector("#btn-stop-set"))==null||l.addEventListener("click",dt)}function vt(){var n,i,a;if(!o.timer)return;let e=o.timer.isPaused,t=((n=o.container.querySelector(".ring-timer"))==null?void 0:n.textContent)||"00:00";if(e){o.timer.start();let r=o.phase==="rest"?"var(--blue)":"var(--acid)";(i=o.container.querySelector(".ring-progress"))==null||i.setAttribute("stroke",r)}else if(o.timer.pause(),(a=o.container.querySelector(".ring-progress"))==null||a.setAttribute("stroke","var(--paper)"),o.phase==="rest")k(o.container,t,"var(--paper)","\u041F\u0410\u0423\u0417\u0410");else if(o.phase==="active"){let r=o.workout.exercises[o.currentExIdx],l=o.completedSets[o.currentExIdx];k(o.container,t,"var(--paper)",`\u0421\u0435\u0442 ${l.length+1}/${r==null?void 0:r.sets}`)}let s=o.container.querySelector("#btn-pause svg use");s&&s.setAttribute("href",e?"#icon-pause":"#icon-play")}function dt(){var l,d,u;let e=Math.round(((l=o.timer)==null?void 0:l.stop())??0);X();let t=o.workout.exercises[o.currentExIdx],s=t.type==="timed"||t.type==="cardio",n=t.type==="bodyweight",i=s?null:parseInt((d=o.container.querySelector("#val-reps"))==null?void 0:d.textContent,10)||o.reps,a=s||n?null:parseFloat((u=o.container.querySelector("#val-weight"))==null?void 0:u.textContent)||o.wt;if(o.completedSets[o.currentExIdx].push({setNumber:o.completedSets[o.currentExIdx].length+1,startedAt:o.setStartedAt,endedAt:Date.now(),durationSec:e,reps:i,weightKg:a,rpe:null,notes:""}),o.completedSets[o.currentExIdx].length>=t.sets){let c=o.currentExIdx+1;c<o.workout.exercises.length?ct(180,c):Ht()}else ct(t.restSec??90,null)}function ct(e,t){var i,a;o.phase="rest",o.goTo=t;let s=t!==null,n=null;if(s){let r=o.workout.exercises[t],l=o.exerciseMap[r==null?void 0:r.exerciseId];l&&(n={name:l.name,detail:`${r.sets}\xD7${r.reps} \xB7 ${r.weightKg??0} \u043A\u0433`})}else{let r=o.workout.exercises[o.currentExIdx],d=r.type==="timed"||r.type==="cardio"?h(o.duration):`${o.reps} \u043F\u043E\u0432\u0442 \xB7 ${o.wt} \u043A\u0433`;n={name:`\u0421\u0435\u0442 ${o.completedSets[o.currentExIdx].length+1} / ${r.sets}`,detail:d}}o.container.innerHTML=tt(e,s,n),oe(),k(o.container,h(e),"var(--blue)",""),o.timer=new W("countdown",e),o.timer.onTick(({remaining:r})=>{V(o.container,1-r/e,"var(--blue)"),k(o.container,h(r),"var(--blue)","")}),o.timer.onComplete(ut),o.timer.start(),(i=o.container.querySelector("#btn-pause"))==null||i.addEventListener("click",vt),(a=o.container.querySelector("#btn-skip-rest"))==null||a.addEventListener("click",ut)}function ut(){X();let e=o.goTo;o.goTo=null,gt(e!==null?e:o.currentExIdx)}function Ht(){var e;o.phase="cooldown",o.container.innerHTML=st(),oe(),k(o.container,h(Se),"var(--ltblue)","\u0417\u0410\u041B\u0418\u0428\u0418\u041B\u041E\u0421\u042C"),(e=o.container.querySelector("#btn-skip-cooldown"))==null||e.addEventListener("click",pt),o.timer=new W("countdown",Se),o.timer.onTick(({remaining:t})=>{V(o.container,1-t/Se,"var(--ltblue)"),k(o.container,h(t),"var(--ltblue)","\u0417\u0410\u041B\u0418\u0428\u0418\u041B\u041E\u0421\u042C")}),o.timer.onComplete(pt),o.timer.start()}async function pt(){var t;X(),mt(),o.phase="finish";let e=ot(o.workout,o.exerciseMap,o.completedSets);await Fe(o.sessionId,e),o.container.innerHTML=rt(o.workout.name,e,o.tt),E(),(t=o.container.querySelector("#btn-finish"))==null||t.addEventListener("click",()=>y("/"))}function oe(){var e;(e=o.container.querySelector("#btn-exit"))==null||e.addEventListener("click",Pt)}function Pt(){var e,t;o.container.querySelector("#exit-modal")||(o.container.insertAdjacentHTML("beforeend",nt()),(e=o.container.querySelector("#btn-exit-confirm"))==null||e.addEventListener("click",Bt),(t=o.container.querySelector("#btn-exit-cancel"))==null||t.addEventListener("click",()=>{var s;(s=o.container.querySelector("#exit-modal"))==null||s.remove()}))}function Bt(){X(),mt(),Oe(o.sessionId).catch(()=>{}),E(),y("/")}function X(){var e;(e=o.timer)==null||e.stop(),o.timer=null}async function yt(e){e.innerHTML=`
    <div class="screen" style="padding-bottom:var(--nav-height)">
      <div style="padding:calc(env(safe-area-inset-top,52px) + 4px) 20px 0">
        <h1 style="font-family:var(--font-display);font-size:34px;line-height:.9">\u0406\u0421\u0422\u041E\u0420\u0406\u042F</h1>
      </div>
      <div id="history-body" style="padding:16px 20px 0">
        <div class="mono" style="font-size:10px;color:var(--dim);text-align:center;padding:var(--space-8) 0">\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F...</div>
      </div>
    </div>`;let t=await q();xt(e.querySelector("#history-body"),t)}function xt(e,t){let s=t.filter(i=>i.status==="completed");if(!s.length){e.innerHTML=`
      <div class="empty-state">
        <svg class="icon icon-xl" style="opacity:.3"><use href="#icon-calendar"/></svg>
        <div class="empty-state-title">\u041D\u0435\u043C\u0430\u0454 \u0437\u0430\u043F\u0438\u0441\u0456\u0432</div>
        <p class="mono" style="font-size:11px;color:var(--dim)">\u0412\u0438\u043A\u043E\u043D\u0430\u0439 \u043F\u0435\u0440\u0448\u0435 \u0442\u0440\u0435\u043D\u0443\u0432\u0430\u043D\u043D\u044F</p>
      </div>`;return}let n=Ot(s);e.innerHTML=`
    ${Nt(new Date,n)}
    <div class="stagger" style="display:flex;flex-direction:column;gap:8px;margin-top:16px">
      ${s.map(i=>Ft(i)).join("")}
    </div>`,e.querySelectorAll("[data-delete]").forEach(i=>{i.addEventListener("click",async a=>{a.stopPropagation();let r=i.dataset.delete;if(confirm("\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u0446\u0435\u0439 \u0437\u0430\u043F\u0438\u0441?"))try{await Ue(r),x("\u0412\u0438\u0434\u0430\u043B\u0435\u043D\u043E","success"),xt(e,await q())}catch{x("\u041F\u043E\u043C\u0438\u043B\u043A\u0430","error")}})})}function Nt(e,t){let s=e.getFullYear(),n=e.getMonth(),i=new Date(s,n,1),a=new Date(s,n+1,0),r=(i.getDay()+6)%7,l=e.toLocaleDateString("uk-UA",{month:"long",year:"numeric"}),d=["\u041F\u043D","\u0412\u0442","\u0421\u0440","\u0427\u0442","\u041F\u0442","\u0421\u0431","\u041D\u0434"].map(f=>`<div style="text-align:center;font-family:var(--font-mono);font-size:9px;color:var(--dim)">${f}</div>`).join(""),u=Array.from({length:r},()=>'<div style="aspect-ratio:1"></div>').join(""),c="";for(let f=1;f<=a.getDate();f++){let m=`${s}-${String(n+1).padStart(2,"0")}-${String(f).padStart(2,"0")}`,g=t.has(m);c+=`<div class="mini-cal-day ${g?"active":"inactive"}">
      <span>${f}</span>
      ${g?'<div class="mini-cal-dot"></div>':""}
    </div>`}return`
    <div style="background:var(--line);border-radius:14px;padding:12px;border:1px solid var(--muted)">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
        <span class="mono" style="font-size:11px;font-weight:700;text-transform:capitalize">${l}</span>
        <svg class="icon icon-sm" style="color:var(--dim)"><use href="#icon-calendar"/></svg>
      </div>
      <div class="mini-cal-grid">${d}${u}${c}</div>
    </div>`}function Ft(e){var i,a;let t=((i=e.exercises)==null?void 0:i.reduce((r,l)=>{var d;return r+(((d=l.sets)==null?void 0:d.length)||0)},0))||0,s=((a=e.exercises)==null?void 0:a.reduce((r,l)=>r+Q(l.sets||[]),0))||0,n=s>0?`${Math.round(s)} \u043A\u0433`:null;return`
    <div style="background:var(--line);border-radius:14px;padding:14px;border:1px solid var(--muted)" class="animate-reveal">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">
        <div>
          <div style="font-weight:700;font-size:14px;margin-bottom:2px">${e.workoutName}</div>
          <div class="mono" style="font-size:10px;color:var(--dim)">${M(e.startedAt)}</div>
        </div>
        <button style="background:none;border:none;color:var(--dim);cursor:pointer;padding:4px;-webkit-tap-highlight-color:transparent" data-delete="${e.id}">
          <svg class="icon icon-sm"><use href="#icon-trash"/></svg>
        </button>
      </div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">
        <span class="tag"><svg class="icon icon-sm" style="margin-right:2px"><use href="#icon-timer"/></svg>${b(e.totalDuration||0)}</span>
        <span class="tag">${t} \u0441\u0435\u0442\u0456\u0432</span>
        ${n?`<span class="tag tag-accent">${n}</span>`:""}
      </div>
    </div>`}function Ot(e){let t=new Map;return e.forEach(s=>{let n=s.dateKey||B(s.startedAt);t.has(n)||t.set(n,[]),t.get(n).push(s)}),t}async function ht(e){Xt(),e.innerHTML=`
    <div class="screen" style="padding-bottom:var(--nav-height)">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:calc(env(safe-area-inset-top,52px) + 4px) 20px 0">
        <h1 style="font-family:var(--font-display);font-size:34px;line-height:.9">\u0412\u041F\u0420\u0410\u0412\u0418</h1>
        <button class="btn btn-primary btn-sm" id="btn-new-ex">
          <svg class="icon icon-sm"><use href="#icon-plus"/></svg> \u041D\u043E\u0432\u0430
        </button>
      </div>

      <div style="padding:12px 20px 0;display:flex;gap:6px;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none" id="cat-filters">
        <span class="tag tag-accent" data-cat="" style="cursor:pointer;white-space:nowrap;flex-shrink:0">\u0412\u0441\u0456</span>
        ${Object.entries(K).map(([l,d])=>`<span class="tag" data-cat="${l}" style="cursor:pointer;white-space:nowrap;flex-shrink:0">${d}</span>`).join("")}
      </div>

      <div style="padding:10px 20px 0">
        <input class="input" id="ex-search" type="search" placeholder="\u041F\u043E\u0448\u0443\u043A \u0432\u043F\u0440\u0430\u0432\u0438..." autocomplete="off"/>
      </div>

      <div id="ex-list" class="stagger" style="padding:10px 20px 0"></div>
    </div>`;let t=await R(),s="",n="",i=e.querySelector("#ex-list"),a=e.querySelector("#ex-search");function r(){let l=t;s&&(l=l.filter(d=>d.category===s)),n&&(l=l.filter(d=>d.name.toLowerCase().includes(n.toLowerCase()))),l.sort((d,u)=>d.name.localeCompare(u.name,"uk")),i.innerHTML=l.map(d=>Ut(d)).join("")||'<p class="mono" style="font-size:11px;color:var(--dim);text-align:center;padding:var(--space-8) 0">\u041D\u0456\u0447\u043E\u0433\u043E \u043D\u0435 \u0437\u043D\u0430\u0439\u0434\u0435\u043D\u043E</p>',Vt(i,t,r)}e.querySelector("#cat-filters").addEventListener("click",l=>{let d=l.target.closest("[data-cat]");d&&(s=d.dataset.cat,e.querySelectorAll("[data-cat]").forEach(u=>{u.className=`tag ${u.dataset.cat===s?"tag-accent":""}`,u.style.cssText="cursor:pointer;white-space:nowrap;flex-shrink:0"}),r())}),a.addEventListener("input",l=>{n=l.target.value,r()}),e.querySelector("#btn-new-ex").addEventListener("click",()=>{bt(null,async l=>{await De(l),t=await R(),x("\u0412\u043F\u0440\u0430\u0432\u0443 \u0434\u043E\u0434\u0430\u043D\u043E \u2713","success"),r()})}),r()}function Ut(e){let t=K[e.category]||e.category;return`
    <div class="card" style="margin-bottom:8px" data-id="${e.id}">
      <div style="display:flex;justify-content:space-between;align-items:flex-start">
        <div style="flex:1;min-width:0">
          <div style="font-weight:700;font-size:14px;margin-bottom:4px">
            ${e.name}${e.isCustom?' <span class="tag tag-dim" style="font-size:9px;vertical-align:middle">\u0432\u043B\u0430\u0441\u043D\u0430</span>':""}
          </div>
          <div style="display:flex;gap:4px;flex-wrap:wrap">
            <span class="tag tag-dim">${t}</span>
            ${e.muscleGroups.filter(s=>s!==e.category).slice(0,2).map(s=>`<span class="tag">${ze[s]||s}</span>`).join("")}
          </div>
        </div>
        ${e.isCustom?`
          <div style="display:flex;gap:4px;flex-shrink:0;margin-left:8px">
            <button class="btn btn-ghost btn-icon btn-sm" data-edit="${e.id}">
              <svg class="icon icon-sm"><use href="#icon-edit"/></svg>
            </button>
            <button class="btn btn-ghost btn-icon btn-sm" style="color:var(--red)" data-delete="${e.id}">
              <svg class="icon icon-sm"><use href="#icon-trash"/></svg>
            </button>
          </div>`:""}
      </div>
      <div class="mono" style="font-size:10px;color:var(--dim);margin-top:8px">
        ${e.defaultSets} \xD7 ${e.defaultReps??"\u2014"} \xB7 \u0432\u0456\u0434\u043F. ${e.defaultRestSec}\u0441${e.notes?" \xB7 "+e.notes:""}
      </div>
    </div>`}function Vt(e,t,s){e.querySelectorAll("[data-edit]").forEach(n=>{n.addEventListener("click",i=>{i.stopPropagation();let a=t.find(r=>r.id===n.dataset.edit);a&&bt(a,async r=>{await Te(a.id,r);let l=t.findIndex(d=>d.id===a.id);l!==-1&&(t[l]={...t[l],...r}),x("\u0417\u0431\u0435\u0440\u0435\u0436\u0435\u043D\u043E \u2713","success"),s()})})}),e.querySelectorAll("[data-delete]").forEach(n=>{n.addEventListener("click",async i=>{i.stopPropagation(),confirm("\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u0446\u044E \u0432\u043F\u0440\u0430\u0432\u0443?")&&(await Le(n.dataset.delete),t.splice(t.findIndex(a=>a.id===n.dataset.delete),1),x("\u0412\u0438\u0434\u0430\u043B\u0435\u043D\u043E","success"),s())})})}function bt(e,t){let s=!!e,n=document.createElement("div");n.className="ex-form-overlay",n.innerHTML=`
    <div class="ex-form-sheet animate-reveal-up">
      <div style="width:2.5rem;height:4px;border-radius:9999px;background:var(--muted);margin:0 auto var(--space-3)"></div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
        <strong style="font-size:16px">${s?"\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438 \u0432\u043F\u0440\u0430\u0432\u0443":"\u041D\u043E\u0432\u0430 \u0432\u043F\u0440\u0430\u0432\u0430"}</strong>
        <button class="btn btn-ghost btn-icon btn-sm" id="close-form">
          <svg class="icon icon-sm"><use href="#icon-x"/></svg>
        </button>
      </div>
      <label class="input-label">\u041D\u0430\u0437\u0432\u0430</label>
      <input class="input" id="nf-name" type="text" placeholder="\u041D\u0430\u0437\u0432\u0430 \u0432\u043F\u0440\u0430\u0432\u0438" value="${(e==null?void 0:e.name)||""}" style="margin-bottom:12px"/>
      <label class="input-label">\u0422\u0438\u043F</label>
      <select class="select" id="nf-type" style="margin-bottom:12px">
        ${Object.entries(We).map(([d,u])=>`<option value="${d}" ${((e==null?void 0:e.type)||"weighted")===d?"selected":""}>${u}</option>`).join("")}
      </select>
      <label class="input-label">\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u044F</label>
      <select class="select" id="nf-cat" style="margin-bottom:12px">
        ${Object.entries(K).map(([d,u])=>`<option value="${d}" ${(e==null?void 0:e.category)===d?"selected":""}>${u}</option>`).join("")}
      </select>
      <div style="display:flex;gap:8px;margin-bottom:12px">
        <div style="flex:1"><label class="input-label">\u0421\u0435\u0442\u0438</label>
          <input class="input" id="nf-sets" type="number" value="${(e==null?void 0:e.defaultSets)??3}" min="1" max="20" inputmode="numeric"/></div>
        <div style="flex:1" id="nf-reps-wrap"><label class="input-label">\u041F\u043E\u0432\u0442.</label>
          <input class="input" id="nf-reps" type="number" value="${(e==null?void 0:e.defaultReps)??10}" min="1" max="999" inputmode="numeric"/></div>
        <div style="flex:1" id="nf-dur-wrap" style="display:none"><label class="input-label">\u0422\u0440\u0438\u0432\u0430\u043B\u0456\u0441\u0442\u044C (\u0441)</label>
          <input class="input" id="nf-dur" type="number" value="${(e==null?void 0:e.defaultDurationSec)??30}" min="5" max="3600" inputmode="numeric"/></div>
        <div style="flex:1"><label class="input-label">\u0412\u0456\u0434\u043F.(\u0441)</label>
          <input class="input" id="nf-rest" type="number" value="${(e==null?void 0:e.defaultRestSec)??90}" min="0" max="600" inputmode="numeric"/></div>
      </div>
      <label class="input-label">\u041D\u043E\u0442\u0430\u0442\u043A\u0438</label>
      <input class="input" id="nf-notes" type="text" placeholder="\u041F\u0456\u0434\u043A\u0430\u0437\u043A\u0438, \u0442\u0435\u0445\u043D\u0456\u043A\u0430..." value="${(e==null?void 0:e.notes)||""}" style="margin-bottom:20px"/>
      <button class="btn btn-primary btn-xl btn-full" id="save-ex">${s?"\u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438 \u0437\u043C\u0456\u043D\u0438":"\u0414\u043E\u0434\u0430\u0442\u0438 \u0432\u043F\u0440\u0430\u0432\u0443"}</button>
    </div>`,(document.getElementById("app")||document.body).appendChild(n);let i=n.querySelector("#nf-type"),a=n.querySelector("#nf-reps-wrap"),r=n.querySelector("#nf-dur-wrap"),l=()=>{let d=i.value==="timed"||i.value==="cardio";a.style.display=d?"none":"flex",r.style.display=d?"flex":"none"};i.addEventListener("change",l),l(),n.querySelector("#close-form").addEventListener("click",()=>n.remove()),n.addEventListener("click",d=>{d.target===n&&n.remove()}),n.querySelector("#save-ex").addEventListener("click",async()=>{let d=n.querySelector("#nf-name").value.trim();if(!d){x("\u0412\u0432\u0435\u0434\u0438 \u043D\u0430\u0437\u0432\u0443","error");return}let u=i.value,c=u==="timed"||u==="cardio";await t({name:d,category:n.querySelector("#nf-cat").value,type:u,defaultSets:Number(n.querySelector("#nf-sets").value)||3,defaultReps:c?null:Number(n.querySelector("#nf-reps").value)||null,defaultDurationSec:c?Number(n.querySelector("#nf-dur").value)||30:null,defaultRestSec:Number(n.querySelector("#nf-rest").value)||90,notes:n.querySelector("#nf-notes").value.trim(),muscleGroups:(e==null?void 0:e.muscleGroups)||[]}),n.remove()}),setTimeout(()=>{var d;return(d=n.querySelector("#nf-name"))==null?void 0:d.focus()},300)}function Xt(){if(document.getElementById("ex-lib-styles"))return;let e=document.createElement("style");e.id="ex-lib-styles",e.textContent=`
    .ex-form-overlay { position:absolute;inset:0;background:rgba(0,0,0,0.7);z-index:200;display:flex;align-items:flex-end; }
    .ex-form-sheet { width:100%;background:#111;border-top:1px solid var(--muted);border-radius:var(--radius-xl) var(--radius-xl) 0 0;padding:var(--space-4) var(--space-5) calc(var(--safe-bottom) + var(--space-6));max-height:85dvh;overflow-y:auto; }
    #cat-filters::-webkit-scrollbar { display:none }
  `,document.head.appendChild(e)}var Yt=[{label:"\u041E\u0434\u0438\u043D\u0438\u0446\u0456 \u0432\u0438\u043C\u0456\u0440\u0443",icon:"icon-edit"},{label:"\u0427\u0430\u0441 \u0432\u0456\u0434\u043F\u043E\u0447\u0438\u043D\u043A\u0443",icon:"icon-timer"},{label:"\u0417\u0432\u0443\u043A \u0442\u0430 \u0432\u0456\u0431\u0440\u0430\u0446\u0456\u044F",icon:"icon-skip"},{label:"\u0415\u043A\u0441\u043F\u043E\u0440\u0442 \u0434\u0430\u043D\u0438\u0445",icon:"icon-chart"}];async function St(e){let[t,s]=await Promise.all([q(),se()]),n=t.filter(l=>l.status==="completed"),i=n.reduce((l,d)=>l+(d.exercises||[]).reduce((u,c)=>u+Q(c.sets||[]),0),0),r=(n.reduce((l,d)=>l+(d.totalDuration||0),0)/3600).toFixed(1).replace(".0","");e.innerHTML=`
    <div class="screen" style="padding-bottom:var(--nav-height)">

      <div style="padding:calc(env(safe-area-inset-top,52px) + 16px) 20px 0;text-align:center">
        <div class="profile-avatar">
          <span style="font-family:var(--font-display);font-size:28px;color:var(--ink);line-height:1">SF</span>
        </div>
        <h1 style="font-family:var(--font-display);font-size:34px;line-height:.9;margin-top:6px">\u041F\u0420\u041E\u0424\u0406\u041B\u042C</h1>
        <p class="mono" style="font-size:10px;color:var(--dim);margin-top:4px;letter-spacing:.06em">SUPAFAST FITESS \xB7 v1.0</p>
      </div>

      <div style="padding:20px" class="stagger">
        <div class="sf-stats-grid-2">
          ${re(n.length,"\u0422\u0440\u0435\u043D\u0443\u0432\u0430\u043D\u044C")}
          ${re(s,"\u0421\u0435\u0440\u0456\u044F \u0434\u043D\u0456\u0432")}
          ${re(Math.round(i).toLocaleString("uk-UA"),"\u041E\u0431'\u0454\u043C \u043A\u0433")}
          ${re(r,"\u0413\u043E\u0434\u0438\u043D")}
        </div>
      </div>

      <div style="padding:0 20px 20px;display:flex;flex-direction:column;gap:6px">
        <div class="mono" style="font-size:9px;color:var(--dim);text-transform:uppercase;letter-spacing:.1em;margin-bottom:4px">\u041D\u0430\u043B\u0430\u0448\u0442\u0443\u0432\u0430\u043D\u043D\u044F</div>
        ${Yt.map(l=>`
          <div class="settings-row">
            <div style="display:flex;align-items:center;gap:10px">
              <svg class="icon icon-sm" style="color:var(--dim)"><use href="#${l.icon}"/></svg>
              <span style="font-size:13px;font-weight:500">${l.label}</span>
            </div>
            <svg class="icon icon-sm" style="color:var(--dim)"><use href="#icon-chevron-right"/></svg>
          </div>`).join("")}
      </div>

    </div>`}function re(e,t){return`
    <div class="sf-stat-card">
      <div class="sf-stat-value">${e}</div>
      <div class="sf-stat-label">${t}</div>
    </div>`}async function Zt(){try{await le(),await qe(Ae),await Qt(),ue(),pe(),me(),Ie(),Ke(),Jt(),Ce(),es()}catch(e){console.error("[app] Boot failed:",e),ts(e)}}function Jt(){let e=document.getElementById("screen");C("/",async()=>{E(),await Ve(e)}),C("/workouts",async()=>{E(),await Xe(e)}),C("/workout/new",async()=>{E(),await fe(e,{id:"new"})}),C("/workout/:id",async t=>{E(),await fe(e,t)}),C("/session/:id",async t=>{E(),await Je(e,t)}),C("/session/:id/active",async t=>{ee(),await ft(e,t)}),C("/history",async()=>{E(),await yt(e)}),C("/exercises",async()=>{E(),await ht(e)}),C("/profile",async()=>{E(),await St(e)})}function x(e,t="info",s=2500){let n=document.getElementById("toasts");if(!n)return;let i=document.createElement("div");i.className=`toast toast-${t}`,i.textContent=e,n.appendChild(i),setTimeout(()=>{i.style.animation="toast-out 250ms ease forwards",setTimeout(()=>i.remove(),260)},s)}async function Qt(){try{let t=await(await fetch("./assets/icons.svg")).text(),s=document.createElement("div");s.style.display="none",s.innerHTML=t,document.body.insertBefore(s,document.body.firstChild)}catch{console.warn("[app] SVG sprite failed to load")}}function es(){let e=document.getElementById("splash");e&&requestAnimationFrame(()=>{setTimeout(()=>e.classList.add("hidden"),200)})}function ts(e){document.body.innerHTML=`
    <div style="
      display: flex; flex-direction: column; align-items: center;
      justify-content: center; min-height: 100dvh; padding: 2rem;
      font-family: monospace; color: #f5f5f0; text-align: center;">
      <div style="font-size: 3rem; margin-bottom: 1rem;">\u26A0\uFE0F</div>
      <div style="font-size: 1.2rem; margin-bottom: 0.5rem;">\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u043F\u0443\u0441\u043A\u0443</div>
      <div style="color: #ff4444; font-size: 0.8rem;">${e.message}</div>
      <button onclick="location.reload()"
        style="margin-top: 2rem; padding: 0.75rem 2rem; background: #c6f432;
               color: #0a0a0a; border: none; border-radius: 9999px; cursor: pointer;
               font-weight: 700; font-family: monospace;">
        \u041F\u0435\u0440\u0435\u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0438\u0442\u0438
      </button>
    </div>
  `}Zt();})();
