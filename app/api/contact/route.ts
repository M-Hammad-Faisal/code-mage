import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { createAnonClient } from '@/lib/supabase/server';
import { rateLimitGuard, isValidEmail } from '@/lib/api-guard';

export async function POST(req: NextRequest) {
  const limited = await rateLimitGuard(req, 5, 10 * 60_000); // 5 req per 10 min per IP
  if (limited) return limited;

  try {
    const { name, email, subject, message, company } = await req.json();

    // Honeypot — a hidden field real users never fill in. Bots that
    // autofill every form field trip this; report success so they move on.
    if (company) {
      return NextResponse.json({ message: "Message sent! I'll get back to you soon 🚀" });
    }

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Name, email and message are required.' }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const supabase = createAnonClient();

    const { error } = await supabase.from('contact_messages').insert({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      subject: subject?.trim() ?? null,
      message: message.trim(),
    });

    if (error) {
      console.error('[contact] Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to save message. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Message sent! I'll get back to you soon 🚀" });
  } catch (err) {
    console.error('[contact] Unexpected error:', err);
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 });
  }
}
