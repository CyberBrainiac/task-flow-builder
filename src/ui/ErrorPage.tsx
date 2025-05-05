import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error = useRouteError() as any;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="mb-4 text-2xl font-bold">Oops!</h1>
      <p className="mb-2">Sorry, an unexpected error has occurred.</p>
      <p className="text-gray-500">{error.statusText || error.message}</p>
      <div className="mt-4">
        <Link
          to="/"
          className="block rounded-md border-2 border-gray-200 p-2 pb-2.5 text-2xl text-blue-500 transition duration-300 ease-in-out hover:bg-sky-200 hover:text-black"
        >
          Go to the Home page
        </Link>
      </div>
    </div>
  );
}
