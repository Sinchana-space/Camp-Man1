import React, { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import { Users, UserCheck, UserMinus, Search, Upload, Plus, MoreHorizontal } from "lucide-react";

const employees = [
  { id: "CM-001", name: "Rajesh Kumar Sharma", role: "Senior Electrician", camp: "Bengaluru North Camp", passport: "T3821765", iqama: "IN9451237", phone: "+91 98451 12001", nationality: "Indian", status: "active" },
  { id: "CM-002", name: "Priya Venkataraman", role: "Camp Supervisor", camp: "Pune Industrial Camp", passport: "M7732190", iqama: "IN8392014", phone: "+91 98201 34872", nationality: "Indian", status: "active" },
  { id: "CM-003", name: "Arun Balakrishnan", role: "HVAC Technician", camp: "Chennai Coastal Camp", passport: "H5512349", iqama: "IN7183620", phone: "+91 94431 78291", nationality: "Indian", status: "active" },
  { id: "CM-004", name: "Sunita Devi Rao", role: "Head of Catering", camp: "Bengaluru North Camp", passport: "K8823014", iqama: "IN6842179", phone: "+91 97291 83740", nationality: "Indian", status: "active" },
  { id: "CM-005", name: "Mohan Lal Gupta", role: "Security Incharge", camp: "Hyderabad Tech Camp", passport: "P1947823", iqama: "IN5918273", phone: "+91 90123 45678", nationality: "Indian", status: "active" },
  { id: "CM-006", name: "Deepak Nair", role: "Maintenance Foreman", camp: "Mumbai Harbor Camp", passport: "B3301928", iqama: "IN4918273", phone: "+91 91928 37410", nationality: "Indian", status: "active" },
  { id: "CM-007", name: "Kavitha Subramaniam", role: "HR Coordinator", camp: "Chennai Coastal Camp", passport: "L9871234", iqama: "IN4827361", phone: "+91 89678 12340", nationality: "Indian", status: "active" },
  { id: "CM-008", name: "Santosh Patil", role: "Groundskeeper", camp: "Pune Industrial Camp", passport: "N4420198", iqama: "IN3716284", phone: "+91 88234 56789", nationality: "Indian", status: "inactive" },
  { id: "CM-009", name: "Anand Krishnamurthy", role: "Laundry Supervisor", camp: "Bengaluru North Camp", passport: "G6612039", iqama: "IN2648193", phone: "+91 96567 18900", nationality: "Indian", status: "active" },
  { id: "CM-010", name: "Lakshmi Prabha", role: "Camp Administrator", camp: "Hyderabad Tech Camp", passport: "S9900127", iqama: "IN1573928", phone: "+91 98123 45600", nationality: "Indian", status: "active" },
  { id: "CM-011", name: "Vijay Murugesan", role: "Transport Driver", camp: "Mumbai Harbor Camp", passport: "R3398217", iqama: "IN0482736", phone: "+91 97890 12300", nationality: "Indian", status: "active" },
  { id: "CM-012", name: "Pooja Iyer", role: "Warehouse Keeper", camp: "Chennai Coastal Camp", passport: "K1123456", iqama: "IN9371628", phone: "+91 90345 67890", nationality: "Indian", status: "active" },
  { id: "CM-013", name: "Ramesh Choudhary", role: "Plumber", camp: "Jaipur Desert Camp", passport: "J4490312", iqama: "IN8261739", phone: "+91 94567 23401", nationality: "Indian", status: "active" },
  { id: "CM-014", name: "Smitha Bhat", role: "Nurse / First Aider", camp: "Jaipur Desert Camp", passport: "M2289471", iqama: "IN7152846", phone: "+91 91283 74100", nationality: "Indian", status: "active" },
  { id: "CM-015", name: "Harish Gowda", role: "Canteen Manager", camp: "Pune Industrial Camp", passport: "T8812903", iqama: "IN6041827", phone: "+91 99012 38450", nationality: "Indian", status: "inactive" },
];

const tabs = ["Own Employees", "Supplier Employees", "Camp Staff"];

export default function EmployeeMaster() {
  const [activeTab, setActiveTab] = useState("Camp Staff");
  const [search, setSearch] = useState("");

  const filtered = employees.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#f4f3ee" }}>
      <Sidebar activePage="Employee Master" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6">
          <h1 className="text-2xl font-bold text-gray-800">Employee Master</h1>
          <p className="text-gray-500 text-sm mt-0.5 mb-6">Manage own, supplier, and camp staff employees</p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                <Users className="w-4 h-4" /> Total Employees
              </div>
              <p className="text-3xl font-bold text-gray-800">15</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                <UserCheck className="w-4 h-4" /> Active
              </div>
              <p className="text-3xl font-bold text-green-500">15</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                <UserMinus className="w-4 h-4" /> Inactive / Transferred
              </div>
              <p className="text-3xl font-bold text-gray-400">0</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 border-b border-gray-200 mb-4">
            {tabs.map(t => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
                  activeTab === t
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {t === "Camp Staff" && <span className="mr-1">🔗</span>}{t}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 flex-1 max-w-xs">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                className="text-sm outline-none w-full placeholder-gray-400"
                placeholder="Search employees..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <button className="flex items-center gap-2 border border-gray-300 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors">
              <Upload className="w-4 h-4" /> Bulk Upload
            </button>
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              <Plus className="w-4 h-4" /> Add Camp Staff
            </button>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 text-xs">
                  <th className="text-left px-4 py-3 font-medium">Employee ID</th>
                  <th className="text-left px-4 py-3 font-medium">Name</th>
                  <th className="text-left px-4 py-3 font-medium">Staff Role</th>
                  <th className="text-left px-4 py-3 font-medium">Assigned Camp</th>
                  <th className="text-left px-4 py-3 font-medium">Passport No.</th>
                  <th className="text-left px-4 py-3 font-medium">Iqama No.</th>
                  <th className="text-left px-4 py-3 font-medium">Phone</th>
                  <th className="text-left px-4 py-3 font-medium">Nationality</th>
                  <th className="text-left px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((e, i) => (
                  <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-700 font-medium">{e.id}</td>
                    <td className="px-4 py-3 text-gray-800 font-medium">{e.name}</td>
                    <td className="px-4 py-3 text-gray-600">{e.role}</td>
                    <td className="px-4 py-3 text-gray-600">{e.camp}</td>
                    <td className="px-4 py-3 text-gray-500">{e.passport}</td>
                    <td className="px-4 py-3 text-gray-500">{e.iqama}</td>
                    <td className="px-4 py-3 text-gray-600">{e.phone}</td>
                    <td className="px-4 py-3 text-gray-600">{e.nationality}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        e.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                      }`}>
                        {e.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}