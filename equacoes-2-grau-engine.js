(()=>{'use strict';const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],ri=(a,b)=>Math.floor(Math.random()*(b-a+1))+a,pick=a=>a[ri(0,a.length-1)],nz=(a,b)=>{let n=0;while(!n)n=ri(a,b);return n},gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a),frac=(n,d=1)=>{if(d<0){n=-n;d=-d}let g=gcd(n,d);n/=g;d/=g;return d===1?`${n}`:`\\frac{${n}}{${d}}`},sg=n=>n<0?`-${Math.abs(n)}`:`+${n}`,cf=(n,v='x')=>n===1?v:n===-1?`-${v}`:`${n}${v}`,poly=(a,b,c)=>`${cf(a,'x^2')}${b?(b<0?'-':'+')+(Math.abs(b)===1?'x':`${Math.abs(b)}x`):''}${c?sg(c):''}`,rterm=(n,d,v,first=false)=>{if(!n)return'';let s=n<0?'-':first?'':'+';let f=frac(Math.abs(n),d);return s+(f==='1'&&v?'':f)+v},rpoly=(a,b,c,d)=>rterm(a,d,'x^2',true)+rterm(b,d,'x')+rterm(c,d,''),set=xs=>xs.length?`S=\\left\\{${xs.join(',')}\\right\\}`:'S=\\varnothing';let state={kind:'incomplete',level:1,training:'solve',mode:'free'},current,helpIndex=0,test=[];
const q=(statement,steps,answer,helps,family,prompt='Resolve a equação.')=>({statement,steps,answer,helps,family,prompt});
function incomplete(level){if(level===1){if(Math.random()<.5){let a=ri(1,7);return q(`${cf(a,'x^2')}=0`,[`${cf(a,'x^2')}=0`,`x^2=0`,`x=0`,set(['0'])],set(['0']),['Isola o quadrado da incógnita.','A única raiz quadrada de 0 é 0.'],'ax2=0')}let r=ri(2,9),a=ri(1,5),c=-a*r*r;return q(`${poly(a,0,c)}=0`,[`${cf(a,'x^2')}=${a*r*r}`,`x^2=${r*r}`,`x=${r}\\;\\text{ou}\\;x=-${r}`,set([`-${r}`,`${r}`])],set([`-${r}`,`${r}`]),['Isola o termo em \\(x^2\\).','Não te esqueças das duas raízes quadradas.'],'ax2+c=0')}
if(level===2){let a=ri(1,6),r=nz(-9,9),b=-a*r;return q(`${poly(a,b,0)}=0`,[`${cf(a,'x^2')}${sg(b)}x=0`,`x(${a} ${sg(b)})=0`,`x=0\\;\\text{ou}\\;${cf(a)}=${-b}`,`x=0\\;\\text{ou}\\;x=${r}`,set([`${Math.min(0,r)}`,`${Math.max(0,r)}`])],set([`${Math.min(0,r)}`,`${Math.max(0,r)}`]),['Coloca \\(x\\) em evidência.','Aplica a lei do anulamento do produto.'],'ax2+bx=0')}
let kind=Math.random()<.5?'constant':'linear';if(kind==='constant'){let r=ri(2,8),a=ri(2,5),d=ri(1,a-1),k=nz(-8,8),right=(a-d)*r*r+k;while(right===0){k=nz(-8,8);right=(a-d)*r*r+k}return q(`${cf(a,'x^2')}${sg(k)}=${cf(d,'x^2')}${sg(right)}`,[`${cf(a-d,'x^2')}=${right-k}`,`x^2=${r*r}`,`x=${r}\\;\\text{ou}\\;x=-${r}`,set([`-${r}`,`${r}`])],set([`-${r}`,`${r}`]),['Reúne os termos em \\(x^2\\) no mesmo membro.','Reduz a equação antes de a resolver.'],'reduzir-incompleta')}
if(Math.random()<.55){let p=nz(-8,8),d=ri(2,6),k=ri(1,4),a=d*k,b=-p*k,t=ri(2,6);while(a%t===0&&b%t===0)t=ri(2,6);let root=p/d,rootTex=frac(p,d),roots=root<0?[rootTex,'0']:['0',rootTex];return q(`${rpoly(a,b,0,t)}=0`,[`\\text{Multiplicando ambos os membros por }${t}:`,`${poly(a,b,0)}=0`,`x(${a} ${sg(b)})=0`,`x=0\\;\\text{ou}\\;x=${rootTex}`,set(roots)],set(roots),['Elimina primeiro os denominadores.','Depois, coloca \\(x\\) em evidência e aplica a lei do anulamento do produto.'],'incompleta-racional')}
let a=ri(2,5),r=nz(-7,7),k=ri(2,5);while(k===a*r)k=ri(2,5);let root=(k-a*r)/a,rootTex=frac(k-a*r,a),roots=root<0?[rootTex,'0']:['0',rootTex];return q(`${a}x(x${sg(r)})=${cf(k)}`,[`${cf(a,'x^2')}${sg(a*r)}x=${cf(k)}`,`${cf(a,'x^2')}${sg(a*r-k)}x=0`,`x(${a}${sg(a*r-k)})=0`,`x=0\\;\\text{ou}\\;x=${rootTex}`,set(roots)],set(roots),['Desenvolve primeiro o membro com parênteses.','Reúne tudo num membro e coloca \\(x\\) em evidência.'],'reduzir-fator')}
function rationalComplete(){let n1=nz(-8,8),d1=ri(1,5),n2=nz(-8,8),d2=ri(1,5);while(n1*d2===n2*d1||n1*d2+n2*d1===0)n2=nz(-8,8);let a=d1*d2,b=-(n1*d2+n2*d1),c=n1*n2;return{a,b,c}}
function notable(m,n,k,level){let a=m*m,b=2*m*n,c=n*n-k*k,x1=frac(-n-k,m),x2=frac(-n+k,m),roots=[x1,x2].sort((u,v)=>evalFrac(u)-evalFrac(v)),ans=set([...new Set(roots)]);return q(`${poly(a,b,c)}=0`,[`${cf(a,'x^2')}${b?(b<0?'-':'+')+(Math.abs(b)===1?'x':`${Math.abs(b)}x`):''}+${n*n}=${k*k}`,`(${cf(m)}${sg(n)})^2=${k*k}`,`${cf(m)}${sg(n)}=${k}\\;\\text{ou}\\;${cf(m)}${sg(n)}=-${k}`,`x=${x2}\\;\\text{ou}\\;x=${x1}`,ans],ans,['Passa o termo independente necessário para o outro membro.','Reconhece no primeiro membro o quadrado de um binómio.','Se \\(A^2=k^2\\), então \\(A=k\\) ou \\(A=-k\\).'],'quadrado-binomio')}
function complete(level){if(level===1)return notable(1,nz(-7,7),ri(1,8),level);if(level===2)return notable(ri(1,4),nz(-8,8),ri(1,9),level);let chance=Math.random();if(false){let a=pick([1,2,3]),b=nz(-8,8),c=nz(-8,8),D=b*b-4*a*c;while(D<=0||Number.isInteger(Math.sqrt(D))){b=nz(-9,9);c=nz(-8,8);D=b*b-4*a*c}let z=formula(a,b,c,level);z.family='solucoes-irracionais';return z}if(false){let a=pick([1,2,3]),b=nz(-8,8),c=Math.floor(b*b/(4*a))+ri(1,8);let z=formula(a,b,c,level);z.family='sem-solucoes-reais';return z}if(chance<.66){let {a,b,c}=rationalComplete(),t=ri(2,7);while(a%t===0&&b%t===0&&c%t===0)t=ri(2,7);let z=formula(a,b,c,level);z.statement=`${rpoly(a,b,c,t)}=0`;z.steps=[`\\text{Multiplicando ambos os membros por }${t}:`,`${poly(a,b,c)}=0`,...z.steps.slice(1)];z.family='completamento-racional-denominadores';return z}if(chance<.84){let m=ri(1,5),n=nz(-9,9),k=ri(1,10),z=notable(m,n,k,level);z.family='quadrado-binomio-especialista';return z}let {a,b,c}=rationalComplete();return formula(a,b,c,level)}
function binomial(hn,hd){let h=frac(Math.abs(hn),hd);return `(x${hn<0?'-':'+'}${h})^2`}
function formula(a,b,c,level){let D=b*b-4*a*c,hNum=b,hDen=2*a,rNum=D,rDen=4*a*a,normalised=`x^2${rterm(b,a,'x')}${rterm(c,a,'')}=0`,left=`x^2${rterm(b,a,'x')}`,hSquare=frac(b*b,4*a*a),base=[`${poly(a,b,c)}=0`];if(a!==1)base.push(normalised);base.push(`${left}=${frac(-c,a)}`,`${left}+${hSquare}=${frac(-c,a)}+${hSquare}`,`${binomial(hNum,hDen)}=${frac(rNum,rDen)}`);if(D<0){base.push('\\text{O quadrado de um número real não pode ser negativo.}',set([]));return q(`${poly(a,b,c)}=0`,base,set([]),['Divide todos os termos pelo coeficiente de \\(x^2\\).','Adiciona aos dois membros o quadrado de metade do coeficiente de \\(x\\).'],'sem-solucoes-reais')}let s=Math.sqrt(D),ans,roots;if(Number.isInteger(s)){let x1=frac(-b-s,2*a),x2=frac(-b+s,2*a);roots=[x1,x2].sort((u,v)=>evalFrac(u)-evalFrac(v));ans=set([...new Set(roots)]);base.push(`x${hNum<0?'-':'+'}${frac(Math.abs(hNum),hDen)}=${frac(s,2*a)}\\;\\text{ou}\\;x${hNum<0?'-':'+'}${frac(Math.abs(hNum),hDen)}=${frac(-s,2*a)}`,ans)}else{let x1=`\\frac{${-b}-\\sqrt{${D}}}{${2*a}}`,x2=`\\frac{${-b}+\\sqrt{${D}}}{${2*a}}`;ans=set([x1,x2]);base.push(`x${hNum<0?'-':'+'}${frac(Math.abs(hNum),hDen)}=\\pm\\frac{\\sqrt{${D}}}{${2*a}}`,ans)}return q(`${poly(a,b,c)}=0`,base,ans,['Divide todos os termos pelo coeficiente de \\(x^2\\), se necessário.','Passa o termo independente para o segundo membro.','Adiciona aos dois membros o quadrado de metade do coeficiente de \\(x\\).','Escreve o primeiro membro como o quadrado de um binómio.'],'completamento-quadrado')}
function evalFrac(s){let m=s.match(/\\frac\{(-?\d+)\}\{(\d+)\}/);return m?+m[1]/+m[2]:+s}
function error(){if(state.kind==='complete'){let p=nz(-7,7),k=ri(1,20);return q(`x^2${sg(2*p)}x=${k}\\Rightarrow(x${sg(p)})^2=${k}`,[`x^2${sg(2*p)}x=${k}`,`x^2${sg(2*p)}x+${p*p}=${k}+${p*p}`,`(x${sg(p)})^2=${k+p*p}`,`\\text{A resolução apresentada é }\\mathbf{falsa}.`],'\\text{Falsa}',['No completamento do quadrado, o mesmo número deve ser adicionado aos dois membros.'],'erro-completamento','A resolução está correta?')}let wrong=pick(['raizes','produto']);if(wrong==='raizes'){let r=ri(2,9);return q(`x^2=${r*r}\\Rightarrow x=${r}`,[`x^2=${r*r}`,`x=-${r}\\;\\text{ou}\\;x=${r}`,set([`-${r}`,`${r}`])],'\\text{Falsa}',['Um número positivo possui duas raízes quadradas simétricas.'],'erro-raizes','A resolução está correta?')}let a=ri(2,6),r=ri(2,8);return q(`${cf(a,'x^2')}-${a*r}x=0\\Rightarrow x=${r}`,[`x(${a}x-${a*r})=0`,`x=0\\;\\text{ou}\\;x=${r}`,set(['0',`${r}`])],'\\text{Falsa}',['A lei do anulamento do produto pode produzir duas soluções.'],'erro-produto','A resolução está correta?')}
function problem(){if(state.kind==='incomplete'){let x=ri(3,12),area=x*x;return q(`Um quadrado tem ${area}\\,\\text{cm}^2 de área. Determina a medida do lado.`,[`x^2=${area}`,`x=-${x}\\;\\text{ou}\\;x=${x}`,`\\text{Rejeita-se a solução negativa, pois }x\\text{ representa um comprimento.}`,`x=${x}\\text{ cm}`],`x=${x}\\text{ cm}`,['Representa a medida do lado por \\(x\\).','A área de um quadrado é o quadrado da medida do lado.'],'problema-quadrado','Resolve o problema através de uma equação incompleta.')}let n=ri(4,14),prod=n*(n+1);return q(`O produto de dois números naturais consecutivos é ${prod}. Quais são esses números?`,[`x(x+1)=${prod}`,`${poly(1,1,-prod)}=0`,...formula(1,1,-prod,2).steps.slice(1),`\\text{No contexto: }${n}\\text{ e }${n+1}.`],`${n}\\text{ e }${n+1}`,['Representa o menor número por \\(x\\).','O número seguinte é \\(x+1\\).'],'problema-consecutivos','Resolve o problema através de uma equação completa.')}

// V2: famílias adicionais. Todos os enunciados verbais são texto, nunca TeX puro.
const textQ=(statement,steps,answer,helps,family,prompt='Resolve o problema.')=>({...q(statement,steps,answer,helps,family,prompt),isText:true});
function incompleteExtra(level){
 const family=pick(level===1?['rational','zero','product']:level===2?['rational','product','both','parameter','irrational']:['rational','product','both','parameter','irrational','fractions','brackets']);
 if(family==='zero'){let a=ri(2,9);return q(`${a}x^2=0`,[`${a}x^2=0`,`x^2=0`,`x=0`,set(['0'])],set(['0']),['Isola o quadrado.'],'zero-quadrado')}
 if(family==='rational'||family==='irrational'){
  let d=family==='irrational'?pick([2,3,5,6,7]):ri(2,6),n=family==='irrational'?1:ri(1,8),a=d*d,c=-n*n;
  if(family==='irrational'){a=d;c=-n;}
  const r=family==='irrational'?`\\sqrt{${frac(n,d)}}`:frac(n,d);
  const rhs=family==='irrational'?frac(n,d):frac(n*n,d*d);
  return q(`${poly(a,0,c)}=0`,[`${cf(a,'x^2')}=${-c}`,`x^2=${rhs}`,`x=-${r}\\;\\text{ou}\\;x=${r}`,set([`-${r}`,r])],set([`-${r}`,r]),['Isola x².','Considera as duas raízes simétricas.'],family==='irrational'?'incompleta-irracional':'incompleta-racional');
 }
 if(family==='product'){let a=ri(2,7),b=nz(-9,9),r=frac(-b,a),roots=[['0',0],[r,-b/a]].sort((x,y)=>x[1]-y[1]).map(x=>x[0]);return q(`${poly(a,b,0)}=0`,[`${poly(a,b,0)}=0`,`x(${cf(a)}x${sg(b)})=0`,`x=0\\;\\text{ou}\\;${cf(a)}${sg(b)}=0`,`x=0\\;\\text{ou}\\;x=${r}`,set(roots)],set(roots),['Coloca x em evidência.','Aplica a lei do anulamento do produto.'],'incompleta-produto');}
 if(family==='both'){let a=ri(2,6),r=ri(1,8),b=-a*r,t=ri(1,7);return q(`${poly(a,b,t)}=${t}`,[`${poly(a,b,0)}=0`,`x(${cf(a)}x${sg(b)})=0`,`x=0\\;\\text{ou}\\;x=${r}`,set(['0',`${r}`])],set(['0',`${r}`]),['Reduz os termos independentes.','Fatora o primeiro membro.'],'incompleta-dois-membros')}
 if(family==='parameter'){let k=ri(2,9),a=ri(1,5);return q(`${cf(a,'x^2')}+(m-${k})x=0`,[`m-${k}=0`,`m=${k}`,`\\text{Para }m=${k}\\text{ a equação fica }${cf(a,'x^2')}=0`],`m=${k}`,['Uma equação incompleta pode não ter termo em x.'],'parametro-incompleta','Para que valor de m a equação não tem termo de primeiro grau?')}
 if(family==='fractions'){let a=ri(2,7),b=nz(-9,9),d=ri(2,5),r=frac(-b,a),roots=[['0',0],[r,-b/a]].sort((x,y)=>x[1]-y[1]).map(x=>x[0]);return q(`\\frac{${poly(a,b,0)}}{${d}}=0`,[`${poly(a,b,0)}=0`,`x(${cf(a)}x${sg(b)})=0`,`x=0\\;\\text{ou}\\;x=${r}`,set(roots)],set(roots),['Multiplica ambos os membros pelo denominador.','Coloca x em evidência.'],'incompleta-fracoes')}
 let a=ri(2,6),r=ri(1,8),b=-a*r;return q(`${a}x(x-${r})=0`,[`x=0\\;\\text{ou}\\;x-${r}=0`,`x=0\\;\\text{ou}\\;x=${r}`,set(['0',`${r}`])],set(['0',`${r}`]),['Aplica diretamente a lei do anulamento do produto.'],'incompleta-parenteses');
}
function errorExtra(){
 const f=pick(['correct','lost-zero','lost-negative','sign','impossible']);
 if(f==='correct'){let a=ri(2,6),r=ri(2,8);return q(`${a}x^2-${a*r}x=0\\Rightarrow S=\\left\\{0,${r}\\right\\}`,[`x(${a}x-${a*r})=0`,`x=0\\;\\text{ou}\\;x=${r}`,set(['0',`${r}`]),'\\text{A resolução apresentada está correta.}'],'\\text{Verdadeira}',['Confirma as duas soluções por substituição.'],'analise-correta','A resolução apresentada está correta? Justifica.');}
 if(f==='lost-zero'){let a=ri(2,7),r=ri(2,9);return q(`${a}x^2-${a*r}x=0\\Rightarrow x=${r}`,[`x(${a}x-${a*r})=0`,`x=0\\;\\text{ou}\\;x=${r}`,set(['0',`${r}`])],'\\text{Falsa}',['Não podes dividir por x: x pode ser zero.'],'analise-zero','A resolução apresentada está correta? Justifica.');}
 if(f==='lost-negative'){let a=ri(1,6),r=ri(2,9);return q(`${a}x^2=${a*r*r}\\Rightarrow x=${r}`,[`x^2=${r*r}`,`x=-${r}\\;\\text{ou}\\;x=${r}`,set([`-${r}`,`${r}`])],'\\text{Falsa}',['Um quadrado positivo tem duas raízes reais simétricas.'],'analise-raizes','A resolução apresentada está correta? Justifica.');}
 if(f==='impossible'){let a=ri(1,7),b=ri(1,9);return q(`${a}x^2+${b}=0\\Rightarrow x=\\sqrt{${b}}`,[`${a}x^2=-${b}`,`x^2=-${frac(b,a)}`,set([])],'\\text{Falsa}',['O quadrado de um real não é negativo.'],'analise-impossivel','A resolução apresentada está correta? Justifica.');}
 let a=ri(2,8),r=ri(2,7);return q(`${a}x^2-${a*r*r}=0\\Rightarrow x=\\pm${a*r}`,[`${a}x^2=${a*r*r}`,`x^2=${r*r}`,`x=\\pm${r}`,set([`-${r}`,`${r}`])],'\\text{Falsa}',['É preciso dividir os dois membros por a antes de extrair a raiz.'],'analise-divisao','A resolução apresentada está correta? Justifica.');
}
function problemExtra(){
 const families=state.kind==='incomplete'?['square','two-squares','rectangle','triangles','numbers']:['consecutive','rectangle','diagonal','triangles','two-squares'];
 const f=pick(state.level===1?families.slice(0,2):state.level===3?families.filter(x=>x!=='square'):families);
 if(f==='square'){let r=ri(3,13),area=r*r;return textQ(`Um quadrado tem ${area} cm² de área. Determina o comprimento do lado.`,[`x^2=${area}`,`x=\\pm${r}`,`\\text{Como }x>0,\\;x=${r}`,`\\text{O lado mede }${r}\\text{ cm.}`],`${r}\\text{ cm}`,['A área é lado vezes lado.'],'problema-area-quadrado')}
 if(f==='two-squares'){let a=ri(2,6),r=ri(3,9),area=(a*a-1)*r*r;return textQ(`O lado de um quadrado mede ${a} vezes o lado de outro quadrado. A diferença das áreas é ${area} cm². Determina o lado do quadrado menor.`,[`${a*a}x^2-x^2=${area}`,`${a*a-1}x^2=${area}`,`x^2=${r*r}`,`x=${r}\\quad(x>0)`],`${r}\\text{ cm}`,['Representa o lado menor por x.','Subtrai as duas áreas.'],'problema-dois-quadrados')}
 if(f==='rectangle'){let r=ri(3,10),k=ri(2,5),area=k*r*r;return textQ(`Um retângulo tem comprimento ${k} vezes a largura. A sua área é ${area} m². Determina as dimensões.`,[`${k}x\\cdot x=${area}`,`x^2=${r*r}`,`x=${r}\\quad(x>0)`,`\\text{Largura }${r}\\text{ m; comprimento }${k*r}\\text{ m.}`],`${r}\\text{ m e }${k*r}\\text{ m}`,['Representa a largura por x.','Usa a fórmula da área.'],'problema-retangulo')}
 if(f==='triangles'){let r=ri(4,10),k=ri(2,5),area=k*r*r/2;return textQ(`Um triângulo tem base ${k} vezes a sua altura e área ${area} cm². Determina a altura e a base.`,[`\\frac{${k}x\\cdot x}{2}=${area}`,`x^2=${r*r}`,`x=${r}\\quad(x>0)`,`\\text{Altura }${r}\\text{ cm; base }${k*r}\\text{ cm.}`],`${r}\\text{ cm e }${k*r}\\text{ cm}`,['A área do triângulo é base vezes altura a dividir por dois.'],'problema-triangulo')}
 if(f==='numbers'){let r=ri(3,12),a=ri(2,5),n=(a*a-1)*r*r;return textQ(`A diferença entre o quadrado de um número positivo e o quadrado do seu ${a} múltiplo é ${-n}. Determina esse número.`,[`x^2-${a*a}x^2=${-n}`,`${a*a-1}x^2=${n}`,`x^2=${r*r}`,`x=${r}\\quad(x>0)`],`${r}`,['Traduz os quadrados por expressões algébricas.'],'problema-numerico')}
 if(f==='diagonal'){let r=ri(2,9),a=3*r,b=4*r,d=5*r;return textQ(`Um retângulo tem diagonal ${d} cm. A largura é três quartos do comprimento. Calcula a área.`,[`x^2+\\left(\\frac34x\\right)^2=${d*d}`,`\\frac{25}{16}x^2=${d*d}`,`x^2=${b*b}`,`x=${b}\\quad(x>0)`,`A=${a}\\times${b}=${a*b}\\text{ cm}^2`],`${a*b}\\text{ cm}^2`,['Usa o teorema de Pitágoras.','Representa o comprimento por x.'],'problema-diagonal')}
 let n=ri(3,12),prod=n*(n+1),z=formula(1,1,-prod,2);return textQ(`O produto de dois números naturais consecutivos é ${prod}. Quais são esses números?`,[`x(x+1)=${prod}`,...z.steps,`\\text{No contexto: }${n}\\text{ e }${n+1}.`],`${n}\\text{ e }${n+1}`,['Representa o menor número por x e o seguinte por x+1.'],'problema-consecutivos');
}
function statementHTML(z){return z.isText?`<p class="verbalStatement">${esc(z.statement)}</p>`:tex(z.statement,true)}
function generate(){return state.training==='errors'?errorExtra():state.training==='problems'?(state.kind==='complete'?completeProblemV4(state.level):problemExtra()):state.kind==='incomplete'?incompleteExtra(state.level):completeNew(state.level,'mixed')}

function typeset(){try{window.MathJax?.typesetPromise?.()}catch(e){console.warn(e)}}
function tex(s,display=false){return display?'\\['+s+'\\]':'\\('+s+'\\)'}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
function makeQuestion(kind,level,training){const previous={...state};state.kind=kind;state.level=level;state.training=training;let z;try{z=generate()}finally{Object.assign(state,previous)}return {...z,kind,level,training}}
function questionKey(z){return z.family+'|'+z.statement}
function makeDistinct(kind,level,training,used){let z;for(let i=0;i<90;i++){z=makeQuestion(kind,level,training);if(!used.has(questionKey(z)))break}used.add(questionKey(z));return z}
function setMode(mode){state.mode=mode;$$('[data-mode]').forEach(b=>b.classList.toggle('active',b.dataset.mode===mode));['free','sheet','test'].forEach(m=>$('#'+m+'Panel').classList.toggle('hidden',m!==mode));if(mode!=='free')$('#exercise').classList.add('hidden');if(mode==='free'){$$('#setup button').forEach(b=>b.disabled=false)}if(mode==='sheet')renderSheetConfig();if(mode==='test')renderTestConfig()}
function render(){current=makeQuestion(state.kind,state.level,state.training);helpIndex=0;$('#exercise').classList.remove('hidden');$('#reveal').innerHTML='';$('#badges').innerHTML=`<span>9.º ano</span><span>${state.kind==='incomplete'?'Equação incompleta':'Equação completa'}</span><span>${['','Principiante','Intermédio','Especialista'][state.level]}</span>`;$('#prompt').textContent=current.prompt;$('#statement').innerHTML=statementHTML(current);typeset()}
function showHelp(){let h=current.helps[Math.min(helpIndex,current.helps.length-1)];helpIndex++;$('#reveal').innerHTML=`<div class="reveal"><div>Ajuda ${Math.min(helpIndex,current.helps.length)}/${current.helps.length}</div><div>${h}</div></div>`;typeset()}
function showSolution(){let html=current.steps.map((s,i)=>`<div class="step"><span>${i+1}.</span> ${tex(s,true)}</div>`).join('');$('#reveal').innerHTML=`<div class="reveal"><div>Resolução</div>${html}</div>`;typeset()}
function updateLabels(){let c=state.kind==='complete';$('#level1').textContent=c?'Casos notáveis diretos':'Equações da forma ax² = 0 e ax² + c = 0';$('#level2').textContent=c?'Quadrados de binómios':'Fator comum e lei do anulamento do produto';$('#level3').textContent=c?'Coeficientes racionais e completamento do quadrado':'Redução, parênteses e frações'}
$$('[data-group]').forEach(b=>b.onclick=()=>{let g=b.dataset.group;state[g]=g==='level'?+b.dataset.value:b.dataset.value;$$(`[data-group="${g}"]`).forEach(x=>x.classList.toggle('active',x===b));if(g==='kind')updateLabels()});$$('[data-mode]').forEach(b=>b.onclick=()=>setMode(b.dataset.mode));$('#new').onclick=$('#another').onclick=render;$('#help').onclick=showHelp;$('#solution').onclick=showSolution;
const testState={items:[],answers:[],index:0,review:false};
const testConfig={kind:'both',level:2,types:['solve','errors','problems']};
function renderTestConfig(){
 $('#testBody').innerHTML=`<div class="testConfig"><h2>Configurar modo teste</h2><p>Escolhe a dificuldade e os conteúdos. O teste terá 10 questões.</p><div class="testConfigGrid"><label>Dificuldade<select id="testLevel"><option value="1">Principiante</option><option value="2">Intermédio</option><option value="3">Especialista</option></select></label><label>Tipo de equações<select id="testKind"><option value="both">Global — completas e incompletas</option><option value="incomplete">Apenas incompletas</option><option value="complete">Apenas completas</option></select></label></div><h3>Tipos de questões</h3><div class="testCheckGrid"><label><input type="checkbox" data-test-type="solve"> Resolver equações</label><label><input type="checkbox" data-test-type="errors"> Seleção e análise de erros</label><label><input type="checkbox" data-test-type="problems"> Problemas</label></div><p id="testConfigWarning" class="testConfigWarning" aria-live="polite"></p><button id="beginTest" class="primary testStart">Começar teste de 10 questões</button></div>`;
 $('#testLevel').value=String(testConfig.level);$('#testKind').value=testConfig.kind;
 $$('[data-test-type]').forEach(x=>{x.checked=testConfig.types.includes(x.dataset.testType);x.onchange=()=>{testConfig.types=$$('[data-test-type]:checked').map(y=>y.dataset.testType)}});
 $('#testLevel').onchange=e=>testConfig.level=+e.target.value;$('#testKind').onchange=e=>testConfig.kind=e.target.value;
 $('#beginTest').onclick=()=>{if(!testConfig.types.length){$('#testConfigWarning').textContent='Seleciona pelo menos um tipo de questões.';return}startTest()};
}
function startTest(){
 const used=new Set(),modes=['mc','tf','mc','fill','mc','tf','mc','fill','mc','mc'];
 const kinds=testConfig.kind==='both'?['incomplete','complete']:[testConfig.kind];
 testState.items=Array.from({length:10},(_,i)=>{
  const training=testConfig.types[i%testConfig.types.length];
  const z=makeDistinct(kinds[i%kinds.length],testConfig.level,training,used);
  z.testFormat=modes[i];
  if(z.testFormat==='fill'&&!/^[-+]?\d+(?:[.,]\d+)?$/.test(z.answer.trim()))z.testFormat='mc';
  if(z.testFormat==='tf'&&z.answer!=='\\text{Falsa}'&&z.answer!=='\\text{Verdadeira}')z.testFormat='mc';
  return z;
 });
 testState.answers=Array(10).fill(null);testState.index=0;testState.review=false;showTest();
}
function wrongAnswers(z){if(z.answer==='\\text{Falsa}')return ['\\text{Verdadeira}','S=\\varnothing','S=\\left\\{0\\right\\}'];if(z.answer.includes('cm')||z.answer.includes(' e '))return ['\\text{Não é possível determinar}','S=\\varnothing','S=\\left\\{0\\right\\}'];return ['S=\\varnothing','S=\\left\\{0\\right\\}','S=\\left\\{-1,1\\right\\}','S=\\left\\{1\\right\\}','S=\\left\\{-2,2\\right\\}']}
function optionsFor(z){let arr=[z.answer];for(const w of wrongAnswers(z))if(!arr.includes(w))arr.push(w);while(arr.length<4)arr.push('S=\\left\\{'+ri(3,14)+'\\right\\}');return arr.slice(0,4).sort(()=>Math.random()-.5)}
function correctTest(z,a){if(a===null||a==='')return false;if(z.testFormat==='mc')return z.opts[Number(a)]===z.answer;if(z.testFormat==='tf')return a===z.answer;return String(a).trim().replace(',','.')===z.answer.trim().replace(',','.');}
function answerLabel(z,a){if(a===null||a==='')return 'Sem resposta';if(z.testFormat==='mc')return tex(z.opts[Number(a)]);if(z.testFormat==='tf')return tex(a);return esc(a)}
function showTest(){
 const i=testState.index,z=testState.items[i];if(testState.review){renderTestReview();return}if(!z)return;
 let input='';
 if(z.testFormat==='mc'){const opts=z.opts||(z.opts=optionsFor(z));input=`<div class="testOptions">${opts.map((o,j)=>`<button class="test-option ${testState.answers[i]===String(j)?'selected':''}" data-choice="${j}"><span class="optionLetter">${'ABCD'[j]}</span><span>${tex(o)}</span></button>`).join('')}</div>`;}
 else if(z.testFormat==='tf'){input=`<div class="testOptions testTF">${[['\\text{Verdadeira}','Verdadeira'],['\\text{Falsa}','Falsa']].map(([v,label])=>`<button class="test-option ${testState.answers[i]===v?'selected':''}" data-value="${v}">${label}</button>`).join('')}</div>`;}
 else{input=`<div class="testFillWrap"><input id="testFill" aria-label="Resposta numérica" inputmode="decimal" autocomplete="off" placeholder="Escreve o número" value="${esc(testState.answers[i]||'')}"><p>Podes usar vírgula, ponto ou uma fração como 1/2.</p></div>`;}
 const completed=testState.answers.filter(x=>x!==null&&x!=='').length;
 $('#testBody').innerHTML=`<div class="testHeading"><span class="testBadge">9.º ano · ${['','Principiante','Intermédio','Especialista'][z.level]} · ${z.kind==='incomplete'?'Equação incompleta':'Equação completa'}</span><strong>Questão ${i+1} de ${testState.items.length}</strong></div><div class="progress"><i style="width:${(i+1)/testState.items.length*100}%"></i></div><div class="testQuestion"><p>${esc(z.prompt)}</p><div class="math testStatement">${statementHTML(z)}</div>${input}</div><div class="numberNav">${testState.items.map((_,j)=>`<button data-goto="${j}" class="${j===i?'active':''} ${testState.answers[j]!==null&&testState.answers[j]!==''?'answered':''}" aria-label="Questão ${j+1}">${j+1}</button>`).join('')}</div><div class="testNav"><button id="prevTest" ${i===0?'disabled':''}>Anterior</button><button id="nextTest" ${i===testState.items.length-1?'disabled':''}>Seguinte</button><button id="finishTestBtn">Terminar teste</button></div>`;
 $$('[data-goto]').forEach(b=>b.onclick=()=>{testState.index=+b.dataset.goto;showTest()});
 $$('[data-choice]').forEach(b=>b.onclick=()=>{testState.answers[i]=b.dataset.choice;showTest()});
 [...$('#testBody').querySelectorAll('[data-value]')].forEach(b=>b.onclick=()=>{testState.answers[i]=b.dataset.value;showTest()});
 const fill=$('#testFill');if(fill)fill.oninput=()=>{testState.answers[i]=fill.value;const nav=$$('[data-goto]')[i];nav.classList.toggle('answered',!!fill.value)};
 $('#prevTest').onclick=()=>{testState.index=Math.max(0,i-1);showTest()};
 $('#nextTest').onclick=()=>{testState.index=Math.min(testState.items.length-1,i+1);showTest()};
 $('#finishTestBtn').onclick=finishTest;typeset();
}
function finishTest(){testState.review=true;const score=testState.items.reduce((sum,z,i)=>sum+(correctTest(z,testState.answers[i])?1:0),0);const empty=testState.answers.filter(a=>a===null||a==='').length;$('#testBody').innerHTML=`<div class="testResult"><h2>Resultado do teste</h2><div class="testScore">${score}/${testState.items.length}</div><p>${score===testState.items.length?'Excelente! Respondeste corretamente a todas as questões.':'Revê os procedimentos e treina os erros identificados.'}</p>${empty?`<p class="unansweredNote">${empty} questões sem resposta.</p>`:''}<div class="testNav"><button id="reviewBtn">Rever respostas</button><button id="errorsBtn">Treinar os meus erros</button><button id="restartBtn">Novo teste</button></div></div>`;$('#reviewBtn').onclick=renderTestReview;$('#errorsBtn').onclick=()=>{const wrong=testState.items.filter((z,i)=>!correctTest(z,testState.answers[i]));if(!wrong.length){$('#testBody').insertAdjacentHTML('beforeend','<p>Não há respostas erradas para treinar.</p>');return}testState.items=wrong;testState.answers=Array(wrong.length).fill(null);testState.index=0;testState.review=false;showTest()};$('#restartBtn').onclick=renderTestConfig}
function renderTestReview(){let html='<h2 class="reviewTitle">Revisão das respostas</h2>';testState.items.forEach((z,i)=>{const selected=testState.answers[i],correct=correctTest(z,selected);html+=`<article class="reviewItem ${correct?'isCorrect':'isWrong'}"><h3>Questão ${i+1} · ${z.family||'Equação do 2.º grau'}</h3><p>${esc(z.prompt)}</p><div class="reviewStatement">${statementHTML(z)}</div><div class="studentAnswer"><strong>A tua resposta:</strong> ${answerLabel(z,selected)}</div>${!correct?'<p class="reviewHint">Confirma os cálculos e os procedimentos utilizados.</p>':''}<div class="correctAnswer"><strong>Resposta correta:</strong> ${tex(z.answer)}</div><div class="reviewSteps">${z.steps.map(t=>`<div class="step">${tex(t,true)}</div>`).join('')}</div></article>`});html+='<button id="backResult" class="backResult">Voltar ao resultado</button>';$('#testBody').innerHTML=html;$('#backResult').onclick=finishTest;typeset()}
const sheetTopics=[
 {id:'solve',name:'Resolver equações',description:'Procedimentos e conjunto-solução.',items:[['notable','Casos notáveis'],['mixed','Equações completas mistas'],['productzero','Lei do anulamento do produto (com fatorização prévia)']]},
 {id:'concepts',name:'Seleção e análise de erros',description:'Identificar, escolher e corrigir.',items:[['errors','Identificação e correção de erros']]},
 {id:'problems',name:'Problemas',description:'Modelar e interpretar.',items:[['problems','Problemas']]}
];
const sheetDefaults={notable:0,mixed:0,productzero:0,direct:0,parentheses:0,fractions:0,classification:0,errors:0,parameters:0,problems:0};
const activeSheetGroups=new Set(['solve','concepts','problems']);
let sheetItems=[],sheetSolutions=false;
function renderSheetConfig(){
 $('#sheetPreview').classList.add('hidden');$('#sheetSettings').classList.remove('hidden');
 const cards=$('#sheetTypeCards');
 cards.innerHTML=sheetTopics.map(g=>`<label class="sheetTypeCard ${activeSheetGroups.has(g.id)?'selected':''}"><input type="checkbox" data-sheet-group="${g.id}" ${activeSheetGroups.has(g.id)?'checked':''}><span><strong>${g.name}</strong><small>${g.description}</small></span></label>`).join('');
 cards.querySelectorAll('[data-sheet-group]').forEach(el=>el.onchange=()=>{if(el.checked)activeSheetGroups.add(el.dataset.sheetGroup);else activeSheetGroups.delete(el.dataset.sheetGroup);renderSheetConfig()});
 const wrap=$('#sheetTopicControls');
 wrap.innerHTML=sheetTopics.filter(g=>activeSheetGroups.has(g.id)).map(g=>`<div class="topicGroup"><h4>${g.name}</h4>${g.items.map(([id,label])=>`<div class="topicLine"><span>${label}</span><div class="stepper"><button type="button" data-step="${id}" data-delta="-1" aria-label="Diminuir ${label}">−</button><output id="count-${id}">${sheetDefaults[id]}</output><button type="button" data-step="${id}" data-delta="1" aria-label="Aumentar ${label}">+</button></div></div>`).join('')}</div>`).join('');
 wrap.querySelectorAll('[data-step]').forEach(b=>b.onclick=()=>{const id=b.dataset.step,out=$('#count-'+id);sheetDefaults[id]=Math.max(0,Math.min(40,+out.textContent+(+b.dataset.delta)));out.textContent=sheetDefaults[id];updateSheetTotal()});
 updateSheetTotal();
}
function updateSheetTotal(){let n=sheetTopics.filter(g=>activeSheetGroups.has(g.id)).flatMap(g=>g.items).reduce((sum,[id])=>sum+sheetDefaults[id],0);$('#sheetTotal').textContent=n}
function sheetFamily(z){return z.family||z.training+'-'+z.kind}
function balancedQuestion(kind,lev,training,used,families){
 let best=null,bestScore=Infinity;
 for(let attempt=0;attempt<90;attempt++){
  const z=makeQuestion(kind,lev,training),family=sheetFamily(z),key=questionKey(z);
  const score=(used.has(key)?10000:0)+(families.get(family)||0)*100+Math.random()*10;
  if(score<bestScore){best=z;bestScore=score}
  if(!used.has(key)&&!families.has(family)&&!families.has('semantic:'+semantic))break;
 }
 if(best){used.add(questionKey(best));families.set(sheetFamily(best),(families.get(sheetFamily(best))||0)+1)}
 return best;
}
// V4: os tópicos de configuração têm geradores reais, não são apenas etiquetas.
function topicQuestion(kind,lev,id){
 if(id==='notable'||id==='mixed')return completeNew(lev,id);
 if(id==='productzero')return productZeroNew(lev);
 if(id==='problems')return specialistProblemV8(kind,lev);
 if(id==='classification'){
  const a=ri(1,6),b=ri(1,7),c=ri(1,9),f=kind==='complete'?'complete':pick(['incomplete','impossible']);
  if(f==='complete')return q(`${poly(a,b,c)}=0`,[`a=${a},\\;b=${b},\\;c=${c}`,`\\text{Todos os coeficientes são não nulos.}`],'\\text{Completa}',['Observa os coeficientes dos três termos.'],'classificacao-completa','Classifica a equação do 2.º grau.');
  if(f==='incomplete')return q(`${poly(a,b,0)}=0`,[`a=${a},\\;b=${b},\\;c=0`,`\\text{Falta o termo independente.}`],'\\text{Incompleta}',['Verifica qual dos coeficientes é zero.'],'classificacao-incompleta','Classifica a equação do 2.º grau.');
  return q(`${a}x^2+${c}=0`,[`${a}x^2=-${c}`,`x^2=-${frac(c,a)}`,set([])],set([]),['O quadrado de um número real nunca é negativo.'],'classificacao-sem-solucao','Determina o conjunto-solução em ℝ.');
 }
 if(id==='parameters'){
  const a=ri(2,8),k=ri(2,9);
  if(kind==='complete')return q(`${a}x^2+(m-${k})x+${ri(1,8)}=0`,[`m-${k}=0`,`m=${k}`,`\\text{O coeficiente de }x\\text{ anula-se.}`],`m=${k}`,['Para a equação deixar de ser completa, um coeficiente tem de se anular.'],'parametro-completa','Para que valor de m a equação é incompleta?');
  return q(`${a}x^2+(m-${k})x=0`,[`m-${k}=0`,`m=${k}`],`m=${k}`,['O coeficiente do termo em x tem de ser zero.'],'parametro-incompleta','Para que valor de m desaparece o termo em x?');
 }
 if(id==='errors')return kind==='complete'?completeErrorV10():errorExtra();
 if(kind==='incomplete')return lev===3?incompleteSpecialistV10(id):incompleteSolveV7(lev,id);
 return completeV4(lev,id);
}
function incompleteSolveV7(lev,id){
 // As perguntas de resolução não devem gerar questões de parâmetros.
 const families=lev===1?['simple','squares','factor']:lev===2?['squares','factor','both','fraction','parentheses']:['squares','factor','both','fraction','parentheses','irrational','difference'];
 const pool=lev===3?(id==='direct'?['squares','factor','irrational']:id==='parentheses'?['difference','parentheses','both']:['fraction','both','irrational']):families;
 const f=pick(pool),a=ri(2,8),r=ri(2,9);
 if(f==='simple')return q(`${a}x^2=0`,[`${a}x^2=0`,`x^2=0`,`x=0`,set(['0'])],set(['0']),['Isola o quadrado.'],'res-incompleta-zero');
 if(f==='squares'){
  const d=lev===1?1:ri(2,6),n=ri(1,9),coef=d*d,constant=n*n,root=frac(n,d),roots=[`-${root}`,root];
  return q(`${coef}x^2-${constant}=0`,[`${coef}x^2=${constant}`,`x^2=${frac(constant,coef)}`,`x=-${root}\\;\\text{ou}\\;x=${root}`,set(roots)],set(roots),['Isola o termo quadrático.','Considera as duas raízes.'],'res-incompleta-raizes-racionais');
 }
 if(f==='irrational'){
  const d=pick([2,3,5,6,7]),rad=`\\sqrt{${d}}`;
  return q(`x^2-${d}=0`,[`x^2=${d}`,`x=-${rad}\\;\\text{ou}\\;x=${rad}`,set([`-${rad}`,rad])],set([`-${rad}`,rad]),['Há duas raízes reais simétricas.'],'res-incompleta-irracional');
 }
 if(f==='difference'){
  const n=ri(2,6),k=ri(2,7),v=n*k,roots=[`-${k}`,`${k}`];
  return q(`(${n}x-${v})(${n}x+${v})=0`,[`${n*n}x^2-${v*v}=0`,`x^2=${k*k}`,`x=-${k}\\;\\text{ou}\\;x=${k}`,set(roots)],set(roots),['Aplica a diferença de quadrados.'],'res-incompleta-diferenca-quadrados');
 }
 const b=-a*r,root=frac(-b,a),roots=['0',root];
 if(f==='fraction'){
  const d=ri(2,7);
  return q(`\\frac{${poly(a,b,0)}}{${d}}=0`,[`${poly(a,b,0)}=0`,`x(${cf(a)}${sg(b)})=0`,`x=0\\;\\text{ou}\\;${cf(a)}${sg(b)}=0`,`x=0\\;\\text{ou}\\;x=${root}`,set(roots)],set(roots),['Elimina o denominador.','Coloca x em evidência.'],'res-incompleta-fracao');
 }
 if(f==='both'){
  const t=ri(2,9);
  return q(`${poly(a,b,t)}=${t}`,[`${poly(a,b,0)}=0`,`x(${cf(a)}${sg(b)})=0`,`x=0\\;\\text{ou}\\;x=${root}`,set(roots)],set(roots),['Reduz os termos semelhantes.'],'res-incompleta-ambos-membros');
 }
 if(f==='parentheses')return q(`${a}x(x-${r})=0`,[`x=0\\;\\text{ou}\\;x-${r}=0`,`x=0\\;\\text{ou}\\;x=${r}`,set(['0',`${r}`])],set(['0',`${r}`]),['Usa a lei do anulamento do produto.'],'res-incompleta-produto-parenteses');
 return q(`${poly(a,b,0)}=0`,[`x(${cf(a)}${sg(b)})=0`,`x=0\\;\\text{ou}\\;${cf(a)}${sg(b)}=0`,`x=0\\;\\text{ou}\\;x=${root}`,set(roots)],set(roots),['Coloca x em evidência.'],'res-incompleta-fator-comum');
}
function completeErrorV10(){
 const f=pick(['missing-square','correct-square','factor','sign','square-root','coefficient']);
 const p=ri(2,7),k=ri(2,12);
 if(f==='missing-square')return q(`x^2+${2*p}x=${k}\\Rightarrow(x+${p})^2=${k}`,[`x^2+${2*p}x+${p*p}=${k}+${p*p}`,`(x+${p})^2=${k+p*p}`,'\\text{A transformação apresentada é falsa.}'],'\\text{Falsa}',['Adiciona o quadrado de metade do coeficiente de x aos dois membros.'],'v10-erro-completamento','A resolução está correta? Justifica.');
 if(f==='correct-square')return q(`x^2-${2*p}x=${k}\\Rightarrow(x-${p})^2=${k+p*p}`,[`x^2-${2*p}x+${p*p}=${k}+${p*p}`,`(x-${p})^2=${k+p*p}`,'\\text{A transformação apresentada é verdadeira.}'],'\\text{Verdadeira}',['Verifica o desenvolvimento do quadrado.'],'v10-correto-completamento','A resolução está correta? Justifica.');
 if(f==='factor')return q(`(x-${p})(x+${k})=0\\Rightarrow x=${p}`,[`x-${p}=0\\;\\text{ou}\\;x+${k}=0`,`x=${p}\\;\\text{ou}\\;x=-${k}`,set([`-${k}`,`${p}`])],'\\text{Falsa}',['Um produto nulo pode ter qualquer um dos fatores nulo.'],'v10-erro-produto','A resolução está correta? Justifica.');
 if(f==='sign')return q(`(x+${p})^2=${k*k}\\Rightarrow x=-${p}+${k}`,[`x+${p}=${k}\\;\\text{ou}\\;x+${p}=-${k}`,`x=${-p+k}\\;\\text{ou}\\;x=${-p-k}`,set([`${-p-k}`,`${-p+k}`])],'\\text{Falsa}',['Uma igualdade de quadrados pode dar duas soluções.'],'v10-erro-raizes','A resolução está correta? Justifica.');
 if(f==='square-root')return q(`(x-${p})^2=${k*k}\\Rightarrow x=${p+k}\\;\\text{ou}\\;x=${p-k}`,[`x-${p}=${k}\\;\\text{ou}\\;x-${p}=-${k}`,set([`${p-k}`,`${p+k}`]),'\\text{A transformação apresentada é verdadeira.}'],'\\text{Verdadeira}',['Isola x em cada um dos dois casos.'],'v10-correto-raizes','A resolução está correta? Justifica.');
 return q(`${p}x^2+${2*p*k}x+${p*k*k}=0\\Rightarrow(x+${k})^2=0`,[`${p}(x^2+${2*k}x+${k*k})=0`,`(x+${k})^2=0`,`x=-${k}`],'\\text{Verdadeira}',['Divide pelo coeficiente comum e identifica o quadrado.'],'v10-correto-fator-comum','A resolução está correta? Justifica.');
}
function incompleteSpecialistV10(id){
 const family=id==='direct'?pick(['rational','factor','zero','irrational']):id==='parentheses'?pick(['square-difference','binomial-product','reduced','parentheses']):pick(['two-fractions','fraction-both','fraction-factor','rational']);
 const a=ri(2,7),n=ri(2,9),d=ri(2,6),k=ri(2,7);
 if(family==='irrational'){
  const rad=pick([2,3,5,6,7,10,11]);return q(`${a}x^2-${a*rad}=0`,[`${a}x^2=${a*rad}`,`x^2=${rad}`,`x=-\\sqrt{${rad}}\\;\\text{ou}\\;x=\\sqrt{${rad}}`,set([`-\\sqrt{${rad}}`,`\\sqrt{${rad}}`])],set([`-\\sqrt{${rad}}`,`\\sqrt{${rad}}`]),['Isola o quadrado e determina as duas raízes.'],'v10-inc-irracional');
 }
 if(family==='rational'){
  const root=frac(n,d),answer=set([`-${root}`,root]);return q(`${d*d}x^2-${n*n}=0`,[`${d*d}x^2=${n*n}`,`x^2=${frac(n*n,d*d)}`,`x=-${root}\\;\\text{ou}\\;x=${root}`,answer],answer,['Isola o termo quadrático.'],'v10-inc-raizes-racionais');
 }
 if(family==='zero')return q(`${a}x^2+${n}=${n}`,[`${a}x^2=0`,`x^2=0`,`x=0`,set(['0'])],set(['0']),['Reduz os termos independentes.'],'v10-inc-raiz-nula');
 if(family==='factor'){
  const root=frac(n,d),ans=set(['0',root]);return q(`${d}x^2-${n}x=0`,[`x(${d}x-${n})=0`,`x=0\\;\\text{ou}\\;${d}x-${n}=0`,`x=0\\;\\text{ou}\\;x=${root}`,ans],ans,['Coloca x em evidência.'],'v10-inc-fator-racional');
 }
 if(family==='square-difference'){
  const root=frac(n,d),ans=set([`-${root}`,root]);return q(`(${d}x-${n})(${d}x+${n})=0`,[`${d*d}x^2-${n*n}=0`,`x^2=${frac(n*n,d*d)}`,`x=-${root}\\;\\text{ou}\\;x=${root}`,ans],ans,['Aplica a diferença de quadrados.'],'v10-inc-diferenca-quadrados');
 }
 if(family==='binomial-product'){
  const root=frac(n,d),ans=set(['0',root]);return q(`(${d}x-${n})(${k}x)=0`,[`${d}x-${n}=0\\;\\text{ou}\\;${k}x=0`,`x=${root}\\;\\text{ou}\\;x=0`,ans],ans,['Aplica a lei do anulamento do produto diretamente.'],'v10-inc-produto-binomios');
 }
 if(family==='reduced'){
  const root=frac(n,d),ans=set(['0',root]);return q(`${d+k}x^2-${n}x=${k}x^2`,[`${d}x^2-${n}x=0`,`x(${d}x-${n})=0`,`x=0\\;\\text{ou}\\;x=${root}`,ans],ans,['Reúne os termos semelhantes.'],'v10-inc-ambos-membros');
 }
 if(family==='parentheses'){
  const root=frac(n,d),ans=set(['0',root]);return q(`${d}x(x-${n})=${n*(1-d)}x`,[`${d}x^2-${d*n}x=${n*(1-d)}x`,`${d}x^2-${n}x=0`,`x(${d}x-${n})=0`,`x=0\\;\\text{ou}\\;x=${root}`,ans],ans,['Desenvolve e reduz antes de fatorizar.'],'v10-inc-parenteses');
 }
 if(family==='two-fractions'){
  const root=frac(n,d),ans=set(['0',root]);return q(`\\frac{${d}x^2}{${k}}=\\frac{${n}x}{${k}}`,[`${d}x^2=${n}x`,`x(${d}x-${n})=0`,`x=0\\;\\text{ou}\\;x=${root}`,ans],ans,['Multiplica ambos os membros pelo denominador.'],'v10-inc-fracoes-dois-membros');
 }
 if(family==='fraction-both'){
  const root=frac(n,d),ans=set(['0',root]);return q(`\\frac{${d+k}x^2-${n}x}{${k}}=x^2`,[`${d+k}x^2-${n}x=${k}x^2`,`${d}x^2-${n}x=0`,`x(${d}x-${n})=0`,`x=0\\;\\text{ou}\\;x=${root}`,ans],ans,['Elimina o denominador e reduz os termos.'],'v10-inc-fracao-ambos');
 }
 const root=frac(n,d),ans=set(['0',root]);return q(`\\frac{${d}x(x-${n})}{${k}}=\\frac{${n*(1-d)}x}{${k}}`,[`${d}x(x-${n})=${n*(1-d)}x`,`${d}x^2-${n}x=0`,`x(${d}x-${n})=0`,`x=0\\;\\text{ou}\\;x=${root}`,ans],ans,['Elimina o denominador e desenvolve os parênteses.'],'v10-inc-fracao-parenteses');
}
function completeSpecialistV9(id){
 const {a,b,c}=rationalComplete(), base=poly(a,b,c), z=formula(a,b,c,3);
 const shift=ri(2,9),d=ri(2,7);
 const mode=id==='parentheses'?pick(['product','difference','square']):id==='fractions'?pick(['fraction-two-sides','fraction-shift','fraction-product']):pick(['two-sides','expanded','direct']);
 if(mode==='product'){
  const u=ri(1,4),v=nz(-6,6),w=ri(1,4),t=nz(-6,6);
  // A product of linear factors is a complete equation when both roots are nonzero.
  const A=u*w,B=u*t+v*w,C=v*t;
  if(B&&C){const sol=formula(A,B,C,3);sol.statement=`(${cf(u)}${sg(v)})(${cf(w)}${sg(t)})=0`;sol.steps=[sol.statement,`${cf(u)}${sg(v)}=0\\;\\text{ou}\\;${cf(w)}${sg(t)}=0`,`x=${frac(-v,u)}\\;\\text{ou}\\;x=${frac(-t,w)}`,sol.answer];sol.family='v10-completa-produto-binomios';return sol}
 }
 if(mode==='difference'||mode==='square'){
  const m=ri(1,4),n=nz(-8,8),k=ri(1,9),sol=notable(m,n,k,3);
  sol.statement=mode==='difference'?`(${cf(m)}${sg(n)})^2-${k*k}=0`:`(${cf(m)}${sg(n)})^2=${k*k}`;
  sol.steps=[sol.statement,`(${cf(m)}${sg(n)})^2=${k*k}`,...sol.steps.slice(2)];sol.family=mode==='difference'?'v9-completa-diferenca-quadrados':'v9-completa-quadrado-binomio';return sol;
 }
 if(mode==='fraction-two-sides'){
  z.statement=`\\frac{${poly(a,b,c+shift)}}{${d}}=\\frac{${shift}}{${d}}`;
  z.steps=[z.statement,`${poly(a,b,c+shift)}=${shift}`,`${base}=0`,...z.steps.slice(1)];z.family='v9-completa-fracoes-dois-membros';return z;
 }
 if(mode==='fraction-shift'){
  z.statement=`\\frac{${base}}{${d}}+${shift}=${shift}`;
  z.steps=[z.statement,`\\frac{${base}}{${d}}=0`,`${base}=0`,...z.steps.slice(1)];z.family='v9-completa-fracoes-termos';return z;
 }
 if(mode==='fraction-product'){
  z.statement=`\\frac{${poly(a,b,c+shift)}}{${d}}-\\frac{${shift}}{${d}}=0`;
  z.steps=[z.statement,`\\frac{${base}}{${d}}=0`,`${base}=0`,...z.steps.slice(1)];z.family='v9-completa-fracoes-expressao';return z;
 }
 if(mode==='two-sides'){
  z.statement=`${poly(a,b,c+shift)}=${shift}`;
  z.steps=[z.statement,`${base}=0`,...z.steps.slice(1)];z.family='v9-completa-termos-ambos-membros';return z;
 }
 if(mode==='expanded'){
  const k=ri(2,6);z.statement=`${poly(a+k,b,c)}=${k}x^2`;
  z.steps=[z.statement,`${base}=0`,...z.steps.slice(1)];z.family='v9-completa-termos-quadraticos-ambos-membros';return z;
 }
 z.family='v9-completa-reduzida';return z;
}

// V13: equações construídas a partir de raízes exatas, com estruturas didáticas.
// Nas completas mistas, 80% completamento e 20% casos notáveis (uma só seleção).
function completeNew(level,method){
 const isNotable=method==='notable'||(method==='mixed'&&Math.random()<.20);
 let a,b,c,roots,statement,steps,ans,tag,shape;
 if(isNotable){
  const m=level===1?1:ri(1,level===2?3:5),n=nz(-7,7),k=ri(2,level===3?9:6);
  a=m*m;b=2*m*n;c=n*n-k*k;
  if(!c)return completeNew(level,method);
  roots=[(-n-k)/m,(-n+k)/m];
  const left=`(${cf(m)}${sg(n)})^2`;
  shape=level===1?'direto':level===2?pick(['deslocacao','quadrado']):pick(['quadrado','diferenca','dois-membros']);
  if(shape==='direto')statement=`${left}=${k*k}`;
  else if(shape==='deslocacao')statement=`${left}-${k*k}=0`;
  else if(shape==='quadrado')statement=`${left}=${k*k}`;
  else if(shape==='diferenca')statement=`${left}-${k*k}=0`;
  else if(shape==='dois-membros')statement=`${left}-(${k}x+${k*k})=-${k}x`;
  else statement=`${left}=${k*k}`;
  // The rational variant must have the same denominator on both sides.
  if(shape==='racional'){let d=ri(2,4);statement=`\\frac{${left}}{${d}}=\\frac{${k*k}}{${d}}`}
  const rootTex=[frac(-n-k,m),frac(-n+k,m)].sort((u,v)=>evalFrac(u)-evalFrac(v));
  ans=set([...new Set(rootTex)]);
  steps=[statement,...(statement===`${left}=${k*k}`?[]:[`${left}=${k*k}`]),`${left}-${k*k}=0`,`(${cf(m)}${sg(n)}-${k})(${cf(m)}${sg(n)}+${k})=0`,`${cf(m)}${sg(n)}=${k}\\;\\text{ou}\\;${cf(m)}${sg(n)}=-${k}`,ans];
  tag='caso-notavel';
 }else{
  // Prefer rational roots; use completion of square as the required method.
  let r1,r2,d1,d2,n1,n2;
  if(Math.random()<.84){d1=pick([1,1,1,2,3]);d2=pick([1,1,1,2,3]);n1=nz(-5,5);n2=nz(-5,5);r1=n1/d1;r2=n2/d2;
   if(r1===r2||r1===-r2)return completeNew(level,method);
   a=d1*d2;b=-(n1*d2+n2*d1);c=n1*n2;
  }else{a=ri(1,3);b=nz(-7,7);c=nz(-6,6);if(b*b-4*a*c>=0&&Number.isInteger(Math.sqrt(b*b-4*a*c)))return completeNew(level,method)}
  if(!a||!b||!c)return completeNew(level,method);
  const canonical=poly(a,b,c);
  shape=level===1?'canonica':level===2?pick(['canonica','dois-membros','produto']):pick(['produto','dois-membros','quadrado','produto','dois-membros']);
  if(shape==='canonica')statement=`${canonical}=0`;
  
  if(shape==='dois-membros'){const h=ri(2,5),t=level===3?nz(-5,5):0;statement=t?`${poly(a,b+t,c+h)}=${cf(t)}${sg(h)}`:`${poly(a,b,c+h)}=${h}`}
  if(shape==='produto'){
   const t=nz(-3,3),u=ri(1,3);
   // u(x+t)(x-t) + (a-u)x² + bx + (c+u t²) = canonical.
   const A=a-u,C=c+u*t*t;
   if(!A||!C)return completeNew(level,method);
   const tail=(A?`${A<0?'-':'+'}${Math.abs(A)===1?'':Math.abs(A)}x^2`:'')+(b?`${b<0?'-':'+'}${Math.abs(b)===1?'':Math.abs(b)}x`:'')+(C?sg(C):'');
   statement=`${u===1?'':u}(x${sg(t)})(x${sg(-t)})${tail}=0`;
  }
  if(shape==='quadrado'){
   const t=nz(-3,3),u=ri(1,2),A=a-u,B=b-2*u*t,C=c-u*t*t;
   if(!A||!B||!C)return completeNew(level,method);
   const tail=(A?`${A<0?'-':'+'}${Math.abs(A)===1?'':Math.abs(A)}x^2`:'')+(B?`${B<0?'-':'+'}${Math.abs(B)===1?'':Math.abs(B)}x`:'')+(C?sg(C):'');
   statement=`${u===1?'':u}(x${sg(t)})^2${tail}=0`;
  }
  if(shape==='fracao'){let d=pick([2,3,4]);statement=`\\frac{${canonical}}{${d}}=0`}
  const z=formula(a,b,c,level);
  ans=z.answer;
  steps=[statement,...(statement===`${canonical}=0`?[]:[`${canonical}=0`]),...z.steps.slice(1)];
  tag='completamento';
 }
 const z=q(statement,steps,ans,['Simplifica os dois membros e reduz os termos semelhantes.','Identifica o método adequado depois de obter a forma canónica.'],`v13-${tag}-${shape}`);
 z.canonical={a,b,c};z.method=tag;z.expectedRoots=roots||[];
 return z;
}
function productZeroNew(level){
 const u=ri(1,4),v=nz(-5,5),w=ri(1,4),t=nz(-5,5);
 const f=`(${cf(u)}${sg(v)})`,g=`(${cf(w)}${sg(t)})`;
 let statement,steps,shape,second=t;
 if(level===1){shape='produto-direto';statement=`${f}${g}=0`;steps=[statement,`${cf(u)}${sg(v)}=0\\;\\text{ou}\\;${cf(w)}${sg(t)}=0`]}
 else if(level===2){
  shape='fator-comum';const h=ri(1,4);second=t+h;
  statement=`${f}${g}+${h}${f}=0`;
  steps=[statement,`${f}(${cf(w)}${sg(second)})=0`,`${cf(u)}${sg(v)}=0\\;\\text{ou}\\;${cf(w)}${sg(second)}=0`];
 }else{
  shape=pick(['diferenca-quadrados','fator-comum']);
  if(shape==='diferenca-quadrados'&&(u===w||v===t||v===-t))return productZeroNew(level);
  if(shape==='diferenca-quadrados'){
   const A=`(${cf(u+w)}${v+t?sg(v+t):''})`,B=`(${u-w?cf(u-w):''}${v-t?sg(v-t):''})`;
   statement=`${A}^2-${B}^2=0`;
   steps=[statement,`(${A}-${B})(${A}+${B})=0`,`4${f}${g}=0`,`${f}${g}=0`,`${cf(u)}${sg(v)}=0\\;\\text{ou}\\;${cf(w)}${sg(t)}=0`];
  }else{
   // Construção substituída abaixo por uma fatorização com fator comum.
   shape='fator-comum';
  }
 }
 // Roots for the specialist common-factor case are obtained from the actual linear factor.
 if(level===3&&shape==='fator-comum'){
  // Use a clean factor-common exercise with a genuine simplification.
  const h=ri(2,4),shift=ri(1,3);second=t+shift;
  statement=`${h}${f}${g}+${h*shift}${f}=0`;
  steps=[statement,`${h}${f}(${cf(w)}${sg(second)})=0`,`${f}(${cf(w)}${sg(second)})=0`,`${cf(u)}${sg(v)}=0\\;\\text{ou}\\;${cf(w)}${sg(second)}=0`];
 }
 const rootList=[frac(-v,u),frac(-second,w)].sort((a,b)=>evalFrac(a)-evalFrac(b));
 const ans=set([...new Set(rootList)]);
 steps.push(ans);
 return q(statement,steps,ans,['Identifica um fator comum ou uma diferença de quadrados.','Aplica a lei do anulamento do produto após fatorizar.'],`v13-produto-${shape}`);
}
function validateNew(z){if(!z.canonical)return true;const {a,b,c}=z.canonical;return !!(a&&b&&c)}
function completeV4(lev,id){
 if(id==='notable'||id==='mixed')return completeNew(lev,id);
 if(id==='productzero')return productZeroNew(lev);
 if(lev===3)return completeNew(lev,'mixed');
 let m=lev===1?1:ri(1,4),n=nz(-7,7),k=ri(1,8);
 if(id==='parentheses'){
  const z=notable(m,n,k,lev);z.family='completa-caso-notavel';
  if(lev>=2){z.statement=`(${cf(m)}${sg(n)})^2=${k*k}`;z.steps=[`(${cf(m)}${sg(n)})^2=${k*k}`, ...z.steps.slice(2)];z.family='completa-parenteses-quadrado'}
  return z;
 }
 const roots=rationalComplete();let {a,b,c}=roots;
 if(id==='fractions'){
  const d=ri(2,6),z=formula(a,b,c,lev);z.statement=`\\frac{${poly(a,b,c)}}{${d}}=0`;z.steps=[`\\frac{${poly(a,b,c)}}{${d}}=0`,`${poly(a,b,c)}=0`,...z.steps.slice(1)];z.family='completa-fracao';return z;
 }
 if(lev>=2&&Math.random()<.45){
  const z=formula(a,b,c,lev),shift=ri(2,9);z.statement=`${poly(a,b,c+shift)}=${shift}`;z.steps=[`${poly(a,b,c+shift)}=${shift}`,`${poly(a,b,c)}=0`,...z.steps.slice(1)];z.family='completa-dois-membros';return z;
 }
 const z=formula(a,b,c,lev);z.family='completa-reduzida';return z;
}
function completeProblemV4(lev){
 const family=pick(lev===1?['consecutivos','retangulo-diferenca']:['consecutivos','retangulo-diferenca','numeros','triangulo']);
 if(family==='triangulo'){
  const n=ri(3,12),d=ri(2,7),area=n*(n+d)/2,z=formula(1,d,-2*area,lev);
  return textQ(`A base de um triângulo excede a altura em ${d} cm. A área é ${area} cm². Determina a altura e a base.`,[`\\frac{x(x+${d})}{2}=${area}`,`${poly(1,d,-2*area)}=0`,...z.steps.slice(1),`\\text{Como }x>0,\\text{ a altura é }${n}\\text{ cm e a base }${n+d}\\text{ cm.}`],`${n}\\text{ cm e }${n+d}\\text{ cm}`,['Aplica a fórmula da área do triângulo.'],'problema-completa-triangulo');
 }
 if(family==='consecutivos'){
  const n=ri(4,15),p=n*(n+1),z=formula(1,1,-p,lev);
  return textQ(`O produto de dois números naturais consecutivos é ${p}. Determina esses números.`,[`x(x+1)=${p}`,`${poly(1,1,-p)}=0`,...z.steps.slice(1),`\\text{No contexto, os números são }${n}\\text{ e }${n+1}.`],`${n}\\text{ e }${n+1}`,['Representa os números por x e x+1.'],'problema-completa-consecutivos');
 }
 if(family==='retangulo-diferenca'){
  const n=ri(4,13),d=ri(2,8),area=n*(n+d),z=formula(1,d,-area,lev);
  return textQ(`O comprimento de um retângulo excede a largura em ${d} cm. A área é ${area} cm². Determina as dimensões.`,[`x(x+${d})=${area}`,`${poly(1,d,-area)}=0`,...z.steps.slice(1),`\\text{Como }x>0,\\text{ a largura é }${n}\\text{ cm e o comprimento }${n+d}\\text{ cm.}`],`${n}\\text{ cm e }${n+d}\\text{ cm}`,['Representa a largura por x.'],'problema-completa-retangulo');
 }
 const n=ri(3,13),d=ri(1,6),p=n*(n+d),z=formula(1,d,-p,lev);
 return textQ(`O produto de um número natural pelo número que o excede em ${d} unidades é ${p}. Determina esse número.`,[`x(x+${d})=${p}`,`${poly(1,d,-p)}=0`,...z.steps.slice(1),`\\text{No contexto, }x=${n}.`],`${n}`,['Traduz o produto por uma equação.'],'problema-completa-numeros');
}
function specialistProblemV8(kind,lev){
 const full=kind==='complete';
 const families=full?['rectangle','triangle','consecutive','number-gap','garden','perimeter','frame','sum-squares']:['two-squares','rectangle-ratio','triangle-ratio','square-area','difference','pythagoras','square-perimeter'];
 const f=pick(families);
 if(!full){
  if(f==='square-area'){let x=ri(3,12),k=ri(2,5),A=k*k*x*x;
   return textQ(`Um terreno quadrado tem lado ${k} vezes maior do que o de outro terreno quadrado. A área do terreno maior é ${A} m². Determina o lado do terreno menor.`,[`(${k}x)^2=${A}`,`${k*k}x^2=${A}`,`x^2=${x*x}`,`x=${x}\\quad(x>0)`,`\\text{O lado do terreno menor mede }${x}\\text{ m.}`],`${x}\\text{ m}`,['Representa o lado menor por x.'],'v8-inc-quadrado-area');}
  if(f==='square-perimeter'){let x=ri(3,12),k=ri(2,5),A=k*x*x;
   return textQ(`Um retângulo tem comprimento ${k} vezes a largura e área ${A} cm². Determina o perímetro.`,[`${k}x^2=${A}`,`x^2=${x*x}`,`x=${x}\\quad(x>0)`,`P=2(${x}+${k*x})=${2*(k+1)*x}\\text{ cm}`],`${2*(k+1)*x}\\text{ cm}`,['Calcula primeiro a largura e o comprimento.'],'v8-inc-perimetro');}
  if(f==='difference'){let x=ri(3,10),k=ri(2,5),A=(k*k-1)*x*x;
   return textQ(`Dois quadrados têm lados na razão ${k}:1. A diferença das suas áreas é ${A} cm². Determina os dois lados.`,[`${k*k}x^2-x^2=${A}`,`${k*k-1}x^2=${A}`,`x^2=${x*x}`,`x=${x}\\quad(x>0)`,`\\text{Os lados medem }${x}\\text{ cm e }${k*x}\\text{ cm.}`],`${x}\\text{ cm e }${k*x}\\text{ cm}`,['Subtrai as áreas dos dois quadrados.'],'v8-inc-diferenca');}
  if(f==='pythagoras'){let t=ri(2,8),a=3*t,b=4*t,c=5*t;
   return textQ(`Um triângulo retângulo tem catetos de medidas x e quatro terços de x. Sabendo que a hipotenusa mede ${c} cm, determina a medida do cateto menor.`,[`x^2+\\left(\\frac43x\\right)^2=${c*c}`,`\\frac{25}{9}x^2=${c*c}`,`x^2=${a*a}`,`x=${a}\\quad(x>0)`,`\\text{O cateto menor mede }${a}\\text{ cm.}`],`${a}\\text{ cm}`,['Aplica o teorema de Pitágoras.'],'v8-inc-pitagoras');}
  if(f==='triangle-ratio'){let x=ri(3,10),k=ri(2,6),A=k*x*x/2;
   return textQ(`A base de um triângulo mede ${k} vezes a altura. A sua área é ${A} cm². Determina a base e a altura.`,[`\\frac{${k}x^2}{2}=${A}`,`x^2=${x*x}`,`x=${x}\\quad(x>0)`,`\\text{Altura: }${x}\\text{ cm; base: }${k*x}\\text{ cm.}`],`${x}\\text{ cm e }${k*x}\\text{ cm}`,['Usa a área do triângulo.'],'v8-inc-triangulo');}
  if(f==='rectangle-ratio'){let x=ri(3,11),k=ri(2,6),A=k*x*x;
   return textQ(`Um retângulo tem área ${A} m² e o comprimento é ${k} vezes a largura. Determina as dimensões.`,[`${k}x^2=${A}`,`x^2=${x*x}`,`x=${x}\\quad(x>0)`,`\\text{Largura: }${x}\\text{ m; comprimento: }${k*x}\\text{ m.}`],`${x}\\text{ m e }${k*x}\\text{ m}`,['Representa a largura por x.'],'v8-inc-retangulo');}
  let x=ri(3,10),A=x*x;
  return textQ(`A área de um quadrado é ${A} cm². Determina a medida da sua diagonal.`,[`x^2=${A}`,`x=${x}\\quad(x>0)`,`d^2=x^2+x^2=${2*A}`,`d=${x}\\sqrt2\\text{ cm}`],`${x}\\sqrt2\\text{ cm}`,['Determina o lado e aplica Pitágoras.'],'v8-inc-diagonal');
 }
 if(f==='sum-squares'){
  const n=ri(3,11),d=ri(2,6),v=n*n+(n+d)*(n+d);
  return textQ(`A soma dos quadrados de dois números naturais que diferem ${d} unidades é ${v}. Determina os números.`,[`x^2+(x+${d})^2=${v}`,`${poly(2,2*d,d*d-v)}=0`,...formula(2,2*d,d*d-v,lev).steps.slice(1),`\\text{Como os números são naturais, são }${n}\\text{ e }${n+d}.`],`${n}\\text{ e }${n+d}`,['Representa o menor número por x.'],'v10-com-soma-quadrados');
 }
 if(f==='garden'){let x=ri(3,11),d=ri(2,8),A=x*(x+d);
  return textQ(`Um jardim retangular tem comprimento ${d} metros maior do que a largura. A área é ${A} m². Determina o perímetro do jardim.`,[`x(x+${d})=${A}`,...formula(1,d,-A,lev).steps.slice(1),`\\text{Como }x>0,\\;x=${x}.`,`P=2(${x}+${x+d})=${4*x+2*d}\\text{ m}`],`${4*x+2*d}\\text{ m}`,['Determina primeiro as dimensões do jardim.'],'v8-com-jardim');}
 if(f==='perimeter'){let x=ri(3,12),d=ri(2,8),A=x*(x+d);
  return textQ(`Um retângulo tem área ${A} cm². O comprimento excede a largura em ${d} cm. Calcula o seu perímetro.`,[`x(x+${d})=${A}`,...formula(1,d,-A,lev).steps.slice(1),`\\text{Como }x>0,\\;x=${x}.`,`P=2(${x}+${x+d})=${4*x+2*d}\\text{ cm}`],`${4*x+2*d}\\text{ cm}`,['Modela a área por uma equação do 2.º grau.'],'v8-com-perimetro');}
 if(f==='frame'){let x=ri(3,10),d=ri(2,6),A=x*(x+d);
  return textQ(`Um painel retangular tem área ${A} dm². A altura é ${d} dm inferior à largura. Determina a largura e a altura.`,[`x(x+${d})=${A}`,...formula(1,d,-A,lev).steps.slice(1),`\\text{Como }x>0,\\text{ a largura mede }${x+d}\\text{ dm e a altura }${x}\\text{ dm.}`],`${x+d}\\text{ dm e }${x}\\text{ dm}`,['Escolhe a altura como incógnita e traduz a área.'],'v8-com-painel');}
 if(f==='number-gap'){let x=ri(4,12),d=ri(2,7),P=x*(x+d);
  return textQ(`O produto de dois números naturais é ${P}. O maior excede o menor em ${d} unidades. Determina os números.`,[`x(x+${d})=${P}`,...formula(1,d,-P,lev).steps.slice(1),`\\text{Os números naturais são }${x}\\text{ e }${x+d}.`],`${x}\\text{ e }${x+d}`,['Representa o menor número por x.'],'v8-com-numeros');}
 return completeProblemV4(lev);
}
// Validation: check generated numerical roots against the displayed quadratic equation.
// The engine retains symbolic steps, but this catches accidental mismatches in the statement.
function validateQuadratic(z){
 if(z.isText||!z.answer||!z.answer.startsWith('S='))return true;
 const statement=z.statement.replace(/\\frac\{(-?\d+)\}\{(\d+)\}/g,'($1/$2)').replace(/\\left|\\right/g,'');
 // Only validate direct polynomial equations here; transformed forms are checked by their generator.
 const m=statement.match(/^(-?\d*)x\^2([+-]\d*x)?([+-]\d+)?=0$/);
 if(!m)return true;
 const a=m[1]===''?1:m[1]==='-'?-1:Number(m[1]);
 const b=m[2]?(m[2].slice(0,-1)==='+'?1:m[2].slice(0,-1)==='-'?-1:Number(m[2].slice(0,-1))):0;
 const c=Number(m[3]||0);
 if(z.answer.includes('\\varnothing'))return b*b-4*a*c<0;
 const roots=[...z.answer.matchAll(/\\frac\{(-?\d+)\}\{(\d+)\}|(?<![\d{])-?\d+(?![\d}])/g)].map(x=>x[1]!==undefined?Number(x[1])/Number(x[2]):Number(x[0]));
 return roots.length>0&&roots.every(x=>Math.abs(a*x*x+b*x+c)<1e-7);
}
function balancedTopicQuestion(kind,lev,id,used,families){
 let best=null,bestScore=Infinity;
 for(let attempt=0;attempt<140;attempt++){
  const previous={...state};state.kind=kind;state.level=lev;let z;
  try{z=topicQuestion(kind,lev,id)}finally{Object.assign(state,previous)}
  if(!validateQuadratic(z)||!validateNew(z))continue;
  const family=sheetFamily(z),key=questionKey(z);
  const sem=semanticFamily(family);
  const score=(used.has(key)?100000:0)+(families.get(family)||0)*300+(families.get('semantic:'+sem)||0)*170+Math.random()*4;
  if(score<bestScore){best=z;bestScore=score}
  if(score<5)break;
 }
 if(best){const f=sheetFamily(best),sem=semanticFamily(f);used.add(questionKey(best));families.set(f,(families.get(f)||0)+1);families.set('semantic:'+sem,(families.get('semantic:'+sem)||0)+1)}
 return best;
}
function semanticFamily(f){
 if(/retangulo|jardim|painel|perimetro|rectangle|frame/.test(f))return 'retangulos';
 if(/triangulo|pitagoras|diagonal/.test(f))return 'triangulos';
 if(/quadrado|square|diferenca/.test(f))return 'quadrados';
 if(/numeros|consecutivos|number|soma-quadrados/.test(f))return 'numeros';
 if(/classificacao/.test(f))return 'classificacao';
 return f;
}

function generateSheet(){
 const counts=Object.fromEntries(sheetTopics.flatMap(g=>g.items.map(([id])=>[id,activeSheetGroups.has(g.id)?(sheetDefaults[id]||0):0])));
 if(!Object.values(counts).some(Boolean)){alert('Seleciona pelo menos um exercício.');return}
 const lev=+$('#sheetLevel').value,kindChoice=$('#sheetKind').value;
 const used=new Set(),families=new Map();sheetItems=[];
 const chooseKind=(i)=>kindChoice==='both'?(i%2?'complete':'incomplete'):kindChoice;
 const entries=sheetTopics.filter(g=>activeSheetGroups.has(g.id)).flatMap(g=>g.items.map(([id,label])=>({id,label,group:g.name})));
 for(const {id,label,group} of entries){
  for(let i=0;i<counts[id];i++){
   const kind=chooseKind(i+sheetItems.length);
   // Select the closest supported internal family; distribute problems and error types automatically.
   const actualKind=(id==='notable'||id==='mixed'||id==='productzero')?'complete':kind;
   const z=balancedTopicQuestion(actualKind,lev,id,used,families);
   if(z)sheetItems.push({...z,sheetGroup:group,sheetTopic:label});
  }
 }
 if($('#sheetOrganization').value==='mix'){
  for(let i=sheetItems.length-1;i>0;i--){let j=ri(0,i);[sheetItems[i],sheetItems[j]]=[sheetItems[j],sheetItems[i]]}
 }
 sheetSolutions=false;$('#sheetSettings').classList.add('hidden');$('#sheetPreview').classList.remove('hidden');renderSheet();
}
function renderSheet(){
 const grouped=$('#sheetOrganization').value==='group';let last='';
 let html=`<div class="paperHeader"><div class="paperBrand">MathLab 7–9 · Matemática · 9.º ano</div><h2>Ficha de trabalho — Equações do 2.º grau</h2><p>9.º ano · ${['','Principiante','Intermédio','Especialista'][+$('#sheetLevel').value]}</p><div class="studentLine">Nome: ___________________________ Turma: ______ Data: ____ / ____ / ______</div></div>`;
 sheetItems.forEach((z,i)=>{
  if(grouped&&z.sheetGroup!==last){html+=`<h3>${z.sheetGroup}</h3>`;last=z.sheetGroup}
  html+=`<article class="paperExercise"><div>${i+1}. ${esc(z.prompt)}</div><div class="paperMath">${statementHTML(z)}</div>${sheetSolutions?`<div class="paperSteps">${z.steps.filter((step,j)=>step!==z.steps[j-1]&&!(j===0&&step===z.statement)).map(step=>`<div>${tex(step,true)}</div>`).join('')}</div>`:'<div class="answerSpace"></div>'}</article>`;
 });
 html+='<div class="paperFooter">© 2026 — Nuno Araújo · MathLab 7–9</div>';
 $('#paper').innerHTML=html;$('#toggleSolutions').textContent=sheetSolutions?'Ocultar soluções':'Ver soluções';typeset();
}
$('#makeSheet').onclick=generateSheet;$('#changeSheet').onclick=renderSheetConfig;$('#newSheet').onclick=generateSheet;$('#toggleSolutions').onclick=()=>{sheetSolutions=!sheetSolutions;renderSheet()};$('#printSheet').onclick=()=>window.print();
const params=new URLSearchParams(location.search);if(params.get('ano')==='9'||location.hash==='#ano-9'){}setMode('free');
})();
