export default function Label({ label_for, texto }) {

  return (
    <>
      <label htmlFor={label_for} className="text-sm/8 font-medium text-gray-900">{texto}</label>
    </>
  )
}