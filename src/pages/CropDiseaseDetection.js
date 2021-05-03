import React, { useState } from 'react';
import './CropDiseaseDetection.css';

function CropDiseaseDetection() {

	const [file, setFile] = useState(null);
	const [imagePath, setImagePath] = useState("");
	const [detection, setDetection] = useState({"result":null, "value":-1232894732});
	const [plantSelected, setPlantSelected] = useState("Apple");
	
	const fileChangeHandler = (event) => {
		setFile(event.target.files[0]);
	}

	const handleSelectionChange = (event) => {
		const target = event.target;
		const value = target.value;
		setPlantSelected(value);
	}

	const detectDiseases = () => {
		console.log(file);
		let reader = new FileReader();
		reader.readAsDataURL(file);
		let data = undefined
		reader.onload = (event) => {
			let img_b64 = event.target.result;
			console.log([1, img_b64]);
			data = img_b64.substr(img_b64.indexOf(',')+1);
			console.log([2, data, img_b64]);
			console.log(["datasent:", data])

			var myHeaders = new Headers();
			myHeaders.append("Content-Type", "application/json");
			
			// let data = {...values};
			// data["N"] = parseInt(data["N"][0], 10);
			// data["P"] = parseInt(data["P"][0], 10);
			// data["K"] = parseInt(data["K"][0], 10);
			// data["temp"] = parseFloat(data["temp"][0], 10);
			// data["humidity"] = parseFloat(data["humidity"][0], 10);
			// data["ph"] = parseFloat(data["ph"][0], 10);
			// data["rf"] = parseFloat(data["rf"][0], 10);
			// data["crop"] = data["crop"][0];

			console.log(data);
			var raw = JSON.stringify({image: data});
			console.log(raw);
			var requestOptions = {
				method: 'POST',
				headers: myHeaders,
				body: raw,
				redirect: 'follow'
			};

			fetch(`http://127.0.0.1:7373/api/${plantSelected}Prediction`, requestOptions)
				.then(response => response.text())
				.then(result => {console.log(result); setDetection(JSON.parse(result))})
				.catch(error => console.log('error', error));
		};
	}

	const displayImage = () => {
		return imagePath != "" ? (<img src={`${imagePath}`} />) : (<></>);
	}

	const showDetectionOutput = () => {
		let output = `Your ${plantSelected} plant ${detection["result"] === "Healthy" ? "is" : "has"} ${detection["result"]}.`;
		return detection.result ? ( <><span>{output}</span></> ) : (<></>);
	}

	const plants = ["Apple", "Tomato", "Potato"];

	return (
		<>
			<div>
				<div className="title-div">
					<h1>
						Crop Disease Detection
					</h1>
				</div>
				<table id="form">
					<tbody>
						<tr className="row">
							<td  className="text-label">
								<label> Choose image file: </label>
							</td>
							<td>
								<input className="input-field" type="file" accept="image/jpeg" onChange={fileChangeHandler} />
								<button id="submitButton" onClick={detectDiseases}>Detect</button>
							</td>
						</tr>
						<tr className="row">
							<td  className="text-label">
								<label> Select Plant: </label>
							</td>
							<td>
								<select className="input-field" onChange={handleSelectionChange} name="crop">
									{ plants.map((plant, index) => {
										return (
											<option key={index} value={plant}>{plant}</option>
										);
									}) }
								</select>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div id="result-div">
				<div>
					{displayImage()}
				</div>
				{showDetectionOutput()}
			</div>
		</>
	);
}

export default CropDiseaseDetection;