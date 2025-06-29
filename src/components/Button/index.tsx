export const Button = ({ children,fullWidth=false, href, ...props }: any) =>
  href ? (
    <a
      href={href}
      download="qr.png"
      className={`rounded-md text-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 ${fullWidth ? 'w-full' : ''}`}
      {...props}
    >
      {children}
    </a>
  ) : (
    <button
      className={`rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 ${fullWidth ? 'w-full' : ''}`}
      {...props}
    >
      {children}
    </button>
  )