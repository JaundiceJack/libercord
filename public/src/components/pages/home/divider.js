const Divider = () => {
  return (
    <svg className={"hidden lg:block inset-y-0 h-screen w-48 text-white z-10 transform -translate-x-1/2"}
         viewBox="0 0 100 100"
         preserveAspectRatio="none" fill="inherit">
      <defs>
        <linearGradient id="grad" gradientTransform="rotate(0)">
          <stop offset="0%"   stop-color="#111827" />
          <stop offset="100%" stop-color="#222938" />
        </linearGradient>
      </defs>
      <polygon fill="url(#grad)" points="50,1 100,50 50,99" />
    </svg>
  )
}

export default Divider;
