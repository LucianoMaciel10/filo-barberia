function Tabs({ tabs, value, onChange, label }) {
  const handleKeyDown = (event) => {
    const index = tabs.findIndex((tab) => tab.id === value);
    let next;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft")
      next = (index - 1 + tabs.length) % tabs.length;
    else return;

    event.preventDefault();
    onChange(tabs[next].id);
    document.getElementById(`tab-${tabs[next].id}`)?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label={label}
      onKeyDown={handleKeyDown}
      className="flex gap-6 border-b border-borde"
    >
      {tabs.map((tab) => {
        const selected = tab.id === value;
        return (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls="tab-panel"
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(tab.id)}
            className={`-mb-px cursor-pointer border-b-2 px-1 pb-3 text-sm transition-colors ${
              selected
                ? "border-dorado font-semibold"
                : "border-transparent text-charcoal/60 hover:text-charcoal"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export default Tabs;
