import React from 'react';
import Form from './Form';
import MessageList from './MessageList';
import { nanoid } from 'nanoid';

const colors = ['#eb4034', '#eb34e2', '#34c0eb', '#34eb59', '#e5eb34']; // массив цветов для обозначения участников чата
const currentColor = colors[Math.round(Math.random() * colors.length)]

const MainComponent = () => {
    const [mess, setMess] = React.useState([]);

    function setLocalStorage() {
        if (window.localStorage.getItem('my-id') === null) {
            window.localStorage.setItem('my-id', nanoid());
            console.log(window.localStorage.getItem('my-id'));
        }
    }

    async function fetchingData() {
        try {
           const request = await fetch(`http://localhost:7777/messages?from={${mess.length}}`, { method: 'GET' });
           const response = await request.json();
           setMess(response); 
        } catch (error) {
           alert('Произошла ошибка!');
           console.log(error); 
        }
    }

    React.useEffect(() => {
        setLocalStorage()
        setInterval(() => { fetchingData() }, 500) 
    }, [])

    async function addMessage(text) {
        try {
            await fetch(' http://localhost:7777/messages', { 
                method: 'POST', 
                headers: {'Content-Type': 'application/json'}, 
                body: JSON.stringify({
                    id: mess.length, 
                    userId: window.localStorage.getItem('my-id'), 
                    content: text, 
                    colors: currentColor
                }) 
            })
        } catch (error) {
            alert('Произошла ошибка!');
            console.log(error);
        }
    }

    return (
        <>
            <h1>ВКонтакте</h1>
            <h4>на минималках</h4>
            <MessageList whoseMessage={window.localStorage.getItem('my-id')} arrayMessage={mess}/>
            <Form addMessage={addMessage}/>
        </>
    )
}

export default MainComponent

/*
Вопрос: Подумайте, какие уязвимости в безопасности создаёт подобная схема, и возможна ли отправка сообщений от лица другого пользователя?
Ответ: Взломать данную схему проще простого. Для того, чтобы отправлять сообщения от лица другого пользователя, достаточно узнать уникаль-
ный ID этого пользователя (социальная инженерия, fishing'овые сайты и тому подобные мошеннические уловки).
============================================================================================================================================ 
Вопрос: Подумайте над тем, как это можно предотвратить?
Ответ: Для повышения безопасности можно, во-первых, генерировать уникальный ID пользователя не на frontend-части приложения, а на сервере 
(как это сделать - отдельная задачка), во-вторых, при передаче ID можно использовать шифрование со сложными криптографическими ключами, 
которые необходимо при получении по специальному алгоритму расшифровать (но тут дело уже в оптимизации клиентской части, потому как 
расшифровка будет ресурсозатратным процессом, который может занять много времени, если у пользователя будет слабое устройство).
============================================================================================================================================
Не удалось реализовать в приложении только авто-скроллинг к самому последнему сообщению, остальное, вроде как, работает.

Спасибо за чтение и за проверку!))
Руденко Степан, RA-36.
*/