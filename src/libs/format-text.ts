export const capitalText = (text: string | undefined) => {
  if (typeof text !== "string") {
    return "";
  }

  return text
    .split(/([.!?:])/g)
    .map((t, i) => {
      if (i % 2 === 0) {
        return t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
      } else if (i > 0) {
        return t + " ";
      }
      return t;
    })
    .join(" ")
    .replace(/\s+([.!?:])/g, "$1")
    .replace(/^\s+/, "");
};

export const firstCapital = (text: string | undefined) => {
  if (typeof text !== "string") {
    return "";
  }

  return text
    .split(/([.!?:])/g)
    .join(" ")
    .replace(/\s+([.!?:])/g, "$1")
    .replace(/^\s+/, "");
};

export const upperText = (text: string | undefined) => {
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
