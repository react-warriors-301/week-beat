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
import "../CSS/Activity.css";
import Header from './Header';
import { withAuth0 } from '@auth0/auth0-react';

class Activity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            actArr: [],
            min: 0,
            max: 0,
            showCard: false,
            searchQuery: '',
            showErr: false,
            loaded:false,
            showErr2:false,
        }
    }
    handleClose = () => {
        this.setState({
            showErr: false
        })
    }
    change = (event) => {
        this.setState({
            searchQuery: event.value,
            loaded:true
        })
    }
    maxMin = (event) => {
        const min = Number(event.target.min.value);
        const max = Number(event.target.max.value);
        event.preventDefault();
       
        if (min > max) {
            this.setState({
                showErr: true,
                showCard: false,
            
            })
        }
    
        else {
            //let URL = `http://localhost:3001/activity?type=${this.state.searchQuery}&minprice=${min}&maxprice=${max}`;
            //https://week-beat.herokuapp.com
            let URL = `https://week-beat.herokuapp.com/activity?type=${this.state.searchQuery}&minprice=${min}&maxprice=${max}`;
            axios
                .get(URL)
                .then(result => {
                    this.setState({
                        actArr: result.data,
                        showCard: true
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
        const { user, isAuthenticated, isLoading } = this.props.auth0;
        { if(this.state.loaded===false){
            <center>

<img src="https://i.ibb.co/72rKF5Q/Wizard-Preloader-by-Aslan-Almu-unscreen.gif" alt="loadergif" border="0" style={{ width: '300px' }} />
       </center>}
       }
if (isLoading) {
  return <div>
      <center>
      
          <img src="https://i.ibb.co/72rKF5Q/Wizard-Preloader-by-Aslan-Almu-unscreen.gif" alt="loadergif" border="0" style={{ width: '300px' }} />
      </center>
  </div>;
}
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
            <Header/>
                <div className="pagebackground">
                    <section className="section1">
                        <Select options={types} onChange={this.change} name='select' />
                        <form onSubmit={this.maxMin}>
                            <InputGroup className="mb-3">
                                <InputGroup.Text className="label">Min and Max budget</InputGroup.Text>
                                <FormControl placeholder="Min Budget" name='min' />
                                <FormControl placeholder="Max Budget" name='max' />
                                <Button variant="warning" id="button-addon2" type='submit' className="btn2">
                                    SHOW!
                                </Button>
                            </InputGroup>
                        </form>
                    </section>
                    <section className="section1">
                        <img src="https://hmp.me/do1k" alt='activity' className="img"></img>
                    </section>
                    <center>
                    {this.state.showCard &&
                        <Card style={{ width: '25rem',height:'30em' }}>
                            <Card.Header>
                               <h6> Activity Type: {this.state.actArr.type}</h6>
                            </Card.Header>
                            <Card.Body style={{'margin-top':'50px'}}>
                                <h4>{this.state.actArr.activity}</h4>
                               
                            </Card.Body>
                            <Card.Footer>
                                <h6>this activity needs {this.state.actArr.participants} participant's</h6>
                               <h5>and it's cost {this.state.actArr.price}🤑🤑</h5>
                            </Card.Footer>
                        </Card>
                    }
                    </center>
                    <ErrorModal
                        showErr={this.state.showErr}
                        hideErr={this.handleClose}
                        showErr2={this.state.showErr2}
                    />
                </div>
            </>
        )
    }
}
export default withAuth0(Activity);