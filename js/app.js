const $=s=>document.querySelector(s),ORDER=[4,5,6,7,8,9,10,11,12,1,2,3];
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const nl=s=>esc(s).replace(/\n/g,'<br>');
const now=new Date(),FY=now.getMonth()+1>=4?now.getFullYear():now.getFullYear()-1;
const U=k=>'https://docs.google.com/'+(k[0]=='s'?'spreadsheets':'document')+'/d/'+k.slice(1)+'/edit';
const L={att:'s1coeU3UCaEPLb0k_0bHZIFzzz92B-26jThI2VIURSftA',yo:'d1nTvqPpJnBGcaREvU8Hw5vh0gi6FHmshaCaP0wv9og9Q',sei:'s1KQE9tKWQsx0PwGnRogI59oAvlAlRAJSJuo8wQh0GIF8',sin:'d1vWaba5FgTkuGDipEFjhQsgW7g947dzzsMJMNqu-am1Q',san:'s1Z85uVnzohQjYUHYhj1_84ia8kIeV5xb0zcrI7k2x4i8',pro:'d1WnaKwGZBtXo6bmo58zCQCe4MSZpWb49b1PLKnDJBVGg',dat:'s1nunck2Sur7n2negbkOGUqZXK9B2xQYhLNumqkaakokU',cls:'s1LlrvW2Q69NHbk2mr7MJWbL-try9C9gAuyY9_VXKFDBA',tai:'s19nJUdkpWGQsLZuVlrYDP-6d0ddm6RNIkD0MusiWkjog',sui:'d1Yz4mAAgKGstWST1GV1BIgFJjfnSqv63Ql5QLCN0genE'};
const PV=['備考欄の「出停」「忌引」の数字が表と一致','成績に抜けがない','委員・係・検定の入力','欠課時数の合算(遅刻3回=欠課1)'];
const imgs=d=>(d.img||[]).map(k=>`<img class=im src="${IMG[k]||''}">`).join('');
const idx=m=>ORDER.indexOf(m);
let S,tab='home',st='この端末のみ保存',tm,sha=null;
const mkT=(a,i)=>({id:'t'+i,m:a[0],r:a[1],tg:a[2],t:a[3],n:a[4]||'',u:a[5]?U(L[a[5]]):'',p:a[6]||'',c:a[7]=='__PV'?PV.slice():[],rep:!!a[8],k:'',dd:0});
const DAYS={'前年度の出金伝票':11,'中間試験問題作成':28,'面談調査用紙':20,'スポーツ安全保険':31};
const PAT={'懇談会(S1)':'d11','懇談会(S3)':'d12','夏期面談の実施':'d13','通知表プレビュー':'d7','指導要録ほぼ完成':'d8','指導要録の最終確認':'d8'};
const EM='\nClaudeアカウント: hayato.kimura.1@gmail.com';
function mig(s){if((s.v||0)<2){DOCS.forEach(d=>{if(!s.docs.find(x=>x.id==d.id))s.docs.push(JSON.parse(JSON.stringify(d)))});
SEED.forEach((a,i)=>{if(i>=OLDN&&!s.tasks.find(t=>t.id=='t'+i))s.tasks.push(mkT(a,i))});
['d2','d6'].forEach(id=>{const d=s.docs.find(x=>x.id==id);if(d&&!d.b.includes('hayato'))d.b+=EM});s.v=2}
if(s.v<3){DOCS.forEach(d=>{if(!s.docs.find(x=>x.id==d.id))s.docs.push(JSON.parse(JSON.stringify(d)))});const d3=s.docs.find(x=>x.id=='d3');if(d3)d3.b=d3.b.split('\n').filter(l=>!l.startsWith('マイコプラズマ')).join('\n');
s.docs.forEach(d=>{if(['d3','d4','d5','d15','d16','d17'].includes(d.id))d.tip=true});s.v=3}
s.docs.forEach(d=>{d.img=(DOCS.find(x=>x.id==d.id)||{}).img||d.img||[]});
s.tasks.forEach(t=>{if(t.dd==null)t.dd=0;for(const k in DAYS)if(!t.dd&&t.t.startsWith(k))t.dd=DAYS[k];for(const k in PAT)if(!t.p&&t.t.startsWith(k))t.p=PAT[k];
if(t.t.startsWith('11月個人面談 予定表')&&!t.n.includes('hayato'))t.n+=(t.n?'\n':'')+'Claudeで作成(hayato.kimura.1@gmail.com のアカウント)'});return s}
function fresh(){return{v:3,y:FY,g:'3',roles:['担','教','部'],docs:JSON.parse(JSON.stringify(DOCS)),d:{},cd:{},tasks:SEED.map(mkT)}}
const vis=t=>S.roles.includes(t.r)&&(!t.tg||t.tg.includes(S.g));
const key=(t,m)=>S.y+':'+t.id+(t.rep?':'+m:'');const ck=(t,i)=>S.y+':'+t.id+':c'+i;
const isD=(t,m)=>!!S.d[key(t,m)];
const inM=m=>S.tasks.filter(t=>vis(t)&&(t.rep||t.m==m));
function item(t,m,tag){const dn=isD(t,m);return`<div class="it${dn?' dn':''}"><input type=checkbox ${dn?'checked':''} onchange="tg('${t.id}',${m})"><div onclick="op('${t.id}',${m})"><b>${esc(t.t)}</b> <span class=c>${RL[t.r]}${t.tg?' '+tgl(t.tg):''}</span>${tag||''}${t.n?`<div class=w>⚠ ${esc(t.n.split('\n')[0])}</div>`:''}${t.k?`<div class=k>📝 ${esc(t.k.split('\n')[0])}</div>`:''}</div></div>`}
function tg(id,m){const t=S.tasks.find(x=>x.id==id),k=key(t,m);if(!S.d[k]&&t.c.length&&!t.c.every((_,i)=>S.cd[ck(t,i)])){alert('完了前チェックがまだ終わっていません。詳細を開いて確認してください。');R();return}
S.d[k]=!S.d[k];if(!S.d[k])delete S.d[k];save();R()}
function cc(id,i){const t=S.tasks.find(x=>x.id==id),k=ck(t,i);S.cd[k]=!S.cd[k];save()}
function fyIdx(){return S.y==FY?idx(now.getMonth()+1):S.y>FY?0:11}
const TO=['d5','d3','d15','d4','d16','d17'];
function tipsH(){const f=x=>{const i=TO.indexOf(x.id);return i<0?99:i},l=S.docs.filter(d=>d.tip).sort((a,b)=>f(a)-f(b));
return`<div class=tips><b>重要Tips</b> <span class=mu>押すとすぐ説明が開きます</span><div>${l.map(d=>`<button class=tp onclick="tip('${d.id}')">${esc(d.t)}</button>`).join('')}<button class="tp add" onclick="S.docs.push({id:'d'+Date.now(),t:'新しいTips',b:'',tip:true,img:[],u:''});save();T('docs');scrollTo(0,document.body.scrollHeight)">＋ 追加</button></div></div>`}
function tip(id){const d=S.docs.find(x=>x.id==id);modal(`<h3 style="margin:0">${esc(d.t)}</h3><div style="margin-top:8px">${nl(d.b)}</div>${d.u?`<p><a href="${esc(d.u)}" target=_blank rel=noopener>資料を開く ↗</a></p>`:''}${imgs(d)}<button class="b g" onclick="cl()">閉じる</button>`)}
function H(){const cur=fyIdx(),all=S.tasks.filter(t=>vis(t)&&!t.rep),dn=all.filter(t=>isD(t,t.m)).length;
let late='';for(let i=0;i<cur;i++){const m=ORDER[i];inM(m).filter(t=>!isD(t,m)).forEach(t=>late+=item(t,m,`<span class=late>${m}月</span>`))}
const m=ORDER[cur],nx=cur<11?ORDER[cur+1]:null;
return tipsH()+`<h2>${S.y}年度のようす</h2><div class=card><div class=mu>${S.y}年度 / ${S.g=='J'?'中学':'高'+S.g}担当 ・ <span id=stx>${esc(st)}</span></div>${conflict?'<div class=w2>別の端末で先に更新されています。<button class=b onclick="reloadRemote()">最新を読み込み直す</button></div>':''}<div class=bar><i style="width:${all.length?dn/all.length*100:0}%"></i></div><div class=mu>年間の進み: ${dn} / ${all.length}</div></div>
${late?`<h2>⚠ 繰越・期限切れ</h2>${late}`:''}<h2>今月(${m}月)</h2>${inM(m).map(t=>item(t,m)).join('')||'なし'}
${nx?`<h2>来月(${nx}月)の準備 ― 前倒しOK</h2>${inM(nx).filter(t=>!t.rep&&!isD(t,nx)).map(t=>item(t,nx)).join('')||'なし'}`:''}`}
function Y(){const cur=fyIdx();return`<button class=b onclick="eo()">＋ タスク追加</button>`+ORDER.map((m,i)=>{const l=inM(m),d=l.filter(t=>isD(t,m)).length;return`<details ${i==cur?'open':''}><summary><b>${m}月</b> <span class=mu>${d}/${l.length}</span></summary>${l.map(t=>item(t,m)).join('')||'<div class=mu>なし</div>'}</details>`}).join('')}
function D_(){return`<p class=mu>タスクの「手順」として紐づけられる共通メモです。1か所直せば全部に反映されます。</p>`+S.docs.map((d,i)=>`<div class=card><input type=text value="${esc(d.t)}" oninput="S.docs[${i}].t=this.value;save()"><label><input type=checkbox ${d.tip?'checked':''} onchange="S.docs[${i}].tip=this.checked;save()"> ホームの「重要Tips」に表示</label><input type=text placeholder="資料URL(任意)" value="${esc(d.u||'')}" oninput="S.docs[${i}].u=this.value;save()"><textarea style="min-height:110px" oninput="S.docs[${i}].b=this.value;save()">${esc(d.b)}</textarea>${imgs(d)}<button class="b g" onclick="if(confirm('削除しますか?')){S.docs.splice(${i},1);save();R()}">削除</button></div>`).join('')+`<button class=b onclick="S.docs.push({id:'d'+Date.now(),t:'新しいメモ',b:''});save();R()">＋ 追加</button>`}
function ghCard(){const s=GHStore.getSettings(),f=(id,l,v,t)=>`<label>${l}</label><input type=${t||'text'} id=${id} value="${esc(v)}" autocomplete=off autocapitalize=off>`;
return`<div class=card><b>GitHubに保存(PC・スマホ・どのアカウントでも共通)</b><p class=mu>入れなくても、この端末の中だけで使えます。入れると、直すたびにリポジトリの data.json に保存されます。</p>${f('g1','GitHubのユーザー名',s.owner)}${f('g2','リポジトリ名',s.repo)}${f('g3','ブランチ',s.branch)}${f('g4','アクセストークン(このリポジトリだけに Contents の読み書きを許可したもの)',s.token,'password')}<p><a href="https://github.com/settings/personal-access-tokens/new" target=_blank rel=noopener>トークンを作るページを開く(GitHub)</a></p><div id=gm class=mu></div><button class=b onclick="ghSave()">保存して反映</button><button class="b g" onclick="ghTest()">接続を確かめる</button><button class="b g" onclick="ghForget()">この端末の設定を消す</button></div>`}
function ghSave(){const g=i=>$('#'+i).value.trim();GHStore.saveSettings({owner:g('g1'),repo:g('g2'),branch:g('g3')||'main',token:g('g4')});location.reload()}
async function ghTest(){const g=i=>$('#'+i).value.trim(),s={owner:g('g1'),repo:g('g2'),branch:g('g3')||'main',token:g('g4')},m=$('#gm');m.textContent='確認中…';
try{await GHStore.remoteGet(s,'data.json');m.textContent='✓ 接続できました(data.json を読めました)'}catch(e){m.textContent=e.status==404?'リポジトリが見つからないか、data.json がまだありません(初回は後者で正常です。保存すると作られます)。':GHStore.explain(e)}}
function ghForget(){if(confirm('この端末のGitHub設定と、この端末に残したデータを消します。(GitHub上のデータは消えません)')){GHStore.LS.del('tk.settings');GHStore.LS.del('tk');location.reload()}}
function ST(){return ghCard()+`<div class=card><b>担当</b><br>${[['J','中学'],['1','高1'],['2','高2'],['3','高3']].map(([v,l])=>`<label><input type=radio name=g ${S.g==v?'checked':''} onchange="S.g='${v}';save()"> ${l}</label> `).join('')}<br><b>表示する仕事</b><br>${Object.entries(RL).map(([v,l])=>`<label><input type=checkbox ${S.roles.includes(v)?'checked':''} onchange="rl('${v}')"> ${l}</label> `).join('')}</div>
<div class=card><b>年度: ${S.y}年度</b><br><span class=mu>新年度を始めると進捗だけ空になり、タスクと「来年へのメモ」は残ります。</span><br><button class=b onclick="if(confirm('${S.y+1}年度を始めますか?')){S.y++;save();T('home')}">新年度を始める</button></div>
<div class=card><b>バックアップ</b><br><button class=b onclick="$('#ex').value=JSON.stringify(S);$('#ex').select()">書き出し</button><button class="b g" onclick="im()">読み込み</button><textarea id=ex placeholder="書き出し → コピーして保管/読み込み → ここに貼って押す"></textarea></div>
<button class="b g" onclick="if(confirm('初期データに戻します。編集内容は消えます。')){S=fresh();save();T('home')}">初期データに戻す</button>`}
function rl(v){S.roles=S.roles.includes(v)?S.roles.filter(x=>x!=v):[...S.roles,v];save()}
function im(){try{const o=JSON.parse($('#ex').value);if(!o.tasks)throw 0;S=o;save();T('home')}catch(e){alert('読み込めませんでした')}}
function modal(h){cl();const o=document.createElement('div');o.className='ov';o.id='ov';o.innerHTML=`<div class=md>${h}</div>`;o.onclick=e=>{if(e.target==o)cl()};document.body.appendChild(o)}
function cl(){const o=$('#ov');if(o)o.remove()}
function op(id,m){const t=S.tasks.find(x=>x.id==id),p=S.docs.find(d=>d.id==t.p),dn=isD(t,m);
modal(`<h3 style="margin:0">${esc(t.t)}</h3><div class=mu>${t.rep?'毎月':t.m+'月'} ・ ${RL[t.r]} ・ ${t.tg?tgl(t.tg):'全学年'}</div>${t.n?`<div class=w2>⚠ ${nl(t.n)}</div>`:''}
${p?`<details open><summary>${esc(p.t)}</summary><div>${nl(p.b)}</div>${p.u?`<p><a href="${esc(p.u)}" target=_blank rel=noopener>資料を開く ↗</a></p>`:''}${imgs(p)}</details>`:''}${t.c.length?'<b>完了前チェック</b>':''}${t.c.map((c,i)=>`<label class=ck><input type=checkbox ${S.cd[ck(t,i)]?'checked':''} onchange="cc('${t.id}',${i})"> ${esc(c)}</label>`).join('')}
${t.u?`<p><a href="${esc(t.u)}" target=_blank rel=noopener>資料を開く ↗</a></p>`:''}<div class=mu>📝 来年へのメモ(次の年度の注意として残ります)</div><textarea onchange="mk('${t.id}',this.value)">${esc(t.k)}</textarea>
<button class=b onclick="tg('${t.id}',${m});cl()">${dn?'未完了に戻す':'完了にする'}</button><button class="b g" onclick="eo('${t.id}')">編集</button><button class="b g" onclick="cl()">閉じる</button>`)}
function mk(id,v){S.tasks.find(x=>x.id==id).k=v;save();R()}
function eo(id){const t=id?S.tasks.find(x=>x.id==id):{m:fyIdx()>=0?ORDER[fyIdx()]:4,r:'担',tg:'',t:'',n:'',u:'',p:'',c:[],rep:false,k:''};
modal(`<h3 style="margin:0">${id?'編集':'タスク追加'}</h3>タイトル<input type=text id=e1 value="${esc(t.t)}">月 <select id=e2>${ORDER.map(m=>`<option ${m==t.m?'selected':''}>${m}</option>`).join('')}</select>
役割 <select id=e3>${['担','教','部'].map(r=>`<option value=${r} ${r==t.r?'selected':''}>${RL[r]}</option>`).join('')}</select>
<div>対象(未選択=全学年): ${['J','1','2','3'].map(g=>`<label><input type=checkbox class=e4 value=${g} ${t.tg.includes(g)?'checked':''}> ${g=='J'?'中学':'高'+g}</label>`).join(' ')} <label><input type=checkbox id=e8 ${t.rep?'checked':''}> 毎月繰り返す</label></div>
<br>日(任意・カレンダー用) <input type=number id=e10 min=0 max=31 value="${t.dd||''}" style="width:80px"><br>注意事項(見落とし防止)<textarea id=e5>${esc(t.n)}</textarea>資料URL<input type=text id=e6 value="${esc(t.u)}">手順メモ <select id=e7><option value="">なし</option>${S.docs.map(d=>`<option value="${d.id}" ${d.id==t.p?'selected':''}>${esc(d.t)}</option>`).join('')}</select>
完了前チェック(1行1項目)<textarea id=e9>${esc(t.c.join('\n'))}</textarea>
<button class=b onclick="es('${id||''}')">保存</button>${id?`<button class="b g" onclick="if(confirm('削除しますか?')){S.tasks=S.tasks.filter(x=>x.id!='${id}');save();cl();R()}">削除</button>`:''}<button class="b g" onclick="cl()">キャンセル</button>`)}
function es(id){let t=S.tasks.find(x=>x.id==id);if(!t){t={id:'n'+Date.now(),k:''};S.tasks.push(t)}
Object.assign(t,{t:$('#e1').value||'(無題)',m:+$('#e2').value,r:$('#e3').value,tg:[...document.querySelectorAll('.e4:checked')].map(x=>x.value).join(''),n:$('#e5').value,u:$('#e6').value,p:$('#e7').value,c:$('#e9').value.split('\n').filter(x=>x.trim()),rep:$('#e8').checked,dd:+$('#e10').value||0});save();cl();R()}
function icsText(o){const p=n=>String(n).padStart(2,'0'),yr=m=>m>=4?S.y:S.y+1,e=s=>String(s).replace(/\\/g,'\\\\').replace(/[,;]/g,'\\$&').replace(/\n/g,'\\n');
const ev=[];let n=0;const add=(ds,sum,desc,rr)=>ev.push(['BEGIN:VEVENT','UID:tk'+(n++)+'-'+S.y+'@tannin','DTSTAMP:20260101T000000Z','DTSTART;VALUE=DATE:'+ds,'SUMMARY:'+e(sum),'DESCRIPTION:'+e(desc),rr||'','BEGIN:VALARM','ACTION:DISPLAY','DESCRIPTION:'+e(sum),'TRIGGER:PT9H','END:VALARM','END:VEVENT'].filter(Boolean).join('\r\n'));
ORDER.forEach(m=>{const l=S.tasks.filter(t=>vis(t)&&!t.rep&&t.m==m);if(!l.length)return;const tx=l.map(t=>'・'+t.t+(t.n?'\n   ⚠ '+t.n.split('\n')[0]:'')).join('\n');
if(o.a)add(yr(m)+p(m)+'01','【今月】'+m+'月のタスク('+l.length+'件)',tx);
if(o.b){const pm=m==1?12:m-1;add((m==4?S.y:yr(pm))+p(pm)+'25','【来月の準備】'+m+'月のタスク',tx)}
if(o.c)l.filter(t=>t.dd).forEach(t=>add(yr(m)+p(m)+p(t.dd),t.t,t.n||''))});
if(o.d)S.tasks.filter(t=>vis(t)&&t.rep).forEach(t=>add(S.y+'0430',t.t,t.n||'','RRULE:FREQ=MONTHLY;BYMONTHDAY=-1;COUNT=12'));
return'BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//tannin-todo//JA\r\nCALSCALE:GREGORIAN\r\n'+ev.join('\r\n')+'\r\nEND:VCALENDAR'}
function CAL(){const o=(k,l)=>`<label class=ck><input type=checkbox id=${k} checked> ${l}</label>`;
return`<div class=card><b>Googleカレンダーなどに取り込む(.icsファイル)</b><p class=mu>${S.y}年度・今の担当設定で表示されるタスクが対象です。日付は各タスクの編集画面の「日」で設定できます(未設定はまとめ予定になります)。</p>${o('c1','毎月1日に「今月のタスク一覧」')}${o('c2','前月25日に「来月の準備」(前倒し用)')}${o('c3','日付を設定したタスクを個別の予定に')}${o('c4','毎月末の繰り返しタスク(出欠確認など)')}<button class=b onclick="exCal()">.icsを書き出す</button><textarea id=icsx style="display:none"></textarea></div>
<div class=card><b>取り込み方</b><p>Googleカレンダー(PC) → 右上の歯車 → 設定 → 「インポート/エクスポート」 → ファイルを選んで取り込み。予定の通知はカレンダー側で届きます。</p><p class=mu>一度取り込んだ予定は自動では更新されません。タスクを変更したら、古い予定を消して取り込み直してください。</p></div>`}
async function exCal(){const t=icsText({a:$('#c1').checked,b:$('#c2').checked,c:$('#c3').checked,d:$('#c4').checked});
try{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([t],{type:'text/calendar'}));a.download='tannin-todo-'+S.y+'.ics';a.click()}catch(e){const x=$('#icsx');x.style.display='block';x.value=t;x.select();alert('自動保存できなかったので、下の欄に出しました。コピーして .ics として保存してください。')}}
function R(){$('#app').innerHTML={home:H,year:Y,docs:D_,cal:CAL,set:ST}[tab]();document.querySelectorAll('nav button').forEach(b=>b.classList.toggle('on',b.dataset.t==tab))}
function T(t){tab=t;cl();R();scrollTo(0,0)}
/* ---- 保存・同期(GitHubのContents API。方式は授業ダイアリーと同じ) ---- */
let canSave=true,dirty=false,conflict=false,busy=false,again=false;
const ghOn=()=>{const s=GHStore.getSettings();return !!(s.token&&s.owner&&s.repo)};
const setSt=m=>{st=m;const e=$('#stx');if(e)e.textContent=m};
const keep=j=>{try{localStorage.setItem('tk',j)}catch(e){}};
async function load(){let lo=null;try{lo=JSON.parse(localStorage.getItem('tk'))}catch(e){}
if(!ghOn()){setSt('この端末のみ保存');return lo}
try{const r=await GHStore.remoteGet(GHStore.getSettings(),'data.json');sha=r.sha;setSt('GitHubと同期中');return JSON.parse(r.text)}
catch(e){if(e.status==404){sha=null;setSt('GitHubに新規作成します');return lo}canSave=false;setSt('⚠ '+GHStore.explain(e)+'(この端末のデータを表示中・GitHubへの保存は止めています)');return lo}}
function save(){dirty=true;clearTimeout(tm);tm=setTimeout(flush,700)}
async function flush(){dirty=false;const j=JSON.stringify(S,null,1);keep(j);
if(!ghOn()||!canSave||conflict)return;if(busy){again=true;return}busy=true;setSt('GitHubに保存中…');
try{const r=await GHStore.remotePut(GHStore.getSettings(),'data.json',j,sha,'更新 '+new Date().toLocaleString('ja-JP'));sha=r.sha;setSt('GitHubに保存済み')}
catch(e){if(e.status==409||e.status==422){conflict=true;R()}setSt('⚠ '+GHStore.explain(e))}
busy=false;if(again){again=false;flush()}}
async function reloadRemote(){try{const r=await GHStore.remoteGet(GHStore.getSettings(),'data.json');sha=r.sha;S=mig(JSON.parse(r.text));conflict=false;canSave=true;keep(JSON.stringify(S,null,1));setSt('GitHubと同期中');R()}catch(e){alert(GHStore.explain(e))}}
load().then(o=>{const raw=o&&o.tasks?JSON.stringify(o,null,1):'';S=mig(o&&o.tasks?o:fresh());if(!S.roles)S.roles=['担','教','部'];R();if(canSave&&JSON.stringify(S,null,1)!==raw)save()});
document.addEventListener('visibilitychange',async()=>{if(document.hidden||!ghOn()||busy||dirty||conflict||!canSave||$('#ov'))return;
try{const r=await GHStore.remoteGet(GHStore.getSettings(),'data.json');if(r.sha!==sha){sha=r.sha;S=mig(JSON.parse(r.text));keep(JSON.stringify(S,null,1));R()}}catch(e){}});
