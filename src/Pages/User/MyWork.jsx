import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Clock, CheckCircle, XCircle, AlertCircle, Calendar, MapPin, Filter, Search, Eye, ChefHat, MoreHorizontal,
} from 'lucide-react';
import Header from '../../Components/Users/Header';
import Footer from '../../Components/Users/Footer';
import { useNavigate } from 'react-router-dom';
import { fetchMyWorks } from '../../Services/Api/User/UserAuthSlice';

const MyWorksPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Redux state - Fixed to use loadingStates
  const { 
    myWorks: workData, 
    loadingStates, 
    error 
  } = useSelector((state) => state.userAuth);
  
  const loading = loadingStates?.myWorks || false;
  
  // Local state - Updated tabs to match work_status
  const [activeTab, setActiveTab] = useState('all');
  const [selectedWork, setSelectedWork] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [lastFetchTime, setLastFetchTime] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  // Memoized fetch function to prevent unnecessary re-renders
  const fetchWorks = useCallback(async () => {
    if (isRefreshing || loading) return;
    
    try {
      await dispatch(fetchMyWorks()).unwrap();
      setLastFetchTime(Date.now());
      setHasFetched(true);
    } catch (error) {
      console.error('Failed to fetch works:', error);
    }
  }, [dispatch, isRefreshing, loading]);

  useEffect(() => {
    const now = Date.now();
    // Only fetch if we don't have data or it's been more than 5 minutes since last fetch
    if (!hasFetched || (!workData || workData.length === 0) || (now - lastFetchTime > 5 * 60 * 1000)) {
      fetchWorks();
    }
  }, [fetchWorks, workData, lastFetchTime, hasFetched]);

  const handleViewDetails = useCallback((workDetailId) => {
    console.log(workDetailId);
    navigate(`/work-details/${workDetailId}`);
  }, [navigate]);

  // Fixed: Group works by work_status and status for proper filtering
  const worksByCategory = useMemo(() => {
    if (!Array.isArray(workData)) {
      return {
        pending: [],
        completed: [],
        requestPending: [],
        requestAccepted: [],
        requestRejected: []
      };
    }
    
    return workData.reduce((acc, work) => {
      // Group by work_status (pending/completed)
      const workStatus = work.work_status || 'pending';
      if (workStatus === 'pending') {
        acc.pending.push(work);
      } else if (workStatus === 'completed') {
        acc.completed.push(work);
      }

      // Also group by request status for reference
      const requestStatus = work.status || 'pending';
      if (requestStatus === 'pending') {
        acc.requestPending.push(work);
      } else if (requestStatus === 'accepted') {
        acc.requestAccepted.push(work);
      } else if (requestStatus === 'rejected') {
        acc.requestRejected.push(work);
      }

      return acc;
    }, {
      pending: [],
      completed: [],
      requestPending: [],
      requestAccepted: [],
      requestRejected: []
    });
  }, [workData]);

  // Updated: Color schemes for work_status
  const getWorkStatusColor = useCallback((workStatus) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      completed: 'bg-green-100 text-green-800 border-green-200'
    };
    return colors[workStatus] || 'bg-gray-100 text-gray-800 border-gray-200';
  }, []);

  // Updated: Icons for work_status
  const getWorkStatusIcon = useCallback((workStatus) => {
    const icons = {
      pending: Clock,
      completed: CheckCircle
    };
    return icons[workStatus] || Clock;
  }, []);

  // Color schemes for request status
  const getRequestStatusColor = useCallback((status) => {
    const colors = {
      pending: 'bg-blue-100 text-blue-800 border-blue-200',
      accepted: 'bg-green-100 text-green-800 border-green-200',
      rejected: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  }, []);

  // Icons for request status
  const getRequestStatusIcon = useCallback((status) => {
    const icons = {
      pending: AlertCircle,
      accepted: CheckCircle,
      rejected: XCircle
    };
    return icons[status] || AlertCircle;
  }, []);

  // Updated tabs data to reflect work_status
  const tabs = useMemo(() => [
    {
      id: 'all',
      label: 'All Works',
      count: Array.isArray(workData) ? workData.length : 0
    },
    { 
      id: 'pending', 
      label: 'Pending Works', 
      count: worksByCategory.pending.length 
    },
    { 
      id: 'completed', 
      label: 'Completed Works', 
      count: worksByCategory.completed.length 
    },
    { 
      id: 'accepted', 
      label: 'Accepted Requests', 
      count: worksByCategory.requestAccepted.length 
    },
    { 
      id: 'rejected', 
      label: 'Rejected Requests', 
      count: worksByCategory.requestRejected.length 
    }
  ], [worksByCategory, workData]);

  // Updated: Get works for each tab based on work_status and request status
  const getWorksForTab = useCallback((tabId) => {
    switch (tabId) {
      case 'all':
        return Array.isArray(workData) ? workData : [];
      case 'pending':
        return worksByCategory.pending;
      case 'completed':
        return worksByCategory.completed;
      case 'accepted':
        return worksByCategory.requestAccepted;
      case 'rejected':
        return worksByCategory.requestRejected;
      default:
        return Array.isArray(workData) ? workData : [];
    }
  }, [worksByCategory, workData]);

  const formatTime = useCallback((timeString) => {
    if (!timeString) return 'N/A';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  }, []);

  const formatDate = useCallback((dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }, []);

  // Updated WorkCard component to show both statuses
  const WorkCard = React.memo(({ work }) => {
    const WorkStatusIcon = getWorkStatusIcon(work.work_status);
    const RequestStatusIcon = getRequestStatusIcon(work.status);
    const workDetail = work.work_detail;

    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h3 className="text-lg font-bold text-gray-800">
                {workDetail?.date} - {workDetail?.Auditorium_name}
              </h3>
              
              {/* Work Status Badge */}
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getWorkStatusColor(work.work_status)}`}>
                <WorkStatusIcon className="w-3 h-3 inline mr-1" />
                Work: {(work.work_status || 'pending').toUpperCase()}
              </span>
              
              {/* Request Status Badge */}
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRequestStatusColor(work.status)}`}>
                <RequestStatusIcon className="w-3 h-3 inline mr-1" />
                Request: {(work.status || 'pending').toUpperCase()}
              </span>
            </div>
            <p className="text-gray-600 font-medium">
              {workDetail?.Catering_company || 'Event Service'}
            </p>
          </div>
          <div className="text-right">
            {work.assigned && (
              <div className="text-sm text-green-600 font-medium mt-1">✓ Assigned</div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4 text-orange-500" />
            <span className="text-sm">{workDetail?.place || 'Location TBD'}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4 text-orange-500" />
            <span className="text-sm">{formatDate(workDetail?.date)}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4 text-orange-500" />
            <span className="text-sm">{formatTime(workDetail?.reporting_time)}</span>
          </div>
        </div>

        {/* Comment section */}
        {work.comment && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800 font-medium">Comment:</p>
            <p className="text-sm text-blue-700 mt-1">{work.comment}</p>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              work.work_status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
            }`}></div>
            <span className="text-sm text-gray-600">
              Requested on {new Date(work.requested_at).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleViewDetails(work.work_detail.id)}
              className="flex items-center gap-1 px-3 py-1 text-sm text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-lg transition-colors"
            >
              <Eye className="w-4 h-4" />
              View Details
            </button>
            <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  });

  // Memoized filtered works
  const currentWorks = useMemo(() => getWorksForTab(activeTab), [getWorksForTab, activeTab]);
  const filteredWorks = useMemo(() => 
    currentWorks.filter(work =>
      work.work_detail?.place?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      work.boy?.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      work.work_detail?.Auditorium_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      work.work_detail?.Catering_company?.toLowerCase().includes(searchTerm.toLowerCase())
    ), [currentWorks, searchTerm]
  );

  const handleRetry = useCallback(async () => {
    if (isRefreshing) return; // Prevent multiple simultaneous calls
    
    setIsRefreshing(true);
    try {
      await dispatch(fetchMyWorks()).unwrap();
      setLastFetchTime(Date.now());
    } catch (error) {
      console.error('Failed to refresh:', error);
    } finally {
      setIsRefreshing(false);
    }
  }, [dispatch, isRefreshing]);

  const totalWorks = useMemo(() => Array.isArray(workData) ? workData.length : 0, [workData]);

  if (loading && !hasFetched) {
    return (
      <div>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="relative inline-block">
              <div className="w-24 h-24 border-4 border-orange-200 rounded-full"></div>
              <div className="absolute top-0 left-0 w-24 h-24 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
              <ChefHat className="w-8 h-8 text-orange-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            <p className="text-lg font-medium text-gray-700">Loading your works...</p>
            <p className="text-sm text-gray-500">We're preparing everything for you</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error && !workData) {
    return (
      <div>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center">
          <div className="text-center">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">Error Loading Works</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={handleRetry}
              className={`px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors ${
                isRefreshing ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isRefreshing}
            >
              {isRefreshing ? 'Retrying...' : 'Retry'}
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">My Works</h1>
                <p className="text-gray-600">Manage your catering assignments and track progress</p>
              </div>
              <div className="flex items-center gap-4 mt-4 md:mt-0">
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search works..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <button
                  onClick={handleRetry}
                  className={`px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2 ${
                    isRefreshing ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={isRefreshing}
                >
                  {isRefreshing ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    'Refresh'
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Updated Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {/* Total Works Card */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600">Total Works</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-800">{totalWorks}</p>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <ChefHat className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                </div>
              </div>
            </div>

            {/* Pending Works Card */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600">Pending Works</p>
                  <p className="text-xl md:text-2xl font-bold text-yellow-600">{worksByCategory.pending.length}</p>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 md:w-6 md:h-6 text-yellow-600" />
                </div>
              </div>
            </div>

            {/* Completed Works Card */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600">Completed</p>
                  <p className="text-xl md:text-2xl font-bold text-green-600">{worksByCategory.completed.length}</p>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                </div>
              </div>
            </div>

            {/* Accepted Requests Card */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600">Accepted</p>
                  <p className="text-xl md:text-2xl font-bold text-green-600">{worksByCategory.requestAccepted.length}</p>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-xl shadow-lg mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${activeTab === tab.id
                      ? 'border-orange-600 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                  >
                    {tab.label}
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs ${activeTab === tab.id
                      ? 'bg-orange-100 text-orange-600'
                      : 'bg-gray-100 text-gray-600'
                      }`}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Works Grid */}
          <div className="grid gap-6">
            {filteredWorks.length > 0 ? (
              filteredWorks.map((work) => (
                <WorkCard key={work.id} work={work} />
              ))
            ) : (
              <div className="text-center py-12">
                <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">No works found</h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm ? 'Try adjusting your search terms' : 'No works available in this category'}
                </p>
                {!searchTerm && totalWorks === 0 && (
                  <button
                    onClick={handleRetry}
                    className={`px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors ${
                      isRefreshing ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={isRefreshing}
                  >
                    {isRefreshing ? 'Refreshing...' : 'Refresh Works'}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyWorksPage;