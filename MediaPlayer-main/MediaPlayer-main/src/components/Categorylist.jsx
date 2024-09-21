import React, { useState, useEffect } from 'react';
import { getCategories, deleteCategory, updateCategory } from '../services/allApis';
import { toast } from 'react-toastify';
import VideoCard from './VideoCard';

function CategoryList({ response }) {
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        getData();
    }, [response]);

    const getData = async () => {
        try {
            const result = await getCategories();
            if (result.status === 200) {
                setCategoryList(result.data);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
            toast.error("Failed to fetch categories.");
        }
    };

    const deleteCat = async (id) => {
        try {
            const result = await deleteCategory(id);
            if (result.status === 200) {
                toast.success("Category deleted successfully!");
                getData();
            } else {
                toast.error("Failed to delete category.");
            }
        } catch (error) {
            console.error('Error deleting category:', error);
            toast.error("Error deleting category.");
        }
    };

    const dragHandler = async (e, category) => {
        e.preventDefault();
        const vid = JSON.parse(e.dataTransfer.getData("video"));
        if (!category.videos.some(video => video.videoId === vid.videoId)) { // Prevent duplicate videos
            category.videos.push(vid);
            try {
                const result = await updateCategory(category._id, category); // Use _id if that's your identifier
                if (result.status === 200) {
                    toast.success(`${vid.title} video added to ${category.title}`);
                    getData();
                } else {
                    toast.error("Failed to add video to category.");
                }
            } catch (error) {
                console.error('Error updating category:', error);
                toast.error("Failed to add video to category.");
            }
        } else {
            toast.warning("Video already exists in this category.");
        }
    };

    const dragOverHandler = (e) => {
        e.preventDefault();
    };

    return (
        <div className='container-fluid border border-3 border-light p-4 mt-3'>
            {categoryList.length > 0 ? (
                <div>
                    {categoryList.map(item => (
                        <div key={item._id} className='border m-1'>
                            <div className='m-2 p-3 d-flex justify-content-between' 
                                 onDragOver={dragOverHandler} 
                                 onDrop={(e) => dragHandler(e, item)}>
                                <h3>{item.title}</h3>
                                <button className='btn' onClick={() => deleteCat(item._id)}>
                                    <i className="fa-solid fa-trash" style={{ color: "#2a7dd5" }} />
                                </button>
                            </div>
                            <div className='border border-light'>
                                {item.videos && item.videos.length > 0 && item.videos.map(vid => (
                                    <VideoCard key={vid.videoId} video={vid} cat={true} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <h2>No Categories</h2>
            )}
        </div>
    );
}

export default CategoryList;
