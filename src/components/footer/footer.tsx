import dynamic from "next/dynamic";
import { env } from "../../env.mjs";

const Link = dynamic(() => import("next/link"));

export default function Footer() {
  return (
    <footer className="supports-backdrop-blur:bg-white/60 mt-5 backdrop-blur-sm">
      <div className="mx-5 mt-auto flex items-center justify-center">
        <div className="container">
          <div className="divider" />
          <div className="mb-4 mt-2 flex flex-col items-center justify-between space-y-2 sm:flex-row sm:space-y-0">
            <span className="text-sm ">
              {" "}
              © 2023 {env.NEXT_PUBLIC_PERSON_NAME}
            </span>
            <ul className="flex flex-wrap space-x-4 text-sm ">
              <li>
                <Link href="/about" className="link-hover link">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="link-hover link">
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
