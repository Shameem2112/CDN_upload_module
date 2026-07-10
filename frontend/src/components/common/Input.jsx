function Input({
  label,
  type = "text",
  placeholder,
  error,
  ...props
}) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        className={`w-full rounded-lg border px-3 py-2 outline-none ${
          error
            ? "border-red-500"
            : "border-gray-300 focus:border-blue-500"
        }`}
        {...props}
      />

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;