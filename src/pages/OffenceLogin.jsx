import { useState, useEffect } from "react";

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
    <div className="max-w-4xl mx-auto p-4 bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Log Traffic Offense</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header Information */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-blue-900 px-4 py-3 text-white font-medium">Ticket information</div>
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Issuing Authority</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-100 text-gray-700"
                name="issuing_authority"
                value={formData.issuing_authority}
                readOnly
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Date & Time of Issue</label>
              <input
                type="datetime-local"
                className={`w-full px-3 py-2 border ${validationErrors.offense_datetime ? "border-red-600" : "border-gray-200"} rounded-md`}
                name="offense_datetime"
                value={formData.offense_datetime}
                onChange={handleChange}
                required
              />
              {validationErrors.offense_datetime && (
                <div className="text-red-600 text-sm mt-1">{validationErrors.offense_datetime}</div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Location of Offense</label>
              <input
                type="text"
                className={`w-full px-3 py-2 border ${validationErrors.location ? "border-red-600" : "border-gray-200"} rounded-md`}
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
              {validationErrors.location && (
                <div className="text-red-600 text-sm mt-1">{validationErrors.location}</div>
              )}
            </div>
          </div>
        </div>

        {/* Offender Details */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-blue-900 px-4 py-3 text-white font-medium">Offender Details</div>
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Driver's Name</label>
              <input
                type="text"
                className={`w-full px-3 py-2 border ${validationErrors.offender_name ? "border-red-600" : "border-gray-200"} rounded-md`}
                name="offender_name"
                value={formData.offender_name}
                onChange={handleChange}
                required
              />
              {validationErrors.offender_name && (
                <div className="text-red-600 text-sm mt-1">{validationErrors.offender_name}</div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Driver's License Number</label>
              <input
                type="text"
                className={`w-full px-3 py-2 border ${validationErrors.license_number ? "border-red-600" : "border-gray-200"} rounded-md`}
                name="license_number"
                value={formData.license_number}
                onChange={handleChange}
                required
              />
              {validationErrors.license_number && (
                <div className="text-red-600 text-sm mt-1">{validationErrors.license_number}</div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Driver's Phone Number</label>
              <input
                type="text"
                className={`w-full px-3 py-2 border ${validationErrors.phone_number ? "border-red-600" : "border-gray-200"} rounded-md`}
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                required
              />
              {validationErrors.phone_number && (
                <div className="text-red-600 text-sm mt-1">{validationErrors.phone_number}</div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">License Plate Number</label>
              <input
                type="text"
                className={`w-full px-3 py-2 border ${validationErrors.license_plate ? "border-red-600" : "border-gray-200"} rounded-md`}
                name="license_plate"
                value={formData.license_plate}
                onChange={handleChange}
                required
              />
              {validationErrors.license_plate && (
                <div className="text-red-600 text-sm mt-1">{validationErrors.license_plate}</div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Vehicle Model</label>
              <input
                type="text"
                className={`w-full px-3 py-2 border ${validationErrors.vehicle_model ? "border-red-600" : "border-gray-200"} rounded-md`}
                name="vehicle_model"
                value={formData.vehicle_model}
                onChange={handleChange}
                required
              />
              {validationErrors.vehicle_model && (
                <div className="text-red-600 text-sm mt-1">{validationErrors.vehicle_model}</div>
              )}
            </div>
          </div>
        </div>

        {/* Offense Details */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-blue-900 px-4 py-3 text-white font-medium">Offense Details</div>
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Type of Violation</label>
              <select
                className={`w-full px-3 py-2 border ${validationErrors.offense_type ? "border-red-600" : "border-gray-200"} rounded-md`}
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
                <div className="text-red-600 text-sm mt-1">{validationErrors.offense_type}</div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Description of Offense</label>
              <textarea
                className={`w-full px-3 py-2 border ${validationErrors.offense_description ? "border-red-600" : "border-gray-200"} rounded-md`}
                name="offense_description"
                value={formData.offense_description}
                onChange={handleChange}
                required
                rows="3"
              />
              {validationErrors.offense_description && (
                <div className="text-red-600 text-sm mt-1">{validationErrors.offense_description}</div>
              )}
            </div>
          </div>
        </div>

        {/* Penalty & Payment Information */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-blue-900 px-4 py-3 text-white font-medium">Penalty & Payment Information</div>
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Fine Amount</label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-100 text-gray-700"
                name="fine_amount"
                value={formData.fine_amount}
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Penalty Points</label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-100 text-gray-700"
                name="penalty_points"
                value={formData.penalty_points}
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Officer Information */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-blue-900 px-4 py-3 text-white font-medium">Officer Information</div>
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Officer's Name</label>
              <input
                type="text"
                className={`w-full px-3 py-2 border ${validationErrors.officer_name ? "border-red-600" : "border-gray-200"} rounded-md`}
                name="officer_name"
                value={formData.officer_name}
                onChange={handleChange}
                required
              />
              {validationErrors.officer_name && (
                <div className="text-red-600 text-sm mt-1">{validationErrors.officer_name}</div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Badge Number</label>
              <input
                type="text"
                className={`w-full px-3 py-2 border ${validationErrors.badge_number ? "border-red-600" : "border-gray-200"} rounded-md`}
                name="badge_number"
                value={formData.badge_number}
                onChange={handleChange}
                required
              />
              {validationErrors.badge_number && (
                <div className="text-red-600 text-sm mt-1">{validationErrors.badge_number}</div>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button 
            type="submit" 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Logging..." : "Log Offense"}
          </button>
          <button 
            type="button" 
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
        {error && <div className="text-red-600 mt-3">{error}</div>}
      </form>
    </div>
  );
};

export default OffenseLogging;
