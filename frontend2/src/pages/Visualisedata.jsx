import React, { useState } from "react";
import Formparameter from "../components/Formparameter";
import ParticleFluxChart from "../components/ParticleFluxChart";
import { Activity, Flame, Gauge, Zap } from "lucide-react";
import { MetricCard } from "../components/Metriccard";

const metrics = [
  {
    title: "Density",
    value: "12.4",
    unit: "cm⁻³",
    color: "cyan",
    icon: Gauge,
  },
  {
    title: "Temperature",
    value: "1.5M",
    unit: "K",
    color: "orange",
    icon: Flame,
  },
  {
    title: "Speed",
    value: "550",
    unit: "km/s",
    color: "red",
    icon: Zap,
  },
  {
    title: "Energy Flux",
    value: "2.8",
    unit: "keV",
    color: "purple",
    icon: Activity,
  },
];

const Graph = ({ parameter }) => {
  const chartMap = {
    "Differentiated Flux": <ParticleFluxChart />,
    "Integrated Flux": <ParticleFluxChart />,
    "Proton Temperature": <ParticleFluxChart />,
    AHe: <ParticleFluxChart />,
    Velocity: <ParticleFluxChart />,
    "Ion Density": <ParticleFluxChart />,
    "Proton Density": <ParticleFluxChart />,
    "Alpha Density": <ParticleFluxChart />,
    "Thermal Speed": <ParticleFluxChart />,
  };
  return chartMap[parameter] || <div>No chart available for {parameter}</div>;
};

const Visualisedata = () => {
  const [formData, setFormData] = useState({
    parameter: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };
  return (
   <div className="p-4">
  <div className="max-w-7xl mx-auto">
    <Formparameter
      handleSubmit={handleSubmit}
      formData={formData}
      setFormData={setFormData}
    />
  </div>

  <div className="max-w-7xl mx-auto mt-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <MetricCard
          key={index}
          title={metric.title}
          value={metric.value}
          unit={metric.unit}
          color={metric.color}
          icon={metric.icon}
        />
      ))}
    </div>
  </div>

  <div className="max-w-7xl mx-auto mt-6">
    <Graph parameter={formData.parameter} />
  </div>
</div>

  );
};

export default Visualisedata;
