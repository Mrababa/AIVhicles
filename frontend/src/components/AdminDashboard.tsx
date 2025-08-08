import React, { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import {
  BanknotesIcon,
  UserPlusIcon,
  ChartBarIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import {
  getKpis,
  getApiUsage,
  getRecentActivity,
  getNewClients,
} from '../services/analyticsService.ts';

interface Kpis {
  totalRevenue: number;
  newClients: number;
  apiCalls: number;
  activeUsers: number;
}

interface ApiUsageEntry {
  date: string;
  calls: number;
}

interface ActivityEntry {
  id: string;
  user: string;
  action: string;
  target: {
    id: string;
    name: string;
    url: string;
  };
  timestamp: string;
}

interface ClientEntry {
  id: string;
  name: string;
  plan: string;
}

function formatCurrency(value: number) {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

function formatRelativeTime(dateString: string) {
  const diff = Date.now() - new Date(dateString).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

/**
 * Admin analytical dashboard providing KPIs, API usage chart,
 * recent activity feed and new clients list.
 */
export default function AdminDashboard() {
  const { isAuthenticated } = useAuth();

  const [kpis, setKpis] = useState<Kpis | null>(null);
  const [apiUsage, setApiUsage] = useState<ApiUsageEntry[]>([]);
  const [activities, setActivities] = useState<ActivityEntry[]>([]);
  const [clients, setClients] = useState<ClientEntry[]>([]);
  const [chartLoading, setChartLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const kpiData = await getKpis();
        setKpis(kpiData);
      } catch (err) {
        console.error('Failed to load KPIs', err);
      }
      try {
        const usageData = await getApiUsage();
        setApiUsage(usageData);
      } catch (err) {
        console.error('Failed to load API usage', err);
      } finally {
        setChartLoading(false);
      }
      try {
        const activityData = await getRecentActivity();
        setActivities(activityData);
      } catch (err) {
        console.error('Failed to load recent activity', err);
      }
      try {
        const clientData = await getNewClients();
        setClients(clientData);
      } catch (err) {
        console.error('Failed to load new clients', err);
      }
    }
    fetchData();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const kpiCards = [
    {
      title: 'Total Revenue',
      value: kpis ? formatCurrency(kpis.totalRevenue) : '—',
      icon: BanknotesIcon,
    },
    {
      title: 'New Clients (This Month)',
      value: kpis ? kpis.newClients.toString() : '—',
      icon: UserPlusIcon,
    },
    {
      title: 'API Calls (Last 24h)',
      value: kpis ? kpis.apiCalls.toString() : '—',
      icon: ChartBarIcon,
    },
    {
      title: 'Active Users',
      value: kpis ? kpis.activeUsers.toString() : '—',
      icon: UsersIcon,
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
        Admin Dashboard
      </h1>

      <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {kpiCards.map((card) => (
          <div
            key={card.title}
            className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg">
                <card.icon className="w-6 h-6 text-indigo-500" />
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {card.title}
                </p>
                <p className="text-2xl font-bold text-slate-800 dark:text-white">
                  {card.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">API Usage Traffic (Last 7 Days)</h2>
          {chartLoading ? (
            <div className="h-64 bg-slate-100 dark:bg-slate-700/50 flex items-center justify-center">
              <span>Loading API usage...</span>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={256}>
              <LineChart data={apiUsage}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="calls" stroke="#6366F1" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <ul className="space-y-4">
              {activities.map((activity) => (
                <li key={activity.id} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                    <span className="text-xs font-bold text-indigo-700">
                      {getInitials(activity.user)}
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="font-bold">{activity.user}</span> {activity.action}{' '}
                    <Link to={activity.target.url} className="text-indigo-500">
                      {activity.target.name}
                    </Link>
                    <div className="text-xs text-slate-400">
                      {formatRelativeTime(activity.timestamp)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">New Clients</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs font-semibold text-slate-500">
                  <th className="pb-2">Client</th>
                  <th className="pb-2">Plan</th>
                  <th className="pb-2"></th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr
                    key={client.id}
                    className="border-b last:border-b-0 dark:border-slate-700"
                  >
                    <td className="py-2 font-bold">{client.name}</td>
                    <td className="py-2 text-slate-500">{client.plan}</td>
                    <td className="py-2">
                      <Link
                        to={`/admin/clients/${client.id}`}
                        className="font-semibold text-indigo-500 hover:underline"
                      >
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
