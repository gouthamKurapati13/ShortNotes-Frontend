import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Notecard from '../../components/Cards/Notecard'
import {MdAdd} from "react-icons/md"

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className='container mx-auto'>
        <div className='grid grid-cols-3 gap-4 mt-8'>
          <Notecard 
            title="Meeting on 5th June" 
            date="3rd June, 2024" 
            content="Meeting on 5th June"  
            tags="#Meeting" 
            isPinned={false}
            onEdit={()=>{}}
            onDelete={()=>{}}
            onPinNote={()=>{}}  
          />

          <Notecard 
            title="Meeting on 5th June" 
            date="3rd June, 2024" 
            content="Meeting on 5th June"  
            tags="#Meeting" 
            isPinned={false}
            onEdit={()=>{}}
            onDelete={()=>{}}
            onPinNote={()=>{}}  
          />

          <Notecard 
            title="Meeting on 5th June" 
            date="3rd June, 2024" 
            content="Meeting on 5th June"  
            tags="#Meeting" 
            isPinned={false}
            onEdit={()=>{}}
            onDelete={()=>{}}
            onPinNote={()=>{}}  
          />

          <Notecard 
            title="Meeting on 5th June" 
            date="3rd June, 2024" 
            content="Meeting on 5th June"  
            tags="#Meeting" 
            isPinned={false}
            onEdit={()=>{}}
            onDelete={()=>{}}
            onPinNote={()=>{}}  
          />

          <Notecard 
            title="Meeting on 5th June" 
            date="3rd June, 2024" 
            content="Meeting on 5th June"  
            tags="#Meeting" 
            isPinned={false}
            onEdit={()=>{}}
            onDelete={()=>{}}
            onPinNote={()=>{}}  
          />

        </div>
      </div>
      <button className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10' >
        <MdAdd className="text-[32px] text-white" />
      </button>
    </div>
  )
}

export default HomePage
