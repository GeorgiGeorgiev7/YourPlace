import styles from './Card.module.css';


const Card = props => {
  return (
    <div className={`${styles.card} ${styles[props.className]}`} style={props.style}>
      {props.children}
    </div>
  );
};

export default Card;