const variants = {
  primary:
    'bg-brand-600 text-white hover:bg-saral-purple-hover shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
  secondary:
    'border border-brand-600 text-brand-600 bg-white hover:bg-brand-50 disabled:opacity-50',
  ghost: 'text-slate-600 ',
  text: 'text-brand-600 hover:text-brand-700 px-2',
  hero: 'bg-brand-600 text-white hover:bg-saral-purple-hover shadow-md rounded-2xl px-8 py-3 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
}

const sizes = {
  sm: 'px-3 py-1.5 text-xs rounded-lg',
  md: 'px-4 py-2.5 text-sm rounded-xl',
  lg: 'px-6 py-3 text-sm rounded-xl',
}

// Reusable Button component with variant and size props for consistent styling across the app

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
      className={`inline-flex items-center justify-center font-medium transition ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
