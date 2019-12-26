const stylesheet = require('./config.js');
var state = 0;
var timer = []

function resetClockStyle(){
	let bits = document.getElementsByTagName('td')
	for (let bit of bits){
		bit.style.backgroundColor = stylesheet.style.default.COLOR_INACTIVE
	}
}

function changeBitColor(i,j,color){
	var clock = document.getElementById('binary-table');
	if (6*j + i < 24) {
		var bit = clock.getElementsByTagName('td')[6*j + i];
		bit.style.backgroundColor = color;
	} else 
		console.log("Invalid range for bit");
}

function setBit(i,row,color) {
	if (i < 4) {
		var bit = row[i];
		bit.style.backgroundColor = color;
	} else {
		console.log('Out of range');
	}
}

function mapNumberToBinaryFormat(number){
	var power = 3; var i = 3;
	var bits = [0,0,0,0];

	if (number > 9) {
		console.log('Numero fora do range')
		return -1;
	}

	while (number != 0) {
		if (Math.floor( number / (2 ** power) ) ) {
			number = number % 2 ** power;
			bits[i] = 1;
		}
		i -= 1;
		power -= 1;
	} return bits;
}

function setBitToNumber(category,number) {
	var row = document.getElementsByClassName(category);
	if (row == null) {
		console.log('Erro ao obter tabela');
		return -1;
	}
	var bits = mapNumberToBinaryFormat(number);
	bits = bits.reverse();
	for (let i = 0; i < 4; i++) {
		if (bits[i])
			setBit(i,row,stylesheet.style.default.COLOR_ACTIVE);
		else 
			setBit(i,row,stylesheet.style.default.COLOR_INACTIVE);
	}
}

function initiateTimer(){
	console.log('start')
	var time = [0,0,0,0,0,0];
	var dict = ['milisecond','second-one','second-ten','minute-one','minute-ten','hour']
	var msToProperTime = [100,1000,10000,60000,600000,3600000];
	var timers = []
	for (let i = 0; i < time.length; i++) {
		timers.push(setInterval(() => {
			time[i] += 1;
			if (time[i] == 6 && (dict[i] == 'second-ten' || dict[i] == 'minute-ten')) {
				time[i] = 0;
			} else if (time[i] == 10) {
				time[i] = 0;
			}
			setBitToNumber(dict[i],time[i]);
		}, msToProperTime[i]))
	}
	console.log(timers)
	return timers
}

function stopTimer(){
	console.log('stop')
	console.log(timer);
	for (let i = 0; i < timer.length; i++){
		clearInterval(timer[i]);
		timer.pop(i);
	}
	resetClockStyle();
}

function main() {
	document.addEventListener("keydown",() => {
		if (!state){
			timer = initiateTimer()
			state = 1;
		} else {
			stopTimer();
			state = 0
		}
	});
	resetClockStyle()
}

main()
