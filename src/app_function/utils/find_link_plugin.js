import { LayerRenderStatus } from "@react-pdf-viewer/core";
import linkifyElement from "linkify-element";

const findLinksPlugin = () => {
  const findLinks = (
    /** @type {{ status: LayerRenderStatus; ele: { querySelectorAll: (arg0: string) => HTMLElement[]; }; }} */ e
  ) => {
    if (e.status !== LayerRenderStatus.DidRender) {
      return;
    }

    // `e.ele` represents the element containing all text elements in each page
    // Find all text elements
    e.ele
      // `rpv-core__text-layer-text` is the CSS class of each text element
      .querySelectorAll(".rpv-core__text-layer-text")
      .forEach((/** @type {HTMLElement} */ textEle) => {
        linkifyElement(textEle, {
          attributes: {
            // Custom styles
            // style: "color: red; text-decoration: none;",
            // Open link in new tab
            target: "_blank"
          }
        });
      });
  };

  const findLinksAnnotations = (
    /** @type {{ container: { querySelectorAll: (arg0: string) => { setAttribute: (arg0: string, arg1: string) => void; }[]; }; }} */ e
  ) => {
    e.container
      .querySelectorAll(".rpv-core__annotation--link a")
      .forEach(
        (
          /** @type {{ setAttribute: (arg0: string, arg1: string) => void; }} */ link
        ) => {
          link.setAttribute("target", "_blank");
        }
      );
  };

  return {
    onTextLayerRender: findLinks,
    onAnnotationLayerRender: findLinksAnnotations
  };
};

export default findLinksPlugin;
