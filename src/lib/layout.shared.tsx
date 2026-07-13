import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { i18n } from '@/lib/i18n';
import Image from 'next/image';
import type { LinkItemType } from 'fumadocs-ui/layouts/docs';
import { ExternalLink } from 'lucide-react';

const MAIN_SITE_URL = 'https://flyreq.com';

export function getLinkItems(locale: string): LinkItemType[] {
  const isChinese = locale === 'zh';

  return [
    {
      type: 'button',
      text: isChinese ? '访问官网' : 'Visit Website',
      url: MAIN_SITE_URL,
      external: true,
      active: 'none',
      icon: <ExternalLink />,
    },
  ];
}

export const logo = (
  <Image
    alt="FlyReq API"
    src="https://image.flyreq.com/favicon.png"
    width={20}
    height={20}
    className="size-5"
    priority
    unoptimized
  />
);

export function baseOptions(locale: string): BaseLayoutProps {
  return {
    i18n,
    nav: {
      title: (
        <>
          {logo}
          <span className="font-medium in-[header]:text-[15px] [.uwu_&]:hidden">
            FlyReq API
          </span>
        </>
      ),
    },
  };
}
