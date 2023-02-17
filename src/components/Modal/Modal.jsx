import styles from './Modal.module.css';
import Button from '../Button/Button';
import { useEffect, useState } from 'react';

export default function Modal(props) {
    const [toDo, setToDo] = useState('');

    useEffect(() => {
        if (props.itemId) setToDo(props.items[props.itemId]) ;
    }, [props.itemId]);

    const examples = [
        'Trocar água do cachorro',
        'Tirar o lixo',
        'Lavar a louça',
        'Ir às compras',
        'Trocar tiro com a Polícia Militar',
    ];

    function closeModal() {
        props.setModalType(null);
        setToDo('');
    };

    function addItem() {
        if (toDo != '') {
            props.setItems(previousItems => {
                previousItems.push(toDo);
                return previousItems;
            })
            closeModal();
        };
    };

    function saveItem() {
        if (toDo != '') {
            props.items[props.itemId] = toDo;
            props.setItems([...props.items]);
        };
        closeModal();
    };

    function eraseItem() {
        props.items.splice(props.itemId, 1);
        props.setItems([...props.items]);
        closeModal();
    };

    function handleChange(event) {
        setToDo(event.target.value);
    };

    function handleKeyPress(event) {
        if(event.key === 'Enter'){
            if (props.itemId) saveItem();
            else addItem();
        };
    };

    if (props.type === 'edit') {
        console.log('oi');
        return (
            <div className={styles['background']} onClick={closeModal}>
                <div className={styles['modal']} onClick={e => {e.stopPropagation()}}>
                    <div className={styles['modal-header']}>
                        <h3>Editar tarefa {props.items[props.itemId]}</h3>
                    </div>

                    <div className={styles['modal-content']}>
                        <input id='todo' className={styles['modal-input']} type='text' value={toDo} onChange={handleChange} onKeyDown={handleKeyPress} />
                    </div>

                    <div className={styles['modal-footer']}>
                        <Button color='black' onClick={closeModal}>Cancelar</Button>
                        <Button color='black' onClick={eraseItem}>Excluir</Button>
                        <Button color='black' onClick={saveItem}>Salvar</Button>
                    </div>
                </div>
            </div>
        );
    } else if (props.type === 'add') {
        return(
            <div className={styles['background']} onClick={closeModal}>
                <div className={styles['modal']} onClick={e => {e.stopPropagation()}}>
                    <div className={styles['modal-header']}>
                        <h3>Nova tarefa!</h3>
                    </div>

                    <div className={styles['modal-content']}>
                        <label className={styles['modal-input-label']} htmlFor='todo'>O que você vai fazer hoje?</label>
                        <input id='todo' className={styles['modal-input']} type='text' placeholder={`Ex.: ${examples[Math.floor(Math.random() * examples.length)]}`} value={toDo} onChange={handleChange} onKeyDown={handleKeyPress} />
                    </div>

                    <div className={styles['modal-footer']}>
                        <Button color='black' onClick={closeModal}>Cancelar</Button>
                        <Button color='black' onClick={addItem}>Criar</Button>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <></>
        );
    };
};