export const isValidUUIDv4 = (id?: string) => {
  const uuidv4Regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return id && id !== null && uuidv4Regex.test(id);
};


export const hexToRgba = (hex: string, opacity: number): string => {

  
  // Ensure hex starts with #
if (!/^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/.test(hex)) {
  
  throw new Error("Invalid hex color format " + hex);
  }

  // Expand short hex (e.g., #f0f → #ff00ff)
  if (hex.length === 4) {
    hex =
      "#" +
      hex
        .slice(1)
        .split("")
        .map((char) => char + char)
        .join("");
  }

  const rgb = parseInt(hex.slice(1), 16);
  const r = (rgb >> 16) & 255;
  const g = (rgb >> 8) & 255;
  const b = rgb & 255;

  const a = Math.max(0, Math.min(opacity, 100)) / 100;

  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
