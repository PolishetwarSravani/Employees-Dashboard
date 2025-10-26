// src/components/EmployeeForm.jsx
import React, { useState, useEffect } from 'react';
import './EmployeeForm.css'; // We will create this file next

const EmployeeForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    department: 'Engineering',
    city: 'Chennai',
    joiningDate: '',
  });
  const [errors, setErrors] = useState({});

  // If we pass initialData (for editing), populate the form
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      // Reset for "Add" mode
      setFormData({
        name: '',
        role: '',
        department: 'Engineering',
        city: 'Chennai',
        joiningDate: '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = 'Name is required.';
    if (!formData.role) tempErrors.role = 'Role is required.';
    if (!formData.joiningDate)
      tempErrors.joiningDate = 'Joining date is required.';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span className="error-text">{errors.name}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="role">Role</label>
        <input
          type="text"
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
        />
        {errors.role && <span className="error-text">{errors.role}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="department">Department</label>
        <select
          id="department"
          name="department"
          value={formData.department}
          onChange={handleChange}
        >
          <option value="Engineering">Engineering</option>
          <option value="Product">Product</option>
          <option value="Design">Design</option>
          <option value="Marketing">Marketing</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="city">City</label>
        <select
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
        >
          <option value="Chennai">Chennai</option>
          <option value="Salem">Salem</option>
          <option value="Coimbatore">Coimbatore</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="joiningDate">Joining Date</label>
        <input
          type="date"
          id="joiningDate"
          name="joiningDate"
          value={formData.joiningDate}
          onChange={handleChange}
        />
        {errors.joiningDate && (
          <span className="error-text">{errors.joiningDate}</span>
        )}
      </div>
      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;