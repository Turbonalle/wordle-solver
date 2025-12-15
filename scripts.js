let valid5LetterWords = [];

const correctLetters = "....y";
const misplacedLetters = "f....";
const excludedLetters = "xeaub";

async function loadWords(path) {
	const res = await fetch(path);
	const text = await res.text();

	valid5LetterWords = text
		.split(/\r?\n/)
		.map(w => w.trim())
		.filter(Boolean);
	
	console.log("Words loaded: ", valid5LetterWords.length);
}

//------------------------------------------------------------------------------

function inputError(word, letters) {
	if (!word || !letters || word.length == 0 || word.length != letters.length) {
		return true;
	}
	return false;
}

function includesCorrectLetters(word, correctLetters) {
	if (inputError(word, correctLetters)) return;

	for (let i = 0; i < word.length; i++) {
		if (correctLetters[i] != '.' && correctLetters[i] !== word[i]) {
			return false;
		}
	}
	console.log("Word includes correct letters: ", word);
	return true;
}

function includesMisplacedLetters(word, misplacedLetters, correctLetters) {
	if (inputError(word, misplacedLetters)) return;
	const len = word.length;
	let includes = false;

	for (let i = 0; i < len; i++) {
		if (misplacedLetters[i] != '.') {
			includes = false;
			for (let j = 0; j < len; j++) {
				if (j == i) continue;
				if (word[j] == misplacedLetters[i] && correctLetters[j] == '.') { includes = true };
			}
			if (includes == false) return false;
		}
	}
	console.log("Word includes misplaced letters: ", word);
	return true;
}

function includesExcludedLetters(word, excludedLetters) {
	for (let i = 0; i < word.length; i++) {
		for (let j = 0; j < excludedLetters.length; j++) {
			if (word[i] == excludedLetters[j]) return true;
		}
	}
	console.log("Word does not include excluded letters: ", word);
	return false;
}

async function getPossibleWords(correctLetters, misplacedLetters, excludedLetters) {
	let possibleWords = [];

	await wordsLoaded;

	for (const word of valid5LetterWords) {
		// console.log("Testing word: ", word);
		if (includesCorrectLetters(word, correctLetters)
			&& includesMisplacedLetters(word, misplacedLetters, correctLetters)
			&& !includesExcludedLetters(word, excludedLetters)
		) {
			possibleWords.push(word);
		}
	}

	for (const word of possibleWords) {
		console.log("Possible word: ", word);
	}

	return possibleWords;
}

let wordsLoaded = loadWords("words-5-letters.txt");
getPossibleWords(correctLetters, misplacedLetters, excludedLetters);