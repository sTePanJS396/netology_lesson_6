import React from 'react'

const Note = ({ text, id, onDetele }) => {
  return (
    <div className='note-block'>
        <span className='delete' onClick={() => onDetele(id)}></span>
        <div className='note-block_content'>
            {text}
        </div>
    </div>
  )
}

export default Note