// src/components/BikeForm.js

import React, { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { BikeDTO } from "../../generate/models/BikeDTO";

const apiUrl = 'http://localhost:5119'; // process.env.REACT_APP_API_URL

function BikeCreateForm() {
  const [bike, setBike] = useState<BikeDTO | undefined>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBike((prevState) => ({
      ...prevState!,
      [name]: value,
    }));
  };

  const handleOwnerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBike((prevState) => ({
      ...prevState!,
      owner: { ...prevState?.owner, [name]: value },
    }));
  };

  const handleBrandChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBike((prevState) => ({
      ...prevState!,
      brand: { ...prevState?.brand, [name]: value },
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(`${apiUrl}/api/bikes`, bike)
      .then((response) => {
        alert("Bike created successfully!");
      })
      .catch((error) => {
        console.error("There was an error creating the bike!", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Bike</h2>
      <div>
        <label>Model:</label>
        <input type='text' name='model' defaultValue={bike?.model || ''} onChange={handleChange} required />
      </div>
      <div>
        <label>Year:</label>
        <input type='number' name='year' value={bike?.year || ''} onChange={handleChange} required />
      </div>
      <div>
        <label>Email:</label>
        <input
          type='email'
          name='email'
          value={bike?.owner?.email || ''}
          onChange={handleOwnerChange}
          required
        />
      </div>
      <div>
        <label>Brand Name:</label>
        <input
          type='text'
          name='name'
          value={bike?.brand?.name || ''}
          onChange={handleBrandChange}
          required
        />
      </div>
      <button type='submit'>Create Bike</button>
    </form>
  );
}

export default BikeCreateForm;
