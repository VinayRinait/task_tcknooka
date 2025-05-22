import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const sidebarItems = [
  { 
    label: 'Dashboard', 
    path: '/',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
    ) 
  },
  { 
    label: 'Applicants', 
    path: '/applicants',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v2"/></svg>
    ) 
  },
  { 
    label: 'Programs', 
    path: '/programs',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3v4"/><path d="M8 3v4"/></svg>
    ) 
  },
];

const notices = [
  { text: 'Result for Class IX is out Now!!!', time: 'Today, 11:00 am' },
  { text: 'Result for Class VIII is out Now!!!', time: 'Today, 11:00 am' },
  { text: 'Result for Class VII is out Now!!!', time: 'Today, 11:00 am' },
];

const events = [
  { title: 'Webinar on Career Trends for Class-X', date: '23, Jun', time: '11:00 AM' },
  { title: 'Webinar on Career Trends for Class-X', date: '23, Jun', time: '11:00 AM' },
];

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [rightbarOpen, setRightbarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Sidebar */}
      <aside className={`fixed z-30 inset-y-0 left-0 w-64 bg-gradient-to-b from-gray-900 to-black text-white flex flex-col py-6 px-4 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:flex`}>
        <div className="flex items-center gap-2 mb-8">
          <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#fff"/><path d="M8 24V10l8-6 8 6v14a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2Z" fill="#000"/></svg>
          <span className="font-bold text-xl tracking-wide">Admission Portal</span>
        </div>
        <nav className="flex-1">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li 
                key={item.label} 
                className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 cursor-pointer transition ${
                  location.pathname === item.path ? 'bg-gray-800' : ''
                }`}
                onClick={() => navigate(item.path)}
              >
                {item.icon}
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-8 flex items-center gap-2">
          <img src={`https://ui-avatars.com/api/?name=Admin`} alt="Admin" className="w-8 h-8 rounded-full" />
          <span>Admin</span>
        </div>
      </aside>
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black bg-opacity-30 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}
      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="flex items-center justify-between bg-black text-white px-4 md:px-8 py-4 shadow-sm sticky top-0 z-10">
          <div className="flex items-center gap-3">
            {/* Hamburger */}
            <button className="lg:hidden p-2 rounded hover:bg-gray-800 text-white" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="7" x2="24" y2="7"/><line x1="4" y1="14" x2="24" y2="14"/><line x1="4" y1="21" x2="24" y2="21"/></svg>
            </button>
            <h1 className="text-xl md:text-2xl font-bold text-white">Admission Portal</h1>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <input type="text" placeholder="Search..." className="hidden md:block px-3 py-1.5 rounded border border-gray-700 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600" />
            {/* Notification Bell */}
            <div className="relative">
              <button className="p-2 rounded hover:bg-gray-800 text-white relative" onClick={() => setNotifOpen(!notifOpen)}>
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full"></span>
              </button>
              {/* Notification Dropdown */}
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-gray-900 rounded-lg shadow-lg border border-gray-800 z-50 animate-fade-in">
                  <div className="p-4 border-b border-gray-800 font-semibold text-white">Notifications</div>
                  <ul className="max-h-60 overflow-y-auto divide-y divide-gray-800">
                    {notices.map((n, i) => (
                      <li key={i} className="p-3 text-gray-300 hover:bg-gray-800 cursor-pointer">
                        <div className="font-medium text-white">{n.text}</div>
                        <div className="text-xs text-gray-400">{n.time}</div>
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-2 text-gray-300 hover:text-white text-sm">View all</button>
                </div>
              )}
            </div>
            {/* Rightbar toggle for mobile */}
            <button className="xl:hidden p-2 rounded hover:bg-gray-800 text-white" onClick={() => setRightbarOpen(!rightbarOpen)}>
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/></svg>
            </button>
            <img src={`https://ui-avatars.com/api/?name=Admin&background=333333&color=fff`} alt="Admin" className="w-8 h-8 rounded-full border-2 border-gray-700" />
          </div>
        </header>
        {/* Children (Dashboard) */}
        <div className="flex-1 flex flex-col lg:flex-row gap-6 p-2 md:p-6">
          <section className="flex-1 min-w-0">{children}</section>
          {/* Right Sidebar */}
          <aside className={`w-full lg:w-80 bg-white rounded-lg shadow p-4 mb-6 lg:mb-0 lg:static lg:block ${rightbarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 hidden lg:block lg:relative`}> 
            <div className="mb-6">
              <h2 className="font-semibold text-lg mb-2 text-gray-900">Notice Board</h2>
              <ul className="space-y-2">
                {notices.map((n, i) => (
                  <li key={i} className="text-gray-900 text-sm font-medium">{n.text}<div className="text-xs text-gray-400">{n.time}</div></li>
                ))}
              </ul>
              <button className="mt-3 w-full text-gray-6 text-sm hover:underline">+ Add New Notice</button>
            </div>
            <div>
              <h2 className="font-semibold text-lg mb-2 text-gray-900">Upcoming Events</h2>
              <ul className="space-y-2">
                {events.map((e, i) => (
                  <li key={i} className="text-gray-700 text-sm font-medium flex items-center gap-2">
                    <span className="shrink-0 flex items-center justify-center"><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="12" height="11" rx="2"/><path d="M8 2v2"/><path d="M12 2v2"/></svg></span>
                    <span>{e.title}</span>
                    <span className="ml-auto text-xs text-gray-400">{e.date}, {e.time}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-3 w-full text-gray-6 text-sm hover:underline">+ Add New Event</button>
            </div>
          </aside>
          {/* Overlay for rightbar on mobile */}
          {rightbarOpen && (
            <div className="fixed inset-0 z-30 bg-black bg-opacity-30 xl:hidden" onClick={() => setRightbarOpen(false)}></div>
          )}
          {/* Responsive sidebar for small screens */}
          <aside className="block lg:hidden w-full bg-white rounded-lg shadow p-4 mb-6">
            <div className="mb-6">
              <h2 className="font-semibold text-lg mb-2 text-gray-900">Notice Board</h2>
              <ul className="space-y-2">
                {notices.map((n, i) => (
                  <li key={i} className="text-gray-900 text-sm font-medium">{n.text}<div className="text-xs text-gray-400">{n.time}</div></li>
                ))}
              </ul>
              <button className="mt-3 w-full text-gray-6 text-sm hover:underline">+ Add New Notice</button>
            </div>
            <div>
              <h2 className="font-semibold text-lg mb-2 text-gray-900">Upcoming Events</h2>
              <ul className="space-y-2">
                {events.map((e, i) => (
                  <li key={i} className="text-gray-700 text-sm font-medium flex items-center gap-2">
                    <span className="shrink-0 flex items-center justify-center"><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="12" height="11" rx="2"/><path d="M8 2v2"/><path d="M12 2v2"/></svg></span>
                    <span>{e.title}</span>
                    <span className="ml-auto text-xs text-gray-400">{e.date}, {e.time}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-3 w-full text-gray-6 text-sm hover:underline">+ Add New Event</button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}; 