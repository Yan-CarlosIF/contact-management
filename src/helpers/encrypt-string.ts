export function encryptString(stringLength: number | undefined) {
  return stringLength ? "*".repeat(stringLength) : "**************";
}
