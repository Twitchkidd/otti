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
		const response = await fetch('/express_backend');
		const body = await response.json();
		if (response.status !== 200) {
			throw Error(body.message);
		}
		return body;
	};
	useEffect(() => {
		callBackendAPI()
			.then(res => setData(res.express))
			.catch(err => console.log(err));
	}, []);
	return (
		<Main>
			<h1>Otti</h1>
			<h2>Big O Testing Tool</h2>
			<div>{data}</div>
		</Main>
	);
};

export default App;
