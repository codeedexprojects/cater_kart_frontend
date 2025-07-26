import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Award, ChefHat, TrendingUp, BarChart3, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchUserCounts, fetchProfile, fetchUserAverageRating } from '../../Services/Api/User/UserAuthSlice';

const UserStatsSection = () => {
  const dispatch = useDispatch();
  
  const { 
    user, 
    userCounts, 
    profile, 
    averageRating,
    isLoading 
  } = useSelector((state) => state.userAuth);

  useEffect(() => {
    // Fetch user counts, profile, and average rating if not already loaded
    if (!userCounts) {
      dispatch(fetchUserCounts());
    }
    if (!profile) {
      dispatch(fetchProfile());
    }
    if (!averageRating) {
      dispatch(fetchUserAverageRating());
    }
  }, [dispatch, userCounts, profile, averageRating]);

  // Get user data from either profile or user state
  const userData = profile || user || {};
  const userName = userData?.user_name || user?.user_name || profile?.user_name || "User";

  // Get stats from userCounts or provide defaults
  const stats = {
    acceptedRequests: userCounts?.accepted_requests || 0,
    pendingRequests: userCounts?.pending_requests || 0,
    totalJobs: userCounts?.published_work_count || 0,
    completedJobs: userCounts?.completed_jobs || 0
  };

  // Get rating data
  const ratingData = {
    averageRating: averageRating?.average_rating || 0,
    totalRatings: averageRating?.total_ratings || 0
  };

  // Format rating display (e.g., "4.5" or "0.0")
  const formattedRating = ratingData.averageRating.toFixed(1);

  const statsCards = [
    {
      title: "Accepted Requests",
      value: stats.acceptedRequests,
      icon: Award,
      iconColor: "text-yellow-300",
      path: "/user/my-works?filter=accepted"
    },
    {
      title: "Pending Requests", 
      value: stats.pendingRequests,
      icon: TrendingUp,
      iconColor: "text-green-300",
      path: "/user/my-works?filter=pending"
    },
    {
      title: "Published Work",
      value: stats.totalJobs,
      icon: ChefHat,
      iconColor: "text-blue-300",
      path: "/user/my-works"
    },
    {
      title: "Average Rating",
      value: `${formattedRating}/5`,
      subtitle: `${ratingData.totalRatings} reviews`,
      icon: Star,
      iconColor: "text-purple-300",
      path: "/user/reviews" // Adjust path as needed
    }
  ];

  if (isLoading) {
    return (
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6 rounded-b-3xl mb-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-white/20 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-white/20 rounded w-1/3 mb-6"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="h-6 bg-white/20 rounded mb-2"></div>
                  <div className="h-8 bg-white/20 rounded mb-2"></div>
                  <div className="h-4 bg-white/20 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6 rounded-b-3xl mb-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {userName}! 👋</h1>
            <p className="text-orange-100">Ready to serve amazing experiences today?</p>
          </div>
          
          {/* Optional: Add a refresh button */}
          <button
            onClick={() => {
              dispatch(fetchUserCounts());
              dispatch(fetchProfile());
              dispatch(fetchUserAverageRating());
            }}
            className="hidden md:flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm font-medium"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Refresh Stats
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statsCards.map((stat, index) => (
            <Link
              key={index}
              to={stat.path}
              className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/30 transition-all duration-200 transform hover:scale-105"
            >
              <div className="flex items-center justify-center mb-2">
                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-orange-100 text-sm">{stat.title}</div>
              {stat.subtitle && (
                <div className="text-orange-200 text-xs mt-1">{stat.subtitle}</div>
              )}
            </Link>
          ))}
        </div>

        {/* Additional info row for mobile */}
        <div className="mt-4 pt-4 border-t border-white/20 md:hidden">
          <div className="text-center">
            <p className="text-orange-100 text-sm">
              Total Completed: <span className="font-semibold text-white">{stats.completedJobs}</span>
            </p>
          </div>
        </div>

        {/* Star rating visual for better UX */}
        {ratingData.totalRatings > 0 && (
          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="flex items-center justify-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.round(ratingData.averageRating)
                      ? 'text-yellow-300 fill-current'
                      : 'text-white/40'
                  }`}
                />
              ))}
              <span className="ml-2 text-orange-100 text-sm">
                ({ratingData.totalRatings} review{ratingData.totalRatings !== 1 ? 's' : ''})
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserStatsSection;