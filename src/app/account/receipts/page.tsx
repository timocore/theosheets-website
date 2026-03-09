import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { SerifHeading } from "@/components/shared/SerifHeading";

export default async function ReceiptsPage() {
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
        Receipts
      </SerifHeading>
      {orders.length === 0 ? (
        <p className="text-charcoal-light">No receipts yet.</p>
      ) : (
        <ul className="space-y-6">
          {orders.map((order) => (
            <li
              key={order.id}
              className="border border-border-warm rounded-lg p-4 bg-parchment-light"
            >
              <div className="flex justify-between items-start mb-3">
                <span className="font-medium text-charcoal">
                  Order #{order.orderNumber}
                </span>
                <span className="text-sm text-charcoal-light">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>
              <ul className="text-sm text-charcoal-light space-y-1 mb-3">
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.quantity}× (from order) — $
                    {Number(item.totalPrice).toFixed(2)}
                  </li>
                ))}
              </ul>
              <p className="text-sm font-medium">
                Total: ${Number(order.total).toFixed(2)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
