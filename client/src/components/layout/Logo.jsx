import { Scissors } from "lucide-react";

function Logo() {
  return (
    <span className="flex items-center gap-2">
      <Scissors className="size-6 -rotate-90 text-dorado" aria-hidden="true" />
      <span className="font-heading text-4xl leading-none">
        filo
        <span className="-mt-1 block font-sans text-[10px] font-semibold uppercase tracking-wider">
          Barbería
        </span>
      </span>
    </span>
  );
}

export default Logo;
