import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import { CURRENT_USER_QUERY } from './User';
import Error from './'

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

export default function SignIn() {
  const { inputs, handleChange, resetform } = useForm({
    email: '',
    password: '',
  });

  const [signin, { data, error, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
    // refetch the currently logged in user
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signin();
    console.log(res);
    resetform();
    // Send the email and password to graphAPI server
  };

  return (
    <Form method="POST">
      <h2>Sign Into Your Account</h2>
      <Error
        error={
          data?.authenticatedUserWithPassword?.UserAuthenticationPasswordFailure
        }
      />
      <fieldset>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Your email Address"
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
            placeholder="Your password Address"
            autoComplete="email"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="button" onClick={(e) => handleSubmit()}>
          Submit
        </button>
      </fieldset>
    </Form>
  );
}
