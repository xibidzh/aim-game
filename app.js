const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl =  document.querySelector('#time')
const board =  document.querySelector('#board')
const colors = ['#005f73', '#0a9396', '#94d2bd', '#e9d8a6', '#ee9b00', '#ca6702', '#bb3e03', '#ae2012', '#9b2226']
let time = 0
let score = 0 

startBtn.addEventListener('click', (event) => {
	event.preventDefault()
	screens[0].classList.add('up')
})


timeList.addEventListener('click', event => {
	if (event.target.classList.contains('time-btn')) {
		time = parseInt(event.target.getAttribute('data-time'))
		screens[1].classList.add('up')
		startGame()
	}
})

board.addEventListener('click', event => {
	if (event.target.classList.contains('circle')) {
		score++
		event.target.remove()
		createRandomCircle() 
	}
})



function startGame() {
	setInterval(decreaseTime, 1000)
	createRandomCircle() 
	setTime(time)
}

function decreaseTime() {
	if (time === 0) {
		finishGame()
	} else {
		let current = --time
	if (current < 10) {
		current = `0${current}`
	} 
	setTime(current)
	}
	
}

function setTime(value) {
	timeEl.innerHTML = `00:${value}`
}

function finishGame() {
	timeEl.parentNode.classList.add('hide')
	board.innerHTML = `<h1>Вас счет: ${score}</h1>`
	// setTimeout(window.refresh, 5000)
}

function createRandomCircle() {
	const circle = document.createElement('div')
	const size = getRandomNumber(13, 50)
	const {width, height} = board.getBoundingClientRect()
	const x = getRandomNumber(0, width - size) 
	const y = getRandomNumber(0, height - size) 

	circle.classList.add('circle')
	setColor(circle)
	circle.style.width = `${size}px`
	circle.style.height = `${size}px`
	circle.style.top = `${x}px`
	circle.style.left = `${y}px`
	board.append(circle)
}
 
function getRandomNumber(min, max) {
	return Math.round(Math.random() * (max-min) + min)
}

function setColor(el) {
	const color = getColor()
	el.style.backgroundColor = color
	el.style.boxShadow = `0 0 2px ${color}, 0 0 5px ${color}`
}

function getColor() {
	const index = Math.floor(Math.random() * colors.length)
	return colors[index] 
}