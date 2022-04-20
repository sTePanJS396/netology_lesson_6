import React from 'react'
import MessageItem from './MessageItem'

const MessageList = ({ arrayMessage, whoseMessage }) => {
  return (
    <div className='message-block'>
        <ul className='message-block_list'>
          {arrayMessage.length === 0 && <h1>Здесь будут сообщения!</h1>}
          {arrayMessage.map(el => (
            <MessageItem key={el.id} text={el.content} whoseMessage={el.userId} color={el.colors}/>
          ))}
        </ul>
    </div>
  )
}

export default MessageList