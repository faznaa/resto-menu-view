export const Input = ({ label, ...props }: any) => (
  <div className="flex flex-col mb-4 justify-start">
    <label className="mb-2 font-medium text-left text-gray-700" htmlFor={props.id}>
      {label}
    </label>
    <input
      className="border border-gray-300 py-2 px-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      {...props}
    />
  </div>
)

