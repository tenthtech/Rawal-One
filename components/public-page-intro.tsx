import type { ReactNode } from "react";

type PublicPageIntroProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: ReactNode;
  children?: ReactNode;
};

export function PublicPageIntro({
  id,
  eyebrow,
  title,
  description,
  children,
}: PublicPageIntroProps) {
  return (
    <section aria-labelledby={id} className="public-page-intro">
      <div className="civic-container">
        <div className={children ? "public-intro-grid" : "max-w-4xl"}>
          <div className="min-w-0">
            <p className="civic-eyebrow">{eyebrow}</p>
            <h1 id={id} className="civic-page-title mt-5">
              {title}
            </h1>
            <div className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
              {description}
            </div>
          </div>
          {children ? <div className="min-w-0 lg:pt-4">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
