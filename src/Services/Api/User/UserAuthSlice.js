import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const CACHE_DURATION = 5 * 60 * 1000;

const shouldFetch = (lastFetchTime) => {
  return Date.now() - lastFetchTime > CACHE_DURATION;
};

const API_BASE_URL = 'https://catershub.pythonanywhere.com';

// LocalStorage Helpers
const getTokenFromStorage = () => {
  try {
    return localStorage.getItem('access_token') || null;
  } catch (error) {
    console.error('Token fetch error:', error);
    return null;
  }
};

const getUserFromStorage = () => {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('User fetch error:', error);
    return null;
  }
};

const isTokenValid = (token) => {
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp > Date.now() / 1000;
  } catch (error) {
    console.error('Token validation failed:', error);
    return false;
  }
};

// Initial Auth State
const storedToken = getTokenFromStorage();
const storedUser = getUserFromStorage();
const hasValidToken = storedToken && isTokenValid(storedToken);

const initialState = {
  user: hasValidToken ? storedUser : null,
  token: hasValidToken ? storedToken : null,
  isLoggedIn: hasValidToken,
  isLoading: false,
  averageRating: null,
  error: null,
  profile: null,
  workList: [],
  currentWork: null,
  myWorks: [],
  userCounts: null,
  // Add caching timestamps
  lastFetch: {
    profile: 0,
    workList: 0,
    myWorks: 0,
    userCounts: 0,
    currentWork: {},
    averageRating: 0,
  },
  // Add loading states for individual operations
  loadingStates: {
    profile: false,
    workList: false,
    myWorks: false,
    userCounts: false,
    averageRating: false,
    currentWork: false,
    updateProfile: false
  }
};

// Enhanced error handler
const handleAsyncError = (error) => {
  if (error.response?.status === 401) {
    // Token expired or invalid
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    return 'Session expired. Please login again.';
  }
  
  return error.response?.data?.message || 
         error.response?.data?.detail ||
         error.message || 
         'An unexpected error occurred';
};

// Async Thunks with improved error handling
export const loginUser = createAsyncThunk(
  'userAuth/loginUser', 
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_BASE_URL}/users/signin/`, credentials);
      if (data?.tokens?.access) return data;
      return rejectWithValue(data?.message || 'Login failed');
    } catch (error) {
      return rejectWithValue(handleAsyncError(error));
    }
  }
);

export const fetchProfile = createAsyncThunk(
  'userAuth/fetchProfile', 
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().userAuth.token;
      if (!token) {
        return rejectWithValue('No authentication token found');
      }
      
      const { data } = await axios.get(`${API_BASE_URL}/users/users/me/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return data;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error));
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'userAuth/updateProfile', 
  async (profileData, { getState, rejectWithValue }) => {
    try {
      const token = getState().userAuth.token;
      if (!token) {
        return rejectWithValue('No authentication token found');
      }
      
      const { data } = await axios.patch(`${API_BASE_URL}/users/update/users-details/`, profileData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      return data;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error));
    }
  }
);

export const fetchWorkList = createAsyncThunk(
  'userAuth/fetchWorkList', 
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().userAuth.token;
      if (!token) {
        return rejectWithValue('No authentication token found');
      }
      
      const { data } = await axios.get(`${API_BASE_URL}/admin_panel/catering/published/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return data;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error));
    }
  }
);

export const fetchWorkById = createAsyncThunk(
  'userAuth/fetchWorkById', 
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().userAuth.token;
      if (!token) {
        return rejectWithValue('No authentication token found');
      }
      
      const { data } = await axios.get(`${API_BASE_URL}/admin_panel/published-work/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return data;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error));
    }
  }
);

export const requestWork = createAsyncThunk(
  'userAuth/requestWork', 
  async (requestData, { getState, rejectWithValue }) => {
    try {
      const token = getState().userAuth.token;
      if (!token) {
        return rejectWithValue('No authentication token found');
      }
      
      const { data } = await axios.post(`${API_BASE_URL}/users/work-request/create/`, requestData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return { ...data, workId: requestData.work };
    } catch (error) {
      return rejectWithValue(handleAsyncError(error));
    }
  }
);

export const fetchMyWorks = createAsyncThunk(
  'userAuth/fetchMyWorks', 
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().userAuth.token;
      if (!token) {
        return rejectWithValue('No authentication token found');
      }
      
      const { data } = await axios.get(`${API_BASE_URL}/users/work-request/list/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return data;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error));
    }
  }
);

export const fetchUserCounts = createAsyncThunk(
  'userAuth/fetchUserCounts', 
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().userAuth.token;
      if (!token) {
        return rejectWithValue('No authentication token found');
      }
      
      const { data } = await axios.get(`${API_BASE_URL}/users/dashboard/stats/user/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return data;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error));
    }
  }
);


export const fetchUserAverageRating = createAsyncThunk(
  'userAuth/fetchUserAverageRating', 
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().userAuth.token;
      if (!token) {
        return rejectWithValue('No authentication token found');
      }
      
      const { data } = await axios.get(`${API_BASE_URL}/users/my-average-rating/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return data;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error));
    }
  }
);



// Slice
const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    logoutUser: (state) => {
      Object.assign(state, {
        user: null,
        averageRating: null,
        token: null,
        isLoggedIn: false,
        error: null,
        isLoading: false,
        profile: null,
        workList: [],
        currentWork: null,
        myWorks: [],
        userCounts: null,
        lastFetch: {
          profile: 0,
          workList: 0,
          averageRating: 0,
          myWorks: 0,
          userCounts: 0,
          currentWork: {}
        },
        loadingStates: {
          profile: false,
          workList: false,
          myWorks: false,
          userCounts: false,
          averageRating: false,
          currentWork: false,
          updateProfile: false
        }
      });
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
    },
    setAuthState: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isLoggedIn = true;
      localStorage.setItem('access_token', token);
      localStorage.setItem('user', JSON.stringify(user));
    },
    clearAuthError: (state) => {
      state.error = null;
    },
    clearCurrentWork: (state) => {
      state.currentWork = null;
    },
    setLoadingState: (state, action) => {
      const { operation, isLoading } = action.payload;
      state.loadingStates[operation] = isLoading;
    },
    
    updateLastFetch: (state, action) => {
      const { operation, timestamp } = action.payload;
      state.lastFetch[operation] = timestamp || Date.now();
    },
    
    // Add a generic cache checker
    checkCache: (state, action) => {
      const { operation } = action.payload;
      return shouldFetch(state.lastFetch[operation]);
    }
  },
  extraReducers: (builder) => {
    builder
      // Login User
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { tokens, user } = action.payload;
        state.isLoading = false;
        state.token = tokens.access;
        state.user = user;
        state.isLoggedIn = true;
        localStorage.setItem('access_token', tokens.access);
        localStorage.setItem('user', JSON.stringify(user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
      })

      // Fetch Profile
      .addCase(fetchProfile.pending, (state) => {
        state.loadingStates.profile = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loadingStates.profile = false;
        state.profile = action.payload;
        state.lastFetch.profile = Date.now();
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loadingStates.profile = false;
        state.error = action.payload;
        if (action.payload?.includes('Session expired')) {
          state.user = null;
          state.token = null;
          state.isLoggedIn = false;
        }
      })

      // Update Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loadingStates.updateProfile = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loadingStates.updateProfile = false;
        // Update the profile data with the response
        if (action.payload?.user) {
          state.profile = {
            ...state.profile,
            user: {
              ...state.profile?.user,
              ...action.payload.user
            }
          };
        }
        // Update the lastFetch timestamp
        state.lastFetch.profile = Date.now();
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loadingStates.updateProfile = false;
        state.error = action.payload;
        if (action.payload?.includes('Session expired')) {
          state.user = null;
          state.token = null;
          state.isLoggedIn = false;
        }
      })
      
      // Update fetchWorkList cases
      .addCase(fetchWorkList.pending, (state) => {
        state.loadingStates.workList = true;
        state.error = null;
      })
      .addCase(fetchWorkList.fulfilled, (state, action) => {
        state.loadingStates.workList = false;
        state.workList = action.payload;
        state.lastFetch.workList = Date.now();
      })
      .addCase(fetchWorkList.rejected, (state, action) => {
        state.loadingStates.workList = false;
        state.error = action.payload;
      })
      
      // Update fetchMyWorks cases
      .addCase(fetchMyWorks.pending, (state) => {
        state.loadingStates.myWorks = true;
        state.error = null;
      })
      .addCase(fetchMyWorks.fulfilled, (state, action) => {
        state.loadingStates.myWorks = false;
        state.myWorks = action.payload;
        state.lastFetch.myWorks = Date.now();
      })
      .addCase(fetchMyWorks.rejected, (state, action) => {
        state.loadingStates.myWorks = false;
        state.error = action.payload;
      })
      
      // Update fetchWorkById cases
      .addCase(fetchWorkById.pending, (state) => {
        state.loadingStates.currentWork = true;
        state.error = null;
      })
      .addCase(fetchWorkById.fulfilled, (state, action) => {
        state.loadingStates.currentWork = false;
        state.currentWork = action.payload;
        if (action.payload?.id) {
          state.lastFetch.currentWork[action.payload.id] = Date.now();
        }
      })
      .addCase(fetchWorkById.rejected, (state, action) => {
        state.loadingStates.currentWork = false;
        state.error = action.payload;
      })
      
      // Update fetchUserCounts cases
      .addCase(fetchUserCounts.pending, (state) => {
        state.loadingStates.userCounts = true;
        state.error = null;
      })
      .addCase(fetchUserCounts.fulfilled, (state, action) => {
        state.loadingStates.userCounts = false;
        state.userCounts = action.payload;
        state.lastFetch.userCounts = Date.now();
      })
      .addCase(fetchUserCounts.rejected, (state, action) => {
        state.loadingStates.userCounts = false;
        state.error = action.payload;
      })
      
      .addCase(requestWork.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(requestWork.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(requestWork.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserAverageRating.pending, (state) => {
      state.loadingStates.averageRating = true;
      state.error = null;
    })
    .addCase(fetchUserAverageRating.fulfilled, (state, action) => {
      state.loadingStates.averageRating = false;
      state.averageRating = action.payload;
      state.lastFetch.averageRating = Date.now();
    })
    .addCase(fetchUserAverageRating.rejected, (state, action) => {
      state.loadingStates.averageRating = false;
      state.error = action.payload;
      if (action.payload?.includes('Session expired')) {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
      }
    });
  },
});

export const { 
  logoutUser, 
  setAuthState, 
  clearAuthError, 
  clearCurrentWork,
  setLoadingState,
  updateLastFetch,
  checkCache
} = userAuthSlice.actions;

export default userAuthSlice.reducer;