import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const RECIPIENT_EMAIL = "contact@nuancesdecoration.com";
const FALLBACK_RECIPIENT = "agiocanti@instagrume.com";

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[
        character
      ] ?? character,
  );

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const appointmentType =
      body.appointment_type === "showroom" || body.appointment_type === "domicile"
        ? body.appointment_type
        : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!name || !email || !phone || !appointmentType || !message) {
      return new Response(
        JSON.stringify({ error: "Tous les champs sont obligatoires." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !serviceRoleKey) {
      console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
      return new Response(
        JSON.stringify({ error: "Configuration manquante." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Insert via REST API directly — no npm dependency needed
    if (body.skip_save !== true) {
      const insertResponse = await fetch(
        `${supabaseUrl}/rest/v1/contact_messages`,
        {
          method: "POST",
          headers: {
            "apikey": serviceRoleKey,
            "Authorization": `Bearer ${serviceRoleKey}`,
            "Content-Type": "application/json",
            "Prefer": "return=minimal",
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            appointment_type: appointmentType,
            message,
          }),
        },
      );

      if (!insertResponse.ok) {
        const errBody = await insertResponse.text();
        console.error("DB insert error:", insertResponse.status, errBody);
        return new Response(
          JSON.stringify({ error: "Votre demande n'a pas pu être enregistrée." }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
    }

    // Send email — failure here does not block the saved record
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

    if (RESEND_API_KEY) {
      const emailHtml = `
        <h2 style="font-family: Georgia, serif; color: #6B4E3D;">Nouvelle demande de rendez-vous</h2>
        <table style="font-family: Arial, sans-serif; font-size: 14px; color: #333; border-collapse: collapse;">
          <tr><td style="padding: 6px 12px; font-weight: bold;">Nom</td><td style="padding: 6px 12px;">${escapeHtml(name)}</td></tr>
          <tr><td style="padding: 6px 12px; font-weight: bold;">Email</td><td style="padding: 6px 12px;">${escapeHtml(email)}</td></tr>
          <tr><td style="padding: 6px 12px; font-weight: bold;">Téléphone</td><td style="padding: 6px 12px;">${escapeHtml(phone)}</td></tr>
          <tr><td style="padding: 6px 12px; font-weight: bold;">Type de rendez-vous</td><td style="padding: 6px 12px;">${appointmentType === "showroom" ? "Au showroom" : "À domicile"}</td></tr>
        </table>
        <h3 style="font-family: Georgia, serif; color: #6B4E3D; margin-top: 24px;">Message</h3>
        <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(message)}</p>
      `;

      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Nuances Décoration <onboarding@resend.dev>",
          to: FALLBACK_RECIPIENT,
          reply_to: email,
          subject: `Nouvelle demande de rendez-vous — ${name}`,
          html: emailHtml,
        }),
      });

      if (!resendResponse.ok) {
        const resendError = await resendResponse.text();
        console.error("Resend error:", resendResponse.status, resendError);
        return new Response(
          JSON.stringify({
            success: true,
            message: "Votre demande a bien été enregistrée.",
            email_error: `Email non envoyé (${resendResponse.status}): ${resendError}`,
          }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
    } else {
      console.warn("RESEND_API_KEY not configured — skipping email send");
      return new Response(
        JSON.stringify({
          success: true,
          message: "Votre demande a bien été enregistrée.",
          email_error: "RESEND_API_KEY non configuré",
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Votre demande a bien été envoyée." }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(
      JSON.stringify({ error: "Une erreur inattendue s'est produite." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
