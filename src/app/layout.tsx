import type { Metadata } from 'next';
import { Pixelify_Sans } from 'next/font/google';
import '@/styles/global.css';

const pixelFont = Pixelify_Sans({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
	variable: '--font-pixel',
	display: 'swap',
});
import Motion from '@/components/motion/Motion';
import RouteTransition from '@/components/motion/RouteTransition';
import SiteFooter from '@/components/ui/SiteFooter';
import SiteHeader from '@/components/ui/SiteHeader';
import { site } from '@/lib/site';

export const metadata: Metadata = {
	metadataBase: new URL(site.url),
	title: {
		default: `${site.name} — UX/UI design & frontend development`,
		template: `%s — ${site.name}`,
	},
	description: site.description,
	alternates: { canonical: '/' },
	icons: { icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }, { url: '/favicon.ico' }] },
	openGraph: {
		type: 'website',
		siteName: site.name,
		title: `${site.name} — UX/UI design & frontend development`,
		description: site.description,
		url: '/',
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={pixelFont.variable}>
			<body>
				<SiteHeader />
				<RouteTransition>{children}</RouteTransition>
				<SiteFooter />
				<Motion />
			</body>
		</html>
	);
}
