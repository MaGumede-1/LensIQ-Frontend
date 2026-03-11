import { useState } from 'react';
import { Camera, Gem } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useSubscription } from '../hooks/useSubscription';
import { subscriptionApi } from '../api/subscriptionApi';
import PlanCard from '../components/subscription/PlanCard';
import StatusBadge from '../components/common/StatusBadge';
import Button from '../components/common/Button';
import Spinner from '../components/common/Spinner';
import { formatDate } from '../utils/helpers';
import { useAuth } from '../context/AuthContext';

export default function Pricing() {
  const { isAuthenticated } = useAuth();
  const { subscription, plans, loading, refetch } = useSubscription();
  const [subscribing, setSubscribing] = useState(null);

  const handleSelect = async (plan) => {
    if (!isAuthenticated) {
      window.location.href = '/register';
      return;
    }

    setSubscribing(plan.subscription_id);
    try {
      const res = await subscriptionApi.createCheckoutSession(plan.subscription_id);
      // Redirect to Stripe checkout
      if (res.data?.url) {
        window.location.href = res.data.url;
      } else {
        toast.success('Subscription updated!');
        refetch();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to process subscription');
    } finally {
      setSubscribing(null);
    }
  };

  const handleCancel = async () => {
    if (!window.confirm('Are you sure you want to cancel your subscription?')) return;
    try {
      await subscriptionApi.cancel();
      toast.success('Subscription cancelled');
      refetch();
    } catch {
      toast.error('Failed to cancel subscription');
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
      {/* Header (show full header when not logged in) */}
      {!isAuthenticated && (
        <header className="sticky top-0 z-30 glass border-b border-surface-200 mb-8">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
            <Link to="/" className="flex items-center gap-2">
              <Camera className="h-7 w-7 text-brand-600" />
              <span className="text-xl font-bold text-surface-900">LensIQ</span>
            </Link>
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          </div>
        </header>
      )}

      <div className="mx-auto max-w-5xl px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700 mb-4">
            <Gem className="h-4 w-4" />
            Pricing
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-surface-900">
            Choose Your Plan
          </h1>
          <p className="mt-3 text-surface-500 max-w-lg mx-auto">
            Pick the plan that fits your workflow. All plans include AI-powered analysis.
          </p>
        </div>

        {/* Current subscription info */}
        {subscription && (
          <div className="mb-8 rounded-xl border border-surface-200 bg-white p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm text-surface-500">Current subscription</p>
              <div className="flex items-center gap-3 mt-1">
                <p className="text-lg font-semibold text-surface-900">
                  {subscription.plan_name || 'Active Plan'}
                </p>
                <StatusBadge status={subscription.status} />
              </div>
              {subscription.next_billing_date && (
                <p className="text-xs text-surface-400 mt-1">
                  Next billing: {formatDate(subscription.next_billing_date)}
                </p>
              )}
            </div>
            {subscription.status === 'ACTIVE' && (
              <Button variant="danger" size="sm" onClick={handleCancel}>
                Cancel Subscription
              </Button>
            )}
          </div>
        )}

        {/* Plans grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <PlanCard
              key={plan.subscription_id}
              plan={plan}
              isCurrentPlan={
                subscription?.plan_id === plan.subscription_id &&
                subscription?.status === 'ACTIVE'
              }
              onSelect={handleSelect}
              loading={subscribing === plan.subscription_id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
