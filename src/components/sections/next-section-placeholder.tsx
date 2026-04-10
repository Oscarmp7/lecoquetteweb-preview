export function NextSectionPlaceholder() {
  return (
    <section
      className="relative min-h-screen bg-[oklch(0.985_0.010_55)]"
      style={{ zIndex: 10 }}
    >
      <div className="mx-auto max-w-7xl px-4 py-32 md:px-6">
        <p className="font-display text-4xl" style={{ color: "oklch(0.269 0.010 303.8 / 0.4)" }}>
          Next section coming soon
        </p>
      </div>
    </section>
  );
}
