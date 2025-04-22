"use client";

import React from "react";

interface ClipboardCopyProps {
  text: string;
  onCopy?: (text: string, result: boolean) => void;
  children: React.ReactNode;
  options?: {
    debug?: boolean;
    message?: string;
    format?: string;
  };
}

export const ClipboardCopy: React.FC<ClipboardCopyProps> = ({
  text,
  onCopy,
  children,
  options,
}) => {
  const handleClick = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    try {
      if (navigator.clipboard && window.isSecureContext) {
        // Modern browsers with secure context
        await navigator.clipboard.writeText(text);
        onCopy?.(text, true);
      } else {
        // Fallback method
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "absolute";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();

        try {
          const successful = document.execCommand("copy");
          onCopy?.(text, successful);
        } catch (err) {
          if (options?.debug) {
            console.error("Unable to copy to clipboard", err);
          }
          onCopy?.(text, false);
        }

        document.body.removeChild(textArea);
      }
    } catch (err) {
      if (options?.debug) {
        console.error("Clipboard copy failed", err);
      }
      onCopy?.(text, false);
    }
  };

  // Clone the child element and add the onClick handler
  return React.cloneElement(
    React.Children.only(children) as React.ReactElement<{
      onClick?: React.MouseEventHandler<HTMLElement>;
    }>,
    {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick: handleClick,
    },
  );
};

export default ClipboardCopy;
