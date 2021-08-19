import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';


class AddedModal extends React.Component {


  
     

render() {
    return (
<>
<Modal show={this.props.show} onHide={this.props.hide} >
        <Modal.Header closeButton>
        <Image style={{'width':'100px'}} src={'https://i.ibb.co/R3PC4bn/sponge.gif'}/>
          <Modal.Title style={{'color': 'yellow'}}>ADDED!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Your Favorite Added Successfuly
          Go To The My Favorite Tab To See Them!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={this.props.hide} >
            OK!
          </Button>
          
        </Modal.Footer>
      </Modal>
    
</>
    );
}
}

export default AddedModal;