export function banglaNumber(value) {
  return Number(value).toLocaleString("bn-BD");
}

export function unitLabel(unit) {
  const units = {
    kg: "প্রতি কেজি",
    liter: "প্রতি লিটার",
    litre: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
    pcs: "প্রতি পিস",
  };

  return units[unit] || `প্রতি ${unit}`;
}