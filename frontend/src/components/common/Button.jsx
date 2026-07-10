function Button({
  children,
  type = "button",
  loading = false,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={loading}
      className="w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}

export default Button;