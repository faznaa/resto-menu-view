import Image from 'next/image'
import { Inter } from 'next/font/google'
import LoginBtn from '@/components/login-btn'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect, useState } from 'react'
import Modal from '@/components/modal'
import axios from 'axios'

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

const Button = ({ children, ...props }:any) => (
  <button
    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
    {...props}
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
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
     <div className="flex flex-col items-center justify-center">
     <LoginBtn />

        {resData ? 
        <div className='gap-y-4 flex flex-col px-6 '>
            {/* {JSON.stringify(resData)} */}
            <Button onClick={() => router.push(`/menu/edit/${resData?._id}`)}>View Menu Items</Button>
            <Button onClick={() => router.push(`/menu/view/${resData?._id}`)}>Get Link</Button>
            <Button onClick={() => router.push(`/menu/view/${resData?._id}`)}>Generate QR</Button>
            </div>
        : <Button onClick={() => setOpen(true)}>Create New Restaurant</Button>
        }
        
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


