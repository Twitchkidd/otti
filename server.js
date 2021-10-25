const express = require('express');
const fulc = require('./test/fulcrum');
const port = process.env.PORT || 5000;

const test = (fn, input) => {
	const t1 = performance.now();
	console.log(fn(input.value));
	const t2 = performance.now();
	return {
		input: input.label,
		time: t2 - t1,
	};
};

const testFns = fulc.functions;
const testSets = fulc.inputSets;

const cache = {};

const results = testSets.map((set, i) =>
	i === 1
		? [
				{
					name: testFns[0].name,
					set: i,
					times: set.map(input => test(testFns[0], input)),
				},
		  ]
		: testFns.map(fn => {
				return {
					name: fn.name,
					set: i,
					times: set.map(input => test(fn, input)),
				};
		  })
);

cache.results = results;

const app = express();

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/otti', (req, res) => {
	res.send({ results: cache.results });
});
