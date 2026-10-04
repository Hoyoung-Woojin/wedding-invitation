// 계좌번호는 아래 데이터만 수정하세요. 빈 bank/number는 준비 중으로 표시됩니다.
const WEDDING_ACCOUNTS = [
 {side:'신랑측',people:[
  {role:'신랑',name:'유호영',bank:'',number:''},
  {role:'아버지',name:'유구현',bank:'',number:''},
  {role:'어머니',name:'정진춘',bank:'',number:''}
 ]},
 {side:'신부측',people:[
  {role:'신부',name:'차우진',bank:'신한',number:'110-207-680429'},
  {role:'아버지',name:'차도현',bank:'',number:''},
  {role:'어머니',name:'강순천',bank:'',number:''}
 ]}
];
const accountGroups=document.querySelector('#account-groups'),accountStatus=document.querySelector('#account-status'),accountManual=document.querySelector('#account-manual'),accountText=document.querySelector('#account-copy-text');
async function copyAccount(person,button){
 const text=`${person.bank} ${person.number}`;accountManual.hidden=true;button.disabled=true;
 try{if(!navigator.clipboard?.writeText)throw Error();await navigator.clipboard.writeText(text);accountStatus.textContent=`${person.name}님의 계좌번호를 복사했습니다.`}
 catch{accountText.value=text;accountManual.hidden=false;accountText.focus();accountText.select();accountStatus.textContent='자동 복사가 되지 않았습니다. 아래 계좌번호를 직접 복사해 주세요.'}
 finally{button.disabled=false}
}
WEDDING_ACCOUNTS.forEach(group=>{
 const details=document.createElement('details');details.className='account-group';const summary=document.createElement('summary');summary.textContent=`${group.side} 계좌번호`;details.append(summary);const list=document.createElement('div');list.className='account-list';
 group.people.forEach(person=>{const row=document.createElement('div');row.className='account-row';const info=document.createElement('div'),name=document.createElement('span');name.className='account-person';name.textContent=`${person.role} ${person.name}`;info.append(name);const number=document.createElement('span');number.className=person.bank&&person.number?'account-number':'account-pending';number.textContent=person.bank&&person.number?`${person.bank} ${person.number}`:'계좌정보 준비 중';info.append(number);row.append(info);if(person.bank&&person.number){const button=document.createElement('button');button.type='button';button.className='account-copy';button.textContent='복사';button.setAttribute('aria-label',`${person.name}님의 계좌번호 복사`);button.onclick=()=>copyAccount(person,button);row.append(button)}list.append(row)});
 details.append(list);accountGroups.append(details);
});
