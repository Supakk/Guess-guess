import type { Metadata } from 'next';
import SectionIntro from '@/components/ui/SectionIntro';
import { principles } from '@/lib/site';

export const metadata: Metadata = {
	title: 'About',
	description: 'Eunyu is an independent practice for UX/UI design and frontend development.',
	alternates: { canonical: '/about' },
};

export default function AboutPage() {
	return (
		<section className="container py-20 md:py-32">
			<SectionIntro
				eyebrow="About"
				title="Small by design. Serious about outcomes."
				body="Eunyu is an independent practice for UX/UI design and frontend development. We turn Figma files and reference designs into fast, faithful, production-ready interfaces."
			/>
			<div className="mt-16 grid gap-12 border-t border-[#332c22] pt-6 sm:mt-24 md:grid-cols-2">
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
