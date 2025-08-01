"use client";

import React, { useState } from "react";
import { delay } from "./app/helper";
import BugAntIcon from "@heroicons/react/24/solid/BugAntIcon";
import { type SAPageProps } from "./app/interfaces";
import dynamic from "next/dynamic";

const Link = dynamic(() => import("next/link"));
const Image = dynamic(() => import("next/legacy/image"));
const DevPlate = dynamic(() => import("./Dev_plate"));

const SAPage = (props: SAPageProps) => {
  const [mainDev, setMainDev] = useState(false);
  const [clIsOpen, setCLIsopen] = useState(false);
  let tap = 0;

  async function tapToOpen() {
    if (tap >= 5 && !mainDev) {
      setMainDev(true);
      await delay(5000);
      tap = 0;
      setMainDev(false);
    }
    tap++;
  }

  return (
    <div className="mx-2 mt-2 flex flex-col items-center tracking-wider sm:mx-5 lg:mx-10 xl:mx-10">
      <div className="btn btn-ghost ring-base-300 relative h-32 w-32 overflow-hidden rounded-full ring-4">
        <Image
          onClick={tapToOpen}
          objectFit="cover"
          layout="fill"
          src={props.app.logo.logoUrl}
          alt={props.app.logo.alt}
        />
      </div>

      <div className="text-3xl font-semibold">{props.app.title}</div>
      <p
        onClick={() => setCLIsopen(!clIsOpen)}
        className={`${
          clIsOpen ? "font-bold tracking-[0.5em]" : ""
        } mt-1 mb-4 flex cursor-pointer space-x-2 text-center text-xs tracking-wider transition-all duration-700 hover:tracking-widest hover:text-black`}
      >
        <span className="font-semibold">{props.app.codeName}</span>
        <span>v{props.app.version}</span>
      </p>
      <div
        className={`collapse -mt-1 ${
          clIsOpen ? "collapse-open" : ""
        } w-full max-w-xl`}
      >
        <div className="collapse-content w-full max-w-xl">
          <div className="scrollbar-style max-h-96 overflow-y-auto">
            <div className="mx-2 mt-2 mb-3 flex flex-col justify-center rounded-xl ring-2 ring-blue-500/10">
              {Object.keys(props.changeLogs)
                .slice(0, 20)
                .map((x) => (
                  <div
                    key={x}
                    className="bg-base-300/10 mx-3 my-2 h-fit rounded-xl p-3 ring-1 ring-blue-300/40 hover:bg-blue-200/10"
                  >
                    <div className="text-sm font-semibold tracking-wider">
                      v{x}
                    </div>
                    <div className="text-xs opacity-70">
                      {new Date(props.changeLogs[x]!.date).toUTCString()}
                    </div>
                    <div className="divider my-1 py-1" />
                    <ul className="ml-4 list-disc text-sm opacity-80">
                      {props.changeLogs[x]!.changes.map((c) => (
                        <li key={c} className="hover:list-decimal">
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <Link
        href={props.poweredBy.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="text-sm transition-all duration-700 hover:tracking-widest hover:text-black">
          Powered by {props.poweredBy.companyName}
        </div>
      </Link>
      <Link
        href={props.devCompany.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="mt-3 text-xs transition-all duration-700 hover:tracking-widest hover:text-black">
          Developed by {props.devCompany.name}, {props.devCompany.year}
        </div>
      </Link>
      <div className="my-5 w-full px-5">
        <hr className="flex border-1 border-black/10" />
      </div>
      <div
        className={`${
          mainDev ? "collapse-open" : "collapse-close"
        } collapse w-full`}
      >
        <div className="collapse-content w-full">
          <div className="flex w-full justify-start px-5 text-2xl">
            Developer info
          </div>
          {props.devs.map((i) => (
            <DevPlate
              key={i.imgUrl}
              name={i.name}
              role={i.role}
              url={i.url}
              imgUrl={i.imgUrl}
            />
          ))}
        </div>
      </div>
      <div className="mt-5 mb-2 flex w-full justify-start px-5 text-2xl">
        Issue or Bug report
      </div>
      <Link
        className="w-full"
        href={props.reportUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="p-card h-fit w-full cursor-pointer">
          <div className="flex w-full items-center py-2 text-left">
            <div className="h-16 w-16">
              <BugAntIcon />
            </div>
            <div className="ml-3">
              <div className="text-lg font-semibold">
                Report on Github issue tab
              </div>
              <div className="text-sm">
                Before reporting any issue or bug report please add proper
                description and screenshots to help fix the problem.
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SAPage;
