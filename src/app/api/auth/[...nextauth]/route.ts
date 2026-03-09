import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

async function wrappedHandler(
  req: Request,
  context: { params: Promise<{ nextauth?: string[] }> }
) {
  if (!process.env.NEXTAUTH_SECRET) {
    console.error("[NextAuth] NEXTAUTH_SECRET is not set");
    return new Response(
      JSON.stringify({
        error: "ConfigurationError",
        message: "NEXTAUTH_SECRET is not set. Add it to your .env file.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
  try {
    return await handler(req, context);
  } catch (error) {
    console.error("[NextAuth] Error:", error);
    return new Response(
      JSON.stringify({
        error: "ConfigurationError",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export { wrappedHandler as GET, wrappedHandler as POST };
