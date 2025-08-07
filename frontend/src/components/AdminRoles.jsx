import React, { useState, useRef, useEffect } from 'react';
import { PencilIcon, TrashIcon, PlusIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

/**
 * Admin page to manage roles and associated permissions.
 * Uses local state and dummy data for demonstration.
 */
export default function AdminRoles() {
  const initialRoles = [
    {
      id: 1,
      name: 'Administrator',
      description: 'Full access to all features.',
      permissions: ['manage_users', 'edit_content', 'view_logs'],
      assignedCount: 1,
    },
    {
      id: 2,
      name: 'Editor',
      description: 'Can edit existing content.',
      permissions: ['edit_content'],
      assignedCount: 1,
    },
  ];

  const allPermissions = {
    'User Settings': ['manage_users', 'view_users'],
    'Content Management': ['edit_content', 'publish_content'],
    'System': ['view_logs'],
  };

  const [roles, setRoles] = useState(initialRoles);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  function handleSave(role) {
    if (editing) {
      setRoles((prev) => prev.map((r) => (r.id === editing.id ? { ...role, id: editing.id, assignedCount: editing.assignedCount } : r)));
    } else {
      setRoles((prev) => [...prev, { ...role, id: Date.now(), assignedCount: 0 }]);
    }
    setShowForm(false);
    setEditing(null);
  }

  function handleDelete(id) {
    setRoles((prev) => prev.filter((r) => r.id !== id));
    setShowDelete(false);
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Roles &amp; Permissions</h1>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
        >
          <PlusIcon className="mr-2 h-5 w-5" /> Add Role
        </button>
      </div>
      {roles.length === 0 ? (
        <p className="text-slate-600 dark:text-slate-300">No roles defined.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {roles.map((role) => (
            <div key={role.id} className="rounded-lg bg-white p-6 shadow dark:bg-slate-800">
              <div className="mb-2 flex items-center">
                <ShieldCheckIcon className="mr-2 h-5 w-5 text-indigo-500" />
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{role.name}</h2>
              </div>
              <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">{role.description}</p>
              <h3 className="mb-2 text-sm font-medium text-slate-700">Permissions</h3>
              <div className="mb-4 flex flex-wrap gap-2">
                {role.permissions.map((p) => (
                  <span key={p} className="rounded-full bg-slate-200 px-2 py-1 text-xs font-medium text-slate-800">
                    {p}
                  </span>
                ))}
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  className="text-slate-500 hover:text-slate-700"
                  aria-label="Edit role"
                  title="Edit Role"
                  onClick={() => {
                    setEditing(role);
                    setShowForm(true);
                  }}
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  className="text-slate-500 hover:text-red-600"
                  aria-label="Delete role"
                  title="Delete Role"
                  onClick={() => {
                    if (role.assignedCount > 0) {
                      alert('Cannot delete a role assigned to users.');
                      return;
                    }
                    setEditing(role);
                    setShowDelete(true);
                  }}
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <RoleForm
          role={editing}
          allPermissions={allPermissions}
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

function RoleForm({ role, onCancel, onSave, allPermissions }) {
  const [name, setName] = useState(role ? role.name : '');
  const [description, setDescription] = useState(role ? role.description : '');
  const [permissions, setPermissions] = useState(role ? role.permissions : []);
  const firstField = useRef(null);

  useEffect(() => {
    firstField.current?.focus();
  }, []);

  function togglePermission(p) {
    setPermissions((prev) =>
      prev.includes(p) ? prev.filter((perm) => perm !== p) : [...prev, p]
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave({ name, description, permissions });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" role="dialog" aria-modal="true">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">{role ? 'Edit Role' : 'Add Role'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Role Name</label>
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
            <label className="block text-sm font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              rows={3}
            />
          </div>
          <div>
            <h3 className="text-sm font-medium">Permissions</h3>
            {Object.entries(allPermissions).map(([group, perms]) => (
              <div key={group} className="mt-2">
                <h4 className="text-xs font-semibold text-slate-500">{group}</h4>
                {perms.map((p) => (
                  <label key={p} className="mt-1 flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={permissions.includes(p)}
                      onChange={() => togglePermission(p)}
                      className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm">{p}</span>
                  </label>
                ))}
              </div>
            ))}
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
        <h2 className="mb-4 text-xl font-semibold">Delete Role</h2>
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
