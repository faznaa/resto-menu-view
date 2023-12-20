import Image from 'next/image'
import { Inter } from 'next/font/google'
import LoginBtn from '@/components/login-btn'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect, useState } from 'react'
import Modal from '@/components/modal'
import axios from 'axios'
// import QRCode from 'react-qr-code'
import QRCode from 'qrcode'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

const Input = ({ label, ...props }:any) => (
  <div className="flex flex-col mb-4">
    <label className="mb-2 font-bold text-md text-left text-gray-900" htmlFor={props.id}>
      {label}
    </label>
    <input
      className="border py-2 px-3 text-gray-900"
      {...props}
    />
  </div>
)

const Button = ({ children,href, ...props }:any) => (
   href ?<a href={href} download="qr.png"
   className="rounded-md center text-center bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full"    {...props}
   >
     {children}
   </a>:  <button
    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full"    {...props}
    >
      {children}
    </button>
)

const fetcher = (url: string) =>
fetch(url)
  .then((res) => res.json())
  .then((json) => json.data)

export default function Home() {
    
    const router = useRouter()
    const { data: session } = useSession()
    const email = session?.user?.email;
    const {
        data:resData,
        mutate,
        error,
        isLoading,
    } = useSWR(session?.user?.email ? `/api/restaurant/${session?.user?.email}` : null, fetcher)

    useEffect(() => {
        console.log(session?.user?.email)
        console.log(resData)
    },[resData,session?.user?.email])

    const restaurantInitData = {
        'name':'',
        'description':'Lorem ipsum gracia uno des',
        'phoneNumber':'',
        'website':'',
        'location_address':'',
        'location_url':'',
    }
    const [inputData, setInputData] = useState(restaurantInitData)
 const [open,setOpen] = useState(false)
 const handleSubmit = async() => {
     const _result = await axios.post('/api/menu/create',{
         restaurant:{
            ...inputData,
            phoneNumber:parseInt(inputData.phoneNumber),
            location: {
                address:inputData.location_address,
                url:inputData.location_url
            }
         },
         owner_name:"",
         color_scheme: 'schema1',
         email:session?.user?.email
     }) 
     console.log(_result)
     if(_result.status === 200){
         console.log('success')
         setInputData(restaurantInitData)
         setOpen(false)
         mutate()
     }else {
         alert('Something happened')
     }
    }
    const handleChange = (e:any) => {
        setInputData({...inputData,[e.target.name]:e.target.value})
    }
    const [qr,setQr] = useState('' as any)
    const generateQR = async() => {
      QRCode?.toDataURL(`https://beautiful-gaufre-fffa52.netlify.app/menu/view/${resData?._id}`,{
        width:300,
        margin:2,
        color:{
          dark:"#335383ff",
          light:"#eeeeeeff"
        }
      },(err,url) => {
        if(err) console.log(err)
        else setQr(url);
      })
    }
    useEffect(() => {
      if(resData && resData._id){
        generateQR()
      } 
    },[resData])
  return (
    <main
      className={`min-h-screen `}
    >
      <div className='sm:flex items-center'>
        <div className='sm:w-5/12 lg:w-1/4'> <div className="flex flex-col items-center justify-center">
     {/* <LoginBtn /> */}
     <img src={qr}/>

        {resData ? 
        <div className='w-full gap-y-4 flex flex-col px-4 '>
            {/* {JSON.stringify(resData)} */}
            <Button onClick={() => router.push(`/menu/edit/${resData?._id}`)}>View Menu Items</Button>
            <Button onClick={() => router.push(`/menu/view/${resData?._id}`)}>Get Link</Button>
            <Button href={qr} download>Download QR</Button>
          </div>
        : <Button onClick={() => setOpen(true)}>Create New Restaurant</Button>
        }
        {/* <a href={qr} download>DOWNLOAD</a> */}
          {/* <div className='w-full flex justify-center  p-4'>
            <QRCode value={`localhost:3000/menu/view/${resData?._id}`} />
            </div> */}

        
      </div></div>
        <div className='hidden sm:block sm:w-7/12 lg:w-3/4'>      <img src="/images/food1.jpg" alt="pancake" className="w-full object-contain shadow-lg" />
</div>
      </div>
    
      <Modal open={open} setOpen={setOpen} handleSubmit={handleSubmit} >
        <Input label='Name' id='name' name='name' value={inputData.name} onChange={handleChange} />
        <Input label='Description' id='description' name='description' value={inputData.description} onChange={handleChange} />
        <Input label='Phone Number' id='phoneNumber' name='phoneNumber' value={inputData.phoneNumber} onChange={handleChange} />
        <Input label='Website' id='website' name='website' value={inputData.website} onChange={handleChange} />
        <Input label='Location Address' id='location_address' name='location_address' value={inputData.location_address} onChange={handleChange} />
        <Input label='Location URL' id='location_url' name='location_url' value={inputData.location_url} onChange={handleChange} />
      </Modal>
    </main>
  )
}


