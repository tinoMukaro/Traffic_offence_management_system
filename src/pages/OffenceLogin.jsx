import React, { useState, useEffect } from "react";

const OffenseLogging = () => {
  const [formData, setFormData] = useState({
    issuing_authority: "ZRP Traffic Department",
    offense_datetime: "", 
    location: "", 
    offender_name: "",
    license_number: "",
    phone_number: "",
    license_plate: "",
    vehicle_model: "",
    offense_type: "",
    offense_description: "",
    fine_amount: 0,
    penalty_points: 0,
    officer_name: "",
    badge_number: "",
  });

  const [offenses, setOffenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  // Fetch offenses from the backend
  useEffect(() => {
    fetch("http://localhost:5000/api/offenses")
      .then((res) => res.json())
      .then((data) => setOffenses(data))
      .catch((error) => console.error("Error fetching offenses:", error));
  }, []);

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear validation error for the field being updated
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  // Handle offense selection
  const handleOffenseChange = (e) => {
    const selectedOffenseId = e.target.value;

    // Find the selected offense
    const selectedOffense = offenses.find(
      (offense) => offense.id === parseInt(selectedOffenseId)
    );

    if (selectedOffense) {
      setFormData({
        ...formData,
        offense_type: selectedOffense.offense_description, // Update offense_type with the description
        fine_amount: selectedOffense.fine_amount,
        penalty_points: selectedOffense.penalty_points,
      });
    }
  };

  // Validate form fields
  const validateForm = () => {
    const errors = {};
    const requiredFields = [
      "offense_datetime",
      "location",
      "offender_name",
      "license_number",
      "phone_number",
      "license_plate",
      "vehicle_model",
      "offense_type",
      "offense_description",
      "officer_name",
      "badge_number",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        errors[field] = "This field is required";
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate form before submission
    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      // Map form data to backend schema
      const backendData = {
        ...formData,
        offense_datetime: formData.offense_datetime,
        location: formData.location,
        penalty_points: formData.penalty_points || 0,
      };


      const response = await fetch("http://localhost:5000/api/offenders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(backendData),
        
      });
      const responseData = await response.json();

      if (response.ok) {
        alert("Offense logged successfully!");
        // Reset form
        setFormData({
          issuing_authority: "ZRP Traffic Department",
          offense_datetime: "",
          location: "",
          offender_name: "",
          license_number: "",
          phone_number: "",
          license_plate: "",
          vehicle_model: "",
          offense_type: "",
          offense_description: "",
          fine_amount: 0,
          penalty_points: 0,
          officer_name: "",
          badge_number: "",
        });
        setValidationErrors({}); // Clear validation errors
      } else {
        alert(`Failed to log offense: ${responseData.message}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to log offense. Please try again.");
    }

    setLoading(false);
  };

  // Handle form reset
  const handleReset = () => {
    setFormData({
      issuing_authority: "ZRP Traffic Department",
      offense_datetime: "",
      location: "",
      offender_name: "",
      license_number: "",
      phone_number: "",
      license_plate: "",
      vehicle_model: "",
      offense_type: "",
      offense_description: "",
      fine_amount: 0,
      penalty_points: 0,
      officer_name: "",
      badge_number: "",
    });
    setValidationErrors({}); // Clear validation errors
  };

  return (
    <div className="container mt-5">
      <h2>Log Traffic Offense</h2>
      <form onSubmit={handleSubmit}>
        {/* Header Information */}
        <div className="card mb-4">
          <div className="card-header">Ticket information</div>
          <div className="card-body">
            <div className="mb-3">
              <label className="form-label">Issuing Authority</label>
              <input
                type="text"
                className="form-control"
                name="issuing_authority"
                value={formData.issuing_authority}
                readOnly
              />
            </div>
            
            <div className="mb-3">
              <label className="form-label">Date & Time of Issue</label>
              <input
                type="datetime-local"
                className={`form-control ${validationErrors.offense_datetime ? "is-invalid" : ""}`}
                name="offense_datetime"
                value={formData.offense_datetime}
                onChange={handleChange}
                required
              />
              {validationErrors.offense_datetime && (
                <div className="invalid-feedback">{validationErrors.offense_datetime}</div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Location of Offense</label>
              <input
                type="text"
                className={`form-control ${validationErrors.location ? "is-invalid" : ""}`}
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
              {validationErrors.location && (
                <div className="invalid-feedback">{validationErrors.location}</div>
              )}
            </div>
          </div>
        </div>

        {/* Offender Details */}
        <div className="card mb-4">
          <div className="card-header">Offender Details</div>
          <div className="card-body">
            <div className="mb-3">
              <label className="form-label">Driver’s Name</label>
              <input
                type="text"
                className={`form-control ${validationErrors.offender_name ? "is-invalid" : ""}`}
                name="offender_name"
                value={formData.offender_name}
                onChange={handleChange}
                required
              />
              {validationErrors.offender_name && (
                <div className="invalid-feedback">{validationErrors.offender_name}</div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Driver’s License Number</label>
              <input
                type="text"
                className={`form-control ${validationErrors.license_number ? "is-invalid" : ""}`}
                name="license_number"
                value={formData.license_number}
                onChange={handleChange}
                required
              />
              {validationErrors.license_number && (
                <div className="invalid-feedback">{validationErrors.license_number}</div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Driver’s Phone Number</label>
              <input
                type="text"
                className={`form-control ${validationErrors.phone_number ? "is-invalid" : ""}`}
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                required
              />
              {validationErrors.phone_number && (
                <div className="invalid-feedback">{validationErrors.phone_number}</div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">License Plate Number</label>
              <input
                type="text"
                className={`form-control ${validationErrors.license_plate ? "is-invalid" : ""}`}
                name="license_plate"
                value={formData.license_plate}
                onChange={handleChange}
                required
              />
              {validationErrors.license_plate && (
                <div className="invalid-feedback">{validationErrors.license_plate}</div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Vehicle Model</label>
              <input
                type="text"
                className={`form-control ${validationErrors.vehicle_model ? "is-invalid" : ""}`}
                name="vehicle_model"
                value={formData.vehicle_model}
                onChange={handleChange}
                required
              />
              {validationErrors.vehicle_model && (
                <div className="invalid-feedback">{validationErrors.vehicle_model}</div>
              )}
            </div>
          </div>
        </div>

        {/* Offense Details */}
        <div className="card mb-4">
          <div className="card-header">Offense Details</div>
          <div className="card-body">
            <div className="mb-3">
              <label className="form-label">Type of Violation</label>
              <select
                className={`form-control ${validationErrors.offense_type ? "is-invalid" : ""}`}
                name="offense_type"
                value={
                  offenses.find((offense) => offense.offense_description === formData.offense_type)?.id || ""
                }
                onChange={handleOffenseChange}
                required
              >
                <option value="">Select Offense</option>
                {offenses.map((offense) => (
                  <option key={offense.id} value={offense.id}>
                    {offense.offense_description}
                  </option>
                ))}
              </select>
              {validationErrors.offense_type && (
                <div className="invalid-feedback">{validationErrors.offense_type}</div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Description of Offense</label>
              <textarea
                className={`form-control ${validationErrors.offense_description ? "is-invalid" : ""}`}
                name="offense_description"
                value={formData.offense_description}
                onChange={handleChange}
                required
              />
              {validationErrors.offense_description && (
                <div className="invalid-feedback">{validationErrors.offense_description}</div>
              )}
            </div>
          </div>
        </div>

        {/* Penalty & Payment Information */}
        <div className="card mb-4">
          <div className="card-header">Penalty & Payment Information</div>
          <div className="card-body">
            <div className="mb-3">
              <label className="form-label">Fine Amount</label>
              <input
                type="number"
                className="form-control"
                name="fine_amount"
                value={formData.fine_amount}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Penalty Points</label>
              <input
                type="number"
                className="form-control"
                name="penalty_points"
                value={formData.penalty_points}
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Officer Information */}
        <div className="card mb-4">
          <div className="card-header">Officer Information</div>
          <div className="card-body">
            <div className="mb-3">
              <label className="form-label">Officer’s Name</label>
              <input
                type="text"
                className={`form-control ${validationErrors.officer_name ? "is-invalid" : ""}`}
                name="officer_name"
                value={formData.officer_name}
                onChange={handleChange}
                required
              />
              {validationErrors.officer_name && (
                <div className="invalid-feedback">{validationErrors.officer_name}</div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Badge Number</label>
              <input
                type="text"
                className={`form-control ${validationErrors.badge_number ? "is-invalid" : ""}`}
                name="badge_number"
                value={formData.badge_number}
                onChange={handleChange}
                required
              />
              {validationErrors.badge_number && (
                <div className="invalid-feedback">{validationErrors.badge_number}</div>
              )}
            </div>
          </div>
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Logging..." : "Log Offense"}
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleReset}>
            Reset
          </button>
        </div>
        {error && <div className="text-danger mt-3">{error}</div>}
      </form>
    </div>
  );
};

export default OffenseLogging;