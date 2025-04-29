import { RefreshCcw } from 'lucide-react';
import clsx from 'clsx';
import { lusitana } from '@/ui/fonts';
// import { fetchLatestInvoices } from '@/app/lib/data';
import { InvoiceForm } from '@/lib/definitions';

export default async function LatestInvoices() {
  // const latestInvoices = await fetchLatestInvoices();

  const latestInvoices = [
    {
      id: '1',
      customer_id: '1',
      customer: {
        name: 'Cliente 1',
        email: 'customer1@prueba.com',
      },
      amount: 1000,
      invoice_status: 'pending',
      date: '2023-10-01',
    },
    {
      id: '2',
      customer_id: '2',
      customer: {
        name: 'Cliente 2',
        email: 'customer2@prueba.com'
      },
      amount: 2000,
      invoice_status: 'paid',
      date: '2023-10-02',
    },
    {
      id: '3',
      customer_id: '3',
      customer: {
        name: 'Cliente 3',
        email: 'customer3@prueba.com'
      },
      amount: 3000,
      invoice_status: 'pending',
      date: '2023-10-03',
    },
  ]
        
        
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Últimas Facturas
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">

        <div className="bg-white px-6">
          {latestInvoices.map((invoice:InvoiceForm, i:number) => {
            return (
              <div
                key={invoice.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {invoice.customer.name}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {invoice.customer.email}
                    </p>
                  </div>
                </div>
                <p
                  className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                >
                  {invoice.amount}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <RefreshCcw className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
