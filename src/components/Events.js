import React from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Carousel from 'react-grid-carousel'
import Image from 'react-bootstrap/Image'

class Event extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventArray: [],
            showSlider:false

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
                    showSlider:true

                })


            })
            .catch(err => {
                console.log(err);
            })
    }
    render() {

        return (
            <>
                <form onSubmit={this.getEvents}>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Recipient's username"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            name='name'
                        />
                        <Button variant="outline-secondary" id="button-addon2" type='submit'>
                            Button
                        </Button>
                    </InputGroup>
                </form>
                {this.state.showSlider &&
                <center>
                    <Card>
                    
                    <Carousel cols={3} rows={1} gap={10} loop >

                        {this.state.eventArray.map(item => {
                            return (
                                <Carousel.Item>
                                <Card.Header>
                                    {item.title}
                                </Card.Header>
                                <Card.Text>
                                <h6>Start Date :{item.date.start_date}
</h6>
                                   <h5>on {item.date.when}</h5>
                                </Card.Text>
                                <a href={item.link}>

                                    <Image width="80%" src={item.thumbnail} />
                                    </a>
                                <Card.Footer>
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

export default Event;