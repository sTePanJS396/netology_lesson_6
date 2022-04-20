import React from 'react';
import './Form.css'

const AddBlock = ({ onAdd }) => {
    const [field, setField] = React.useState({city: '', deviantion: ''});

    function handleChangeInput(event) {
        setField(prev => ({...prev, [event.target.name]: event.target.value}))
    }

    function handleSubmit(event) {
        event.preventDefault();
        onAdd(prev => (
            [
                ...prev, 
                {
                    id: prev.length + 1,
                    deviation: Number(field.deviantion),
                    city: field.city
                }
            ]
        ));
        setField({city: '', deviantion: ''})
    }

    return (
        <div className='input-block'>
            <form className='form' onSubmit={handleSubmit}>
                <div className='form-item'>
                    <label htmlFor='city'> <p>Город</p>
                        <input type='text' name='city' id='city' onChange={handleChangeInput} value={field.city}/>
                    </label>
                </div>
                <div className='form-item'>
                    <label htmlFor='deviantion'> <p>Отклонение в часах</p>
                        <input type='text' name='deviantion' id='deviantion' onChange={handleChangeInput} value={field.deviantion}/>
                    </label>
                </div>
                <button type='submit' className='form-button'>Добавить</button>
            </form>
        </div>
    )
}

export default AddBlock;