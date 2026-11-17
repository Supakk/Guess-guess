const field = 'rounded-xl border border-[#4a3f30] bg-[#15120d]/40 px-4 py-3 text-base outline-none transition-colors focus:border-[#c1734a]';

export default function ContactForm({ className = '' }) {
	return (
		<form className={`glass grid gap-5 rounded-3xl p-5 sm:gap-6 sm:p-8 md:p-12 ${className}`} method="post" action="/api/contact">
			<label className="grid gap-2 text-sm text-[#a89a86]">
				Name
				<input className={field} name="name" autoComplete="name" required />
			</label>
			<label className="grid gap-2 text-sm text-[#a89a86]">
				Email
				<input className={field} type="email" name="email" autoComplete="email" inputMode="email" required />
			</label>
			<label className="grid gap-2 text-sm text-[#a89a86]">
				Project details
				<textarea className={`min-h-32 ${field}`} name="message" required />
			</label>
			<button
				className="press btn-arrow mt-2 min-h-12 w-full justify-center rounded-full bg-[#f6f0e6] px-6 py-3 text-base text-[#15120d] hover:bg-[#c1734a] sm:mt-4 sm:w-fit sm:text-sm"
				type="submit"
			>
				<span className="ba-label">Send enquiry</span>
				<span className="ba-icon" aria-hidden="true">
					<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" /></svg>
				</span>
			</button>
		</form>
	);
}
