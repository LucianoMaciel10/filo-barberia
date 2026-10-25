function StatCard({ label, value, detail, compact = false }) {
  return (
    <div className="flex flex-col rounded-brand border border-borde bg-white p-5 shadow-sm">
      <dt className="text-xs text-charcoal/60">{label}</dt>
      <dd className="mt-auto pt-4">
        <span
          className={`block font-heading leading-tight ${compact ? "text-3xl" : "text-5xl"}`}
        >
          {value}
        </span>
        <span className="mt-1 block text-xs text-charcoal/60">{detail}</span>
      </dd>
    </div>
  );
}

export default StatCard;
