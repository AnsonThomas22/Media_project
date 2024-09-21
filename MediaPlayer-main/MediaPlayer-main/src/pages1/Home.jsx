import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Addvideo from '../components/Addvideo';
import Videos from '../components/Videos';
import Category from '../components/Category';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Home() {
  const [addResponse, setAddResponse] = useState("");
  const [username, setUsername] = useState("");
  const nav = useNavigate();

  // Check for user session on page load
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('userData'));

    if (!user) {
      toast.warning("Please log in to access the home page.");
      nav('/login'); // Redirect to login if user data is not found
    } else {
      setUsername(user?.username); // Set username if user is logged in
    }
  }, [nav]);

  // Logout function: clear session and redirect to login page
  const handleLogout = () => {
    sessionStorage.clear(); // Clear session storage
    toast.success("Logged out successfully!"); // Show success message
    nav('/login'); // Redirect to login page
  };

  return (
    <>
      {/* Top bar with welcome message and logout button */}
      <div className="d-flex justify-content-between align-items-center mx-3 my-4">
        <h2>Welcome, {username}</h2>
        <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
      </div>

      {/* Video section header */}
      <div className='d-flex justify-content-between p-4'>
        <h1>Videos</h1>
        <Link to={'/his'}>Watch History</Link>
      </div>

      {/* Main content area with videos, categories, and add video section */}
      <div className='container-fluid'>
        <Row>
          {/* Add video section */}
          <Col sm={12} md={1}>
            <Addvideo response={setAddResponse} />
          </Col>

          {/* Videos section */}
          <Col sm={12} md={8}>
            <Videos add={addResponse} />
          </Col>

          {/* Categories section */}
          <Col sm={12} md={3}>
            <Category />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Home;
