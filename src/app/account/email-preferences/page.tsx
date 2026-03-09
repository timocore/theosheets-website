import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { SerifHeading } from "@/components/shared/SerifHeading";
import { EmailPreferencesForm } from "@/components/account/EmailPreferencesForm";

export default async function EmailPreferencesPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const prefs = await prisma.newsletterPreference.findUnique({
    where: { userId: session.user.id },
  });

  return (
    <div>
      <SerifHeading as="h1" className="mb-6">
        Email preferences
      </SerifHeading>
      <EmailPreferencesForm
        productUpdates={prefs?.productUpdates ?? true}
        marketing={prefs?.marketing ?? false}
      />
    </div>
  );
}
