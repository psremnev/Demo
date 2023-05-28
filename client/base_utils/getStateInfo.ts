export function getStateInfo(): object {
  return JSON.parse(globalThis.__STATE__);
}
