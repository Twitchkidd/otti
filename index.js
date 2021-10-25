// Okay, so ideally, you npm i -g otti, otti --watch ./, then import otti into where you're testing, find the inputs and then uncomment the otti code, and then it runs
// them in place and sends a message out to the otti-visualizer process to populate localhost:whatever with data.

// Can we get a simple version going just to whet our whistle though?

// Hmm, we're getting ... like for fulcrum, it's the multiple strategies,
// but also I'd just like to test like, okay, did this change make it more
// or less performant than last time?

// So like say otti was running and was sent a function ... I feel like you
// should be able to define sets of input ranges, like greedy fulcrum worked
// for a set, and then you saw recursive doing better and up a range to show
// it's time complexity, then up another range to tabularization, but so you
// can pass ... which set you want? Maybe like ...

// export ottiSets = {
//   1: [1, 2, 3, 4, 5]
//   2: [1, 2, 4, 8, 10]
//   3: [1, 10, 100, 1000, 10000]
// }

const fulc = require('./test/fulcrum');

const hundredKbyTenX = [1, 10, 100, 1_000, 10_000, 100_000];
const tenMbyHundredX = [10, 1_000, 100_000, 10_000_000];

const array10 = [8, 4, 6, 2, 8, 4, 2, 4, 8, 2];

const range = n => [...Array(n).keys()].map(x => ++x);

const test = (fn, input) => {
	const t1 = performance.now();
	console.log(fn(input));
	const t2 = performance.now();
	return {
		input,
		time: t2 - t1,
	};
};

let testFns = [];
let testInputs = [];
let results = {};

// testFns.push(range);
// testInputs.push(hundredKbyTenX, tenMbyHundredX);
testFns.push(fulc.firstFulcrum, fulc.firstFulcrumRecursive);
testInputs.push([array10]);

for (const fn of testFns) {
	results[fn.name] = testInputs.map((set, i) =>
		set.map(input => test(fn, input))
	);
}

for (const [name, tests] of Object.entries(results)) {
	console.log(`Function: ${name}\n`);
	for (const [i, test] of tests.entries()) {
		console.log(`Test ${i + 1}`);
		for (const result of test) {
			console.log(`Input: ${result.input} Time: ${result.time}`);
		}
		console.log('');
	}
}
