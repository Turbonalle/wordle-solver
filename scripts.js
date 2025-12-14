function getValidWords() {
	fetch("words-5-letters.txt")
		.then(res => res.text())
		.then(text => {
			const words = text
				.split(/\r?\n/)
				.filter(Boolean);
			return words;
		})
}

const validWords = getValidWords();

//------------------------------------------------------------------------------

function includesCorrectLetters(correctLetters, word) {
	for (let i = 0; i < word.length(); i++) {
		if (correctLetters[i] != '.' && correctLetters[i] !== word[i]) {
			return false;
		}
	}
	return true;
}

function includesMisplacedLetters(misplacedLetters, word) {
	for (let i = 0; i < word.length(); i++) {
		// Continue here
	}
}

function getPossibleWords(correctLetters, misplacedLetters, excludedLetters) {
	let possibleWords = [];

	for (word in validWords) {
		if (includesCorrectLetters(correctLetters, word)) {
			possibleWords.push(word);
		}
	}

	return possibleWords;
}