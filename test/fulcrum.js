// * From an array of numbers, find the first index where the sum of the
// * numbers before equals the sum of the numbers ahead, and return the
// * index or return -1;

const array10 = [8, 4, 6, 2, 8, 4, 2, 4, 8, 2];

const range = n => [...Array(n).keys()].map(x => x + 1);

const range50 = range(50);
const array101 = [...range50, 51, ...range50.reverse()];

const range500 = range(500);
const array1001 = [...range500, 501, ...range500.reverse()];

const tenK = 10_000;
const hundredK = 100_000;
const million = 1_000_000;
const tenM = 10_000_000;

const testArray = n => {
	const rN = range(n);
	return [...rN, 42, ...rN.reverse()];
};

const firstFulcrum = arr => {
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

const init = () => {
	console.log(`
  Welcome to the first fulcrum point checker program!
  `);
	console.time(`firstFulcrumRecursive - 10`);
	console.log(firstFulcrumRecursive(array10));
	console.timeEnd(`firstFulcrumRecursive - 10`);
	// console.time(`firstFulcrumRecursive - ${tenK}`);
	// console.log(firstFulcrumRecursive(testArray(tenK)));
	// console.timeEnd(`firstFulcrumRecursive - ${tenK}`);
	// console.time(`firstFulcrum - ${tenK}`);
	// console.log(firstFulcrum(testArray(tenK)));
	// console.timeEnd(`firstFulcrum - ${tenK}`);
	// console.time(`firstFulcrum - ${hundredK}`);
	// console.log(firstFulcrum(testArray(hundredK)));
	// console.timeEnd(`firstFulcrum - ${hundredK}`);
	// console.time(`firstFulcrum - ${million}`);
	// console.log(firstFulcrum(testArray(million)));
	// console.timeEnd(`firstFulcrum - ${million}`);Z
	// console.time(`firstFulcrum - ${tenM}`);
	// console.log(firstFulcrum(testArray(tenM)));
	// console.timeEnd(`firstFulcrum - ${tenM}`);
	console.time(`firstFulcrum - 10`);
	console.log(firstFulcrum(array10));
	console.timeEnd(`firstFulcrum - 10`);
	// console.time(`firstFulcrum - 101`);
	// console.log(firstFulcrum(array101));
	// console.timeEnd(`firstFulcrum - 101`);
	// console.time(`firstFulcrum - 1001`);
	// console.log(firstFulcrum(array1001));
	// console.timeEnd(`firstFulcrum - 1001`);
	console.log(`
  Thanks for using the first fulcrum point checker program!
  `);
};

// init();

const inputs = [
	{
		label: 'array10',
		value: array10,
	},
	{
		label: 'array101',
		value: array101,
	},
	{
		label: 'array1001',
		value: array1001,
	},
	{
		label: 'tenK',
		value: testArray(tenK),
	},
	{
		label: 'hundredK',
		value: testArray(hundredK),
	},
	{
		label: 'million',
		value: testArray(million),
	},
	{
		label: 'tenM',
		value: testArray(tenM),
	},
];

const inputSets = [inputs.slice(0, 3), inputs.slice()];

module.exports = {
	functions: [firstFulcrum, firstFulcrumRecursive],
	inputSets,
};
