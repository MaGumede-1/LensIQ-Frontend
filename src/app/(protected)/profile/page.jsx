'use client';

import { useState, useEffect } from 'react';
import { User, Mail, Phone, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../../context/AuthContext';
import { customerApi } from '../../../api/customerApi';
import Button from '../../../components/common/Button';
import StatusBadge from '../../../components/common/StatusBadge';
import Spinner from '../../../components/common/Spinner';

export default function ProfilePage() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: '',
    surname: '',
    email: '',
    cellphone: '',
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    customerApi
      .getProfile()
      .then((res) => {
        const d = res.data;
        setForm({
          name: d.name || '',
          surname: d.surname || '',
          email: d.email || '',
          cellphone: d.cellphone || '',
        });
        setStatus(d.status || '');
      })
      .catch(() => {
        if (user) {
          setForm({
            name: user.name || '',
            surname: user.surname || '',
            email: user.email || '',
            cellphone: user.cellphone || '',
          });
        }
      })
      .finally(() => setLoading(false));
  }, [user]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      await customerApi.updateProfile(form);
      toast.success('Profile updated successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-surface-900">Profile</h1>
      <p className="text-sm text-surface-500 mt-1">Manage your account details.</p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 max-w-xl rounded-2xl border border-surface-200 bg-white p-6"
      >
        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        {status && (
          <div className="mb-6 flex items-center gap-2">
            <span className="text-sm text-surface-600">Account status:</span>
            <StatusBadge status={status} />
          </div>
        )}

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-surface-700">
                First Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-400" />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-surface-300 py-2.5 pl-10 pr-4 text-sm text-surface-800 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-surface-700">
                Last Name
              </label>
              <input
                type="text"
                name="surname"
                value={form.surname}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-surface-300 py-2.5 px-4 text-sm text-surface-800 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-surface-700">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-400" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-surface-300 py-2.5 pl-10 pr-4 text-sm text-surface-800 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-surface-700">
              Cellphone
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-400" />
              <input
                type="tel"
                name="cellphone"
                value={form.cellphone}
                onChange={handleChange}
                className="w-full rounded-lg border border-surface-300 py-2.5 pl-10 pr-4 text-sm text-surface-800 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
          </div>
        </div>

        <Button type="submit" className="mt-6" loading={saving}>
          Save Changes
        </Button>
      </form>
    </div>
  );
}
