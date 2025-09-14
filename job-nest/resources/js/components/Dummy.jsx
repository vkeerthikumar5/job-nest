import React, { useState, useEffect } from 'react';
import api from '../api_r';
import axios from 'axios';
export default function Dummy() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/dummy', {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`
  }
});

        console.log(res.data); // actual JSON from Laravel
        setData(res.data.info);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, []); // run once

  return (
    <div>
      <h1>Dummy Data</h1>
      
    </div>
  );
}
