import { useMutation } from "@apollo/client";
import useForm from "../lib/useForm";
import Form from "./styles/Form";
import gql from "graphql-tag";
import Error from "./ErrorMessage";

const RESET_MUTATION = gql`
	mutation RESET_MUTATION(
		$email: String!
		$password: String!
		$token: String!
	) {
		redeemUserPasswordResetToken(
			email: $email
			token: $token
			password: $password
		) {
			code
			message
		}
	}
`;

export default function Reset({token}) {
	const { inputs, handleChange, resetForm } = useForm({
		email: "",
		token: token,
		password: "",
	});
	const [reset, { data, loading, successfulError }] = useMutation(RESET_MUTATION, {
		variables: inputs,
	});
	async function handleSubmit(e) {
		e.preventDefault(); // stop the form from submitting
		const res = await reset().catch((e) => console.log(e.message));
		resetForm();
	}

	const error = data?.redeemUserPasswordResetToken?.code
		? data?.redeemUserPasswordResetToken
		: undefined;

	return (
		<Form method="POST" onSubmit={handleSubmit}>
			<h2>Reset your password</h2>
			<Error error={error || successfulError} />
			<fieldset>
				{data?.redeemUserPassowedResetToken === null && (
					<p>Success - You can Sign in!</p>
				)}

				<label htmlFor="email">
					Email
					<input
						type="email"
						name="email"
						placeholder="Your Email Address"
						autoComplete="email"
						value={inputs.email}
						onChange={handleChange}
					/>
				</label>
				<label htmlFor="password">
					Password
					<input
						type="password"
						name="password"
						placeholder="Your Password"
						autoComplete="password"
						value={inputs.email}
						onChange={handleChange}
					/>
				</label>

				<button type="submit">Request Reset</button>
			</fieldset>
		</Form>
	);
}
