export const nextSecuenceName = (names: string[], prefix: string = '') =>
  prefix +
  ((names
    .map((name) =>
      RegExp(`^${prefix}(\\d+)$`).test(name)
        ? Number(name.replace(prefix, ''))
        : 0,
    )
    .sort((a, b) => a - b)
    .pop() || 0) +
    1)
