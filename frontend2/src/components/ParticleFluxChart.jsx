import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const generateParticleFluxData = () => {
  const data = [];
  const now = new Date();
  for (let i = 0; i < 48; i++) {
    const time = new Date(now.getTime() - (47 - i) * 30 * 60 * 1000);
    let value = 2000 + (Math.random() - 0.5) * 800;

    if (Math.random() < 0.05) {
      value += Math.random() * 4000;
    }

    const hour = time.getHours();
    if (hour >= 10 && hour <= 14) {
      value += Math.sin(((hour - 10) / 4) * Math.PI) * 1500;
    }

    value = Math.max(500, value); 

    data.push({
      time: time.toISOString(),
      value: Math.round(value)
    });
  }
  return data;
};

export default function ParticleFluxChart() {
  const data = generateParticleFluxData();

  const formatTime = (tick) =>
    new Date(tick).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });

  const formatTooltipLabel = (label) =>
    new Date(label).toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });

  return (
    <div className="w-full h-[320px] p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-2 text-gray-700">Data (last 24 hrs)</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            tickFormatter={formatTime}
            stroke="#4b5563"
            fontSize={12}
          />
          <YAxis
            tickFormatter={(v) => `${(v / 1000).toFixed(1)}K`}
            stroke="#4b5563"
            fontSize={12}
          />
          <Tooltip
            labelFormatter={formatTooltipLabel}
            formatter={(value) => [value.toLocaleString(), 'Particles']}
            contentStyle={{
              backgroundColor: '#f9fafb',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '12px'
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            activeDot={{
              r: 5,
              fill: '#3b82f6',
              stroke: '#ffffff',
              strokeWidth: 2
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
