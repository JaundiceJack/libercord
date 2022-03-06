import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CustomLineChart = ({ data }) => {

  const CustomizedYAxisTick = props => {
    const { x, y, stroke, payload } = props;
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={-15} dy={16} textAnchor="end" fill="#a74">
          ${payload.value.toFixed(2)}
        </text>
      </g>
    );
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length === 3) {
      return (
        <div className="bg-gray-200 rounded-lg p-4 opacity-90">
          <p className='text-center font-semibold font-jose'>
            {`${payload[0].payload.name}`}
          </p>
          <div className="flex flex-row">
            <p className="font-semibold font-jose mr-2">{`${payload[0].name}: `} </p>
            <p className="font-jose">{`$${payload[0].value.toFixed(2)}`} </p>
          </div>
          <div className="flex flex-row">
            <p className="font-semibold font-jose mr-2">{`${payload[1].name}: `} </p>
            <p className="font-jose">{`$${payload[1].value.toFixed(2)}`} </p>
          </div>
          <div className="flex flex-row">
            <p className="font-semibold font-jose mr-2">{`${payload[2].name}: `} </p>
            <p className="font-jose">{`$${payload[2].value.toFixed(2)}`} </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis tick={<CustomizedYAxisTick />} />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line type="monotone" dataKey="Income" stroke="#4d6" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="Expenses" stroke="#e44" />
        <Line type="monotone" dataKey="Saved" stroke="#de6" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default CustomLineChart;
