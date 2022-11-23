import React, { FormHTMLAttributes, useContext, useState } from "react";
import dayjs, { Dayjs } from 'dayjs'
import Context from '../context'
import { AppContextInterface } from "../models";


const styles = {
    inputContainer: {
        display: 'flex',
        flexDirection: 'column'
    },
    formContainer: {

    }
}

const AddTodo = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(dayjs)
    const [file, setFile] = useState<File | null>();
    const appendTodo = useContext<AppContextInterface | null>(Context)?.appendTodo
    function submitForm(event: React.FormEvent) {
        event.preventDefault()
        if (appendTodo) appendTodo(
            title,
            description,
            date,
            file as File
        )
        setTitle('')
        setDescription('')
        setDate(dayjs())
        setFile(null)
    }

    // useEffect(() => {
    //     console.log(file)
    //     setImg(<img src={file?.name as string} />)
    // }, [file])

    return (
        <form onSubmit={submitForm} style={styles.formContainer}>
            <div style={styles.inputContainer as React.CSSProperties}>
                <input value={title} onChange={event => setTitle(event.target.value)} name="title" type="text" placeholder="Заголовок" />
                <textarea value={description} onChange={event => setDescription(event.target.value)} name="description" placeholder="Описание" rows={4} />
                <input value={date.format('YYYY-MM-DDTHH:mm')} onChange={event => {
                    console.log(event.target.value)
                    setDate(dayjs(event.target.value))
                }} name="date" type="datetime-local" />
                <input name="file" type="file" onChange={event => setFile(event.currentTarget.files?.item(0))} />
            </div>
            <button type="submit">Подтвердить</button>
        </form>
    )
}

export default AddTodo