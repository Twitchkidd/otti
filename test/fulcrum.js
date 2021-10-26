// * From an array of numbers, find the first index where the sum of the
// * numbers before equals the sum of the numbers ahead, and return the
// * index or return -1;

// const array10 = [8, 4, 6, 2, 8, 4, 2, 4, 8, 2];

const testArray = n => {
	const range = n => [...Array(n).keys()].map(x => x + 1);
	const rN = range(n);
	return [...rN, 42, ...rN.reverse()];
};

const firstFulcrumTab = arr => {
	if (arr === undefined || arr.length === 0) {
		return -1;
	}
	if (arr.length === 1) {
		return 1;
	}
	let before = Number.MAX_VALUE;
	let after = Number.MAX_VALUE;
	const sum = a => a.reduce((a, c) => a + c, 0);
	before = 0;
	after = sum(arr.slice(1));
	if (after === 0) {
		return 1;
	}
	for (let i = 1; i < arr.length; i++) {
		before += arr[i - 1];
		after -= arr[i];
		if (before === after) {
			return i;
		}
	}
	return -1;
};

const firstFulcrumRecursive = arr => {
	const sum = a => a.reduce((a, c) => a + c, 0);
	if (arr === undefined || arr.length === 0) {
		return -1;
	}
	if (arr.length === 1) {
		return 1;
	}
	let result = -1;
	const traverse = (before, after, index) => {
		if (before === after) {
			result = index;
			return;
		}
		if (index === arr.length - 1) {
			before += arr[index];
			if (before === 0) {
				result = index;
			}
			return;
		}
		before += arr[index];
		after -= arr[index + 1];
		traverse(before, after, index + 1);
	};
	traverse(0, sum(arr.slice(1)), 0);
	return result;
};

const inputs = [10, 100, 1_000, 10_000, 100_000, 1_000_000, 10_000_000];

const inputSets = [
	{ functions: [0, 1], inputs: inputs.slice(0, 3) },
	{ functions: [1], inputs },
];

module.exports = {
	name: 'First Fulcrum',
	functions: [firstFulcrumRecursive, firstFulcrumTab],
	inputSets,
	genFunction: testArray,
};
