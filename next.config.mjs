import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  output: 'standalone',
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        // flyreqapi.pro domains
        'docs.flyreqapi.pro',
        'flyreqapi.pro',
        'www.flyreqapi.pro',
        // flyreqapi.ai domains
        'docs.flyreqapi.ai',
        'flyreqapi.ai',
        'www.flyreqapi.ai',
        // Vercel preview
        'flyreqapi-docs-v1.vercel.app',
      ],
    },
  },
  async headers() {
    return [
      {
        // Apply charset to HTML pages
        source: '/:lang(en|zh|ja)/:path*',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/html; charset=utf-8',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/:lang/docs/:path*.mdx',
        destination: '/:lang/llms.mdx/:path*',
      },
    ];
  },
};

export default withMDX(config);
