import { useState } from "react";
import useForm from "../lib/useForm";

export default function CreateProduct() {
	const { inputs, handleChange, resetForm, clearForm } = useForm({
		name: "Nice",
		price: 123,
		desription: "HEHE",
	});

	return (
		<form>
			<label>
				Name
				<input
					type="text"
					id="name"
					name="name"
					placeholder="name"
					value={inputs.name}
					onChange={handleChange}
				/>
			</label>
			<label>
				Price
				<input
					type="number"
					id="price"
					name="price"
					placeholder="price"
					value={inputs.price}
					onChange={handleChange}
				/>
			</label>

			<button type="button" onClick={clearForm}>
				Clear form
			</button>
			<button type="button" onClick={resetForm}>
				Reset form
			</button>
		</form>
	);
}
