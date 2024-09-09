// src/components/BikeList.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { BikeDTO } from "../../generate/models/BikeDTO";
import BikeUpdateForm from "./BikeUpdate"
import BikeCreateForm from "./BikeCreate"

const apiUrl = 'http://localhost:5119'; // process.env.REACT_APP_API_URL

function BikeList() {
  const [bikes, setBikes] = useState<BikeDTO[]>([]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/bikes`)
      .then((response) => {
        setBikes(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the bikes!", error);
      });
  }, []);

  return (
    <div>
      <h1>Bike List</h1>
      <ul>
        {bikes.map((bike) => (
          <li key={bike.id}>
            <BikeUpdateForm initialBike={bike} />
          </li>
        ))}
        {<BikeCreateForm />}
      </ul>
    </div>
  );
}

export default BikeList;
