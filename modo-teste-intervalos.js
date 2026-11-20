(()=>{'use strict';
const api=window.__intervals;if(!api)return;
const $=s=>document.querySelector(s),ri=(a,b)=>Math.floor(Math.random()*(b-a+1))+a,pick=a=>a[ri(0,a.length-1)],shuffle=a=>{const b=[...a];for(let i=b.length-1;i;i--){const j=ri(0,i);[b[i],b[j]]=[b[j],b[i]]}return b};
const {I,ep,NEG,POS,notation,condition,contains,intersection,union,setTex,integerList,graph}=api;
const levelName=['','Principiante','Intermédio','Especialista'],storeKey='mathlab-intervalos-teste-v1';let state=null;
const esc=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'),math=s=>esc(s),fmt=n=>String(n).replace('.',',');
function typeset(){if(window.MathJax?.typesetPromise)window.MathJax.typesetPromise()}
function right(text,visual=''){return{text,visual,correct:true,feedback:''}}
function wrong(text,feedback,visual=''){return{text,visual,feedback}}
function choice(prompt,statement,options,steps,topic,family,visual=''){
 const opts=shuffle(options);return{type:'choice',prompt,statement,options:opts,correct:opts.findIndex(o=>o.correct),answerTex:opts.find(o=>o.correct).text,steps,topic,family,visual};
}
function numeric(prompt,statement,expected,answerTex,steps,topic,family,visual=''){return{type:'numeric',prompt,statement,expected,answerTex,steps,topic,family,visual}}
function endpoints(level){
 if(level===1){const a=ri(-6,1),b=ri(a+2,8);return[ep(a),ep(b)]}
 if(level===2){const [a,b]=pick([[-3.5,-.5],[-2.5,1.5],[-1.5,2.5],[-.5,3.5],[-4.5,1.5],[.5,4.5]]);return[ep(a,fmt(a)),ep(b,fmt(b))]}
 const sets=[[ep(-Math.sqrt(5),'-\\sqrt5'),ep(Math.sqrt(3),'\\sqrt3')],[ep(-Math.PI,'-\\pi'),ep(Math.sqrt(5),'\\sqrt5')],[ep(-1.5,'-1,5'),ep(Math.PI,'\\pi')],[ep(-Math.sqrt(2),'-\\sqrt2'),ep(2.5,'\\frac52')]];return pick(sets)
}
function randomInterval(level,allowInf=true){let [l,r]=endpoints(level);if(allowInf&&Math.random()<.28){if(Math.random()<.5)l=NEG;else r=POS}return I(l,r,Math.random()<.5,Math.random()<.5)}
function toggleLeft(x){return I(x.l,x.r,Number.isFinite(x.l.v)?!x.lc:x.lc,x.rc)}
function toggleRight(x){return I(x.l,x.r,x.lc,Number.isFinite(x.r.v)?!x.rc:x.rc)}
function intervalToCondition(level){const x=randomInterval(level,false);return choice('Seleciona a condição que define o intervalo.',notation(x),[
 right(condition(x)),wrong(condition(toggleLeft(x)),'Alteraste incorretamente a pertença do extremo esquerdo.'),wrong(condition(toggleRight(x)),'Alteraste incorretamente a pertença do extremo direito.'),wrong(condition(toggleRight(toggleLeft(x))),'Alteraste a pertença dos dois extremos.')
],[`${notation(x)}\\Longleftrightarrow${condition(x)}`],'Representações equivalentes','intervalo-condição')}
function conditionToInterval(level){const x=randomInterval(level,false);return choice('Seleciona o intervalo correspondente à condição.',condition(x),[
 right(notation(x)),wrong(notation(toggleLeft(x)),'O colchete do extremo esquerdo não corresponde à desigualdade.'),wrong(notation(toggleRight(x)),'O colchete do extremo direito não corresponde à desigualdade.'),wrong(notation(toggleRight(toggleLeft(x))),'Os dois colchetes foram invertidos.')
],[`${condition(x)}\\Longleftrightarrow x\\in${notation(x)}`],'Representações equivalentes','condição-intervalo')}
function graphChoice(level){const x=randomInterval(level,false),variants=[x,toggleLeft(x),toggleRight(x),toggleRight(toggleLeft(x))];return choice('Escolhe a reta real que representa corretamente o intervalo.',notation(x),variants.map((v,i)=>i===0?right(notation(v),graph([v])):wrong(notation(v),'Observa se cada extremo está incluído ou excluído.',graph([v]))),[`${notation(x)}`,'Ponto cheio: extremo incluído. Ponto vazio: extremo excluído.'],'Representação gráfica','escolher-reta')}
function trueFalse(level){
 const bank1=[
  ['O número 3 pertence ao intervalo \\([3;7[\\).',true,'3\\in[3;7['],
  ['O número 5 pertence ao intervalo \\(]-2;5[\\).',false,'5\\notin]-2;5['],
  ['O símbolo \\(+\\infty\\) pode ser um extremo fechado.',false,'+\\infty\\notin\\mathbb R'],
  ['No intervalo \\([0;4]\\), os dois extremos pertencem ao conjunto.',true,'0\\in[0;4]\\quad\\text{e}\\quad4\\in[0;4]']
 ];
 const bank2=[
  ['A interseção de \\(]-2;3]\\) com \\([3;6[\\) é \\(\\{3\\}\\).',true,']-2;3]\\cap[3;6[=\\{3\\}'],
  ['A reunião de dois intervalos disjuntos é sempre um único intervalo.',false,'A\\cup B\\text{ pode exigir dois intervalos.}'],
  ['Se \\(B\\subset A\\), então \\(A\\cap B=B\\).',true,'B\\subset A\\Longrightarrow A\\cap B=B'],
  ['Se \\(A\\cap B=\\varnothing\\), então \\(A\\cup B=\\mathbb R\\).',false,'A\\cap B=\\varnothing\\not\\Longrightarrow A\\cup B=\\mathbb R']
 ];
 const bank3=[
  ['O complementar de \\([-2;5[\\) é \\(]-\\infty;-2[\\cup[5;+\\infty[\\).',true,'\\mathbb R\\setminus[-2;5[=]-\\infty;-2[\\cup[5;+\\infty['],
  ['Se \\(A\\subset B\\), então \\(A\\cup B=A\\).',false,'A\\subset B\\Longrightarrow A\\cup B=B'],
  ['A interseção de três intervalos pode ser um conjunto singular.',true,'A\\cap B\\cap C=\\{a\\}\\text{ é possível.}'],
  ['O intervalo \\(]-\\sqrt5;\\sqrt5[\\) contém exatamente cinco números inteiros.',true,'\\{-2,-1,0,1,2\\}']
 ];
 const [statement,truth,step]=pick(level===1?bank1:level===2?[...bank1,...bank2]:[...bank2,...bank3]);return choice('Indica se a afirmação é verdadeira ou falsa.','',[
  truth?right('\\text{Verdadeiro}'):wrong('\\text{Verdadeiro}','A afirmação não respeita a definição ou a operação indicada.'),truth?wrong('\\text{Falso}','A afirmação é válida.'):right('\\text{Falso}')
 ],[step], 'Compreensão e propriedades','verdadeiro-falso',`<p style="text-align:center;font-size:1.08rem">${statement}</p>`)
}
function endpointChoice(level){const x=randomInterval(level,false),left=Math.random()<.5,point=left?x.l:x.r,included=left?x.lc:x.rc;return choice('Escolhe a relação de pertença correta para o extremo indicado.',`A=${notation(x)}\\qquad x=${point.t}`,[included?right(`${point.t}\\in A`):wrong(`${point.t}\\in A`,'O colchete mostra que o extremo está excluído.'),included?wrong(`${point.t}\\notin A`,'O colchete mostra que o extremo está incluído.'):right(`${point.t}\\notin A`)],[`${point.t}${included?'\\in':'\\notin'}A`],'Pertença','pertença-extremo')}
function inclusionChoice(level){const a=ri(-6,-2),b=ri(3,8),A=I(ep(a),ep(b),true,true),B=I(ep(a+1),ep(b-1),false,level===3?false:true);return choice('Seleciona a afirmação verdadeira.',`A=${notation(A)}\\qquad B=${notation(B)}`,[right('B\\subset A'),wrong('A\\subset B','O intervalo A é mais amplo do que B.'),wrong('A\\cap B=A','A interseção conserva apenas o intervalo contido B.'),wrong('A\\cup B=B','A reunião conserva o intervalo mais amplo A.')],[`B\\subset A`,`A\\cap B=B\\quad\\text{e}\\quad A\\cup B=A`],'Inclusão','inclusão-intervalos',graph([A,B],['#e85a78','#2878d0'],['A','B']))}
function operationChoice(level){
 const op=pick(['intersection','union','both']);
 let A,B,C=null;
 const m=ri(-4,3);
 if(level===1){const v=ri(0,3);A=I(ep(m-4),ep(m+v+2),Math.random()<.5,Math.random()<.5);B=I(ep(m),ep(m+v+5),Math.random()<.5,Math.random()<.5)}
 else if(level===2){
  const scenario=ri(0,3);
  if(scenario===0){A=I(ep(m-5),ep(m),true,Math.random()<.5);B=I(ep(m),ep(m+5),Math.random()<.5,true)}
  else if(scenario===1){A=I(NEG,ep(m+3),false,Math.random()<.5);B=I(ep(m),ep(m+7),Math.random()<.5,false)}
  else if(scenario===2){A=I(ep(m-6),ep(m+7),true,true);B=I(ep(m-2),ep(m+3),false,true)}
  else{A=I(ep(m-6),ep(m-1),true,false);B=I(ep(m+1),ep(m+6),false,true)}
 }else{
  const radicals=[[ep(-Math.sqrt(5),'-\\sqrt5'),ep(Math.sqrt(3),'\\sqrt3')],[ep(-Math.sqrt(2),'-\\sqrt2'),ep(Math.PI,'\\pi')]];
  const [l,r]=pick(radicals);A=I(l,ep(4),true,Math.random()<.5);B=I(ep(-1),r,false,true);
  if(Math.random()<.5){A=I(NEG,r,false,true);B=I(ep(-1),POS,false,false);C=I(ep(0),ep(5),true,false)}
 }
 const r=intersection(A,B),u=union(A,B),label=op==='intersection'?'Determina a interseção dos conjuntos.':op==='union'?'Determina a reunião dos conjuntos.':'Determina a reunião e a interseção dos conjuntos.';
 const result=op==='intersection'?setTex(r):op==='union'?setTex(u):`\\begin{aligned}A\\cap B&=${setTex(r)}\\\\A\\cup B&=${setTex(u)}\\end{aligned}`;
 const answer=op==='intersection'?`A\\cap B=${setTex(r)}`:op==='union'?`A\\cup B=${setTex(u)}`:`A\\cap B=${setTex(r)}\\quad\\text{e}\\quad A\\cup B=${setTex(u)}`;
 const distractors=[notation(A),notation(B),'\\varnothing',`[${m-6};${m+7}]`,setTex(op==='intersection'?u:r)].filter((x,i,arr)=>x!==result&&arr.indexOf(x)===i);
 const options=[right(result),...distractors.slice(0,3).map(x=>wrong(x,'Confirma a inclusão dos extremos e a região comum aos conjuntos.'))];
 return choice(label,`A=${notation(A)}\\qquad B=${notation(B)}`,options,[answer], 'Reunião e interseção',`operacoes-${level}-${op}-${C?'tres':'dois'}`,graph([A,B],['#e85a78','#2878d0'],['A','B']));
}
function complementChoice(level){let A;if(level===1)A=I(ep(-2),ep(5),true,false);else if(level===2)A=Math.random()<.5?I(NEG,ep(3),false,true):I(ep(-1.5,'-1,5'),ep(4),false,true);else A=I(ep(-Math.sqrt(5),'-\\sqrt5'),ep(Math.PI,'\\pi'),true,false);const L=Number.isFinite(A.l.v)?I(NEG,A.l,false,!A.lc):null,R=Number.isFinite(A.r.v)?I(A.r,POS,!A.rc,false):null,parts=[L,R].filter(Boolean),ans=parts.length===1?notation(parts[0]):setTex(parts);return choice('Seleciona o complementar de A em \\(\\mathbb R\\).',`A=${notation(A)}`,[right(ans),wrong(notation(A),'Apresentaste o próprio intervalo, não o complementar.'),wrong(parts.length===2?`${notation(I(NEG,A.l,false,A.lc))}\\cup${notation(I(A.r,POS,A.rc,false))}`:condition(A),'A pertença dos extremos deve ser invertida.'),wrong('\\varnothing','Existem números reais fora de A.')],[`\\mathbb R\\setminus A=${ans}`],'Complementar','complementar',graph([A]))}
function integerQuestion(level){
 if(level<3){const x=level===1?I(ep(-2),ep(5),false,true):I(ep(-Math.sqrt(5),'-\\sqrt5'),ep(Math.sqrt(10),'\\sqrt{10}'),true,false),list=integerList(x);return numeric('Quantos números inteiros pertencem ao intervalo?',notation(x),list.length,String(list.length),[`I\\cap\\mathbb Z=\\{${list.join(',')}\\}`,`\\#(I\\cap\\mathbb Z)=${list.length}`],'Números inteiros','inteiros-contagem',graph([x]))}
 const n=pick([5,8,10,13]),x=I(ep(-Math.sqrt(n),`-\\sqrt{${n}}`),ep(Math.sqrt(2*n),`\\sqrt{${2*n}}`),false,true),list=integerList(x),sum=list.reduce((a,b)=>a+b,0);return numeric('Calcula a soma dos números inteiros pertencentes ao intervalo.',notation(x),sum,String(sum),[`I\\cap\\mathbb Z=\\{${list.join(',')}\\}`,`${list.join('+').replace(/\\+\\-/g,'-')}=${sum}`],'Números inteiros','inteiros-soma',graph([x]))
}
function problemQuestion(level){
 const variant=ri(0,5);
 if(level===1){
  const contexts=[['estufa','temperatura','T','^\\circ\\mathrm C'],['piscina','profundidade','h','\\mathrm m'],['percurso','distância','d','\\mathrm{km}'],['torneio','idade','i','\\text{ anos}'],['laboratório','massa','m','\\mathrm g'],['veículo','velocidade','v','\\mathrm{km/h}']];
  const [place,quantity,symbol,unit]=contexts[variant];const lo=ri(4,16),hi=lo+ri(6,14),left=Math.random()<.5,rightOpen=Math.random()<.5;
  const x=I(ep(lo),ep(hi),left,!rightOpen);
  const leftText=left?'incluindo o limite inferior':'sem incluir o limite inferior';const rightText=rightOpen?'sem atingir o limite superior':'incluindo o limite superior';
  const opts=[right(notation(x)),wrong(notation(toggleLeft(x)),'Verifica a inclusão do limite inferior.'),wrong(notation(toggleRight(x)),'Verifica a inclusão do limite superior.'),wrong(notation(toggleRight(toggleLeft(x))),'Os dois limites foram interpretados incorretamente.')];
  return choice(`Numa situação relacionada com ${place}, a ${quantity} deve estar entre ${lo} e ${hi} ${unit}, ${leftText} e ${rightText}. Qual é o intervalo correto?`,'',opts,[`I=${notation(x)}`],'Problemas',`problema-modelação-${variant}`);
 }
 if(level===2){
  const contexts=[['uma máquina','funcionamento','refrigeração'],['uma biblioteca','horário de abertura','período de atendimento'],['uma atividade','intervalo de idades','requisito adicional'],['uma prova','pontuação admissível','pontuação de qualificação'],['um armazém','temperatura permitida','limite de segurança'],['um laboratório','valores medidos','limite de calibração']];
  const [subject,first,second]=contexts[variant];const lo=ri(6,15),mid=lo+ri(3,6),hi=mid+ri(3,8),A=I(ep(lo),ep(hi),true,false),B=I(ep(mid),POS,false,false),r=intersection(A,B);
  return choice(`Em ${subject}, o ${first} admite valores de ${lo} (inclusive) até ${hi} (exclusive). O ${second} exige valores superiores a ${mid}. Que intervalo satisfaz simultaneamente as duas condições?`,'',[right(notation(r)),wrong(notation(I(ep(mid),ep(hi),true,false)),'O limite adicional é estrito.'),wrong(notation(I(ep(lo),ep(mid),true,true)),'Não satisfaz a condição adicional.'),wrong(notation(B),'É preciso respeitar também o limite superior.')],[`A=${notation(A)}`,`B=${notation(B)}`,`A\\cap B=${notation(r)}`],'Problemas',`problema-interseção-${variant}`,graph([A,B],['#e85a78','#2878d0'],['A','B']));
 }
 const contexts=['temperaturas proibidas','valores de segurança excluídos','velocidades não permitidas','medidas rejeitadas','níveis de ruído proibidos','valores fora das especificações'];
 const a=ri(-8,-2),b=ri(2,8),A=I(ep(a),ep(b),true,true),L=I(NEG,ep(a),false,false),R=I(ep(b),POS,false,false),ans=setTex([L,R]);
 return choice(`Num estudo, o intervalo [${a};${b}] representa ${contexts[variant]}, incluindo os dois limites. Qual é o conjunto dos valores permitidos?`,'',[right(ans),wrong(`]-\\infty;${a}]\\cup[${b};+\\infty[`,'Os próprios limites são proibidos.'),wrong(notation(A),'Este é o conjunto proibido.'),wrong(`]${a};${b}[`,'Este conjunto está dentro da zona proibida.')],[`P=\\mathbb R\\setminus${notation(A)}`,`P=${ans}`],'Problemas',`problema-complementar-${variant}`);
}
const registry={intervalToCondition,conditionToInterval,graphChoice,trueFalse,endpointChoice,inclusionChoice,operationChoice,complementChoice,integerQuestion,problemQuestion},keys=Object.keys(registry);
function generated(key,level,i=0){return{...registry[key](level),generator:key,id:`INT-${level}-${Date.now().toString(36)}-${key}-${i}-${Math.random().toString(36).slice(2,7)}`}}
function testSignature(q){return [q.prompt,q.statement,q.answerTex,q.options?.map(x=>x.text).sort().join('|')].join('|').replace(/\s+/g,'')}
function diverseTest(keys,level,count){
 const seen=new Set(),out=[],last=[];
 for(let i=0;i<count;i++){
  const preferred=keys.filter(k=>!last.includes(k));
  const pool=preferred.length?preferred:keys;
  let found=null;
  for(let t=0;t<80;t++){
   const k=pool[(i+t)%pool.length],q=generated(k,level,i),sig=testSignature(q);
   if(!seen.has(sig)){seen.add(sig);found=q;last.push(k);if(last.length>Math.min(3,keys.length-1))last.shift();break}
  }
  if(!found)throw Error('Não existem mais questões distintas para esta seleção. Escolhe mais conteúdos ou reduz o número de questões.');
  out.push(found);
 }
 return out;
}
function buildTest(level){const chosen=[...document.querySelectorAll('#testTopicFilters input:checked')].map(x=>x.value);const groupMap={represent:['intervalToCondition','conditionToInterval','graphChoice','trueFalse','endpointChoice','inclusionChoice','integerQuestion'],operations:['operationChoice','complementChoice','trueFalse'],problems:['problemQuestion']};const selected=[...new Set(chosen.flatMap(k=>groupMap[k]||[]))].filter(k=>registry[k]);const formats=[...document.querySelectorAll('#testFormatFilters input:checked')].map(x=>x.value);const count=Number($('#testCount')?.value)||10;if(!selected.length||!formats.length)throw Error('Seleciona pelo menos um conteúdo e um formato.');const allowed=selected.filter(k=>formats.includes(k==='trueFalse'?'tf':registry[k](level).type));if(!allowed.length)throw Error('Os formatos escolhidos não são compatíveis com os conteúdos selecionados.');return diverseTest(allowed,level,count)}
function buildErrorTraining(level,failedKeys){const valid=failedKeys.filter(k=>registry[k]);if(!valid.length)return[];return diverseTest(valid,level,10)}
function showMode(mode){window.MathLabIntervalsUI?.setMode(mode);if(mode==='test')refreshResume()}
function save(){try{localStorage.setItem(storeKey,JSON.stringify(state))}catch{}}
function load(){try{return JSON.parse(localStorage.getItem(storeKey)||'null')}catch{return null}}
function clearSaved(){try{localStorage.removeItem(storeKey)}catch{}}
function refreshResume(){const saved=load();$('#resumeTest').classList.toggle('hidden-mode',!(saved&&saved.active&&!saved.finished))}
function resetViews(){['#testRunner','#testResult','#testReview'].forEach(id=>$(id).classList.add('hidden-mode'));$('#testSetup').classList.remove('hidden-mode')}
function openQuestions(questions,level,mode='test'){state={active:true,finished:false,level,mode,index:0,questions,answers:Array(questions.length).fill(null),score:null};save();$('#testSetup').classList.add('hidden-mode');$('#testResult').classList.add('hidden-mode');$('#testReview').classList.add('hidden-mode');$('#testRunner').classList.remove('hidden-mode');renderQuestion()}
function startTest(level=+$('#testLevel').value){try{openQuestions(buildTest(level),level,'test')}catch(e){alert(e.message)}}
function resumeTest(){state=load();if(!state?.active)return;$('#testSetup').classList.add('hidden-mode');$('#testRunner').classList.remove('hidden-mode');renderQuestion()}
function optionContent(o){return o.visual?`<span class="graph-option">${o.visual}</span>`:`<span>\\(${math(o.text)}\\)</span>`}
function renderQuestion(){const q=state.questions[state.index],answer=state.answers[state.index],total=state.questions.length;$('#testTags').textContent=`9.º ano · ${levelName[state.level]}${state.mode==='errors'?' · Treino dos erros':''}`;$('#testProgress').textContent=`Questão ${state.index+1} de ${total}`;$('#progressFill').style.width=`${(state.index+1)*100/total}%`;$('#testPrompt').textContent=q.prompt;$('#testStatement').innerHTML=q.statement?`\\[${math(q.statement)}\\]`:'';$('#testVisual').innerHTML=q.visual||'';const box=$('#testResponse');if(q.type==='choice'){const short=q.options.length===2&&!q.options.some(o=>o.visual);box.innerHTML=`<div class="${short?'short-options':'answer-options'}">${q.options.map((o,i)=>`<button class="option-btn ${answer===i?'selected':''}" data-option="${i}"><span class="option-key">${String.fromCharCode(65+i)}</span>${optionContent(o)}</button>`).join('')}</div>`;box.querySelectorAll('[data-option]').forEach(b=>b.onclick=()=>{state.answers[state.index]=+b.dataset.option;save();renderQuestion()})}else{box.innerHTML=`<div class="test-input-wrap"><input id="testInput" class="test-input" inputmode="numeric" autocomplete="off" placeholder="Escreve a resposta" value="${esc(answer??'')}"></div>`;const input=$('#testInput');input.oninput=()=>{state.answers[state.index]=input.value;save();renderDots()};setTimeout(()=>input.focus(),0)}renderDots();$('#previousQuestion').disabled=state.index===0;$('#nextQuestion').disabled=state.index===total-1;typeset()}
function answered(i){const a=state.answers[i];return a!==null&&String(a).trim()!==''}
function renderDots(){$('#questionDots').innerHTML=state.questions.map((q,i)=>`<button class="question-dot ${i===state.index?'current':''} ${answered(i)?'answered':''}" data-question="${i}" aria-label="Questão ${i+1}">${i+1}</button>`).join('');$('#questionDots').querySelectorAll('[data-question]').forEach(b=>b.onclick=()=>{state.index=+b.dataset.question;save();renderQuestion()})}
function isCorrect(q,a){if(q.type==='choice')return a===q.correct;if(q.type==='numeric')return a!==null&&String(a).trim()!==''&&Number(String(a).trim().replace(',','.'))===q.expected;return false}
function finish(){const missing=state.questions.map((q,i)=>answered(i)?null:i+1).filter(Boolean);if(missing.length&&!confirm(`Ainda tens ${missing.length} ${missing.length===1?'questão por responder':'questões por responder'}. Queres terminar mesmo assim?`))return;state.score=state.questions.reduce((n,q,i)=>n+(isCorrect(q,state.answers[i])?1:0),0);state.finished=true;save();showResult()}
function resultText(score){return score<=4?'Ainda precisas de rever este conteúdo. A revisão mostra-te onde melhorar.':score<=6?'Estás a progredir. Revê os erros e tenta novamente.':score<=8?'Bom domínio dos intervalos. Revê as questões em que tiveste dificuldade.':'Excelente domínio dos intervalos de números reais!'}
function showResult(){const total=state.questions.length,hasErrors=state.score<total;$('#testRunner').classList.add('hidden-mode');$('#testReview').classList.add('hidden-mode');$('#testResult').classList.remove('hidden-mode');$('#resultTitle').textContent=state.mode==='errors'?'Resultado do treino dos erros':'Resultado do teste';$('#resultScore').textContent=`${state.score}/${total}`;$('#resultMessage').textContent=!hasErrors&&state.mode==='errors'?'Muito bem! Corrigiste todas as dificuldades neste treino.':resultText(state.score);$('#trainErrors').classList.toggle('hidden-mode',!hasErrors)}
function displayAnswer(q,a){if(a===null||a==='')return'Sem resposta';if(q.type==='choice'){const o=q.options[a];return o?.visual?o.visual:`\\(${math(o?.text??'—')}\\)`}return esc(a)}
function correctDisplay(q){if(q.type==='choice'){const o=q.options[q.correct];return o.visual?o.visual:`\\(${math(q.answerTex)}\\)`}return`\\(${math(q.answerTex)}\\)`}
function feedbackFor(q,a){if(q.type==='choice'&&Number.isInteger(a))return q.options[a]?.feedback||'Revê a definição e observa cuidadosamente os extremos.';return'O valor indicado não corresponde ao conjunto pedido.'}
function review(){const list=$('#reviewList');list.innerHTML=state.questions.map((q,i)=>{const ok=isCorrect(q,state.answers[i]);return`<article class="review-card ${ok?'correct':'wrong'}"><div class="review-title"><span>Questão ${i+1} · ${esc(q.topic)}</span><span>${ok?'✓ Correta':'✗ A rever'}</span></div><div class="test-question">${esc(q.prompt)}</div>${q.statement?`<div class="test-statement">\\[${math(q.statement)}\\]</div>`:''}${q.visual||''}<div class="review-answer user"><strong>A tua resposta:</strong> ${displayAnswer(q,state.answers[i])}</div>${ok?'':`<div class="feedback">${esc(feedbackFor(q,state.answers[i]))}</div>`}<div class="review-answer correct-answer"><strong>Resposta correta:</strong> ${correctDisplay(q)}</div>${q.steps.map(s=>`<div class="step"><div class="math">\\[${math(s)}\\]</div></div>`).join('')}</article>`}).join('');$('#testResult').classList.add('hidden-mode');$('#testReview').classList.remove('hidden-mode');typeset()}
function trainErrors(){const failed=[...new Set(state.questions.filter((q,i)=>!isCorrect(q,state.answers[i])).map(q=>q.generator))];const questions=buildErrorTraining(state.level,failed);if(questions.length)openQuestions(questions,state.level,'errors')}
$('#freeModeBtn').onclick=()=>showMode('free');$('#testModeBtn').onclick=()=>showMode('test');$('#startTest').onclick=()=>startTest();$('#resumeTest').onclick=resumeTest;$('#previousQuestion').onclick=()=>{if(state.index>0){state.index--;save();renderQuestion()}};$('#nextQuestion').onclick=()=>{if(state.index<state.questions.length-1){state.index++;save();renderQuestion()}};$('#finishTest').onclick=finish;$('#reviewTest').onclick=review;$('#trainErrors').onclick=trainErrors;$('#closeReview').onclick=showResult;$('#newTest').onclick=()=>{clearSaved();state=null;resetViews();refreshResume()};
window.__intervalsTest={buildTest,buildErrorTraining,isCorrect,startTest};const topicBox=$('#testTopicFilters');topicBox.innerHTML=[['represent','Representação e interpretação de intervalos'],['operations','Operações com conjuntos'],['problems','Problemas e aplicações']].map(([k,n])=>`<label><input type="checkbox" value="${k}" checked> ${n}</label>`).join('');refreshResume();
})();
