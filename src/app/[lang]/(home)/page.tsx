import { getLocalePath, i18n } from '@/lib/i18n';
import { notFound, redirect } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!i18n.languages.includes(lang as (typeof i18n.languages)[number])) {
    notFound();
  }

  redirect(getLocalePath(lang, 'docs/apps'));
}

export async function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}
