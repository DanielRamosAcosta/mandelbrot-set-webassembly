export function scale(value: number, leftMin: number, leftMax: number, rightMin: number, rightMax: number) {
  const leftSpan = leftMax - leftMin;
  const rightSpan = rightMax - rightMin;
  const valueScaled = (value - leftMin) / leftSpan;
  return rightMin + (valueScaled * rightSpan);
}
