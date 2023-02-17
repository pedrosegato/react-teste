import { useEffect, useState } from 'react';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import ToDoCard from './components/ToDoCard/ToDoCard';
import './App.css';

function App() {
    const [modalType, setModalType] = useState(null);
    const [items, setItems] = useState([]);
    const [itemId, setItemData] = useState(0);

    function handleModal(type) {
        setModalType(type);
    };

    return (
        <div className="App">
            <Modal items={items} setItems={setItems} type={modalType} itemId={itemId} setModalType={setModalType} />
            <div className='header'>
                <h1>Lista de afazeres</h1>
                <div className='header-button'>
                    <Button color='black' onClick={(e) => {
                        handleModal('add')
                    }}>Adicionar</Button>
                </div>
            </div>
            <div className='content'>
                {items.length == 0 ? <p>Sua lista está vazia.</p> : (items.map((items, id) => (
                    <ToDoCard key={id} id={id} onClick={e => {handleModal('edit'); setItemData(e.target.id)}}>{items}</ToDoCard>
                )))}
            </div>
        </div>
    );
};

export default App;