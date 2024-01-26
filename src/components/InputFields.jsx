import React, { useState } from "react";

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

	const validateInput = (value, setInputValue, setErrorMessage) => {
		const numericValue = value.replace(/[^0-9]/g, "");
		setInputValue(numericValue);

		if (numericValue !== "" && isNaN(numericValue)) {
			setErrorMessage("Please enter a valid number.");
		} else {
			setErrorMessage("");
		}
	};

	const validatePAN = (value) => {
		const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

		if (value.length < 10) {
			setPANError(fields[2].lengtherrormsg);
			setShowCheck(false);
		} else if (!panRegex.test(value)) {
			setPANError(fields[2].regexerrormsg);
			console.log(panError);
			setShowCheck(false);
		} else {
			setPANError("");
			setShowCheck(true);
		}

		setPANValue(value.toUpperCase());
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
	};

	const handleSubmit = (event) => {
		event.preventDefault();
	};

	return (
		<div className="input-fields px-100">
			<form
				action=""
				className="grid grid-cols-3 gap-4"
				onSubmit={handleSubmit}
			>
				{/* Row 1 */}

				<div>
					<div class="full-input">
						<label for="leads">{fields[0].name}</label>
						<select id="leads" name="leads" required={fields[0].required}>
							{fields[0].options.map((option) => (
								<option value={option.value} key={option.key}>
									{option.value}
								</option>
							))}
						</select>
					</div>

					<div class="full-input">
						<label for="corpId">{fields[1].name}</label>
						<input
							type="text"
							name="corpId"
							required={fields[1].required}
						></input>
					</div>

					<div class="full-input pan-input">
						<div>
							<label for="panNo">{fields[2].name}</label>
							<input
								type="text"
								name="panNo"
								required={fields[2].required}
								value={panValue}
								onChange={(e) => validatePAN(e.target.value)}
							></input>
						</div>
						<div>
							<p> {showCheck ? "correct" : ""}</p>

							<p style={{ color: "red" }}>{panError}</p>
						</div>
					</div>
				</div>

				{/* Row 2   */}

				<div>
					<div class="full-input">
						<label for="number1">{fields[3].name}</label>
						<input
							value={input1Value}
							type="text"
							name="number1"
							required={fields[3].required}
							onChange={(e) =>
								validateInput(e.target.value, setInput1Value, setErrorMessage1)
							}
						></input>
					</div>

					<div class="full-input">
						<label for="number2">{fields[4].name}</label>
						<input
							value={input2Value}
							type="text"
							name="number2"
							required={fields[4].required}
							onChange={(e) =>
								validateInput(e.target.value, setInput2Value, setErrorMessage2)
							}
						></input>
					</div>

					<div class="full-input">
						<label for="number3">{fields[5].name}</label>
						<p className="addition-result">
							{parseInt(input1Value) + parseInt(input2Value)}
						</p>
					</div>
				</div>

				{/* Row 3 */}
				<div>
					<div class="full-input" style={{ flex: 1 }}>
						<label for="trade">{fields[6].name}</label>
						<input
							type="text"
							name="trade"
							required={fields[1].required}
						></input>
					</div>

					<div class="full-input " style={{ flex: `${fields[7].columncount}` }}>
						<label for="address">{fields[7].name}</label>
						<input
							type="text"
							name="address"
							required={fields[1].required}
						></input>
					</div>
				</div>

				<div className="row-4">
					<div className="checkbox">
						<input type="checkbox" />
						<label htmlFor="">Send a copy to your email</label>
					</div>

					<div>
						<p>{fields[8].name}</p>
						{fields[8].options.map((option) => (
							<div className="radio-option">
								<input
									type="radio"
									value={option.value}
									name={fields[8].name}
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

				<div className="r-field-div">
					<button className="add-btn" onClick={handleAddDiv}>
						+
					</button>
					{divs.map((div) => (
						<div key={div.id} className="r-field-item">
							<div className="r-field-list">
								<p>{div.id}</p>
								<div>
									<label htmlFor="">{fields[10].name}</label>
									<input type="text" required />
								</div>
								<div>
									<label htmlFor="">{fields[11].name}</label>
									<input type="text" />
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
			</form>
		</div>
	);
};

export default InputFields;
