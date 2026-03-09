import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { SerifHeading } from "@/components/shared/SerifHeading";
import { ProfileForm } from "@/components/account/ProfileForm";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;

  return (
    <div>
      <SerifHeading as="h1" className="mb-6">
        Profile
      </SerifHeading>
      <ProfileForm
        email={session.user.email ?? ""}
        name={session.user.name ?? ""}
      />
    </div>
  );
}
