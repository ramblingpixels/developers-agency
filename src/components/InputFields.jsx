import React, { useEffect, useState } from "react";

const InputFields = ({ fields }) => {
	const [input1Value, setInput1Value] = useState("");
	const [input2Value, setInput2Value] = useState("");
	const [errorMessage1, setErrorMessage1] = useState("");
	const [errorMessage2, setErrorMessage2] = useState("");
	const [panValue, setPANValue] = useState("");
	const [panError, setPANError] = useState("");
	const [showCheck, setShowCheck] = useState(false);
	const [divs, setDivs] = useState([{ id: 1 }]);
	const [sliderValue, setSliderValue] = useState(10);
	const [collapse, setCollapse] = useState(true);
	const [formValues, setFormValues] = useState({
		GSTN: "",
		Number1: "",
		Number2: "",
		Addition: "",
		PAN: "",
	});

	let uniqueTypes = [];

	fields.forEach((field) => {
		if (!uniqueTypes.includes(field.type)) {
			uniqueTypes.push(field.type);
		}
	});

	console.log(uniqueTypes);

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(formValues);
	};

	return (
		<div className="container">
			<form action="">
				<div className="input-fields">
					{fields.map((field) => (
						<div
							style={{
								width: `${field.columncount ? 30 * field.columncount : 30}%`,
							}}
						>
							<label htmlFor="">{field.name}</label> <br />
							<input type={field.type} required={field.required} />
						</div>
					))}
				</div>

				<div className="footer-buttons">
					<button className="back-btn">Back</button>
					<div>
						<button className="submit-btn" onClick={handleSubmit}>
							Submit
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default InputFields;
