import type { Metadata } from 'next';
import ContactForm from '@/components/ui/ContactForm';

export const metadata: Metadata = {
	title: 'Contact',
	description: 'Tell us what you are thinking. Start a project with Eunyu Studio.',
	alternates: { canonical: '/contact' },
};

export default async function ContactPage({
	searchParams,
}: {
	searchParams: Promise<{ sent?: string }>;
}) {
	const { sent } = await searchParams;

	return (
		<section className="container py-20 md:py-32">
			<p className="eyebrow">Start a project</p>
			<h1 className="mt-8 max-w-3xl text-4xl font-medium leading-[0.95] tracking-[-0.03em] sm:text-6xl sm:leading-[0.92] sm:tracking-[-0.05em] md:text-8xl">
				Tell us what you&apos;re thinking.
			</h1>

			{sent === 'true' ? (
				<p className="mt-12 max-w-2xl border-t border-[#332c22] pt-6 text-lg leading-8 text-[#a89a86] sm:mt-20" role="status">
					Thank you — your enquiry is on its way. We usually reply within two working days.
				</p>
			) : (
				<ContactForm className="mt-12 max-w-2xl sm:mt-20" />
			)}
		</section>
	);
}
