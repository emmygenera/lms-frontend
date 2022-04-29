export default function stripTags(html = "", replacements = "") {
  return String(html).replace(/<[^>]+>/gi, replacements);
}
