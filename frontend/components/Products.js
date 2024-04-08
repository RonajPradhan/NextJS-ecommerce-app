import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import Product from "./Product";
import styled from "styled-components";
import { perPage } from "../config";

export const ALL_PRODUCTS_QUERY = gql`
	query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int) {
		allProducts(first: $first, skip: $skip) {
			id
			name
			price
			description
			photo {
				id
				image {
					publicUrlTransformed
				}
			}
		}
	}
`;

const ProductListStyles = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 60px;
`;

export default function Products({ page }) {
	const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
		variables: {
			skip: page * perPage - perPage,
			first: perPage,
		},
	});
	console.log(data, error, loading);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;
	return (
		<div>
			<ProductListStyles>
				{data.allProducts.map((product) => (
					<Product key={product.id} product={product} />
				))}
			</ProductListStyles>
		</div>
	);
}
