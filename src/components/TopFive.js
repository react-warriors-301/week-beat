import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'

// import Carousel from 'react-grid-carousel';

class TopFive extends Component {




    topRates = (restaurantsArray) => {
        let answer = restaurantsArray.sort((a, b) => b.rating - a.rating).slice(0, 5);

        console.log(answer, "array of top 5");
        return answer;
    }



    render() {
        return (

                <center>
                        <Card style={{ width: '60rem' }}>
                    <Carousel >
                        {this.topRates(this.props.restaurantsArray).map((item) => {
                            return (
                                <Carousel.Item key={item.name}>
                                    <img
                                        className="d-block w-100"
                                        src={item.image}
                                        alt={item.name}
                                        style={{ height: '40em' }}

                                    />
                                    <Carousel.Caption>
                                        <h3>{item.name}</h3>
                                        <p>Rating : {item.rating}</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            );
                        })}
                    </Carousel>
                    </Card>
                </center>
        )
    }

}


export default TopFive;