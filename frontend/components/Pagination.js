import PaginationStyles from "./styles/PaginationStyles";
import Head from "next/head";
import Link from "next/link";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import DisplayError from "./ErrorMessage";
import { perPage } from "../config";
import { useEffect } from "react";

export const PAGINATION_QUERY = gql`
	query PAGINATION_QUERY {
		_allProductsMeta {
			count
		}
	}
`;

export default function Pagination({ page }) {
	const { data, loading, error } = useQuery(PAGINATION_QUERY);
	if (loading) return "Loading";
	if (error) return <DisplayError error={error} />;

	const { count } = data?._allProductsMeta;

	const pageCount = Math.ceil(count / perPage);

	return (
		<PaginationStyles>
			<Head>
				<title>Sleek fits | Page {page} of _</title>
			</Head>
			<Link href={`/products/${page - 1}`}>
				<a aria-disabled={page <= 1}>Prev</a>
			</Link>
			<p>
				Page {page} of {pageCount}
			</p>
			<p>{count} Items Total</p>
			<Link href={`/products/${page + 1}`}>
				<a aria-disabled={page >= pageCount}>Next</a>
			</Link>
		</PaginationStyles>
	);
}
