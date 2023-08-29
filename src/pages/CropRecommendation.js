import React, { useState } from 'react';
import './CropRecommendation.css';

function CropRecommendation() {
	const apiBase = "http://127.0.0.1:7373/api";
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

	const [resultFetched, setResultFetched] = useState({"fetched": "false"});

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

		setResultFetched({"fetched": "false"});
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

		fetch(`${apiBase}/CropRecommendation`, requestOptions)
			.then(response => response.text())
			.then(result => {
				console.log(JSON.parse(result));
				setResultFetched({"fetched": "true", ...JSON.parse(result)});
			})
			.catch(error => {
				console.log('error', error);
				setResultFetched({"fetched": "error"});
			});
	}

	let crops = [ 'rice', 'maize', 'chickpea', 'kidneybeans', 'pigeonpeas', 'mothbeans', 'mungbean', 'blackgram', 'lentil', 'pomegranate', 'banana', 'mango', 'grapes', 'watermelon', 'muskmelon', 'apple', 'orange', 'papaya', 'coconut', 'cotton', 'jute', 'coffee' ];

	const formElements = [
		{ label: "Nitrogen content:", name: "N" },
		{ label: "Phosphorus content:", name: "P" },
		{ label: "Potassium content:", name: "K" },
		{ label: "Temperature (in degree celsius):", name: "temp" },
		{ label: "Humidity (in percentage):", name: "humidity" },
		{ label: "pH value (in range [0, 14]):", name: "ph" },
		{ label: "Amount of rainfall (in millimeter):", name: "rf" }
	]

	const resultContent = () => {
		if(resultFetched.fetched === "true") {
			let output = resultFetched.isSuggested && resultFetched.isSuggested === "True" ?
						`We are happy to tell you that, growing ${values.crop[0]} is good for your soil conditions.` :
						`Sadly, ${values.crop[0]} is not good for your soil conditions.`;
			return ( <> <span> {output } </span> </> );
		} else if(resultFetched.fetched === "error") {
			return `Unable to connect to api server.\nSorry for the inconvenience`;
		} else {
			return (<></>);
		}
	}

	return (
		<>
			<div>
				<div className="title-div">
					<h1>
						Crop Recommendation
					</h1>
				</div>
				<table id="form">
					<tbody>
						{ formElements.map((element, index) => {
							return (
								<tr key={index} className="row">
									<td>
										<label className="text-label"> {element.label} </label>
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