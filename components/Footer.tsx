import Link from "next/link";
import { SITE } from "@/data/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>
          © {new Date().getFullYear()} {SITE.name}
        </p>
        <div>
          <Link href="/projects">Projects</Link>
          <a href={SITE.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
