"use client";

import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

function AspectRatio(props: any) {
	const Root = AspectRatioPrimitive.Root as any;
	return (
		<Root
			data-slot="aspect-ratio"
			{...props}
		/>
	);
}

export { AspectRatio };
