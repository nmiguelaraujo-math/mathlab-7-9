/* Ampliação pedagógica: acrescenta variantes sem remover os geradores originais. */
(()=>{'use strict';const a=window.__intervals;if(!a)return;
const {I,ep,NEG,POS,notation,intersection,union,setTex,graph}=a;
const rnd=(x,y)=>Math.floor(Math.random()*(y-x+1))+x,pick=x=>x[rnd(0,x.length-1)];
const S=(math,reason='')=>({math,reason}),E=(prompt,statement,answer,steps,extra={})=>({prompt,statement,answer,steps,visual:extra.visual||'',answerVisual:extra.answerVisual||'',choices:null,family:extra.family||''});
const originalOp=a.generators.operations,originalProblem=a.generators.challenge;
function operation(level){
 const kind=pick(['union','intersection','both']),m=rnd(-4,3),style=rnd(0,4);let A,B;
 if(level===1){if(style===0){A=I(ep(m-5),ep(m),true,true);B=I(ep(m),ep(m+5),true,false)}else if(style===1){A=I(ep(m-5),ep(m+2),true,false);B=I(ep(m),ep(m+5),false,true)}else if(style===2){A=I(ep(m-6),ep(m-1),true,false);B=I(ep(m+1),ep(m+6),true,true)}else{A=I(ep(m-6),ep(m+6),true,true);B=I(ep(m-2),ep(m+2),false,false)}}
 else if(level===2){if(style===0){A=I(NEG,ep(m+3),false,true);B=I(ep(m),ep(m+7),false,false)}else if(style===1){A=I(ep(m-5),ep(m),true,false);B=I(ep(m),POS,true,false)}else if(style===2){A=I(ep(m-6),ep(m+2),true,false);B=I(ep(m+2),ep(m+7),false,true)}else{A=I(ep(m-5),ep(m+6),false,true);B=I(ep(m-1),ep(m+3),true,false)}}
 else{const rad=pick([[ep(-Math.sqrt(5),'-\\sqrt5'),ep(Math.sqrt(3),'\\sqrt3')],[ep(-Math.sqrt(2),'-\\sqrt2'),ep(Math.PI,'\\pi')]]);A=style===0?I(NEG,rad[1],false,true):I(rad[0],ep(5),true,false);B=style===1?I(ep(-1),POS,false,false):I(ep(0),rad[1],true,style%2===0)}
 const u=union(A,B),n=intersection(A,B),uTex=setTex(u),nTex=setTex(n);
 const prompt=kind==='union'?'Determina a reunião dos conjuntos.':kind==='intersection'?'Determina a interseção dos conjuntos.':'Determina a reunião e a interseção dos conjuntos.';
 const steps=[];if(kind!=='intersection')steps.push(S(`A\\cup B=${uTex}`,'A reunião inclui os elementos de pelo menos um conjunto.'));if(kind!=='union')steps.push(S(`A\\cap B=${nTex}`,'A interseção inclui apenas os elementos comuns.'));
 const ans=kind==='union'?`A\\cup B=${uTex}`:kind==='intersection'?`A\\cap B=${nTex}`:`\\begin{aligned}A\\cup B&=${uTex}\\\\A\\cap B&=${nTex}\\end{aligned}`;
 return E(prompt,`\\[A=${notation(A)}\\qquad B=${notation(B)}\\]`,`\\boxed{${ans}}`,steps,{visual:graph([A,B],['#e85a78','#2878d0'],['A','B']),family:`operacoes-ampliadas-${level}-${style}-${kind}`});
}
a.generators.operations=level=>Math.random()<.55?operation(level):originalOp(level);
function problem(level){const theme=pick(['temperatura','altura','tempo','velocidade','medida']);const m=rnd(3,10),a1=m-3,b1=m+4,a2=m+1,b2=m+8;
 const A=I(ep(a1),ep(b1),true,level===1),B=I(ep(a2),ep(b2),level!==3,false),r=intersection(A,B),u=union(A,B);
 const contexts={temperatura:['temperaturas aceitáveis em dois equipamentos','°C'],altura:['alturas permitidas em duas atividades','cm'],tempo:['períodos de funcionamento de dois serviços','h'],velocidade:['velocidades admissíveis em dois percursos','km/h'],medida:['medidas aceites por dois controlos de qualidade','cm']};const [desc,unit]=contexts[theme];
 const both=level>=2&&Math.random()<.5;const op=level===3&&Math.random()<.5?'union':'intersection';const answer=both?`A\\cap B=${setTex(r)}\\quad\\text{e}\\quad A\\cup B=${setTex(u)}`:op==='union'?`A\\cup B=${setTex(u)}`:`A\\cap B=${setTex(r)}`;
 const ask=both?'Determina os valores que cumprem simultaneamente as duas condições e os que cumprem pelo menos uma.':op==='union'?'Determina os valores que cumprem pelo menos uma das condições.':'Determina os valores que cumprem simultaneamente as duas condições.';
 return E(`Numa situação de ${desc}, os valores são expressos em ${unit}. ${ask}`,`\\[A=${notation(A)}\\qquad B=${notation(B)}\\]`,`\\boxed{${answer}}`,[S(answer,'Simultaneamente corresponde à interseção; pelo menos uma corresponde à reunião.')],{visual:graph([A,B],['#e85a78','#2878d0'],['A','B']),family:`problema-aplicacao-${theme}-${level}-${op}`});
}
a.generators.challenge=level=>Math.random()<.45?problem(level):originalProblem(level);
})();
