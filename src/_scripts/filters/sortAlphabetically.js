export function sortAlphabetically(strings) {
  return (strings || []).sort((b, a) => b.localeCompare(a));
}
