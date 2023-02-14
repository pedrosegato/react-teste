import styles from './ToDoCard.module.css'

export default function ToDoCard(props) {
    return (
        <div id={props.id} className={styles['todocard']} onClick={props.onClick}>
            <p id={props.id}>{props.children}</p>
        </div>
    )
}