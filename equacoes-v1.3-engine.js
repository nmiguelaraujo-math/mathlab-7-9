(()=>{'use strict';
const $=id=>document.getElementById(id),ri=(a,b)=>Math.floor(Math.random()*(b-a+1))+a,pick=a=>a[ri(0,a.length-1)];
const nz=(a,b)=>{let n=0;while(!n)n=ri(a,b);return n};
const sign=n=>n===0?'':n<0?`- ${Math.abs(n)}`:`+ ${n}`;
const coef=(a,v='x')=>a===1?v:a===-1?`-${v}`:`${a}${v}`;
const factor=a=>a===1?'':a===-1?'-':String(a);
const lin=(a,b)=>`${coef(a)} ${sign(b)}`;
const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
const frac=(n,d=1)=>{if(d<0){n=-n;d=-d}const g=gcd(n,d);n/=g;d/=g;return d===1?String(n):`\\frac{${n}}{${d}}`};
const solution=(n,d=1)=>{const x=frac(n,d);return{x,value:n/d,answer:`x=${x}`,set:`\\left\\{${x}\\right\\}`}};
const normal=(question,steps,n,d=1,family='calculo',label='Resolver a equação')=>({question,steps,solution:solution(n,d),family,label});
const special=(question,steps,type,family='selecao',label='Classificar a equação')=>({question,steps,solution:type==='identity'?{answer:'\\text{Equação possível indeterminada}',set:'\\mathbb R'}:{answer:'\\text{Equação impossível}',set:'\\varnothing'},family,label});

function simple(year,level){
 const x=ri(-9,12);
 if(year===7&&level===1){
  const kind=ri(1,3),a=ri(2,7),b=nz(-12,12);
  if(kind===1)return normal(`x ${sign(b)}=${x+b}`,[`x=${x+b} ${sign(-b)}`,`x=${x}`],x,1,'isolar-adicao');
  if(kind===2)return normal(`${a}x=${a*x}`,[`x=\\frac{${a*x}}{${a}}`,`x=${x}`],x,1,'isolar-produto');
  const c=a*x+b;return normal(`${a}x ${sign(b)}=${c}`,[`${a}x=${c} ${sign(-b)}`,`${a}x=${a*x}`,`x=${x}`],x,1,'isolar');
 }
 const a=nz(-8,8),b=nz(-14,14),c=a*x+b;
 let r;do r=nz(-6,6);while(r===a);
 const s=c-r*x;
 return normal(`${lin(a,b)}=${lin(r,s)}`,[`${coef(a)} ${sign(-r)}x=${s} ${sign(-b)}`,`${coef(a-r)}=${(a-r)*x}`,`x=${x}`],x,1,'ambos-membros');
}
function parentheses(year,level){
 const x=ri(-8,10),positiveOnly=year===7||(year===8&&level===1),k=positiveOnly?ri(2,5):nz(-5,5),p=nz(-6,6),q=nz(-10,10);
 let r;do r=positiveOnly?ri(1,5):nz(-5,5);while(r===k);
 const leftA=k,leftB=k*p+q,s=(leftA-r)*x+leftB;
 if(level<3||Math.random()<.55)return normal(`${factor(k)}(x ${sign(p)}) ${sign(q)}=${lin(r,s)}`,[`${coef(k)} ${sign(k*p)} ${sign(q)}=${lin(r,s)}`,`${lin(k,k*p+q)}=${lin(r,s)}`,`${coef(k-r)}=${s-(k*p+q)}`,`x=${x}`],x,1,'parenteses');
 let h;do h=positiveOnly?ri(2,5):nz(-4,4);while(h===k);
 const t=nz(-5,5),u=nz(-8,8),rightA=h,rightB=h*t+u,s2=rightA*x+rightB-leftA*x-k*p;
 return normal(`${factor(k)}(x ${sign(p)}) ${sign(s2)}=${factor(h)}(x ${sign(t)}) ${sign(u)}`,[`${coef(k)} ${sign(k*p)} ${sign(s2)}=${coef(h)} ${sign(h*t)} ${sign(u)}`,`${lin(k,k*p+s2)}=${lin(h,h*t+u)}`,`${coef(k-h)}=${h*t+u-(k*p+s2)}`,`x=${x}`],x,1,'dois-parenteses');
}
function fractions(level){
 const x=ri(-7,9),d1=pick([2,3,4,5]),d2=pick([2,3,4,5,6]),m=d1*d2/gcd(d1,d2),a=nz(-4,4);let r;do r=nz(-4,4);while(a*d2===r*d1);const p=nz(-5,5),q=(a*x+p)*d2/d1-r*x;
 if(Number.isInteger(q))return normal(`\\frac{${coef(a)} ${sign(p)}}{${d1}}=\\frac{${coef(r)} ${sign(q)}}{${d2}}`,[`${d2}(${coef(a)} ${sign(p)})=${d1}(${coef(r)} ${sign(q)})`,`${coef(d2*a)} ${sign(d2*p)}=${coef(d1*r)} ${sign(d1*q)}`,`${coef(d2*a-d1*r)}=${d1*q-d2*p}`,`x=${x}`],x,1,'fracoes');
 const b=(a*x+p)/d1;return normal(`\\frac{${coef(a)} ${sign(p)}}{${d1}}=${frac(a*x+p,d1)}`,[`${coef(a)} ${sign(p)}=${a*x+p}`,`${coef(a)}=${a*x}`,`x=${x}`],x,1,'fracoes');
}
function minusFraction(){
 const x=ri(-6,8),d=pick([2,3,4,5]),a=nz(1,4),p=nz(-5,5),k=nz(-5,7),rightNum=k*d-(a*x+p);
 return normal(`${k}-\\frac{${coef(a)} ${sign(p)}}{${d}}=${frac(rightNum,d)}`,[`${k*d}-(${coef(a)} ${sign(p)})=${rightNum}`,`${k*d}-${coef(a)} ${sign(-p)}=${rightNum}`,`${coef(-a)}=${rightNum-k*d+p}`,`x=${x}`],x,1,'menos-fracao');
}
function nested(){
 const x=ri(-5,7),d=pick([2,3,4]),e=pick([2,3,5]),k=nz(-3,3),p=ri(-4,4),r=nz(-3,3),t=ri(-4,4),mm=d*e/gcd(d,e),A=mm/d*k,B=mm/e*r,C=A*(x+p)-B*(x+t);
 return normal(`\\frac{${factor(k)}(x ${sign(p)})}{${d}}-\\frac{${factor(r)}(x ${sign(t)})}{${e}}=${frac(C,mm)}`,[`${factor(A)}(x ${sign(p)})-${factor(B)}(x ${sign(t)})=${C}`,`${coef(A)} ${sign(A*p)} ${sign(-B)}x ${sign(-B*t)}=${C}`,`${coef(A-B)}=${C-A*p+B*t}`,`x=${x}`],x,1,'varias-operacoes');
}
function signedNested(doubleNegative=false){
 const x=ri(-5,7),d=pick([2,3,4,5]),e=pick([2,3,4,5]),a=ri(2,5),inner=doubleNegative?-a:a,p=nz(-5,5),q=nz(-5,5),mm=d*e/gcd(d,e),K=-(mm/d*inner);let b,B;do{b=ri(1,5);B=mm/e*b}while(B===-K);const C=K*(x+p)+B*(x+q);
 return normal(`-\\frac{${factor(inner)}(x ${sign(p)})}{${d}}+\\frac{${factor(b)}(x ${sign(q)})}{${e}}=${frac(C,mm)}`,[`${factor(K)}(x ${sign(p)})+${factor(B)}(x ${sign(q)})=${C}`,`${coef(K)} ${sign(K*p)} ${sign(B)}x ${sign(B*q)}=${C}`,`${coef(K+B)}=${C-K*p-B*q}`,`x=${x}`],x,1,doubleNegative?'parenteses-denominadores-duplo-sinal':'parenteses-denominadores-sinal');
}
const singleSignedNested=()=>signedNested(false),doubleSignedNested=()=>signedNested(true);
function rationalMixed(){
 let x,d,e,f,L,a,b,c,r,p,q,s,A,B,C,K,sgnA,sgnB,guard=0;
 do{
  x=ri(-5,6);d=pick([2,3,4,6]);e=pick([2,3,4,6]);f=pick([2,3,4,6]);L=d*e/gcd(d,e);L=L*f/gcd(L,f);
  do a=ri(1,4);while(gcd(a,d)!==1);do b=ri(1,4);while(gcd(b,e)!==1);do c=nz(-5,5);while(gcd(Math.abs(c),f)!==1);r=nz(-4,4);p=nz(-5,5);q=nz(-5,5);sgnA=Math.random()<.3?-1:1;sgnB=Math.random()<.5?-1:1;
  A=sgnA*a*L/d;B=sgnB*b*L/e;C=c*L/f;K=A+B-r;s=A*(x+p)+B*(x+q)+C-r*x;guard++;
 }while(guard<200&&(K===0||s===0||Math.abs(s)>45||gcd(gcd(Math.abs(r),Math.abs(s)),L)!==1));
 const first=`${sgnA<0?'-':''}\\frac{${factor(a)}(x ${sign(p)})}{${d}}`,constant=`${c<0?'-':'+'} \\frac{${Math.abs(c)}}{${f}}`,second=`${sgnB<0?'-':'+'} \\frac{${factor(b)}(x ${sign(q)})}{${e}}`;
 return normal(`${first} ${constant} ${second}=\\frac{${coef(r)} ${sign(s)}}{${L}}`,[`${factor(A)}(x ${sign(p)}) ${sign(C)} ${factor(B)}(x ${sign(q)})=${coef(r)} ${sign(s)}`,`${coef(A)} ${sign(A*p)} ${sign(C)} ${sign(B)}x ${sign(B*q)}=${coef(r)} ${sign(s)}`,`${coef(K)}=${s-A*p-B*q-C}`,`x=${x}`],x,1,'racionais-entre-fracoes');
}
function classify(year=9,level=3){
 const identity=Math.random()<.5,b=nz(-10,10),positiveOnly=year===7||(year===8&&level===1),k=positiveOnly?ri(2,5):nz(-4,4),p=nz(-5,5),leftA=k,leftB=k*p+b,r=leftA,s=identity?leftB:leftB+nz(-5,5);
 const q=`${factor(k)}(x ${sign(p)}) ${sign(b)}=${lin(r,s)}`;
 const reduced=`${lin(leftA,leftB)}=${lin(r,s)}`;
 return special(q,[reduced,identity?'0x=0':`0x=${s-leftB}`,identity?'\\text{Todos os números reais verificam a igualdade.}':'\\text{A igualdade é impossível.}'],identity?'identity':'impossible','classificacao');
}
function selection(level,structure='misto'){
 const families=structure==='sem'?['transposicao','distributiva']:structure==='com'?['produto']:structure==='denom'?['denominador','sinal-fracao']:structure==='ambos'?['sinal-fracao','produto-fracao']:['produto','transposicao','distributiva'],wrong=pick(families);
 if(wrong==='denominador'){const d=pick([2,3,4,5]),a=ri(2,6),b=ri(1,8);return{question:`\\text{Um aluno escreveu }\\frac{${a}x+${b}}{${d}}=${a}x+${b}.\\text{ Está correto?}`,steps:[`\\frac{${a}x+${b}}{${d}}\\neq ${a}x+${b}`,`\\text{Para eliminar o denominador é necessário multiplicar os dois membros por }${d}.`],solution:{answer:'\\text{Não}',set:'\\text{O denominador não pode ser simplesmente eliminado.}'},family:'erro-denominador',label:'Analisar e corrigir o erro'}}
 if(wrong==='sinal-fracao'){const a=ri(2,6),b=ri(1,8),d=pick([2,3,4,5]);return{question:`\\text{Um aluno escreveu }-\\frac{${a}x-${b}}{${d}}=\\frac{-${a}x-${b}}{${d}}.\\text{ Está correto?}`,steps:[`-(${a}x-${b})=-${a}x+${b}`,`-\\frac{${a}x-${b}}{${d}}=\\frac{-${a}x+${b}}{${d}}`],solution:{answer:'\\text{Não}',set:`\\frac{-${a}x+${b}}{${d}}`},family:'erro-sinal-fracao',label:'Analisar o sinal antes da fração'}}
 if(wrong==='produto-fracao'){const a=ri(2,5),b=ri(1,6),d=pick([2,3,4]);return{question:`\\text{Ao eliminar denominadores em }\\frac{${a}(x+${b})}{${d}}=1\\text{, obtém-se }${a}x+${b}=${d}.\\text{ Está correto?}`,steps:[`${a}(x+${b})=${d}`,`${a}x+${a*b}=${d}`],solution:{answer:'\\text{Não}',set:`\\text{O fator }${a}\\text{ multiplica os dois termos.}`},family:'erro-produto-fracao',label:'Analisar denominadores e parênteses'}}
 if(wrong==='produto'){const a=ri(2,6),b=ri(2,5);return{question:`\\text{Um aluno escreveu }${a}(x+${b})=${a}x+${b}.\\text{ A igualdade está correta?}`,steps:[`${a}(x+${b})=${a}x+${a*b}`,`\\text{O fator exterior multiplica os dois termos.}`],solution:{answer:'\\text{Não}',set:`\\text{Correção: }${a}x+${a*b}`},family:'erro-distributiva',label:'Analisar e corrigir o erro'}}
 if(wrong==='transposicao'){const a=ri(2,7),b=ri(2,9),x=ri(1,8),c=a*x+b;return{question:`\\text{Na equação }${a}x+${b}=${c}\\text{, um aluno obteve }${a}x=${c}+${b}.\\text{ Está correto?}`,steps:[`${a}x+${b}=${c}`,`${a}x=${c}-${b}`,`x=${x}`],solution:{answer:'\\text{Não}',set:`\\left\\{${x}\\right\\}`},family:'erro-transposicao',label:'Analisar e corrigir o erro'}}
 const a=ri(2,6),b=ri(2,8),x=ri(1,7),c=a*x-b;return{question:`\\text{Qual é a operação inversa que permite passar de }${a}x-${b}=${c}\\text{ para }${a}x=\\,?`,steps:[`${a}x=${c}+${b}`,`${a}x=${a*x}`,`x=${x}`],solution:{answer:`${c}+${b}`,set:`\\left\\{${x}\\right\\}`},family:'operacao-inversa',label:'Selecionar o passo correto'};
}
function problem(year,level,structure='misto'){
 const byYear=year===7
  ?(level===1?['numero','compras']:level===2?['idade','perimetro','tarifa']:['idade','consecutivos','retangulo','tarifa'])
  :year===8
   ?(level===1?['idade','numero','perimetro','compras']:level===2?['idade','consecutivos','tarifa','retangulo']:['idade2','consecutivos','tarifa','retangulo','bilhetes','percurso','diferenca-quantidades','saldo-parenteses','perimetros-diferenca'])
   :(level===1?['tarifa','retangulo','consecutivos']:level===2?['idade2','bilhetes','percurso','retangulo']:['idade2','consecutivos','bilhetes','percurso','diferenca-quantidades','saldo-parenteses','perimetros-diferenca']);
 const without=byYear.filter(x=>['numero','compras','tarifa','percurso'].includes(x));
 const withParentheses=byYear.filter(x=>['idade','idade2','perimetro','consecutivos','retangulo','bilhetes','diferenca-quantidades','saldo-parenteses','perimetros-diferenca'].includes(x));
 const mixed=byYear;
 const families=structure==='sem'?without:structure==='com'?withParentheses:mixed;
 const f=pick(families.length?families:mixed);

 if(f==='diferenca-quantidades'){
  const x=ri(4,18),a=ri(3,6),b=ri(1,a-1),p=ri(2,7),q=ri(2,7),d=a*(x+p)-b*(x+q);
  return normal(`Uma associação prepara ${a} conjuntos com (x+${p}) cartões cada. Outra prepara ${b} conjuntos com (x+${q}) cartões cada. A primeira tem mais ${d} cartões do que a segunda. Quantos cartões representa x?`,
   [`${a}(x+${p})-${b}(x+${q})=${d}`,`${a}x+${a*p}-${b}x-${b*q}=${d}`,`${a-b}x=${d-a*p+b*q}`,`x=${x}`],x,1,'problema-diferenca-quantidades','Traduz e resolve, atendendo aos sinais');
 }
 if(f==='saldo-parenteses'){
  const x=ri(5,18),a=ri(3,6),b=ri(1,a-1),p=ri(3,8),q=ri(2,7),rest=a*(x+p)-b*(x+q);
  return normal(`Uma papelaria recebe ${a} caixas com (x+${p}) cadernos em cada uma. Vende ${b} lotes com (x+${q}) cadernos em cada lote. No final ficam ${rest} cadernos. Determina x.`,
   [`${a}(x+${p})-${b}(x+${q})=${rest}`,`${a}x+${a*p}-${b}x-${b*q}=${rest}`,`${a-b}x=${rest-a*p+b*q}`,`x=${x}`],x,1,'problema-saldo-parenteses','Organiza os dados e resolve');
 }
 if(f==='perimetros-diferenca'){
  const x=ri(5,17),p=ri(3,8),q=ri(1,p-1),r=ri(2,6),t=ri(1,5);
  const P1=2*((x+p)+(x+r)),P2=2*((x+q)+t),diff=P1-P2;
  return normal(`O primeiro retângulo tem lados (x+${p}) cm e (x+${r}) cm. O segundo tem lados (x+${q}) cm e ${t} cm. A diferença entre os perímetros, primeiro menos segundo, é ${diff} cm. Determina x.`,
   [`2((x+${p})+(x+${r}))-2((x+${q})+${t})=${diff}`,`4x+${2*(p+r)}-2x-${2*(q+t)}=${diff}`,`2x=${diff-2*(p+r)+2*(q+t)}`,`x=${x}`],x,1,'problema-perimetros-diferenca','Subtrai os perímetros e resolve');
 }
 if(f==='numero'){const x=ri(4,25),a=ri(2,5),b=ri(3,12),total=a*x+b;return normal(`Um número é multiplicado por ${a} e ao resultado adicionam-se ${b}. Obtém-se ${total}. Qual é o número?`,[`${a}x+${b}=${total}`,`${a}x=${total-b}`,`x=${x}`],x,1,'problema-numero','Resolve o problema através de uma equação');}
 if(f==='idade'||f==='idade2'){const x=ri(8,18),gap=ri(3,12),years=f==='idade2'?ri(2,6):0,total=x+years+x+gap+years,model=years?`(x+${years})+(x+${gap}+${years})=${total}`:`x+(x+${gap})=${total}`;return normal(`A Inês tem menos ${gap} anos do que o irmão. ${years?`Daqui a ${years} anos,`: 'Atualmente,'} a soma das idades será ${total} anos. Que idade tem atualmente a Inês?`,[model,`2x+${gap+2*years}=${total}`,`2x=${2*x}`,`x=${x}`],x,1,'problema-idades','Define a incógnita e resolve');}
 if(f==='consecutivos'){const x=ri(3,30),count=level===3?4:3,total=count*x+count*(count-1)/2;const terms=Array.from({length:count},(_,i)=>i?`(x+${i})`:'x').join('+');return normal(`A soma de ${count} números inteiros consecutivos é ${total}. Qual é o menor desses números?`,[`${terms}=${total}`,`${count}x+${count*(count-1)/2}=${total}`,`${count}x=${count*x}`,`x=${x}`],x,1,'problema-consecutivos','Traduz a situação por uma equação');}
 if(f==='perimetro'||f==='retangulo'){const w=ri(3,12),extra=ri(2,8),l=w+extra,P=2*(w+l);return normal(`Um retângulo tem ${P} cm de perímetro. O comprimento excede a largura em ${extra} cm. Determina a largura.`,[`2x+2(x+${extra})=${P}`,`4x+${2*extra}=${P}`,`4x=${4*w}`,`x=${w}`],w,1,'problema-geometria','Constrói e resolve uma equação');}
 if(f==='tarifa'){const fixed=pick([3,5,7]),rate=pick([2,3,4]),units=ri(4,14),total=fixed+rate*units;return normal(`Um serviço cobra uma taxa fixa de ${fixed} € e mais ${rate} € por utilização. Uma fatura foi de ${total} €. Quantas utilizações foram feitas?`,[`${fixed}+${rate}x=${total}`,`${rate}x=${total-fixed}`,`x=${units}`],units,1,'problema-tarifa','Modela a situação');}
 if(f==='bilhetes'){const child=pick([4,5,6]),adult=child+pick([3,4,5]),n=ri(8,20),more=ri(2,8),total=child*n+adult*(n+more);return normal(`Num espetáculo venderam-se mais ${more} bilhetes de adulto do que de criança. Cada bilhete de criança custava ${child} € e cada bilhete de adulto ${adult} €. A receita foi ${total} €. Quantos bilhetes de criança foram vendidos?`,[`${child}x+${adult}(x+${more})=${total}`,`${child+adult}x+${adult*more}=${total}`,`${child+adult}x=${(child+adult)*n}`,`x=${n}`],n,1,'problema-bilhetes','Organiza a informação e resolve');}
 if(f==='percurso'){const v1=pick([3,4,5]),v2=v1+pick([2,3]),t=ri(3,8),extra=ri(6,20),total=v1*t+v2*(t+extra/v2);return normal(`Dois percursos totalizam ${total} km. No primeiro percorrem-se ${v1} km por etapa; no segundo, ${v2} km por etapa e ainda ${extra} km adicionais. Se ambos têm o mesmo número de etapas, quantas etapas tem cada percurso?`,[`${v1}x+${v2}x+${extra}=${total}`,`${v1+v2}x=${total-extra}`,`x=${t}`],t,1,'problema-percurso','Escolhe uma incógnita comum');}
 const packs=ri(3,10),each=ri(4,12),used=ri(5,Math.min(20,packs*each-1)),left=packs*each-used;return normal(`Foram compradas ${packs} embalagens com o mesmo número de unidades. Depois de se utilizarem ${used}, sobraram ${left}. Quantas unidades tinha cada embalagem?`,[`${packs}x-${used}=${left}`,`${packs}x=${left+used}`,`x=${each}`],each,1,'problema-compras','Resolve o problema através de uma equação');
}
function generate(year,level,type,structure='misto'){
 const requestedStructure=structure;
 const simpleY=()=>simple(year,level),parenthesesY=()=>parentheses(year,level),classifyY=()=>classify(year,level);
 let plain,withParentheses,withDenominators,withBoth;
 if(year===7){
  plain=[simpleY];
  withParentheses=level===1?[]:[parenthesesY];
  withDenominators=[];withBoth=[];
 }else if(year===8){
  plain=[simpleY];
  withParentheses=[parenthesesY];
  withDenominators=level===1?[fractions]:level===2?[fractions]:[fractions,minusFraction];
  withBoth=level===1?[]:level===2?[nested]:[doubleSignedNested,singleSignedNested,singleSignedNested,nested,nested];
 }else{
  plain=[simpleY];
  withParentheses=[parenthesesY];
  withDenominators=level===1?[fractions]:[fractions,minusFraction];
  withBoth=level===1?[nested]:level===2?[nested]:[rationalMixed,rationalMixed,doubleSignedNested,singleSignedNested,nested];
 }
 const pools={sem:plain,com:withParentheses,denom:withDenominators,ambos:withBoth};
 if(!pools[structure]?.length)structure='sem';
 const calculation=pools[structure]||plain;
 const selectionPool=[()=>selection(level,structure),classifyY];
 const map={calculo:calculation,selecao:selectionPool,problema:[()=>problem(year,level,requestedStructure)]};
 const choices=type==='misto'?[...calculation,...selectionPool,()=>problem(year,level,requestedStructure)]:map[type];
 const forbidden=s=>/(?:\+|-)\s*0(?![.,\d])|0x/.test(String(s||''));
 let result,guard=0;do{result=pick(choices)(level);guard++}while(guard<80&&forbidden(result.question));
 return result;
}
function render(ex){
 dadosResolucao={passos:ex.steps.map((eq,i)=>({desc:i===0?'<strong>Começamos por traduzir ou simplificar:</strong>':'<strong>Equação equivalente:</strong>',eq})),solucaoTexto:`A resposta é: $$${ex.solution.answer}$$`,conjuntoSolucao:ex.solution.set,tipo:'normal'};
 const box=$('equacaoTexto');box.innerHTML=`<span class="question-label">${ex.label}</span>${ex.family.startsWith('problema')?`<div class="problem-text">${ex.question}</div>`:`$$${ex.question}$$`}`;
 $('passosBox').style.display='none';$('solucaoBox').style.display='none';$('btnPassos').textContent='Ver Passos da Resolução';$('btnSolucao').textContent='Ver Apenas Solução';$('resultado').style.display='block';$('btnPassos').style.display='block';$('btnSolucao').style.display='block';
 if(window.MathJax?.typesetPromise)MathJax.typesetPromise([box]);
 }
 window.gerarEquacao=()=>render(generate(+$('ano').value,+$('dificuldade').value,$('tipoExercicio').value,$('estrutura')?.value||'misto'));
 window.__equations={generate,simple,parentheses,fractions,minusFraction,nested,signedNested,singleSignedNested,doubleSignedNested,rationalMixed,classify,selection,problem};
})();
