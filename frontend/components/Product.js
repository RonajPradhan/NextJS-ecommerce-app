import ItemStyles from "./styles/ItemStyles";
import Title from "./styles/Title";
import PriceTag from "./styles/PriceTag";
import Link from "next/link";
import formatMoney from "../lib/formatMoney";

export default function Product({ product }) {
	return (
		<ItemStyles>
			<img
				src={product?.photo?.image?.publicUrlTransformed}
				alt={product?.name}
			/>
			<Title>
				<Link href={`/product/${product?.id}`}>{product?.name}</Link>
			</Title>
			<PriceTag>{formatMoney(product?.price)}</PriceTag>
			<p>{product?.description}</p>
			{/* ToDO: Add button to edit and delete */}
		</ItemStyles>
	);
}
