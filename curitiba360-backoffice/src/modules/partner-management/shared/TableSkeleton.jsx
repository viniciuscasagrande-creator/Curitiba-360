export default function TableSkeleton({ rows = 5 }) {
  return (
    <div className="w-full space-y-3 p-4 bg-white rounded-2xl border border-slate-200 animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center justify-between gap-4 py-3 border-b border-slate-100 last:border-none">
          <div className="h-4 w-12 bg-slate-200 rounded-md" />
          <div className="h-4 w-44 bg-slate-200 rounded-md" />
          <div className="h-4 w-32 bg-slate-200 rounded-md" />
          <div className="h-4 w-28 bg-slate-200 rounded-md" />
          <div className="h-6 w-20 bg-slate-200 rounded-full" />
          <div className="h-4 w-10 bg-slate-200 rounded-md" />
        </div>
      ))}
    </div>
  );
}
