import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { SerifHeading } from "@/components/shared/SerifHeading";

export default async function PurchasesPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  return (
    <div>
      <SerifHeading as="h1" className="mb-6">
        Purchases
      </SerifHeading>
      {orders.length === 0 ? (
        <p className="text-charcoal-light">You haven&apos;t made any purchases yet.</p>
      ) : (
        <ul className="space-y-6">
          {orders.map((order: (typeof orders)[number]) => (
            <li
              key={order.id}
              className="border border-border-warm rounded-lg p-4 bg-parchment-light"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium text-charcoal">
                  Order #{order.orderNumber}
                </span>
                <span className="text-sm text-charcoal-light">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-charcoal-light">
                {order.items.length} item{order.items.length !== 1 ? "s" : ""} · $
                {Number(order.total).toFixed(2)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
