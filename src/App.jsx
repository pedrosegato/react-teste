import { useEffect, useState } from 'react'
import Button from './components/Button/Button'
import Modal from './components/Modal/Modal'
import ToDoCard from './components/ToDoCard/ToDoCard'
import './App.css'

function App() {
    const [open, setOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false)
    const [items, setItems] = useState([])
    const [itemId, setItemData] = useState(0)

    function openModal() {
        setOpen(true)
    }

    function handleEdit(event) {
        setEditOpen(true)
        setItemData(event.target.id)
    }

    return (
        <div className="App">
            {items.length > 0 && (
                <Modal open={editOpen} setOpen={setEditOpen} items={items} setItems={setItems} itemId={itemId} />
            )}
            <Modal open={open} setOpen={setOpen} items={items} setItems={setItems} />
            <div className='header'>
                <h1>Lista de afazeres</h1>
                <div className='header-button'>
                    <Button color='black' onClick={openModal}>Adicionar</Button>
                </div>
            </div>
            <div className='content'>
                {items.length == 0 ? <p>Sua lista está vazia.</p> : (items.map((items, id) => (
                    <ToDoCard key={id} id={id} onClick={handleEdit}>{items}</ToDoCard>
                )))}
            </div>
        </div>
    )
}

export default App
