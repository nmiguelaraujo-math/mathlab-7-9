(()=>{'use strict';const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],ri=(a,b)=>Math.floor(Math.random()*(b-a+1))+a,pick=a=>a[ri(0,a.length-1)],nz=(a,b)=>{let n=0;while(!n)n=ri(a,b);return n},gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a),frac=(n,d=1)=>{if(d<0){n=-n;d=-d}let g=gcd(n,d);n/=g;d/=g;return d===1?`${n}`:`\\frac{${n}}{${d}}`},sg=n=>n<0?`-${Math.abs(n)}`:`+${n}`,cf=(n,v='x')=>n===1?v:n===-1?`-${v}`:`${n}${v}`,poly=(a,b,c)=>`${cf(a,'x^2')}${b?(b<0?'-':'+')+(Math.abs(b)===1?'x':`${Math.abs(b)}x`):''}${c?sg(c):''}`,rterm=(n,d,v,first=false)=>{if(!n)return'';let s=n<0?'-':first?'':'+';let f=frac(Math.abs(n),d);return s+(f==='1'&&v?'':f)+v},rpoly=(a,b,c,d)=>rterm(a,d,'x^2',true)+rterm(b,d,'x')+rterm(c,d,''),set=xs=>xs.length?`S=\\left\\{${xs.join(',')}\\right\\}`:'S=\\varnothing';let state={kind:'incomplete',level:1,training:'solve',mode:'free'},current,helpIndex=0,test=[];let answerVisible=false,resolutionVisible=false;
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
function generate(){return state.training==='errors'?errorExtra():state.training==='problems'?mlProblemBank(state.kind,state.level):state.kind==='incomplete'?incompleteDiverseV141(state.level,pick(['direct','parentheses','fractions'])):completeDiverseV141(state.level,'mixed')}

function typeset(){try{window.MathJax?.typesetPromise?.()}catch(e){console.warn(e)}}
function tex(s,display=false){return display?'\\['+s+'\\]':'\\('+s+'\\)'}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
function makeQuestion(kind,level,training){const previous={...state};state.kind=kind;state.level=level;state.training=training;let z;try{z=generate()}finally{Object.assign(state,previous)}return {...z,kind,level,training}}
function questionKey(z){return z.family+'|'+z.statement}
function makeDistinct(kind,level,training,used){let z;for(let i=0;i<90;i++){z=makeQuestion(kind,level,training);if(!used.has(questionKey(z))&&!used.has('solution:'+(z.solutionKey||z.answer)))break}used.add(questionKey(z));used.add('solution:'+(z.solutionKey||z.answer));return z}
function setMode(mode){state.mode=mode;$$('[data-mode]').forEach(b=>b.classList.toggle('active',b.dataset.mode===mode));['free','sheet','test'].forEach(m=>$('#'+m+'Panel').classList.toggle('hidden',m!==mode));if(mode!=='free')$('#exercise').classList.add('hidden');if(mode==='free'){$$('#setup button').forEach(b=>b.disabled=false)}if(mode==='sheet')renderSheetConfig();if(mode==='test')renderTestConfig()}
function render(){current=makeQuestion(state.kind,state.level,state.training);helpIndex=0;answerVisible=false;resolutionVisible=false;updateRevealButtons();$('#exercise').classList.remove('hidden');$('#reveal').innerHTML='';$('#badges').innerHTML=`<span>9.º ano</span><span>${state.kind==='incomplete'?'Equação incompleta':'Equação completa'}</span><span>${['','Principiante','Intermédio','Especialista'][state.level]}</span>`;$('#prompt').textContent=current.prompt;$('#statement').innerHTML=mlProblemHTML(current);typeset()}
function updateRevealButtons(){
 $('#answer').textContent=answerVisible?'Ocultar resposta':'Ver resposta';
 $('#solution').textContent=resolutionVisible?'Ocultar resolução':'Ver resolução';
 $('#answer').setAttribute('aria-expanded',String(answerVisible));
 $('#solution').setAttribute('aria-expanded',String(resolutionVisible));
}
function showAnswer(){answerVisible=!answerVisible;resolutionVisible=false;updateRevealButtons();$('#reveal').innerHTML=answerVisible?`<div class="reveal"><div>Resposta</div><div>${tex(current.answer,true)}</div></div>`:'';if(answerVisible)typeset()}
function showHelp(){answerVisible=false;resolutionVisible=false;updateRevealButtons();let h=current.helps[Math.min(helpIndex,current.helps.length-1)];helpIndex++;$('#reveal').innerHTML=`<div class="reveal"><div>Ajuda ${Math.min(helpIndex,current.helps.length)}/${current.helps.length}</div><div>${h}</div></div>`;typeset()}
function showSolution(){resolutionVisible=!resolutionVisible;answerVisible=false;updateRevealButtons();if(!resolutionVisible){$('#reveal').innerHTML='';return}let html=current.steps.map((s,i)=>`<div class="step"><span>${i+1}.</span> ${tex(s,true)}</div>`).join('');$('#reveal').innerHTML=`<div class="reveal"><div>Resolução</div>${html}</div>`;typeset()}
function updateLabels(){let c=state.kind==='complete';$('#level1').textContent=c?'Casos notáveis diretos':'Equações da forma ax² = 0 e ax² + c = 0';$('#level2').textContent=c?'Quadrados de binómios':'Fator comum e lei do anulamento do produto';$('#level3').textContent=c?'Coeficientes racionais e completamento do quadrado':'Redução, parênteses e frações'}
$$('[data-group]').forEach(b=>b.onclick=()=>{let g=b.dataset.group;state[g]=g==='level'?+b.dataset.value:b.dataset.value;$$(`[data-group="${g}"]`).forEach(x=>x.classList.toggle('active',x===b));if(g==='kind')updateLabels()});$$('[data-mode]').forEach(b=>b.onclick=()=>setMode(b.dataset.mode));$('#new').onclick=$('#another').onclick=render;$('#help').onclick=showHelp;$('#answer').onclick=showAnswer;$('#solution').onclick=showSolution;
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
const incompleteSheetItems=[['direct','Equações incompletas diretas'],['parentheses','Equações incompletas com parênteses e redução'],['fractions','Equações incompletas com frações']];
const completeSheetItems=[['notable','Casos notáveis'],['mixed','Equações completas mistas'],['productzero','Lei do anulamento do produto (com fatorização prévia)']];
function sheetTopicsFor(kind){return sheetTopics.map(g=>g.id==='solve'?{...g,items:kind==='incomplete'?incompleteSheetItems:kind==='complete'?completeSheetItems:[...incompleteSheetItems,...completeSheetItems]}:g)}
function sheetKindForTopic(id,choice,index){if(['direct','parentheses','fractions'].includes(id))return 'incomplete';if(['notable','mixed','productzero'].includes(id))return 'complete';return choice==='both'?(index%2?'complete':'incomplete'):choice}
const sheetDefaults={notable:0,mixed:0,productzero:0,direct:0,parentheses:0,fractions:0,classification:0,errors:0,parameters:0,problems:0};
const activeSheetGroups=new Set(['solve','concepts','problems']);
let sheetItems=[],sheetSolutions=false;
function renderSheetConfig(){
 $('#sheetPreview').classList.add('hidden');$('#sheetSettings').classList.remove('hidden');
 const availableTopics=sheetTopicsFor($('#sheetKind').value);
 const cards=$('#sheetTypeCards');
 cards.innerHTML=availableTopics.map(g=>`<label class="sheetTypeCard ${activeSheetGroups.has(g.id)?'selected':''}"><input type="checkbox" data-sheet-group="${g.id}" ${activeSheetGroups.has(g.id)?'checked':''}><span><strong>${g.name}</strong><small>${g.description}</small></span></label>`).join('');
 cards.querySelectorAll('[data-sheet-group]').forEach(el=>el.onchange=()=>{if(el.checked)activeSheetGroups.add(el.dataset.sheetGroup);else activeSheetGroups.delete(el.dataset.sheetGroup);renderSheetConfig()});
 const wrap=$('#sheetTopicControls');
 wrap.innerHTML=availableTopics.filter(g=>activeSheetGroups.has(g.id)).map(g=>`<div class="topicGroup"><h4>${g.name}</h4>${g.items.map(([id,label])=>`<div class="topicLine"><span>${label}</span><div class="stepper"><button type="button" data-step="${id}" data-delta="-1" aria-label="Diminuir ${label}">−</button><output id="count-${id}">${sheetDefaults[id]}</output><button type="button" data-step="${id}" data-delta="1" aria-label="Aumentar ${label}">+</button></div></div>`).join('')}</div>`).join('');
 wrap.querySelectorAll('[data-step]').forEach(b=>b.onclick=()=>{const id=b.dataset.step,out=$('#count-'+id);sheetDefaults[id]=Math.max(0,Math.min(40,+out.textContent+(+b.dataset.delta)));out.textContent=sheetDefaults[id];updateSheetTotal()});
 updateSheetTotal();
}
$('#sheetKind').addEventListener('change',()=>{const allowed=new Set(sheetTopicsFor($('#sheetKind').value).flatMap(g=>g.items.map(([id])=>id)));for(const id of Object.keys(sheetDefaults)){if(!allowed.has(id))sheetDefaults[id]=0}renderSheetConfig()});
function updateSheetTotal(){let n=sheetTopicsFor($('#sheetKind').value).filter(g=>activeSheetGroups.has(g.id)).flatMap(g=>g.items).reduce((sum,[id])=>sum+sheetDefaults[id],0);$('#sheetTotal').textContent=n}
function sheetFamily(z){return z.family||z.training+'-'+z.kind}
function balancedQuestion(kind,lev,training,used,families){
 let best=null,bestScore=Infinity;
 for(let attempt=0;attempt<90;attempt++){
  const z=makeQuestion(kind,lev,training),family=sheetFamily(z),key=questionKey(z);
  const score=(used.has(key)?10000:0)+(families.get(family)||0)*100+Math.random()*10;
  if(score<bestScore){best=z;bestScore=score}
  if(!used.has(key)&&!families.has(family)&&!families.has('semantic:'+semantic))break;
 }
 if(best){used.add(questionKey(best));if(best.solutionKey||((best.answer||'').startsWith('S=')))used.add('solution:'+(best.solutionKey||best.answer));families.set(sheetFamily(best),(families.get(sheetFamily(best))||0)+1)}
 return best;
}
// V4: os tópicos de configuração têm geradores reais, não são apenas etiquetas.

// MathLab — banco de problemas visuais, independente dos geradores de equações.
// SVG vetorial com medidas produzidas pelos mesmos parâmetros do enunciado.
function mlSvg(body,w=330,h=190){return `<svg class="mlProblemSvg" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Figura geométrica do problema">${body}</svg>`}
function mlText(x,y,t,size=15){return `<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" fill="#23364b" font-family="Arial,sans-serif">${String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;')}</text>`}
function mlRect(wlabel,hlabel,shape='rectangle'){
 const r=shape==='square'?`<rect x="95" y="28" width="128" height="128" fill="#d9edfa" stroke="#2479a6" stroke-width="2"/>`:`<rect x="62" y="38" width="205" height="111" fill="#d9edfa" stroke="#2479a6" stroke-width="2"/>`;
 return mlSvg(r+mlText(165,177,wlabel)+mlText(shape==='square'?72:36,99,hlabel),330,194);
}
function mlTriangle(a,b,c=''){return mlSvg(`<polygon points="65,153 65,36 264,153" fill="#d4f3ed" stroke="#278e7c" stroke-width="2"/><path d="M65 140 h13 v13" fill="none" stroke="#278e7c" stroke-width="2"/>`+mlText(165,178,b)+mlText(38,98,a)+(c?mlText(194,70,c):''));}
function mlTwoSquares(outer,inner){return mlSvg(`<rect x="70" y="15" width="160" height="160" fill="#f5c6d8" stroke="#bd4676" stroke-width="2"/><rect x="126" y="70" width="50" height="50" fill="white" stroke="#bd4676" stroke-width="2"/>`+mlText(150,191,outer)+mlText(151,65,inner),300,205)}
function mlTrap(a,b,h){return mlSvg(`<polygon points="60,152 270,152 185,43 60,43" fill="#eedbf7" stroke="#9563b0" stroke-width="2"/><path d="M60 139 h13 v13 M60 43 v13 h13" fill="none" stroke="#9563b0"/>`+mlText(165,176,b)+mlText(122,35,a)+mlText(35,102,h));}
function mlPrism(a,b,c){return mlSvg(`<polygon points="55,69 203,69 255,31 106,31" fill="#ffdfc1" stroke="#cb7d3c" stroke-width="2"/><polygon points="203,69 255,31 255,129 203,168" fill="#f5bc93" stroke="#cb7d3c" stroke-width="2"/><rect x="55" y="69" width="148" height="99" fill="#fbd2ad" stroke="#cb7d3c" stroke-width="2"/>`+mlText(130,187,a)+mlText(239,166,b)+mlText(35,122,c),315,200)}
function mlSequence(n=3,style='grid'){
 let out='';for(let k=1;k<=3;k++){let ox=(k-1)*115+14,oy=18;let count=style==='grid'?k*k+k:k*k+2*k;for(let j=0;j<count;j++){let col=j%(k+2),row=Math.floor(j/(k+2));out+=`<rect x="${ox+col*12}" y="${oy+row*12}" width="10" height="10" fill="${style==='grid'?'#9bcde5':j<k*k?'#9bcde5':'#f6b76c'}" stroke="#64859b" stroke-width=".5"/>`;}out+=mlText(ox+35,110,`${k}.º termo`,12)}return mlSvg(out,350,122);
}
function mlProblem(statement,steps,answer,family,svg,help='Identifica a incógnita e traduz os dados numa equação.'){
 const z=textQ(statement,steps,answer,[help,'Resolve a equação e verifica se a solução é admissível no contexto.'],`ml-problema-${family}`);z.diagram=svg||'';z.structureKey=`ml-problema-${family}`;z.solutionKey=`${family}:${answer}`;return z;
}
function mlCompleteEquation(a,b,c,first,final){const z=formula(a,b,c,2);return [first,`${poly(a,b,c)}=0`,...z.steps.slice(1),final]}
// Rotação global dos modelos visuais (Treino livre e Criar ficha).
// Só se repete um modelo quando todos os modelos elegíveis para a seleção
// já foram apresentados. Famílias que partilham o mesmo desenho contam
// como um único modelo visual; os parâmetros variam a cada utilização.
const mlVisualModel={
 rectangle:'rect',garden:'rect','equal-areas':'rect','square-area':'rect','rectangle-ratio':'rect',
 triangle:'triangle',pythagoras:'triangle','right-triangle':'triangle','triangle-area':'triangle',
 'pythagoras-ratio':'triangle','triangle-same-area':'triangle',isosceles:'triangle',
 trapezoid:'trapezoid','trapezoid-equal':'trapezoid',
 sequence:'sequence-blocks','flower-sequence':'sequence-grid',
 'flower-pattern':'sequence-flowers','tile-pattern':'sequence-tiles',
 'two-squares':'nested-squares','equal-squares':'nested-squares','frame-square':'nested-squares',
 'square-border':'nested-squares','square-cut':'nested-squares',
 'nested-rect':'nested-rect','border-path':'nested-rect',
 'corner-cut':'corner-cut','equal-triangle':'equal-triangle',
 'square-strips':'square-strips','square-window':'square-window',
 'square-diagonal':'square-diagonal','prism':'prism',
 'double-square':'double-square'
};
const mlVisualUsed=new Set();
const mlFamilyUsedByModel=new Map();
function mlVisualKey(f){return mlVisualModel[f]||f;}
function mlPickFamily(pool){
 const unique=[...new Set(pool)];
 const models=[...new Set(unique.map(mlVisualKey))];
 let available=models.filter(m=>!mlVisualUsed.has(m));
 if(!available.length){for(const m of models)mlVisualUsed.delete(m);available=models;}
 const model=pick(available);
 const choices=unique.filter(f=>mlVisualKey(f)===model);
 let history=mlFamilyUsedByModel.get(model);
 if(!history){history=new Set();mlFamilyUsedByModel.set(model,history);}
 let families=choices.filter(f=>!history.has(f));
 if(!families.length){history.clear();families=choices;}
 const family=pick(families);
 history.add(family);mlVisualUsed.add(model);
 return family;
}
function mlDiagramComposite(type,labels){
 const [a,b,c]=labels;
 if(type==='nested')return mlSvg(`<rect x="58" y="22" width="205" height="142" fill="#f7d7e4" stroke="#ba4d7a" stroke-width="2"/><rect x="115" y="62" width="91" height="63" fill="white" stroke="#ba4d7a" stroke-width="2"/>`+mlText(160,186,a)+mlText(160,55,b)+mlText(35,98,c||''));
 if(type==='cut')return mlSvg(`<path d="M60 22 H255 V104 H199 V167 H60 Z" fill="#f7d7e4" stroke="#ba4d7a" stroke-width="2"/>`+mlText(156,188,a)+mlText(229,119,b)+mlText(35,100,c||''));
 if(type==='equal')return mlSvg(`<rect x="20" y="50" width="125" height="96" fill="#d9edfa" stroke="#2479a6" stroke-width="2"/><polygon points="180,146 180,50 314,146" fill="#d4f3ed" stroke="#278e7c" stroke-width="2"/><path d="M180 134 h12 v12" fill="none" stroke="#278e7c"/>`+mlText(80,165,a)+mlText(160,98,b)+mlText(255,165,c||''),340,192);
 if(type==='strips')return mlSvg(`<rect x="55" y="28" width="220" height="145" fill="#d9edfa" stroke="#2479a6" stroke-width="2"/><rect x="55" y="28" width="220" height="36" fill="#f4c48b"/><rect x="55" y="28" width="37" height="145" fill="#f4c48b"/>`+mlText(165,193,a)+mlText(32,104,b)+mlText(165,53,c||''));
 return mlRect(a,b);
}
function mlSequencePicture(n,mode){let out='';for(let k=1;k<=3;k++){let ox=12+(k-1)*113,sz=11,rows=k,cols=k;for(let r=0;r<rows;r++)for(let c=0;c<cols;c++)out+=`<rect x="${ox+16+c*sz}" y="${18+r*sz}" width="10" height="10" fill="#9bcde5" stroke="#537d92" stroke-width=".5"/>`;let extras=mode==='flowers'?k:2*k;for(let j=0;j<extras;j++){let px=ox+(j%Math.max(1,k+1))*sz,py=18+Math.floor(j/Math.max(1,k+1))*sz;if(mode==='flowers')out+=`<circle cx="${px+6}" cy="${py+6}" r="5" fill="#f6b76c" stroke="#b47b29"/>`;else out+=`<rect x="${px}" y="${65+Math.floor(j/(k+2))*sz}" width="10" height="10" fill="#f6b76c" stroke="#b47b29" stroke-width=".5"/>`;}out+=mlText(ox+35,116,`${k}.º termo`,12)}return mlSvg(out,350,130);}
function mlNewFamily(f,x,d,level){
 if(f==='nested-rect'){let w=x+d,h=x+1,cut=ri(2,4),area=w*h-cut*cut;return mlProblem(`Uma placa retangular de dimensões x + ${d} cm e x + 1 cm tem uma abertura quadrada de lado ${cut} cm. A parte colorida mede ${area} cm². Determina x.`,mlCompleteEquation(1,d+1,d-cut*cut-area,`(x+${d})(x+1)-${cut*cut}=${area}`,`\\text{No contexto: }x=${x}.`),`${x}`,f,mlDiagramComposite('nested',[`x + ${d}`,String(cut),'x + 1']));}
 if(f==='corner-cut'){let cut=ri(2,4),area=x*(x+d)-cut*cut;return mlProblem(`A figura é um retângulo de lados x e x + ${d} cm, ao qual foi retirado um quadrado de lado ${cut} cm num canto. A área colorida é ${area} cm². Determina x.`,mlCompleteEquation(1,d,-cut*cut-area,`x(x+${d})-${cut*cut}=${area}`,`\\text{No contexto: }x=${x}.`),`${x} cm`,f,mlDiagramComposite('cut',[`x + ${d}`,String(cut),'x']));}
 if(f==='equal-triangle'){let area=x*(x+d),height=2,base=area;return mlProblem(`Um retângulo tem lados x e x + ${d} cm. A sua área é igual à de um triângulo com altura ${height} cm e base ${base} cm. Determina x.`,mlCompleteEquation(1,d,-area,`x(x+${d})=\\frac{${base}\\times ${height}}{2}`,`\\text{No contexto: }x=${x}.`),`${x} cm`,f,mlDiagramComposite('equal',['x + '+d,'x',String(base)]));}
 if(f==='border-path'){let w=ri(2,5),outer=(x+2*w)*(x+d+2*w),inner=x*(x+d),border=outer-inner;return mlProblem(`Um canteiro retangular tem lados x e x + ${d} metros. À sua volta existe um passeio de largura uniforme ${w} m. A área total do canteiro e do passeio é ${outer} m². Determina x.`,mlCompleteEquation(1,d+4*w,4*w*w+2*w*d-outer,`(x+${2*w})(x+${d+2*w})=${outer}`,`\\text{No contexto: }x=${x}.`),`${x} m`,f,mlDiagramComposite('nested',[`x + ${d+2*w}`,'canteiro',`x + ${2*w}`]));}
 if(f==='two-consecutive'){let prod=x*(x+1);return mlProblem(`O produto de dois números naturais consecutivos é ${prod}. Determina os números.`,mlCompleteEquation(1,1,-prod,`n(n+1)=${prod}`,`\\text{Os números são }${x}\\text{ e }${x+1}.`),`${x} e ${x+1}`,f,'');}
 if(f==='flower-pattern'||f==='tile-pattern'){let b=f==='flower-pattern'?1:2,n=ri(8,18),total=n*n+b*n;return mlProblem(`Observa a sequência de figuras: em cada termo de ordem n há n² elementos azuis e ${b===1?'n':'2n'} elementos laranja. Qual é a ordem do termo com ${total} elementos?`,mlCompleteEquation(1,b,-total,`n^2+${b}n=${total}`,`\\text{A ordem é }n=${n}.`),`${n}.º termo`,f,mlSequencePicture(n,f==='flower-pattern'?'flowers':'tiles'));}
 if(f==='trapezoid-equal'){let top=ri(2,5),bottom=x+d,height=x,area=(top+bottom)*height/2;return mlProblem(`Um trapézio retângulo tem bases ${top} cm e x + ${d} cm e altura x cm. A sua área é ${area} cm². Determina a altura.`,mlCompleteEquation(1,top+d,-2*area,`\\frac{(${top}+x+${d})x}{2}=${area}`,`\\text{No contexto: }x=${x}.`),`${x} cm`,f,mlTrap(String(top),`x + ${d}`,'x'));}
 if(f==='square-strips'){let width=ri(2,5),area=x*x+width*x;return mlProblem(`Um terreno quadrado de lado x m é ampliado com uma faixa retangular de largura ${width} m ao longo de um dos lados. A área final é ${area} m². Determina o lado inicial.`,mlCompleteEquation(1,width,-area,`x(x+${width})=${area}`,`\\text{No contexto: }x=${x}.`),`${x} m`,f,mlDiagramComposite('strips',[`x + ${width}`,'x',`${width} m`]));}
 if(f==='cube-volume'){let volume=x*x*x;return mlProblem(`Uma caixa cúbica tem volume ${volume} cm³. Determina a medida da aresta.`,[`x^3=${volume}`,`x=${x}\\quad(x>0)`],`${x} cm`,f,mlPrism('x','x','x'));}
 if(f==='double-square'){let area=2*x*x;return mlProblem(`Dois quadrados congruentes têm área total ${area} cm². Determina o lado de cada quadrado.`,[`2x^2=${area}`,`x^2=${x*x}`,`x=${x}\\quad(x>0)`],`${x} cm`,f,mlSvg(`<rect x="35" y="30" width="105" height="105" fill="#d9edfa" stroke="#2479a6" stroke-width="2"/><rect x="190" y="30" width="105" height="105" fill="#d9edfa" stroke="#2479a6" stroke-width="2"/>`+mlText(87,155,'x')+mlText(241,155,'x')));}
 if(f==='triangle-same-area'){let a=ri(2,5),area=a*x*x/2;return mlProblem(`Um triângulo tem base ${a}x e altura x, em centímetros. A área é ${area} cm². Determina x.`,[`\\frac{${a}x^2}{2}=${area}`,`x^2=${x*x}`,`x=${x}\\quad(x>0)`],`${x} cm`,f,mlTriangle('x',`${a}x`));}
 if(f==='frame-square'){let k=ri(2,4),outer=k*x,inner=x,area=(k*k-1)*x*x;return mlProblem(`A moldura colorida resulta de retirar um quadrado de lado x cm de um quadrado de lado ${k}x cm. A área colorida é ${area} cm². Determina x.`,[`${k*k}x^2-x^2=${area}`,`${k*k-1}x^2=${area}`,`x=${x}\\quad(x>0)`],`${x} cm`,f,mlTwoSquares(`${k}x`,'x'));}
 return null;
}

function mlProblemBank(kind,level){
 const full=kind==='complete';
 const pool=full?
  (level===1?['rectangle','garden','numbers','triangle','sequence','equal-areas']:level===2?['rectangle','garden','numbers','triangle','sequence','equal-areas','trapezoid','pythagoras','flower-sequence','square-window','sum-squares','nested-rect','corner-cut','equal-triangle','border-path','two-consecutive','flower-pattern','tile-pattern']:['rectangle','garden','numbers','triangle','sequence','equal-areas','trapezoid','pythagoras','flower-sequence','square-window','sum-squares','nested-rect','corner-cut','equal-triangle','border-path','two-consecutive','flower-pattern','tile-pattern','right-triangle','two-numbers','nested-rect','corner-cut','equal-triangle','border-path','two-consecutive','flower-pattern','tile-pattern','trapezoid-equal','square-strips']):
  (level===1?['square-area','square-diagonal','rectangle-ratio','triangle-area']:level===2?['square-area','square-diagonal','rectangle-ratio','triangle-area','two-squares','prism','isosceles','double-square','triangle-same-area']:['square-area','square-diagonal','rectangle-ratio','triangle-area','two-squares','prism','isosceles','double-square','triangle-same-area','equal-squares','pythagoras-ratio','double-square','triangle-same-area','frame-square']);
 const f=mlPickFamily(pool),x=ri(level===1?3:4,level===3?13:10),d=ri(2,level===3?8:5),u=level===3?'m':'cm';
 const expanded=mlNewFamily(f,x,d,level);if(expanded)return expanded;
 if(f==='rectangle'||f==='garden'){
  const A=x*(x+d),p=2*(2*x+d),statement=f==='garden'?`Um jardim retangular tem ${A} m² de área. O comprimento excede a largura em ${d} m. Determina o perímetro do jardim.`:`O retângulo da figura tem ${A} cm² de área. Determina as dimensões.`;
  const answer=f==='garden'?`${p} m`:`${x} cm e ${x+d} cm`;
  return mlProblem(statement,mlCompleteEquation(1,d,-A,`x(x+${d})=${A}`,`\\text{No contexto: }x=${x};\\;${f==='garden'?`P=${p}`:`x+${d}=${x+d}`}.`),answer,f,mlRect('x + '+d,'x'));
 }
 if(f==='numbers'||f==='two-numbers'){let p=x*(x+d);return mlProblem(`O produto de dois números naturais cuja diferença é ${d} é ${p}. Determina os números.`,mlCompleteEquation(1,d,-p,`x(x+${d})=${p}`,`\\text{Os números são }${x}\\text{ e }${x+d}.`),`${x} e ${x+d}`,f,'');}
 if(f==='triangle'){let A=x*(x+d)/2;return mlProblem(`A área do triângulo da figura é ${A} cm². Determina as medidas da base e da altura.`,mlCompleteEquation(1,d,-2*A,`\\frac{x(x+${d})}{2}=${A}`,`\\text{Altura }${x}\\text{ cm; base }${x+d}\\text{ cm.}`),`${x} cm e ${x+d} cm`,f,mlTriangle('x','x + '+d));}
 if(f==='sequence'||f==='flower-sequence'){let n=ri(7,16),total=f==='sequence'?n*n+2*n:n*n+n;let b=f==='sequence'?2:1;return mlProblem(`Observa os três primeiros termos da sequência figurativa. O número total de elementos do termo de ordem n é dado por n² + ${b}n. Existe um termo com ${total} elementos. Determina a sua ordem.`,mlCompleteEquation(1,b,-total,`n^2+${b}n=${total}`,`\\text{A ordem é }n=${n}.`),`${n}.º termo`,f,mlSequence(3,f==='sequence'?'blocks':'grid'))}
 if(f==='square-border'||f==='square-cut'){let small=ri(2,5),A=x*x-small*small;return mlProblem(`A região colorida é a diferença entre dois quadrados, de lados x e ${small} cm. Sabendo que a área colorida é ${A} cm², determina o lado do quadrado maior.`,[`x^2-${small*small}=${A}`,`x^2=${x*x}`,`x=${x}\\quad(x>0)`],`${x} cm`,f,mlTwoSquares('x',String(small)));}
 if(f==='equal-areas'){let width=x+1,height=x+2,A=width*height;return mlProblem(`Um retângulo tem lados x + 1 e x + 2, em centímetros. A sua área é igual à de um quadrado com ${A} cm² de área. Determina x.`,mlCompleteEquation(1,3,2-A,`(x+1)(x+2)=${A}`,`\\text{No contexto: }x=${x}.`),`${x}`,f,mlRect('x + 1','x + 2'));}
 if(f==='trapezoid'){let top=ri(2,5),bottom=x+d, height=x, area=(top+bottom)*x/2;let b=top+d;return mlProblem(`O trapézio retângulo tem bases ${top} cm e x + ${d} cm e altura x cm. A área é ${area} cm². Determina x.`,mlCompleteEquation(1,b,-2*area,`\\frac{(${top}+x+${d})x}{2}=${area}`,`\\text{No contexto: }x=${x}.`),`${x} cm`,f,mlTrap(String(top),'x + '+d,'x'));}
 if(f==='pythagoras'||f==='right-triangle'){let a=x,b=x+d,h2=a*a+b*b;return mlProblem(`Os catetos de um triângulo retângulo medem x e x + ${d} centímetros. A hipotenusa tem quadrado da medida igual a ${h2} cm². Determina os catetos.`,mlCompleteEquation(2,2*d,d*d-h2,`x^2+(x+${d})^2=${h2}`,`\\text{Catetos: }${x}\\text{ cm e }${x+d}\\text{ cm.}`),`${x} cm e ${x+d} cm`,f,mlTriangle('x','x + '+d,'h'))}
 if(f==='sum-squares'){let total=x*x+(x+d)*(x+d);return mlProblem(`A soma dos quadrados de dois números naturais cuja diferença é ${d} é ${total}. Determina os números.`,mlCompleteEquation(2,2*d,d*d-total,`x^2+(x+${d})^2=${total}`,`\\text{Números: }${x}\\text{ e }${x+d}.`),`${x} e ${x+d}`,f,'');}
 if(f==='square-window'){let side=2*x,window=ri(2,4),A=side*side-window*x;return mlProblem(`Uma placa quadrada tem lado 2x cm e uma abertura retangular com lados x cm e ${window} cm. A área restante é ${A} cm². Determina x.`,[`(2x)^2-${window}x=${A}`,...mlCompleteEquation(4,-window,-A,`4x^2-${window}x=${A}`,`\\text{No contexto: }x=${x}.`).slice(1)],`${x} cm`,f,mlSvg(`<rect x="70" y="15" width="160" height="160" fill="#f5c6d8" stroke="#bd4676" stroke-width="2"/><rect x="132" y="62" width="35" height="74" fill="white" stroke="#bd4676" stroke-width="2"/>`+mlText(150,192,'2x')+mlText(149,54,`${window} × x`),300,205));}
 if(f==='square-area'){let k=ri(2,5),A=k*x*x;return mlProblem(`O retângulo tem comprimento ${k} vezes a largura e área ${A} cm². Determina a largura.`,[`${k}x^2=${A}`,`x^2=${x*x}`,`x=${x}\\quad(x>0)`],`${x} cm`,f,mlRect(`${k}x`,'x'));}
 if(f==='square-diagonal'){let diagonal2=2*x*x;return mlProblem(`Um terreno quadrado tem diagonal de comprimento √${diagonal2} m. Determina o seu perímetro.`,[`x^2+x^2=${diagonal2}`,`2x^2=${diagonal2}`,`x=${x}\\quad(x>0)`,`P=4x=${4*x}\\text{ m}`],`${4*x} m`,f,mlSvg(`<rect x="100" y="28" width="126" height="126" fill="#d9edfa" stroke="#2479a6" stroke-width="2"/><path d="M100 154 L226 28" stroke="#2479a6" stroke-dasharray="5 4"/>`+mlText(169,88,`√${diagonal2} m`)));}
 if(f==='rectangle-ratio'){let A=d*x*x;return mlProblem(`A área do retângulo é ${A} cm² e o comprimento é ${d} vezes a largura. Determina o perímetro.`,[`${d}x^2=${A}`,`x^2=${x*x}`,`x=${x}\\quad(x>0)`,`P=2(${x}+${d*x})=${2*(d+1)*x}\\text{ cm}`],`${2*(d+1)*x} cm`,f,mlRect(`${d}x`,'x'));}
 if(f==='triangle-area'){let A=d*x*x/2;return mlProblem(`Um triângulo tem base ${d} vezes a altura. A área é ${A} cm². Determina a base e a altura.`,[`\\frac{${d}x^2}{2}=${A}`,`x^2=${x*x}`,`x=${x}\\quad(x>0)`],`${d*x} cm e ${x} cm`,f,mlTriangle('x',`${d}x`));}
 if(f==='two-squares'||f==='equal-squares'){let k=ri(2,4),A=(k*k-1)*x*x;return mlProblem(`A diferença das áreas dos dois quadrados da figura, com lados ${k}x e x, é ${A} cm². Determina x.`,[`${k*k}x^2-x^2=${A}`,`${k*k-1}x^2=${A}`,`x=${x}\\quad(x>0)`],`${x} cm`,f,mlTwoSquares(`${k}x`,'x'));}
 if(f==='pythagoras-ratio'){let k=ri(2,4),h2=(1+k*k)*x*x;return mlProblem(`Num triângulo retângulo, um cateto mede x cm e o outro ${k}x cm. O quadrado da hipotenusa mede ${h2} cm². Determina os catetos.`,[`x^2+(${k}x)^2=${h2}`,`${1+k*k}x^2=${h2}`,`x=${x}\\quad(x>0)`],`${x} cm e ${k*x} cm`,f,mlTriangle('x',`${k}x`,'h'));}
 if(f==='prism'){let k=ri(2,5),height=ri(3,8),V=k*x*x*height;return mlProblem(`Um paralelepípedo retângulo tem base com lados x e ${k}x e altura ${height} cm. O volume é ${V} cm³. Determina as dimensões da base.`,[`${height}\\cdot x\\cdot${k}x=${V}`,`${k*height}x^2=${V}`,`x=${x}\\quad(x>0)`],`${x} cm e ${k*x} cm`,f,mlPrism('x',`${k}x`,String(height)));}
 if(f==='isosceles'){let hyp2=2*x*x;return mlProblem(`O triângulo retângulo isósceles tem hipotenusa √${hyp2} cm. Determina a sua área.`,[`x^2+x^2=${hyp2}`,`x^2=${x*x}`,`x=${x}\\quad(x>0)`,`A=\\frac{x^2}{2}=${x*x/2}\\text{ cm}^2`],`${x*x/2} cm²`,f,mlTriangle('x','x',`√${hyp2}`));}
 let A=x*x+d*x;return mlProblem(`Um quadrado de lado x tem a sua área aumentada de ${d}x cm², obtendo-se ${A} cm². Determina x.`,mlCompleteEquation(1,d,-A,`x^2+${d}x=${A}`,`\\text{No contexto: }x=${x}.`),`${x} cm`,f,mlRect('x','x','square'));
}
function mlProblemHTML(z){return statementHTML(z)+(z.diagram?`<div class="mlDiagram">${z.diagram}</div>`:'')}

function topicQuestion(kind,lev,id){
 if(id==='notable'||id==='mixed')return completeDiverseV141(lev,id);
 if(id==='productzero')return productZeroNew(lev);
 if(id==='problems')return mlProblemBank(kind,lev);
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
 if(kind==='incomplete')return incompleteDiverseV141(lev,id);
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
// Frações genuínas: denominadores diferentes, simplificação verificada por coeficientes.
// V13.9 — termos fracionários distribuídos, em vez de membros inteiros sobre uma fração.
// Cada família é construída com coeficientes exatos; a redução final é validada.
function incompleteFractionsV139(level){
 const templates=level===1?['product','mixed']:level===2?['product','mixed','two-products','squares','binomial-linear','binomial-constant','two-binomials']:['product','mixed','two-products','squares','binomial-linear','binomial-constant','two-binomials'];
 for(let tries=0;tries<1200;tries++){
  const kind=pick(templates),d=ri(2,level===3?8:6),e=ri(2,level===3?9:7);
  if(d===e||gcd(d,e)!==1)continue;
  const m=ri(1,level===3?5:3),n=ri(1,level===3?5:3),p=nz(-5,5),r=nz(-5,5),k=nz(-4,4);
  if(gcd(m,d)!==1||gcd(n,e)!==1)continue;
  let lhs,rhs,A,B,C,den=d*e;
  // A, B e C são coeficientes de den*(membro esquerdo - membro direito).
  if(kind==='product'){
   lhs=`\\frac{${m}}{${d}}x(x${sg(p)})${k<0?'-':'+'}${Math.abs(k)===1?'x':Math.abs(k)+'x'}`;
   rhs=`\\frac{${cf(n)}}{${e}}`;
   A=m*e;B=m*p*e+k*den-n*d;C=0;
  }else if(kind==='mixed'){
   lhs=`\\frac{${cf(m,'x^2')}}{${d}}${k<0?'-':'+'}${Math.abs(k)===1?'x':Math.abs(k)+'x'}`;
   rhs=`\\frac{${n}}{${e}}x(x${sg(p)})`;
   A=m*e-n*d;B=k*den-n*p*d;C=0;
  }else if(kind==='two-products'){
   lhs=`\\frac{${m}}{${d}}x(x${sg(p)})${k<0?'-':'+'}${Math.abs(k)===1?'x':Math.abs(k)+'x'}`;
   rhs=`\\frac{${n}}{${e}}x(x${sg(r)})`;
   A=m*e-n*d;B=m*p*e+k*den-n*r*d;C=0;
  }else if(kind==='squares'){
   // Os termos lineares anulam-se por identidade, restando ax²+c=0.
   const t=ri(1,level===3?7:4),u=ri(1,level===3?7:4);
   lhs=`\\frac{${m}}{${d}}(x${sg(t)})(x-${t})${k<0?'-':'+'}${Math.abs(k)===1?'x^2':Math.abs(k)+'x^2'}`;
   rhs=`\\frac{${cf(n,'x^2')}}{${e}}+${u}`;
   A=m*e+k*den-n*d;B=0;C=-m*t*t*e-u*den;
  }
  // V13.10: quadrados de binómios, com frações apenas em alguns termos.
  // Coeficientes exatos calculados após multiplicação pelo m.m.c. (d*e).
  if(kind==='binomial-linear'){
   // (m/d)(x+p)^2 + kx = (n/e)x² + (m p²/d) + (n/e)x
   // Redução: (me-nd)x² + (2mpe+kde-nd)x = 0.
   lhs=`\\frac{${m}}{${d}}(x${sg(p)})^2${k<0?'-':'+'}${Math.abs(k)===1?'x':Math.abs(k)+'x'}`;
   rhs=`\\frac{${cf(n,'x^2')}}{${e}}+\\frac{${m*p*p}}{${d}}+\\frac{${cf(n)}}{${e}}`;
   A=m*e-n*d;B=2*m*p*e+k*den-n*d;C=0;
  }else if(kind==='binomial-constant'){
   // (m/d)(x+p)^2 - (n/e)x(x+r) = (2mp/d - nr/e)x + u
   // Redução: (me-nd)x² + (mp²e-ude) = 0.
   const u=ri(1,level===3?9:5);
   const lin=2*m*p*e-n*r*d;
   if(lin===0)continue;
   const sign=lin<0?'-':'';
   const linear=frac(Math.abs(lin),den);
   lhs=`\\frac{${m}}{${d}}(x${sg(p)})^2-\\frac{${n}}{${e}}x(x${sg(r)})`;
   rhs=`${sign}${linear==='1'?'':linear}x+${u}`;
   A=m*e-n*d;B=0;C=m*p*p*e-u*den;
  }else if(kind==='two-binomials'){
   // Dois quadrados; a parcela linear adicional é escolhida para a cancelar.
   const lin=2*(m*p*e-n*r*d);
   if(!lin)continue;
   const sign=lin<0?'-':'';
   const linear=frac(Math.abs(lin),den);
   lhs=`\\frac{${m}}{${d}}(x${sg(p)})^2-\\frac{${n}}{${e}}(x${sg(r)})^2`;
   rhs=`${sign}${linear==='1'?'':linear}x`;
   A=m*e-n*d;B=0;C=m*p*p*e-n*r*r*d;
  }
  if(!A||Math.abs(A)>120||Math.abs(B)>160||Math.abs(C)>240)continue;
  if(kind!=='zero'&&B===0&&C===0)continue;
  if(B&&C)continue; // Incompleta APÓS redução, sem exceções.
  const g=gcd(gcd(Math.abs(A),Math.abs(B)),Math.abs(C));
  let a=A/g,b=B/g,c=C/g;
  if(Math.abs(a)>24||Math.abs(b)>45||Math.abs(c)>100)continue;
  if(b&&Math.abs(b/a)>12)continue;
  if(c&&Math.abs(c/a)>36)continue;
  if(c&&level===1&&-c/a<=0)continue;
  if(c&&level===2&&(-c/a<=0||!Number.isInteger(Math.sqrt(-c/a))))continue;
  let roots=[],extra=[];
  if(b){const root=frac(-b,a);roots=['0',root];extra=[`x(${cf(a)}${sg(b)})=0`,`x=0\\;\\text{ou}\\;x=${root}`];}
  else if(c){const ratio=-c/a;extra.push(`x^2=${frac(-c,a)}`);
   if(ratio<0)extra.push('\\text{Não existem soluções reais.}');
   else{const gg=gcd(Math.abs(c),Math.abs(a)),num=Math.abs(c)/gg,dd=Math.abs(a)/gg,sn=Math.sqrt(num),sd=Math.sqrt(dd);const root=Number.isInteger(sn)&&Number.isInteger(sd)?frac(sn,sd):`\\sqrt{${frac(-c,a)}}`;roots=[`-${root}`,root];extra.push(`x=-${root}\\;\\text{ou}\\;x=${root}`);}
  }else{roots=['0'];extra=['x^2=0','x=0'];}
  const answer=set(roots),statement=`${lhs}=${rhs}`;
  const steps=[`\\text{Multiplicando ambos os membros por }${den}:`,`${poly(A,B,C)}=0`,...(g!==1?[`${poly(a,b,c)}=0`]:[]),...extra,answer];
  return q(statement,steps,answer,['Desenvolve apenas os produtos necessários.','Elimina os denominadores, respeitando todos os termos.','Reduz a equação e identifica o tipo de incompleta.'],`v139-inc-fracoes-${kind}`);
 }
 return incompleteFractionsV138(level);
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
  shape=level===1?'direto':level===2?pick(['deslocacao','quadrado']):pick(['quadrado','diferenca']);
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
function validateNew(z){if(!z.canonical)return true;const {a,b,c}=z.canonical;return !!(a&&(z.incomplete?(!b||!c):(b&&c)))}
function completeV4(lev,id){
 if(id==='notable'||id==='mixed')return completeDiverseV141(lev,id);
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
function resultType(z){if(z.incomplete){const {b,c}=z.canonical;return !b&&!c?'zero':!c?'zero-e-outra':z.solutionKey==='empty'?'sem-solucao':z.solutionKey?.includes('sqrt')||z.solutionKey?.includes('\\sqrt')?'irracionais':'simetricas'}if(z.solutionKey)return z.solutionKey.includes('\\sqrt')?'irracionais':'racionais';return z.answer.includes('\\varnothing')?'sem-solucao':'outras'}
function exactRootSignature(z){
 if(z.canonical&&z.canonical.a){
  const {a,b,c}=z.canonical;
  const g=gcd(gcd(Math.abs(a),Math.abs(b)),Math.abs(c))||1;
  const sign=a<0?-1:1;
  return [a,b,c].map(v=>sign*v/g).join(':');
 }
 return z.solutionKey||z.answer||'';
}
function solutionSignature(z){
 if(z.canonical&&z.canonical.a){
  const {a,b,c}=z.canonical;
  if(b===0&&c===0)return 'roots:zero';
  if(c===0)return 'roots:0,'+frac(-b,a);
  if(b===0){const sq=-c/a;if(sq<0)return 'roots:empty';
   return 'roots:symmetric:'+frac(-c,a);}
  const D=b*b-4*a*c;
  if(D<0)return 'roots:empty';
  const g=gcd(gcd(Math.abs(a),Math.abs(b)),Math.abs(c))||1;
  const sign=a<0?-1:1;
  return 'roots:quadratic:'+([a,b,c].map(v=>sign*v/g).join(':'));
 }
 return 'roots:'+ (z.solutionKey||z.answer||'');
}
function balancedTopicQuestion(kind,lev,id,used,families){
 if(id==='problems'){
  // Uma ficha consome um único modelo por exercício, não 140 candidatos
  // descartados. Assim a rotação é efetivamente comum aos dois modos.
  const z=mlProblemBank(kind,lev);
  if(z){used.add(questionKey(z));const f=sheetFamily(z);families.set(f,(families.get(f)||0)+1);}
  return z;
 }
 let best=null,bestScore=Infinity;
 for(let attempt=0;attempt<140;attempt++){
  const previous={...state};state.kind=kind;state.level=lev;let z;
  try{z=topicQuestion(kind,lev,id)}finally{Object.assign(state,previous)}
  if(!validateQuadratic(z)||!validateNew(z))continue;
  if(id==='mixed'&&z.method==='caso-notavel'&&(families.get('mixed-notable')||0)>=Math.floor(((families.get('mixed-total')||0)+1)/5))continue;
  if(used.has('solution:'+solutionSignature(z)))continue;
  const family=sheetFamily(z),key=questionKey(z),solKey=z.solutionKey||((z.answer||'').startsWith('S=')?z.answer:null);
  const sem=semanticFamily(family);
  const pattern=z.structureKey||family;
  const rootSignature=solutionSignature(z);
  const repeatedRoot=used.has('solution:'+rootSignature);
  const countPattern=families.get('structure:'+pattern)||0;
  const countSemantic=families.get('semantic:'+sem)||0;
  const countSolutionType=families.get('result:'+resultType(z))||0;
  const score=(used.has(key)?1e8:0)+(repeatedRoot?1e9:0)+countPattern*3500+countSemantic*350+countSolutionType*900+(families.get(family)||0)*500+Math.random()*5;
  if(score<bestScore){best=z;bestScore=score}
  if(score<5)break;
 }
 if(best){if(id==='mixed'){families.set('mixed-total',(families.get('mixed-total')||0)+1);if(best.method==='caso-notavel')families.set('mixed-notable',(families.get('mixed-notable')||0)+1)}const f=sheetFamily(best),sem=semanticFamily(f);used.add(questionKey(best));used.add('solution:'+solutionSignature(best));families.set(f,(families.get(f)||0)+1);families.set('semantic:'+sem,(families.get('semantic:'+sem)||0)+1);const pattern=best.structureKey||f;families.set('structure:'+pattern,(families.get('structure:'+pattern)||0)+1);families.set('result:'+resultType(best),(families.get('result:'+resultType(best))||0)+1)}
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


// V13.11 — equações construídas a partir da forma canónica e de raízes controladas.
// Os coeficientes dos dois membros são obtidos por identidades algébricas exatas.
function diverseRat(n,d=1){return frac(n,d)}
function diverseSigned(n,d=1){return n<0?'-'+diverseRat(-n,d):'+'+diverseRat(n,d)}
function diverseTerm(n,d,v,first=false){
 if(!n)return '';
 const sign=n<0?'-':first?'':'+';
 const abs=diverseRat(Math.abs(n),d);
 return sign+(v&&abs==='1'?'':abs)+v;
}
function diversePoly(a,b,c,d=1){
 const pieces=[diverseTerm(a,d,'x^2',true),diverseTerm(b,d,'x',!a),diverseTerm(c,d,'',!a&&!b)].filter(Boolean);
 return pieces.join('')||'0';
}
function diverseSolution(A,B,C){
 if(A===0)throw Error('Não é equação do segundo grau');
 if(B===0&&C===0)return {roots:['0'],key:'0',kind:'zero'};
 if(C===0){const r=-B/A, f=diverseRat(-B,A),roots=r<0?[f,'0']:['0',f];return {roots,key:'0|'+diverseRat(-B,A),kind:'factor'};}
 if(B!==0)throw Error('Equação completa na categoria incompletas');
 const sq=-C/A;
 if(sq<0)return {roots:[],key:'empty',kind:'empty'};
 const rn=Math.sqrt(sq),d=ri(1,1);
 const num=Math.abs(C),den=Math.abs(A),rootN=Math.sqrt(num),rootD=Math.sqrt(den);
 let positive;
 if(Number.isInteger(rootN)&&Number.isInteger(rootD))positive=diverseRat(rootN,rootD);
 else if(Number.isInteger(rn))positive=String(rn);
 else {let g=gcd(num,den),n=num/g,m=den/g;positive=m===1?`\\sqrt{${n}}`:`\\sqrt{\\frac{${n}}{${m}}}`;}
 return {roots:['-'+positive,positive],key:'±'+positive,kind:'square'};
}
function diverseIncCanonical(level){
 const type=pick(level===1?['factor','square','zero']:level===2?['factor','factor','square','irrational','empty','zero']:['factor','factor','square','irrational','empty','zero']);
 let A,B=0,C=0;
 if(type==='factor'){
  let d=level===1?1:pick([1,2,3,4,5]),n=nz(level===1?-7:-11,level===1?7:11);
  if(gcd(Math.abs(n),d)>1&&level===3)n+=n>0?1:-1;
  A=d*pick([1,1,2]),B=-n*(A/d);
 }else if(type==='square'){
  let d=level===1?1:pick([1,2,3,4]),n=ri(1,level===1?7:9);
  A=d*d;C=-n*n;
 }else if(type==='irrational'){
  A=pick([1,2,3,4,5]);C=-pick([2,3,5,6,7,10,11]);
  if(Number.isInteger(Math.sqrt(-C/A)))C=-7;
 }else if(type==='empty'){
  A=pick([1,2,3,4]);C=pick([1,2,3,5,7]);
 }else{A=pick([1,2,3,4,5]);}
 return {A,B,C,type};
}
// Intermediate development of the products/cases notables before collecting terms.
function developmentV141(shape,t,u,d,statement){
 const sq=`(${diversePoly(1,2*t,t*t)})`;
 const prod=`(${diversePoly(1,t+u,t*u)})`;
 if(shape==='square'||shape==='binomial'||shape==='fraction-square'||shape==='fraction-mixed'||shape==='fraction-distributed'||shape==='fraction-terms'||shape==='distributed')
  return statement.replace(`(x${sg(t)})^2`,sq);
 if(shape==='product'||shape==='fraction-product'||shape==='fraction-products'||shape==='mixed-sides'||shape==='two-products')
  return statement.replace(`(x${sg(t)})(x${sg(u)})`,prod);
 return null;
}
function incompleteDiverseV141(level,id){
 const {A,B,C,type}=diverseIncCanonical(level),sol=diverseSolution(A,B,C);
 const t=nz(-4,4),u=nz(-3,3),d=pick([2,3,4]),e=pick([2,3,5]);
 let shape,statement;
 const modes=id==='direct'?['direct']:id==='parentheses'?(level===1?['binomial','square']:['binomial','square','product']):level===1?['fraction-single']:level===2?['fraction-single','fraction-sides']:['fraction-mixed','fraction-product','fraction-sides','fraction-distributed','fraction-square'];
 shape=pick(modes);
 if(shape==='direct')statement=`${diversePoly(A,B,C)}=0`;
 if(shape==='sides')statement=`${diversePoly(A+u,B+t,C+t)}=${diversePoly(u,t,t)}`;
 if(shape==='decimal'){
  const D=pick([2,4,5,10]);statement=`${diversePoly(A*D,B*D,C*D,10)}=${diversePoly(0,0,0)}`;
  // The displayed decimal coefficients must be exactly equivalent to the canonical coefficients.
  statement=`${diversePoly(A,B,C)}=0`;
 }
 if(shape==='factor')statement=`${diversePoly(A,B,C)}+${t}x=${t}x`;
 if(shape==='binomial')statement=`(x${sg(t)})(x${sg(-t)})+${diversePoly(A-1,B,C+t*t)}=0`;
 if(shape==='square')statement=`(x${sg(t)})^2+${diversePoly(A-1,B-2*t,C-t*t)}=0`;
 if(shape==='product')statement=`(x${sg(t)})(x${sg(u)})=${diversePoly(1-A,t+u-B,t*u-C)}`;
 if(shape==='fraction-single')statement=`${diversePoly(A,B,C,d)}=0`;
 if(shape==='fraction-mixed'){
  // (x+t)^2/d + (u/e)x - RHS = (A x²+B x+C)/d
  // Avoid floating point coefficients in exact algebra: put the extra fractional x term on the right.
  // Mix a whole polynomial and fractions, preserving the canonical equation exactly.
  statement=`\\frac{(x${sg(t)})^2}{${d}}+${diversePoly(A*d-1,B*d-2*t,C*d-t*t,d)}=0`;
 }
 if(shape==='fraction-square'){
  // x² coefficient after subtraction: (1/d + (A*d-1)/d) = A.
  // Integer coefficient construction, no decimal fractions.
  statement=`\\frac{(x${sg(t)})^2}{${d}}+${diversePoly(A*d-1,B*d-2*t,C*d-t*t,d)}=0`;
 }
 if(shape==='fraction-product')statement=`\\frac{(x${sg(t)})(x${sg(u)})}{${d}}+${diversePoly(A*d-1,B*d-t-u,C*d-t*u,d)}=0`;
 if(shape==='fraction-distributed'){
  // (x+t)^2/d + ux/e + Q(x) = 0, with Q chosen to leave exactly Ax²+Bx+C.
  // The fractional linear term has a denominator independent of the square.
  const L=d*e;
  const qa=A*L-e,qb=B*L-2*t*e-u*d,qc=C*L-t*t*e;
  statement=`\\frac{(x${sg(t)})^2}{${d}}${diverseTerm(u,e,'x')}+${diversePoly(qa,qb,qc,L)}=0`;
 }
 if(shape==='fraction-sides'){
  const h=ri(1,4),v=ri(1,4);
  statement=`${diversePoly(A*d+h,B*d+v,C*d,d)}=${diversePoly(h,v,0,d)}`;
 }
 // Make fractional constructions genuinely distributed: terms with integer and rational coefficients.
 if(shape==='fraction-mixed'||shape==='fraction-square'){
  const h=ri(1,4);
  statement=`\\frac{(x${sg(t)})^2}{${d}}${diverseTerm(h,1,'x')}=${diversePoly(1-A*d,2*t+h*d-B*d,t*t-C*d,d)}`;
 }
 statement=statement.replace(/\+\-/g,'-').replace(/\-\-/g,'+').replace(/\+\+/g,'+');
 const answer=set(sol.roots);
 const expanded=developmentV141(shape,t,u,d,statement);
 const steps=[statement,...(expanded&&expanded!==statement?[`\\Longleftrightarrow\\;${expanded}`]:[]),`\\Longleftrightarrow\\;${diversePoly(A,B,C)}=0`];
 if(sol.kind==='factor')steps.push(`x(${diverseTerm(A,1,'x',true)}${diverseTerm(B,1,'')})=0`);
 if(sol.kind==='square'||sol.kind==='empty')steps.push(`x^2=${diverseRat(-C,A)}`);
 if(sol.kind==='zero')steps.push('x^2=0');
 if(sol.kind==='empty')steps.push('\\text{Um quadrado não pode ser negativo em }\\mathbb{R}.');
 if(sol.kind==='factor')steps.push(`${diverseTerm(A,1,'x',true)}${diverseTerm(B,1,'')}=0\\;\\text{ou}\\;x=0`);
 if(sol.roots.length)steps.push(sol.roots.map(r=>`x=${r}`).join('\\;\\text{ou}\\;'));
 steps.push(answer);
 statement=statement.replace(/(^|[=+(])-1x(?![\\w^])/g,'$1-x').replace(/(^|[=+(])1x(?![\\w^])/g,'$1x');
 const z=q(statement,steps,answer,['Desenvolve os produtos e elimina os denominadores, se necessário.','Reduz à forma canónica e identifica o termo que falta.'],`v141-inc-${id}-${shape}-${type}`);
 z.canonical={a:A,b:B,c:C};z.solutionKey=sol.key;z.incomplete=true;z.structureKey='inc-'+shape+'-'+sol.kind;
 return z;
}
function notableSpecialistV151(){
 // All cases have canonical m²x²+2mnx+(n²-k²)=0, with nonzero b and c.
 const m=pick([1,1,2,3]),n=nz(-5,5),k=ri(2,7);
 if(n*n===k*k)return notableSpecialistV151();
 const a=m*m,b=2*m*n,c=n*n-k*k;
 const L=`(${cf(m)}${sg(n)})^2`,P=`${poly(a,b,n*n)}`;
 const variants=['expanded','square','difference','factorized'];
 const shape=pick(variants);
 let statement,steps;
 if(shape==='expanded'){
  statement=`${poly(a,b,c)}=0`;
  steps=[statement,`${P}=${k*k}`,`${L}=${k*k}`];
 }else if(shape==='square'){
  statement=`${L}=${k*k}`;steps=[statement];
 }else if(shape==='difference'){
  statement=`${L}-${k*k}=0`;steps=[statement,`${L}=${k*k}`];
 }else{
  statement=`(${cf(m)}${sg(n-k)})(${cf(m)}${sg(n+k)})=0`;
  steps=[statement];
 }
 // Solve directly via square roots, without returning to the previous equation.
 const r1=frac(-n-k,m),r2=frac(-n+k,m);
 const roots=[r1,r2].sort((u,v)=>evalFrac(u)-evalFrac(v));
 const answer=set([...new Set(roots)]);
 if(shape==='factorized')steps.push(`${cf(m)}${sg(n-k)}=0\\;\\text{ou}\\;${cf(m)}${sg(n+k)}=0`);
 else steps.push(`${cf(m)}${sg(n)}=${k}\\;\\text{ou}\\;${cf(m)}${sg(n)}=-${k}`);
 steps.push(
   `x=${r1}\\;\\text{ou}\\;x=${r2}`,answer);
 const z=q(statement,steps,answer,['Isola o quadrado do binómio.','Usa a igualdade de quadrados ou as duas raízes quadradas.'],`v151-notable-${shape}`);
 z.canonical={a,b,c};z.structureKey='notable-'+shape;
 z.solutionKey=roots.join('|');z.method='caso-notavel';
 return z;
}
function completeDiverseV141(level,id){
 if(level!==3)return completeNew(level,id);
 if(id==='notable')return notableSpecialistV151();
 // Casos notáveis continuam a representar uma minoria nas equações mistas.
 if(Math.random()<.12)return notableSpecialistV151();
 const n1=nz(-5,5),n2=nz(-5,5),d1=pick([1,1,2,3]),d2=pick([1,1,2,3]);
 const A=d1*d2,B=-(n1*d2+n2*d1),C=n1*n2;
 if(!A||!B||!C||n1*d2===n2*d1||n1*d2===-n2*d1)return completeDiverseV141(level,id);
 const shape=pick(['fraction-terms','square','product','fraction-products','two-products','distributed','mixed-sides','two-sides']);
 const t=nz(-3,3),u=nz(-3,3),d=pick([2,3,4]);
 let statement;
 if(shape==='mixed-sides'){const v=nz(-5,5),w=nz(-5,5);statement=`(x${sg(t)})(x${sg(u)})+${diversePoly(A-1,B-t-u+v,C-t*u+w)}=${diversePoly(0,v,w)}`;}
 if(shape==='two-sides')statement=`${diversePoly(A+u,B+t,C+u)}=${diversePoly(u,t,u)}`;
 if(shape==='fraction-terms')statement=`\\frac{(x${sg(t)})^2}{${d}}${diverseTerm(u,1,'x')}=${diversePoly(1-A*d,2*t+u*d-B*d,t*t-C*d,d)}`;
 if(shape==='square')statement=`(x${sg(t)})^2+${diversePoly(A-1,B-2*t,C-t*t)}=0`;
 if(shape==='product')statement=`(x${sg(t)})(x${sg(u)})=${diversePoly(1-A,t+u-B,t*u-C)}`;
 if(shape==='fraction-products')statement=`\\frac{(x${sg(t)})(x${sg(u)})}{${d}}+${diversePoly(A*d-1,B*d-t-u,C*d-t*u,d)}=0`;
 if(shape==='two-products'){
  // Product on each side; the canonical polynomial is preserved by coefficient subtraction.
  const v=nz(-4,4),w=nz(-4,4);
  statement=`(x${sg(t)})(x${sg(u)})-(x${sg(v)})(x${sg(w)})+${diversePoly(A,B-t-u+v+w,C-t*u+v*w)}=0`;
 }
 if(shape==='distributed'){
  // Rational terms with distinct denominators, plus a polynomial term.
  const e=pick([3,5,7]);
  const L=d*e;
  statement=`\\frac{(x${sg(t)})^2}{${d}}${diverseTerm(u,e,'x')}+${diversePoly(A*L-e,B*L-2*t*e-u*d,C*L-t*t*e,L)}=0`;
 }
 statement=statement.replace(/\+\-/g,'-').replace(/\-\-/g,'+').replace(/\+\+/g,'+');
 if([...statement.matchAll(/-?\d+/g)].some(m=>Math.abs(Number(m[0]))>55))return completeDiverseV141(level,id);
 const z=formula(A,B,C,level),answer=z.answer;
 const expanded=developmentV141(shape,t,u,d,statement);
 const steps=[statement,...(expanded&&expanded!==statement?[`\\Longleftrightarrow\\;${expanded}`]:[]),`\\Longleftrightarrow\\;${diversePoly(A,B,C)}=0`,...z.steps.slice(1)];
 const item=q(statement,steps,answer,['Desenvolve os produtos e reduz os termos semelhantes.','Obtém a forma canónica e completa o quadrado.'],`v141-com-${shape}`);
 item.canonical={a:A,b:B,c:C};item.structureKey='complete-'+shape;item.solutionKey=[diverseRat(n1,d1),diverseRat(n2,d2)].sort((a,b)=>evalFrac(a)-evalFrac(b)).join('|');
 return item;
}
function generateSheet(){
 const counts=Object.fromEntries(sheetTopicsFor($('#sheetKind').value).flatMap(g=>g.items.map(([id])=>[id,activeSheetGroups.has(g.id)?(sheetDefaults[id]||0):0])));
 if(!Object.values(counts).some(Boolean)){alert('Seleciona pelo menos um exercício.');return}
 const lev=+$('#sheetLevel').value,kindChoice=$('#sheetKind').value;
 const used=new Set(),families=new Map();sheetItems=[];
 const chooseKind=(i)=>kindChoice==='both'?(i%2?'complete':'incomplete'):kindChoice;
 const entries=sheetTopicsFor(kindChoice).filter(g=>activeSheetGroups.has(g.id)).flatMap(g=>g.items.map(([id,label])=>({id,label,group:g.name})));
 for(const {id,label,group} of entries){
  for(let i=0;i<counts[id];i++){
   const kind=sheetKindForTopic(id,kindChoice,i+sheetItems.length);
   // Select the closest supported internal family; distribute problems and error types automatically.
   const actualKind=kind;
   const z=balancedTopicQuestion(actualKind,lev,id,used,families);
   if(z)sheetItems.push({...z,sheetGroup:group,sheetTopic:label});
  }
 }
 if($('#sheetOrganization').value==='mix'){
  for(let i=sheetItems.length-1;i>0;i--){let j=ri(0,i);[sheetItems[i],sheetItems[j]]=[sheetItems[j],sheetItems[i]]}
 }
 sheetSolutions=false;$('#sheetSettings').classList.add('hidden');$('#sheetPreview').classList.remove('hidden');renderSheet();
}
function cleanMathStep(v){return String(v).replace(/x\+0(?![0-9])/g,'x').replace(/x-0(?![0-9])/g,'x').replace(/\\mathbf\{([^{}]*)\}/g,'$1')}
function renderSheet(){
 const grouped=$('#sheetOrganization').value==='group';let last='';
 let html=`<div class="paperHeader"><div class="paperBrand">MathLab 7–9 · Matemática · 9.º ano</div><h2>Ficha de trabalho — Equações do 2.º grau</h2><p>9.º ano · ${['','Principiante','Intermédio','Especialista'][+$('#sheetLevel').value]}</p><div class="studentLine">Nome: ___________________________ Turma: ______ Data: ____ / ____ / ______</div></div>`;
 sheetItems.forEach((z,i)=>{
  if(grouped&&z.sheetGroup!==last){html+=`<h3>${z.sheetGroup}</h3>`;last=z.sheetGroup}
  html+=`<article class="paperExercise"><div>${i+1}. ${esc(z.prompt)}</div><div class="paperMath">${mlProblemHTML(z)}</div>${sheetSolutions?`<div class="paperSteps">${z.steps.filter((step,j)=>step!==z.steps[j-1]&&!(j===0&&step===z.statement)).map(step=>`<div>${tex(cleanMathStep(step),true)}</div>`).join('')}</div>`:'<div class="answerSpace"></div>'}</article>`;
 });
 html+='<div class="paperFooter">© 2026 — Nuno Araújo · MathLab 7–9</div>';
 $('#paper').innerHTML=html;$('#toggleSolutions').textContent=sheetSolutions?'Ocultar soluções':'Ver soluções';typeset();
}
$('#makeSheet').onclick=generateSheet;$('#changeSheet').onclick=renderSheetConfig;$('#newSheet').onclick=generateSheet;$('#toggleSolutions').onclick=()=>{sheetSolutions=!sheetSolutions;renderSheet()};$('#printSheet').onclick=()=>window.print();
const params=new URLSearchParams(location.search);if(params.get('ano')==='9'||location.hash==='#ano-9'){}setMode('free');
})();
