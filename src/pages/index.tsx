import Image from 'next/image'
import { Inter } from 'next/font/google'
import LoginBtn from '@/components/login-btn'

const inter = Inter({ subsets: ['latin'] })

const Input = ({ label, ...props }:any) => (
  <div className="flex flex-col mb-4">
    <label className="mb-2 font-bold text-lg text-gray-900" htmlFor={props.id}>
      {label}
    </label>
    <input
      className="border py-2 px-3 text-gray-900"
      {...props}
    />
  </div>
)

const Button = ({ children, ...props }:any) => (
  <button
    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
    {...props}
  >
    {children}
  </button>
)

export default function Home() {
  

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
     <div className="flex flex-col items-center justify-center">
     <LoginBtn />

        {/* <Link > Redirect</Button> */}
        <div>

        </div>
      </div>
    </main>
  )
}


