import Link from 'next/link';
import { getLocalePath } from '@/lib/i18n';

interface FooterProps {
  lang: string;
}

// External links (same labels across all languages)
const relatedProjects: { label: string; href: string }[] = [
  { label: 'FlyReq', href: 'https://flyreq.com' },
];

const friendshipLinks: { label: string; href: string }[] = [
  { label: 'FlyReq', href: 'https://flyreq.com' },
  { label: 'LangBot', href: 'https://langbot.app' },
];

// ============================================
// Internal link paths (only labels need translation)
// ============================================
const internalPaths = {
  apps: 'docs/apps',
  support: 'docs/support',
} as const;

// ============================================
// Translations (only text that differs by language)
// ============================================
interface FooterTranslation {
  sections: {
    docs: {
      title: string;
      apps: string;
      support: string;
    };
    relatedProjects: string;
    friendshipLinks: string;
  };
  copyright: string;
}

const translations: Record<string, FooterTranslation> = {
  zh: {
    sections: {
      docs: {
        title: '文档',
        apps: 'AI 应用',
        support: '帮助支持',
      },
      relatedProjects: '相关项目',
      friendshipLinks: '友情链接',
    },
    copyright: '© 2026 FlyReq. All Rights Reserved.',
  },
  en: {
    sections: {
      docs: {
        title: 'Docs',
        apps: 'AI Applications',
        support: 'Help & Support',
      },
      relatedProjects: 'Related Projects',
      friendshipLinks: 'Friendship Links',
    },
    copyright: '© 2026 FlyReq. All Rights Reserved.',
  },
};

// ============================================
// Build sections from translations
// ============================================
function buildSections(t: FooterTranslation) {
  return [
    {
      title: t.sections.docs.title,
      links: [
        { label: t.sections.docs.apps, href: internalPaths.apps },
        { label: t.sections.docs.support, href: internalPaths.support },
      ],
    },
    {
      title: t.sections.relatedProjects,
      links: relatedProjects.map((p) => ({ ...p, external: true })),
    },
    {
      title: t.sections.friendshipLinks,
      links: friendshipLinks.map((p) => ({ ...p, external: true })),
    },
  ];
}

// ============================================
// Footer Component
// ============================================
export function Footer({ lang }: FooterProps) {
  const t = translations[lang] || translations.en;
  const sections = buildSections(t);

  return (
    <footer className="border-fd-border bg-fd-card/30 mt-auto border-t backdrop-blur-sm">
      <div className="mx-auto max-w-[1400px] px-6 py-12">
        {/* Top: Links Grid */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 pb-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-12">
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-fd-foreground mb-4 text-sm font-semibold">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    {'external' in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-fd-muted-foreground hover:text-fd-foreground text-sm transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={getLocalePath(lang, link.href)}
                        className="text-fd-muted-foreground hover:text-fd-foreground text-sm transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom: Copyright */}
        <div className="border-fd-border flex flex-col items-start justify-between gap-4 border-t pt-8 sm:flex-row sm:items-center">
          <div className="text-fd-muted-foreground flex flex-col gap-2 text-xs">
            <p>{t.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
