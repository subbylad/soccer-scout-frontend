import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Production build optimization
  poweredByHeader: false, // Remove X-Powered-By header for security
  compress: true, // Enable gzip compression
  
  // Ensure standalone output for Vercel
  output: process.env.BUILD_STANDALONE ? 'standalone' : undefined,
  
  // Build optimization
  eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV === 'production', // Only ignore in production
  },
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === 'production', // Only ignore in production
  },
  
  // Image optimization
  images: {
    domains: ['localhost', 'vercel.app'],
    unoptimized: process.env.NODE_ENV === 'development', // Optimize images in production
    formats: ['image/webp', 'image/avif'], // Modern image formats
  },
  
  // Security headers (CORS handled by backend API)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  
  // Webpack optimization
  webpack: (config, { dev, isServer }) => {
    // SVG handling
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    
    // Production optimizations
    if (!dev && !isServer) {
      // Bundle analyzer (optional, uncomment to analyze bundle size)
      // const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      // config.plugins.push(
      //   new BundleAnalyzerPlugin({
      //     analyzerMode: 'static',
      //     openAnalyzer: false,
      //   })
      // );
      
      // Optimization for smaller bundles
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
          },
        },
      };
    }
    
    return config;
  },
  
  // Frontend-only deployment configuration
  // No serverless functions needed for frontend-only repository
  
  // Experimental features for better performance
  experimental: {
    optimizeCss: true, // Optimize CSS
    optimizePackageImports: ['lucide-react', 'framer-motion'], // Optimize specific packages
  },
};

export default nextConfig;
