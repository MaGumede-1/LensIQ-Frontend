'use client';

import Link from 'next/link';
import {
  Camera,
  Zap,
  BarChart3,
  Download,
  Star,
  ArrowRight,
  CheckCircle2,
  Eye,
  Focus,
  Sun,
} from 'lucide-react';
import Button from '../components/common/Button';

const features = [
  {
    icon: Eye,
    title: 'AI Image Analysis',
    desc: 'Advanced computer vision evaluates sharpness, exposure, contrast, and noise in every photo.',
  },
  {
    icon: Focus,
    title: 'Smart Ranking',
    desc: 'Machine learning scores and ranks all photos, surfacing your best shots automatically.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    desc: 'Process hundreds of photos in minutes, not hours. Spend more time shooting, less time sorting.',
  },
  {
    icon: BarChart3,
    title: 'Detailed Scores',
    desc: 'See per-image breakdowns for sharpness, brightness, contrast, and noise levels.',
  },
  {
    icon: Star,
    title: 'Best Shot Selection',
    desc: 'Automatically highlights the top photos from each batch — your best work, surfaced instantly.',
  },
  {
    icon: Download,
    title: 'Export with Ease',
    desc: 'Download your curated best shots in a single click, ready for delivery or editing.',
  },
];

const steps = [
  { num: '01', title: 'Upload', desc: 'Drag and drop your batch of photos from any shoot.' },
  { num: '02', title: 'Analyze', desc: 'Our AI evaluates every image for quality metrics.' },
  { num: '03', title: 'Review', desc: 'Browse ranked results and review the top picks.' },
  { num: '04', title: 'Export', desc: 'Download the best shots, ready for your workflow.' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <header className="sticky top-0 z-30 glass border-b border-surface-200">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <Camera className="h-7 w-7 text-brand-600" />
            <span className="text-xl font-bold text-surface-900">LensIQ</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-slate-50" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 lg:py-36 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700 mb-6">
            <Zap className="h-4 w-4" />
            AI-Powered Best Shot Selection
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-surface-900 leading-tight">
            Find Your Best Shots
            <br />
            <span className="text-brand-600">In Seconds</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-surface-500 leading-relaxed">
            Upload your photos, and let our AI analyze sharpness, exposure, and composition.
            Get ranked results instantly — so you spend less time sorting and more time creating.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="px-8">
                Start Free Trial
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="secondary" size="lg">View Pricing</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 lg:py-28 bg-surface-50">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-surface-900">
              Everything You Need to Cull Faster
            </h2>
            <p className="mt-3 text-surface-500 max-w-xl mx-auto">
              Professional-grade AI analysis designed for photographers who value their time.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl border border-surface-200 bg-white p-6 transition-shadow hover:shadow-md"
              >
                <div className="mb-4 inline-flex rounded-xl bg-brand-50 p-3">
                  <Icon className="h-6 w-6 text-brand-600" />
                </div>
                <h3 className="text-lg font-semibold text-surface-900">{title}</h3>
                <p className="mt-2 text-sm text-surface-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-surface-900">
              How It Works
            </h2>
            <p className="mt-3 text-surface-500">
              Four simple steps to your best photos.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map(({ num, title, desc }) => (
              <div key={num} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-white text-lg font-bold">
                  {num}
                </div>
                <h3 className="text-lg font-semibold text-surface-900">{title}</h3>
                <p className="mt-2 text-sm text-surface-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-brand-600">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ready to Streamline Your Workflow?
          </h2>
          <p className="mt-4 text-brand-100 text-lg">
            Join photographers who save hours on every shoot with AI-powered best shot selection.
          </p>
          <div className="mt-8">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-white text-brand-700 hover:bg-brand-50 px-8"
              >
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-surface-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-surface-500 text-sm">
            <Camera className="h-5 w-5" />
            <span>&copy; {new Date().getFullYear()} LensIQ. All rights reserved.</span>
          </div>
          <div className="flex gap-6 text-sm text-surface-500">
            <Link href="/pricing" className="hover:text-surface-700">Pricing</Link>
            <a href="#" className="hover:text-surface-700">Privacy</a>
            <a href="#" className="hover:text-surface-700">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
