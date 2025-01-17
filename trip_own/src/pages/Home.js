import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Styling for the components
const styles = {
  container: {
    padding: '40px',
  },
  vehicleContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '60px',
  },
  vehicleCard: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '0px',
    textAlign: 'center',
    width: '250px',
    height: '20rem',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginRight: '20px',
    marginBottom: '20px',
  },
  vehicleImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '4px',
    marginBottom: '10px',
  },
  button: {
    display: 'inline-block',
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
    textAlign: 'center',
  },
  loadingMessage: {
    textAlign: 'center',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  noVehiclesMessage: {
    textAlign: 'center',
    fontSize: '18px',
    color: 'gray',
  }
};

const Home = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch vehicle data from the backend
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch('http://localhost:4000/vehicles/get');
        if (!response.ok) {
          console.warn('Failed to fetch data:', response.statusText);
          return;
        }
        const result = await response.json();
        if (result.data && Array.isArray(result.data)) {
          setVehicles(result.data);
        } else {
          console.warn('Unexpected API response structure:', result);
        }
      } catch (err) {
        console.error('Error fetching vehicles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  if (loading) {
    return <div style={styles.loadingMessage}>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.vehicleContainer}>
        {vehicles.length === 0 ? (
          <p style={styles.noVehiclesMessage}>No vehicles available at the moment.</p>
        ) : (
          vehicles.map((vehicle) => (
            <div key={vehicle._id} style={styles.vehicleCard}>
              <img
                src={vehicle.photourl}
                alt={vehicle.name}
                style={styles.vehicleImage}
              />
              <h3>{vehicle.name}</h3>
              <p>Vehicle Number: {vehicle.vehicle_number}</p>
              <p>Price/Day: ₹{vehicle.price_of_rent_per_day}</p>
              <Link to={`/booking/${vehicle._id}`} style={styles.button}>
                Book Now
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
