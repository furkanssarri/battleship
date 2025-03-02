(()=>{"use strict";const t=(t,e,n,o)=>{let a=0;return{length:t,direction:e,startRow:n,startCol:o,getHits:()=>a,hit:()=>{++a},isSunk:()=>a>=t}},e=e=>{const n=Array.from({length:e},(()=>Array(e).fill(null))),o=[],a=(t,e)=>n[t][e],r=(t,e)=>null!==a(t,e),l=(t,e)=>{const a=n[t][e];return Number.isInteger(a)?o[a]:void 0};return{placeShip:(a,l,s,i)=>{if(!((t,n,o,a)=>{if("horizontal"===a&&n+o>e)return!1;if("vertical"===a&&t+o>e)return!1;for(let e=0;e<o;e++)if(r("vertical"===a?t+e:t,"horizontal"===a?n+e:n))return!1;return!0})(a,l,s,i))throw new Error("Invalid placement: Out of bounds or overlapping.");const d=t(s,i,a,l),c=o.length;o.push(d);for(let t=0;t<s;t++){const e="horizontal"===i?l+t:l;n["vertical"===i?a+t:a][e]=c}},getCell:a,hasShip:r,getShip:l,getAllShips:()=>[...o],receiveAttack:(t,e)=>{let o=a(t,e);if(null===o)return n[t][e]="X","X";if(Number.isInteger(o)){const o=l(t,e);if(o)return o.hit(),n[t][e]="H","H"}return console.log("Cell already attacked... Skipping..."),"Cell already attacked... Skipping..."},isAllShipsSunken:()=>o.every((t=>t.isSunk())),getGrid:()=>n,getShipPositions:()=>o.map((({startRow:t,startCol:e,length:n,direction:o})=>({startRow:t,startCol:e,length:n,direction:o}))),getShipIndex:(t,e)=>o.find((n=>{const{startRow:o,startCol:a,length:r,direction:l}=n;return"horizontal"===l?t===o&&e>=a&&e<a+r:e===a&&t>=o&&t<o+r}))||void 0}},n=t=>({name:t,ownBoard:e(10)}),o=t=>{const e=t.ownBoard.getGrid().length;return{placeShipManually:(e,n,o,a)=>{try{return t.ownBoard.placeShip(e,n,o,a),!0}catch(t){return console.log(t.message),!1}},placeShipsRandomly:n=>{n.forEach((n=>{let o=!1,a=0;for(;!o&&a<100;){const r=Math.random()<.5?"horizontal":"vertical",l=Math.floor(Math.random()*e),s=Math.floor(Math.random()*e);try{t.ownBoard.placeShip(l,s,n.ship.length,r),o=!0}catch(t){a++,a>=100&&console.log(`Failed to place ${n.type} after 100 attempts. Skipping...`)}}}))}}},a=(()=>{let t="hunt",e=null,n=[];const o=new Set;let a=null,r=null,l=0;return{getState:()=>t,setState:e=>t=e,getLastHit:()=>e,setLastHit:t=>e=t,addPotentialTargets:t=>n.push(...t),getNextTarget:()=>n.length>0?n.shift():null,clearPotentialTargets:()=>n=[],getPotentialTargets:()=>[...n],markCellAsAttacked:(t,e)=>o.add(`${t}, ${e}`),hasCellBeenAttacked:(t,e)=>o.has(`${t}, ${e}`),getShipOrientation:()=>a,setShipOrientation:t=>a=t,getAttackDirection:()=>r,setAttackDirection:t=>r=t,getCurrentShipLength:()=>l,setCurrentShipLength:t=>l=t,resetCurrentShipLength:()=>l=0}})(),r=n("player-1"),l=n("player-2"),s=(()=>{let t="horizontal";return{getVesselOrientation:()=>t,setVesselOrientation:e=>t=e,swapVesselOrientation:()=>t="horizontal"===t?"vertical":"horizontal"}})();let i=0;const d=[{type:"Battleship",ship:t(5)},{type:"Destroyer",ship:t(4)},{type:"Submarine",ship:t(4)},{type:"Carrier",ship:t(3)},{type:"Boat",ship:t(2)}],c=t=>{const{setState:e,setLastHit:n,setShipOrientation:o,clearPotentialTargets:a}=t;e("hunt"),n(null),o(null),a()},h=(t,e,n)=>{const{addPotentialTargets:o,getShipOrientation:a,hasCellBeenAttacked:r}=t;if("horizontal"===a()){let t=n-1;for(;t>=0&&!r(e,t);)o([{row:e,col:t}]),t--;let a=n+1;for(;a<10&&!r(e,a);)o([{row:e,col:a}]),a++}else if("vertical"===a()){let t=e-1;for(;t>=0&&!r(t,n);)o([{row:t,col:n}]),t--;let a=e+1;for(;a<10&&!r(a,n);)o([{row:a,col:n}]),a++}},p=(t,e)=>[{row:t-1,col:e},{row:t+1,col:e},{row:t,col:e-1},{row:t,col:e+1}].filter((({row:t,col:e})=>t>=0&&t<10&&e>=0&&e<10)),u=()=>({randomRow:Math.floor(10*Math.random()),randomCol:Math.floor(10*Math.random())}),m=(t,e)=>{const n=g.getCurrentPlayer()===r?l:r,o=n.ownBoard.receiveAttack(t,e);f(t,e,n.name,o),n.ownBoard.isAllShipsSunken()&&v(),g.swapTurns();const s=g.getCurrentPlayer();return k(s),s===l&&setTimeout((()=>{(t=>{const e=g.getCurrentPlayer()===r?l:r,{getState:n}=t;"hunt"===n()?((t,e)=>{const{setState:n,setLastHit:o,getLastHit:a,addPotentialTargets:r,hasCellBeenAttacked:l,markCellAsAttacked:s}=t;let i,d;do{({randomRow:i,randomCol:d}=u())}while(l(i,d));const h=m(i,d);if(s(i,d),"H"===h){const a=e.ownBoard.getShipIndex(i,d);a&&a.isSunk()?c(t):(n("target"),o({row:i,col:d}),r(p(i,d)))}})(t,e):"target"===n()&&((t,e)=>{const{getNextTarget:n,getLastHit:o,setShipOrientation:a,getShipOrientation:r,hasCellBeenAttacked:l,markCellAsAttacked:s,getAttackDirection:i,setAttackDirection:d,getCurrentShipLength:p,setCurrentShipLength:u,resetCurrentShipLength:g}=t;let S;do{S=n()}while(null!==S&&l(S.row,S.col));if(null!==S){const{row:n,col:l}=S,y=m(n,l);if(s(n,l),"H"===y){const s=e.ownBoard.getShipIndex(n,l);if(s&&s.isSunk())c(t),g();else{if(null===r()){const{row:t,col:e}=o();n===t?a("horizontal"):l===e&&a("vertical")}u(p()+1),h(t,n,l)}}else if("X"===y){const e=i();d("right"===e?"left":"left"===e?"right":"up"===e?"down":"up"),h(t,n,l)}}else c(t),g()})(t,e)})(a)}),50),o},g=(()=>{let t=r;return{swapTurns:()=>t=t===r?l:r,getCurrentPlayer:()=>t,isPlayerTurn:e=>e===t}})(),S=t=>{const e=document.getElementById(t.name),n=document.getElementById(`${t.name}-popup`),o=t.ownBoard.getGrid().length,a=e=>{if(e)for(let n=0;n<o;n++)for(let a=0;a<o;a++){const o=e.querySelector(`[data-row="${n}"][data-col="${a}"]`),r=t.ownBoard.hasShip(n,a);"player-2"!=t.name&&r&&o.classList.add("ship")}};a(e),a(n)},y=(t,e,n=null)=>{const o=t.ownBoard.getGrid().length,a=n||t.name,r=document.createElement("div");r.classList.add("game-board"),r.id=a;for(let n=0;n<o;n++){const a=document.createElement("div");a.classList.add("column");for(let r=0;r<o;r++){const o=document.createElement("div");o.classList.add("cell"),o.dataset.row=r,o.dataset.col=n;const l=t.ownBoard.hasShip(r,n);"player-2"!==t.name&&l&&o.classList.add("ship"),o.addEventListener("mousedown",(o=>{0===o.button?e(r,n,t,"left"):2===o.button&&e(r,n,t,"right")})),o.addEventListener("contextmenu",(t=>{t.preventDefault()})),a.appendChild(o)}r.appendChild(a)}return r},C=t=>S(t),w=(t,e)=>{t=Number(t),e=Number(e),m(t,e)},f=(t,e,n,o)=>((t,e,n,o)=>{const a=((t,e,n)=>document.getElementById(n).querySelector(`[data-row="${t}"][data-col="${e}"]`))(t,e,n);"H"===o?(a.classList.remove("ship"),a.classList.add("hit")):"X"===o&&a.classList.add("miss"),a.classList.add("disabled")})(t,e,n,o),v=()=>{(()=>{const t=document.createElement("div");t.classList.add("overlay");const e=document.createElement("div");e.classList.add("announcement-card");const n=document.createElement("h2");n.textContent="Game Over";const o=document.createElement("button");o.textContent="Close",o.addEventListener("click",(()=>{document.getElementById("root").removeChild(t)})),e.appendChild(n),e.appendChild(o),t.appendChild(e),document.getElementById("root").appendChild(t)})()},L=()=>(()=>{const t=document.querySelector(".overlay");document.getElementById("root").removeChild(t)})(),k=t=>(t=>{const e=document.querySelector("#player-1"),n=document.querySelector("#player-2");"player-1"===t.name?(e.classList.add("disabled"),n.classList.remove("disabled")):"player-2"===t.name&&(n.classList.add("disabled"),e.classList.remove("disabled"))})(t);((t,e)=>{const n=document.createElement("div");n.classList.add("container");const o=y(t,w),a=y(e,w);n.append(o,a),document.getElementById("root").appendChild(n)})(r,l),(t=>{const e=document.createElement("div");e.classList.add("overlay");const n=document.createElement("div");n.classList.add("place-ships");const a=document.createElement("p");a.textContent="Place your ships",n.appendChild(a);const l=y(t,((t,e,n,a)=>((t,e,n,a)=>{"right"===a?s.swapVesselOrientation():(((t,e)=>{let n=s.getVesselOrientation();const a=o(r);if(i<d.length){const o=d[i];a.placeShipManually(t,e,o.ship.length,n)&&(C(r),i++)}i===d.length&&L()})(t,e),S(n))})(t,e,n,a)),`${t.name}-popup`);n.appendChild(l);const c=document.createElement("button");c.textContent="Close",c.addEventListener("click",(()=>{document.getElementById("root").removeChild(e)})),n.appendChild(c),e.appendChild(n),document.getElementById("root").appendChild(e)})(r),o(l).placeShipsRandomly(d)})();
//# sourceMappingURL=main.bundle.js.map