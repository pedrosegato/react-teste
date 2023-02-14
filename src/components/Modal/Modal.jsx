import styles from './Modal.module.css'
import Button from '../Button/Button'
import { useEffect, useState } from 'react'

export default function Modal(props) {
    const [toDo, setToDo] = useState('')
    function closeModal() {
        props.setOpen(false)
    }

    function handleKeyPress(event) {
        if(event.key === 'Enter'){
            if (props.itemId) saveItem()
            else addItem()
        }
    }

    useEffect(() => {
        if (props.itemId) setToDo(props.items[props.itemId]) 
    }, [props.itemId])

    function addItem() {
        if (toDo != '') {
            props.setItems(previousItems => {
                previousItems.push(toDo)
                return previousItems
            })
            props.setOpen(false)
            setToDo('')
        }
    }

    function saveItem() {
        if (toDo != '') {
            props.items[props.itemId] = toDo;
            props.setItems([...props.items])
        }
        props.setOpen(false)
    }

    function eraseItem() {
        props.items.splice(props.itemId, 1);
        props.setItems([...props.items])
        props.setOpen(false)
        setToDo('')
    }

    function handleChange(event) {
        setToDo(event.target.value)
    }
    
    return (
        <div className={`${styles['background']} ${props.open ? styles['shown'] : styles['hidden']}`} onClick={closeModal}>
            <div className={styles['modal']} onClick={e => {e.stopPropagation()}}>
                <div className={styles['modal-header']}>
                    <h3>{props.itemId ? 'Editar tarefa ' + props.items[props.itemId] : 'Nova tarefa!'}</h3>
                </div>

                <div className={styles['modal-content']}>
                    {!props.itemId && (<label className={styles['modal-input-label']} htmlFor='todo'>O que você vai fazer hoje?</label>)}
                    <input id='todo' className={styles['modal-input']} type='text' placeholder='Ex.: Trocar tiro com a Polícia Militar :)' value={toDo} onChange={handleChange} onKeyDown={handleKeyPress} />
                </div>

                <div className={styles['modal-footer']}>
                    <Button color='black' onClick={closeModal}>Cancelar</Button>
                    {props.itemId ? (
                    <>
                        <Button color='black' onClick={eraseItem}>Excluir</Button>
                        <Button color='black' onClick={saveItem}>Salvar</Button>
                    </>
                    ) : <Button color='black' onClick={addItem}>Criar</Button>}
                </div>
            </div>
        </div>
    )
}