function loadWords(path) {
	fetch(path)
		.then(res => res.text())
		.then(text => {
			const words = text
				.split(/\r?\n/)
				.filter(Boolean);
			return words;
		})
}

const valid5LetterWords = loadWords("words-5-letter.txt");

//------------------------------------------------------------------------------

function includesCorrectLetters(word, correctLetters) {
	for (let i = 0; i < word.length(); i++) {
		if (correctLetters[i] != '.' && correctLetters[i] !== word[i]) {
			return false;
		}
	}
	return true;
}

function includesMisplacedLetters(word, misplacedLetters) {
	for (let i = 0; i < word.length(); i++) {
		// Continue here
	}
}

function getPossibleWords(correctLetters, misplacedLetters, excludedLetters) {
	let possibleWords = [];

	for (word in valid5LetterWords) {
		if (includesCorrectLetters(word, correctLetters)) {
			possibleWords.push(word);
		}
	}

	return possibleWords;
}