import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/MyOrders.css';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if the token is in localStorage when the component mounts
    const token = localStorage.getItem('jwtToken');
    console.log('JWT Token:', token); // Log token for debugging
    if (!token) {
      setError('Please log in to view your orders');
      setLoading(false); // Stop loading as no token is found
      return; // Exit early if no token is found
    }

    // Fetch orders if token exists
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:4000/book/my-bookings', {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the header
          },
        });

        console.log('Bookings retrieved successfully:', response.data); // Log the response for debugging
        setOrders(response.data.bookings); // Set fetched orders
        setLoading(false); // Stop loading
      } catch (error) {
        setError('Failed to fetch orders. Please try again later.');
        setLoading(false); // Stop loading on error
      }
    };

    fetchOrders(); // Trigger the fetch
  }, []); // Empty dependency array, runs only once when the component mounts

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="my-orders-container">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-details">
                <h3>{order.vehicles[0].vehicleId.name}</h3>
                <p>Order ID: {order._id}</p>
                <p>Status: {order.status}</p>
                <p>Price: ${order.totalAmount}</p>
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="order-actions">
                <button className="view-details">View Details</button>
                <button className="cancel-order">Cancel Order</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
