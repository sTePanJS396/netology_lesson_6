import React from 'react'

const NewNoteForm = ({ newNote }) => {
  const [field, setField] = React.useState('');

  function submit(event) {
    event.preventDefault();
    if (field.length !== 0) {
      newNote(field);
    }
    setField('')
  }

  return (
    <div className='form-block'>
        <form onSubmit={submit}>
          <input 
            className='form-block_input' 
            type='text' 
            placeholder='Введите заметку...' 
            value={field} 
            onChange={(event) => setField(event.target.value)} 
          />
          <button className='form-block_button'>Отправить</button>
        </form>
    </div>
  )
}

export default NewNoteForm