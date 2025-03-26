// src/components/OffenseForm.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const OffenseForm = ({ show, onHide, onSubmit, offense }) => {
  const [offenseDescription, setOffenseDescription] = useState('');
  const [fineAmount, setFineAmount] = useState('');
  const [penaltyPoints, setPenaltyPoints] = useState('');
  const [categoryId, setCategoryId] = useState('');

  // Pre-fill the form if editing an offense
  useEffect(() => {
    if (offense) {
      setOffenseDescription(offense.offense_description);
      setFineAmount(offense.fine_amount);
      setPenaltyPoints(offense.penalty_points);
      setCategoryId(offense.category_id);
    } else {
      setOffenseDescription('');
      setFineAmount('');
      setPenaltyPoints('');
      setCategoryId('');
    }
  }, [offense]);

  const handleSubmit = () => {
    onSubmit({
      offenseDescription,
      fineAmount,
      penaltyPoints,
      categoryId,
    });
    onHide(); // Close the modal
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{offense ? 'Edit Offense' : 'Add Offense'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={offenseDescription}
              onChange={(e) => setOffenseDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Fine Amount</Form.Label>
            <Form.Control
              type="text"
              value={fineAmount}
              onChange={(e) => setFineAmount(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Penalty Points</Form.Label>
            <Form.Control
              type="number"
              value={penaltyPoints}
              onChange={(e) => setPenaltyPoints(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Category ID</Form.Label>
            <Form.Control
              type="number"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button variant="primary" onClick={handleSubmit}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OffenseForm;