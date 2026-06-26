import { useState, useEffect } from "react"
import ReactApexChart from "react-apexcharts"
import type { ApexOptions } from "apexcharts"

export function MessagesPerMonthChart({ data }: {
  data: { months: string[]; you: number[]; other: number[] }
}) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true); return () => setMounted(false) }, [])

  const options: ApexOptions = {
    chart: {
      type: "line",
      background: "transparent",
      toolbar: { show: false },
      fontFamily: "'Inter', sans-serif",
      animations: { enabled: true, speed: 600 },
    },
    theme: { mode: "dark" },
    colors: ["#adc6ff", "#ddb7ff"],
    dataLabels: { enabled: false },
    stroke: { width: 2, curve: "straight" },
    markers: {
      size: 4,
      shape: "square",
      strokeColors: ["#adc6ff", "#ddb7ff"],
      strokeWidth: 0,
    },
    grid: {
      borderColor: "#424754",
      strokeDashArray: 0,
      row: { colors: undefined },
    },
    xaxis: {
      categories: data.months,
      labels: { style: { colors: "#8c909f", fontSize: "11px" } },
      axisBorder: { color: "#424754" },
      axisTicks: { color: "#424754" },
    },
    yaxis: {
      labels: {
        style: { colors: "#8c909f", fontSize: "11px" },
        formatter: (v) => String(Math.round(v)),
      },
      min: 0,
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      fontSize: "12px",
      fontFamily: "'Inter', sans-serif",
      labels: { colors: "#c2c6d6" },
      markers: { size: 5, shape: "square" },
    },
    tooltip: {
      theme: "dark",
      y: { formatter: (v) => `${v} messages` },
    },
  }

  if (!mounted) {
    return (
      <div className="w-full h-[300px] flex items-center justify-center text-[var(--on-surface-variant)] text-sm">
        Loading chart…
      </div>
    )
  }

  return (
    <div className="w-full h-[300px]">
      <ReactApexChart
        options={options}
        series={[{ name: "You", data: data.you }, { name: "Other", data: data.other }]}
        type="line"
        height="100%"
        width="100%"
      />
    </div>
  )
}
