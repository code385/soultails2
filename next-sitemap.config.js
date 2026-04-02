/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://soultails.com',
  generateRobotsTxt: false, // We use Next.js app router robots.ts
  exclude: ['/admin/*', '/api/*', '/studio/*'],
  changefreq: 'weekly',
  priority: 0.7,
}
