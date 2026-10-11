import Link from "next/link";

type AdminRecordLoadErrorProps = {
  heading: string;
  message: string;
  returnHref: string;
  returnLabel: string;
};

export function AdminRecordLoadError({
  heading,
  message,
  returnHref,
  returnLabel,
}: AdminRecordLoadErrorProps) {
  return (
    <div className="px-5 py-10 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-4xl border-s-4 border-emergency bg-surface px-5 py-5">
        <h1 className="text-2xl font-bold text-ink">{heading}</h1>
        <p className="mt-2 max-w-3xl leading-7 text-muted">{message}</p>
        <Link
          href={returnHref}
          className="mt-4 inline-flex min-h-11 items-center font-bold text-civic underline decoration-civic/35 underline-offset-4"
        >
          {returnLabel}
        </Link>
      </div>
    </div>
  );
}
