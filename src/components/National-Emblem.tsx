import Image from "next/image";

type NationalEmblemProps = {
	className?: string;
	alt?: string;
};

const NationalEmblem = ({ className, alt = "Indian National Emblem , Satyameva Jayate" }: NationalEmblemProps) => {
	return (
		<div className={className}>
			<Image
				src="/national-emblem/light.png"
				alt={alt}
				width={160}
				height={256}
				className="block dark:hidden w-full h-full"
				priority
			/>
			<Image
				src="/national-emblem/dark.png"
				alt={alt}
				width={160}
				height={256}
				className="hidden dark:block w-full h-full"
				priority
			/>
		</div>
	);
};

export default NationalEmblem;
