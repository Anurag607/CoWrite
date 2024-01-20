import Link from "next/link";
import { ErrorBoundary } from "react-error-boundary";

export default function ErrorBoundaryWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
  );
}

function ErrorFallback() {
  return (
    <div className="my-10 min-h-[60vh] flex flex-col justify-center items-center  lg:mx-28">
      <main className="grid min-h-full place-items-center bg-white py-24 px-6 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-primary">OOPS</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
            Something went wrong
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            {"We're sorry, but something went wrong. Please try again later."}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/"
              rel="nofollow noreferrer"
              className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Go back home
            </Link>
            <a
              href="mailto:wecare@wiser.eco"
              rel="nofollow noreferrer"
              className="text-sm font-semibold text-gray-900 hover:text-primary duration-200"
            >
              Contact support <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
