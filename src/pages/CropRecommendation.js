import React, { useState } from 'react';
import './text.css';

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
		console.log(data);
		var raw = JSON.stringify(data);
		console.log(raw);
		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow'
		};

		fetch("http://127.0.0.1:7373/api/CropRecommendation", requestOptions)
			.then(response => response.text())
			.then(result => console.log(result))
			.catch(error => console.log('error', error));
	}

	return (
		<div className="text_for_testing">
			{/* <form onSubmit={onSubmit}> */}
				<label>
					Nitrogen content:
					<input name="N" type="text" value={values.N[0]} onChange={handleInputChange} />
				</label><br />
				<label>
					Phosphorus content:
					<input name="P" type="text" value={values.P[0]} onChange={handleInputChange} />
				</label><br />
				<label>
					Potassium content:
					<input name="K" type="text" value={values.K[0]} onChange={handleInputChange} />
				</label><br />
				<label>
					Temperature (in degree celsius):
					<input name="temp" type="text" value={values.temp[0]} onChange={handleInputChange} />
				</label><br />
				<label>
					Humidity (in percentage):
					<input name="humidity" type="text" value={values.humidity[0]} onChange={handleInputChange} />
				</label><br />
				<label>
					pH value (in range [0, 14]):
					<input name="ph" type="text" value={values.ph[0]} onChange={handleInputChange} />
				</label><br />
				<label>
					Amount of rainfall (in millimeter):
					<input name="rf" type="text" value={values.rf[0]} onChange={handleInputChange} />
				</label><br />
				<label>
					Select crop:
					<select onChange={handleInputChange} name="crop">
						<option value="rice" defaultValue>
							rice
						</option>
						<option value="mango">
							mango
						</option>
					</select>
				</label><br />
				<button id="submitButton" onClick={onSubmit}>Submit</button>
			{/* </form> */}
		</div>
	);
}

export default CropRecommendation;