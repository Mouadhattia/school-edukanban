"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export function StudentComparisonChart() {
  // Sample data for the student comparison chart
  const data = [
    {
      name: "Assignments",
      "Class Average": 75,
      "Alex J.": 85,
      "Jamie S.": 92,
      "Taylor B.": 65,
      "Morgan L.": 78,
      "Casey W.": 45,
    },
    {
      name: "Quizzes",
      "Class Average": 72,
      "Alex J.": 80,
      "Jamie S.": 88,
      "Taylor B.": 70,
      "Morgan L.": 75,
      "Casey W.": 55,
    },
    {
      name: "Labs",
      "Class Average": 78,
      "Alex J.": 82,
      "Jamie S.": 90,
      "Taylor B.": 75,
      "Morgan L.": 85,
      "Casey W.": 60,
    },
    {
      name: "Participation",
      "Class Average": 80,
      "Alex J.": 75,
      "Jamie S.": 95,
      "Taylor B.": 85,
      "Morgan L.": 80,
      "Casey W.": 70,
    },
  ]

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Class Average" fill="#8884d8" />
          <Bar dataKey="Alex J." fill="#82ca9d" />
          <Bar dataKey="Jamie S." fill="#ffc658" />
          <Bar dataKey="Taylor B." fill="#ff8042" />
          <Bar dataKey="Morgan L." fill="#0088fe" />
          <Bar dataKey="Casey W." fill="#00C49F" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
