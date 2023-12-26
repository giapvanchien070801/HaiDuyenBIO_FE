export default function UserFacilities() {
  return (
    <div className="container mx-auto mt-24">
      <div className="text-center px-2 ">
        <span className="session_ocean1 px-2 text_ocean uppercase font-medium w-max">
          Lợi ích chúng tôi có
        </span>
        <p className="text-center text-4xl font-semibold capitalize">
          Những Lợi Ích Mà Bạn Nhận Được
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6 flex justify-center">
        <div className="">
          <img src="/images/facility1.jpg" className="w-full h-96" />
        </div>

        <div className="">
          <img src="/images/facility2.jpg" className="w-full h-96 " />
        </div>

        <div className="">
          <img src="/images/facility3.jpg" className="w-full h-96 " />
        </div>

        <div className="">
          <img src="/images/facility2.jpg" className="w-full h-96 " />
        </div>
      </div>
    </div>
  );
}
