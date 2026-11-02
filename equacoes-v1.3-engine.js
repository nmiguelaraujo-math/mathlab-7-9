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
function classify(year=9,level=3){
 const identity=Math.random()<.5,b=nz(-10,10),positiveOnly=year===7||(year===8&&level===1),k=positiveOnly?ri(2,5):nz(-4,4),p=nz(-5,5),leftA=k,leftB=k*p+b,r=leftA,s=identity?leftB:leftB+nz(-5,5);
 const q=`${factor(k)}(x ${sign(p)}) ${sign(b)}=${lin(r,s)}`;
 const reduced=`${lin(leftA,leftB)}=${lin(r,s)}`;
 return special(q,[reduced,identity?'0x=0':`0x=${s-leftB}`,identity?'\\text{Todos os números reais verificam a igualdade.}':'\\text{A igualdade é impossível.}'],identity?'identity':'impossible','classificacao');
}
function selection(level,structure='misto'){
 const families=structure==='sem'?['transposicao','distributiva']:structure==='com'?['produto']:['produto','transposicao','distributiva'],wrong=pick(families);
 if(wrong==='produto'){const a=ri(2,6),b=ri(2,5);return{question:`\\text{Um aluno escreveu }${a}(x+${b})=${a}x+${b}.\\text{ A igualdade está correta?}`,steps:[`${a}(x+${b})=${a}x+${a*b}`,`\\text{O fator exterior multiplica os dois termos.}`],solution:{answer:'\\text{Não}',set:`\\text{Correção: }${a}x+${a*b}`},family:'erro-distributiva',label:'Analisar e corrigir o erro'}}
 if(wrong==='transposicao'){const a=ri(2,7),b=ri(2,9),x=ri(1,8),c=a*x+b;return{question:`\\text{Na equação }${a}x+${b}=${c}\\text{, um aluno obteve }${a}x=${c}+${b}.\\text{ Está correto?}`,steps:[`${a}x+${b}=${c}`,`${a}x=${c}-${b}`,`x=${x}`],solution:{answer:'\\text{Não}',set:`\\left\\{${x}\\right\\}`},family:'erro-transposicao',label:'Analisar e corrigir o erro'}}
 const a=ri(2,6),b=ri(2,8),x=ri(1,7),c=a*x-b;return{question:`\\text{Qual é a operação inversa que permite passar de }${a}x-${b}=${c}\\text{ para }${a}x=\\,?`,steps:[`${a}x=${c}+${b}`,`${a}x=${a*x}`,`x=${x}`],solution:{answer:`${c}+${b}`,set:`\\left\\{${x}\\right\\}`},family:'operacao-inversa',label:'Selecionar o passo correto'};
}
function problem(year,level,structure='misto'){
 const byYear=year===7
  ?(level===1?['numero','compras']:level===2?['idade','perimetro','tarifa']:['idade','consecutivos','retangulo','tarifa'])
  :year===8
   ?(level===1?['idade','numero','perimetro','compras']:level===2?['idade','consecutivos','tarifa','retangulo']:['idade2','consecutivos','tarifa','retangulo','bilhetes','percurso'])
   :(level===1?['tarifa','retangulo','consecutivos']:level===2?['idade2','bilhetes','percurso','retangulo']:['idade2','consecutivos','bilhetes','percurso']);
 const without=byYear.filter(x=>['numero','compras','tarifa','percurso'].includes(x));
 const withParentheses=byYear.filter(x=>['idade','idade2','perimetro','consecutivos','retangulo','bilhetes'].includes(x));
 const mixed=byYear;
 const families=structure==='sem'?without:structure==='com'?withParentheses:mixed;
 const f=pick(families.length?families:mixed);
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
 const simpleY=()=>simple(year,level),parenthesesY=()=>parentheses(year,level),classifyY=()=>classify(year,level);
 let without,withParentheses;
 if(year===7){
  without=[simpleY];
  withParentheses=level===1?[]:[parenthesesY];
 }else if(year===8){
  without=level===3?[simpleY,fractions]:[simpleY];
  withParentheses=[parenthesesY];
 }else{
  without=level===1?[simpleY,fractions]:level===2?[fractions,minusFraction]:[fractions,minusFraction];
  withParentheses=level===1?[parenthesesY]:level===2?[parenthesesY,nested]:[parenthesesY,nested,nested];
 }
 if(structure==='com'&&!withParentheses.length)structure='sem';
 const calculation=structure==='sem'?without:structure==='com'?withParentheses:[...without,...withParentheses];
 const selectionPool=structure==='sem'?[()=>selection(level,'sem')]:structure==='com'?[()=>selection(level,'com'),classifyY]:[()=>selection(level,'misto'),classifyY];
 const map={calculo:calculation,selecao:selectionPool,problema:[()=>problem(year,level,structure)]};
 const choices=type==='misto'?[...calculation,...selectionPool,()=>problem(year,level,structure)]:map[type];
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
 window.__equations={generate,simple,parentheses,fractions,minusFraction,nested,classify,selection,problem};
})();
