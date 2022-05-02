import React from 'react'

const Form = ({ addMessage }) => {
  const [field, setField] = React.useState('')
  function submit(event) {
    event.preventDefault();
    addMessage(field)
    setField('')
  }
  return (
    <form 
      className='form-block' 
      onSubmit={submit}>
        <input 
          className='form-block_input' 
          type='text' 
          placeholder='Введите сообщение...'
          value={field}
          onChange={(event) => setField(event.target.value)}
        />
        <button className='form-block_button' type='submit'>→</button>
    </form>
  )
}

export default Form