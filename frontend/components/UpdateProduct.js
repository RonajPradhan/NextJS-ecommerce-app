import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import useForm from "../lib/useForm";
import Form from "./styles/Form";
import DisplayError from "./ErrorMessage";

import Router from "next/router";

const SINGLE_PRODUCT_QUERY = gql`
	query SINGLE_PRODUCT_QUERY($id: ID!) {
		Product(where: { id: $id }) {
			id
			name
			description
			price
		}
	}
`;

const UPDATE_PRODUCT_MUTATION = gql`
	mutation UPDATE_PRODUCT_MUTATION(
		$id: ID!
		$name: String
		$description: String
		$price: Int
	) {
		updateProduct(
			id: $id
			data: { name: $name, description: $description, price: $price }
		) {
			id
			name
			description
			price
		}
	}
`;

export default function UpdateProduct({ id }) {
	const { data, loading, error } = useQuery(SINGLE_PRODUCT_QUERY, {
		variables: { id },
	});

	const [
		updateProduct,
		{ data: updateData, error: updateError, loading: updateLoading },
	] = useMutation(UPDATE_PRODUCT_MUTATION);

	const { inputs, handleChange, resetForm, clearForm } = useForm(
		data?.Product
	);

	if (loading) return <p>Loading...</p>;

	const handleSubmit = async (e) => {
		e.preventDefault();
		const res = await updateProduct({
			variables: {
				id,
				name: inputs.name,
				price: inputs.price,
				description: inputs.description,
			},
		}).catch((err) => console.log(err));
		console.log(res);
	};

	return (
		<Form onSubmit={(e) => handleSubmit(e)}>
			<DisplayError error={error || updateError} />
			<fieldset disabled={updateLoading} aria-busy={updateLoading}>
				<label htmlFor="name">
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
				<label htmlFor="price">
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
				<label htmlFor="Description">
					Description
					<textarea
						type="text"
						id="description"
						name="description"
						placeholder="description"
						value={inputs.description}
						onChange={handleChange}
					/>
				</label>

				<button type="submit">+ Update Product</button>
			</fieldset>
		</Form>
	);
}
