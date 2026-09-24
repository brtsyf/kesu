/** ASCII-only labels (Lifting, Hair) must not use Turkish İ when uppercased. */
export function isLatinAscii(value: string) {
  return /^[\x20-\x7E]+$/.test(value);
}
