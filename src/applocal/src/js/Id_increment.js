export default function Id_increment(lists = []) {
  return lists.reduce((mx, list) => Math.max(list.id, mx), -1);
}
