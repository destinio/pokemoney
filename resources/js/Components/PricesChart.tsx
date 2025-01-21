import { IPrice } from '@/all-types';
import { format } from 'date-fns';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface IPriceChartDataProps {
  priceChartData: IPrice[];
}

export default function PricesChart({ priceChartData }: IPriceChartDataProps) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={priceChartData}>
        <CartesianGrid strokeDasharray={'3 3'} />
        <XAxis
          dataKey="created_at"
          tickFormatter={(date) => format(new Date(date), 'MM/dd/yy')} // Format for the date
        />
        <YAxis label={{ value: 'Value', angle: -90, position: 'insideLeft' }} />
        <Legend />
        <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
        <Line type="monotone" dataKey="low" stroke="#8884d8" name="Low" />
        <Line type="monotone" dataKey="mid" stroke="#82ca9d" name="Mid" />
        <Line type="monotone" dataKey="high" stroke="#ffc658" name="High" />
        <Line type="monotone" dataKey="market" stroke="#ff7300" name="Market" />

        <Line
          type="monotone"
          dataKey="directLow"
          stroke="#ff0000"
          name="Direct Low"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
