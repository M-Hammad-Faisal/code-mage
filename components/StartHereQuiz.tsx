'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Compass, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

type FrameworkSlug = 'playwright' | 'cypress' | 'webdriverio';

interface Recommendation {
  framework: FrameworkSlug;
  frameworkTitle: string;
  reason: string;
}

const FRAMEWORK_INFO: Record<FrameworkSlug, { title: string; reason: string }> = {
  playwright: {
    title: 'Playwright',
    reason:
      "Playwright is the modern default for most teams — fast, auto-waiting, and one API across Chromium, Firefox, and WebKit. Start here if you don't have a strong reason to pick something else.",
  },
  cypress: {
    title: 'Cypress',
    reason:
      'Cypress has the best day-to-day developer experience — time-travel debugging, instant reload — but it leans Chromium/Electron-first and is less suited to multi-tab or cross-origin flows.',
  },
  webdriverio: {
    title: 'WebdriverIO',
    reason:
      'WebdriverIO gives you the most WebDriver-protocol flexibility — real device mobile testing via Appium, and broad compatibility with enterprise test grids.',
  },
};

type Step = 'experience' | 'target' | 'priority' | 'result';

export function StartHereQuiz() {
  const [step, setStep] = useState<Step>('experience');
  const [isBeginner, setIsBeginner] = useState<boolean | null>(null);
  const [result, setResult] = useState<Recommendation | null>(null);

  function chooseExperience(beginner: boolean) {
    setIsBeginner(beginner);
    setStep('target');
  }

  function chooseTarget(mobile: boolean) {
    if (mobile) {
      setResult({
        framework: 'webdriverio',
        frameworkTitle: FRAMEWORK_INFO.webdriverio.title,
        reason:
          'Since you need native mobile coverage, WebdriverIO + Appium is the only realistic choice among these three — Playwright and Cypress are browser-only.',
      });
      setStep('result');
    } else {
      setStep('priority');
    }
  }

  function choosePriority(framework: FrameworkSlug) {
    setResult({
      framework,
      frameworkTitle: FRAMEWORK_INFO[framework].title,
      reason: FRAMEWORK_INFO[framework].reason,
    });
    setStep('result');
  }

  function reset() {
    setStep('experience');
    setIsBeginner(null);
    setResult(null);
  }

  return (
    <div className="rounded-2xl border-2 border-red-300 dark:border-red-800 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/10 p-6 md:p-8 mb-10 overflow-hidden">
      <div className="flex items-center gap-2 mb-1">
        <Compass className="w-4 h-4 text-red-500" />
        <p className="text-xs font-mono text-red-600 dark:text-red-400 tracking-widest uppercase">
          Not sure where to start?
        </p>
      </div>
      <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">
        Answer two questions — I&apos;ll point you to the right track
      </h2>

      <AnimatePresence mode="wait">
        {step === 'experience' && (
          <motion.div
            key="experience"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
              Have you written automated browser tests before?
            </p>
            <div className="flex flex-wrap gap-3">
              <QuizButton onClick={() => chooseExperience(true)}>
                Not really — I&apos;m new to this
              </QuizButton>
              <QuizButton onClick={() => chooseExperience(false)}>
                Yes, I&apos;ve written tests before
              </QuizButton>
            </div>
          </motion.div>
        )}

        {step === 'target' && (
          <motion.div
            key="target"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">What are you testing?</p>
            <div className="flex flex-wrap gap-3">
              <QuizButton onClick={() => chooseTarget(false)}>A web app (browser only)</QuizButton>
              <QuizButton onClick={() => chooseTarget(true)}>
                Web + native mobile apps (Android/iOS)
              </QuizButton>
            </div>
          </motion.div>
        )}

        {step === 'priority' && (
          <motion.div
            key="priority"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
              What matters most to you?
            </p>
            <div className="flex flex-col gap-2.5 items-start">
              <QuizButton onClick={() => choosePriority('playwright')}>
                Fast, modern, works great across all browsers
              </QuizButton>
              <QuizButton onClick={() => choosePriority('cypress')}>
                Best developer experience for a frontend-heavy team
              </QuizButton>
              <QuizButton onClick={() => choosePriority('webdriverio')}>
                WebDriver-protocol flexibility / enterprise grid support
              </QuizButton>
            </div>
          </motion.div>
        )}

        {step === 'result' && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-xs font-mono text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
              Your path
            </p>
            <p className="text-lg font-heading font-semibold text-gray-900 dark:text-white mb-2">
              {isBeginner ? `Prerequisites → ${result.frameworkTitle}` : result.frameworkTitle}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-5 leading-relaxed max-w-xl">
              {result.reason}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={isBeginner ? '/tutorial/prerequisites' : `/tutorial/${result.framework}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-all shadow-sm"
              >
                {isBeginner
                  ? 'Start with Prerequisites'
                  : `Start the ${result.frameworkTitle} Tutorial`}{' '}
                <ArrowRight className="w-4 h-4" />
              </Link>
              {isBeginner && (
                <Link
                  href={`/tutorial/${result.framework}`}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:underline"
                >
                  Already comfortable with the basics? Jump straight to {result.frameworkTitle}
                </Link>
              )}
            </div>

            <button
              onClick={reset}
              className="inline-flex items-center gap-1.5 mt-5 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <RotateCcw className="w-3 h-3" /> Start over
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function QuizButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-300 hover:border-red-300 dark:hover:border-red-700 hover:text-red-600 dark:hover:text-red-400 transition-all shadow-sm"
    >
      {children}
    </button>
  );
}
