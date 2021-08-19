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
import Header from './Header';
import CardGroup from 'react-bootstrap/CardGroup'
import CardColumns from 'react-bootstrap/CardColumns'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blogArray: [],
            showCards: false,
            showcard2: false,
            showForm: false,
            newData: [],
            index: 0,
            updateShow: false,
            showNewCard: false,
        }
    }

    selectUpdateBlog = (event) => {

        console.log("from update function");
        this.setState({
            showUpForm: true,
            index: event.target.value,
        })

    }
    closeUpForm = (event) => {
        this.setState({
            showUpForm: false,
        })
    }

    updateBlog = async (event) => {

        event.preventDefault();
        const { user } = this.props.auth0;
        const index = this.state.index
        console.log(event.target)
        const Title = event.target.title.value;
        const desc = event.target.desc.value;
        const updatedData = {
            title: Title || this.state.blogArray.title,
            desc: desc || this.state.blogArray.desc,
            email: user.email,

        };
        console.log(this.props.auth0)
        console.log('updated data are:.....')
        console.log(updatedData);
        axios
            .put(`https://week-beat.herokuapp.com/update/${index}`, updatedData)
            .then((data) => {
                this.setState({
                    newData: data.data
                })
                console.log('hello inside update func', this.state.newData);
            })
            .catch((err) => {
                console.log(err);
                alert(err);
                <h1>error happened</h1>


            })

    }
    showModal = () => {
        this.setState({ showModal: true, updateShow: true });
    };
    hideModal = () => {
        this.setState({ showModal: false, updateShow: false });
    }


    getBlogs = async () => {
        const { isLoading, user, isAuthenticated } = this.props.auth0;
        try {
            console.log(this.props.auth0)
            let URL = `https://week-beat.herokuapp.com/blog?email=${user.email}`;
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


    showForm = (event) => {
        event.preventDefault();
        this.setState({
            showForm: true,
        })
    }
    handleClose = () => {
        this.setState({
            showForm: false
        })
    }



    addBlogs = async (event) => {

        event.preventDefault();
        const URL = `https://week-beat.herokuapp.com/add_blog`

        const Title = event.target.blog.value;
        const desc = event.target.desc.value;
        const { user } = this.props.auth0;


        const blogData = {
            title: Title,
            desc: desc,
            email: user.email,
            name: user.name,
            image: user.picture


        }

        axios
            .post(URL, blogData)
            .then((data) => {
                try {
                    this.setState({
                        newData: data.data,
                        showNewCard: true

                    })
                }
                catch (e) {
                    <>
                        <h1>error happened</h1>
                    </>
                }
                console.log('from  blog function', this.state.newData, this.state.showNewCard);

            })
            .catch((err) => {
                console.log(err);
                alert(err);
                <h1>error happened</h1>

            })
    }

    deleteBlog = (index) => {
        const { user } = this.props.auth0;
        const Data = {
            email: user.email,
            index: index
        }

        axios
            .delete(`https://week-beat.herokuapp.com/deleteBlog/${index}`, { params: Data })
            .then((data) => {
                this.setState({
                    newData: data.data,
                    showNewCard: true

                })
                console.log('hello inside delete func', this.state.showNewCard);
            })
            .catch((err) => {
                console.log(err);
                alert(err);
                <h1>error happened</h1>


            })
    }



    render() {
        const { user, isAuthenticated, isLoading } = this.props.auth0;

        if (isLoading) {
            return <div>
                <center>
                    <img src="https://i.ibb.co/ZG3XLq2/loadergif.gif" alt="loadergif" border="0" style={{ width: '300px' }} />
                </center>
            </div>;
        }

        return (

            <>
                <Header />
                <center>
                    <CardGroup>

                        <Card style={{ width: '25em' }} onClick={this.getBlogs}>
                            <Card.Body>
                                <Card.Title style={{ 'color': 'black' }}>See your Blogs!</Card.Title>
                                <Card.Img variant="top" src='https://www.crissh2020.eu/wp-content/uploads/2018/02/blog-criss.png' />
                            </Card.Body>
                        </Card>

                        <Card style={{ width: '25em' }} onClick={(event) => { this.showForm(event); this.getBlogs(); }}>
                            <Card.Body>
                                <Card.Title style={{ 'color': 'black' }}>Add your Own Blog!</Card.Title>
                                <Card.Img variant="top" src='https://sarahswritestuff.com/wp-content/uploads/2019/03/Article-Writing-Blogs.jpg' />
                            </Card.Body>
                        </Card>
                    </CardGroup>

                </center>
                {


                    this.state.newData[0] !== undefined ?
                        this.state.showNewCard &&
                        <CardGroup>

                                {
                        this.state.newData[0].blog.map((e, idx) => {
                                    { console.log(this.state.newData[0]) }
                                    const { user } = this.props.auth0;

                                    return (

                                        <div key={idx}>

                                            <Card style={{ width: '28rem'  ,height:'32em','margin-right':'25px','margin-left':'30px'}}>
                                                <Card.Img variant="top" src={user.picture} style={{ width: '5em', 'borderRadius': '50px' }} />
                                                <Card.Body>
                                                   <h3> <Card.Header>{e.title}</Card.Header></h3>
                                                    <Card.Text>
                                                        <p>{e.blogText}</p>
                                                    </Card.Text>


                                                </Card.Body>
                                                <Card.Footer>
                                                    <Button style={{'margin-right':'15px','width':'60px'}}variant="danger" onClick={() => {
                                                        this.deleteBlog(idx);
                                                    }}>X</Button>

                                                    <Button style={{'width':'60px'}}variant="warning" value={idx} onClick={this.selectUpdateBlog} className="in">🔧</Button>

                                                </Card.Footer>
                                            </Card>

                                            </div>

                                            )

                                })
                                }
                                </CardGroup>
                        : null
    }
                {


    this.state.blogArray[0] !== undefined ?
        this.state.showcard2 &&

        this.state.blogArray[0].blog.map((e, idx) => {
            { console.log(this.state.blogArray[0]) }
            const { user } = this.props.auth0;

            return (
                <div key={idx}>

                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" style={{ width: '2em', 'borderRadius': '50px' }} src={user.picture} />
                        <Card.Body>
                            <Card.Title>{e.title}</Card.Title>
                            <Card.Text>
                                {e.blogText}

                            </Card.Text>
                            <Card.Footer>
                                <Button variant="danger" onClick={() => {
                                    this.deleteBlog(idx);
                                }}>X</Button>

                                <Button variant="warning" value={idx} onClick={this.selectUpdateBlog} className="in">🔧</Button>

                            </Card.Footer>


                        </Card.Body>
                    </Card>
                </div>
            )

        })
        : null
}



                <Modal
                    show={this.state.showForm}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header>
                        <h3> Adding Blogs Form 😄😎 </h3>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.addBlogs}>
                            <Form.Control type="text" placeholder="Add a Title" name='blog' />

                            <Form.Control type="text" as="textarea" rows={5} placeholder="what do you think about? ..." name='desc' />
                            <Button variant="info" type="submit" onClick={() => { this.handleClose(); this.getBlogs(); }} style={{ width: '70px' }}>
                                Submit
                            </Button>
                        </form>
                        <Button variant="danger" type="submit" onClick={() => { this.handleClose(); }} style={{ width: '70px' }}>
                            Close
                        </Button>
                    </Modal.Body>
                </Modal>

                <UpdateForm show={this.state.showUpForm} close={this.closeUpForm} update={this.updateBlog} />

            </>
        )
    }
}

export default withAuth0(Blog);