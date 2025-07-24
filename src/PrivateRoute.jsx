import React, { useMemo } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

export const AdminRoute = () => {
  const adminAuth = useSelector((state) => state.adminAuth);
  
  // Add a small delay to prevent immediate redirects during state transitions
  const [initialLoading, setInitialLoading] = React.useState(true);
  
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 100); // Small delay to let state settle
    
    return () => clearTimeout(timer);
  }, []);
  
  // Memoize the auth state to prevent excessive re-renders
  const authState = useMemo(() => {
    if (initialLoading) {
      return { shouldRedirect: false, shouldShowLoading: true };
    }
    
    if (!adminAuth) {
      return { shouldRedirect: true, shouldShowLoading: false };
    }
    
    // If we have a token but isLoggedIn is still undefined/null, show loading
    if (adminAuth.tokens && adminAuth.isLoggedIn !== true && adminAuth.isLoggedIn !== false) {
      return { shouldRedirect: false, shouldShowLoading: true };
    }
    
    // If we're in a loading state from async operations
    if (adminAuth.isLoading) {
      return { shouldRedirect: false, shouldShowLoading: true };
    }
    
    return { 
      shouldRedirect: !adminAuth.isLoggedIn, 
      shouldShowLoading: false 
    };
  }, [adminAuth?.isLoggedIn, adminAuth?.tokens, adminAuth?.isLoading, initialLoading]);
  
  if (authState.shouldShowLoading) {
    return <LoadingSpinner />;
  }
  
  if (authState.shouldRedirect) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return <Outlet />;
};

export const SubAdminRoute = () => {
  const subAdminAuth = useSelector((state) => state.subAdminAuth);
  
  // Add a small delay to prevent immediate redirects during state transitions
  const [initialLoading, setInitialLoading] = React.useState(true);
  
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 100); // Small delay to let state settle
    
    return () => clearTimeout(timer);
  }, []);
  
  // Memoize the auth state to prevent excessive re-renders
  const authState = useMemo(() => {
    if (initialLoading) {
      return { shouldRedirect: false, shouldShowLoading: true };
    }
    
    if (!subAdminAuth) {
      return { shouldRedirect: true, shouldShowLoading: false };
    }
    
    // If we have a token but isLoggedIn is still undefined/null, show loading
    if (subAdminAuth.tokens && subAdminAuth.isLoggedIn !== true && subAdminAuth.isLoggedIn !== false) {
      return { shouldRedirect: false, shouldShowLoading: true };
    }
    
    // If we're in a loading state from async operations
    if (subAdminAuth.isLoading) {
      return { shouldRedirect: false, shouldShowLoading: true };
    }
    
    return { 
      shouldRedirect: !subAdminAuth.isLoggedIn, 
      shouldShowLoading: false 
    };
  }, [subAdminAuth?.isLoggedIn, subAdminAuth?.tokens, subAdminAuth?.isLoading, initialLoading]);
  
  if (authState.shouldShowLoading) {
    return <LoadingSpinner />;
  }
  
  if (authState.shouldRedirect) {
    return <Navigate to="/subadmin/login" replace />;
  }
  
  return <Outlet />;
};

export const UserRoute = () => {
  const userAuth = useSelector((state) => state.userAuth);
  
  // Add a small delay to prevent immediate redirects during state transitions
  const [initialLoading, setInitialLoading] = React.useState(true);
  
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 100); // Small delay to let state settle
    
    return () => clearTimeout(timer);
  }, []);
  
  // Memoize the auth state to prevent excessive re-renders
  const authState = useMemo(() => {
    if (initialLoading) {
      return { shouldRedirect: false, shouldShowLoading: true };
    }
    
    if (!userAuth) {
      console.log('UserAuth state not found, redirecting to login');
      return { shouldRedirect: true, shouldShowLoading: false };
    }
    
    // If we have a token but isLoggedIn is still undefined/null, show loading
    if (userAuth.token && userAuth.isLoggedIn !== true && userAuth.isLoggedIn !== false) {
      console.log('User auth still loading...');
      return { shouldRedirect: false, shouldShowLoading: true };
    }
    
    // If we're in a loading state from async operations
    if (userAuth.isLoading) {
      return { shouldRedirect: false, shouldShowLoading: true };
    }
    
    // Only log once when the state is determined
    console.log('UserRoute - Auth state:', {
      isLoggedIn: userAuth.isLoggedIn,
      hasToken: !!userAuth.token,
      hasUser: !!userAuth.user
    });
    
    return { 
      shouldRedirect: !userAuth.isLoggedIn, 
      shouldShowLoading: false 
    };
  }, [userAuth?.isLoggedIn, userAuth?.token, userAuth?.user, userAuth?.isLoading, initialLoading]);
  
  if (authState.shouldShowLoading) {
    return <LoadingSpinner />;
  }
  
  if (authState.shouldRedirect) {
    return <Navigate to="/user/login" replace />;
  }
  
  return <Outlet />;
};

// Higher-order component for protecting individual routes
export const ProtectedRoute = ({ children, userType }) => {
  const adminAuth = useSelector((state) => state.adminAuth);
  const subAdminAuth = useSelector((state) => state.subAdminAuth);
  const userAuth = useSelector((state) => state.userAuth);

  const getRedirectPath = () => {
    switch (userType) {
      case 'admin':
        return '/admin/login';
      case 'subadmin':
        return '/subadmin/login';  
      case 'user':
        return '/user/login';
      default:
        return '/user/login';
    }
  };

  const getAuthState = () => {
    switch (userType) {
      case 'admin':
        return adminAuth;
      case 'subadmin':
        return subAdminAuth;
      case 'user':
        return userAuth;
      default:
        return null;
    }
  };

  const authState = getAuthState();
  
  // Memoize the protection logic
  const protectionState = useMemo(() => {
    if (!authState) {
      console.log(`${userType} auth state not found, redirecting`);
      return { shouldRedirect: true, shouldShowLoading: false };
    }
    
    // If we have a token/tokens but isLoggedIn is still undefined/null, show loading
    const hasTokens = authState.token || authState.tokens;
    if (hasTokens && authState.isLoggedIn !== true && authState.isLoggedIn !== false) {
      console.log(`${userType} auth still loading...`);
      return { shouldRedirect: false, shouldShowLoading: true };
    }
    
    // If we're in a loading state from async operations
    if (authState.isLoading) {
      return { shouldRedirect: false, shouldShowLoading: true };
    }
    
    console.log(`ProtectedRoute (${userType}) - isLoggedIn:`, authState.isLoggedIn);
    return { 
      shouldRedirect: !authState.isLoggedIn, 
      shouldShowLoading: false 
    };
  }, [authState?.isLoggedIn, authState?.token, authState?.tokens, authState?.isLoading, userType]);
  
  if (protectionState.shouldShowLoading) {
    return <LoadingSpinner />;
  }
  
  if (protectionState.shouldRedirect) {
    return <Navigate to={getRedirectPath()} replace />;
  }
  
  return children;
};