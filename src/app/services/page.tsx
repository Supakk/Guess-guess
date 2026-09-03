import type { Metadata } from 'next';
import SectionIntro from '@/components/ui/SectionIntro';

export const metadata: Metadata = {
	title: 'Services',
	description: 'Flexible support for teams who care about the work and the people it serves.',
	alternates: { canonical: '/services' },
};

const services = [
	{ title: 'Strategy & direction', body: 'Positioning, content architecture, and a clear plan for what comes next.' },
	{ title: 'Identity & interface', body: 'Visual systems that make brands recognizable and products easy to use.' },
	{ title: 'Build & launch', body: 'Fast, accessible websites built with care, from first line to final detail.' },
];

export default function ServicesPage() {
	return (
		<section className="container py-20 md:py-32">
			<SectionIntro
				eyebrow="Services"
				title="From first question to final pixel."
				body="Flexible support for teams who care about the work and the people it serves."
			/>
			<div className="mt-24 grid gap-12 md:grid-cols-3">
				{services.map((service, index) => (
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
