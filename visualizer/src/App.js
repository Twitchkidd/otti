import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { XYPlot, XAxis, YAxis, MarkSeries } from 'react-vis';
import './styles/react-vis.css';

const Main = styled.main`
	display: grid;
	place-items: center;
	color: #f1f1f1;
`;

const Chart = ({ data }) => (
	<XYPlot
		style={{ background: '#f1f1f1' }}
		height={500}
		width={500}
		margin={{ left: 60, right: 40, top: 40, bottom: 60 }}>
		<XAxis title='Items' />
		<YAxis title='Time' />
		<MarkSeries data={data} />
	</XYPlot>
);

const App = () => {
	const [data, setData] = useState(null);
	const callBackendAPI = async () => {
		const response = await fetch('/otti');
		const body = await response.json();
		if (response.status !== 200) {
			throw Error(body.message);
		}
		return body;
	};
	const durData = [
		{ x: 0, y: 8 },
		{ x: 1, y: 5 },
		{ x: 2, y: 4 },
		{ x: 3, y: 9 },
		{ x: 4, y: 1 },
		{ x: 5, y: 7 },
		{ x: 6, y: 6 },
		{ x: 7, y: 3 },
		{ x: 8, y: 2 },
		{ x: 9, y: 0 },
	];
	useEffect(() => {
		callBackendAPI()
			.then(res => setData(res.data))
			.catch(err => console.log(err));
	}, []);
	useEffect(() => {
		console.log(data);
	}, [data]);
	return (
		<Main>
			<h1>Otti</h1>
			<h2>Big O Testing Tool</h2>
			{data &&
				data.map((test, t) => (
					<div key={t}>
						<h1>{test.testName}</h1>
						{test.inputSets.map((set, s) => (
							<div key={s}>
								<p>Set Number: {set.setLabel}</p>
								<p>
									Functions:{' '}
									{set.functions.map((fn, f) =>
										f === set.functions.length - 1 ? fn : `${fn}, `
									)}
								</p>
								<p>Results:</p>
								{set.functions.map((fn, f) => (
									<div key={f}>
										<p>{fn}</p>
										<Chart
											data={set.inputs.map((input, i) => {
												return {
													x: input,
													y: set.results[f][i],
												};
											})}
										/>
										{set.results[f].map((res, r) => (
											<li key={r}>
												Input: {set.inputs[r]} Result: {set.results[f][r]}
											</li>
										))}
									</div>
								))}
							</div>
						))}
					</div>
				))}
		</Main>
	);
};

export default App;
