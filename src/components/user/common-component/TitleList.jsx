"use client"

export default function TitleList(props) {
  const { title } = props

  return (
    <div className="container  md:mx-auto py-4 md:py-8">
      <div className="flex items-center justify-center ">
        <div className="flex-grow h-[1px] bg-gray-300"></div>
        <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mx-4 md:mx-6 lg:mx-8 uppercase">
          {title}
        </p>
        <div className="flex-grow h-[1px] bg-gray-300"></div>
      </div>
    </div>
  )
}
