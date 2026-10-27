import { formatFullDate } from "../../utils/format";

function PageHeader({ section, title, subtitle, children }) {
  return (
    <>
      <p className="text-xs text-charcoal/60">
        Filo Barbería / {section} · {formatFullDate(new Date())}
      </p>

      <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:justify-between">
        <div>
          <h1 className="text-[32px] leading-tight md:text-[40px]">{title}</h1>
          <p className="mt-1 text-sm text-charcoal/60">{subtitle}</p>
        </div>
        {children}
      </div>
    </>
  );
}

export default PageHeader;
