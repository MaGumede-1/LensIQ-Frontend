import { getScoreColor, getScoreBgColor, getScoreLabel } from '../../utils/helpers';

export default function ScoreBadge({ score, size = 'md' }) {
  const percent = Math.round(score * 100);
  const label = getScoreLabel(score);
  const colorClass = getScoreColor(score);
  const bgClass = getScoreBgColor(score);

  if (size === 'sm') {
    return (
      <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold ${bgClass} ${colorClass}`}>
        {percent}
      </span>
    );
  }

  return (
    <div className={`inline-flex flex-col items-center rounded-xl border p-3 ${bgClass}`}>
      <span className={`text-2xl font-bold ${colorClass}`}>{percent}</span>
      <span className="text-xs text-surface-500 mt-0.5">{label}</span>
    </div>
  );
}
