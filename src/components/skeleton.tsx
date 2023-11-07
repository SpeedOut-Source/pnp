export default function Skeleton({ count = 1 }: { count: number }) {
  const loadingItems = Array.from({ length: count }, (_, index) => {
    return (
      <div
        key={index}
        className="flex w-full animate-pulse flex-col gap-2 rounded-lg bg-base-content/10 p-4"
      >
        {Array.from({ length: 3 }, (_, index) => (
          <div
            key={index}
            className="h-4 rounded bg-base-content/30"
            style={{ width: `${30 + Math.random() * 40}%` }}
          />
        ))}
      </div>
    );
  });

  return <div className="space-y-4 p-4">{loadingItems}</div>;
}
