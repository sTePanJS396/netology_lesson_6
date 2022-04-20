import React from 'react'

const MessageItem = ({ text, whoseMessage, color }) => {
  function checkedId() {
    if (window.localStorage.getItem('my-id') === whoseMessage) {
      return true
    } else {
      return false
    }
  }
  return (
    <li 
      className={`message-block_item ${checkedId() ? 'my-mess' : 'other-mess'}`}
      style={{border: `2px dashed ${color}`}}
    > {checkedId() && <span>Моё сообщение<br/></span>}
      {text}
    </li>
  )
}

export default MessageItem