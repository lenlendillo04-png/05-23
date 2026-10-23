(function(){
'use strict';
var LETTER=[
 [ "sauna pa lng, crush na kaayo tikaw bong. ganahan kaykos mindset nimo, kana jud akon na inlaban nimo bong.",
   "dako akon kalipay nameet nakon imo pamilya, dako kaymog natabang sakon, grabe akon pasalamat kay papa God naabot mo. thankful kaayo ko nnyo bong. salamat kaayo sa tanan tanan.",
   "inig buwag nato, wako kabaw unsaon nakog sulti saimo pamilya ug ila mama na wana kita. samot ng taas kay silag tanaw nato duha. wako kabaw unsaon, ni hasta amo gani di kadawat.",
   "salamat sa 3 years bong, salamat kaayo. nalipay kong nakaabot ta ana. damo kaytag memories duha ug mga picture, naibanan lng kay ng delete ka, sayang noh haha. okay da, sala nako to tanan.",
   "ikaw ang gift nga pinaka giganahan ko nga gikan sa ginoo, IKAW. pasalamat kaayo ko niya kay gihatag ka niya nako, sad lng kay karon buwagon nata niya haha." ],
 [ "dko ganahan nga ingon ani aton sitwasyon bong, kasakit. pero mag tanaw ko nimo? wakoy mafeel nimo nga masakitan ka, ni wakay duha2 ug sultig bati nako, diko katoo hahahaha. saon taman na, sala na nako tanan.",
   "kabaw kos worth nako bong, sakto na gurong nag beg ko nimo para dita mag buwag,  kay karon ako na mismo mo palayo nimo. sobra kayta ka immature, kabudlay haha kasakit.",
   "taga hunahunaan ko nimog bati, sobra kasakit tanan, dugmok na kaayo ko bong, wanako kasabot sakon gibati. feel nakon higko na kaykos tanan haha. akon dignidad wala na, wanasd koy respeto sako kaugalingon.",
   "sguro tanan nahitabo ron sala nakon, sukad2 ako man gud guro may problema.<br>pasensya kaayo ha, pasensya. mo nalng ning telegram nga may contact ta, pero karon iblock nasd ko ni para maka focus naka diha, aykog hunahuna dre, maok rako.",
   "makita man gako nimo nga lingaw, sagdi lng na sya, may raman nas atubangan pero nig talikod? grabe na ka weak, inagahay nag hilak haha, malipay na lng na sya basta naay mangagda kay dra sag kadali malingaw sya, kay kung naa rana pirmis balay, wa, tiway jud guro kinabuhi sina." ],
 [ "bong unta, unta sa kaning moundang ko makahunahuna kas tanan, sag gamay lng nga panahon unta makarealize kas tanan,  pero kbaw mnkong dili hahaha taas abi kaayo ka haha. sge lng.",
   "kung nano man gani imo mahunahunaan nga bati nako, padayuna lng, mao na ng way para makalimtan ko nimo. ihate kog pagmaayo bong, tigo manka ana kabaw ko. ako diri? sagdi rako, maokay rako puhon2 bahalag dugay.",
   "and sakon mga sala nimo? aware ko ana tanan, bugo kayko ana kay nagpadya kos ka akig nako, sa kainit sako ulo. kbaw Kong kabaw ka nga diko ganahan idown kas lain nga taw, kabaw kang diko ganahan itake advantage imo kaboutan. pero ako mismo mag una2 ana, bugo nako dba hahaha. sorry kaayo, AYG TOOHI TANAN MGA GPANULTI NAKOG SAKIT, NADYA RAKOS KA AKIG SINA. sorry kaayo po sorry.",
   "Im very sorry if na failed ko as a girlfriend nimo, sorry kaayo. sguro, tanan nakita nako sako feature nga kaupod ka, kutob rato imagine tanan. sakit hahahaha.",
   "so this is the goodbye na jud, Iloveyouuuu pirmi, iloveyouuuu always, iloveyouuuu so muchhhh. mahal na mahal kita bong, lab kaayo taka. psensya if ako nay mogive up." ],
 [ "AMPING PIRMI! ampingi imo kaugalingon kay mosakay pakag barko, ako pinaka number 1 fan nimo. kabaw ka ana. kita kaayo nakon nga ma successfull ka puhon. bright kayo ka, business minded. may tiwala ko nimo bong. congrats daan po, proud kayo ko nimo.",
   "ako? wako kabaw asa ko padulong hahaha, sge na lng, laban. time na guro para mabuhi nga way gisaligan, engot raba kaayo ko hahaha.",
   "usa lng akon giampo, unta maokay na imo pamilya. If god will keep on bringing us together, then maybe the two of us are destined. And maybe, destiny will decide to ours, kung kita jud, kita jud.",
   "Iloveyou forever, if you need help, naa rako. always put that on your mind. I'm always here, and I'm always be proud of you.",
   "thankyou sa 3 years kapin. e treasure nako tanan memories nato. iloveyou and amping, my greatest love" ]
];
var PHOTO_META=[
 {eyebrow:'chapter one', title:'', sub:''},
 {eyebrow:'chapter two', title:'', sub:''},
 {eyebrow:'chapter three', title:'', sub:''},
 {eyebrow:'chapter four', title:'', sub:''}
];
var LETTER_META=['Sulat · I','Sulat · II','Sulat · III','Sulat · IV'];
var LETTER_TITLE=['','','',''];

var stage=document.getElementById('stage');
var steps=[];           // {el,onEnter,onLeave}
var cur=-1, busy=false;

function el(tag,cls,html){var e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e;}
function addStep(node,hooks){stage.appendChild(node);steps.push(Object.assign({el:node},hooks||{}));}

/* ---------- cover ---------- */
var cover=el('section','step cover');
cover.innerHTML='<div class="heart">🤍</div><p class="eyebrow">for you</p><h1>Please tanawa tanan<br><em></em></h1><p>A little something I put together, just for you.</p><button class="btn" id="open">Open &nbsp;♥</button><div class="hint">🎧 ifull volume ang sound</div>';
addStep(cover);

/* ---------- photo + letter steps ---------- */
var allPhotos=[]; // flat list for lightbox per chapter
function photoStep(ci){
  var meta=PHOTO_META[ci], list=window.PHOTOS[ci];
  var s=el('section','step');
  var head=el('div','head','<div class="eyebrow">'+meta.eyebrow+'</div><h2>'+meta.title+'</h2><div class="sub">'+meta.sub+'</div>');
  var m=el('div','masonry');
  list.forEach(function(p,i){
    var f=el('figure','ph');
    f.innerHTML='<img loading="lazy" decoding="async" width="'+p.w+'" height="'+p.h+'" src="'+p.src+'" alt="Our photo '+(i+1)+'">';
    f.addEventListener('click',function(){openLB(list,i);});
    m.appendChild(f);
  });
  var nx=el('div','nextwrap','<button class="btn" data-next>Continue &nbsp;→</button>');
  s.appendChild(head);s.appendChild(m);s.appendChild(nx);
  addStep(s,{onEnter:function(){
    var items=s.querySelectorAll('.ph');
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){setTimeout(function(){e.target.classList.add('show');},(e.target._d||0));io.unobserve(e.target);}});},{threshold:.08});
    items.forEach(function(it,i){it.classList.remove('show');it._d=(i%4)*110;io.observe(it);});
  }});
}
function letterStep(li){
  var v=window.VIDEOS[li], land=v.w>v.h;
  var s=el('section','step letterstep');
  var wrap=el('div','lwrap'+(li%2?' flip':''));
  var vid=el('div','vid'+(land?' land':''));
  vid.style.setProperty('--r',(li%2?2:-2)+'deg');
  vid.innerHTML='<div class="frame"><span class="tape"></span><video muted loop playsinline webkit-playsinline preload="metadata" poster="'+v.poster+'" src="'+v.src+'"></video><div class="tapbadge">▶</div></div><span class="deco a">🌸</span><span class="deco b">🤍</span>';
  var video=vid.querySelector('video');
  vid.addEventListener('click',function(){ if(video.paused){video.play().catch(function(){});}else{video.pause();} });
  video.addEventListener('play',function(){vid.classList.add('playing');});
  video.addEventListener('pause',function(){vid.classList.remove('playing');});
  var paper=el('article','paper');
  paper.innerHTML='<div class="tag">'+LETTER_META[li]+'</div><h2>'+LETTER_TITLE[li]+'</h2>'+LETTER[li].map(function(t,i){return '<p style="--i:'+i+'">'+t+'</p>';}).join('');
  wrap.appendChild(vid);wrap.appendChild(paper);
  var nx=el('div','nextwrap','<button class="btn" data-next>'+(li<3?'Continue &nbsp;→':'One last thing &nbsp;→')+'</button>');
  s.appendChild(wrap);s.appendChild(nx);
  addStep(s,{onEnter:function(){video.currentTime=0;var p=video.play();if(p&&p.catch)p.catch(function(){});},onLeave:function(){video.pause();}});
}
for(var i=0;i<4;i++){photoStep(i);letterStep(i);}

/* ---------- finale ---------- */
var fin=el('section','step finale');
fin.innerHTML='<div class="eyebrow">one last thing</div>'+
 '<div class="quote"><span class="mark">“</span>'+
 '<p class="q" style="--i:0">Not everyone we love can stay.</p>'+
 '<p class="q" style="--i:1">But real love is never wasted.</p>'+
 '<p class="q" style="--i:2">It stays in our memories, in our thank-yous, and in our wish that you are always okay.</p>'+
 '<p class="q own" style="--i:3">Kung kita jud, kita jud</p></div>'+
 '<div class="sig">Take care always, Bong. ILY🤍</div>'+
 '<div class="nextwrap"><button class="btn ghost" id="replay">↺ &nbsp;Start over</button></div>';
addStep(fin);

/* ---------- navigation ---------- */
var back=document.getElementById('back'), mute=document.getElementById('mute'), prog=document.getElementById('progress');
function render(idx,dir){
  var old=steps[cur], nw=steps[idx];
  function show(){
    if(old){old.el.classList.remove('active','out','in','back-dir');}
    nw.el.classList.add('active');
    nw.el.classList.remove('in','back-dir');void nw.el.offsetWidth;
    nw.el.classList.add('in'); if(dir<0)nw.el.classList.add('back-dir');
    window.scrollTo(0,0);
    cur=idx;busy=false;
    back.hidden=(idx===0);
    prog.hidden=(idx===0);
    prog.firstElementChild.style.width=(idx/(steps.length-1)*100)+'%';
    if(nw.onEnter)nw.onEnter();
  }
  if(old){
    busy=true; if(old.onLeave)old.onLeave();
    old.el.classList.add('out');
    setTimeout(show,300);
  }else show();
}
function go(idx,push){
  if(busy||idx<0||idx>=steps.length||idx===cur)return;
  var dir=idx>cur?1:-1;
  if(push!==false)history.pushState({s:idx},'','#'+idx);
  render(idx,dir);
}
window.addEventListener('popstate',function(e){
  var s=(e.state&&typeof e.state.s==='number')?e.state.s:0;
  if(lb && !lb.hidden){closeLB(true);}
  if(s!==cur){ if(busy){setTimeout(function(){render(s,s>cur?1:-1);},320);} else render(s,s>cur?1:-1); }
});
document.addEventListener('click',function(e){
  var n=e.target.closest('[data-next]'); if(n){go(cur+1);}
});
back.addEventListener('click',function(){ if(busy||cur<=0)return; if(history.state&&history.state.s>0){history.back();}else{render(cur-1,-1);} });
document.getElementById('replay').addEventListener('click',function(){go(0);});

/* ---------- music ---------- */
var music=document.getElementById('music'), userMuted=false;
var icOn=document.getElementById('icOn'), icOff=document.getElementById('icOff');
function setIcon(){icOn.style.display=userMuted||music.paused?'none':'';icOff.style.display=userMuted||music.paused?'':'none';}
music.volume=.85;
document.getElementById('open').addEventListener('click',function(){
  mute.hidden=false;
  var p=music.play(); if(p&&p.catch)p.catch(function(){}); setIcon();
  go(1);
});
mute.addEventListener('click',function(){
  if(music.paused){userMuted=false;music.play().catch(function(){});}else{userMuted=true;music.pause();}
  setIcon();
});
music.addEventListener('play',setIcon);music.addEventListener('pause',setIcon);
document.addEventListener('visibilitychange',function(){ if(document.hidden){music.pause();}else if(!userMuted && cur>0){music.play().catch(function(){});} });

/* ---------- lightbox ---------- */
var lb=document.getElementById('lightbox'), lbImg=lb.querySelector('img'), lbCap=lb.querySelector('figcaption'), lbList=[], lbI=0;
function showLB(){var p=lbList[lbI];lbImg.style.animation='none';void lbImg.offsetWidth;lbImg.style.animation='';lbImg.src=p.src;lbCap.textContent='';}
function openLB(list,i){lbList=list;lbI=i;showLB();lb.hidden=false;document.body.style.overflow='hidden';}
function closeLB(){lb.hidden=true;document.body.style.overflow='';}
lb.querySelector('.lb-x').addEventListener('click',function(){closeLB();});
lb.querySelector('.prev').addEventListener('click',function(e){e.stopPropagation();lbI=(lbI-1+lbList.length)%lbList.length;showLB();});
lb.querySelector('.next').addEventListener('click',function(e){e.stopPropagation();lbI=(lbI+1)%lbList.length;showLB();});
lb.addEventListener('click',function(e){if(e.target===lb)closeLB();});
document.addEventListener('keydown',function(e){
  if(!lb.hidden){ if(e.key==='Escape')closeLB(); if(e.key==='ArrowRight')lb.querySelector('.next').click(); if(e.key==='ArrowLeft')lb.querySelector('.prev').click(); return;}
  if(e.key==='ArrowRight'&&cur>0&&cur<steps.length-1)go(cur+1);
  if(e.key==='ArrowLeft'&&cur>0)back.click();
});
var tx=null;
lb.addEventListener('touchstart',function(e){tx=e.touches[0].clientX;},{passive:true});
lb.addEventListener('touchend',function(e){ if(tx==null)return; var dx=e.changedTouches[0].clientX-tx; tx=null; if(Math.abs(dx)>50){lb.querySelector(dx<0?'.next':'.prev').click();} });

/* ---------- petals ---------- */
(function(){
  var box=document.getElementById('petals'), sym=['🌸','🤍','✿','♡'], n=window.innerWidth<600?10:16;
  for(var i=0;i<n;i++){
    var p=el('span','petal',sym[i%sym.length]);
    p.style.left=(Math.random()*100)+'%';
    p.style.setProperty('--s',(12+Math.random()*16)+'px');
    p.style.setProperty('--d',(12+Math.random()*10)+'s');
    p.style.setProperty('--dl',(-Math.random()*20)+'s');
    p.style.setProperty('--x',((Math.random()-.5)*160)+'px');
    box.appendChild(p);
  }
})();

/* ---------- start ---------- */
history.replaceState({s:0},'',location.pathname);
render(0,1);
})();
