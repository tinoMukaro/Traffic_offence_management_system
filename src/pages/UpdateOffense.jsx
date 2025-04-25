import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OffenseForm from '../componets/OffenseForm';

const UpdateOffense = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentOffense, setCurrentOffense] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/offenses/categories');
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
      setCategories(transformedData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate = async (offenseId, fineAmount, penaltyPoints) => {
    await axios.put(`/api/offenses/${offenseId}`, { fineAmount, penaltyPoints });
    fetchData();
  };

  const handleAdd = async (offense) => {
    await axios.post('/api/offenses', offense);
    fetchData();
  };

  const handleDelete = async (offenseId) => {
    await axios.delete(`/api/offenses/${offenseId}`);
    fetchData();
  };

  const openEditForm = (offense) => {
    setCurrentOffense(offense);
    setShowModal(true);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Traffic Offenses</h1>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Add Offense
        </button>
      </div>

      {categories.map((category) => (
        <div key={category.category_id} className="mb-8">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">{category.category_name}</h2>
          <div className="overflow-x-auto rounded shadow">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100 text-gray-700 text-left">
                <tr>
                  <th className="px-4 py-2">Description</th>
                  <th className="px-4 py-2">Fine Amount</th>
                  <th className="px-4 py-2">Penalty Points</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {category.offenses.map((offense) => (
                  <tr key={offense.offense_id} className="border-b border-gray-200">
                    <td className="px-4 py-2">{offense.offense_description}</td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        value={offense.fine_amount}
                        onChange={(e) =>
                          handleUpdate(offense.offense_id, e.target.value, offense.penalty_points)
                        }
                        className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring focus:border-blue-500"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        value={offense.penalty_points}
                        onChange={(e) =>
                          handleUpdate(offense.offense_id, offense.fine_amount, e.target.value)
                        }
                        className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring focus:border-blue-500"
                      />
                    </td>
                    <td className="px-4 py-2 flex gap-2">
                      <button
                        onClick={() => openEditForm(offense)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(offense.offense_id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* OffenseForm Modal */}
      <OffenseForm
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setCurrentOffense(null);
        }}
        onSubmit={currentOffense ? handleUpdate : handleAdd}
        offense={currentOffense}
      />
    </div>
  );
};

export default UpdateOffense;
