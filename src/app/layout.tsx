import type { Metadata, Viewport } from 'next';
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

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	// Lets the page run under the notch / home bar; .container pads itself back with env(safe-area-inset-*).
	viewportFit: 'cover',
	themeColor: '#15120d',
};

export const metadata: Metadata = {
	metadataBase: new URL(site.url),
	title: {
		default: `${site.name} — UX/UI design & frontend development`,
		template: `%s — ${site.name}`,
	},
	description: site.description,
	alternates: { canonical: '/' },
	icons: {
		icon: [
			{ url: '/favicon.ico', sizes: '16x16 32x32 48x48 64x64' },
			{ url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
		],
		apple: '/apple-touch-icon.png',
	},
	openGraph: {
		type: 'website',
		siteName: site.name,
		title: `${site.name} — UX/UI design & frontend development`,
		description: site.description,
		images: [{ url: site.ogImage, width: 1200, height: 630, alt: site.name }],
	},
	twitter: { card: 'summary_large_image', images: [site.ogImage] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={pixelFont.variable} suppressHydrationWarning>
			<head>
				{/* Before first paint: mark the page so reveal targets start hidden, but only when JS runs
				    and motion is allowed — otherwise content shows as-is. See .js-motion in global.css. */}
				<script
					dangerouslySetInnerHTML={{
						__html: "if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('js-motion')",
					}}
				/>
			</head>
			<body>
				<SiteHeader />
				<RouteTransition>{children}</RouteTransition>
				<SiteFooter />
				<Motion />
			</body>
		</html>
	);
}
