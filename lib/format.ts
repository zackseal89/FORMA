const ksh = new Intl.NumberFormat("en-KE", {
  style: "currency",
  currency: "KES",
  currencyDisplay: "code",
  maximumFractionDigits: 0,
});

export function formatKsh(amount: number): string {
  // Replace ISO "KES" with the in-market shorthand "KSh" used in the design.
  return ksh.format(amount).replace("KES", "KSh");
}
