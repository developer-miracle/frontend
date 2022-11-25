import { ModalProps } from '../models'
import React, { FormHTMLAttributes, useContext, useEffect, useState } from "react";
import dayjs, { Dayjs } from 'dayjs'
import Context from '../context'
import { AppContextInterface } from "../models";

const styles = {
    root: {
        // width: '100%',
        // height: '100%',
        background: 'rgba(0, 0, 0, .5)',
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        width: '400px',
        height: '320px',
        background: 'white',
        borderRadius: '10px',
        padding: '10px'
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'column'
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%'
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-around',
    },
    submitButton: {
        backgroundColor: '#CCFFE5',
        borderRadius: '4px',
        border: 'none',
        width: '48%',
        height: '40px'
    },
    closeButton: {
        backgroundColor: '#FFCCCC',
        borderRadius: '4px',
        border: 'none',
        width: '48%',
        height: '40px'
    },
    title: {
        border: '1px solid rgba(0, 0, 0, .2)',
        borderRadius: '4px',
        height: '30px',
        marginBottom: '10px',
    },
    description: {
        border: '1px solid rgba(0, 0, 0, .2)',
        borderRadius: '4px',
        height: '60px',
        marginBottom: '10px',
    },
    date: {
        border: '1px solid rgba(0, 0, 0, .2)',
        marginBottom: '10px',
    },
    file: {
        border: 'none',
    },
    preview: {
        height: 'inherit',
        width: 'auto'
    },
    text: {
        marginBottom: '10px'
    }
}

function ModalTodo(props: ModalProps) {
    const closeModalContext = useContext<AppContextInterface | null>(Context)?.closeModal
    const appendTodo = useContext<AppContextInterface | null>(Context)?.appendTodo
    const editTodo = useContext<AppContextInterface | null>(Context)?.editTodo


    const [flagEdit, setFlagEdit] = useState(false);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(dayjs)
    const [file, setFile] = useState<File | null>();


    function closeModal() {
        if (closeModalContext) closeModalContext()
    }

    useEffect(() => {
        if (props.item?.id) {
            setFlagEdit(true)
            setTitle(props.item?.title as string)
            setDescription(props.item?.description as string)
            setDate(props.item?.date as Dayjs)
            setFile(props.item?.file)
        } else {
            setFlagEdit(false)
        }
    }, [])

    function submitForm(event: React.FormEvent) {
        event.preventDefault()
        if (!flagEdit) {
            if (appendTodo) appendTodo(
                title,
                description,
                date,
                file as File
            )
        } else if (flagEdit) {
            if (editTodo) editTodo({
                id: props.item?.id as Number,
                completed: false,
                title: title,
                description: description,
                date: date,
                file: file as File
            })
        }
        closeModal()
    }

    return <div style={styles.root as React.CSSProperties}>
        <div style={styles.box}>
            <form onSubmit={submitForm} style={styles.formContainer as React.CSSProperties}>
                {flagEdit ? <span style={styles.text}>Редактирование задачи</span> : <span style={styles.text}>Новая задача</span>}
                <div style={styles.inputContainer as React.CSSProperties}>
                    <input style={styles.title} value={title} onChange={event => setTitle(event.target.value)} name="title" type="text" placeholder="Заголовок" />
                    <textarea style={styles.description} value={description} onChange={event => setDescription(event.target.value)} name="description" placeholder="Описание" rows={4} />
                    <input style={styles.date} value={date.format('YYYY-MM-DDTHH:mm')} onChange={event => setDate(dayjs(event.target.value))} name="date" type="datetime-local" />
                    {flagEdit && file ? <a href={window.URL.createObjectURL(file as File)} download={(file as File).name}>
                        <div style={styles.file}><strong>Файл:</strong> {(file as File).name}</div>
                    </a> : ''}
                    <input style={styles.file} name="file" type="file" onChange={event => setFile(event.currentTarget.files?.item(0))} />
                </div>
                <div style={styles.preview}></div>
                <div style={styles.buttonContainer}>
                    <input style={styles.submitButton} type="submit" value="Подтвердить" />
                    <input style={styles.closeButton} type="button" onClick={closeModal} value="Отмена" />
                </div>
            </form>
        </div>
    </div>
}

export default ModalTodo