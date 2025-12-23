import { NextResponse } from "next/server";

// If you're already using an email helper elsewhere, tell me and we'll reuse it.
// For now this just validates + logs so nothing breaks.

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const firstName = String(body.firstName ?? "").trim();
    const lastName = String(body.lastName ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const email = String(body.email ?? "").trim();
    const appointmentDateTime = String(body.appointmentDateTime ?? "").trim();
    const notes = String(body.notes ?? "").trim();

    // Minimal required fields
    if (!firstName || !lastName || !phone || !email || !appointmentDateTime) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ For now: confirm the endpoint works (no email yet)
    console.log("NEW APPOINTMENT REQUEST:", {
      firstName,
      lastName,
      phone,
      email,
      appointmentDateTime,
      notes,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}
