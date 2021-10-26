// * Check whether a given word is or can be rearranged to be an anagram

const abba = 'abba';
const outco = 'outco';
const abcs = 'abcdaebdc';

const annagrammable = word => {
	if (word === undefined) {
		return false;
	}
	let tab = {};
	for (const letter of word) {
		if (!tab[letter]) {
			tab[letter] = 1;
		} else {
			tab[letter] += 1;
		}
	}
	const odds = Object.values(tab).filter(count => count % 2 !== 0).length;
	if (odds > 1) {
		if (odds % 2 !== 0) {
			return false;
		}
	}
	return true;
};

const init = () => {
	console.log(`
  Welcome to the 'does it anagram?' program!
  `);
	console.log(annagrammable(abba));
	console.log(annagrammable(outco));
	console.log(annagrammable(abcs));
	console.log(`
  Thanks for using the 'does it anagram?' program!
  `);
};

init();
