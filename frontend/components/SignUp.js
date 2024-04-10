import { useMutation } from "@apollo/client";
import useForm from "../lib/useForm";
import Form from "./styles/Form";
import gql from "graphql-tag";
import Error from "./ErrorMessage";

const SIGNUP_MUTATION = gql`
	mutation SIGNUP_MUTATION(
		$name: String!
		$email: String!
		$password: String!
	) {
		createUser(data: { name: $name, email: $email, password: $password }) {
			id
			email
			name
		}
	}
`;

export default function SignUp() {
	const { inputs, handleChange, resetForm } = useForm({
		name: "",
		email: "",
		password: "",
	});
	const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
		variables: inputs,
	});
	async function handleSubmit(e) {
		e.preventDefault(); // stop the form from submitting
		const res = await signup().catch((e) => console.log(e.message));
		resetForm();
	}

	return (
		<Form method="POST" onSubmit={handleSubmit}>
			<h2>Sign up for Account</h2>
			<Error error={error} />
			<fieldset>
				{data?.createUser && (
					<p>
						Signed up with {data?.currentUser?.email} - Please go
						and sign in!
					</p>
				)}
				<label htmlFor="name">
					Name
					<input
						type="text"
						name="name"
						placeholder="Your Name"
						autoComplete="name"
						value={inputs.name}
						onChange={handleChange}
					/>
				</label>
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
						placeholder="Password"
						autoComplete="password"
						value={inputs.password}
						onChange={handleChange}
					/>
				</label>
				<button type="submit">Sign Up!</button>
			</fieldset>
		</Form>
	);
}
