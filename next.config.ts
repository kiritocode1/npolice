import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	experimental: {
		useCache: true,
		cacheLife: {
			"1h": {
				stale: 300, // 5 minutes
				revalidate: 3600, // 1 hour
				expire: 7200, // 2 hours
			},
		},
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.pexels.com",
				port: "",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
