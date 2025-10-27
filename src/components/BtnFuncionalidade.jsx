export default function BtnFuncionalidade() {

  const funcionalidades = [
    {
      titulo: "Contribuir",
      icone: "icone_contribuir.png"
    },
    {
      titulo: 'Entrar em uma Caixinha',
      icone: "icone_entrar.png"
    },
    {
      titulo: 'Criar uma Caixinha',
      icone: "icone_criar.png"
    },
    {
      titulo: 'Ajuda',
      icone: "icone_ajuda.png"
    }
  ]

  return (
    <div className="flex overflow-x-auto m-3 items-start gap-3 text-center cursor-pointer">
      {funcionalidades.map((funcionalidade, index) => (
        <div
          key={index}
          className="flex flex-col items-center">
          <div className="w-[100px] h-[100px] bg-verde rounded-2xl flex items-center justify-center hover:bg-verdeescuro not-visited:transition-transform duration-200">
            <img src={funcionalidade.icone} alt={funcionalidade.titulo} className="w-10 h-10 object-contain" />
          </div>
          <p className="mt-2  text-md font-medium text-gray-900">{funcionalidade.titulo}</p>
        </div>
      ))
      }
    </div>
  )
}