import { useId } from 'react';

export function useStableId(prefix: string = 'field'): string {
  const id = useId();
  return `${prefix}-${id}`;
}
