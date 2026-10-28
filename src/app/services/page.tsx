import type { Metadata } from 'next';
import SectionIntro from '@/components/ui/SectionIntro';
import { serviceDetails } from '@/lib/site';

export const metadata: Metadata = {
	title: 'Services',
	description: 'UX/UI design and frontend development, organised around the problems we fix.',
	alternates: { canonical: '/services' },
};

export default function ServicesPage() {
	return (
		<section className="container py-20 md:py-32">
			<SectionIntro
				eyebrow="Services"
				title="Tell us what's broken. We'll fix it."
				body="UX/UI design and frontend development, organised around the problems we fix."
			/>
			<div className="mt-16 grid gap-12 sm:mt-24 md:grid-cols-3">
				{serviceDetails.map((service, index) => (
					<article key={service.title} className="border-t border-[#332c22] pt-5" data-reveal>
						<span className="text-sm text-[#a15c34]">0{index + 1}</span>
						<p className="mt-16 text-sm text-[#a89a86]">The problem</p>
						<h2 className="mt-2 text-2xl">{service.problem}</h2>
						<p className="mt-6 text-sm text-[#a15c34]">{service.title}</p>
						<p className="mt-2 leading-7 text-[#a89a86]">{service.body}</p>
					</article>
				))}
			</div>
		</section>
	);
}
