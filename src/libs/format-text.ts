export const capitalText = (text: string) => {
  if (typeof text !== "string") {
    return "";
  }

  return text
    .split(/([.!?])/g)
    .map((t, i) => {
      if (i % 2 === 0) {
        return t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
      }
      return t;
    })
    .join(" ");
};

export const upperText = (text: string) => {
  if (typeof text !== "string") {
    return "";
  }

  return text
    .split(/([ ])/g)
    .map((t, i) => {
      if (i % 2 === 0) {
        return t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
      }
      return t;
    })
    .join(" ");
};
