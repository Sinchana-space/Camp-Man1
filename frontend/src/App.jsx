import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
// Add page imports here
import Dashboard from "./pages/Dashboard";
import EmployeeMaster from "./pages/EmployeeMaster";
import CampManagement from "./pages/CampManagement";
import CheckInOut from "./pages/CheckInOut";
import RepairMaintenance from "./pages/RepairMaintenance";
import PreventiveMaintenance from "./pages/PreventiveMaintenance";
import StaffKPIMonitoring from "./pages/StaffKPIMonitoring";
import Inventory from "./pages/Inventory";
import ShiftScheduling from "./pages/ShiftScheduling";
import BedOccupancyDashboard from "./pages/BedOccupancyDashboard";
import RoomInspection from "./pages/RoomInspection";

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/employees" element={<EmployeeMaster />} />
      <Route path="/camps" element={<CampManagement />} />
      <Route path="/check-in-out" element={<CheckInOut />} />
      <Route path="/repair-maintenance" element={<RepairMaintenance />} />
      <Route path="/preventive-maintenance" element={<PreventiveMaintenance />} />
      <Route path="/staff-kpi" element={<StaffKPIMonitoring />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/shift-scheduling" element={<ShiftScheduling />} />
      <Route path="/bed-occupancy" element={<BedOccupancyDashboard />} />
      <Route path="/room-inspection" element={<RoomInspection />} />
      {/* Add your page Route elements here */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App