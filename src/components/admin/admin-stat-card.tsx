import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type AdminStatCardProps = {
  label: string;
  value: string | number;
  hint?: string;
  icon: LucideIcon;
  trend?: string;
  className?: string;
};

export function AdminStatCard({
  label,
  value,
  hint,
  icon: Icon,
  trend,
  className,
}: AdminStatCardProps) {
  return (
    <div className={cn("admin-stat-card", className)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
            {label}
          </p>
          <p className="admin-heading mt-2 text-3xl font-semibold tracking-tight text-foreground">
            {value}
          </p>
          {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
          {trend ? (
            <p className="mt-2 text-xs font-medium text-[var(--drinkify-gold)]">{trend}</p>
          ) : null}
        </div>
        <div className="admin-icon-chip size-11">
          <Icon className="size-5" />
        </div>
      </div>
    </div>
  );
}
