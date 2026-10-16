import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-head">
      <div className="container">
        <h1 className="section-title">Page not found</h1>
        <p className="section-copy">That route is not part of this portfolio.</p>
        <Link className="btn btn-primary" href="/">
          Back home
        </Link>
      </div>
    </main>
  );
}
