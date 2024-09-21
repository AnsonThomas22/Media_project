import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { addCategory, getCategories, deleteCategory } from '../services/allApis';
import { toast } from 'react-toastify';
import CategoryList from './Categorylist';

function Category() {
    const [show, setShow] = useState(false);
    const [category, setCategory] = useState({ categoryId: "", title: "", videos: [] });
    const [categories, setCategories] = useState([]);

    // Fetch categories on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const result = await getCategories();
                setCategories(result.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
                toast.error("Failed to fetch categories.");
            }
        };
        fetchCategories();
    }, []);

    const handleCategory = async () => {
        console.log('Category to be added:', category);
        const { categoryId, title } = category;

        if (!categoryId || !title) {
            toast.warning("Enter valid Inputs!!");
        } else {
            try {
                const result = await addCategory(category);
                console.log('Category API Response:', result);
                if (result.status === 201) {
                    toast.success("Category Added Successfully!!");
                    handleClose();
                    setCategory({ categoryId: "", title: "", videos: [] });
                    // Refresh category list
                    const updatedCategories = await getCategories();
                    setCategories(updatedCategories.data);
                } else {
                    toast.error("Failed to Add Category!!");
                }
            } catch (error) {
                console.error('Error adding category:', error);
                toast.error("Error adding category.");
            }
        }
    };

    const handleDelete = async (id) => {
        try {
            const result = await deleteCategory(id);
            if (result.status === 200) {
                toast.success("Category Deleted Successfully!!");
                // Refresh category list
                const updatedCategories = await getCategories();
                setCategories(updatedCategories.data);
            } else {
                toast.error("Failed to Delete Category!!");
            }
        } catch (error) {
            console.error('Error deleting category:', error);
            toast.error("Error deleting category.");
        }
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className="d-grid">
                <button onClick={handleShow} className="btn btn-success">Add Category</button>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel controlId="floatingId" label="Category ID" className="mb-3">
                        <Form.Control type="number" onChange={(e) => setCategory({ ...category, categoryId: e.target.value })} placeholder="1" />
                    </FloatingLabel>
                    <FloatingLabel controlId="vtitle" label="Category Title" className="mb-3">
                        <Form.Control type="text" onChange={(e) => setCategory({ ...category, title: e.target.value })} placeholder="title" />
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCategory}>Add</Button>
                </Modal.Footer>
            </Modal>
            <CategoryList categories={categories} onDelete={handleDelete} />
        </>
    );
}

export default Category;
