export function generateSKU(name: string) {
  return name
    .split(" ")
    .map((word) => word.toLowerCase())
    .join("");
}
