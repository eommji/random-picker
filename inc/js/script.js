const nameForm = document.querySelector('.name-form');
const nameInput = nameForm.querySelector('.name-input');
const nameList = document.querySelector('.name-list');
const randomBtn = document.querySelector('.random-buttom');
const arr = [];

const handleWinner = numRandom => {
  const winner = nameList.getElementsByTagName('li')[numRandom - 1];
  winner.classList.add('winner');
}

const handleRandom = () => {
  const min = 1;
  const max = nameList.getElementsByTagName('li').length;
  if (max === 0) return;
  const numRandom = Math.trunc(Math.random() * (max - min + 1) + min);
  

  arr.push(numRandom);
  handleWinner(numRandom);
}

const deleteName = event => {
  event.target.parentElement.classList.add('hide');
  setTimeout(() => event.target.parentElement.remove(), 300);
}

const paintName = name => {
  const li = document.createElement('li');
  const button = document.createElement('button');
  li.append(name);
  button.append('X');
  li.append(button)
  nameList.append(li);
  button.addEventListener('click', deleteName);
}

const handleSubmit = event => {
  event.preventDefault();
  const name = nameInput.value;
  if (name === '') return;
  nameInput.value = '';
  paintName(name);
}

nameForm.addEventListener('submit', handleSubmit);
randomBtn.addEventListener('click', handleRandom)