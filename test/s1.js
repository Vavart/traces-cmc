import { nom } from './s2.js';

function s1() {
  console.log(nom);
}

const btn = document.querySelector('#btn');
btn.addEventListener('click', s1);