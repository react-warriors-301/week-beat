import React from 'react'
import Activity from './Activity'
import Events from './Events'
import Movies from './Movies'
import axios from "axios";
import { withAuth0 } from '@auth0/auth0-react';
import Restaurants from './Restaurants'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import UpdateForm from './UpdateForm';
import Carousel from 'react-grid-carousel'
import MainHeader from './MainHeader';
import Header from './Header';
import Main from './Main';
import '../CSS/Home.css'
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newData: [],
        }
    }
    getBlogs = async () => {
        try {
            let URL = `https://week-beat.herokuapp.com/all`;
            console.log(URL);
            let data = await axios.get(URL);

            this.setState({
                newData: data.data,
                showNewCard: true
            })
            console.log('this is data:', this.state.newData)
        }

        catch (e) {
            if (e.response && e.response.data) {

                console.log('error');
                alert(e);
                <h1>error happened</h1>
            }
        }

    }
    componentDidMount() {
        this.getBlogs();
    }
    render() {
        return (
            <div>
            <MainHeader/>

                {
                    this.state.newData.map((item, idx) => {
                        {

                            if (item.blog.length !== 0) {
                                console.log(item.email);

                                return (
                                    <>
                                        {
                                            <center>

                                            <Card style={{'margin-top':'50px','height':'50em'}}>
                                            <Carousel cols={3} rows={1} gap={30} loop style={{'height':'50em'}} >
                                                    {

                                                        item.blog.map(e => {
                                                            console.log(e);
                                                            return (

                                                                <Carousel.Item className="card">
                                                            
                                                               
<Card style={{'margin-top':'50px','height':'50em','background':'rgb(248, 248, 239)'}}>  

       <center>

   {
                                                                    e.image? <img src={e.image} alt={e.name} variant="top" style={{ width: '8em', 'borderRadius': '50px' }}/>
                                                                    :<img src='https://st2.depositphotos.com/1009634/7235/v/950/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg' alt={e.name} variant="top" style={{ width: '2em', 'borderRadius': '50px' }}/>
                                                                    }
                                                                    </center>
                                                                    <Card.Text>
                                                                       <h6>{e.name?e.name: <>user name unknown</>}</h6> 
                                                                    </Card.Text>

                                                                    <Card.Header className='hC'>
                                                                       <h5> {e.title}</h5>
                                                                    </Card.Header>
                                                                    <Card.Body className="card-body">
                                                                        <b><Card.Text style={{'margin-top':'40px',fontSize:'12px'}}>
                                                                            {e.blogText}
                                                                        </Card.Text></b>
                                                                    </Card.Body>
                                                                    </Card>
                                                                </Carousel.Item>

                                                            )
                                                        })

                                                    }
                                                </Carousel>

                                            </Card>
                                            </center>
                                        }

                                    </>

                                )

                            }



                        }
                    })
                }





            </div>
        )
    }
}

export default Home;