import React from 'react';

const Input = ({ searchTextChange }) => (
	<div className="pa2">
		<input
			className="pa3 ba b--green bg-lightest-blue"
			type='search'
			placeholder='Nitrogen value'
			onChange={searchTextChange}
		/>
	</div>
);

export default Input;