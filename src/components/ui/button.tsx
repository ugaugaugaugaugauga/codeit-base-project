type Props = {
  children: React.ReactNode
  outline?: boolean
  rounded?: 'lg' | 'xl' | 'full'
  size?: 'sm' | 'lg'
  disabled?: boolean
  width?: number
  onClick?: () => void
}

export const Button = ({
  children,
  outline = false,
  rounded,
  size,
  disabled,
  width,
  onClick,
}: Props) => {
  return (
    <button
      className={`w-full flex items-center justify-center py-2 px-4 disabled:cursor-not-allowed ${
        outline
          ? 'border border-amber-800 bg-white text-amber-800 hover:bg-slate-100 disabled:bg-slate-200'
          : 'bg-amber-800 text-white hover:bg-amber-900 disabled:bg-amber-800/40'
      }
      ${rounded === 'lg' && 'rounded-lg'}
      ${rounded === 'xl' && 'rounded-xl'}
      ${rounded === 'full' && 'rounded-full'}
      ${size === 'sm' && 'py-1 px-2'}
      ${size === 'lg' && 'py-3 px-5'}
      `}
      style={{ width }}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}