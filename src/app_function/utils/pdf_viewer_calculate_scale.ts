const SCROLL_BAR_WIDTH = 17;
const PAGE_PADDING = 8;

export const calculateScale = (
  container: HTMLElement,
  pageHeight: number,
  pageWidth: number
): number => {
  return Math.min(
    (container.clientWidth - SCROLL_BAR_WIDTH) / pageWidth,
    (1056 - 2 * PAGE_PADDING) / pageHeight
  );
};
