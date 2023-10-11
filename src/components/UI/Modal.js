import { Fragment } from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

const BackDrop = props => {
    return <div onClick={props.onClick} className={classes.backdrop}></div>
};

const ModalOverlay = props => {
    return (
        <div className={classes.modal}>
            <div>{props.children}</div>
        </div>
    )
};

const portalElement = document.getElementById('modal-root');

const Modal = props => {
    return (
        <Fragment>
            {ReactDOM.createPortal(<BackDrop onClick={props.onClick} />, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </Fragment>
    )
}

export default Modal;
