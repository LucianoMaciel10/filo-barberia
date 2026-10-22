function DetailList({ rows, className = "", valueClassName = "font-medium" }) {
  return (
    <dl className={`space-y-4 text-sm ${className}`}>
      {rows.map(([label, value]) => (
        <div key={label} className="flex gap-2">
          <dt className="text-charcoal/60">{label}</dt>
          <dd className="flex gap-2">
            <span aria-hidden="true" className="text-charcoal/40">
              ·
            </span>
            <span className={valueClassName}>{value}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default DetailList;
