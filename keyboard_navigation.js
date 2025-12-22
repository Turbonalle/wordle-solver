const correctInputs = Array.from(document.querySelectorAll("#correct-letters input"));
const misplacedInputs = Array.from(document.querySelectorAll("#misplaced-letters input"));
const excludedInputs = document.getElementById("excluded-letters");

let lastMisplacedIndex = 0;

function focusInput(input) {
	if (input) {
		input.focus();
		input.select();
	}
}

function navigationKey(key) {
	return (["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(key));
}

function handleKeyNavigation(e) {
	const key = e.key;
	if (!navigationKey(key)) return;

	console.log("Key pressed: ", key);

	const target = e.target;
	let index;

	if (correctInputs.includes(target)) {
		index = correctInputs.indexOf(target);
		
		if (key === "ArrowLeft" && index > 0) {
			focusInput(correctInputs[index - 1]);
		} else if (key === "ArrowRight" && index < correctInputs.length - 1) {
			focusInput(correctInputs[index + 1]);
		} else if (key === "ArrowDown") {
			focusInput(misplacedInputs[index]);
			lastMisplacedIndex = index;
		}
		e.preventDefault();
	} else if (misplacedInputs.includes(target)) {
		index = misplacedInputs.indexOf(target);
		lastMisplacedIndex = index;

		if (key === "ArrowLeft" && index > 0) {
			focusInput(misplacedInputs[index - 1]);
		} else if (key === "ArrowRight" && index < misplacedInputs.length - 1) {
			focusInput(misplacedInputs[index + 1]);
		} else if (key === "ArrowUp") {
			focusInput(correctInputs[index]);
		} else if (key === "ArrowDown") {
			excludedInputs.focus();
		}
		e.preventDefault();
	} else if (target === excludedInputs) {
		if (key === "ArrowUp") {
			focusInput(misplacedInputs[lastMisplacedIndex]);
		}
		e.preventDefault();
	}
}

document.addEventListener("keydown", handleKeyNavigation);