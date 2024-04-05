import { useState } from "react";
import useForm from "../lib/useForm";
import Form from "./styles/Form";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import DisplayError from "./ErrorMessage";
import { ALL_PRODUCTS_QUERY } from "./Products";
import Router from "next/router";

const CREATE_PRODUCT_MUTATION = gql`
	mutation CREATE_PRODUCT_MUTATION(
		# which variables are getting passed in? nad what are they
		$name: String!
		$description: String!
		$price: Int!
		$image: Upload
	) {
		createProduct(
			data: {
				name: $name
				description: $description
				price: $price
				status: "AVAILABLE"
				photo: { create: { image: $image, altText: $name } }
			}
		) {
			id
			price
			description
			name
		}
	}
`;

export default function CreateProduct() {
	const { inputs, handleChange, resetForm, clearForm } = useForm({
		image: "",
		name: "Nice",
		price: 123,
		description: "HEHE",
	});

	const [createProduct, { loading, error, data }] = useMutation(
		CREATE_PRODUCT_MUTATION,
		{
			variables: inputs,
			refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
		}
	);

	const handleSubmit = async (e) => {
		e.preventDefault();
		let res = await createProduct();
		// Go to that products page
        Router.push({
            pathname: `product/${res.data.createProduct.id}`
        })
	};

	return (
		<Form onSubmit={(e) => handleSubmit(e)}>
			<DisplayError error={error} />
			<fieldset disabled={loading} aria-busy={loading}>
				<label htmlFor="image">
					Image
					<input
						required
						type="file"
						id="image"
						name="image"
						onChange={handleChange}
					/>
				</label>
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

				<button type="submit">+ Add Product</button>
			</fieldset>
		</Form>
	);
}
