import { useEffect, useState } from "react";
import Header from "./components/Header";
import InputFields from "./components/InputFields";
import axios from "axios";

function App() {
	const [fields, setFields] = useState([]);

	useEffect(() => {
		axios
			.get(
				"https://gist.githubusercontent.com/HarishTeens/c80fd8211d43b0ef26eadcef09548704/raw/gistfile1.txt"
			)
			.then((res) => {
				setFields(res.data.formData);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div>
			<Header />
			<InputFields fields={fields} />
		</div>
	);
}

export default App;
