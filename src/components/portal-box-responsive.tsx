"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import CustomsPortalBox from "./portal-box";
import CustomsPortalBoxMobile from "./portal-box-mobile";

export default function PortalBoxResponsive() {
	const isMobile = useIsMobile();

	if (isMobile === undefined) {
		// Loading state - render desktop version as fallback
		return <CustomsPortalBox />;
	}

	return isMobile ? <CustomsPortalBoxMobile /> : <CustomsPortalBox />;
}
