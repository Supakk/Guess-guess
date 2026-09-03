import type { Metadata } from 'next';
import SectionIntro from '@/components/ui/SectionIntro';

export const metadata: Metadata = {
	title: 'About',
	description: 'Morrow is an independent practice for brand, product, and web.',
	alternates: { canonical: '/about' },
};

const principles = ['Clarity over decoration.', 'Useful beats impressive.', 'Good collaboration makes better work.'];

export default function AboutPage() {
	return (
		<section className="container py-20 md:py-32">
			<SectionIntro
				eyebrow="About"
				title="Small by design. Serious about outcomes."
				body="Morrow is an independent practice for brand, product, and web. We bring strategy and craft into the same room."
			/>
			<div className="mt-24 grid gap-12 border-t border-[#332c22] pt-6 md:grid-cols-2">
				<p className="eyebrow">Principles</p>
				<div className="space-y-8 text-2xl leading-tight">
					{principles.map((principle) => (
						<p key={principle} data-reveal>
							{principle}
						</p>
					))}
				</div>
			</div>
		</section>
	);
}
