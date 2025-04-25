// Disable static pre-rendering for API route
export const prerender = false;

import type { APIRoute } from "astro";
import { z } from "zod";

// Environment variables
const BEEHIIV_API_KEY = import.meta.env.BEEHIIV_API_KEY;
const BEEHIIV_PUBLICATION_ID = import.meta.env.BEEHIIV_PUBLICATION_ID;
const BEEHIIV_API_BASE = "https://api.beehiiv.com/v2";

// Request validation schema
export const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

// Types
type NewsletterResponse = {
  message?: string;
  error?: string;
};

// Response helpers
const createResponse = (data: NewsletterResponse, status: number) => {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const createErrorResponse = (error: string, status: number) => {
  return createResponse({ error }, status);
};

const createSuccessResponse = (message: string) => {
  return createResponse({ message }, 200);
};

// Beehiiv API integration
const subscribeToBeehiiv = async (email: string) => {
  const response = await fetch(
    `${BEEHIIV_API_BASE}/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BEEHIIV_API_KEY}`,
      },
      body: JSON.stringify({
        email,
        reactivate_existing: false,
        send_welcome_email: true,
        utm_source: "website",
        utm_medium: "footer_form",
      }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to subscribe");
  }

  return data;
};

// API Route handler
export const POST: APIRoute = async ({ request }) => {
  try {
    // Validate request data
    const data = await request.json();
    const { email } = data;

    if (!email) {
      return createErrorResponse("Email is required", 400);
    }

    // Validate environment variables
    if (!BEEHIIV_API_KEY || !BEEHIIV_PUBLICATION_ID) {
      return createErrorResponse(
        "Server configuration error. Please contact support.",
        500,
      );
    }

    // Subscribe to newsletter
    await subscribeToBeehiiv(email);

    return createSuccessResponse("Successfully subscribed to newsletter");
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return createErrorResponse(
      error instanceof Error
        ? error.message
        : "Failed to subscribe to newsletter",
      500,
    );
  }
};
