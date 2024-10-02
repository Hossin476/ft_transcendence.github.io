import {BarChart,Bar,ResponsiveContainer,CartesianGrid,XAxis,YAxis,Tooltip,Legend} from 'recharts'


const data = [
    {
      name: 'January',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'February',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'April',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'May',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'June',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'July',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'August',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
      name: 'September',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
      name: 'October',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
      name: 'November',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
      name: 'December',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

export default function PlayerCharts() {
    return (
        <div className="block w-full mb-4 md:mt-4 h-[30%] bg-secondaryColor rounded">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                width={500}
                height={500}
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="2 2" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" stackId="b" fill="#3F2D44" />
                <Bar dataKey="uv" stackId="b" fill="#C77DFF" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}