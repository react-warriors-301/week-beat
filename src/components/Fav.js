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
import Header from './Header';
import CardGroup from 'react-bootstrap/CardGroup'

class Fav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blogArray: [],
            showCards: false,
            showcard2: false,
            showForm: false,
            newData: [],
            newArr:[],
            showCard4:false,
            newArr2:[],
            showCard3:false


        }
    }


    getMovies = async () => {
        const { user } = this.props.auth0;
        try {
            console.log(this.props.auth0)
            let URL = `http://localhost:3001/blog?email=${user.email}`;
            console.log(URL);
            let data = await axios.get(URL);
            console.log(data);
            this.setState({
                newData: data.data,
                showcard2: true
            })
            console.log('this is data:', data)
        }

        catch (e) {
            if (e.response && e.response.data) {

                console.log('error');
                alert(e);
                <h1>error happened</h1>
            }
        }

    }

    deleteMovie = (index) => {
        const { user } = this.props.auth0;
        const Data = {
            email: user.email,
            index: index
        }

        axios
            .delete(`http://localhost:3001/deletFav/${index}`, { params: Data })
            .then((data) => {
                this.setState({
                    newArr: data.data,
                    showCard4: true

                })
                console.log('hello inside delete func', this.state.showcard2);
            })
            .catch((err) => {
                console.log(err);
                alert(err);
                <h1>error happened</h1>


            })
    }

    deleteRes = (index) => {
        const { user } = this.props.auth0;
        const Data = {
            email: user.email,
            index: index
        }

        axios
            .delete(`http://localhost:3001/deleteRes/${index}`, { params: Data })
            .then((data) => {
                this.setState({
                    newArr2: data.data,
                    showCard3: true

                })
                console.log('hello inside delete func', this.state.showcard2);
            })
            .catch((err) => {
                console.log(err);
                alert(err);
                <h1>error happened</h1>
            })
}

    componentDidMount() {
        setTimeout(() => {
            this.getMovies();
        }, 3000);
    }

    render() {


        const { isLoading } = this.props.auth0;

        if (isLoading) {
            return <div>
                <center>
                    <img src="https://i.ibb.co/ZG3XLq2/loadergif.gif" alt="loadergif" border="0" style={{ width: '300px' }} />
                </center>
            </div>;
        }
        return (
            <>
            <Header/>

              

                    {this.state.newData[0] !== undefined ?


                    this.state.showcard2 &&  
                    <>
                    <Card.Text className="khair2" style={{'margin':'20px'}}>
                Your Favorite Movies
                  </Card.Text>
                                              <CardGroup>

                    {this.state.newData[0].movies.map((e, idx) => {

                        return (
                            <CardGroup>

                            <Card style={{ width: '29em' ,height:'20em','margin-right':'15px','margin-left':'5px' }}>
                            <center>
                                <Card.Img variant="top" style={{ width: '15em',height:'10em' }} src={e.posterPath} />
                                
                                <Card.Body>
                                    <Card.Title style={{color:'white'}}>{e.title}</Card.Title>

                                    <Button variant="danger" onClick={() => {
                                        this.deleteMovie(idx);
                                        this.getMovies();
                                    }}>X</Button>  
                                    
                                    </Card.Body> 
                              </center>      

                            </Card>
                            </CardGroup>


                        )

                    })}
                            </CardGroup>
                            </>
                    : null
                }

            
                
                {
                    this.state.newData[0] !== undefined ?

                    this.state.newData &&
                    this.state.showcard2 &&
                    <>
                    <Card.Text className="khair2" style={{'margin':'20px'}}>
                Your Favorite Restaurants
                  </Card.Text>
                    <CardGroup>
                    {this.state.newData[0].res.map((e,idx) => {

                        return (
                            <CardGroup>
                            <Card style={{ width: '29em' ,height:'20em','margin-right':'15px','margin-left':'5px' }}>
                            <center>
                                <Card.Img variant="top" style={{ width: '15em'}} src={e.image} />
                                </center>
                                <Card.Body>
                                    <Card.Title style={{color:'white'}}>{e.name}</Card.Title>

                                    <Button variant="danger" onClick={() => {
                                        this.deleteRes(idx);
                                        this.getMovies();

                                    }}>X</Button>                                </Card.Body>
                            </Card>
                            </CardGroup>
                        )

                    })}
                    </CardGroup>
                    </>
                    :null
                    
                }

    
            </>
        )
    }
}

export default withAuth0(Fav);