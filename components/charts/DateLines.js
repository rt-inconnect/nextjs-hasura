import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import { Card } from "antd";
import i18n from "constants/i18n";

import moment from "moment";

const TooltipComponent = ({ payload }) => {
  if (!payload || !payload[0]) return null;
  const rec = payload[0].payload;

  return (
    <Card
      size="small"
      title={moment(rec.created_at).format("DD.MM.YYYY HH:mm:ss")}
      headStyle={{ background: rec.color, color: "#fff" }}
    >
      <h4>{rec.name}</h4>
      <p>
        {i18n["form.orderDetails.amount"]}: {rec.amount}
      </p>
      <p>
        {i18n["form.orderDetails.total"]}: {rec.total || 0}$
      </p>
    </Card>
  );
};

export default ({ data }) => {
  return (
    <ResponsiveContainer>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="created_at"
          tickFormatter={(rec) => moment(rec).format("DD.MM.YYYY")}
        />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip content={TooltipComponent} />
        <Area
          type="monotone"
          dataKey="total"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
