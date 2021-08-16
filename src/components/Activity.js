import React from 'react'
import Dropdown from 'react-bootstrap/DropdownButton'
import Select from 'react-select'
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import ErrorModal from './ErrorModal';
class Activity extends React.Component {
constructor(props){
    super(props);
    this.state={
        actArr:[],
        min:0,
        max:0,
        showCard:false,
        searchQuery:'', 
        showErr: false


    }
}
handleClose = () => {
    this.setState({
        showErr: false
    })
}

change = (event) => {
        this.setState({
            searchQuery:event.value
        })
    }
  maxMin=(event)=>{
    const min=event.target.min.value;
    const max=event.target.max.value;
    event.preventDefault();

    if(min>max || max<min){
        this.setState({
            showErr: true,
            showCard:false
    
        })
    }
else{
    let URL=`http://localhost:3001/activity?type=${this.state.searchQuery}&minprice=${min}&maxprice=${max}`;
    axios
    .get(URL)
    .then(result => {
        this.setState({
            actArr: result.data,
            showCard:true
    
        })
    console.log(this.state.actArr.accessibility)
    
    })
    .catch(err => {
        console.log(err);
    })
        event.preventDefault();
} 
    }

    
  
    render() {
        const types = [

        { value: 'education', label: 'education' },
        { value: 'recreational', label: 'recreational' },
        { value: 'social', label: 'social' },
        { value: 'diy', label: 'diy' },
        { value: 'charity', label: 'charity' },
        { value: 'cooking', label: 'cooking' },
        { value: 'relaxation', label: 'relaxation' },
        { value: 'music', label: 'music' },
        { value: 'busywork', label: 'busywork' }

        ]
     
        return (
            <>  

  <Select options={types}  onChange={this.change} name='select'/>
  <form onSubmit={this.maxMin}>

  <InputGroup className="mb-3">
  <InputGroup.Text>Min and Max budget</InputGroup.Text>
  <FormControl placeholder="Min Budget" name='min' />
  <FormControl placeholder="Max Budget"  name='max'/>
  <Button variant="outline-secondary" id="button-addon2" type='submit'>
                            Button
                        </Button>
</InputGroup>
</form>

{this.state.showCard && 

    
<Card>
    <Card.Header>
        Activity Type: {this.state.actArr.type}
    </Card.Header>
    <Card.Body>
        {this.state.actArr.activity}
    </Card.Body>

    <Card.Footer>
   <h6>this activity needs {this.state.actArr.participants} participant's</h6>
   and it's cost {this.state.actArr.price} 🤑🤑

    </Card.Footer>
</Card>
}
<ErrorModal
                        showErr={this.state.showErr}
                        hideErr={this.handleClose}

                    />
            </>
        )
    }
}

export default Activity;