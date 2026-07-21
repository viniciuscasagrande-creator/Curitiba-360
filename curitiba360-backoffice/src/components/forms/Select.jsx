export default function Select({ label, options = [], error, className = '', ...props }) {
  return (
    <div className="space-y-1.5">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <select
        className={`
          w-full rounded-xl border border-gray-300
          bg-white px-4 py-3 text-gray-900
          outline-none transition
          focus:border-blue-600 focus:ring-4 focus:ring-blue-100
          ${className}
        `}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
