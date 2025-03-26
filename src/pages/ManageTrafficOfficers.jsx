import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Table, Form } from "react-bootstrap";
import axios from "axios"; 

const ManageTrafficOfficers = () => {
    const [showDelete, setShowDelete] = useState(false); 
    const [search, setSearch] = useState("");
    const [officers, setOfficers] = useState([]); 
    const [selectedOfficer, setSelectedOfficer] = useState(null); // State to track the selected officer for actions
    const navigate = useNavigate();

    // Fetch all traffic officers from the API
    useEffect(() => {
        const fetchOfficers = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/officers/"); // 
                setOfficers(response.data);
            } catch (error) {
                console.error("Error fetching officers:", error);
            }
        };

        fetchOfficers();
    }, []);

    // Filter officers based on search input
    const filteredOfficers = officers.filter((officer) =>
        officer.name.toLowerCase().includes(search.toLowerCase()) ||
        officer.badge_number.toLowerCase().includes(search.toLowerCase())
    );

    // Handle delete action
    const handleDelete = async () => {
        if (selectedOfficer) {
            try {
                await axios.delete(`http://localhost:5000/api/officers/${selectedOfficer.id}`); 
                setShowDelete(false);
                // Refresh the officers list
                const response = await axios.get("http://localhost:5000/api/officers/");
                setOfficers(response.data);
            } catch (error) {
                console.error("Error deleting officer:", error);
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2>Manage Traffic Officers</h2>

            <div className="d-flex justify-content-between mb-3">
                <Form.Control
                    type="text"
                    placeholder="Search officers..."
                    className="w-50"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button variant="primary" onClick={() => navigate('/officer-register')}>Add Officer</Button>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Badge Number</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOfficers.map((officer) => (
                        <tr key={officer.id}>
                            <td>{officer.badge_number}</td>
                            <td>{officer.name}</td>
                            <td>{officer.email}</td>
                            <td>
                                <span className={`badge bg-${officer.status === "Active" ? "success" : "danger"}`}>
                                    {officer.status || "Active"} {/* Default to "Active" if status is not set */}
                                </span>
                            </td>
                            <td>
                                <Button
                                    variant="danger"
                                    onClick={() => {
                                        setSelectedOfficer(officer);
                                        setShowDelete(true);
                                    }}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Delete Officer Modal */}
            <Modal show={showDelete} onHide={() => setShowDelete(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Officer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this officer?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleDelete}>Delete</Button>
                    <Button variant="secondary" onClick={() => setShowDelete(false)}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export { ManageTrafficOfficers };