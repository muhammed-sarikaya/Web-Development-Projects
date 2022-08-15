const open = document.getElementById('open');
const close = document.getElementById('close');
const container = document.querySelector('.container');
const img = document.getElementById('apple');

open.addEventListener('click', () => {
	container.classList.add('show-nav');
	img.src = '../Images/2.jpg';
});
close.addEventListener('click', () => {
	container.classList.remove('show-nav');
	img.src = '../Images/3.jpg';
});
