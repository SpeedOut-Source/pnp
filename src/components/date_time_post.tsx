export default function DateTimePost({ date }: { date: number }) {
  return (
    <span>
      {new Date(date).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })}
    </span>
  );
}
