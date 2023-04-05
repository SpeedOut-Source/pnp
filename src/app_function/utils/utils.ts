export function stringToReadableUrl(str: string, reverse?: boolean): string {
  if (reverse) {
    // Convert readable URL back to original string
    return str.split("-").filter(Boolean).join(" ");
  } else {
    // Convert input string to readable URL
    return str
      .toLowerCase()
      .replace(/\s+/g, "-")
      .split("-")
      .filter(Boolean)
      .join("-");
  }
}
