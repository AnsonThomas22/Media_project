import React, { useState, useEffect } from 'react';
import { getHistory, deleteHistory } from '../services/allApis';
import { toast } from 'react-toastify';

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const result = await getHistory();
      if (result.status === 200) {
        console.log(result.data);
        setHistory(result.data);
      } else {
        console.log(result);
        toast.error("Failed to fetch history.");
      }
    } catch (error) {
      console.error('Error fetching history:', error);
      toast.error("Error fetching history.");
    }
  };

  const delHistory = async (id) => {
    try {
      const result = await deleteHistory(id);
      console.log(result);
      if (result.status === 200) {
        toast.success("History deleted successfully!");
        getData();  // Refresh the history list
      } else {
        toast.error("Failed to delete history.");
      }
    } catch (error) {
      console.error('Error deleting history:', error);
      toast.error("Error deleting history.");
    }
  };

  return (
    <div className='p-5'>
      <h2>Watch History</h2>
      {history.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Video ID</th>
              <th>Title</th>
              <th>Video URL</th>
              <th>Date and Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {history.map(item => (
              <tr key={item._id}>  {/* Ensure unique key */}
                <td>{item.videoId}</td>
                <td>{item.title}</td>
                <td>{item.url}</td>
                <td>{new Date(item.datetime).toLocaleString()}</td> {/* Format date */}
                <td>
                  <button className='btn' onClick={() => delHistory(item._id)}> {/* Use _id for deletion */}
                    <i className="fa-solid fa-trash" style={{ color: "#99b5e5" }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h2>No history available</h2>
      )}
    </div>
  );
}

export default History;
