function Letter(letter,words) {
	this.letter = letter;
	this.words = ko.observableArray(words.filter(function(word) {return word.word.indexOf(letter)>=0}));
	this.on = ko.computed(function() {
		var on = false;
		this.words().map(function(word) {
			if(word.on()) {
				on = !on;
			}
		});
		return on;
	},this);
}
function Word(word) {
	this.word = word;
	this.on = ko.observable(false);
	this.toggle = function() {
		this.on(!this.on());
	}
}

function Game(letters,words) {
	var game = this;
	this.words = ko.observableArray(words.map(function(word) {
		return new Word(word);
	}));
	this.letters = ko.observableArray(letters.map(function(letter) {
		return new Letter(letter,game.words());
	}));
}
Game.prototype = {
}

var letters = 'supergiant'.split('');
var words = 'great genius gets gripes eating gaunt unripe priest at repast'.split(' ');
var viewModel = new Game(letters,words);
console.log(viewModel.letters());
console.log(viewModel.words());
ko.applyBindings(viewModel);
