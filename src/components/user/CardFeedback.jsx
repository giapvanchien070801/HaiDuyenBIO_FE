"use client"

export default function CardFeedback(props) {
  const { content, avatar, fullName, feedBackType } = props
  return (
    <div className="sm:w-1/2 w-full sm:mb-0 mb-5 p-8 bg-white rounded">
      <p className="text-[#666666]  mt-4 leading-8 mb-5  min-h-28">{content}</p>
      <hr />
      <div className="mt-8 flex items-center">
        <div className="w-20 h-20 rounded-full overflow-hidden mr-4">
          <img src={avatar} alt="alt" className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="text-2xl font-semibold mb-2">{fullName}</p>
          <p className="text-[#2490eb] font-semibold">{feedBackType}</p>
        </div>
      </div>
    </div>
  )
}
