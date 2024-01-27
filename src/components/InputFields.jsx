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

	const validateInput = (e, setInputValue, setErrorMessage, id) => {
		const number = e.target.value;
		const numericValue = number.replace(/[^0-9]/g, "");
		setInputValue(numericValue);

		if (numericValue !== "" && isNaN(numericValue)) {
			setErrorMessage("Please enter a valid number.");
		} else {
			setErrorMessage("");
		}

		const { value } = e.target;

		if (id === "number1") {
			setFormValues((prevValues) => ({
				...prevValues,
				Number1: value,
			}));
		} else if (id === "number2") {
			setFormValues((prevValues) => ({
				...prevValues,
				Number2: value,
			}));
		}
	};

	useEffect(() => {
		setFormValues((prevValues) => ({
			...prevValues,
			Addition: parseInt(input1Value) + parseInt(input2Value),
		}));
	}, [input1Value, input2Value]);

	const validatePAN = (e) => {
		const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

		const pan = e.target.value;

		if (pan.length < 10) {
			setPANError(fields[2].lengtherrormsg);
			setShowCheck(false);
		} else if (!panRegex.test(pan)) {
			setPANError(fields[2].regexerrormsg);
			console.log(panError);
			setShowCheck(false);
		} else {
			setPANError("");
			setShowCheck(true);
		}

		setPANValue(pan.toUpperCase());

		const { value } = e.target;
		setFormValues((prevValues) => ({
			...prevValues,
			PAN: value,
		}));
	};

	const handleAddDiv = () => {
		const newDiv = { id: divs.length + 1 };
		setDivs([...divs, newDiv]);
	};

	const handleDeleteDiv = (id) => {
		const updatedDivs = divs.filter((div) => div.id !== id);
		setDivs(updatedDivs);
	};

	const handleSliderChange = (event) => {
		setSliderValue(parseInt(event.target.value, 10));
		const { value } = event.target;
		setFormValues((prevValues) => ({
			...prevValues,
			GSTN: value,
		}));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(formValues);
	};

	const handleCollapse = () => {
		setCollapse(!collapse);
	};

	useEffect(() => {
		console.log(collapse);
	}, [collapse]);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormValues((prevValues) => ({
			...prevValues,
			[name]: value,
		}));
	};

	return (
		<div className="input-fields px-100">
			<form action="" className="grid grid-cols-3 gap-4">
				{/* Row 1 */}

				<div>
					<div class="full-input">
						<label for="leads">
							{fields[0].name} <span class="required-indicator">*</span>
						</label>
						<select id="leads" name="leads" required onChange={handleChange}>
							{fields[0].options.map((option) => (
								<option value={option.value} key={option.key}>
									{option.value}
								</option>
							))}
						</select>
					</div>

					<div class="full-input">
						<label for="corpId">
							{fields[1].name} <span class="required-indicator">*</span>
						</label>
						<input
							type="text"
							name="corpId"
							required
							onChange={handleChange}
						></input>
					</div>

					<div class="full-input pan-input">
						<div>
							<label for="panNo">
								{fields[2].name} <span class="required-indicator">*</span>
							</label>
							<input
								type="text"
								name="panNo"
								required
								value={panValue}
								onChange={(e) => validatePAN(e)}
							></input>
						</div>
						<div>
							<p style={{ color: "green" }}> {showCheck ? "Correct" : ""}</p>
							<p style={{ color: "red" }}>{panError}</p>
						</div>
					</div>
				</div>

				{/* Row 2   */}

				<div>
					<div class="full-input">
						<label for="number1">
							{fields[3].name} <span class="required-indicator">*</span>
						</label>
						<input
							value={input1Value}
							type="text"
							name="number1"
							required
							onChange={(e) =>
								validateInput(e, setInput1Value, setErrorMessage1, fields[3].id)
							}
						></input>
					</div>

					<div class="full-input">
						<label for="number2">
							{fields[4].name} <span class="required-indicator">*</span>
						</label>
						<input
							value={input2Value}
							type="text"
							name="number2"
							required
							onChange={(e) =>
								validateInput(e, setInput2Value, setErrorMessage2, fields[4].id)
							}
						></input>
					</div>

					<div class="full-input">
						<label for="number3">
							{fields[5].name} <span class="required-indicator">*</span>
						</label>
						<p className="addition-result">
							{parseInt(input1Value) + parseInt(input2Value)}
						</p>
					</div>
				</div>

				{/* Row 3 */}
				<div>
					<div class="full-input" style={{ flex: 1 }}>
						<label for="trade">
							{fields[6].name} <span class="required-indicator">*</span>
						</label>
						<input
							type="text"
							name="trade"
							required
							onChange={handleChange}
						></input>
					</div>

					<div class="full-input " style={{ flex: `${fields[7].columncount}` }}>
						<label for="address">
							{fields[7].name} <span class="required-indicator">*</span>
						</label>
						<input
							type="text"
							name="address"
							required
							onChange={handleChange}
						></input>
					</div>
				</div>

				<div className="row-4">
					<div className="checkbox">
						<input type="checkbox" className="checkbox-input" />
						<label htmlFor="">Send a copy to your email</label>
					</div>

					<div>
						<p>
							{fields[8].name} <span class="required-indicator">*</span>
						</p>
						{fields[8].options.map((option) => (
							<div className="radio-option" key={option.key}>
								<input
									type="radio"
									value={option.value}
									name={fields[8].name}
									className="radio-input"
									required
									onChange={handleChange}
								/>
								<label htmlFor={option.value}>{option.value}</label>
							</div>
						))}
					</div>

					<div>
						<p>{fields[9].name}</p>
						<label className="current-slider-value">{sliderValue}</label>

						<input
							className="slider"
							type="range"
							min={10}
							max={1000}
							value={sliderValue}
							onChange={handleSliderChange}
						/>
						<div className="slider-min-max">
							<label>{fields[9].minvalue}</label>
							<label>{fields[9].maxvalue}</label>
						</div>
					</div>
				</div>

				{/* Repeaters */}
				<div className="r-field-div">
					<button className="add-btn" onClick={handleAddDiv}>
						+
					</button>
					{divs.map((div) => (
						<div key={div.id} className="r-field-item">
							<div className="r-field-list">
								<p>{div.id}</p>
								<div>
									<label htmlFor="">
										{fields[10].name} <span class="required-indicator">*</span>
									</label>
									<input type="text" required />
								</div>
								<div>
									<label htmlFor="">
										{fields[11].name} <span class="required-indicator">*</span>
									</label>
									<input type="text" required />
								</div>
								<div>
									<label htmlFor="">{fields[12].name}</label>
									<input type="text" />
								</div>
								<div>
									<label htmlFor="">{fields[13].name}</label>
									<input type="text" />
								</div>

								<button
									onClick={() => handleDeleteDiv(div.id)}
									className="delete-btn"
								>
									Delete
								</button>
							</div>
						</div>
					))}
				</div>

				{/* Visibility */}

				<div className="visibility-div">
					<div className="dropdown-div">
						<p>Visibility</p>
						<span
							onClick={handleCollapse}
							className="dropdown-btn"
							style={{
								transform: ` ${collapse ? "rotate(90deg)" : "rotate(-90deg)"}`,
								transition: "transform 0.3s ease",
							}}
						>
							{">"}
						</span>
					</div>
					<div className={`form-category ${collapse ? "hide" : "show"}`}>
						{fields.map((field) =>
							field.formCategory === "Visibility" ? (
								<div>
									<p>
										{field.name}{" "}
										{field.required ? (
											<span class="required-indicator">*</span>
										) : (
											""
										)}
									</p>
									<input type={field.type} />
								</div>
							) : (
								""
							)
						)}
					</div>
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
