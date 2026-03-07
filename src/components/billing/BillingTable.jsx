import StatusBadge from '../common/StatusBadge';
import { formatDate, formatCurrency } from '../../utils/helpers';

export default function BillingTable({ records }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-surface-200 bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-surface-100 bg-surface-50">
            <th className="px-4 py-3 text-left font-medium text-surface-600">Date</th>
            <th className="px-4 py-3 text-left font-medium text-surface-600">Amount</th>
            <th className="px-4 py-3 text-left font-medium text-surface-600">Method</th>
            <th className="px-4 py-3 text-left font-medium text-surface-600">Status</th>
            <th className="px-4 py-3 text-left font-medium text-surface-600">Invoice</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-100">
          {records.map((record) => (
            <tr key={record.billing_id} className="hover:bg-surface-50 transition-colors">
              <td className="px-4 py-3 text-surface-700">
                {formatDate(record.paid_at || record.created_at)}
              </td>
              <td className="px-4 py-3 font-medium text-surface-900">
                {formatCurrency(record.amount, record.currency)}
              </td>
              <td className="px-4 py-3 text-surface-600">
                {record.payment_method?.replace('_', ' ')}
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={record.status} />
              </td>
              <td className="px-4 py-3">
                {record.stripe_invoice_id ? (
                  <span className="text-xs text-surface-400 font-mono">
                    {record.stripe_invoice_id}
                  </span>
                ) : (
                  <span className="text-surface-300">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
