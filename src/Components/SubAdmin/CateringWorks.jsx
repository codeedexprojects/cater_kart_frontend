import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCateringWorkList, getAssignedUsers, submitAttendanceRating, getBoyRating, updateBoyRating, submitBoyWage, submitSubAdminSupervisorWage, updateSubAdminSupervisorWage, addExtraExpense } from '../../Services/Api/SubAdmin/SubLoginSlice';
import { Search, Filter, Calendar, MapPin, User, Phone, Eye, AlertCircle, RefreshCw, Users, Clock, ExternalLink, Star, StarOff, CheckCircle, X } from 'lucide-react';

const CateringWorks = () => {
  const dispatch = useDispatch();
  const { cateringWorkList, assignedUsers, attendanceRating, boyWage, boyRating } = useSelector((state) => state.subAdminAuth);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterWorkType, setFilterWorkType] = useState('all');
  const [selectedWork, setSelectedWork] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentRatingUser, setCurrentRatingUser] = useState(null);
  const [currentWorkId, setCurrentWorkId] = useState(null);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showAssignedUsersModal, setShowAssignedUsersModal] = useState(false);
  const [selectedWorkForUsers, setSelectedWorkForUsers] = useState(null);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedUserForRating, setSelectedUserForRating] = useState(null);
  const [editingRatingId, setEditingRatingId] = useState(null);
  const [showWageModal, setShowWageModal] = useState(false);
  const [selectedUserForWage, setSelectedUserForWage] = useState(null);
  const [isWageEditMode, setIsWageEditMode] = useState(false);
  const [editingWageId, setEditingWageId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [selectedWorkForExpense, setSelectedWorkForExpense] = useState(null);

  // REMOVED DUPLICATE boyRating DECLARATION AND FIXED ratingData STATE
  const [ratingData, setRatingData] = useState({
    pant: null,
    shoe: null,
    timing: null,
    neatness: null,
    performance: null,
    comment: '',
    arrival_time: '',
    attendence: 1,
    travel_allowance: '',
    over_time: '',
    long_fare: '',
    bonus: '',
    payment_status: 'not_paid'
  });

useEffect(() => {
  dispatch(getCateringWorkList('upcoming'));
  dispatch(getCateringWorkList('past'));
}, [dispatch]);

const handleRefresh = () => {
  dispatch(getCateringWorkList('upcoming'));
  dispatch(getCateringWorkList('past'));
};

const currentWorkList = activeTab === 'upcoming' 
  ? (cateringWorkList.upcoming?.data || []) 
  : (cateringWorkList.past?.data || []);

  const filteredWorks = currentWorkList.filter(work => {
    const matchesSearch = work.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        work.place?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        work.district?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        work.work_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        work.Auditorium_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        work.Catering_company?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || work.status === filterStatus;
    const matchesWorkType = filterWorkType === 'all' || work.work_type === filterWorkType;
    
    return matchesSearch && matchesStatus && matchesWorkType;
  });


  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'confirmed':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  

  const getWorkTypeColor = (workType) => {
    switch (workType?.toLowerCase()) {
      case 'wedding':
        return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'break_fast':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'lunch':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'dinner':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'party':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatWorkType = (workType) => {
    if (!workType) return 'N/A';
    return workType.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const openModal = (work) => {
    setSelectedWork(work);
    setShowModal(true);
    // Fetch assigned users for this work
    dispatch(getAssignedUsers(work.id));
  };

  // Add this useEffect to populate form when editing
useEffect(() => {
  if (isEditMode && boyRating.data && !boyRating.isLoading) {
    const rating = boyRating.data;
    setRatingData({
      pant: rating.pant,
      shoe: rating.shoe,
      timing: rating.timing,
      neatness: rating.neatness,
      performance: rating.performance,
      comment: rating.comment || '',
      arrival_time: rating.arrival_time || '',
      attendence: rating.attendence,
      travel_allowance: rating.travel_allowance || '',
      over_time: rating.over_time || '',
      long_fare: rating.long_fare || '',
      bonus: rating.bonus || '',
      payment_status: rating.payment_status || 'not_paid'
    });
  }
}, [isEditMode, boyRating.data, boyRating.isLoading]);

  const closeModal = () => {
    setSelectedWork(null);
    setShowModal(false);
  };

  const handleRatingChange = (field, value) => {
    setRatingData(prev => ({
      ...prev,
      [field]: value
    }));
  };


  // Get unique work types for filter
  const workTypes = [...new Set(currentWorkList.map(work => work.work_type).filter(Boolean))];
  const currentAssignedUsers = currentWorkId ? assignedUsers.data[currentWorkId] || [] : [];
  const selectedWorkAssignedUsers = selectedWork ? assignedUsers.data[selectedWork.id] || [] : [];

const isLoading = cateringWorkList.upcoming?.isLoading || cateringWorkList.past?.isLoading;
const hasError = cateringWorkList.upcoming?.error || cateringWorkList.past?.error;

// Updated RatingModal component
const RatingModal = ({ 
  user, 
  work, 
  onClose, 
  onSubmit,
  initialData = {},
  isEditMode = false 
}) => {
  const [ratingData, setRatingData] = useState({
    pant: initialData.pant || null,
    shoe: initialData.shoe || null,
    timing: initialData.timing || null,
    neatness: initialData.neatness || null,
    performance: initialData.performance || null,
    comment: initialData.comment || '',
    arrival_time: initialData.arrival_time || '',
    attendence: initialData.attendence || 1
  });

  const handleSubmit = () => {
    const submitData = {
      user: user.user_id,
      work: work.id,
      pant: ratingData.pant,
      shoe: ratingData.shoe,
      timing: ratingData.timing,
      neatness: ratingData.neatness,
      performance: ratingData.performance,
      comment: ratingData.comment,
      arrival_time: ratingData.arrival_time,
      attendence: ratingData.attendence
    };
    onSubmit(submitData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
      <div className="bg-white rounded-t-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {isEditMode ? 'Edit Rating for' : 'Rate'} {user.user_name}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        <div className="p-4 space-y-6 pb-40">
          {/* Boolean Rating Components */}
          {['pant', 'shoe', 'timing', 'neatness', 'performance'].map((category) => (
            <div key={category}>
              <label className="block text-base font-medium text-gray-700 mb-3 capitalize">
                {category}
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => setRatingData(prev => ({...prev, [category]: true}))}
                  className={`flex-1 py-3 px-4 rounded-lg border font-medium flex items-center justify-center ${
                    ratingData[category] === true
                      ? 'bg-green-50 border-green-200 text-green-700'
                      : 'bg-gray-50 border-gray-200 text-gray-700'
                  }`}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Good
                </button>
                <button
                  onClick={() => setRatingData(prev => ({...prev, [category]: false}))}
                  className={`flex-1 py-3 px-4 rounded-lg border font-medium flex items-center justify-center ${
                    ratingData[category] === false
                      ? 'bg-red-50 border-red-200 text-red-700'
                      : 'bg-gray-50 border-gray-200 text-gray-700'
                  }`}
                >
                  <X className="h-4 w-4 mr-2" />
                  Poor
                </button>
              </div>
            </div>
          ))}

          {/* Arrival Time */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-3">Arrival Time</label>
            <input
              type="time"
              value={ratingData.arrival_time}
              onChange={(e) => setRatingData(prev => ({...prev, arrival_time: e.target.value}))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Comment */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-3">Comment</label>
            <textarea
              value={ratingData.comment}
              onChange={(e) => setRatingData(prev => ({...prev, comment: e.target.value}))}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Add your comments..."
            />
          </div>

          {/* Attendance Toggle */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-3">Attendance</label>
            <div className="flex gap-3">
              <button
                onClick={() => setRatingData(prev => ({...prev, attendence: 1}))}
                className={`flex-1 py-3 px-4 rounded-lg border font-medium ${
                  ratingData.attendence === 1
                    ? 'bg-green-50 border-green-200 text-green-700'
                    : 'bg-gray-50 border-gray-200 text-gray-700'
                }`}
              >
                Present
              </button>
              <button
                onClick={() => setRatingData(prev => ({...prev, attendence: 0}))}
                className={`flex-1 py-3 px-4 rounded-lg border font-medium ${
                  ratingData.attendence === 0
                    ? 'bg-red-50 border-red-200 text-red-700'
                    : 'bg-gray-50 border-gray-200 text-gray-700'
                }`}
              >
                Absent
              </button>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 space-y-3">
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-4 px-4 rounded-xl font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-base"
          >
            {isEditMode ? 'Update Rating' : 'Submit Rating'}
          </button>
          
          <button
            onClick={onClose}
            className="w-full bg-gray-100 text-gray-700 py-4 px-4 rounded-xl font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-base"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// Updated WageFormModal component - for individual users
const WageFormModal = ({ 
  user, 
  work, 
  onClose, 
  onSubmit,
  initialData = {},
  isEditMode = false 
}) => {
  const [wageData, setWageData] = useState({
    rating_amount: initialData.rating_amount || '',
    travel_allowance: initialData.travel_allowance || '',
    over_time: initialData.over_time || '',
    long_fare: initialData.long_fare || '',
    bonus: initialData.bonus || '',
    extra_loading: initialData.extra_loading || '',
    extra_setting: initialData.extra_setting || '',
    payment_status: initialData.payment_status || 'not_paid'
  });

  const handleSubmit = () => {
    const submitData = {
      user: user.user_id,
      work: work.id,
      rating_amount: wageData.rating_amount ? parseFloat(wageData.rating_amount) : 0,
      travel_allowance: wageData.travel_allowance ? parseFloat(wageData.travel_allowance) : 0,
      over_time: wageData.over_time ? parseFloat(wageData.over_time) : 0,
      long_fare: wageData.long_fare ? parseFloat(wageData.long_fare) : 0,
      bonus: wageData.bonus ? parseFloat(wageData.bonus) : 0,
      extra_loading: wageData.extra_loading ? parseFloat(wageData.extra_loading) : 0,
      extra_setting: wageData.extra_setting ? parseFloat(wageData.extra_setting) : 0,
      payment_status: wageData.payment_status
    };
    onSubmit(submitData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
      <div className="bg-white rounded-t-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {isEditMode ? 'Edit Wage for' : 'Add Wage for'} {user.user_name}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        <div className="p-4 space-y-6 pb-40">
          {/* Wage Section */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h4 className="text-lg font-semibold text-blue-900 mb-4">Wage Details</h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating Amount</label>
                <input
                  type="number"
                  step="0.01"
                  value={wageData.rating_amount}
                  onChange={(e) => setWageData(prev => ({...prev, rating_amount: e.target.value}))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Travel Allowance</label>
                <input
                  type="number"
                  step="0.01"
                  value={wageData.travel_allowance}
                  onChange={(e) => setWageData(prev => ({...prev, travel_allowance: e.target.value}))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Over Time</label>
                <input
                  type="number"
                  step="0.01"
                  value={wageData.over_time}
                  onChange={(e) => setWageData(prev => ({...prev, over_time: e.target.value}))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Long Fare</label>
                <input
                  type="number"
                  step="0.01"
                  value={wageData.long_fare}
                  onChange={(e) => setWageData(prev => ({...prev, long_fare: e.target.value}))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bonus</label>
                <input
                  type="number"
                  step="0.01"
                  value={wageData.bonus}
                  onChange={(e) => setWageData(prev => ({...prev, bonus: e.target.value}))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Extra Loading</label>
                <input
                  type="number"
                  step="0.01"
                  value={wageData.extra_loading}
                  onChange={(e) => setWageData(prev => ({...prev, extra_loading: e.target.value}))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Extra Setting</label>
                <input
                  type="number"
                  step="0.01"
                  value={wageData.extra_setting}
                  onChange={(e) => setWageData(prev => ({...prev, extra_setting: e.target.value}))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Status</label>
                <select
                  value={wageData.payment_status}
                  onChange={(e) => setWageData(prev => ({...prev, payment_status: e.target.value}))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="paid">Paid</option>
                  <option value="not_paid">Not Paid</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 space-y-3">
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-4 px-4 rounded-xl font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-base"
          >
            {isEditMode ? 'Update Wage' : 'Submit Wage'}
          </button>
          
          <button
            onClick={onClose}
            className="w-full bg-gray-100 text-gray-700 py-4 px-4 rounded-xl font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-base"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// FIXED ExpenseModal component - for entire work expenses
const ExpenseModal = ({ 
  work, 
  onClose, 
  onSubmit,
  initialData = {}
}) => {
  const [expenseData, setExpenseData] = useState({
    expenses: initialData.expenses || []
  });
  
  const [newExpense, setNewExpense] = useState({
    catering_work: work.id, // FIXED: Set the work ID here
    expense_type: '',
    amount: '',
    description: ''
  });

  const handleAddExpense = () => {
    if (newExpense.expense_type && newExpense.amount) {
      setExpenseData(prev => ({
        ...prev,
        expenses: [...prev.expenses, {
          catering_work: work.id, // FIXED: Include catering_work ID
          expense_type: newExpense.expense_type,
          amount: parseFloat(newExpense.amount),
          description: newExpense.description
        }]
      }));
      setNewExpense({
        catering_work: work.id, // FIXED: Keep work ID when resetting
        expense_type: '',
        amount: '',
        description: ''
      });
    }
  };

  const handleRemoveExpense = (index) => {
    setExpenseData(prev => ({
      ...prev,
      expenses: prev.expenses.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = () => {
    // FIXED: Submit each expense individually as per API structure
    expenseData.expenses.forEach(expense => {
      const submitData = {
        catering_work: work.id,
        expense_type: expense.expense_type,
        amount: expense.amount.toString(), // Convert to string as per API
        description: expense.description
      };
      onSubmit(submitData);
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
      <div className="bg-white rounded-t-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Work Expenses - {work.Auditorium_name}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        <div className="p-4 space-y-6 pb-40">
          {/* Expense List */}
          {expenseData.expenses.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Current Expenses</h4>
              <div className="space-y-2">
                {expenseData.expenses.map((expense, index) => (
                  <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200">
                    <div>
                      <p className="font-medium">{expense.expense_type}</p>
                      <p className="text-sm text-gray-600">{expense.description || 'No description'}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="font-bold mr-3">₹{expense.amount}</span>
                      <button 
                        onClick={() => handleRemoveExpense(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add New Expense Form */}
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h4 className="text-lg font-semibold text-green-900 mb-4">Add New Expense</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expense Type</label>
                <input
                  type="text"
                  value={newExpense.expense_type}
                  onChange={(e) => setNewExpense(prev => ({...prev, expense_type: e.target.value}))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., Transportation, Food"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense(prev => ({...prev, amount: e.target.value}))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <input
                    type="text"
                    value={newExpense.description}
                    onChange={(e) => setNewExpense(prev => ({...prev, description: e.target.value}))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Optional"
                  />
                </div>
              </div>

              <button
                onClick={handleAddExpense}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-sm"
              >
                Add Expense
              </button>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 space-y-3">
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-4 px-4 rounded-xl font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-base"
          >
            Save Expenses
          </button>
          
          <button
            onClick={onClose}
            className="w-full bg-gray-100 text-gray-700 py-4 px-4 rounded-xl font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-base"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Catering Works</h1>
            <p className="text-sm text-gray-600">Manage all catering assignments</p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={cateringWorkList.isLoading}
            className="p-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 shadow-sm"
          >
            <RefreshCw className={`h-5 w-5 ${cateringWorkList.isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Tab Navigation */}
<div className="flex bg-gray-100 rounded-lg p-1 mb-4">
  <button
    onClick={() => setActiveTab('upcoming')}
    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
      activeTab === 'upcoming'
        ? 'bg-white text-blue-600 shadow-sm'
        : 'text-gray-600 hover:text-gray-900'
    }`}
  >
    Upcoming Works
    {cateringWorkList.upcoming?.data?.length > 0 && (
      <span className="ml-2 bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs">
        {cateringWorkList.upcoming.data.length}
      </span>
    )}
  </button>
  <button
    onClick={() => setActiveTab('past')}
    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
      activeTab === 'past'
        ? 'bg-white text-blue-600 shadow-sm'
        : 'text-gray-600 hover:text-gray-900'
    }`}
  >
    Past Works
    {cateringWorkList.past?.data?.length > 0 && (
      <span className="ml-2 bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs">
        {cateringWorkList.past.data.length}
      </span>
    )}
  </button>
</div>

      </div>

      {/* Loading State */}
      {cateringWorkList.isLoading && (
        <div className="text-center py-8">
          <div className="inline-flex items-center">
            <RefreshCw className="h-5 w-5 animate-spin mr-2 text-blue-500" />
            <span className="text-gray-600">Loading catering works...</span>
          </div>
        </div>
      )}

      {/* Error State */}
      {cateringWorkList.error && (
        <div className="mb-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
              <p className="text-red-700 text-sm font-medium">{cateringWorkList.error}</p>
            </div>
          </div>
        </div>
      )}

{!isLoading && !hasError && (
  <div className="space-y-3">
    {filteredWorks.length === 0 ? (
      <div className="text-center py-8 text-gray-500">
        <p>No {activeTab} works found.</p>
      </div>
    ) : (
      filteredWorks.map((work) => (
        <div key={work.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          {/* Card Header */}
          <div className="flex items-center justify-between mb-3">
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getWorkTypeColor(work.work_type)}`}>
              {formatWorkType(work.work_type)}
            </span>
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(work.status)}`}>
              {work.status ? work.status.charAt(0).toUpperCase() + work.status.slice(1) : 'Unknown'}
            </span>
          </div>

          {/* Clickable Card Content */}
          <div 
            onClick={() => openModal(work)}
            className="cursor-pointer"
          >
            {/* Venue - Highlighted */}
            <div className="mb-3">
              <h3 className="text-lg font-bold text-gray-900 mb-1">{work.Auditorium_name || 'Venue Not Specified'}</h3>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="flex-1">{work.place || 'N/A'}, {work.district || 'N/A'}</span>
                {work.location_url && (
                  <a
                    href={work.location_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 p-1 ml-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center mb-1">
                  <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-xs text-gray-500">Date</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{formatDate(work.date)}</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center mb-1">
                  <Clock className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-xs text-gray-500">Time</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{formatTime(work.reporting_time)}</span>
              </div>
            </div>
          </div>

          {/* Boys Needed Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedWorkForUsers(work);
              setShowAssignedUsersModal(true);
              dispatch(getAssignedUsers(work.id));
            }}
            className="w-full bg-blue-50 hover:bg-blue-100 rounded-lg p-3 mb-3 transition-colors"
          >
            <div className="flex items-center justify-center">
              <Users className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-base font-bold text-blue-900">{work.no_of_boys_needed || 0} Boys Needed</span>
            </div>
          </button>

          {/* Work Expenses Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedWorkForExpense(work);
              setShowExpenseModal(true);
            }}
            className="w-full bg-green-50 hover:bg-green-100 rounded-lg p-3 mb-4 transition-colors"
          >
            <div className="flex items-center justify-center">
              <div className="h-5 w-5 text-green-600 mr-2">₹</div>
              <span className="text-base font-bold text-green-900">Work Expenses</span>
            </div>
          </button>
        </div>
      ))
    )}
  </div>
)}

{/* Updated Detail Modal */}
{showModal && selectedWork && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
    <div className="bg-white rounded-t-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Work Details</h3>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-600 p-2"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>
      
      <div className="p-4 space-y-4">
        {/* Venue - Highlighted */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h4 className="font-bold text-blue-900 text-xl mb-2">{selectedWork.Auditorium_name || 'Venue Not Specified'}</h4>
          <div className="flex items-center text-blue-700">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{selectedWork.place || 'N/A'}, {selectedWork.district || 'N/A'}</span>
            {selectedWork.location_url && (
              <a
                href={selectedWork.location_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 p-1 ml-2"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
          {selectedWork.address && (
            <p className="text-sm text-blue-600 mt-2">{selectedWork.address}</p>
          )}
        </div>

        {/* Work Information */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3">Work Information</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Work Type</span>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getWorkTypeColor(selectedWork.work_type)}`}>
                {formatWorkType(selectedWork.work_type)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Status</span>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(selectedWork.status)}`}>
                {selectedWork.status ? selectedWork.status.charAt(0).toUpperCase() + selectedWork.status.slice(1) : 'Unknown'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Published</span>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${selectedWork.is_published ? 'bg-green-100 text-green-800 border-green-200' : 'bg-gray-100 text-gray-800 border-gray-200'}`}>
                {selectedWork.is_published ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Date</span>
              <span className="text-sm font-medium text-gray-900">{formatDate(selectedWork.date)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Reporting Time</span>
              <span className="text-sm font-medium text-gray-900">{formatTime(selectedWork.reporting_time)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Boys Needed</span>
              <span className="text-sm font-medium text-gray-900">{selectedWork.no_of_boys_needed || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Attendees</span>
              <span className="text-sm font-medium text-gray-900">{selectedWork.attendees || 0}</span>
            </div>
          </div>
        </div>

        {/* Assigned Users */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3">Assigned Users</h4>
          {assignedUsers.isLoading ? (
            <div className="text-center py-4">
              <RefreshCw className="h-5 w-5 animate-spin mx-auto text-blue-500" />
              <p className="text-sm text-gray-600 mt-2">Loading assigned users...</p>
            </div>
          ) : selectedWorkAssignedUsers.length === 0 ? (
            <p className="text-sm text-gray-600">No users assigned to this work.</p>
          ) : (
            <div className="space-y-3">
              {selectedWorkAssignedUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full mr-3">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{user.user_name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.type === 'supervisor' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                          {user.type}
                        </span>
                        {user.is_rated && (
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            Rated
                          </span>
                        )}
                        {user.wage_id && (
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            Wage Added
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">
                    {formatDate(user.assigned_at)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Instructions */}
        {selectedWork.instructions && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Instructions</h4>
            <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{selectedWork.instructions}</p>
          </div>
        )}

        {/* About Work */}
        {selectedWork.About_work && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">About Work</h4>
            <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{selectedWork.About_work}</p>
          </div>
        )}
      </div>

      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
        <button
          onClick={closeModal}
          className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

{/* Assigned Users Modal */}
{showAssignedUsersModal && selectedWorkForUsers && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
    <div className="bg-white rounded-t-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Assigned Boys</h3>
          <button
            onClick={() => {
              setShowAssignedUsersModal(false);
              setSelectedWorkForUsers(null);
            }}
            className="text-gray-400 hover:text-gray-600 p-2"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>
      
      <div className="p-4 space-y-4">
        {assignedUsers.isLoading ? (
        <div className="text-center py-8">
          <RefreshCw className="h-5 w-5 animate-spin mx-auto text-blue-500" />
          <p className="text-sm text-gray-600 mt-2">Loading assigned users...</p>
        </div>
      ) : !assignedUsers.data[selectedWorkForUsers.id] || assignedUsers.data[selectedWorkForUsers.id].length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No users assigned to this work.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {assignedUsers.data[selectedWorkForUsers.id].map((user) => (
            <div key={user.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full mr-3">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-base font-medium text-gray-900">{user.user_name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.type === 'supervisor' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {user.type}
                      </span>
                      {user.is_rated && (
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          ✓ Rated
                        </span>
                      )}
                      {user.wage_id && (
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          ✓ Wage Added
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                {/* Rate Button - Only for boys */}
                {user.type === 'boys' && (
                  <button
                    onClick={() => {
                      setSelectedUserForRating(user);
                      setShowRatingModal(true);
                      setIsEditMode(!!user.is_rated);
                      setEditingRatingId(user.is_rated || null);
                      if (user.is_rated) {
                        dispatch(getBoyRating(user.is_rated));
                      }
                    }}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
                  >
                    {user.is_rated ? 'Edit Rating' : 'Rate User'}
                  </button>
                )}
                
                {/* Wage Button - For everyone, but boys need rating first */}
                {(user.type !== 'boys' || user.is_rated) && (
                  <button
                    onClick={() => {
                      setSelectedUserForWage(user);
                      setShowWageModal(true);
                      setIsWageEditMode(!!user.wage_id);
                      setEditingWageId(user.wage_id || null);
                    }}
                    className={`${user.type === 'boys' ? 'flex-1' : 'w-full'} bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700`}
                  >
                    {user.wage_id ? 'Edit Wage' : 'Add Wage'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  </div>
)}

{/* FIXED Rating Modal */}
{showRatingModal && selectedUserForRating && selectedWorkForUsers && (
  <RatingModal
    user={selectedUserForRating}
    work={selectedWorkForUsers}
    onClose={() => {
      setShowRatingModal(false);
      setSelectedUserForRating(null);
      setIsEditMode(false);
      setEditingRatingId(null);
    }}
    onSubmit={(ratingData) => {
      if (isEditMode && editingRatingId) {
        dispatch(updateBoyRating({ 
          ratingId: editingRatingId, 
          ratingData 
        }));
      } else {
        dispatch(submitAttendanceRating(ratingData));
      }
      setShowRatingModal(false);
      setSelectedUserForRating(null);
      setIsEditMode(false);
      setEditingRatingId(null);
      // Refresh assigned users data
      dispatch(getAssignedUsers(selectedWorkForUsers.id));
    }}
    initialData={isEditMode && boyRating.data ? boyRating.data : {}}
    isEditMode={isEditMode}
  />
)}

{/* FIXED Wage Modal */}
{showWageModal && selectedUserForWage && selectedWorkForUsers && (
  <WageFormModal
    user={selectedUserForWage}
    work={selectedWorkForUsers}
    onClose={() => {
      setShowWageModal(false);
      setSelectedUserForWage(null);
      setIsWageEditMode(false);
      setEditingWageId(null);
    }}
    onSubmit={(wageData) => {
      if (selectedUserForWage.type === 'boys') {
        // Use existing boy wage API
        if (isWageEditMode && editingWageId) {
          dispatch(submitBoyWage({ 
            wageId: editingWageId, 
            wageData 
          }));
        } else {
          dispatch(submitBoyWage(wageData));
        }
      } else {
        // Use new API for subadmin/supervisor wage
        if (isWageEditMode && editingWageId) {
          dispatch(updateSubAdminSupervisorWage({ 
            wageId: editingWageId, 
            wageData 
          }));
        } else {
          dispatch(submitSubAdminSupervisorWage(wageData));
        }
      }
      setShowWageModal(false);
      setSelectedUserForWage(null);
      setIsWageEditMode(false);
      setEditingWageId(null);
      // Refresh assigned users data
      dispatch(getAssignedUsers(selectedWorkForUsers.id));
    }}
    initialData={isWageEditMode ? {} : {}}
    isEditMode={isWageEditMode}
  />
)}

{/* FIXED Expense Modal */}
{showExpenseModal && selectedWorkForExpense && (
  <ExpenseModal
    work={selectedWorkForExpense}
    onClose={() => {
      setShowExpenseModal(false);
      setSelectedWorkForExpense(null);
    }}
    onSubmit={(expenseData) => {
      dispatch(addExtraExpense(expenseData));
      setShowExpenseModal(false);
      setSelectedWorkForExpense(null);
    }}
    initialData={{}}
  />
)}
    </div>
  );
};

export default CateringWorks;