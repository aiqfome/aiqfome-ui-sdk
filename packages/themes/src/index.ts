/** Primitive spacing scale names (values live in generated geraldo-tokens.css). */

export const geraldoSpace = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
] as const;

export type GeraldoSpace = (typeof geraldoSpace)[number];

export function geraldoSpaceVar(step: GeraldoSpace): string {
  return `var(--geraldo-space-${step})`;
}
