import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

const CobblerChart = ({ data }) => {

  const COLORS = [
    'rgba(153, 27, 27, 1)',
    'rgba(31, 41, 55, 1)',
    'rgba(55, 48, 163, 1)',
    'rgba(30, 64, 175, 1)',
    'rgba(6, 95, 70, 1)',
    'rgba(146, 64, 14, 1)',
    'rgba(157, 23, 77, 1)',
    'rgba(91, 33, 182, 1)'
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radiusMulti = window.innerWidth < 640 ? 0.5 : 1.1;
    const radius = innerRadius + (outerRadius - innerRadius) * radiusMulti;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    // TODO: if I could angle the text radially on mobile, that'd be cool
    return (
      <text x={x} y={y}
            fill="#abc"
            className="font-jose text-lg"
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central">
        {`${data[index].category}: ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width='100%' height={320}>
      <PieChart >
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={130}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

      </PieChart>
    </ResponsiveContainer>
  );
}
/*

*/
export default CobblerChart;
