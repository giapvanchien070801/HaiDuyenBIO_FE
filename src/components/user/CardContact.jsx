"use client"

export default function CardContact(props) {
  const { icon, title, content } = props

  return (
    <div className="h-80 sm:w-4/12 w-1/2  bg-[#F4F6F9] rounded flex flex-col items-center justify-center px-8 ">
      <div className="w-20 h-20 icon-contact rounded flex flex-col items-center justify-center mb-4">{icon}</div>
      <b className="text-lg mb-4 text-center">{title}</b>
      <p className="text-[#666666] text-center">{content}</p>
    </div>
  )
}
