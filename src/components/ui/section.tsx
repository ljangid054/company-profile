import { cn } from "@/lib/utils";
import { CoverBackdrop } from "@/components/ui/cover-backdrop";

type SectionProps = React.ComponentProps<"section"> & {
  coverBackground?: boolean;
  coverScrim?: React.ComponentProps<typeof CoverBackdrop>["scrim"];
  tone?: "default" | "cream" | "light";
};

export function Section({
  className,
  coverBackground,
  coverScrim = "section",
  tone = "default",
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "py-16 sm:py-20 lg:py-24",
        (tone === "cream" || tone === "light") && "section-light",
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
