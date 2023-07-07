export function collapseProps<T>(source: T): T {
  const anySource = source as any;
  return Object.keys(anySource).reduce((acc, key) => {
    return {
      ...acc,
      [key]: anySource[key]?.value,
    };
  }, {} as T);
}
