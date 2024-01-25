import React from "react";

const InputFields = ({ fields }) => {
	return (
		<div className="grid grid-cols-3 gap-4">
			{fields.map((field) => (
				<>
					<label htmlFor="">{field.name}</label>
					<input type={field.type} />
				</>
			))}
		</div>
	);
};

export default InputFields;
