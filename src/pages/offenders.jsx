import React, { useState, useEffect } from "react";
import { Table, Container, Form, InputGroup, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Offender = () => {
    const [offenders, setOffenders] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/api/offenders/offenders/all")
            .then((res) => res.json())
            .then((data) => {
                setOffenders(data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching offenders:", err);
                setLoading(false);
            });
    }, []);

    const filteredOffenders = offenders.filter((offender) =>
        offender.offender_name.toLowerCase().includes(search.toLowerCase()) ||
        offender.license_number.includes(search)
    );

    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4">Traffic Offenders List</h2>
            <InputGroup className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Search by name or license number..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </InputGroup>
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : (
                <div className="table-responsive">
                    <Table striped bordered hover className="text-center">
                        <thead className="table-dark">
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>License No.</th>
                                <th>License Plate</th>
                                <th>Vehicle Model</th>
                                <th>Phone Number</th>
                                <th>Total Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOffenders.length > 0 ? (
                                filteredOffenders.map((offender, index) => (
                                    <tr key={offender.license_number}>
                                        <td>{index + 1}</td>
                                        <td>{offender.offender_name}</td>
                                        <td>{offender.license_number}</td>
                                        <td>{offender.license_plate}</td>
                                        <td>{offender.vehicle_model}</td>
                                        <td>{offender.phone_number}</td>
                                        <td className={offender.total_points >= 20 ? "text-danger fw-bold" : ""}>
                                            {offender.total_points}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center text-muted">No offenders found.</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            )}
        </Container>
    );
};

export default Offender;
