const field = 'border-b border-[#4a3f30] bg-transparent px-0 py-3 outline-none focus:border-[#c1734a]';

export default function ContactForm({ className = '' }) {
	return (
		<form className={`glass grid gap-6 rounded-3xl p-6 sm:p-8 md:p-12 ${className}`} method="post" action="/api/contact">
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
	);
}
