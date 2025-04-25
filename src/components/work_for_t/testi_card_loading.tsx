export default function TestiCardLoading() {
  return (
    <div className="p-card group hover:bg-base-200 relative mx-0 h-fit w-full space-y-3 px-0 py-4">
      <div className="w-full px-3">
        <div className="tooltip flex w-full items-center gap-2 lg:items-start">
          <div>
            <div className="bg-base-content/40 ring-base-300 h-12 w-12 animate-pulse overflow-hidden rounded-full ring-3" />
          </div>
          <div className="w-full space-y-1 text-left tracking-wider">
            <div className="bg-base-content/40 h-4 w-full animate-pulse rounded-xl" />
            <div className="bg-base-content/40 h-4 w-full animate-pulse rounded-xl" />
          </div>
        </div>
      </div>
      <div className="bg-base-content/40 mx-4 h-32 w-full animate-pulse rounded-xl md:mx-3" />
    </div>
  );
}
