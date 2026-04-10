export function getBookingLink(source: string) {
  const base = "https://wa.me/17865998161";
  const message = encodeURIComponent(
    `Hi Le Coquette, I'd like to reserve an appointment. Source: ${source}`
  );

  return `${base}?text=${message}`;
}
