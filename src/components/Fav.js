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
                <h1>Your Favorite Movies</h1>
                {
                    this.state.newData[0] !== undefined ?


                    this.state.showcard2 &&
                    this.state.newData[0].movies.map((e, idx) => {

                        return (
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" style={{ width: '5em' }} src={e.posterPath} />
                                <Card.Body>
                                    <Card.Title>{e.title}</Card.Title>

                                    <Button variant="danger" onClick={() => {
                                        this.deleteMovie(idx);
                                        this.getMovies();
                                    }}>X</Button>                            </Card.Body>
                            </Card>
                        )

                    })
                    : null
                }

                {
                    this.state.newArr[0] !== undefined ?


                    this.state.showCard4 &&
                    this.state.newArr[0].movies.map((e, idx) => {

                        return (
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" style={{ width: '5em' }} src={e.posterPath} />
                                <Card.Body>
                                    <Card.Title>{e.title}</Card.Title>

                                    <Button variant="danger" onClick={() => {
                                        this.deleteMovie(idx);
                                        this.getMovies();
                                    }}>X</Button>                            </Card.Body>
                            </Card>
                        )

                    })
                    : null
                }
                <h1>Your Favorite Restaurants</h1>

                {
                    this.state.newData[0] !== undefined ?

                    this.state.newData &&
                    this.state.showcard2 &&
                    this.state.newData[0].res.map((e,idx) => {

                        return (
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" style={{ width: '5em' }} src={e.image} />
                                <Card.Body>
                                    <Card.Title>{e.name}</Card.Title>

                                    <Button variant="danger" onClick={() => {
                                        this.deleteRes(idx);
                                        this.getMovies();

                                    }}>X</Button>                                </Card.Body>
                            </Card>
                        )

                    })
                    :null
                }

                {
                    this.state.newArr2[0] !== undefined ?


                    this.state.showCard3 &&
                    this.state.newArr2[0].movies.map((e, idx) => {

                        return (
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" style={{ width: '5em' }} src={e.posterPath} />
                                <Card.Body>
                                    <Card.Title>{e.title}</Card.Title>

                                    <Button variant="danger" onClick={() => {
                                        this.deleteMovie(idx);
                                        this.getMovies();
                                    }}>X</Button>                            </Card.Body>
                            </Card>
                        )

                    })
                    : null
                }
            </>
        )
    }
}

export default withAuth0(Fav);