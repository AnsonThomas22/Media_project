import React from 'react' 
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card';

function Landing() {
    return (
        <>
            <div className="container-fluid mb-5 d-flex align-items-center" style={{height:'80vh'}}>  
                <Row>
                    <Col className='p-5' sm={12} md={6}>
                        <h2>
                            <i className="fa-brands fa-youtube fa-beat" style={{ color: "#e00b0b", }}></i>{' '}
                            Media Player 24
                        </h2>
                        <p style={{ textAlign: "justify" }}>Our media player website is designed to provide users with a personalized video experience by allowing them to add and categorize YouTube videos. With an intuitive interface and customizable options, users can create tailored playlists, organize content into categories, and enhance their overall viewing experience. Whether for entertainment, education, or curation, the platform offers flexibility and ease of use.</p>
                        <Link to={'/log'} className='btn btn-success'>Login</Link>
                    </Col>
                    <Col className='py-4' sm={12} md={6}>
                        <img src="https://cdn.pixabay.com/photo/2020/11/22/04/10/youtube-5765608_960_720.png" className='img-fluid' alt="introimg" />
                    </Col>
                </Row>
            </div>
            <div className='container-fluid mt-5'>
                <h3 className='my-3 text-center'>Features</h3>
                <div className='p-4 d-flex justify-content-around'>

                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" height={'200px'} src="https://i.gifer.com/fyFl.gif" />
                        <Card.Body>
                            <Card.Title>Upload Youtube Videos</Card.Title>
                            <Card.Text>
                            Upload YouTube videos seamlessly to the platform and categorize them for a personalized, organized viewing experience.
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top"  height={'200px'} src="https://art.pixilart.com/dde6db71a9ddc50.gif" />
                        <Card.Body>
                            <Card.Title>Add Categories</Card.Title>
                            <Card.Text>
                            Create a custom category to better organize and manage your videos
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top"  height={'200px'} src="https://i.pinimg.com/originals/88/60/c0/8860c0ee4fb6e265800445bac368f234.gif" />
                        <Card.Body>
                            <Card.Title>Watch History</Card.Title>
                            <Card.Text>
                            Access your viewing history to revisit past videos.
                            </Card.Text>
                        </Card.Body>
                    </Card>

                </div>
            </div>
        </>

    )
}

export default Landing