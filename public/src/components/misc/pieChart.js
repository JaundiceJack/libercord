import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { truncateString } from '../../functions/strings.js';

const CustomPieChart = ({ data, label="source", total="5" }) => {
  const COLORS = [
    'rgb(200 150 100)',
    'rgb(220 38 38)',
    'rgb(202 138 4)',
    'rgb(22 163 74)',
    'rgb(37 99 235)' ];

  // Place labels in the pie sections
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = (props) => {
    const { cx, cy,
      midAngle, innerRadius, outerRadius, index } = props;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <g>
        <text x={x} y={y} dy={8} textAnchor={x > cx ? 'start' : 'end'}
          fill="#FFF" dominantBaseline="central">
          {truncateString(data[index][label], 7)}
        </text>
        <text x={cx} y={cy-10} dy={8} textAnchor="middle"
          fill="#FFF" >
          Total:
        </text>
        <text x={cx} y={cy+10} dy={8} textAnchor="middle"
          fill="#FFF" >
          ${total.toFixed(2)}
        </text>
      </g>
    );
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-200 rounded-lg p-4 opacity-90">
          <p className="font-semibold">
            {`${payload[0].name} : $${payload[0].value.toFixed(2)}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <PieChart width={315} height={275}>
      <Pie data={data}
        innerRadius={70}
        outerRadius={100}
        paddingAngle={5}
        dataKey="value"
        labelLine={false}
        label={renderCustomizedLabel}
        fill="green" >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip content={<CustomTooltip />} />
    </PieChart>
  )
}

export default CustomPieChart;
