import { cn } from "@/lib/utils";
import { CoverBackdrop } from "@/components/ui/cover-backdrop";

type SectionProps = React.ComponentProps<"section"> & {
  /** Full-bleed site cover image behind section content */
  coverBackground?: boolean;
  coverScrim?: React.ComponentProps<typeof CoverBackdrop>["scrim"];
};

export function Section({
  className,
  coverBackground,
  coverScrim = "section",
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "py-16 sm:py-20 lg:py-24",
        coverBackground && "relative isolate overflow-hidden",
        className,
      )}
      {...props}
    >
      {coverBackground ? (
        <>
          <CoverBackdrop scrim={coverScrim} />
          <div className="relative z-10">{children}</div>
        </>
      ) : (
        children
      )}
    </section>
  );
}
