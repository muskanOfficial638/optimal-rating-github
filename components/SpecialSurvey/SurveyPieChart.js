import React, { forwardRef, useEffect, useCallback } from "react";
import { PieChart, Pie, ResponsiveContainer, Tooltip, Cell } from "recharts";
import { postData } from "../../store/requests/global";
import { ApiUrl } from "../../config";
import domtoimage from "dom-to-image";

// Render customized label for PieChart
const renderCustomizedLabel = ({ percent, name }) => {
  return `${name} (${(percent * 100).toFixed(2)}%)`;
};

const PieCharts = forwardRef(({ data, chartImageName }, ref) => {
  // Use a callback to avoid ESLint warnings for missing dependencies
  const handlePieDownload = useCallback(() => {
    if (chartImageName) {
      domtoimage
        .toPng(document.getElementById(`pieChartId-${chartImageName}`))
        .then((png) => {
          if (png) {
            postData({
              url: `${ApiUrl}survey-image-upload`,
              data: { base64_image: png, name: chartImageName },
            });
          }
        })
        .catch((err) => console.error("Image generation failed:", err));
    }
  }, [chartImageName]);

  // Trigger image generation on mount
  useEffect(() => {
    handlePieDownload();
  }, [handlePieDownload]);

  return (
    <div style={{ width: "100%", height: 360 }} id={`pieChartId-${chartImageName}`}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            labelLine={false}
            label={renderCustomizedLabel}
            dataKey="percent"
            nameKey="choice_title"
            data={data.map((x) => ({ ...x, percent: x.percent / 100 }))} // Ensure percent is in 0-1 range
          >
            {data.map((item, index) => (
              <Cell key={`cell-${index}`} fill={item.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value * 100}%`} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
});

PieCharts.displayName = "PieCharts";
export default PieCharts;

