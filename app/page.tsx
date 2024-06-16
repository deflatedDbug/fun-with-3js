
import dynamic from "next/dynamic"
import './globals.css'

const Scene = dynamic(() => import('@/components/Scene'), { ssr: false})

export default function Home() {
  return (<main className="h-full">
    <Scene />
  </main>
  );
}
