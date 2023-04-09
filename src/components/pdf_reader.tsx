import { SpecialZoomLevel, Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

import AbsoluteLoading from "./markdown/absolute_loading";
import { useState } from "react";
import { delay } from "./sapage/src/components/app/helper";
import ExclamationCircleIcon from "@heroicons/react/24/outline/ExclamationCircleIcon";

export default function PdfReader({ resumeUrl }: { resumeUrl: string }) {
  const [zoomCount, setZoomCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const m = async () => {
    let current: number = zoomCount;
    for (let index = 0; index < 30; index++) {
      await delay(500 * 5);
      if (zoomCount == current) {
        setIsLoading(false);
        break;
      }
      current = zoomCount;
    }
    setIsLoading(false);
  };

  return (
    <div className="relative">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.5.141/build/pdf.worker.min.js">
        {isLoading && <AbsoluteLoading />}
        <div className={`container mx-auto h-full max-w-3xl text-gray-900`}>
          <div
            className={`${
              isLoading ? "invisible" : "visible"
            } overflow-hidden rounded-md`}
          >
            <Viewer
              onZoom={(e) => {
                setZoomCount(e.scale);
              }}
              onDocumentLoad={() => {
                void m();
              }}
              renderError={() => {
                setIsLoading(false);
                return (
                  <div className="flex w-full justify-center">
                    <div className="p-card gap-2 text-base-content">
                      <ExclamationCircleIcon className="h-5 w-5" />
                      Error: Unable to view PDF resume. Please download.
                    </div>
                  </div>
                );
              }}
              defaultScale={SpecialZoomLevel.PageFit}
              theme={"dark"}
              fileUrl={resumeUrl}
            />
          </div>
        </div>
      </Worker>
    </div>
  );
}
