// taskSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Import Axios

// Define an initial state for your tasks
const initialState = {
  tasks: [],
  selectedTask: null,
  status: 'idle',
  error: null,
};

const serverUrl = `http://localhost:5001/api/tasks`;

// Create an asynchronous thunk to fetch all tasks
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    try {
      const response = await axios.get(`${serverUrl}/tasks`); // Use Axios to make the GET request
      return response.data; // Axios automatically parses JSON response
    } catch (error) {
      throw error;
    }
  });
  
  // Create an asynchronous thunk to fetch a specific task by ID
  export const fetchTaskById = createAsyncThunk(
    'tasks/fetchTaskById',
    async (taskId) => {
      try {
        const response = await axios.get(`${serverUrl}/tasks/${taskId}`); // Use Axios to make the GET request
        return response.data; // Axios automatically parses JSON response
      } catch (error) {
        throw error;
      }
    }
  );

// Create a task slice
const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchTaskById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTaskById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedTask = action.payload;
      })
      .addCase(fetchTaskById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export actions and reducer
export const selectTasks = (state) => state.tasks;
export default taskSlice.reducer;
