import { Check } from 'lucide-react';
import Button from '../common/Button';

export default function PlanCard({ plan, isCurrentPlan, onSelect, loading }) {
  const isMonthly = plan.billing_interval === 'MONTHLY';

  return (
    <div
      className={`
        relative flex flex-col rounded-2xl border-2 bg-white p-6 transition-all
        ${isCurrentPlan ? 'border-brand-500 shadow-lg shadow-brand-100' : 'border-surface-200 hover:border-brand-200'}
      `}
    >
      {isCurrentPlan && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 px-3 py-0.5 text-xs font-semibold text-white">
          Current Plan
        </div>
      )}

      <h3 className="text-xl font-bold text-surface-900">{plan.name}</h3>
      <p className="mt-1 text-sm text-surface-500">{plan.description}</p>

      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-3xl font-extrabold text-surface-900">
          {plan.price ? `R${plan.price}` : 'Free'}
        </span>
        {plan.price > 0 && (
          <span className="text-sm text-surface-500">
            /{isMonthly ? 'month' : 'year'}
          </span>
        )}
      </div>

      <ul className="mt-6 flex-1 space-y-3">
        {(plan.features || []).map((feature, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm text-surface-600">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-6">
        {isCurrentPlan ? (
          <Button variant="secondary" className="w-full" disabled>
            Active
          </Button>
        ) : (
          <Button
            className="w-full"
            onClick={() => onSelect(plan)}
            loading={loading}
          >
            {plan.price > 0 ? 'Subscribe' : 'Get Started'}
          </Button>
        )}
      </div>
    </div>
  );
}
