import PropTypes from 'prop-types';
import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useEffect, useState } from 'react';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';
import useForm from '../lib/useForm';

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      price
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`;

export default function UpdateProduct({ id }) {
  // 1. We need to ge the existing product
  const { data, loading, error } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: {
      id,
    },
  });

  // 2. We need to get the mutation to update the product.
  const [
    updateProduct,
    { data: updateData, loading: updateLoading, error: updateError },
  ] = useMutation(UPDATE_PRODUCT_MUTATION);

  // 3. We need the form to handle the updates.
  const { inputs, handleOnChange, clearForm, resetform } = useForm({
    name: data?.Product?.name,
    price: data?.Product?.price,
    description: data?.Product?.description,
  });

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const res = await updateProduct({
      variables: {
        id,
        name: inputs.name,
        description: inputs.description,
        price: inputs.price,
      },
    }).catch(console.log(error));
    console.log(res);
    // clearForm();
  };

  return (
    <Form onSubmit={handleOnSubmit}>
      <DisplayError error={updateError || error} />
      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
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
        <button type="submit">Update Product</button>
      </fieldset>
    </Form>
  );
}

UpdateProduct.propTypes = {
  id: PropTypes.string,
};
