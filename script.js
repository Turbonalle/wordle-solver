const EMPTY = ' ';
let valid5LetterWords = [];

async function loadWords(path) {
	const res = await fetch(path);
	const text = await res.text();

	valid5LetterWords = text
		.split(/\r?\n/)
		.map(w => w.trim())
		.filter(Boolean);
	console.log("Words loaded: ", valid5LetterWords.length);
}


//-- Error check ---------------------------------------------------------------

function inputError(word, letters) {
	if (!word || !letters || word.length == 0 || word.length != letters.length) {
		return true;
	}
	return false;
}


//-- Letter check --------------------------------------------------------------

function includesCorrectLetters(word, correctLetters) {
	if (inputError(word, correctLetters)) return;

	for (let i = 0; i < word.length; i++) {
		if (correctLetters[i] != EMPTY && correctLetters[i] !== word[i]) {
			return false;
		}
	}
	return true;
}

function includesMisplacedLetters(word, misplacedLetters, correctLetters) {
	if (inputError(word, misplacedLetters)) return;
	const len = word.length;
	let includes = false;

	for (let i = 0; i < len; i++) {
		if (misplacedLetters[i] != EMPTY) {
			includes = false;
			for (let j = 0; j < len; j++) {
				if (j == i) continue;
				if (word[j] == misplacedLetters[i] && correctLetters[j] == EMPTY) { includes = true };
			}
			if (includes == false) return false;
		}
	}
	return true;
}

function includesExcludedLetters(word, excludedLetters) {
	for (let i = 0; i < word.length; i++) {
		for (let j = 0; j < excludedLetters.length; j++) {
			if (word[i] == excludedLetters[j]) return true;
		}
	}
	return false;
}


//-- Read input ----------------------------------------------------------------

function getLetters(id) {
	const container = document.getElementById(id);
	let letters = [];
	for (const child of container.children) {
		if (!child.value) {
			letters.push(EMPTY)
		} else {
			letters.push(child.value);
		}
	}
	return letters;
}


//-- Main function -------------------------------------------------------------

async function getPossibleWords() {
	const correctLetters = getLetters("correct-letters");
	const misplacedLetters = getLetters("misplaced-letters");
	const excludedLetters = document.getElementById("excluded-letters").value;
	let possibleWords = [];

	await wordsLoaded;

	for (const word of valid5LetterWords) {
		if (includesCorrectLetters(word, correctLetters)
			&& includesMisplacedLetters(word, misplacedLetters, correctLetters)
			&& !includesExcludedLetters(word, excludedLetters)
		) {
			possibleWords.push(word);
		}
	}

	document.getElementById("amount").innerText = possibleWords.length;
	document.getElementById("possible-words").textContent = possibleWords.join("\n");
}


//-- Initialize ----------------------------------------------------------------

let wordsLoaded = loadWords("words-5-letters.txt");

const correctLetters = document.getElementById("correct-letters");
for (const child of correctLetters.children) {
	child.addEventListener("input", () => {
		child.value ? child.style.background = "var(--color-correct)" : child.style.background = "var(--color-bg";
		getPossibleWords();
	});
}

const misplacedLetters = document.getElementById("misplaced-letters");
for (const child of misplacedLetters.children) {
	child.addEventListener("input", () => {
		child.value ? child.style.background = "var(--color-misplaced)" : child.style.background = "var(--color-bg";
		getPossibleWords();
	});
}

document.getElementById("excluded-letters").addEventListener("input", getPossibleWords);
getPossibleWords();


const logToggle = document.getElementById("log-toggle");
const logPanel = document.getElementById("update-log");

logToggle.addEventListener("click", () => {
  logPanel.classList.toggle("closed");
});

logPanel.addEventListener("click", () => {
  logPanel.classList.toggle("closed");
});