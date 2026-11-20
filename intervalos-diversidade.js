/* MathLab: famílias adicionais e rotação de raciocínios (sem remover geradores anteriores). */
(()=>{'use strict';
const a=window.__intervals;if(!a)return;
const {I,ep,NEG,POS,notation,intersection,union,setTex,graph,integerList}=a;
const rand=(x,y)=>Math.floor(Math.random()*(y-x+1))+x;
const pick=x=>x[rand(0,x.length-1)];
const S=(math,reason='')=>({math,reason});
const E=(prompt,statement,answer,steps,family,extra={})=>({prompt,statement,answer,steps,family,visual:extra.visual||'',answerVisual:extra.answerVisual||'',choices:null});
const box=t=>`\\boxed{${t}}`;
const eq=(a,b)=>`\\[A=${notation(a)}\\qquad B=${notation(b)}\\]`;
function intervalFromCondition(level){const m=rand(-5,3),w=rand(3,7),x=I(ep(m),ep(m+w),rand(0,1)===1,rand(0,1)===1);const styles=['condition','graph','elements'];const style=pick(level===1?styles.slice(0,2):styles);
 if(style==='graph')return E('Observa a reta real. Escreve o intervalo e uma condição equivalente.','',box(`I=${notation(x)}`),[S(`I=${notation(x)}`),S(a.condition(x))],'equivalencia-grafico',{visual:graph([x])});
 if(style==='elements'){const ints=integerList(x);return E('Escreve em extensão o conjunto dos números inteiros pertencentes ao intervalo e indica quantos são.',`\\[I=${notation(x)}\\]`,box(`I\\cap\\mathbb Z=\\{${ints.join(',')}\\}\\quad\\text{(${ints.length} elementos)}`),[S(`I\\cap\\mathbb Z=\\{${ints.join(',')}\\}`)],'equivalencia-extensao');}
 return E('Escreve o conjunto sob a forma de intervalo e representa-o na reta real.',`\\[A=\\{x\\in\\mathbb R:${a.condition(x)}\\}\\]`,box(`A=${notation(x)}`),[S(`A=${notation(x)}`)],'equivalencia-condicao',{answerVisual:graph([x])});}
function graphicOperations(level){const m=rand(-5,1),A=I(ep(m),ep(m+5),true,rand(0,1)===1),B=I(ep(m+2),ep(m+8),rand(0,1)===1,false);const op=pick(['intersection','union']);const res=op==='intersection'?intersection(A,B):union(A,B);const sym=op==='intersection'?'\\cap':'\\cup';return E(`Observa as representações dos conjuntos A e B. Determina ${op==='intersection'?'a interseção':'a reunião'} e escreve o resultado na forma de intervalo.`,'',box(`A${sym}B=${setTex(res)}`),[S(`A=${notation(A)}`),S(`B=${notation(B)}`),S(`A${sym}B=${setTex(res)}`)],`operacao-leitura-grafica-${op}`,{visual:graph([A,B],['#e85a78','#2878d0'],['A','B'])});}
function twoForms(level){const m=rand(-6,1),a1=I(ep(m),ep(m+rand(4,6)),true,false),b1=I(ep(m+2),ep(m+rand(7,10)),false,true);const r=intersection(a1,b1),u=union(a1,b1);const op=pick(['intersection','union','both']);const ans=op==='intersection'?`A\\cap B=${setTex(r)}`:op==='union'?`A\\cup B=${setTex(u)}`:`A\\cap B=${setTex(r)}\\quad\\text{e}\\quad A\\cup B=${setTex(u)}`;return E(op==='both'?'Determina a reunião e a interseção.':'Determina '+(op==='union'?'a reunião.':'a interseção.'),`\\[A=\\{x\\in\\mathbb R:${a.condition(a1)}\\}\\qquad B=${notation(b1)}\\]`,box(ans),[S(`A=${notation(a1)}`),S(ans)],`operacao-representacoes-${op}`);}
function compound(level){const m=rand(-6,-1),A=I(ep(m),ep(m+6),true,false),B=I(ep(m+2),ep(m+9),false,true),C=I(ep(m+4),ep(m+11),true,false);const AB=intersection(A,B),BC=intersection(B,C),r=union(AB,BC);return E('Determina e simplifica a expressão de conjuntos.',`\\[A=${notation(A)},\\quad B=${notation(B)},\\quad C=${notation(C)}\\]\\[(A\\cap B)\\cup(B\\cap C)\\]`,box(setTex(r)),[S(`A\\cap B=${setTex(AB)}`),S(`B\\cap C=${setTex(BC)}`),S(`(A\\cap B)\\cup(B\\cap C)=${setTex(r)}`)],'operacao-composta-3-conjuntos');}
function disjointInverse(level){const cut=rand(-3,4),end=cut+rand(4,10),B=I(NEG,ep(cut),false,true),A=I(ep(cut),ep(end),false,false),U=I(NEG,ep(end),false,false);return E('Sabe-se que A e B são intervalos disjuntos. Determina A na forma de intervalo.',`\\[A\\cup B=${notation(U)}\\qquad B=${notation(B)}\\]`,box(`A=${notation(A)}`),[S(`B=${notation(B)}`),S(`A=(A\\cup B)\\setminus B=${notation(A)}`,'Como os conjuntos são disjuntos, o extremo comum pertence apenas a B.')],'problema-inverso-disjuntos');}
function integerParameter(level){const n=rand(2,10),count=rand(3,8),end=n+count;const A=I(ep(n),ep(end),true,false);return E('Determina o número natural n sabendo que o intervalo contém exatamente o número indicado de inteiros.',`\\[I=[n;${end}[\\qquad\\#(I\\cap\\mathbb Z)=${count}\\]`,box(`n=${n}`),[S(`${end}-n=${count}`),S(`n=${n}`)],'problema-parametro-inteiros');}
function squares(level){const start=rand(2,5),count=rand(2,4),lo=start*start-1,hi=(start+count)*(start+count)-1;const sq=Array.from({length:count},(_,i)=>(start+i)**2);return E('Determina todos os quadrados perfeitos que pertencem ao intervalo e indica quantos são.',`\\[I=]${lo};${hi}[\\]`,box(`\\{${sq.join(',')}\\}\\quad\\text{(${count} quadrados perfeitos)}`),[S(`I\\cap\\{k^2:k\\in\\mathbb N\\}=\\{${sq.join(',')}\\}`)],'problema-quadrados-perfeitos');}
function radicals(level){const rad=pick([[2,'\\sqrt2'],[3,'\\sqrt3'],[5,'\\sqrt5'],[7,'\\sqrt7']]);const k=rand(2,5),x=I(ep(-Math.sqrt(rad[0]),`-${rad[1]}`),ep(k),false,true);const list=integerList(x);const kind=pick(['count','min','sum']);const value=kind==='count'?list.length:kind==='min'?list[0]:list.reduce((s,v)=>s+v,0);const q=kind==='count'?'Quantos números inteiros pertencem ao intervalo?':kind==='min'?'Qual é o menor número inteiro pertencente ao intervalo?':'Calcula a soma dos números inteiros pertencentes ao intervalo.';return E(q,`\\[I=${notation(x)}\\]`,box(String(value)),[S(`I\\cap\\mathbb Z=\\{${list.join(',')}\\}`),S(String(value))],`problema-radical-${kind}`);}
function inversePoint(level){const m=rand(-4,2),p=m+rand(2,5),end=p+rand(3,7),B=I(ep(m),ep(p),true,true),A=I(ep(p),ep(end),false,true),U=I(ep(m),ep(end),true,true);return E('Os conjuntos A e B são disjuntos e a sua reunião é o intervalo indicado. Determina A.',`\\[A\\cup B=${notation(U)}\\qquad B=${notation(B)}\\]`,box(`A=${notation(A)}`),[S(`A=${notation(U)}\\setminus${notation(B)}`),S(`A=${notation(A)}`)],'problema-inverso-extremo');}
function statementCheck(level){const m=rand(-5,1),A=I(ep(m),ep(m+4),true,false),B=I(ep(m+4),ep(m+8),true,true),U=union(A,B);return E('Analisa a afirmação: «Dois intervalos que têm apenas um extremo comum têm sempre interseção não vazia». Indica se é verdadeira ou falsa e justifica com os conjuntos apresentados.',eq(A,B),box(`A\\cap B=\\varnothing\\quad\\text{(falsa)}`),[S(`A\\cap B=\\varnothing`,'O extremo comum não pertence a A.'),S(`A\\cup B=${setTex(U)}`)],'analise-contraexemplo');}
function context(level){const theme=pick(['temperaturas','alturas','horarios','medidas']),m=rand(1,8),A=I(ep(m),ep(m+6),true,false),B=I(ep(m+3),ep(m+9),false,true),sim=rand(0,1)===1;const op=sim?'\\cap':'\\cup',r=sim?intersection(A,B):union(A,B);const wording=sim?'simultaneamente as duas condições':'pelo menos uma das condições';return E(`Num problema de ${theme}, os valores admissíveis são descritos pelos conjuntos A e B. Determina os valores que satisfazem ${wording}.`,eq(A,B),box(`A${op}B=${setTex(r)}`),[S(`A${op}B=${setTex(r)}`)],`problema-contexto-${theme}-${sim?'inter':'uniao'}`);}
const additions={
 represent:[intervalFromCondition,()=>a.generators.graphical(1),()=>a.generators.membership(1),()=>a.generators.integers(1)],
 operations:[graphicOperations,twoForms,compound,statementCheck],
 problems:[disjointInverse,integerParameter,squares,radicals,inversePoint,context]
};
const original={...a.generators};
// Cada grupo inclui as famílias originais e as novas; a escolha é controlada pelo escalonador.
const byGroup={represent:[...['convert','graphical','membership','integers'].map(k=>({id:`original-${k}`,fn:l=>original[k](l)})),{id:'equivalencia-mista',fn:intervalFromCondition}],operations:[...['operations','complement','selection'].map(k=>({id:`original-${k}`,fn:l=>original[k](l)})),{id:'operacao-grafica',fn:graphicOperations},{id:'operacao-formas',fn:twoForms},{id:'operacao-composta',fn:compound},{id:'analise',fn:statementCheck}],problems:[{id:'original-challenge',fn:l=>original.challenge(l)},{id:'inverso-disjuntos',fn:disjointInverse},{id:'inteiros-parametro',fn:integerParameter},{id:'quadrados',fn:squares},{id:'radicais',fn:radicals},{id:'inverso-extremo',fn:inversePoint},{id:'contexto',fn:context}]};
// Progressão: raciocínios avançados reservados a níveis adequados.
const allowed=(group,level)=>byGroup[group].filter(o=>!(level===1&&['operacao-composta','inverso-disjuntos','inverso-extremo','inteiros-parametro','quadrados','radicais'].includes(o.id))&&!(level===2&&['operacao-composta','inverso-extremo'].includes(o.id)));
const queues=new Map(),history=new Map();
function fingerprint(e){return [e.prompt,e.statement,e.answer].join('|').replace(/\s+/g,'').replace(/\\(?:left|right)/g,'');}
function choose(group,level){
 const key=group+'-'+level,options=allowed(group,level);
 let q=queues.get(key)||[];
 if(!q.length){q=options.map(x=>x.id);for(let i=q.length-1;i>0;i--){const j=rand(0,i);[q[i],q[j]]=[q[j],q[i]]}queues.set(key,q)}
 const id=q.shift(),seen=history.get(key)||new Set();
 // Tenta primeiro a família escalonada e depois outras famílias, sem repetir enunciados.
 const order=[options.find(x=>x.id===id),...options.filter(x=>x.id!==id)];
 for(const item of order){for(let n=0;n<55;n++){
  const e=item.fn(level);if(!e)continue;const sig=fingerprint(e);
  if(!seen.has(sig)){seen.add(sig);history.set(key,seen);return e}
 }}
 // Quando se esgotam as variantes, avisar em vez de repetir silenciosamente.
 throw Error('As variantes disponíveis nesta sessão foram esgotadas. Altera o conteúdo ou o nível para continuar com exercícios diferentes.');
}
// Os três geradores visíveis são adaptadores; os originais continuam preservados em byGroup.
a.generators.convert=l=>choose('represent',l);
a.generators.operations=l=>choose('operations',l);
a.generators.challenge=l=>choose('problems',l);
window.MathLabDiversidade={choose,allowed,history,reset:()=>{queues.clear();history.clear()}};
})();
