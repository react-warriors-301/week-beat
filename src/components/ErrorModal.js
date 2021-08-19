import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';


class ErrorModal extends React.Component {


  
     

render() {
    return (
<>
<Modal show={this.props.showErr} onHide={this.props.hideErr} >
        <Modal.Header closeButton>
        <Image style={{'width':'100px'}} src={'https://getillustrations.com/packs/scarlet-surrealism-illustrations/scenes/_1x/404,%20error%20_%20warning,%20danger,%20alert,%20map,%20location,%20travel_md.png'}/>
          <Modal.Title style={{'color': 'red'}}>ERROR!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            Max must be more tham min value
            Min must be less than Max Value!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.props.hideErr} >
            OK!
          </Button>
          
        </Modal.Footer>
      </Modal>
      <Modal show={this.props.showErr2} onHide={this.props.hideErr} >
        <Modal.Header closeButton>
        <Image style={{'width':'100px'}} src={'https://getillustrations.com/packs/scarlet-surrealism-illustrations/scenes/_1x/404,%20error%20_%20warning,%20danger,%20alert,%20map,%20location,%20travel_md.png'}/>
          <Modal.Title style={{'color': 'red'}}>ERROR!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            Max value you can added is 100!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.props.hideErr} >
            OK!
          </Button>
          
        </Modal.Footer>
      </Modal>
</>
    );
}
}

export default ErrorModal;