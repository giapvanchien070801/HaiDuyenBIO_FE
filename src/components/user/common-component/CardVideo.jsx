"use client"

import { CheckCircleFilled, ClockCircleOutlined } from "@ant-design/icons"

export default function CardVideo(props) {
  const { video } = props

  return (
    <div
      key={video.id}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      <div className="aspect-video relative group cursor-pointer">
        <iframe
          src={video.url.replace("youtu.be/", "youtube.com/embed/")}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"></iframe>
        <div className="absolute bottom-2 right-2 bg-black text-white text-xs px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
          Xem ngay
        </div>
      </div>

      <div className="flex gap-3 px-3 py-5">
        <div className="flex-shrink-0">
          <img src={video.avatar} alt={video.channel} className="w-9 h-9 rounded-full" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1 hover:text-blue-600 cursor-pointer">
            {video.title}
          </p>
          <div className="flex items-center text-sm text-gray-600">
            <span className="hover:text-gray-900 cursor-pointer">{video.channel}</span>
            <CheckCircleFilled className="ml-1 text-gray-600" />
          </div>
          <div className="text-sm text-gray-600">
            <span>{video.views} lượt xem</span>
            <span className="mx-1 ml-5">
              <ClockCircleOutlined />
            </span>
            <span>{video.timestamp}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
