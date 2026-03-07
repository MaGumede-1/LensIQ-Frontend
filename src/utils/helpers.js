import { SCORE_THRESHOLDS } from './constants';

export function getScoreLabel(score) {
  if (score >= SCORE_THRESHOLDS.EXCELLENT) return 'Excellent';
  if (score >= SCORE_THRESHOLDS.GOOD) return 'Good';
  if (score >= SCORE_THRESHOLDS.AVERAGE) return 'Average';
  return 'Poor';
}

export function getScoreColor(score) {
  if (score >= SCORE_THRESHOLDS.EXCELLENT) return 'text-green-500';
  if (score >= SCORE_THRESHOLDS.GOOD) return 'text-lime-500';
  if (score >= SCORE_THRESHOLDS.AVERAGE) return 'text-yellow-500';
  return 'text-red-500';
}

export function getScoreBgColor(score) {
  if (score >= SCORE_THRESHOLDS.EXCELLENT) return 'bg-green-50 border-green-200';
  if (score >= SCORE_THRESHOLDS.GOOD) return 'bg-lime-50 border-lime-200';
  if (score >= SCORE_THRESHOLDS.AVERAGE) return 'bg-yellow-50 border-yellow-200';
  return 'bg-red-50 border-red-200';
}

export function getStatusBadgeClasses(status) {
  const map = {
    ACTIVE: 'bg-green-100 text-green-700',
    TRIAL: 'bg-blue-100 text-blue-700',
    PAST_DUE: 'bg-yellow-100 text-yellow-700',
    PAUSED: 'bg-gray-100 text-gray-700',
    CANCELLED: 'bg-red-100 text-red-700',
    PENDING: 'bg-yellow-100 text-yellow-700',
    SUCCESS: 'bg-green-100 text-green-700',
    FAILED: 'bg-red-100 text-red-700',
    PROCESSING: 'bg-blue-100 text-blue-700',
    COMPLETED: 'bg-green-100 text-green-700',
  };
  return map[status] || 'bg-gray-100 text-gray-700';
}

export function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatCurrency(amount, currency = 'ZAR') {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function truncate(str, len = 30) {
  if (!str) return '';
  return str.length > len ? str.slice(0, len) + '…' : str;
}
