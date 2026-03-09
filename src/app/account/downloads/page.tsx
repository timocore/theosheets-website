import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isPlaceholderKey } from "@/lib/s3";
import { SerifHeading } from "@/components/shared/SerifHeading";

export default async function DownloadsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const downloads = await prisma.download.findMany({
    where: {
      OR: [
        { userId: session.user.id },
        { order: { userId: session.user.id } },
      ],
    },
    include: {
      order: true,
      product: { select: { title: true, slug: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <SerifHeading as="h1" className="mb-6">
        Downloads
      </SerifHeading>
      {downloads.length === 0 ? (
        <p className="text-charcoal-light">
          You don&apos;t have any downloads yet. Purchases will appear here.
        </p>
      ) : (
        <ul className="space-y-4">
          {downloads.map((d) => {
            const isReady = !isPlaceholderKey(d.s3Key);
            return (
              <li
                key={d.id}
                className="flex items-center justify-between border border-border-warm rounded-lg p-4 bg-parchment-light"
              >
                <div>
                  <p className="font-medium text-charcoal">{d.product.title}</p>
                  <p className="text-sm text-charcoal-light capitalize">
                    {d.assetType}
                  </p>
                </div>
                {isReady ? (
                  <a
                    href={`/api/download/${d.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-honey hover:text-honey-dark font-medium"
                  >
                    Download
                  </a>
                ) : (
                  <span className="text-sm text-charcoal-light italic">
                    Preparing…
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
