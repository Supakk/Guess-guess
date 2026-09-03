import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Contact',
	description: 'Tell us what you are thinking. Start a project with Morrow Studio.',
	alternates: { canonical: '/contact' },
};

const field = 'border-b border-[#4a3f30] bg-transparent px-0 py-3 outline-none focus:border-[#c1734a]';

export default async function ContactPage({
	searchParams,
}: {
	searchParams: Promise<{ sent?: string }>;
}) {
	const { sent } = await searchParams;

	return (
		<section className="container py-20 md:py-32">
			<p className="eyebrow">Start a project</p>
			<h1 className="mt-8 max-w-3xl text-6xl font-medium leading-[0.92] tracking-[-0.05em] md:text-8xl">
				Tell us what you&apos;re thinking.
			</h1>

			{sent === 'true' ? (
				<p className="mt-20 max-w-2xl border-t border-[#332c22] pt-6 text-lg leading-8 text-[#a89a86]" role="status">
					Thank you — your enquiry is on its way. We usually reply within two working days.
				</p>
			) : (
				<form className="glass mt-20 grid max-w-2xl gap-6 rounded-3xl p-8 md:p-12" method="post" action="/api/contact">
					<label className="grid gap-2 text-sm">
						Name
						<input className={field} name="name" required />
					</label>
					<label className="grid gap-2 text-sm">
						Email
						<input className={field} type="email" name="email" required />
					</label>
					<label className="grid gap-2 text-sm">
						Project details
						<textarea className={`min-h-32 ${field}`} name="message" required />
					</label>
					<button className="mt-4 w-fit rounded-full bg-[#f6f0e6] px-6 py-3 text-sm text-[#15120d] hover:bg-[#c1734a]" type="submit">
						Send enquiry ↗
					</button>
				</form>
			)}
		</section>
	);
}
