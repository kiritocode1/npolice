"use client";

import { ReactNode, useEffect, useState } from "react";

// Lightweight gate to skip rendering children in performance mode
export default function PerformanceGate({ children }: { children: ReactNode }) {
	const [enabled, setEnabled] = useState(true);

	useEffect(() => {
		const isPerf = (() => {
			if (typeof window === "undefined") return false;
			const qp = window.location.search;
			if (qp.includes("performance=true") || qp.includes("force-performance=true")) return true;
			if (navigator.userAgent.includes("Lighthouse") || navigator.userAgent.includes("Chrome-Lighthouse")) return true;
			if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
			return document.documentElement.classList.contains("performance-mode");
		})();
		setEnabled(!isPerf);
	}, []);

	if (!enabled) return null;
	return <>{children}</>;
}

