import Link from "next/link";
import packageJson from "../../../package.json";

export default function Footer() {
  return (
    <footer className="z-50">
      <div className="mx-5 mt-auto flex items-center justify-center">
        <div className="container">
          <div className="divider" />
          <div className="mb-4 mt-2 flex flex-col items-center justify-between space-y-2 sm:flex-row sm:space-y-0">
            <span className="text-sm "> © 2023 {packageJson.personName}</span>
            <ul className="flex flex-wrap space-x-4 text-sm ">
              <li>
                <Link href="/about" className="link-hover link">
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:biplobsd11@gmail.com"
                  className="link-hover link"
                >
                  Contact me
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="link-hover link">
                  Privacy policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
