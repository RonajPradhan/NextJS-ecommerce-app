import { useMutation } from "@apollo/client";
import useForm from "../lib/useForm";
import Form from "./styles/Form";
import gql from "graphql-tag";
import Error from "./ErrorMessage";

const REQUEST_RESET_MUTATION = gql`
	mutation REQUEST_RESET_MUTATION($name: String!) {
		sendUserPasswordResetLink(email: $email) {
			code
			message
		}
	}
`;

export default function RequestRequest() {
	const { inputs, handleChange, resetForm } = useForm({
		email: "",
	});
	const [requestReset, { data, loading, error }] = useMutation(
		REQUEST_RESET_MUTATION,
		{
			variables: inputs,
		}
	);
	async function handleSubmit(e) {
		e.preventDefault(); // stop the form from submitting
		const res = await requestReset().catch((e) => console.log(e.message));
		resetForm();
	}

	return (
		<Form method="POST" onSubmit={handleSubmit}>
			<h2>Request for password reset</h2>
			<Error error={error} />
			<fieldset>
				{data?.sendUserPasswordResetLink === null && (
					<p>Success - Please go to your email to find the link!</p>
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

				<button type="submit">Request Reset</button>
			</fieldset>
		</Form>
	);
}
