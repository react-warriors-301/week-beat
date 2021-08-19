import React from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Carousel from 'react-grid-carousel'
import Image from 'react-bootstrap/Image'
import Header from './Header';
import '../CSS/event.css'
import { withAuth0 } from '@auth0/auth0-react';

class Event extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventArray: [],
            showSlider:false,
            loaded:false

        }
    }

    getEvents = (event) => {
        event.preventDefault();
        const searchQuery = event.target.name.value;
        console.log(searchQuery);
        const url = `http://localhost:3001/events?country=${searchQuery}`;
        axios
            .get(url)
            .then(result => {
                this.setState({
                    eventArray: result.data,
                    showSlider:true,
                    loaded:true

                })


            })
            .catch(err => {
                console.log(err);
            })
    }
    render() {  
        
        
        const { isLoading } = this.props.auth0;
     if (isLoading) {
          return <div>
              <center>
              
                  <img src="https://i.ibb.co/mzh0nZK/681dd2c6e0f1b52a9a5dc7c995b14e-unscreen.gif" alt="loadergif" border="0" style={{ width: '300px' }} />
              </center>
          </div>;
      }
      /*   { if(this.state.loaded===true){
            this.state.loaded=false;
 return <center>
<img src="https://i.ibb.co/mzh0nZK/681dd2c6e0f1b52a9a5dc7c995b14e-unscreen.gif" alt="loadergif" border="0" style={{ width: '300px' }} />
       </center>}
      
       } */
   
       return (
            <>
                        <Header/>

            <br/>
            <center>
            <h4>Enter your location to show you the most </h4>
            <h6>           Entertaining events around you:</h6>
            </center>
                
            <br/>
                <form onSubmit={this.getEvents}>
                    <InputGroup className="locationEvent">
                        <FormControl
                            placeholder="Enter your location"
                            aria-label="Enter your location"
                            aria-describedby="basic-addon2"
                            name='name'
                        />
                        <Button variant="outline-secondary" id="button-addon2" type='submit' className="button2">
                            Button
                        </Button>
                    </InputGroup>
                    <br/>
                </form>
                {this.state.showSlider &&
                <center>
                    <Card className="eventsCards">
                    <Carousel cols={3} rows={1} gap={10} loop >
                        {this.state.eventArray.map(item => {
                            return (
                                <Carousel.Item>
                                <Card.Header style={{color:'white'}}>
                                    {item.title}
                                </Card.Header>
                                <Card.Text>
                                <h6>Start Date :{item.date.start_date}
</h6>
                                   <h5>on {item.date.when}</h5>
                                </Card.Text>
                                <a href={item.link}>
                                    <Image width="80%"  height='60%' src={item.thumbnail} />
                                    </a>
                                <Card.Footer style={{color:'white'}}>
                                        <h6>{item.address[1]}</h6>
                                        {item.address[0]}
                                    </Card.Footer>
                                </Carousel.Item>
                            )
                        })}
                    </Carousel>
                  </Card>
                  </center>
  }
            </>
        )
    }
}
export default withAuth0(Event);
