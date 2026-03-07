import BatchCard from './BatchCard';

export default function BatchList({ batches }) {
  return (
    <div className="space-y-3">
      {batches.map((batch) => (
        <BatchCard key={batch.batch_id} batch={batch} />
      ))}
    </div>
  );
}
