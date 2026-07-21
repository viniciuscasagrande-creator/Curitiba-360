export default function Page({
  title,
  description
}) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">
        {title}
      </h1>

      <p className="mt-2 text-gray-500">
        {description}
      </p>

      <div className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
        <p className="text-gray-500">
          Módulo em desenvolvimento.
        </p>
      </div>
    </div>
  )
}
