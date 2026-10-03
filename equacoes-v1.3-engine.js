(()=>{'use strict';
const $=id=>document.getElementById(id),ri=(a,b)=>Math.floor(Math.random()*(b-a+1))+a,pick=a=>a[ri(0,a.length-1)];
const nz=(a,b)=>{let n=0;while(!n)n=ri(a,b);return n};
const sign=n=>n<0?`- ${Math.abs(n)}`:`+ ${n}`;
const coef=(a,v='x')=>a===1?v:a===-1?`-${v}`:`${a}${v}`;
const lin=(a,b)=>`${coef(a)} ${sign(b)}`;
const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
const frac=(n,d=1)=>{if(d<0){n=-n;d=-d}const g=gcd(n,d);n/=g;d/=g;return d===1?String(n):`\\frac{${n}}{${d}}`};
const solution=(n,d=1)=>{const x=frac(n,d);return{x,value:n/d,answer:`x=${x}`,set:`\\left\\{${x}\\right\\}`}};
const normal=(question,steps,n,d=1,family='calculo',label='Resolver a equação')=>({question,steps,solution:solution(n,d),family,label});
const special=(question,steps,type,family='selecao',label='Classificar a equação')=>({question,steps,solution:type==='identity'?{answer:'\\text{Equação possível indeterminada}',set:'\\mathbb R'}:{answer:'\\text{Equação impossível}',set:'\\varnothing'},family,label});

function simple(level){
 const x=ri(-9,12),a=nz(-8,8),b=ri(-14,14),c=a*x+b;
 if(level===1&&Math.random()<.5)return normal(`${coef(a)} ${sign(b)}=${c}`,[`${coef(a)}=${c} ${sign(-b)}`,`${coef(a)}=${a*x}`,`x=${x}`],x,1,'isolar');
 const r=nz(-6,6),s=c-r*x;return normal(`${lin(a,b)}=${lin(r,s)}`,[`${coef(a)} ${sign(-r)}x=${s} ${sign(-b)}`,`${coef(a-r)}=${(a-r)*x}`,`x=${x}`],x,1,'ambos-membros');
}
function parentheses(level){
 const x=ri(-8,10),k=nz(-5,5),p=ri(-6,6),q=ri(-10,10),r=nz(-5,5),leftA=k,leftB=k*p+q,s=(leftA-r)*x+leftB;
 if(level<3||Math.random()<.55)return normal(`${k}(x ${sign(p)}) ${sign(q)}=${lin(r,s)}`,[`${coef(k)} ${sign(k*p)} ${sign(q)}=${lin(r,s)}`,`${lin(k,k*p+q)}=${lin(r,s)}`,`${coef(k-r)}=${s-(k*p+q)}`,`x=${x}`],x,1,'parenteses');
 const h=nz(-4,4),t=ri(-5,5),u=ri(-8,8),rightA=h,rightB=h*t+u,s2=rightA*x+rightB-leftA*x-k*p;
 return normal(`${k}(x ${sign(p)}) ${sign(s2)}=${h}(x ${sign(t)}) ${sign(u)}`,[`${coef(k)} ${sign(k*p)} ${sign(s2)}=${coef(h)} ${sign(h*t)} ${sign(u)}`,`${lin(k,k*p+s2)}=${lin(h,h*t+u)}`,`${coef(k-h)}=${h*t+u-(k*p+s2)}`,`x=${x}`],x,1,'dois-parenteses');
}
function fractions(level){
 const x=ri(-7,9),d1=pick([2,3,4,5]),d2=pick([2,3,4,5,6]),m=d1*d2/gcd(d1,d2),a=nz(-4,4),r=nz(-4,4),p=ri(-5,5),q=(a*x+p)*d2/d1-r*x;
 if(Number.isInteger(q))return normal(`\\frac{${coef(a)} ${sign(p)}}{${d1}}=\\frac{${coef(r)} ${sign(q)}}{${d2}}`,[`${d2}(${coef(a)} ${sign(p)})=${d1}(${coef(r)} ${sign(q)})`,`${coef(d2*a)} ${sign(d2*p)}=${coef(d1*r)} ${sign(d1*q)}`,`${coef(d2*a-d1*r)}=${d1*q-d2*p}`,`x=${x}`],x,1,'fracoes');
 const b=(a*x+p)/d1;return normal(`\\frac{${coef(a)} ${sign(p)}}{${d1}}=${frac(a*x+p,d1)}`,[`${coef(a)} ${sign(p)}=${a*x+p}`,`${coef(a)}=${a*x}`,`x=${x}`],x,1,'fracoes');
}
function minusFraction(){
 const x=ri(-6,8),d=pick([2,3,4,5]),a=nz(1,4),p=ri(-5,5),k=ri(-5,7),right=k-(a*x+p)/d;
 return normal(`${k}-\\frac{${coef(a)} ${sign(p)}}{${d}}=${frac(right)}`,[`${k*d}-(${coef(a)} ${sign(p)})=${right*d}`,`${k*d}-${coef(a)} ${sign(-p)}=${right*d}`,`${coef(-a)}=${right*d-k*d+p}`,`x=${x}`],x,1,'menos-fracao');
}
function nested(){
 const x=ri(-5,7),d=pick([2,3,4]),e=pick([2,3,5]),k=nz(-3,3),p=ri(-4,4),r=nz(-3,3),t=ri(-4,4),mm=d*e/gcd(d,e),A=mm/d*k,B=mm/e*r,C=A*(x+p)-B*(x+t);
 return normal(`\\frac{${k}(x ${sign(p)})}{${d}}-\\frac{${r}(x ${sign(t)})}{${e}}=${frac(C,mm)}`,[`${A}(x ${sign(p)})-${B}(x ${sign(t)})=${C}`,`${coef(A)} ${sign(A*p)} ${sign(-B)}x ${sign(-B*t)}=${C}`,`${coef(A-B)}=${C-A*p+B*t}`,`x=${x}`],x,1,'varias-operacoes');
}
function classify(){
 const identity=Math.random()<.5,a=nz(-6,6),b=ri(-10,10),k=nz(-4,4),p=ri(-5,5),leftA=k,leftB=k*p+b,r=leftA,s=identity?leftB:leftB+nz(-5,5);
 const q=`${k}(x ${sign(p)}) ${sign(b)}=${lin(r,s)}`;
 const reduced=`${lin(leftA,leftB)}=${lin(r,s)}`;
 return special(q,[reduced,identity?'0x=0':`0x=${s-leftB}`,identity?'\\text{Todos os números reais verificam a igualdade.}':'\\text{A igualdade é impossível.}'],identity?'identity':'impossible','classificacao');
}
function selection(level){
 const wrong=pick(['produto','transposicao','distributiva']);
 if(wrong==='produto'){const a=ri(2,6),b=ri(2,5);return{question:`\\text{Um aluno escreveu }${a}(x+${b})=${a}x+${b}.\\text{ A igualdade está correta?}`,steps:[`${a}(x+${b})=${a}x+${a*b}`,`\\text{O fator exterior multiplica os dois termos.}`],solution:{answer:'\\text{Não}',set:`\\text{Correção: }${a}x+${a*b}`},family:'erro-distributiva',label:'Analisar e corrigir o erro'}}
 if(wrong==='transposicao'){const a=ri(2,7),b=ri(2,9),x=ri(1,8),c=a*x+b;return{question:`\\text{Na equação }${a}x+${b}=${c}\\text{, um aluno obteve }${a}x=${c}+${b}.\\text{ Está correto?}`,steps:[`${a}x+${b}=${c}`,`${a}x=${c}-${b}`,`x=${x}`],solution:{answer:'\\text{Não}',set:`\\left\\{${x}\\right\\}`},family:'erro-transposicao',label:'Analisar e corrigir o erro'}}
 const a=ri(2,6),b=ri(2,8),x=ri(1,7),c=a*x-b;return{question:`\\text{Qual é a operação inversa que permite passar de }${a}x-${b}=${c}\\text{ para }${a}x=\\,?`,steps:[`${a}x=${c}+${b}`,`${a}x=${a*x}`,`x=${x}`],solution:{answer:`${c}+${b}`,set:`\\left\\{${x}\\right\\}`},family:'operacao-inversa',label:'Selecionar o passo correto'};
}
function problem(level){
 const families=level===1?['idade','numero','perimetro','compras']:level===2?['idade','consecutivos','tarifa','retangulo','mistura']:['idade2','consecutivos','tarifa','retangulo','bilhetes','percurso'];
 const f=pick(families);
 if(f==='numero'){const x=ri(4,25),a=ri(2,5),b=ri(3,12),total=a*x+b;return normal(`Um número é multiplicado por ${a} e ao resultado adicionam-se ${b}. Obtém-se ${total}. Qual é o número?`,[`${a}x+${b}=${total}`,`${a}x=${total-b}`,`x=${x}`],x,1,'problema-numero','Resolve o problema através de uma equação');}
 if(f==='idade'||f==='idade2'){const x=ri(8,18),gap=ri(3,12),years=f==='idade2'?ri(2,6):0,total=x+years+x+gap+years;return normal(`A Inês tem menos ${gap} anos do que o irmão. ${years?`Daqui a ${years} anos,`: 'Atualmente,'} a soma das idades será ${total} anos. Que idade tem atualmente a Inês?`,[`x+${years}+(x+${gap}+${years})=${total}`,`2x+${gap+2*years}=${total}`,`2x=${2*x}`,`x=${x}`],x,1,'problema-idades','Define a incógnita e resolve');}
 if(f==='consecutivos'){const x=ri(3,30),count=level===3?4:3,total=count*x+count*(count-1)/2;const terms=Array.from({length:count},(_,i)=>i?`(x+${i})`:'x').join('+');return normal(`A soma de ${count} números inteiros consecutivos é ${total}. Qual é o menor desses números?`,[`${terms}=${total}`,`${count}x+${count*(count-1)/2}=${total}`,`${count}x=${count*x}`,`x=${x}`],x,1,'problema-consecutivos','Traduz a situação por uma equação');}
 if(f==='perimetro'||f==='retangulo'){const w=ri(3,12),extra=ri(2,8),l=w+extra,P=2*(w+l);return normal(`Um retângulo tem ${P} cm de perímetro. O comprimento excede a largura em ${extra} cm. Determina a largura.`,[`2x+2(x+${extra})=${P}`,`4x+${2*extra}=${P}`,`4x=${4*w}`,`x=${w}`],w,1,'problema-geometria','Constrói e resolve uma equação');}
 if(f==='tarifa'){const fixed=pick([3,5,7]),rate=pick([2,3,4]),units=ri(4,14),total=fixed+rate*units;return normal(`Um serviço cobra uma taxa fixa de ${fixed} € e mais ${rate} € por utilização. Uma fatura foi de ${total} €. Quantas utilizações foram feitas?`,[`${fixed}+${rate}x=${total}`,`${rate}x=${total-fixed}`,`x=${units}`],units,1,'problema-tarifa','Modela a situação');}
 if(f==='bilhetes'){const child=pick([4,5,6]),adult=child+pick([3,4,5]),n=ri(8,20),more=ri(2,8),total=child*n+adult*(n+more);return normal(`Num espetáculo venderam-se mais ${more} bilhetes de adulto do que de criança. Cada bilhete de criança custava ${child} € e cada bilhete de adulto ${adult} €. A receita foi ${total} €. Quantos bilhetes de criança foram vendidos?`,[`${child}x+${adult}(x+${more})=${total}`,`${child+adult}x+${adult*more}=${total}`,`${child+adult}x=${(child+adult)*n}`,`x=${n}`],n,1,'problema-bilhetes','Organiza a informação e resolve');}
 if(f==='percurso'){const v1=pick([3,4,5]),v2=v1+pick([2,3]),t=ri(3,8),extra=ri(6,20),total=v1*t+v2*(t+extra/v2);return normal(`Dois percursos totalizam ${total} km. No primeiro percorrem-se ${v1} km por etapa; no segundo, ${v2} km por etapa e ainda ${extra} km adicionais. Se ambos têm o mesmo número de etapas, quantas etapas tem cada percurso?`,[`${v1}x+${v2}x+${extra}=${total}`,`${v1+v2}x=${total-extra}`,`x=${t}`],t,1,'problema-percurso','Escolhe uma incógnita comum');}
 const packs=ri(3,10),each=ri(4,12),used=ri(5,Math.min(20,packs*each-1)),left=packs*each-used;return normal(`Foram compradas ${packs} embalagens com o mesmo número de unidades. Depois de se utilizarem ${used}, sobraram ${left}. Quantas unidades tinha cada embalagem?`,[`${packs}x-${used}=${left}`,`${packs}x=${left+used}`,`x=${each}`],each,1,'problema-compras','Resolve o problema através de uma equação');
}
function generate(level,type){
 const map={calculo:level===1?[simple]:level===2?[simple,parentheses,fractions]:[parentheses,fractions,minusFraction,nested,classify],selecao:[selection,classify],problema:[()=>problem(level)]};
 const choices=type==='misto'?[...(map.calculo),selection,()=>problem(level)]:map[type];return pick(choices)(level);
}
function render(ex){
 dadosResolucao={passos:ex.steps.map((eq,i)=>({desc:i===0?'<strong>Começamos por traduzir ou simplificar:</strong>':'<strong>Equação equivalente:</strong>',eq})),solucaoTexto:`A resposta é: $$${ex.solution.answer}$$`,conjuntoSolucao:ex.solution.set,tipo:'normal'};
 const box=$('equacaoTexto');box.innerHTML=`<span class="question-label">${ex.label}</span>${ex.family.startsWith('problema')?`<div class="problem-text">${ex.question}</div>`:`$$${ex.question}$$`}`;
 $('passosBox').style.display='none';$('solucaoBox').style.display='none';$('btnPassos').textContent='Ver Passos da Resolução';$('btnSolucao').textContent='Ver Apenas Solução';$('resultado').style.display='block';$('btnPassos').style.display='block';$('btnSolucao').style.display='block';
 if(window.MathJax?.typesetPromise)MathJax.typesetPromise([box]);
 }
 window.gerarEquacao=()=>render(generate(+$('dificuldade').value,$('tipoExercicio').value));
 window.__equations={generate,simple,parentheses,fractions,minusFraction,nested,classify,selection,problem};
})();
