import React from 'react'
import NewNoteForm from './NewNoteForm'
import Note from './Note'

function errorsMessage(error) {
  alert('Произошла ошибка!');
  console.log(error);
} //Поскольку в трех местах необходимо информировать об ошибках, то решил вынести это действие в отдельную функцию

const MainComponent = () => {
  const [note, setNote] = React.useState([]);

  async function serverRequest() {
    try {
      const request = await fetch('http://localhost:7777/notes', {method: 'GET'})
      const response = await request.json();
      setNote(response);
    } catch (error) {
      errorsMessage(error)
    }
  };

  React.useEffect(() => { serverRequest() }, []);

  async function removeNote(index) {
    try {
      await fetch(`http://localhost:7777/notes/${index}`, {method: 'DELETE'});
      serverRequest();
    } catch (error) {
      errorsMessage(error)
    }
  }

  async function addNewNote(text) {
    try {
      await fetch('http://localhost:7777/notes', {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({id: note.length, content: text})
      })
      serverRequest();
    } catch (error) {
      errorsMessage(error)
    }
  }

  return (
    <div className='notes-block'>
        <h1 className='notes-block_title'>Заметки <span className='reload' onClick={() => serverRequest()}></span></h1>
        <div className='notes-block_notes-list'>
            {note.map(el => (
              <Note key={el.id} text={el.content} id={el.id} onDetele={removeNote}/>
            ))}
        </div>
        <div className='notes-block_form-block'>
            <NewNoteForm newNote={addNewNote}/>
        </div>
    </div>
  )
}

export default MainComponent