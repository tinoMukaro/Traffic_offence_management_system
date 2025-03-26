import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const ViewOffenses = () => {
  const [offenses, setOffenses] = useState([]);
  const [selectedOffense, setSelectedOffense] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch offenses data from the backend
  useEffect(() => {
    const fetchOffenses = async () => {
      try {
        console.log("Fetching offenses...");
        const response = await axios.get("http://localhost:5000/api/offenders/offenses/all");
        console.log("API Response:", response.data); // Log the entire response
        setOffenses(response.data.data || []); // Use response.data.data to get the array of offenses
      } catch (error) {
        console.error("Error fetching offenses:", error);
        setError("Failed to fetch offenses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOffenses();
  }, []);

  const handleViewDetails = (offense) => {
    setSelectedOffense(offense);
    setShowModal(true);
  };

  const handleClearFine = async (offenseId) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/offenders/offenses/${offenseId}/update-fine-status`,
        { newStatus: "Paid" }
      );

      if (response.data.success) {
        // Update the offenses state to reflect the change
        setOffenses((prevOffenses) =>
          prevOffenses.map((offense) =>
            offense.id === offenseId ? { ...offense, fine_status: "Paid" } : offense
          )
        );
        alert("Fine status updated to Paid.");
      } else {
        alert("Failed to update fine status.");
      }
    } catch (error) {
      console.error("Error updating fine status:", error);
      alert("Failed to update fine status. Please try again.");
    }
  };

  const handleViewOffenders = () => {
    navigate("/offenders"); // Navigate to the offenders page
  };

  if (loading) {
    return <div>Loading offenses...</div>;
  }

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  console.log("Offenses State:", offenses); // Log the offenses state

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>View Offenses</h2>
        <Button variant="primary" onClick={handleViewOffenders}>
          View Offenders
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>License Plate</th>
            <th>Offender Name</th>
            <th>Offense Type</th>
            <th>Date & Time</th>
            <th>Penalty Points</th>
            <th>Fine Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {offenses.length > 0 ? (
            offenses.map((offense) => (
              <tr key={offense.id}>
                <td>{offense.license_plate}</td>
                <td>{offense.offender_name}</td>
                <td>{offense.offense_type}</td>
                <td>{new Date(offense.offense_datetime).toLocaleString()}</td>
                <td>{offense.penalty_points}</td>
                <td>${offense.fine_amount}</td>
                <td>
                  <span
                    className={
                      offense.fine_status === "Unpaid" ? "text-danger" : "text-success"
                    }
                  >
                    {offense.fine_status}
                  </span>
                </td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => handleViewDetails(offense)}
                  >
                    View Details
                  </Button>
                  {offense.fine_status === "Pending" && (
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleClearFine(offense.id)}
                      className="ms-2"
                    >
                      Clear
                    </Button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No offenses found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal for offense details */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Offense Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOffense && (
            <div>
              <p><strong>Offender Name:</strong> {selectedOffense.offender_name}</p>
              <p><strong>License Plate:</strong> {selectedOffense.license_plate}</p>
              <p><strong>Offense Type:</strong> {selectedOffense.offense_type}</p>
              <p><strong>Date & Time:</strong> {new Date(selectedOffense.offense_datetime).toLocaleString()}</p>
              <p><strong>Penalty Points:</strong> {selectedOffense.penalty_points}</p>
              <p><strong>Fine Amount:</strong> ${selectedOffense.fine_amount}</p>
              <p><strong>Status:</strong> {selectedOffense.fine_status}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewOffenses;