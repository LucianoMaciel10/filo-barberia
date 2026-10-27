import { useId } from "react";
import { ChevronDown } from "lucide-react";

function Select({ label, options, className = "", ...props }) {
  const id = useId();

  return (
    <div className={className}>
      <label htmlFor={id} className="text-xs font-semibold">
        {label}
      </label>

      <div className="relative mt-2">
        <select
          id={id}
          className="h-12 w-full cursor-pointer appearance-none rounded-brand border border-borde bg-white pl-4 pr-10 text-sm"
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

export default Select;
