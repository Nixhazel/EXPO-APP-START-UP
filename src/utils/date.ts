export function getDateFromUTC(input: number): Date {
  // FIXME: Read on the proper way to convert numbers to date.
  if (new Date(input).getFullYear() >= 2020) {
    return new Date(input);
  }

  const date = new Date(0);
  date.setUTCSeconds(input);
  return date;
}

export function getUTCFromDate(date: Date): number {
  return Math.round(date.getTime() / 1000);
}

export function isValidDate(date: any): boolean {
  const d = new Date(date);
  return d.toString() !== 'Invalid Date';
}
