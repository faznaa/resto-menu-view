import React from 'react'
import { Input } from './Input'
import { Button } from './Button'

export default function MenuSuggestionChat() {
  return (
    <div className='max-w-4xl bg-white rounded-sm p-7 m-auto'>
       <Input type="textarea" label="Use our chatbot to generate custom menu" name="description" placeholder='I would like to create an Indian restaurant with Veg focused menu, in south indian style' onChange={console.log} />
      <Button>Generate</Button>
    </div>
  )
}
