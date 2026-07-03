import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions, linkItems } from '@/lib/layout.shared';
import {
  NavbarMenu,
  NavbarMenuContent,
  NavbarMenuLink,
  NavbarMenuTrigger,
} from 'fumadocs-ui/layouts/home/navbar';
import { Footer } from '@/components/footer';
import Link from 'fumadocs-core/link';
import Image from 'next/image';
import Preview from '@/../public/assets/dashboard-dark.png';
import {
  HelpCircle,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { getLocalePath } from '@/lib/i18n';

// Navigation items configuration
const NAV_ITEMS = [
  { key: 'apps', icon: Sparkles, path: '/apps' },
  { key: 'support', icon: HelpCircle, path: '/support' },
] as const;

// Internationalization text
const i18nText: Record<
  string,
  Record<string, { text: string; desc: string }>
> = {
  en: {
    title: { text: 'Documentation', desc: '' },
    apps: {
      text: 'AI Applications',
      desc: 'Integration guides for AI applications.',
    },
    support: { text: 'Help & Support', desc: 'FAQ and community support.' },
  },
  zh: {
    title: { text: '文档', desc: '' },
    apps: { text: 'AI 应用', desc: 'AI 应用集成指南。' },
    support: { text: '帮助支持', desc: '常见问题和社区支持。' },
  },
};

// Get localized text
const getTexts = (lang: string) => i18nText[lang] || i18nText.en;

// Build navigation items
const buildNavItems = (lang: string, docsUrl: string) => {
  const texts = getTexts(lang);
  return NAV_ITEMS.map(({ key, icon: Icon, path }) => ({
    text: texts[key].text,
    desc: texts[key].desc,
    url: `${docsUrl}${path}`,
    Icon,
  }));
};

// Menu link item component
function MenuLinkItem({
  item,
  className,
}: {
  item: { text: string; desc: string; url: string; Icon: LucideIcon };
  className?: string;
}) {
  const { Icon, text, desc, url } = item;
  return (
    <NavbarMenuLink href={url} className={className}>
      <Icon className="bg-fd-primary text-fd-primary-foreground mb-2 rounded-md p-1" />
      <p className="font-medium">{text}</p>
      <p className="text-fd-muted-foreground text-sm">{desc}</p>
    </NavbarMenuLink>
  );
}

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: React.ReactNode;
}) {
  const { lang } = await params;
  const texts = getTexts(lang);
  const docsUrl = getLocalePath(lang, 'docs');
  const navItems = buildNavItems(lang, docsUrl);

  return (
    <div className="flex min-h-screen flex-col">
      <HomeLayout
        {...baseOptions(lang)}
        links={[
          // Mobile menu
          {
            type: 'menu',
            on: 'menu',
            text: texts.title.text,
            items: navItems.map(({ text, url, Icon }) => ({
              text,
              url,
              icon: <Icon />,
            })),
          },
          // Desktop navigation
          {
            type: 'custom',
            on: 'nav',
            children: (
              <NavbarMenu>
                <NavbarMenuTrigger>
                  <Link href={docsUrl}>{texts.title.text}</Link>
                </NavbarMenuTrigger>
                <NavbarMenuContent className="text-[15px]">
                  {/* First item with preview image */}
                  <NavbarMenuLink href={docsUrl} className="md:row-span-2">
                    <div className="-mx-3 -mt-3">
                      <Image
                        src={Preview}
                        alt="Preview"
                        className="rounded-t-lg object-cover"
                        loading="lazy"
                        fetchPriority="low"
                        style={{
                          maskImage:
                            'linear-gradient(to bottom,white 60%,transparent)',
                        }}
                      />
                    </div>
                    <p className="font-medium">{navItems[0].text}</p>
                    <p className="text-fd-muted-foreground text-sm">
                      {navItems[0].desc}
                    </p>
                  </NavbarMenuLink>
                  <MenuLinkItem item={navItems[1]} className="lg:col-start-2" />
                </NavbarMenuContent>
              </NavbarMenu>
            ),
          },
          ...linkItems,
        ]}
        className="flex-1 dark:bg-neutral-950 dark:[--color-fd-background:var(--color-neutral-950)]"
      >
        {children}
      </HomeLayout>
      <Footer lang={lang} />
    </div>
  );
}
