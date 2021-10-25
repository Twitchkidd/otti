import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Main = styled.main`
	display: grid;
	place-items: center;
	color: #f1f1f1;
`;

const App = () => {
	const [data, setData] = useState(null);
	const callBackendAPI = async () => {
		const response = await fetch('/otti');
		console.log(response);
		const body = await response.json();
		if (response.status !== 200) {
			throw Error(body.message);
		}
		return body;
	};
	useEffect(() => {
		callBackendAPI()
			.then(res => setData(res.results))
			.catch(err => console.log(err));
	}, []);
	useEffect(() => {
		console.log(data);
	}, [data]);
	return (
		<Main>
			<h1>Otti</h1>
			<h2>Big O Testing Tool</h2>
			<div>
				{data &&
					data.map((sets, i) => (
						<div key={i}>
							{sets.map(({ name, set, times }, j) => (
								<div key={j}>
									<p>{name}</p>
									<p>{set}</p>
									<ul>
										{times.map(({ input, time }, k) => (
											<li key={k}>
												{input}: {time}
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
					))}
			</div>
		</Main>
	);
};

export default App;
