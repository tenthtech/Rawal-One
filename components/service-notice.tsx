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
      className="border border-line bg-surface px-5 py-5 shadow-[0_3px_16px_#173d2c05] sm:px-7 sm:py-6"
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.6fr)_minmax(16rem,0.8fr)] lg:items-center lg:gap-10">
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
            <h2
              id="service-notice-heading"
              className="mt-2 text-lg font-semibold leading-6 tracking-[-0.025em] text-ink sm:text-xl"
            >
              {title}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
              {description}
            </p>
            <Link href={href} className="civic-link mt-1">
              {linkLabel}
              <CivicIcon name="arrow" />
            </Link>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-4 border-t border-line pt-4 text-xs lg:border-t-0 lg:border-s lg:py-2 lg:ps-8">
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
