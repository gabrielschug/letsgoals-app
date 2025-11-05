export default function Input({ id, type, name, ...rest }) {

  return (
    <>
      <input id={id}
        type={type}
        className="block rounded-md bg-white px-4 py-2 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-verdeescuro"
        {...rest}
      />
    </>
  )
}