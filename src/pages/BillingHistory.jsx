import { useState, useEffect } from 'react';
import { CreditCard, Receipt } from 'lucide-react';
import { billingApi } from '../api/billingApi';
import BillingTable from '../components/billing/BillingTable';
import Button from '../components/common/Button';
import Spinner from '../components/common/Spinner';
import EmptyState from '../components/common/EmptyState';

export default function BillingHistory() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchRecords = async (pageNum) => {
    setLoading(true);
    try {
      const res = await billingApi.getHistory(pageNum);
      const data = Array.isArray(res.data) ? res.data : res.data.content || [];
      if (pageNum === 0) {
        setRecords(data);
      } else {
        setRecords((prev) => [...prev, ...data]);
      }
      setHasMore(data.length === 10);
    } catch {
      // silently handle
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords(0);
  }, []);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchRecords(nextPage);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Billing History</h1>
        <p className="text-sm text-surface-500 mt-1">
          View your past payments and invoices.
        </p>
      </div>

      {loading && records.length === 0 ? (
        <div className="flex justify-center py-16">
          <Spinner size="lg" />
        </div>
      ) : records.length === 0 ? (
        <EmptyState
          icon={Receipt}
          title="No billing records"
          description="Your payment history will appear here once you make your first payment."
        />
      ) : (
        <>
          <BillingTable records={records} />
          {hasMore && (
            <div className="flex justify-center">
              <Button variant="secondary" onClick={loadMore} loading={loading}>
                Load More
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
