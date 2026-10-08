import Link from "next/link";

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
      className="border border-line border-s-4 border-s-advisory bg-warm px-5 py-5 sm:px-7 sm:py-6"
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(17rem,0.75fr)] lg:items-center lg:gap-10">
        <div>
          <p className="text-xs font-extrabold tracking-[0.12em] text-advisory uppercase">
            {label}
          </p>
          <h2
            id="service-notice-heading"
            className="mt-2 text-xl font-bold tracking-[-0.025em] text-ink sm:text-2xl"
          >
            {title}
          </h2>
          <p className="mt-3 max-w-3xl leading-7 text-muted">{description}</p>
          <Link
            href={href}
            className="mt-4 inline-flex min-h-11 items-center gap-2 font-bold text-civic underline decoration-civic/35 underline-offset-4 hover:decoration-civic"
          >
            {linkLabel}
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <dl className="grid gap-4 border-t border-line pt-5 text-sm sm:grid-cols-2 lg:grid-cols-1 lg:border-t-0 lg:border-s lg:pt-0 lg:ps-8">
          {metadata.map((item) => (
            <div key={item.label}>
              <dt className="font-bold text-ink">{item.label}</dt>
              <dd className="mt-1 leading-6 text-muted">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
