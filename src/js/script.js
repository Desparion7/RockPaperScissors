const pointElement = document.querySelector('.points');
const paperBtn = document.querySelector('.button--paper');
const scissorsBtn = document.querySelector('.button--scissors');
const rockBtn = document.querySelector('.button--rock');
const sectionOptions = document.querySelector('.options');
const buttons = document.querySelectorAll('.options .button');

const rulesBtn = document.querySelector('.rules-btn');
const rules = document.querySelector('.rules');
const rulesCloseBtn = document.querySelector('.close-rules-btn');

const sectionFight = document.querySelector('.fight ');
const pickSpan = document.querySelectorAll('.pick span');
const LeftPick = document.querySelectorAll('.pick-left');
const newElementBox = document.querySelector('.pick-box-AI');
const resulBox = document.querySelector('.fight-resul');
const tryAgainBtn = document.querySelector('.reset-btn');

const playerWinsLSKey = 'playerWins';
const AIWinsLSKey = 'AIWins';

const winnigMap = {
	paper: ['rock'],
	scissors: ['paper'],
	rock: ['scissors'],
};

let state = {
	playerWins: Number(localStorage.getItem(playerWinsLSKey)) || 0,
	AIWins: Number(localStorage.getItem(AIWinsLSKey)) || 0,
	playerPick: null,
	AIPick: null,
};

const init = () => {
	renderScore();
	bindPickEvents();
};

const renderScore = () => {
	pointElement.textContent = state.playerWins - state.AIWins;
};

const bindPickEvents = () => {
	buttons.forEach((button) => {
		button.addEventListener('click', (e) => {
			createElements(e);
			pickAnimation();
		});
	});
};

const createElements = (e) => {
	newPlayerPick(e.currentTarget.dataset.pick);
	newAIPick();
	createElementPickedByPlayer();
	pickByIAAnimation();
};

const newPlayerPick = (pickedOption) => {
	state = {
		...state,
		playerPick: pickedOption,
	};
};
const createElementPickedByPlayer = () => {
	const playerPick = state.playerPick;
	const newElement = document.createElement('div');
	newElement.classList.add('button', `button--${playerPick}`);
	const newElementBg = document.createElement('div');
	newElementBg.classList.add('button-bgc');
	const newElementImg = document.createElement('img');
	newElementImg.src = `dist/img/icon-${playerPick}.svg`;
	newElementImg.alt = playerPick;
	const newRings = document.createElement('div');
	newRings.classList.add('rings');
	const newElementBox = document.querySelector('.pick-box-player');
	newElementBox.innerHTML = '';
	newElementBg.appendChild(newElementImg);
	newElement.appendChild(newElementBg);
	newElementBox.appendChild(newElement);
	newElementBox.appendChild(newRings);
};
const pickByIAAnimation = () => {
	const shadow = document.querySelector('.shadow-circle-box');
	const paper = document.querySelector('.random1');
	const scissors = document.querySelector('.random2');
	const rock = document.querySelector('.random3');

	setTimeout(() => {
		shadow.style.display = 'none';
	}, 2000);
	setTimeout(() => {
		paper.style.display = 'flex';
	}, 2200);
	setTimeout(() => {
		paper.style.display = 'none';
		scissors.style.display = 'flex';
	}, 2400);
	setTimeout(() => {
		scissors.style.display = 'none';
		rock.style.display = 'flex';
	}, 2600);
	setTimeout(() => {
		rock.style.display = 'none';
		paper.style.display = 'flex';
	}, 2800);

	setTimeout(createElementPickedByAI, 3000);
};

const newAIPick = () => {
	const pickOptions = ['paper', 'rock', 'scissors'];
	const pickedOptionByAI = pickOptions[Math.floor(Math.random() * 3)];
	state = {
		...state,
		AIPick: pickedOptionByAI,
	};
};
const createElementPickedByAI = () => {
	const AIPick = state.AIPick;
	const newElement = document.createElement('div');
	newElement.classList.add('button', `button--${AIPick}`);
	const newElementBg = document.createElement('div');
	newElementBg.classList.add('button-bgc');
	const newElementImg = document.createElement('img');
	newElementImg.src = `dist/img/icon-${AIPick}.svg`;
	newElementImg.alt = AIPick;
	const newRings = document.createElement('div');
	newRings.classList.add('rings');
	newElementBox.innerHTML = '';
	newElementBg.appendChild(newElementImg);
	newElement.appendChild(newElementBg);
	newElementBox.appendChild(newElement);
	newElementBox.appendChild(newRings);
	fightResult();
};

const pickAnimation = () => {
	paperBtn.classList.add('first-animation-paper');
	scissorsBtn.classList.add('first-animation-scissors');
	rockBtn.classList.add('first-animation-rock');
	sectionOptions.classList.add('options-animation');
	setTimeout(() => {
		sectionOptions.style.display = 'none';
	}, 1500);
	setTimeout(() => {
		sectionFight.classList.add('rings-animation');
		sectionFight.style.display = 'flex';
		pickSpan.forEach((span) => {
			span.classList.add('show-text');
		});
	}, 1500);
};

const fightResult = () => {
	const resoulText = document.querySelector('.resoul');
	if (state.playerPick === state.AIPick) {
		resoulText.textContent = 'DRAW';
	} else if (winnigMap[state.playerPick].includes(state.AIPick)) {
		localStorage.setItem(playerWinsLSKey, state.playerWins + 1);
		state = {
			...state,
			playerWins: state.playerWins + 1,
		};
		resoulText.textContent = 'YOU WIN';
		const playerWinRings = document.querySelector('.pick-box-player .rings');
		playerWinRings.style.display = 'block';
		const winImg = document.querySelector('.pick-box-player img');
		winImg.classList.add('rotate-animation');
	} else {
		localStorage.setItem(AIWinsLSKey, state.AIWins + 1);
		state = {
			...state,
			AIWins: state.AIWins + 1,
		};
		resoulText.textContent = 'YOU LOST';
		const AIWinRings = document.querySelector('.pick-box-AI .rings');
		AIWinRings.style.display = 'block';
		const winImg = document.querySelector('.pick-box-AI img');
		winImg.classList.add('rotate-animation');
	}
	renderScore();
	resulBox.style.display = 'flex';
};

const reset = () => {
	sectionOptions.style.display = 'block';
	sectionOptions.classList.remove('options-animation');
	paperBtn.classList.remove('first-animation-paper');
	scissorsBtn.classList.remove('first-animation-scissors');
	rockBtn.classList.remove('first-animation-rock');
	sectionFight.style.display = 'none';
	resulBox.style.display = 'none';
	resetAIBox();
};

const resetAIBox = () => {
	newElementBox.innerHTML = `<div class="shadow-circle-box"></div>
	<button class="button button--paper random1" data-pick="paper">
		<div class="button-bgc">
			<img src="dist/img/icon-paper.svg" alt="paper" />
		</div></button
	><button class="button button--scissors random2" data-pick="scissors">
		<div class="button-bgc">
			<img src="dist/img/icon-scissors.svg" alt="scissors" />
		</div></button
	><button class="button button--rock random3" data-pick="rock">
		<div class="button-bgc">
			<img src="dist/img/icon-rock.svg" alt="rock" />
		</div>
	</button>`;
};

// RULES
const openRules = () => {
	rules.style.display = 'block';
};
const closeRules = () => {
	rules.style.display = 'none';
};

init();

tryAgainBtn.addEventListener('click', reset);
rulesBtn.addEventListener('click', openRules);
rulesCloseBtn.addEventListener('click', closeRules);
