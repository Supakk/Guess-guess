import { NextResponse } from 'next/server';
import { z } from 'zod';

const enquirySchema = z.object({
	name: z.string().trim().min(1),
	email: z.email(),
	message: z.string().trim().min(1),
});

export async function POST(request: Request) {
	const formData = await request.formData();
	const parsed = enquirySchema.safeParse({
		name: formData.get('name'),
		email: formData.get('email'),
		message: formData.get('message'),
	});

	if (!parsed.success) {
		return new NextResponse('Missing or invalid fields', { status: 400 });
	}

	// TODO: deliver the enquiry (Resend email / LINE Messaging API push) before replying.

	return NextResponse.redirect(new URL('/contact?sent=true', request.url), 303);
}
