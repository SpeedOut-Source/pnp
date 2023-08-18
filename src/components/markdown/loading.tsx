export default function Loading() {
  return (
    <div className="flex justify-center gap-2">
      <span className="loading loading-infinity" />
      <span className="animate-pulse">Loading...</span>
    </div>
  );
}
