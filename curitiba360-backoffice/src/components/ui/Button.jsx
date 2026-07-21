export default function Button({
  children,
  type = 'button',
  variant = 'primary',
  className = '',
  ...props
}) {
  const variants = {
    primary:
      'bg-blue-700 text-white hover:bg-blue-800',

    secondary:
      'bg-gray-100 text-gray-800 hover:bg-gray-200',

    danger:
      'bg-red-600 text-white hover:bg-red-700',

    outline:
      'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
  }

  return (
    <button
      type={type}
      className={`
        rounded-xl px-4 py-2.5
        font-medium transition
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}