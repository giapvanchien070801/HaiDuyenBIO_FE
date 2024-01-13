"use client";

import { handleSrcImg } from "@/app/(admin)/common/functions/commonFunction";

export default function CardDoctor(props) {
  const { position, name, imagePath } = props;
  return (
    <div className=" w-[32%]  bg-[#F4F6F9] rounded overflow-hidden card-doctor">
      <div className="h-[400px] overflow-hidden">
        <img
          src={handleSrcImg(imagePath)}
          alt="alt"
          className="w-full h-full object-cover "
        />
      </div>

      <div className="w-full pb-6 flex justify-center">
        <div className="w-5/6 py-5 px-4 bg-white shadow-container-contact rounded flex flex-col items-center card-doctor-btn">
          <p className="text-2xl font-semibold  text-center">{name}</p>
          <p className="text-sm font-semibold text-[#2490eb] text-center">
            {position}
          </p>
        </div>
      </div>
    </div>
  );
}
