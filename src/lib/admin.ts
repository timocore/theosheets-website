import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

const adminEmails = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;
  const isAdmin = adminEmails.includes(session.user.email.toLowerCase());
  if (!isAdmin) return null;
  return session;
}
