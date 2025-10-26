// src/services/api.js
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Import our db instance

// Get the 'employees' collection reference
const employeesCollectionRef = collection(db, 'employees');

/**
 * Fetches employees with filtering and sorting
 * Note: Firestore text search is complex; we'll filter by exact matches.
 * Pagination is also different; this version fetches all filtered docs.
 */
export const fetchEmployees = async ({
  search = '', // Note: This search won't work like the mock one
  department = 'all',
  city = 'all',
  sortBy = 'name',
}) => {
  // Start with the base query
  let constraints = [];

  // 1. Filter by department
  if (department !== 'all') {
    constraints.push(where('department', '==', department));
  }

  // 2. Filter by city
  if (city !== 'all') {
    constraints.push(where('city', '==', city));
  }

  // 3. Sort
  // Note: Firestore requires an index for most compound queries.
  // If this fails, Firebase will provide an error link in the console
  // to automatically create the required index.
  constraints.push(orderBy(sortBy, sortBy === 'joiningDate' ? 'desc' : 'asc'));

  // Build the final query
  const q = query(employeesCollectionRef, ...constraints);

  // Execute the query
  const querySnapshot = await getDocs(q);

  const data = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id, // Add the document ID
  }));

  // In a real app, you'd implement pagination here
  return {
    data: data,
    pagination: {
      page: 1,
      limit: data.length,
      totalItems: data.length,
      totalPages: 1,
    },
  };
};

/**
 * Adds a new employee
 * @param {object} employeeData
 */
export const addEmployee = async (employeeData) => {
  // addDoc auto-generates an ID
  const docRef = await addDoc(employeesCollectionRef, employeeData);
  return { ...employeeData, id: docRef.id };
};

/**
 * Updates an existing employee
 * @param {string} employeeId
 * @param {object} updateData
 */
export const updateEmployee = async (employeeId, updateData) => {
  // Create a reference to the specific document
  const employeeDocRef = doc(db, 'employees', employeeId);

  // Update the document
  await updateDoc(employeeDocRef, updateData);

  return { ...updateData, id: employeeId };
};