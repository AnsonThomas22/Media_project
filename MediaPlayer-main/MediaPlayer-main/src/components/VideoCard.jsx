import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { deleteVideo, addHistory } from '../services/allApis';
import { toast } from 'react-toastify';

function VideoCard({ video, cat }) {
    const [show, setShow] = useState(false);
    
    const handleDelete = async () => {
        try {
            const res = await deleteVideo(video._id); // Use the correct property for the video ID
            if (res.status === 200) {
                toast.success("Video Deleted!!");
                // You may want to refresh the video list here if applicable
            } else {
                toast.error("Failed to Delete Video!!");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while deleting the video.");
        }
    };

    const dragHandler = (e) => {
        e.dataTransfer.setData("video", JSON.stringify(video));
    };

    const handleClose = () => setShow(false);
    const handleShow = async () => {
        setShow(true);
        const dt = new Date();
        const data = {
            videoId: video.videoId,
            title: video.title,
            url: video.videoUrl,
            imageUrl: video.imageUrl,
            datetime: dt
        };
        try {
            await addHistory(data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to add video to history.");
        }
    };

    return (
        <>
            <Card style={cat ? { width: '100%' } : { width: '18rem' }} onDragStart={dragHandler} draggable>
                <Card.Img
                    style={{ cursor: 'pointer' }}
                    onClick={handleShow}
                    variant="top"
                    src={video.imageUrl}  // Ensure this is a valid image URL
                    alt={video.title}  // Provide alt text for accessibility
                />
                
                <Card.Body>
                    <Card.Title>{video?.title}</Card.Title>
                    {!cat && (
                        <Button variant="btn" onClick={handleDelete}>
                            <i className="fa-solid fa-trash" style={{ color: "#ff0000" }} />
                        </Button>
                    )}
                </Card.Body>
            </Card>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{video?.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <iframe
                        width="100%"
                        height="315"
                        src={video?.videoUrl}  // Ensure this is the correct YouTube embed URL
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default VideoCard;
