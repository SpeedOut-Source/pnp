import {
  type Plugin,
  SpecialZoomLevel,
  Viewer,
  Worker,
} from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

import AbsoluteLoading from "./markdown/absolute_loading";
import { useState } from "react";
import { delay } from "./sapage/src/components/app/helper";
import ExclamationCircleIcon from "@heroicons/react/24/outline/ExclamationCircleIcon";
import findLinksPlugin from "~/app_function/utils/find_link_plugin";
import log from "~/app_function/logger/logger";

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
  const findLinksPluginInstance = findLinksPlugin() as unknown as Plugin;

  return (
    <div className="relative">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.7.107/build/pdf.worker.min.js">
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
              renderError={(e) => {
                log.error(e);
                setIsLoading(false);
                return (
                  <div className="flex w-full justify-center">
                    <div className="p-card mx-5 flex h-full w-fit flex-col gap-2 py-4 text-base-content sm:flex-row">
                      <ExclamationCircleIcon className="h-5 w-5" />
                      Error: Unable to view PDF resume. Please download.
                    </div>
                  </div>
                );
              }}
              defaultScale={SpecialZoomLevel.PageFit}
              theme={"dark"}
              fileUrl={resumeUrl}
              plugins={[findLinksPluginInstance]}
            />
          </div>
        </div>
      </Worker>
    </div>
  );
}
