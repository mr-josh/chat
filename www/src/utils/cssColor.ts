const computedColor = (
  color: string,
  options?: {
    min?: number;
  }
) => {
  const div = document.createElement("div");
  div.style.color = color;

  document.body.appendChild(div);
  const computedColor = window.getComputedStyle(div).color;
  document.body.removeChild(div);

  return computedColor.replace(
    /rgb\((\d+), (\d+), (\d+)\)/,
    (_, sR, sG, sB) => {
      let r = parseInt(sR, 10);
      let g = parseInt(sG, 10);
      let b = parseInt(sB, 10);

      const min = Math.min(r, g, b);

      if (min < (options?.min || 0)) {
        r = Math.max(options?.min || 0, r);
        g = Math.max(options?.min || 0, g);
        b = Math.max(options?.min || 0, b);
      }

      return `rgb(${r}, ${g}, ${b})`;
    }
  );
};

export default computedColor;
