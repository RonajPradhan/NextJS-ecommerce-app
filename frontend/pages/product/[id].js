import SingleProduct from "../../components/SingleProduct";

export default function SingleProductPage({ query }) {
	console.log(query);
	return (
		<>
			<h1>Product</h1>
			<SingleProduct id={query?.id} />
		</>
	);
}
