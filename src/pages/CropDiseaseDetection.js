import React, { useState } from 'react';

function CropDiseaseDetection() {

    const [file, setFile] = useState(null);
    const [detection, setDetection] = useState({"result":null, "value":-1232894732});
    const [plantSelected, setPlantSelected] = useState("");
    
    const fileChangeHandler = (event) => {
        setFile(event.target.files[0]);
    }

    const handleInputChange = (event) => {
		const target = event.target;
		const value = target.value;
		const name = target.name;
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

    const showDetectionOutput = () => {
        let output = `${detection["result"]} -- ${detection["value"]}`;
        return (
            <>
                <span>{output}</span>
            </>
        )
    }

    const plants = ["Apple", "Tomato", "Potato"];

    return (
        <>
            <div>
                <input type="file" accept="image/*" onChange={fileChangeHandler} />
                <button onClick={detectDiseases}>Detect</button>
                <select className="input-field" onChange={handleInputChange} name="crop">
                    { plants.map((plant, index) => {
                        return (
                            <option key={index} value={plant}>
                                {plant}
                            </option>
                        );
                    }) }
                </select>
            </div>
            <div>
                {showDetectionOutput()}
            </div>
        </>
    );
}

export default CropDiseaseDetection;