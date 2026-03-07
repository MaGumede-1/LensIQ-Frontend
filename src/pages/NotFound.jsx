import { Link } from 'react-router-dom';
import { Camera, Home } from 'lucide-react';
import Button from '../components/common/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface-50 px-4 text-center">
      <Camera className="h-16 w-16 text-surface-300 mb-6" />
      <h1 className="text-6xl font-extrabold text-surface-900">404</h1>
      <p className="mt-3 text-lg text-surface-500">
        Oops — this page doesn&apos;t exist.
      </p>
      <Link to="/" className="mt-8">
        <Button>
          <Home className="h-4 w-4" />
          Back to Home
        </Button>
      </Link>
    </div>
  );
}
