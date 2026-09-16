import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { createAnonClient } from '@/lib/supabase/server';
import { rateLimitGuard, isValidEmail } from '@/lib/api-guard';

export async function POST(req: NextRequest) {
  const limited = await rateLimitGuard(req, 3, 10 * 60_000); // 3 req per 10 min per IP
  if (limited) return limited;

  try {
    const { email, source, company } = await req.json();

    // Honeypot — a hidden field real users never fill in.
    if (company) {
      return NextResponse.json({ message: "You're on the list! Welcome to the Mage Circle 🪄" });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const supabase = createAnonClient();

    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({ email: email.toLowerCase().trim(), source: source ?? 'site', confirmed: false });

    if (error) {
      // Duplicate email
      if (error.code === '23505') {
        return NextResponse.json({ message: "You're already subscribed! 🎉" }, { status: 200 });
      }
      console.error('[newsletter] Supabase error:', error);
      return NextResponse.json(
        { error: 'Something went wrong. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "You're on the list! Welcome to the Mage Circle 🪄" });
  } catch (err) {
    console.error('[newsletter] Unexpected error:', err);
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 });
  }
}
