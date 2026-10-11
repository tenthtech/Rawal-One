import Link from "next/link";

import { CivicIcon } from "@/components/civic-icon";

type NoticeMetadata = {
  label: string;
  value: string;
};

type ServiceNoticeProps = {
  label: string;
  title: string;
  description: string;
  metadata: readonly NoticeMetadata[];
  href: string;
  linkLabel: string;
};

export function ServiceNotice({
  label,
  title,
  description,
  metadata,
  href,
  linkLabel,
}: ServiceNoticeProps) {
  return (
    <section
      aria-labelledby="service-notice-heading"
      className="service-advisory"
    >
      <div className="service-advisory-layout">
        <div className="flex items-start gap-4">
          <span className="hidden h-11 w-11 shrink-0 items-center justify-center bg-warm text-advisory sm:flex">
            <CivicIcon name="water" className="h-6 w-6" />
          </span>
          <div>
            <p className="flex items-center gap-2 text-[0.6875rem] font-semibold tracking-[0.1em] text-advisory uppercase">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-advisory"
              />
              {label}
            </p>
            <h3
              id="service-notice-heading"
              className="mt-2 text-lg font-semibold leading-6 tracking-[-0.025em] text-ink sm:text-xl"
            >
              {title}
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
              {description}
            </p>
            <Link href={href} className="civic-link mt-1">
              {linkLabel}
              <CivicIcon name="arrow" />
            </Link>
          </div>
        </div>

        <dl className="service-advisory-metadata">
          {metadata.map((item) => (
            <div key={item.label}>
              <dt className="font-medium text-muted">{item.label}</dt>
              <dd className="mt-2 font-semibold leading-5 text-ink">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
