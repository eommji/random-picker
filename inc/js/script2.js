const nameForm = document.querySelector('.name-form');
const nameInput = nameForm.querySelector('.name-input');
const nameList = document.querySelector('.name-list');
const randomBtn = document.querySelector('.random-button');
const saveBtn = document.querySelector('.save-button');
const year = document.querySelector('.year-select');
const month = document.querySelector('.month-select');

let listArr = [];

const saveList = () => sessionStorage.setItem('name', JSON.stringify(listArr));

const handleWinner = id => {
  const winner = nameList.querySelector(`li[data-id="${id}"]`);
  winner.classList.add('winner');
}

const handleRandom = () => {
  const max = listArr.length;
  const numRandom = Math.trunc(Math.random() * max);
  if (max === 0) return;
  handleWinner(listArr[numRandom].id);
  listArr.splice(numRandom, 1);
  saveList();
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
  const delBtn = document.createElement('button');
  const listId = listArr.length;
  li.dataset.id = listId;
  li.append(name);
  delBtn.append('X');
  delBtn.addEventListener('click', deleteName);
  li.append(delBtn);
  nameList.append(li);
  const listObj = {
    id: listId,
    name
  };
  listArr.push(listObj);
  saveList();
}

const handleSubmit = event => {
  event.preventDefault();
  const name = nameInput.value;
  if (name === '') return;
  nameInput.value = '';
  paintName(name);
}

const handleSave = () => {
  const saveObj = {
    year: year.value,
    month: month.value,
    name: 'd'
  }
  console.log(saveObj);
}

nameForm.addEventListener('submit', handleSubmit);
randomBtn.addEventListener('click', handleRandom);
saveBtn.addEventListener('click', handleSave);