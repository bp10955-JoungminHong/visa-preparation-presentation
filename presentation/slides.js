(() => {
 'use strict';
 const slides=[...document.querySelectorAll('.slide')];
 const notes=[
  '이번 과제는 주재원 비자 준비 가이드입니다. 많은 단계와 서류를 처음 접하는 파견자도 지금 할 일과 담당 역할을 확인할 수 있게 정리하는 데 목적을 두었습니다.',
  '비자 준비는 한 번의 안내로 끝나기 어렵습니다. 단계가 많고, 서류를 누가 준비하는지 질문이 반복되며, 가족동반이나 개인 이력에 따라 추가로 확인할 내용도 달라집니다. 이런 공통 내용을 가이드로 정리하면 좋겠다는 생각에서 시작했습니다.',
  '해결 방향은 순서와 역할을 보이게 하는 것이었습니다. JD와 비자 유형 확인, 구비서류와 신청서, 인터뷰와 수령의 세 단계로 나눴습니다. 각 단계 안에서는 개인, 회사와 HR, 변호사, 동반가족의 준비 내용을 구분했습니다.',
  '안내 이메일과 비자 구비서류를 읽고 준비 항목을 정리했습니다. 처음에는 온보딩 전체를 다루려 했지만 우선 비자에 집중했습니다. Codex로 화면을 만들고 실제 피드백을 받아 불필요한 문구를 줄이고 담당자별 체크리스트를 추가했습니다. 원본과 데이터 파일은 공유 코드에서 제외했습니다.',
  '왼쪽은 실제 구현한 준비 순서 화면이고, 오른쪽은 담당자별 체크리스트 화면입니다. 순서를 확인하고, 본인과 회사가 준비할 자료를 나눠 체크할 수 있습니다. 현재 비자 준비 세 단계와 44개 체크 항목, 전체보기 문서 연결을 구현했습니다. 문의 감소나 시간 절감은 아직 측정하지 않았습니다.',
  '정보를 많이 넣는 것보다 사용자가 다음 행동을 이해하게 하는 것이 중요하다는 점을 배웠습니다. 다음에는 담당자와 내용을 검토하고 실제 파견자가 사용하며 막히는 부분을 확인하려고 합니다. 반복 질문, 준비 누락, 정보를 찾는 시간을 살펴보고 FAQ와 양식을 보완할 계획입니다.'
 ];
 const counter=document.getElementById('slideCounter');const prev=document.getElementById('prev');const next=document.getElementById('next');const dots=document.getElementById('slideDots');const notePanel=document.getElementById('speakerNotes');const dialog=document.getElementById('demoDialog');let index=0;
 slides.forEach((s,i)=>{const b=document.createElement('button');b.type='button';b.className='dot';b.setAttribute('aria-label',(i+1)+'장: '+s.dataset.title);b.addEventListener('click',()=>go(i));dots.append(b)});
 function scaleFrames(){document.querySelectorAll('.frame-shell').forEach(el=>{const f=el.querySelector('iframe');f.style.transform='scale('+(el.clientWidth/1140)+')'})}
 function render(){index=Math.max(0,Math.min(slides.length-1,(Number(location.hash.slice(1))||1)-1));slides.forEach((s,i)=>{s.classList.toggle('is-active',i===index);s.setAttribute('aria-hidden',String(i!==index));s.inert=i!==index});[...dots.children].forEach((b,i)=>b.setAttribute('aria-current',String(i===index)));counter.textContent=(index+1)+' / '+slides.length;prev.disabled=index===0;next.disabled=index===slides.length-1;document.getElementById('notesTitle').textContent=(index+1)+'장 · '+slides[index].dataset.title;document.getElementById('notesText').textContent=notes[index];document.title=(index+1)+' / 6 · '+slides[index].dataset.title+' | 주재원 비자 준비 가이드';scaleFrames();window.scrollTo({top:0,behavior:'instant'})}
 function go(i){i=Math.max(0,Math.min(slides.length-1,i));if(location.hash==='#'+(i+1))render();else location.hash=String(i+1)}
 function toggleNotes(force){const show=typeof force==='boolean'?force:notePanel.hidden;notePanel.hidden=!show;document.getElementById('notesButton').setAttribute('aria-expanded',String(show))}
 prev.addEventListener('click',()=>go(index-1));next.addEventListener('click',()=>go(index+1));document.getElementById('notesButton').addEventListener('click',()=>toggleNotes());document.getElementById('closeNotes').addEventListener('click',()=>toggleNotes(false));
 document.querySelectorAll('[data-demo]').forEach(b=>b.addEventListener('click',()=>{document.getElementById('demoFrame').src='examples/'+b.dataset.demo+'.html';document.getElementById('demoTitle').textContent=b.dataset.demo==='stage'?'준비 순서 · 구현 화면 발췌':'담당자별 체크리스트 · 구현 화면 발췌';dialog.showModal()}));document.getElementById('closeDemo').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
 document.addEventListener('keydown',e=>{if(dialog.open)return;if(e.target.closest('input,textarea,select'))return;if(e.key===' '&&e.target.closest('button,a'))return;const k=e.key;if(['ArrowRight','PageDown',' '].includes(k)){e.preventDefault();go(index+1)}else if(['ArrowLeft','PageUp'].includes(k)){e.preventDefault();go(index-1)}else if(k==='Home'){e.preventDefault();go(0)}else if(k==='End'){e.preventDefault();go(5)}else if(k.toLowerCase()==='s')toggleNotes();else if(k.toLowerCase()==='f'){if(document.fullscreenElement)document.exitFullscreen?.();else document.documentElement.requestFullscreen?.()}else if(k==='Escape')toggleNotes(false)});
 let startX=null;document.getElementById('deck').addEventListener('touchstart',e=>{startX=e.changedTouches[0].clientX},{passive:true});document.getElementById('deck').addEventListener('touchend',e=>{if(startX===null)return;const delta=e.changedTouches[0].clientX-startX;if(Math.abs(delta)>70)go(index+(delta<0?1:-1));startX=null},{passive:true});
 window.addEventListener('hashchange',render);window.addEventListener('resize',scaleFrames);document.documentElement.classList.add('js-deck');render();
})();
