import { generateYAxis } from '@/lib/utils';
import { Calendar } from 'lucide-react';
import { lusitana } from '@/ui/fonts';
// import { fetchRevenue } from '@/lib/data';

// This component is representational only.
// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

export default async function RevenueChart() {
  // const revenue = await fetchRevenue();

  const revenue = [
    { month: 'Ene', revenue: 100 },
    { month: 'Feb', revenue: 200 },
    { month: 'Mar', revenue: 300 },
    { month: 'Abr', revenue: 400 },
    { month: 'May', revenue: 500 },
    { month: 'Jun', revenue: 600 },
    { month: 'Jul', revenue: 700 },
    { month: 'Ago', revenue: 800 },
    { month: 'Sep', revenue: 900 },
    { month: 'Oct', revenue: 1000 },
    { month: 'Nov', revenue: 1100 },
    { month: 'Dic', revenue: 1200 },
  ];
  
  const chartHeight = 350;

  const { yAxisLabels, topLabel } = generateYAxis(revenue);

  if (!revenue || revenue.length === 0) {
    return <p className="w-full mt-4 text-gray-400 md:col-span-4">No data available.</p>;
  }

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Ganancias Recientes
      </h2>

      <div className="rounded-xl bg-gray-50 p-4">
        <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
          <div
            className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {revenue.map((month) => (
            <div key={month.month} className="flex flex-col items-center gap-2">
              <div
                className="w-full rounded-md bg-blue-300"
                style={{
                  height: `${(chartHeight / topLabel) * month.revenue}px`,
                }}
              ></div>
              <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                {month.month}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <Calendar className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Last 12 months</h3>
        </div>
      </div>
    </div>
  );
}
