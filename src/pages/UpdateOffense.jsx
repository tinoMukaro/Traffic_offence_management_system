import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';
import OffenseForm from '../components/OffenseForm';

const UpdateOffense = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentOffense, setCurrentOffense] = useState(null);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/offenses/categories');
        console.log('API Response:', response.data);

        // Transform the data
        const transformedData = response.data.reduce((acc, offense) => {
          const category = acc.find((cat) => cat.category_id === offense.category_id);
          if (category) {
            category.offenses.push({
              offense_id: offense.offense_id,
              offense_description: offense.offense_description,
              fine_amount: offense.fine_amount,
              penalty_points: offense.penalty_points,
            });
          } else {
            acc.push({
              category_id: offense.category_id,
              category_name: offense.category_name,
              offenses: [
                {
                  offense_id: offense.offense_id,
                  offense_description: offense.offense_description,
                  fine_amount: offense.fine_amount,
                  penalty_points: offense.penalty_points,
                },
              ],
            });
          }
          return acc;
        }, []);

        console.log('Transformed Data:', transformedData);
        setCategories(transformedData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setCategories([]); // Set categories to an empty array to avoid errors
      }
    };

    fetchData();
  }, []);

  // Handle updating an offense
  const handleUpdate = async (offenseId, fineAmount, penaltyPoints) => {
    await axios.put(`/api/offenses/${offenseId}`, { fineAmount, penaltyPoints });
    fetchData(); // Refetch data after updating
  };

  // Handle adding an offense
  const handleAdd = async (offense) => {
    await axios.post('/api/offenses', offense);
    fetchData(); // Refetch data after adding
  };

  // Handle deleting an offense
  const handleDelete = async (offenseId) => {
    await axios.delete(`/api/offenses/${offenseId}`);
    fetchData(); // Refetch data after deleting
  };

  // Open the form for editing
  const openEditForm = (offense) => {
    setCurrentOffense(offense); // Set the current offense to edit
    setShowModal(true); // Open the modal
  };

  return (
    <div className="container mt-4">
      <h1>Manage Traffic Offenses</h1>
      <Button onClick={() => setShowModal(true)}>Add Offense</Button>
      {categories && categories.map((category) => (
        <div key={category.category_id}>
          <h2>{category.category_name}</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Description</th>
                <th>Fine Amount</th>
                <th>Penalty Points</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {category.offenses && category.offenses.map((offense) => (
                <tr key={offense.offense_id}>
                  <td>{offense.offense_description}</td>
                  <td>
                    <input
                      type="text"
                      value={offense.fine_amount}
                      onChange={(e) => handleUpdate(offense.offense_id, e.target.value, offense.penalty_points)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={offense.penalty_points}
                      onChange={(e) => handleUpdate(offense.offense_id, offense.fine_amount, e.target.value)}
                    />
                  </td>
                  <td>
                    <Button variant="warning" onClick={() => openEditForm(offense)}>Edit</Button>
                    <Button variant="danger" onClick={() => handleDelete(offense.offense_id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ))}
      {/* OffenseForm Modal */}
      <OffenseForm
        show={showModal}
        onHide={() => setShowModal(false)}
        onSubmit={currentOffense ? handleUpdate : handleAdd}
        offense={currentOffense}
      />
    </div>
  );
};

export default UpdateOffense;