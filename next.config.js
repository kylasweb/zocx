const nextConfig = {
  output: 'export', // Enables static exports
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static exports
  },
  basePath: process.env.NODE_ENV === 'production' ? '/mlm-platform' : '',
};

module.exports = nextConfig; 