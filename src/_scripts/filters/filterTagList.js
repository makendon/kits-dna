export function filterTagList(tags) {
  return (tags || []).filter(tag =>
    tag !== "posts" &&
    tag !== "pages" &&
    tag !== "post" &&
    tag !== "all"
  );
}
