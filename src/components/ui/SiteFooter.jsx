import { site } from '@/lib/site';

export default function SiteFooter() {
	return (
		<footer className="container mt-28 border-t border-[#332c22] py-8 text-sm text-[#a89a86]">
			<div className="flex flex-col justify-between gap-4 md:flex-row">
				<span>© {new Date().getFullYear()} {site.name}</span>
				<span>{site.location}</span>
			</div>
		</footer>
	);
}
