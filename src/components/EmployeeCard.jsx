// src/components/EmployeeCard.jsx
import React from 'react';
import './EmployeeCard.css'; // We will create this CSS file next

const EmployeeCard = ({ employee, onEdit }) => {
  return (
    <div className="employee-card">
      <img
        src={employee.avatar}
        alt={employee.name}
        className="employee-avatar"
      />
      <div className="employee-info">
        <h3>{employee.name}</h3>
        <p>{employee.role}</p>
        <p>
          {employee.department} | {employee.city}
        </p>
        <p>Joined: {employee.joiningDate}</p>
      </div>
      <button className="edit-btn" onClick={() => onEdit(employee)}>
        Edit
      </button>
    </div>
  );
};

// Use React.memo for performance optimization
export default React.memo(EmployeeCard);