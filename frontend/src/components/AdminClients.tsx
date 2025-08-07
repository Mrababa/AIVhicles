import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BriefcaseIcon,
  PencilIcon,
  TrashIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

interface Client {
  id: number;
  name: string;
  logo?: string;
  status: 'Active' | 'Trial' | 'Suspended';
  plan: string;
  users: number;
  apiUsage: { current: number; limit: number };
}

const initialClients: Client[] = [
  {
    id: 1,
    name: 'Global Auto Group',
    logo: 'https://via.placeholder.com/40',
    status: 'Active',
    plan: 'Enterprise',
    users: 128,
    apiUsage: { current: 75000, limit: 100000 },
  },
  {
    id: 2,
    name: 'Fleet Masters',
    logo: 'https://via.placeholder.com/40',
    status: 'Trial',
    plan: 'Pro',
    users: 12,
    apiUsage: { current: 12000, limit: 20000 },
  },
];

const statusStyles: Record<Client['status'], string> = {
  Active: 'bg-green-100 text-green-800',
  Trial: 'bg-sky-100 text-sky-800',
  Suspended: 'bg-amber-100 text-amber-800',
};

export default function AdminClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Client | null>(null);
  const [deleting, setDeleting] = useState<Client | null>(null);
  const firstField = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setClients(initialClients);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  function handleSave(client: Omit<Client, 'id' | 'apiUsage'> & { apiLimit: number }) {
    if (editing) {
      setClients((prev) =>
        prev.map((c) =>
          c.id === editing.id
            ? { ...c, ...client, apiUsage: { ...c.apiUsage, limit: client.apiLimit } }
            : c
        )
      );
    } else {
      setClients((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: client.name,
          logo: client.logo,
          status: client.status,
          plan: client.plan,
          users: client.users,
          apiUsage: { current: 0, limit: client.apiLimit },
        },
      ]);
    }
    setShowForm(false);
    setEditing(null);
  }

  function handleDelete(id: number) {
    setClients((prev) => prev.filter((c) => c.id !== id));
    setDeleting(null);
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Client Management</h1>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="flex items-center rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700"
        >
          <BriefcaseIcon className="mr-2 h-5 w-5" /> + Add Client
        </button>
      </div>

      {/* Placeholder for future search/filter */}
      <div className="mb-4" />

      {loading ? (
        <table className="min-w-full divide-y divide-slate-200">
          <thead>
            <tr className="bg-slate-50">
              {['Client', 'Status', 'Plan', 'Users', 'API Usage', 'Actions'].map((h) => (
                <th
                  key={h}
                  scope="col"
                  className="px-4 py-2 text-left text-sm font-semibold text-slate-700"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {Array.from({ length: 3 }).map((_, i) => (
              <tr key={i} className="animate-pulse">
                <td className="px-4 py-4">
                  <div className="h-6 w-40 rounded bg-slate-200" />
                </td>
                <td className="px-4 py-4">
                  <div className="h-6 w-16 rounded bg-slate-200" />
                </td>
                <td className="px-4 py-4">
                  <div className="h-6 w-20 rounded bg-slate-200" />
                </td>
                <td className="px-4 py-4">
                  <div className="h-6 w-12 rounded bg-slate-200" />
                </td>
                <td className="px-4 py-4">
                  <div className="h-6 w-32 rounded bg-slate-200" />
                </td>
                <td className="px-4 py-4">
                  <div className="h-6 w-24 rounded bg-slate-200" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : clients.length === 0 ? (
        <div className="text-center">
          <p className="mb-4 text-slate-600 dark:text-slate-300">No clients found.</p>
          <button
            onClick={() => {
              setEditing(null);
              setShowForm(true);
            }}
            className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700"
          >
            <BriefcaseIcon className="mr-2 h-5 w-5" /> Add your first client
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead>
              <tr className="bg-slate-50">
                <th scope="col" className="px-4 py-2 text-left text-sm font-semibold text-slate-700">
                  Client
                </th>
                <th scope="col" className="px-4 py-2 text-left text-sm font-semibold text-slate-700">
                  Status
                </th>
                <th scope="col" className="px-4 py-2 text-left text-sm font-semibold text-slate-700">
                  Plan
                </th>
                <th scope="col" className="px-4 py-2 text-left text-sm font-semibold text-slate-700">
                  Users
                </th>
                <th scope="col" className="px-4 py-2 text-left text-sm font-semibold text-slate-700">
                  API Usage (This Month)
                </th>
                <th scope="col" className="px-4 py-2 text-right text-sm font-semibold text-slate-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {clients.map((client) => {
                const percent = Math.min(
                  100,
                  Math.round((client.apiUsage.current / client.apiUsage.limit) * 100)
                );
                return (
                  <tr key={client.id} className="hover:bg-slate-50">
                    <td className="px-4 py-4">
                      <ClientInfo name={client.name} logo={client.logo} />
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStyles[client.status]}`}
                      >
                        {client.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-700">{client.plan}</td>
                    <td className="px-4 py-4 text-sm text-slate-700">{client.users}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <div
                          className="mr-2 h-2 w-32 rounded bg-slate-200"
                          role="progressbar"
                          aria-valuenow={client.apiUsage.current}
                          aria-valuemin={0}
                          aria-valuemax={client.apiUsage.limit}
                        >
                          <div
                            className="h-2 rounded bg-indigo-600"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <span className="text-sm text-slate-700">
                          {client.apiUsage.current.toLocaleString()} / {client.apiUsage.limit.toLocaleString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="inline-flex items-center space-x-2">
                        <button
                          onClick={() => navigate(`/admin/clients/${client.id}`)}
                          className="flex items-center rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
                        >
                          Manage <ChevronRightIcon className="ml-1 h-4 w-4" />
                        </button>
                        <button
                          aria-label={`Edit ${client.name}`}
                          onClick={() => {
                            setEditing(client);
                            setShowForm(true);
                          }}
                          className="rounded p-1 hover:bg-slate-200"
                        >
                          <PencilIcon className="h-5 w-5 text-slate-600" />
                        </button>
                        <button
                          aria-label={`Delete ${client.name}`}
                          onClick={() => setDeleting(client)}
                          className="rounded p-1 hover:bg-red-100"
                        >
                          <TrashIcon className="h-5 w-5 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <ClientFormModal
          client={editing ?? undefined}
          onCancel={() => {
            setShowForm(false);
            setEditing(null);
          }}
          onSave={handleSave}
          firstFieldRef={firstField}
        />
      )}

      {deleting && (
        <DeleteDialog
          name={deleting.name}
          onCancel={() => setDeleting(null)}
          onConfirm={() => handleDelete(deleting.id)}
        />
      )}
    </div>
  );
}

function ClientInfo({ name, logo }: { name: string; logo?: string }) {
  const [error, setError] = useState(false);
  return (
    <div className="flex items-center">
      <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-md bg-white shadow">
        {error || !logo ? (
          <span className="text-sm font-semibold text-slate-700">
            {name.charAt(0).toUpperCase()}
          </span>
        ) : (
          <img
            src={logo}
            alt={`${name} logo`}
            className="h-10 w-10 object-contain"
            onError={() => setError(true)}
          />
        )}
      </div>
      <span className="font-medium text-slate-900 dark:text-slate-100">{name}</span>
    </div>
  );
}

interface ClientFormModalProps {
  client?: Client;
  onSave: (client: Omit<Client, 'id' | 'apiUsage'> & { apiLimit: number }) => void;
  onCancel: () => void;
  firstFieldRef: React.RefObject<HTMLInputElement>;
}

function ClientFormModal({ client, onSave, onCancel, firstFieldRef }: ClientFormModalProps) {
  const [name, setName] = useState(client?.name ?? '');
  const [logo, setLogo] = useState(client?.logo ?? '');
  const [status, setStatus] = useState<Client['status']>(client?.status ?? 'Active');
  const [plan, setPlan] = useState(client?.plan ?? 'Pro');
  const [users, setUsers] = useState(client?.users ?? 0);
  const [apiLimit, setApiLimit] = useState(client?.apiUsage.limit ?? 10000);

  useEffect(() => {
    firstFieldRef.current?.focus();
  }, [firstFieldRef]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({ name, logo, status, plan, users, apiLimit });
  }

  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" role="dialog" aria-modal="true">
    <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-xl font-semibold">{client ? 'Edit Client' : 'Add Client'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium" htmlFor="client-name">Company Name</label>
          <input
            id="client-name"
            ref={firstFieldRef}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="client-logo">Logo URL</label>
          <input
            id="client-logo"
            type="url"
            value={logo}
            onChange={(e) => setLogo(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium" htmlFor="client-status">Status</label>
            <select
              id="client-status"
              value={status}
              onChange={(e) => setStatus(e.target.value as Client['status'])}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
            >
              <option value="Active">Active</option>
              <option value="Trial">Trial</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium" htmlFor="client-plan">Plan</label>
            <select
              id="client-plan"
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
            >
              <option>Enterprise</option>
              <option>Pro</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium" htmlFor="client-users">Users</label>
            <input
              id="client-users"
              type="number"
              value={users}
              onChange={(e) => setUsers(Number(e.target.value))}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              min={0}
            />
          </div>
          <div>
            <label className="block text-sm font-medium" htmlFor="client-api-limit">API Limit</label>
            <input
              id="client-api-limit"
              type="number"
              value={apiLimit}
              onChange={(e) => setApiLimit(Number(e.target.value))}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              min={0}
            />
          </div>
        </div>
        <div className="flex justify-end space-x-2 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg bg-slate-200 px-4 py-2 font-medium hover:bg-slate-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
  );
}

interface DeleteDialogProps {
  name: string;
  onCancel: () => void;
  onConfirm: () => void;
}

function DeleteDialog({ name, onCancel, onConfirm }: DeleteDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" role="dialog" aria-modal="true">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">Delete Client?</h2>
        <p className="mb-6 text-sm text-slate-700">Are you sure you want to delete {name}? All associated data will be removed. This action cannot be undone.</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="rounded-lg bg-slate-200 px-4 py-2 font-medium hover:bg-slate-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
}
