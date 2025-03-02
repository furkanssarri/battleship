(()=>{"use strict";const t=(t,e,n,o)=>{let a=0;return{length:t,direction:e,startRow:n,startCol:o,getHits:()=>a,hit:()=>{++a},isSunk:()=>a>=t}},e=e=>{const n=Array.from({length:e},(()=>Array(e).fill(null))),o=[],a=(t,e)=>n[t][e],l=(t,e)=>null!==a(t,e),r=(t,e)=>{const a=n[t][e];return Number.isInteger(a)?o[a]:void 0};return{placeShip:(a,r,i,s)=>{if(!((t,n,o,a)=>{if("horizontal"===a&&n+o>e)return!1;if("vertical"===a&&t+o>e)return!1;for(let e=0;e<o;e++)if(l("vertical"===a?t+e:t,"horizontal"===a?n+e:n))return!1;return!0})(a,r,i,s))throw new Error("Invalid placement: Out of bounds or overlapping.");const d=t(i,s,a,r),c=o.length;o.push(d);for(let t=0;t<i;t++){const e="horizontal"===s?r+t:r;n["vertical"===s?a+t:a][e]=c}},getCell:a,hasShip:l,getShip:r,getAllShips:()=>[...o],receiveAttack:(t,e)=>{let o=a(t,e);if(null===o)return n[t][e]="X","X";if(Number.isInteger(o)){const o=r(t,e);if(o)return o.hit(),n[t][e]="H","H"}return console.log("Cell already attacked... Skipping..."),"Cell already attacked... Skipping..."},isAllShipsSunken:()=>o.every((t=>t.isSunk())),getGrid:()=>n,getShipPositions:()=>o.map((({startRow:t,startCol:e,length:n,direction:o})=>({startRow:t,startCol:e,length:n,direction:o}))),getShipIndex:(t,e)=>o.find((n=>{const{startRow:o,startCol:a,length:l,direction:r}=n;return"horizontal"===r?t===o&&e>=a&&e<a+l:e===a&&t>=o&&t<o+l}))||void 0}},n=t=>({name:t,ownBoard:e(10)}),o=t=>{const e=t.ownBoard.getGrid().length;return{placeShipManually:(e,n,o,a)=>{try{return t.ownBoard.placeShip(e,n,o,a),!0}catch(t){return console.log(t.message),!1}},placeShipsRandomly:n=>{n.forEach((n=>{let o=!1,a=0;for(;!o&&a<100;){const l=Math.random()<.5?"horizontal":"vertical",r=Math.floor(Math.random()*e),i=Math.floor(Math.random()*e);try{t.ownBoard.placeShip(r,i,n.ship.length,l),o=!0}catch(t){a++,a>=100&&console.log(`Failed to place ${n.type} after 100 attempts. Skipping...`)}}}))}}},a=(()=>{let t="hunt",e=null,n=[];const o=new Set;let a=null,l=null,r=0;return{getState:()=>t,setState:e=>t=e,getLastHit:()=>e,setLastHit:t=>e=t,addPotentialTargets:t=>n.push(...t),getNextTarget:()=>n.length>0?n.shift():null,clearPotentialTargets:()=>n=[],getPotentialTargets:()=>[...n],markCellAsAttacked:(t,e)=>o.add(`${t}, ${e}`),hasCellBeenAttacked:(t,e)=>o.has(`${t}, ${e}`),getShipOrientation:()=>a,setShipOrientation:t=>a=t,getAttackDirection:()=>l,setAttackDirection:t=>l=t,getCurrentShipLength:()=>r,setCurrentShipLength:t=>r=t,resetCurrentShipLength:()=>r=0}})(),l=n("player-1"),r=n("player-2"),i=(()=>{let t="horizontal";return{getVesselOrientation:()=>t,setVesselOrientation:e=>t=e,swapVesselOrientation:()=>t="horizontal"===t?"vertical":"horizontal"}})();let s=0;const d=[{type:"Battleship",ship:t(5)},{type:"Destroyer",ship:t(4)},{type:"Submarine",ship:t(4)},{type:"Carrier",ship:t(3)},{type:"Boat",ship:t(2)}],c=t=>{const{setState:e,setLastHit:n,setShipOrientation:o,clearPotentialTargets:a}=t;e("hunt"),n(null),o(null),a()},h=(t,e,n)=>{const{addPotentialTargets:o,getShipOrientation:a,hasCellBeenAttacked:l}=t;if("horizontal"===a()){let t=n-1;for(;t>=0&&!l(e,t);)o([{row:e,col:t}]),t--;let a=n+1;for(;a<10&&!l(e,a);)o([{row:e,col:a}]),a++}else if("vertical"===a()){let t=e-1;for(;t>=0&&!l(t,n);)o([{row:t,col:n}]),t--;let a=e+1;for(;a<10&&!l(a,n);)o([{row:a,col:n}]),a++}},p=(t,e)=>[{row:t-1,col:e},{row:t+1,col:e},{row:t,col:e-1},{row:t,col:e+1}].filter((({row:t,col:e})=>t>=0&&t<10&&e>=0&&e<10)),u=()=>({randomRow:Math.floor(10*Math.random()),randomCol:Math.floor(10*Math.random())}),g=(t,e)=>{const n=m.getCurrentPlayer()===l?r:l,o=n.ownBoard.receiveAttack(t,e);k(t,e,n.name,o),n.ownBoard.isAllShipsSunken()&&B(),m.swapTurns();const i=m.getCurrentPlayer();return b(i),i===r&&setTimeout((()=>{(t=>{const e=m.getCurrentPlayer()===l?r:l,{getState:n}=t;"hunt"===n()?((t,e)=>{const{setState:n,setLastHit:o,getLastHit:a,addPotentialTargets:l,hasCellBeenAttacked:r,markCellAsAttacked:i}=t;let s,d;do{({randomRow:s,randomCol:d}=u())}while(r(s,d));const h=g(s,d);if(i(s,d),"H"===h){const a=e.ownBoard.getShipIndex(s,d);a&&a.isSunk()?c(t):(n("target"),o({row:s,col:d}),l(p(s,d)))}})(t,e):"target"===n()&&((t,e)=>{const{getNextTarget:n,getLastHit:o,setShipOrientation:a,getShipOrientation:l,hasCellBeenAttacked:r,markCellAsAttacked:i,getAttackDirection:s,setAttackDirection:d,getCurrentShipLength:p,setCurrentShipLength:u,resetCurrentShipLength:m}=t;let S;do{S=n()}while(null!==S&&r(S.row,S.col));if(null!==S){const{row:n,col:r}=S,y=g(n,r);if(i(n,r),"H"===y){const i=e.ownBoard.getShipIndex(n,r);if(i&&i.isSunk())c(t),m();else{if(null===l()){const{row:t,col:e}=o();n===t?a("horizontal"):r===e&&a("vertical")}u(p()+1),h(t,n,r)}}else if("X"===y){const e=s();d("right"===e?"left":"left"===e?"right":"up"===e?"down":"up"),h(t,n,r)}}else c(t),m()})(t,e)})(a)}),50),o},m=(()=>{let t=l;return{swapTurns:()=>t=t===l?r:l,getCurrentPlayer:()=>t,isPlayerTurn:e=>e===t}})(),S=t=>{t&&t.querySelectorAll(".highlight").forEach((t=>{t.classList.remove("highlight")}))},y=t=>{const e=document.getElementById(t.name),n=document.getElementById(`${t.name}-popup`),o=t.ownBoard.getGrid().length,a=e=>{if(e)for(let n=0;n<o;n++)for(let a=0;a<o;a++){const o=e.querySelector(`[data-row="${n}"][data-col="${a}"]`),l=t.ownBoard.hasShip(n,a);"player-2"!=t.name&&l&&o.classList.add("ship")}};a(e),a(n)},f=(t,e,n=null)=>{const o=t.ownBoard.getGrid().length,a=n||t.name,l=document.createElement("div");l.classList.add("game-board"),l.id=a;for(let n=0;n<o;n++){const a=document.createElement("div");a.classList.add("column");for(let r=0;r<o;r++){const o=document.createElement("div");o.classList.add("cell"),o.dataset.row=r,o.dataset.col=n;const i=t.ownBoard.hasShip(r,n);"player-2"!==t.name&&i&&o.classList.add("ship"),o.addEventListener("mousedown",(o=>{0===o.button?e(r,n,t,"left"):2===o.button&&e(r,n,t,"right")})),o.addEventListener("mouseover",(()=>{v(r,n,t)})),o.addEventListener("mouseleave",(()=>{S(l)})),o.addEventListener("contextmenu",(t=>{t.preventDefault()})),a.appendChild(o)}l.appendChild(a)}return l},w=t=>(t=>{t.classList.add("highlight")})(t),C=t=>y(t),v=(t,e,n)=>((t,e,n)=>{const o=document.getElementById("player-1-popup"),a=d[s]?.ship.length||0,l=i.getVesselOrientation();if(L(o),0!==a)for(let r=0;r<a;r++){let a=t,i=e;if("horizontal"===l?i=e+r:"vertical"===l&&(a=t+r),a<n.ownBoard.getGrid().length&&i<n.ownBoard.getGrid().length){const t=o.querySelector(`.cell[data-row="${a}"][data-col="${i}"]`);t&&w(t)}}})(t,e,n),L=t=>S(t),E=(t,e)=>{t=Number(t),e=Number(e),g(t,e)},k=(t,e,n,o)=>((t,e,n,o)=>{const a=((t,e,n)=>document.getElementById(n).querySelector(`[data-row="${t}"][data-col="${e}"]`))(t,e,n);"H"===o?(a.classList.remove("ship"),a.classList.add("hit")):"X"===o&&a.classList.add("miss"),a.classList.add("disabled")})(t,e,n,o),B=()=>{(()=>{const t=document.createElement("div");t.classList.add("overlay");const e=document.createElement("div");e.classList.add("announcement-card");const n=document.createElement("h2");n.textContent="Game Over";const o=document.createElement("button");o.textContent="Close",o.addEventListener("click",(()=>{location.reload()})),e.appendChild(n),e.appendChild(o),t.appendChild(e),document.getElementById("root").appendChild(t)})()},A=()=>(()=>{const t=document.querySelector(".overlay");setTimeout((()=>{document.getElementById("root").removeChild(t)}),1e3)})(),b=t=>(t=>{const e=document.querySelector("#player-1"),n=document.querySelector("#player-2");"player-1"===t.name?(e.classList.add("disabled"),n.classList.remove("disabled")):"player-2"===t.name&&(n.classList.add("disabled"),e.classList.remove("disabled"))})(t);((t,e)=>{const n=document.createElement("div");n.classList.add("container");const o=f(t,E),a=f(e,E);n.append(o,a),document.getElementById("root").appendChild(n)})(l,r),(t=>{const e=document.createElement("div");e.classList.add("overlay");const n=document.createElement("div");n.classList.add("place-ships");const a=document.createElement("p");a.textContent="Place your ships",n.appendChild(a);const r=f(t,((t,e,n,a)=>((t,e,n,a)=>{"right"===a?i.swapVesselOrientation():(((t,e)=>{let n=i.getVesselOrientation();const a=o(l);if(s<d.length){const o=d[s];a.placeShipManually(t,e,o.ship.length,n)&&(C(l),s++)}s===d.length&&A()})(t,e),y(n))})(t,e,n,a)),`${t.name}-popup`);n.appendChild(r);const c=document.createElement("button");c.textContent="Close",c.addEventListener("click",(()=>{document.getElementById("root").removeChild(e)})),n.appendChild(c),e.appendChild(n),document.getElementById("root").appendChild(e)})(l),o(r).placeShipsRandomly(d)})();
//# sourceMappingURL=main.bundle.js.map