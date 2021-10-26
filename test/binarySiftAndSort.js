// * Given a number, that number is how many digits of a binary you have,
// * then from the set of all permutations remove any with adjactent 1s,
// * and then print them line by line in lexicographical order.

const x = 27;

const siftAndSort = digits => {
	const plus0s = (bin, dig) => '0'.repeat(dig - bin.length) + bin;
	if (digits === 0) return '';
	if (digits === 1) return '0\n1';
	let table = new Array(digits);
	table[0] = ['0', '1'];
	table[1] = ['10'];
	table[2] = ['100', '101'];
	for (let i = 3; i < digits; i++) {
		table[i] = table
			.slice(0, i - 1)
			.flat()
			.map(b => '1' + plus0s(b, i));
	}
	return table.flat().join('\n');
};

const init = () => {
	console.log(`
  Welcome to the binary string sift and sort program!
  `);
	console.time(`Sift and sort (${x})`);
	console.log(siftAndSort(x));
	console.timeEnd(`Sift and sort (${x})`);
	console.log(`
  Thanks for using the binary string sift and sort program!
  `);
};

init();
