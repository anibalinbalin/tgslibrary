"use client";

import { useEffect } from "react";
import { useLanguage } from "../i18n/LanguageContext";

type ErrorPageProps = {
  error: Error;
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const { t } = useLanguage();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-medium mb-4 text-balance">{t('error')}</h1>
      <button
        onClick={reset}
        className="text-blue-600 hover:underline"
      >
        {t('tryAgain')}
      </button>
    </div>
  );
}
