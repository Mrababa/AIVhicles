import React, { useState, useEffect, useMemo } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Partner {
  id: number;
  name: string;
  logoUrl: string;
  status: 'Active' | 'Pending' | 'Inactive';
  partnerSince: string; // ISO date string
}

const statusClasses: Record<Partner['status'], string> = {
  Active: 'bg-green-100 text-green-800',
  Pending: 'bg-yellow-100 text-yellow-800',
  Inactive: 'bg-slate-200 text-slate-800',
};

export default function AdminPartners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Partner | null>(null);
  const [deleting, setDeleting] = useState<Partner | null>(null);

  useEffect(() => {
    // Simulate async API call
    async function load() {
      setLoading(true);
      const data: Partner[] = await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve([
              {
                id: 1,
                name: 'DubiCars',
                logoUrl: 'https://logo.clearbit.com/dubicars.com',
                status: 'Active',
                partnerSince: '2021-01-01',
              },
              {
                id: 2,
                name: 'YallaCompare',
                logoUrl: 'https://logo.clearbit.com/yallacompare.com',
                status: 'Pending',
                partnerSince: '2023-03-15',
              },
            ]),
          500
        )
      );
      setPartners(data);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = useMemo(() => {
    return partners.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [partners, search, statusFilter]);

  function handleSave(partner: Omit<Partner, 'id'>) {
    if (editing) {
      setPartners((prev) => prev.map((p) => (p.id === editing.id ? { ...partner, id: editing.id } : p)));
    } else {
      setPartners((prev) => [...prev, { ...partner, id: Date.now() }]);
    }
    setShowForm(false);
    setEditing(null);
  }

  function handleDelete(id: number) {
    setPartners((prev) => prev.filter((p) => p.id !== id));
    setDeleting(null);
  }

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Partners Management</h1>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
        >
          <PlusIcon className="mr-2 h-5 w-5" /> Add Partner
        </button>
      </div>
      <div className="mb-4 flex flex-col gap-4 sm:flex-row">
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-md border border-slate-300 px-3 py-2"
        >
          <option>All</option>
          <option>Active</option>
          <option>Pending</option>
          <option>Inactive</option>
        </select>
      </div>
      {loading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-lg bg-slate-200" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-slate-600 dark:text-slate-300">No partners found. Add the first partner.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((partner) => (
            <PartnerCard
              key={partner.id}
              partner={partner}
              onEdit={() => {
                setEditing(partner);
                setShowForm(true);
              }}
              onDelete={() => setDeleting(partner)}
            />
          ))}
        </div>
      )}
      {showForm && (
        <PartnerFormModal
          partner={editing}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditing(null);
          }}
        />
      )}
      {deleting && (
        <DeleteDialog
          name={deleting.name}
          onCancel={() => setDeleting(null)}
          onConfirm={() => handleDelete(deleting.id)}
        />
      )}
    </section>
  );
}

function PartnerCard({
  partner,
  onEdit,
  onDelete,
}: {
  partner: Partner;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow transition-shadow hover:shadow-lg">
      <div className="flex h-32 items-center justify-center bg-white">
        {!imgError ? (
          <img
            src={partner.logoUrl}
            alt={`${partner.name} logo`}
            onError={() => setImgError(true)}
            className="max-h-24 object-contain"
          />
        ) : (
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-200 text-3xl font-bold text-slate-500">
            {partner.name.charAt(0)}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-1 text-lg font-semibold">{partner.name}</h3>
        <p className="mb-2 text-sm text-slate-600">
          Partner since {new Date(partner.partnerSince).toLocaleDateString()}
        </p>
        <span className={`mb-4 inline-block rounded-full px-2 py-1 text-xs font-semibold ${statusClasses[partner.status]}`}>
          {partner.status}
        </span>
        <div className="mt-auto flex justify-end gap-2">
          <button
            aria-label={`Edit ${partner.name}`}
            onClick={onEdit}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-sm text-indigo-600 hover:bg-indigo-50"
          >
            <PencilIcon className="h-5 w-5" />
            Edit
          </button>
          <button
            aria-label={`Delete ${partner.name}`}
            onClick={onDelete}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-sm text-red-600 hover:bg-red-50"
          >
            <TrashIcon className="h-5 w-5" />
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

function PartnerFormModal({
  partner,
  onSave,
  onCancel,
}: {
  partner: Partner | null;
  onSave: (p: Omit<Partner, 'id'>) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(partner?.name || '');
  const [website, setWebsite] = useState(partner?.logoUrl || '');
  const [status, setStatus] = useState<Partner['status']>(partner?.status || 'Active');
  const [since, setSince] = useState(
    partner?.partnerSince || new Date().toISOString().substring(0, 10)
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({ name, logoUrl: website, status, partnerSince: since });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">
          {partner ? 'Edit Partner' : 'Add Partner'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Partner Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Website URL</label>
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Partner['status'])}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
            >
              <option>Active</option>
              <option>Pending</option>
              <option>Inactive</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Partner Since</label>
            <input
              type="date"
              value={since}
              onChange={(e) => setSince(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
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

function DeleteDialog({
  name,
  onCancel,
  onConfirm,
}: {
  name: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">Delete Partner</h2>
        <p className="mb-6 text-sm text-slate-700">
          Are you sure you want to remove {name}? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
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

