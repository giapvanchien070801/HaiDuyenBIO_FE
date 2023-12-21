import dynamic from 'next/dynamic';

const UserSwiper = dynamic(() => import('@/components/user/UserSwiper'), { ssr: false })
export default function HomePage() {
  return (<div className="pb-48 container mx-auto">

    <UserSwiper />

  </div>);
}
