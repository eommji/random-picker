/*
  [동명이인일 경우 고려해야 함] 아니? 이렇게까지 하진 말자 ㅎ
  - 각 사람마다 고유한 ID(사번??)
  - input 대신 직원 명단이 있고 선택 시 자동 입력되게??

  [당첨 우선순위]
  1. 당첨 횟수 적은 사람
  3. 당첨된 지 오래된 사람

  1. 추첨 버튼 누르고 input에 입력하고 엔터 치면, 목록 리셋
  2. 추첨 버튼 누르면, input disabled 상태로 바뀜

  [퇴사자 삭제]

  처음 submit 할 때 이름, 날짜 데이터 쌓기

  ************************************************
  1. 목록에 있는 사람들의 데이터를 가져온다.
  [
    {
      name, count, recentDate
    }...
  ]
  2. count 오름차순 + recentDate 오름차순 정렬(sort 함수 사용)
  3. 3명 뽑는다.(가중치가 같을 수 있으나 안 뽑힌 사람은 다음에 뽑힐 것이기 때문에 무시)
  4. 뽑힌 사람은 DB에 넣는다.
*/

const form = document.querySelector('.form');
const inputName = form.querySelector('.input-name');
const list = document.querySelector('.list');
const btnRandom = document.querySelector('.btn-random');
const btnSave = document.querySelector('.btn-save');
const year = document.querySelector('.select-year');
const month = document.querySelector('.select-month');

let listArr = [];
let winnerArr = [];
let count = 1;

const saveList = () => localStorage.setItem('list', JSON.stringify(listArr));
const saveWinner = () => localStorage.setItem('winner', JSON.stringify(winnerArr));

const handleWinner = id => {
  const winner = list.querySelector(`li[data-id="${id}"]`);
  winner.classList.add('winner');
}

const handleRandom = () => {
  const max = listArr.length;
  const numRandom = Math.trunc(Math.random() * max);
  const winner = listArr[numRandom];

  if (max === 0) return;
  handleWinner(winner.id);
  const { id, ...rest } = winner;
  winnerArr.push(rest);
  listArr.splice(numRandom, 1);
  saveList();
  saveWinner();
}

const deleteName = event => {
  const targetLi = event.target.parentNode;

  targetLi.classList.add('hide');
  setTimeout(() => targetLi.remove(), 300);
  const new_listArr = listArr.filter(e => e.id !== parseInt(targetLi.dataset.id));
  listArr = new_listArr;
  saveList();
}

const paintName = name => {
  const li = document.createElement('li');
  const btnDel = document.createElement('button');
  const listId = listArr.length + 1;

  li.dataset.id = listId;
  li.append(name);
  btnDel.append('X');
  btnDel.addEventListener('click', deleteName);
  li.append(btnDel);
  list.append(li);

  const listObj = {
    id: listId,
    date: `${year.value}-${month.value}`,
    name
  };

  listArr.push(listObj);
  saveList();
}

const handleSubmit = event => {
  event.preventDefault();
  const name = inputName.value;
  if (name === '') return;
  inputName.value = '';
  paintName(name);
}

if (localStorage.getItem('winner')) {
  winnerArr.push(...JSON.parse(localStorage.getItem('winner')));
}

form.addEventListener('submit', handleSubmit);
btnRandom.addEventListener('click', handleRandom);
btnSave.addEventListener('click', handleSave);