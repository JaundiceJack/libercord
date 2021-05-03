import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
/*
const data = [
  { month: 'Jan',  savings: 4000, expenses: 2400, income: 2400 },
  { month: 'Feb',  savings: 3000, expenses: 1398, income: 2210 },
  { month: 'Mar',  savings: 2000, expenses: 9800, income: 2290 },
  { month: 'Apr',  savings: 2780, expenses: 3908, income: 2000 },
  { month: 'May',  savings: 1890, expenses: 4800, income: 2181 },
  { month: 'June', savings: 2390, expenses: 3800, income: 2500 },
  { month: 'July', savings: 3490, expenses: 4300, income: 2100 },
  { month: 'Aug',  savings: 3490, expenses: 4300, income: 2100 },
  { month: 'Sept', savings: 3490, expenses: 4300, income: 2100 },
  { month: 'Oct',  savings: 3490, expenses: 4300, income: 2100 },
  { month: 'Nov',  savings: 3490, expenses: 4300, income: 2100 },
  { month: 'Dec',  savings: 3490, expenses: 4300, income: 2100 },
];
*/
const SavingsChart = ({data}) => {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >

        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="savings"  stroke="#d50" />
        <Line type="monotone" dataKey="expenses" stroke="#d33" />
        <Line type="monotone" dataKey="income"   stroke="#5d5" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default SavingsChart;
