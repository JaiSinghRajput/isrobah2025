export const MetricCard = ({ title, value, unit, color, icon: Icon }) => {
  const colorStyles = {
    cyan: {
      text: "text-cyan-600",
      ring: "ring-cyan-200",
      bg: "bg-gradient-to-tr from-cyan-50 to-white",
    },
    purple: {
      text: "text-purple-600",
      ring: "ring-purple-200",
      bg: "bg-gradient-to-tr from-purple-50 to-white",
    },
    orange: {
      text: "text-orange-600",
      ring: "ring-orange-200",
      bg: "bg-gradient-to-tr from-orange-50 to-white",
    },
    red: {
      text: "text-red-600",
      ring: "ring-red-200",
      bg: "bg-gradient-to-tr from-red-50 to-white",
    },
  };

  const styles = colorStyles[color] || {
    text: "text-gray-700",
    ring: "ring-gray-200",
    bg: "bg-white",
  };

  return (
    <div
      className={`
        ${styles.bg} rounded-xl p-5 shadow-md
        border border-white ring-1 ${styles.ring}
        transition-all duration-200 ease-in-out
        hover:shadow-lg hover:scale-[1.015]
        backdrop-blur-sm
      `}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        {Icon && <Icon className={`w-6 h-6 ${styles.text}`} />}
      </div>
      <div>
        <div className={`text-3xl font-bold ${styles.text}`}>{value}</div>
        <div className="text-sm text-gray-400">{unit}</div>
      </div>
    </div>
  );
};
