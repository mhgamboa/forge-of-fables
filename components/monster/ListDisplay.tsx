export default function ListDisplay({ list, title }: { list: string[]; title: string }) {
  return list.length > 0 ? (
    <div id={title}>
      <span className="font-bold">{title}</span> {list.join(", ")}
    </div>
  ) : null;
}
