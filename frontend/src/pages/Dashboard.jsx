import React, { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import StatsRow from "@/components/dashboard/StatsRow";
import RoomAvailability from "@/components/dashboard/RoomAvailability";
import CheckInOut from "@/components/dashboard/CheckInOut";
import RecentAllocatedCamps from "@/components/dashboard/RecentAllocatedCamps";
import RecentActivities from "@/components/dashboard/RecentActivities";
import NewJoiners from "@/components/dashboard/NewJoiners";
import OccupancyOverview from "@/components/dashboard/OccupancyOverview";
import QuickActions from "@/components/dashboard/QuickActions";
import CampSummary from "@/components/dashboard/CampSummary";
import SupplierDistribution from "@/components/dashboard/SupplierDistribution";
import RoomCategoryDistribution from "@/components/dashboard/RoomCategoryDistribution";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden font-sans" style={{ backgroundColor: "#f4f3ee" }}>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Welcome + Add Camps */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Welcome back, Admin</h1>
              <p className="text-gray-500 text-sm mt-0.5">Camp management overview and activity.</p>
            </div>
            <button className="flex items-center gap-2 text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors" style={{ backgroundColor: "#c6ef4e" }}>
              <span className="text-lg leading-none">+</span> Add Camps
            </button>
          </div>

          {/* Stats Row */}
          <StatsRow />

          {/* Room Availability + Check In/Out */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RoomAvailability />
            </div>
            <CheckInOut />
          </div>

          {/* Recent Allocated Camps + Activities + New Joiners */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <RecentAllocatedCamps />
            <RecentActivities />
            <NewJoiners />
          </div>

          {/* Occupancy + Quick Actions + Camp Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <OccupancyOverview />
            <QuickActions />
            <CampSummary />
          </div>

          {/* Supplier Distribution + Room Category Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SupplierDistribution />
            <RoomCategoryDistribution />
          </div>
        </main>
      </div>
    </div>
  );
}