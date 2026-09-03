/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Mixed .jsx / .tsx sources — allow both through the same pipeline.
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
};

export default nextConfig;
