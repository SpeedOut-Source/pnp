export default function TestiCardLoading() {
  return (
    <div className="p-card w-full group relative mx-0 h-fit  space-y-3 px-0 py-4 hover:bg-base-200">
      <div className="w-full px-3">
        <div className="tooltip flex w-full items-center gap-2 lg:items-start">
          <div>
            <div className="h-12 w-12 animate-pulse overflow-hidden rounded-full bg-base-content/40 ring ring-base-300" />
          </div>
          <div className="w-full space-y-1 text-left tracking-wider">
            <div className="h-4 w-full animate-pulse rounded-xl bg-base-content/40" />
            <div className="h-4 w-full animate-pulse rounded-xl bg-base-content/40" />
          </div>
        </div>
      </div>
      <div className="mx-4 h-32 w-full animate-pulse rounded-xl bg-base-content/40 md:mx-3" />
    </div>
  );
}
