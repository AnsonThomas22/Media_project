import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
    <div className='bg-light py-2 container-fluid'>
      <Row className='p-5'>
        <Col sm={12} md={5}>
        <h3>MediaPlayer 2024</h3>
        <p style={{ textAlign: 'justify' }}>
        The media player website allows users to upload and categorize YouTube videos for a personalized viewing experience. With tailored categories, users can organize content based on their preferences, enhancing discovery and ease of access. The platform integrates seamlessly with YouTube, providing a smooth, interactive interface for managing video playlists, making it user-friendly and customizable to individual tastes.   
        </p>
        
        </Col>
        <Col sm={12} md={2}>
        <h3>Links</h3>
        <div className='d-flex flex-column'>
          <Link to={'/'}>Landing</Link>
          <Link to={'/home'}>Home</Link>
          <Link to={'/his'}>Watch History</Link>
        </div>
        </Col>
        <Col sm={12} md={5}>
        <h3>Feedback</h3>
        <textarea name="" id="" className='form-control'></textarea>
        <button className='btn btn-info mt-4'>Send</button>
        </Col>       
      </Row>
      <h6 className='text-center mt-2 mb-2'>Mediaplayer 2024 &copy; All rights reserved</h6>
    </div>
    </>
  )
}

export default Footer