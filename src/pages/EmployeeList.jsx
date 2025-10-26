// src/pages/EmployeeList.jsx
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchEmployees, addEmployee, updateEmployee } from '../services/api';
import EmployeeCard from '../components/EmployeeCard';
import Modal from '../components/Modal';
import EmployeeForm from '../components/EmployeeForm';
import './EmployeeList.css'; // We will create this file next

const EmployeeList = () => {
  const queryClient = useQueryClient();

  // State for filters, search, and pagination
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('all');
  const [city, setCity] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [page, setPage] = useState(1);

  // State for the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  // 1. React Query for data fetching
  const { data, isLoading, error } = useQuery({
    queryKey: ['employees', { search, department, city, sortBy, page }],
    queryFn: () => fetchEmployees({ search, department, city, sortBy, page }),
  });

  // 2. React Query for adding an employee
  const addMutation = useMutation({
    mutationFn: addEmployee,
    onSuccess: () => {
      // Invalidate the cache to refetch
      queryClient.invalidateQueries(['employees']);
      closeModal();
    },
  });

  // 3. React Query for updating an employee
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateEmployee(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['employees']);
      closeModal();
    },
  });

  // --- Event Handlers ---

  const handleOpenAddModal = () => {
    setEditingEmployee(null); // Clear any editing data
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (employee) => {
    setEditingEmployee(employee);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEmployee(null);
  };

  const handleFormSubmit = (formData) => {
    if (editingEmployee) {
      // Update existing employee
      updateMutation.mutate({ id: editingEmployee.id, data: formData });
    } else {
      // Add new employee
      addMutation.mutate(formData);
    }
  };

  const handlePageChange = (newPage) => {
    if (
      newPage > 0 &&
      newPage <= (data?.pagination.totalPages || 1)
    ) {
      setPage(newPage);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Employee Directory</h1>
        <button className="btn btn-primary" onClick={handleOpenAddModal}>
          Add Employee
        </button>
      </header>

      {/* Filter and Search Bar */}
      <div className="filter-controls">
        <input
          type="text"
          placeholder="Search by name or role..."
          className="search-bar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={department} onChange={(e) => setDepartment(e.target.value)}>
          <option value="all">All Departments</option>
          <option value="Engineering">Engineering</option>
          <option value="Product">Product</option>
          <option value="Design">Design</option>
          <option value="Marketing">Marketing</option>
        </select>
        <select value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="all">All Cities</option>
          <option value="Chennai">Chennai</option>
          <option value="Salem">Salem</option>
          <option value="Coimbatore">Coimbatore</option>
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Sort by Name</option>
          <option value="joiningDate">Sort by Joining Date</option>
        </select>
      </div>

      {/* Employee List */}
      <div className="employee-list">
        {isLoading && <p>Loading employees...</p>}
        {error && <p>Error fetching data: {error.message}</p>}
        {data &&
          data.data.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              onEdit={handleOpenEditModal}
            />
          ))}
        {data && data.data.length === 0 && <p>No employees found.</p>}
      </div>
      
      {/* Pagination */}
      {data && data.pagination.totalPages > 1 && (
        <div className="pagination-controls">
          <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
            Previous
          </button>
          <span>
            Page {data.pagination.page} of {data.pagination.totalPages}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === data.pagination.totalPages}
          >
            Next
          </button>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingEmployee ? 'Edit Employee' : 'Add New Employee'}
      >
        <EmployeeForm
          initialData={editingEmployee}
          onSubmit={handleFormSubmit}
          onCancel={closeModal}
        />
      </Modal>
    </div>
  );
};

export default EmployeeList;