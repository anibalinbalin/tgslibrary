"use client";

import Link from "next/link";
import { useLanguage } from "../i18n/LanguageContext";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-medium mb-4">{t('notFound')}</h1>
      <Link
        href="/"
        className="text-blue-600 hover:underline"
      >
        {t('goHome')}
      </Link>
    </div>
  );
}
