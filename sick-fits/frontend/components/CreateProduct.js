import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Router from 'next/router';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';
import { ALL_PRODUCTS_QUERY } from './Products';

export default function CreateProduct() {
  const { inputs, handleOnChange, clearForm, resetform } = useForm({
    image: '',
    name: '',
    price: 0,
    description: '',
  });

  const CREATE_PRODUCT_MUTATION = gql`
    mutation CREATE_PRODUCT_MUTATION(
      # Which variables are getting passed in? And What types are they
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

  const [createProduct, { data, loading, error }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      refetchQueries: [{ queries: ALL_PRODUCTS_QUERY }],
    }
  );

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const res = await createProduct();
    clearForm();
    // Redirect to product after successful submission
    Router.push({
      pathname: `/product/${res.data.createProduct.id}`,
    });
  };

  return (
    <Form onSubmit={handleOnSubmit}>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="image">
          Image
          <input
            required
            type="file"
            id="image"
            name="image"
            onChange={handleOnChange}
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            placeholder="Name"
            name="name"
            value={inputs.name}
            onChange={handleOnChange}
          />
        </label>

        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            placeholder="Price"
            name="price"
            value={inputs.price}
            onChange={handleOnChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            type="text"
            id="description"
            placeholder="Description"
            name="description"
            value={inputs.description}
            onChange={handleOnChange}
          />
        </label>
        <button type="submit">+ Add Product</button>
      </fieldset>
    </Form>
  );
}
