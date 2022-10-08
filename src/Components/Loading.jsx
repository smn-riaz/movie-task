import React from 'react'
import loading from '../Assets/loading.gif'

const Loading = () => {
  return (
    <div className='flex flex-row justify-center items-center'>
        <div>
            <img src={loading} alt="" />
        </div>
    </div>
  )
}

export default Loading