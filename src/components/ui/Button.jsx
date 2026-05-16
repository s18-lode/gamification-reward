const variants = {
  primary:
    'bg-brand-600 text-white hover:bg-brand-700 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed',
  secondary:
    'border border-brand-600 text-brand-600 bg-white hover:bg-brand-50 disabled:opacity-50',
  ghost: 'text-slate-600 hover:bg-slate-100',
  text: 'text-brand-600 hover:text-brand-700 px-2',
}

const sizes = {
  sm: 'px-3 py-1.5 text-xs rounded-lg',
  md: 'px-4 py-2.5 text-sm rounded-xl',
  lg: 'px-6 py-3 text-sm rounded-xl',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center font-medium transition ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
