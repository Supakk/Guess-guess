import type { Metadata } from 'next';
import SectionIntro from '@/components/ui/SectionIntro';
import { serviceDetails } from '@/lib/site';

export const metadata: Metadata = {
	title: 'Services',
	description: 'UX/UI design and frontend development — from Figma handoff to a shipped, responsive interface.',
	alternates: { canonical: '/services' },
};

export default function ServicesPage() {
	return (
		<section className="container py-20 md:py-32">
			<SectionIntro
				eyebrow="Services"
				title="From first question to final pixel."
				body="UX/UI design and frontend development — from Figma handoff to a shipped, responsive interface."
			/>
			<div className="mt-16 grid gap-12 sm:mt-24 md:grid-cols-3">
				{serviceDetails.map((service, index) => (
					<article key={service.title} className="border-t border-[#332c22] pt-5" data-reveal>
						<span className="text-sm text-[#a15c34]">0{index + 1}</span>
						<h2 className="mt-16 text-2xl">{service.title}</h2>
						<p className="mt-4 leading-7 text-[#a89a86]">{service.body}</p>
					</article>
				))}
			</div>
		</section>
	);
}
