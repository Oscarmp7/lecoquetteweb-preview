"use client";

type LeCoquetteWordmarkProps = {
  className?: string;
  tone?: "ink" | "warm";
  zoom?: number;
  adaptive?: boolean;
};

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const maskStyles = {
  WebkitMaskImage: `url('${BASE_PATH}/assets/branding/lecoquette-wordmark.png')`,
  maskImage: `url('${BASE_PATH}/assets/branding/lecoquette-wordmark.png')`,
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "50% 52.6%",
  maskPosition: "50% 52.6%",
  WebkitMaskSize: "contain",
  maskSize: "contain",
} as const;

export function LeCoquetteWordmark({
  className,
  tone = "ink",
  zoom = 3.84,
  adaptive = false,
}: LeCoquetteWordmarkProps) {
  const fillStyle =
    tone === "warm"
      ? {
          background: [
            "linear-gradient(180deg, rgba(255,232,218,0.92) 0%, rgba(246,154,119,0.98) 14%, rgba(235,109,73,0.98) 42%, rgba(208,83,47,0.99) 63%, rgba(150,48,27,1) 100%)",
            "radial-gradient(circle at 24% 18%, rgba(255,248,242,0.84) 0%, rgba(255,248,242,0.42) 10%, transparent 26%)",
            "radial-gradient(circle at 72% 78%, rgba(255,221,198,0.18) 0%, transparent 22%)",
            "linear-gradient(118deg, rgba(255,255,255,0.18) 0%, transparent 16%, rgba(128,39,20,0.16) 54%, transparent 82%)",
          ].join(", "),
        }
      : {
          background: "currentColor",
        };

  if (tone === "ink") {
    return (
      <span
        aria-hidden="true"
        className={className}
        style={{ position: "relative", display: "block", aspectRatio: "3310 / 670", overflow: "hidden" }}
      >
        <span
          className="absolute inset-0"
          style={{
            ...maskStyles,
            ...fillStyle,
            mixBlendMode: adaptive ? "difference" : undefined,
            transform: `scale(${zoom})`,
            transformOrigin: "center center",
          }}
        />
      </span>
    );
  }

  return (
    <span
      aria-hidden="true"
      className={className}
      style={{ position: "relative", display: "block", aspectRatio: "3310 / 670", overflow: "hidden" }}
    >
      <span
        className="absolute inset-0"
        style={{
          ...maskStyles,
          background: "rgba(108,41,21,0.08)",
          filter: "blur(2px)",
          transform: `translate(2px, 3px) scale(${zoom - 0.02})`,
          transformOrigin: "center center",
        }}
      />
      <span
        className="absolute inset-0"
        style={{
          ...maskStyles,
          background:
            "linear-gradient(180deg, rgba(178,72,42,0.96) 0%, rgba(130,42,22,0.96) 100%)",
          filter:
            "drop-shadow(0 1px 0 rgba(255,233,220,0.18)) drop-shadow(0 1px 2px rgba(93,31,14,0.08))",
          transform: `translate(0.5px, 0.5px) scale(${zoom - 0.02})`,
          transformOrigin: "center center",
        }}
      />
      <span
        className="absolute inset-0"
        style={{
          ...maskStyles,
          ...fillStyle,
          filter:
            "drop-shadow(-0.5px -0.5px 0 rgba(255,214,190,0.24)) drop-shadow(0 1px 1px rgba(255,245,236,0.14))",
          transform: `scale(${zoom})`,
          transformOrigin: "center center",
        }}
      />
    </span>
  );
}
