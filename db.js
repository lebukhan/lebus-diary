@tailwind base;
@tailwind components;
@tailwind utilities;

:root, [data-theme="light"] { --app:#e7dccb; --paper:#fbf7ee; --ink:#3b3026; --line:rgba(95,72,50,.16); --margin:rgba(190,86,72,.40); --sub:#8a7560; --panel:#f3ebdc; }
[data-theme="sepia"] { --app:#d6bf99; --paper:#f3e6cd; --ink:#4a3826; --line:rgba(120,90,58,.20); --margin:rgba(182,92,68,.45); --sub:#8c6f4c; --panel:#e9d6b4; }
[data-theme="dark"]  { --app:#16140f; --paper:#24201a; --ink:#ece2d0; --line:rgba(232,222,200,.12); --margin:rgba(206,124,104,.45); --sub:#b3a48c; --panel:#211d17; }

* { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
html, body { margin: 0; padding: 0; background: var(--app); color: var(--ink); font-family: var(--font-modern), sans-serif; transition: background .4s; }
.scroll::-webkit-scrollbar { width: 7px; }
.scroll::-webkit-scrollbar-thumb { background: rgba(120,90,60,.35); border-radius: 8px; }
textarea::placeholder, input::placeholder { color: rgba(120,100,80,.45); }
button { font-family: inherit; }

@keyframes ld-cover { from { transform: perspective(1400px) rotateY(0); } to { transform: perspective(1400px) rotateY(-150deg); } }
@keyframes ld-fade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
@keyframes ld-pin-next { from { opacity: .2; transform: perspective(1600px) rotateY(-78deg); transform-origin: left center; } to { opacity: 1; transform: none; } }
@keyframes ld-pin-prev { from { opacity: .2; transform: perspective(1600px) rotateY(78deg); transform-origin: right center; } to { opacity: 1; transform: none; } }
@keyframes ld-up { from { opacity: 0; transform: translateY(18px) scale(.98); } to { opacity: 1; transform: none; } }
@keyframes ld-pulse { 0%,100% { opacity: .5; } 50% { opacity: 1; } }
@media print { .noprint { display: none !important; } }
