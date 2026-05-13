export function TrustBadges() {
  return (
    <div className="flex flex-wrap items-center gap-10 pt-8 border-t border-outline-variant">
      <Badge icon={<VerifiedIcon />}>OEKO-TEX Certified</Badge>
      <Badge icon={<SyncIcon />}>Free Returns</Badge>
      <Badge icon={<PaymentsIcon />}>M-Pesa Accepted</Badge>
    </div>
  );
}

function Badge({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-stack-sm text-on-surface-variant">
      <span aria-hidden>{icon}</span>
      <span className="font-label-caps text-[10px] tracking-wider">
        {children}
      </span>
    </div>
  );
}

function VerifiedIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2 14.5 4.5 18 4l1 3.5L22 9l-1 3.5L22 16l-3 1-1 3.5L14.5 19 12 22 9.5 19 6 20l-1-3.5L2 16l1-3.5L2 9l3-1 1-3.5L9.5 4.5 12 2Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function SyncIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 12a9 9 0 0 1-15.5 6.3M3 12a9 9 0 0 1 15.5-6.3" />
      <path d="M21 4v5h-5M3 20v-5h5" />
    </svg>
  );
}

function PaymentsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="6" width="20" height="13" />
      <path d="M2 10h20M6 15h4" />
    </svg>
  );
}
