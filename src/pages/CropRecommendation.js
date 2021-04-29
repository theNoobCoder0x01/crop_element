import React, { useState } from 'react';
import './CropRecommendation.css';

function CropRecommendation() {
	const [values, setValues] = useState({
		"N": ["0", "int"],
		"P": ["0", "int"],
		"K": ["0", "int"],
		"temp": ["0.0", "float"],
		"humidity": ["0.0", "float"],
		"ph": ["0.0", "float"],
		"rf": ["0.0", "float"],
		"crop": ["rice", "string"],
	});

	const [resultFetched, setResultFetched] = useState(null);

	const handleInputChange = (event) => {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		const digits_only = (string) => [...string].every((c) => '0123456789'.includes(c));
		if (values[name][1] === "int") {
			setValues({...values, [name]: [digits_only(value) ? value : "Error", "int"]});
		} else if (values[name][1] === "float") {
			setValues({...values, [name]: [((value === "") || (!isNaN(value) && parseFloat(value) >= 0)) ? value : "Error", "float"]});
		} else {
			setValues({...values, [name]: [value, "string"]});
		}

		setResultFetched(null);
	}

	const onSubmit = () => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		
		let data = {...values};
		data["N"] = parseInt(data["N"][0], 10);
		data["P"] = parseInt(data["P"][0], 10);
		data["K"] = parseInt(data["K"][0], 10);
		data["temp"] = parseFloat(data["temp"][0], 10);
		data["humidity"] = parseFloat(data["humidity"][0], 10);
		data["ph"] = parseFloat(data["ph"][0], 10);
		data["rf"] = parseFloat(data["rf"][0], 10);
		data["crop"] = data["crop"][0];

		var raw = JSON.stringify(data);
		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow'
		};

		fetch("http://127.0.0.1:7373/api/CropRecommendation", requestOptions)
			.then(response => response.text())
			.then(result => setResultFetched(JSON.parse(result)))
			.catch(error => console.log('error', error));
	}

	let crops = [ 'rice', 'maize', 'chickpea', 'kidneybeans', 'pigeonpeas', 'mothbeans', 'mungbean', 'blackgram', 'lentil', 'pomegranate', 'banana', 'mango', 'grapes', 'watermelon', 'muskmelon', 'apple', 'orange', 'papaya', 'coconut', 'cotton', 'jute', 'coffee' ];

	const formElements = [
		{
			label: "Nitrogen content:",
			name: "N"
		},
		{
			label: "Phosphorus content:",
			name: "P"
		},
		{
			label: "Potassium content:",
			name: "K"
		},
		{
			label: "Temperature (in degree celsius):",
			name: "temp"
		},
		{
			label: "Humidity (in percentage):",
			name: "humidity"
		},
		{
			label: "pH value (in range [0, 14]):",
			name: "ph"
		},
		{
			label: "Amount of rainfall (in millimeter):",
			name: "rf"
		}
	]

	const resultContent = () => {
		return resultFetched ? (
			<>
				<span {...{color: resultFetched.result ? "green" : "red"}}>
					{ `${values.crop[0]} is ${resultFetched.result ? "" : "not "}recommended for you.` }
				</span>
			</>
		) : (<></>);
	}

	return (
		<>
			<div>
				<table id="form">
					<tbody>
					{ formElements.map((element, index) => {
						return (
							<tr key={index} className="row">
								<td  className="text-label">
									<label> {element.label} </label>
								</td>
								<td>
									<input className="input-field" name={element.name} type="text" value={values[element.name][0]} onChange={handleInputChange} />
								</td> 
							</tr>
						);
					}) }
					<tr className="row">
						<td>
							<label className="text-label"> Select crop: </label>
						</td>
						<td>
							<select className="input-field" onChange={handleInputChange} name="crop">
								{ crops.map((crop, index) => {
									return (
										<option key={index} value={crop}>
											{crop}
										</option>
									);
								}) }
							</select>
						</td>
					</tr>
					<tr>
						<td className="tc">
							<button id="submitButton" onClick={onSubmit}>Submit</button>
						</td>
					</tr>
					</tbody>
				</table>
			</div>
			<div id="result-div">
				{resultContent()}
			</div>
		</>
	);
}

export default CropRecommendation;