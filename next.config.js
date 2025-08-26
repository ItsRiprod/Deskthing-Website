// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   basePath: '/Deskthing-Website', // Adjust this to your repo name
// };

module.exports = {
  // output: "export",
  // nextConfig,
  typescript: {
    ignoreBuildErrors: true,
  },
  async headers() {
    const isDev = process.env.NODE_ENV !== "production";
    const csp = [
      "default-src 'self'",
      // scripts: allow eval in dev for React Fast Refresh; keep analytics you listed
      `script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval'" : ""} vercel.live *.vercel-analytics.com *.googletagmanager.com`,
      // styles & images/fonts same as your meta
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      // your connect targets + websocket for dev tooling
      "connect-src 'self' *.vercel-analytics.com *.speed-insights.vercel.app ws:",
      // modern clickjacking protection (in addition to X-Frame-Options below)
      "frame-ancestors 'none'",
    ].join("; ");

    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ];
  },
};