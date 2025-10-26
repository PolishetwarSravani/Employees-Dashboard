// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import EmployeeList from './pages/EmployeeList';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* We only have one page for now */}
          <Route path="/" element={<EmployeeList />} />
          {/* You could add EmployeeDetails.jsx here later */}
          {/* <Route path="/employee/:id" element={<EmployeeDetails />} /> */}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;