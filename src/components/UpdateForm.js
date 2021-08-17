import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


class UpdateForm extends React.Component{
  
    


    render(){
        return(
            <div>
                <Modal
                
                size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                 centered  
                 show={this.props.show}
                 onHide={this.props.close}>
        <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter">
          Update Blog Data
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <form onSubmit={this.props.update}>  
        <Form.Control type="text" placeholder="Edit the Title"  name="title"/>   
        <Form.Control type="text" placeholder="Edit Description"  name="desc"/>
       
    <br/>
     <Button variant="warning" type="submit" >
       Update
      </Button>
     </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={this.props.close}>Close</Button>
      </Modal.Footer>
    </Modal>
            </div>
        )
    }
}

export default UpdateForm;