import type { Metadata } from 'next';
import '@/styles/global.css';
import Motion from '@/components/motion/Motion';
import RouteTransition from '@/components/motion/RouteTransition';
import SiteFooter from '@/components/ui/SiteFooter';
import SiteHeader from '@/components/ui/SiteHeader';
import { site } from '@/lib/site';

export const metadata: Metadata = {
	metadataBase: new URL(site.url),
	title: {
		default: `${site.name} — Digital work with a point of view`,
		template: `%s — ${site.name}`,
	},
	description: site.description,
	alternates: { canonical: '/' },
	icons: { icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }, { url: '/favicon.ico' }] },
	openGraph: {
		type: 'website',
		siteName: site.name,
		title: `${site.name} — Digital work with a point of view`,
		description: site.description,
		url: '/',
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<SiteHeader />
				<RouteTransition>{children}</RouteTransition>
				<SiteFooter />
				<Motion />
			</body>
		</html>
	);
}
