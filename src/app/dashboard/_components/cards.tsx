import { Banknote, Clock, Users, Inbox } from 'lucide-react';
import { lusitana } from '@/ui/fonts';
// import { fetchCardData } from '@/app/lib/data';

const iconMap = {
  collected: Banknote,
  customers: Users,
  pending: Clock,
  invoices: Inbox,
};

export default async function CardWrapper() {
  // const { totalPaidInvoices, totalPendingInvoices, numberOfInvoices, numberOfCustomers } = await fetchCardData();
  const { totalPaidInvoices, totalPendingInvoices, numberOfInvoices, numberOfCustomers } = {
    totalPaidInvoices: 1000,
    totalPendingInvoices: 500,
    numberOfInvoices: 50,
    numberOfCustomers: 20,
  };

  return (
    <>
      <Card title="Recaudado" value={totalPaidInvoices} type="collected" />
      <Card title="Pendiente" value={totalPendingInvoices} type="pending" />
      <Card title="Total Facturas" value={numberOfInvoices} type="invoices" />
      <Card
        title="Total Clientes"
        value={numberOfCustomers}
        type="customers"
      />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
