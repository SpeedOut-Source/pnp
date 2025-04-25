import dynamic from "next/dynamic";
import GradientEffectBottom from "../gradient_effect/bottom";
import { env } from "~/env.mjs";

const Link = dynamic(() => import("next/link"));

export default function Footer() {
  return (
    <footer>
      <div className="mt-5 backdrop-blur-xs supports-backdrop-blur:bg-white/60">
        <div className="mx-5 mt-auto flex items-center justify-center">
          <div className="container">
            <div className="divider" />
            <div className="mt-2 mb-4 flex flex-col items-center justify-between space-y-2 sm:flex-row sm:space-y-0">
              <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-0">
                <span className="text-sm">
                  © 2025 {env.NEXT_PUBLIC_PERSON_NAME}
                </span>
                <span className="mx-2 hidden sm:block">|</span>
                <span className="text-sm">Made in Bangladesh</span>
              </div>
              <ul className="flex flex-wrap space-x-4 text-sm">
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
      </div>
      <GradientEffectBottom />
    </footer>
  );
}
