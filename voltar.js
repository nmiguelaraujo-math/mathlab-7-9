(()=>{
  const style=document.createElement('style');
  style.textContent='.mathlab-back{position:fixed;z-index:9999;top:10px;left:10px;display:inline-flex;align-items:center;gap:6px;padding:8px 12px;border:1px solid rgba(255,255,255,.7);border-radius:999px;background:rgba(12,37,73,.92);color:#fff!important;text-decoration:none;font:700 14px/1.2 system-ui,-apple-system,"Segoe UI",sans-serif;box-shadow:0 3px 12px rgba(0,0,0,.2);backdrop-filter:blur(5px)}.mathlab-back:hover{background:#1769e0}.mathlab-back:focus{outline:3px solid #ffdc73;outline-offset:2px}@media(max-width:600px){.mathlab-back{top:7px;left:7px;padding:7px 10px;font-size:12px}}';
  document.head.appendChild(style);
  const link=document.createElement('a');
  link.className='mathlab-back';link.href='index.html';link.textContent='← Voltar ao MathLab';link.setAttribute('aria-label','Voltar à página inicial do MathLab');
  document.body.appendChild(link);
})();
