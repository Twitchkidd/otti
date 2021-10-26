const express = require('express');
// const annagrammable = require('./test/anagrammable');
// const binarySiftAndSort = require('./test/binarySiftAndSort');
const fulcrum = require('./test/fulcrum');
const port = process.env.PORT || 5000;

/*

  const inputSets = [
    { functions: [0, 1], inputs: inputs.slice(0, 3) },
    { functions: [1], inputs },
  ];

  module.exports = {
    name: 'First Fulcrum'
    functions: [firstFulcrumRecursive, firstFulcrumTab],
    inputSets,
    genFunction: testArray,
  };

  And then you want it like ... okay so for each test you want g graphs where g is the number of input sets, and displayed are all the
  functions that can operate on that scale

*/

// const tests = [ anagrammmable, binarySiftAndSort, fulcrum ];
const tests = [fulcrum];

const test = (fn, input) => {
	const t1 = performance.now();
	console.log(fn(input));
	const t2 = performance.now();
	return t2 - t1;
};

const results = tests.map(testObj =>
	testObj.inputSets.map(set =>
		set.functions.map(fnI =>
			set.inputs.map(input =>
				test(testObj.functions[fnI], testObj.genFunction(input))
			)
		)
	)
);

/*

  results: [
    [ // anagrammable

    ],
    [

    ],
    [ // fulcrum
      [ // input set 1
        [ // results from fn 1

        ],
        [ // results from fn 2

        ]
      ],
      [ // input set 2
        [ // results from function 2 (index 1)
          [
            0.001,
            0.002,
            0.009
          ]
        ]
      ]
    ]
  ]

*/

const data = results.map((test, t) => {
	return {
		testName: tests[t].name,
		inputSets: test.map((inputSet, i) => {
			return {
				setLabel: `${i + 1}`,
				inputs: tests[t].inputSets[i].inputs,
				functions: tests[t].inputSets[i].functions.map(
					f => tests[t].functions[f].name
				),
				results: inputSet,
			}; // results[f][i] is from functions[f] and has the input inputs[i]
		}),
	};
});

const app = express();

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/otti', (req, res) => {
	res.send({ data });
});
