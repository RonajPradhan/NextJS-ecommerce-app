import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { CURRENT_USER_QUERY } from "../lib/useUser";

const SIGN_OUT_MUTATION = gql`
	mutation {
		endSession
	}
`;

export default function SignOut({ children }) {
	const [signout] = useMutation(SIGN_OUT_MUTATION, {
		refetchQueries: [{ query: CURRENT_USER_QUERY }],
	});
	return (
		<button type="button" onClick={signout}>
			Sign Out
		</button>
	);
}
