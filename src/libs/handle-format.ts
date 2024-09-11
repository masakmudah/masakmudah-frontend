export function handleTrimSpace(field: any) {
  return (f: React.ChangeEvent<HTMLInputElement>) => {
    const fieldValue = f.target.value.trim();
    field.onChange(fieldValue);
  };
}

export function handleReplaceSpace(field: any) {
  return (f: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const fieldValue = f.target.value.replace(/\s+/g, " ");
    field.onChange(fieldValue);
  };
}

export function handleCapitalize(field: any) {
  return (f: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const fieldValue = f.target.value
      .toLowerCase()
      .split(/([.!?:])/g)
      .map((f, i) => {
        if (i === 0 && f.trim().length > 0) {
          return f.charAt(0).toUpperCase() + f.slice(1);
        }
        if (f.match(/[.!?]/)) {
          return f;
        }
        return f.charAt(0).toUpperCase() + f.slice(1);
      })
      .join("")
      .replace(/\s+([.!?:])/g, "$1")
      .replace(/\s+/g, " ");

    field.onChange(fieldValue);
  };
}
