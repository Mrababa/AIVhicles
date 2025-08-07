import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

/**
 * Admin page for managing users. Provides search, filter,
 * add, edit and delete capabilities. Data is stored locally
 * for demonstration purposes only.
 */
export default function AdminUsers() {
  const initialUsers = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      role: 'Administrator',
      status: 'Active',
      lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob@example.com',
      role: 'Editor',
      status: 'Inactive',
      lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [showDelete, setShowDelete] = useState(false);

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());
      const matchesRole = roleFilter === 'All' || u.role === roleFilter;
      const matchesStatus = statusFilter === 'All' || u.status === statusFilter;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  function handleSave(user) {
    if (editing) {
      setUsers((prev) => prev.map((u) => (u.id === editing.id ? { ...user, id: editing.id } : u)));
    } else {
      setUsers((prev) => [...prev, { ...user, id: Date.now(), lastLogin: new Date() }]);
    }
    setShowForm(false);
    setEditing(null);
  }

  function handleDelete(id) {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    setShowDelete(false);
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">User Management</h1>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
        >
          <PlusIcon className="mr-2 h-5 w-5" /> Add User
        </button>
      </div>
      <div className="mb-4 flex flex-col gap-4 sm:flex-row">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2"
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="rounded-md border border-slate-300 px-3 py-2"
        >
          <option>All</option>
          <option>Administrator</option>
          <option>Editor</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-md border border-slate-300 px-3 py-2"
        >
          <option>All</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>
      {filtered.length === 0 ? (
        <p className="text-slate-600 dark:text-slate-300">No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead>
              <tr className="bg-slate-50">
                <th scope="col" className="px-4 py-2 text-left text-sm font-semibold text-slate-700">
                  User
                </th>
                <th scope="col" className="px-4 py-2 text-left text-sm font-semibold text-slate-700">
                  Role
                </th>
                <th scope="col" className="px-4 py-2 text-left text-sm font-semibold text-slate-700">
                  Status
                </th>
                <th scope="col" className="px-4 py-2 text-left text-sm font-semibold text-slate-700">
                  Last Login
                </th>
                <th scope="col" className="px-4 py-2 text-right text-sm font-semibold text-slate-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {filtered.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50">
                  <td className="px-4 py-2">
                    <div className="flex items-center">
                      <div
                        className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-sm font-bold text-white"
                      >
                        {user.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-900">{user.name}</div>
                        <div className="text-sm text-slate-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-sm text-slate-700">{user.role}</td>
                  <td className="px-4 py-2">
                    {user.status === 'Active' ? (
                      <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                        Active
                      </span>
                    ) : (
                      <span className="rounded-full bg-slate-200 px-2 py-1 text-xs font-medium text-slate-800">
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-sm text-slate-600">
                    {formatRelativeTime(user.lastLogin)}
                  </td>
                  <td className="px-4 py-2 text-right text-sm">
                    <button
                      className="mr-2 text-slate-500 hover:text-slate-700"
                      aria-label="Edit user"
                      title="Edit User"
                      onClick={() => {
                        setEditing(user);
                        setShowForm(true);
                      }}
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      className="text-slate-500 hover:text-red-600"
                      aria-label="Delete user"
                      title="Delete User"
                      onClick={() => {
                        setEditing(user);
                        setShowDelete(true);
                      }}
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <UserForm
          user={editing}
          onCancel={() => {
            setShowForm(false);
            setEditing(null);
          }}
          onSave={handleSave}
        />
      )}

      {showDelete && editing && (
        <DeleteDialog
          name={editing.name}
          onCancel={() => {
            setShowDelete(false);
            setEditing(null);
          }}
          onConfirm={() => handleDelete(editing.id)}
        />
      )}
    </div>
  );
}

function UserForm({ user, onCancel, onSave }) {
  const [name, setName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [role, setRole] = useState(user ? user.role : 'Administrator');
  const [status, setStatus] = useState(user ? user.status : 'Active');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const firstField = useRef(null);

  useEffect(() => {
    firstField.current?.focus();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!user && password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    onSave({ name, email, role, status });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" role="dialog" aria-modal="true">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">{user ? 'Edit User' : 'Add User'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              ref={firstField}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              required
            />
          </div>
          {!user && (
            <>
              <div>
                <label className="block text-sm font-medium">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
                  required
                />
              </div>
            </>
          )}
          <div>
            <label className="block text-sm font-medium">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
            >
              <option>Administrator</option>
              <option>Editor</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Status</label>
            <input
              type="checkbox"
              checked={status === 'Active'}
              onChange={(e) => setStatus(e.target.checked ? 'Active' : 'Inactive')}
              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-sm">{status}</span>
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

function DeleteDialog({ name, onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" role="dialog" aria-modal="true">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">Delete User</h2>
        <p className="mb-6 text-sm text-slate-700">Are you sure you want to delete {name}? This action cannot be undone.</p>
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
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function formatRelativeTime(date) {
  const diff = Date.now() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return 'just now';
}
