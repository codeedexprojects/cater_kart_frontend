import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWorkAnalyticsList, getWorkPaymentSummary } from '../../Services/Api/Admin/WorkSlice';
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  Search,
  Filter,
  Eye,
  X,
  BarChart3,
  DollarSign,
  Users,
  Clock,
  AlertCircle,
  ChevronRight,
  Download,
  RefreshCw,
  PieChart,
  Target,
  Award,
  Activity,
  CheckCircle,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  Briefcase,
  MapPin,
  Phone,
  Mail,
  Star,
  Loader2,
  FileX
} from 'lucide-react';

const WorkAnalytics = () => {
  const dispatch = useDispatch();
  const { analyticsList, paymentSummary, loading, error } = useSelector((state) => state.work);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWork, setSelectedWork] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCard, setSelectedCard] = useState('overview');
  const [paymentSummaryLoading, setPaymentSummaryLoading] = useState(false);

  useEffect(() => {
    dispatch(getWorkAnalyticsList());
  }, [dispatch]);

  const handleWorkSelect = async (workId) => {
    setPaymentSummaryLoading(true);
    try {
      await dispatch(getWorkPaymentSummary(workId));
      setSelectedWork(workId);
    } catch (error) {
      console.error('Error fetching payment summary:', error);
    } finally {
      setPaymentSummaryLoading(false);
    }
  };

  const closeDetails = () => {
    setSelectedWork(null);
  };

  // Filter and search functionality
  const filteredAnalytics = useMemo(() => {
    return analyticsList?.filter(item => {
      const matchesSearch = item.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.work_type?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'all' || item.status?.toLowerCase() === filterStatus.toLowerCase();
      return matchesSearch && matchesFilter;
    }) || [];
  }, [analyticsList, searchTerm, filterStatus]);

  // Loading Skeleton Component
  const LoadingSkeleton = ({ height = "h-20", className = "" }) => (
    <div className={`animate-pulse bg-gray-200 rounded-xl ${height} ${className}`}></div>
  );

  // No Data Component
  const NoDataMessage = ({ icon: Icon, title, description, action }) => (
    <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon className="h-10 w-10 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      {action}
    </div>
  );

  const StatCard = ({ title, value, icon: Icon, change, trend, color = "blue" }) => (
    <div className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 cursor-pointer ${selectedCard === title.toLowerCase().replace(/\s+/g, '-') ? `ring-2 ring-${color}-500` : ''}`}
         onClick={() => setSelectedCard(title.toLowerCase().replace(/\s+/g, '-'))}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {change && (
            <div className={`flex items-center mt-2 text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {trend === 'up' ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
              {change}
            </div>
          )}
        </div>
        <div className={`p-4 rounded-2xl bg-${color}-50`}>
          <Icon className={`h-8 w-8 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  const WorkCard = ({ work }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer group"
         onClick={() => handleWorkSelect(work.id)}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            work.status === 'Profit' ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {work.status === 'Profit' ? 
              <TrendingUp className="h-6 w-6 text-green-600" /> : 
              <TrendingDown className="h-6 w-6 text-red-600" />
            }
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {work.customer_name}
            </h3>
            <p className="text-sm text-gray-500 flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {work.date}
            </p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          work.status === 'Profit' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {work.status}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Work Type</span>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-lg text-xs font-medium">
            {work.work_type}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Revenue</span>
          <span className="font-semibold text-gray-900">₹{work.payment_amount?.toLocaleString()}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Profit/Loss</span>
          <span className={`font-bold ${
            work.status === 'Profit' ? 'text-green-600' : 'text-red-600'
          }`}>
            {work.status === 'Profit' ? '+' : '-'}₹{Math.abs(work.profit_or_loss || 0).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
        <div className="text-xs text-gray-500">
          <span>Wages: ₹{work.total_wages_paid?.toLocaleString()}</span>
        </div>
        <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
      </div>
    </div>
  );

  // Team Section Component with loading and no data states
  const TeamSection = ({ title, members, icon: Icon, color, gradientFrom, gradientTo }) => {
    if (!members || members.length === 0) {
      return (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Icon className={`h-5 w-5 mr-2 text-${color}-500`} />
            {title} (0)
          </h3>
          <NoDataMessage
            icon={FileX}
            title={`No ${title} Found`}
            description={`No ${title.toLowerCase()} have been assigned to this work yet.`}
            action={null}
          />
        </div>
      );
    }

    return (
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Icon className={`h-5 w-5 mr-2 text-${color}-500`} />
          {title} ({members.length})
        </h3>
        <div className="space-y-3">
          {members.map((member, index) => (
            <div key={index} className={`bg-gradient-to-r from-${gradientFrom}-50 to-${gradientTo}-50 rounded-xl p-4 border border-${color}-200`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className={`w-10 h-10 bg-${color}-100 rounded-full flex items-center justify-center mr-3`}>
                    <Icon className={`h-5 w-5 text-${color}-600`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{member.user_name}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      member.payment_status === 'paid' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {member.payment_status === 'paid' ? 'Paid' : 'Pending'}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">₹{member.total_wage}</p>
                  <p className="text-xs text-gray-500">Total Wage</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div>
                  <p className="text-gray-600">Base Fare</p>
                  <p className="font-semibold">₹{member.base_fare || 0}</p>
                </div>
                {member.travel_allowance !== undefined && (
                  <div>
                    <p className="text-gray-600">Travel Allow.</p>
                    <p className="font-semibold">₹{member.travel_allowance}</p>
                  </div>
                )}
                {member.over_time !== undefined && (
                  <div>
                    <p className="text-gray-600">Overtime</p>
                    <p className="font-semibold">₹{member.over_time}</p>
                  </div>
                )}
                {member.bonus !== undefined && (
                  <div>
                    <p className="text-gray-600">Bonus</p>
                    <p className="font-semibold">₹{member.bonus}</p>
                  </div>
                )}
                {member.rating_amount !== undefined && (
                  <div>
                    <p className="text-gray-600">Rating Bonus</p>
                    <p className="font-semibold">₹{member.rating_amount}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Work Analytics
            </h1>
            <p className="text-gray-600 mt-2">Comprehensive insights into your business performance</p>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => dispatch(getWorkAnalyticsList())}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by customer name or work type..."
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="space-y-6">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <LoadingSkeleton height="h-12 w-12" />
                    <div className="space-y-2">
                      <LoadingSkeleton height="h-4 w-32" />
                      <LoadingSkeleton height="h-3 w-24" />
                    </div>
                  </div>
                  <LoadingSkeleton height="h-6 w-16" />
                </div>
                <div className="space-y-3">
                  <LoadingSkeleton height="h-4" />
                  <LoadingSkeleton height="h-4" />
                  <LoadingSkeleton height="h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
          <div className="flex items-center">
            <AlertCircle className="h-6 w-6 text-red-500 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-red-800">Error Loading Data</h3>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Works Grid/List */}
      {!loading && !error && (
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {filteredAnalytics.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
      )}

      {/* Payment Summary Modal */}
      {selectedWork && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {paymentSummaryLoading ? (
                      <div className="flex items-center">
                        <Loader2 className="h-6 w-6 mr-2 animate-spin" />
                        Loading...
                      </div>
                    ) : (
                      paymentSummary?.work_title || 'Work Details'
                    )}
                  </h2>
                  <p className="text-gray-600 mt-1">Payment Summary & Details</p>
                </div>
                <button
                  onClick={closeDetails}
                  className="p-2 hover:bg-white rounded-xl transition-colors"
                >
                  <X className="h-6 w-6 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {paymentSummaryLoading ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                      {[...Array(3)].map((_, index) => (
                        <div key={index}>
                          <LoadingSkeleton height="h-6 w-48" className="mb-4" />
                          <div className="space-y-3">
                            {[...Array(2)].map((_, idx) => (
                              <LoadingSkeleton key={idx} height="h-24" />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-6">
                      <LoadingSkeleton height="h-48" />
                      <LoadingSkeleton height="h-32" />
                    </div>
                  </div>
                </div>
              ) : !paymentSummary ? (
                <NoDataMessage
                  icon={FileX}
                  title="No Payment Data Found"
                  description="Unable to load payment summary for this work."
                  action={
                    <button 
                      onClick={() => handleWorkSelect(selectedWork)}
                      className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-colors"
                    >
                      Retry
                    </button>
                  }
                />
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Team Members Summary */}
                  <div className="lg:col-span-2 space-y-6">
                    
                    {/* Captains */}
                    <TeamSection
                      title="Captains"
                      members={paymentSummary.captains}
                      icon={Award}
                      color="yellow"
                      gradientFrom="yellow"
                      gradientTo="orange"
                    />

                    {/* Boys */}
                    <TeamSection
                      title="Team Members"
                      members={paymentSummary.boys}
                      icon={Users}
                      color="blue"
                      gradientFrom="blue"
                      gradientTo="indigo"
                    />

                    {/* Head Boys */}
                    <TeamSection
                      title="Head Boys"
                      members={paymentSummary.head_boys}
                      icon={Briefcase}
                      color="purple"
                      gradientFrom="purple"
                      gradientTo="pink"
                    />

                    {/* Supervisors */}
                    <TeamSection
                      title="Supervisors"
                      members={paymentSummary.supervisors}
                      icon={Eye}
                      color="green"
                      gradientFrom="green"
                      gradientTo="emerald"
                    />
                  </div>

                  {/* Summary Panel */}
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Summary</h3>
                      
                      {/* Calculate totals */}
                      {(() => {
                        const allMembers = [
                          ...(paymentSummary.boys || []),
                          ...(paymentSummary.head_boys || []),
                          ...(paymentSummary.supervisors || []),
                          ...(paymentSummary.captains || [])
                        ];

                        if (allMembers.length === 0) {
                          return (
                            <NoDataMessage
                              icon={Users}
                              title="No Team Members"
                              description="No team members found for this work."
                              action={null}
                            />
                          );
                        }

                        const totalPaid = allMembers.reduce((sum, person) => sum + parseFloat(person.total_wage || 0), 0);
                        const paidAmount = allMembers
                          .filter(person => person.payment_status === 'paid')
                          .reduce((sum, person) => sum + parseFloat(person.total_wage || 0), 0);
                        const pendingAmount = totalPaid - paidAmount;

                        return (
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">Total Wages</span>
                              <span className="text-xl font-bold text-gray-900">₹{totalPaid.toLocaleString()}</span>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 flex items-center">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                                Paid
                              </span>
                              <span className="text-lg font-semibold text-green-600">₹{paidAmount.toLocaleString()}</span>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 flex items-center">
                                <XCircle className="h-4 w-4 text-red-500 mr-1" />
                                Pending
                              </span>
                              <span className="text-lg font-semibold text-red-600">₹{pendingAmount.toLocaleString()}</span>
                            </div>

                            <div className="pt-4 border-t border-gray-200">
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">Total Team</span>
                                <span className="text-lg font-semibold text-gray-900">
                                  {allMembers.length} members
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    {/* Extra Expenses */}
                    {paymentSummary.extra_expense && paymentSummary.extra_expense.length > 0 ? (
                      <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                          <AlertCircle className="h-5 w-5 mr-2 text-orange-500" />
                          Extra Expenses
                        </h3>
                        <div className="space-y-3">
                          {paymentSummary.extra_expense.map((expense, index) => (
                            <div key={index} className="flex justify-between items-center">
                              <span className="text-gray-600">{expense.description || `Expense ${index + 1}`}</span>
                              <span className="font-semibold text-red-600">₹{expense.amount}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                          <AlertCircle className="h-5 w-5 mr-2 text-gray-500" />
                          Extra Expenses
                        </h3>
                        <div className="text-center py-4">
                          <FileX className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">No extra expenses recorded</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredAnalytics.length === 0 && (
        <div className="bg-white rounded-2xl p-16 shadow-sm border border-gray-100 text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <BarChart3 className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">No Analytics Data Found</h3>
          <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
            {searchTerm || filterStatus !== 'all' 
              ? 'No results match your current search criteria. Try adjusting your filters.' 
              : 'Start by adding some work records to see comprehensive analytics and insights here.'}
          </p>
          {searchTerm || filterStatus !== 'all' ? (
            <button 
              onClick={() => {
                setSearchTerm('');
                setFilterStatus('all');
              }}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium"
            >
              Clear Filters
            </button>
          ) : (
            <button className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium">
              Add First Work
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default WorkAnalytics;