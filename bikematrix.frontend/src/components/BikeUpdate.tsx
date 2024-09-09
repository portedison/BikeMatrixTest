import React, { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { Bike } from "../../generate/models/Bike";

const apiUrl = "http://localhost:5119"; // process.env.REACT_APP_API_URL

interface UpdateBikeFormProps {
  initialBike: Bike;
}

function UpdateBikeForm({ initialBike }: UpdateBikeFormProps) {
  const [bike, setBike] = useState<Bike>(initialBike);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBike((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOwnerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBike((prevState) => ({
      ...prevState,
      owner: { ...prevState.owner, [name]: value },
    }));
  };

  const handleBrandChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBike((prevState) => ({
      ...prevState,
      brand: { ...prevState.brand, [name]: value },
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    axios
      .put(`${apiUrl}/api/bikes/${bike.id}`, bike)
      .then(() => {
        alert("Bike updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating bike:", error);
      });
  };

  // const handleDelete = () => {
  //   axios
  //     .delete(`${apiUrl}/api/bikes/${bike.id}`)
  //     .then(() => {
  //       alert("Bike deleted successfully!");
  //     })
  //     .catch((error) => {
  //       console.error("Error deleting bike:", error);
  //     });
  // };

  return (
    <form onSubmit={handleSubmit}>
      <h2>
        Update Bike <br />
        {bike.id}
      </h2>

      <div>
        <label>Model</label>
        <input type='text' name='model' value={bike.model || ""} onChange={handleChange} required />
      </div>

      <div>
        <label>Year</label>
        <input type='number' name='year' value={bike.year} onChange={handleChange} required />
      </div>

      <div>
        <label>Owner Email</label>
        <input
          type='email'
          name='email'
          value={bike.owner?.email || ""}
          onChange={handleOwnerChange}
          required
        />
      </div>

      <div>
        <label>Brand Name</label>
        <input
          type='text'
          name='name'
          value={bike.brand?.name || ""}
          onChange={handleBrandChange}
          required
        />
      </div>

      <button type='submit'>Update Bike</button>

      {/* <button type='button' onClick={handleDelete}>
        Delete Bike
      </button> */}
    </form>
  );
}

export default UpdateBikeForm;
