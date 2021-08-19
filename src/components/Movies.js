import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select'
import Card from 'react-bootstrap/Card'
import Carousel from 'react-grid-carousel'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import { withAuth0 } from '@auth0/auth0-react';
import Header from './Header';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../CSS/movies.css'
import AddedModal from './AddedModal';
//import Carousel from 'react-bootstrap/Carousel'
class Movies extends React.Component {
    // const {isAthenticated}  
           

    constructor(props) {
        super(props)
        this.state = {
            searchQuery: '',
            genresArr: [],
            moviesArr: [],
            postArr: [],
            showSlider: false,
            Arr: [],
            loaded:false,
            show:false,
        }
    }
    addFavoriteMov = (e) => {
        e.preventDefault();
        const URLS = `http://localhost:3001/addmovies`
        const title = e.target.name.alt;
        const posterPath = e.target.name.src;
        const { user } = this.props.auth0;
        const releaseData=e.target.releaseData;
        const popularity= e.target.popularity;
        const voteAverage= e.target.voteAverage;
       const  vote_count=e.target.vote_count;
        const overView =e.target.overView;
            // console.log('hello from button function ');
            const movieData = {
                email: user.email,
                title: title,
                posterPath: posterPath,
                releaseData:releaseData,
                popularity:popularity,
                voteAverage:voteAverage,
                vote_count:vote_count,
                overView:overView,
            }
        console.log('I am movies Data!', movieData);
        axios
            .post(URLS, movieData)
            .then(element => {
                try {
                    this.setState({
                        postArr: element.data,
                        show:true
                    })
                } catch (error) {
                    <>
                        <h3>you are in first catch database Error </h3>
                    </>
                }
                console.log('from movies DataBase ', this.state.postArr);
            }).catch((err) => {
                console.log(err);
            })
    }
    change = (event) => {
        this.setState({
            searchQuery: event.value
        })
        const URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=0e5327d70dbe2dded2da12c023cf7885`;
        axios
            .get(URL)
            .then(results => {
                this.setState({
                    genresArr: results.data.genres,
                    loaded:true
                })
                const needle = this.state.searchQuery;
                for (var i = 0; i < this.state.genresArr.length; i++) {
                    if (this.state.genresArr[i].name == needle) {
                        console.log()
                        const apiUrl = `http://localhost:3001/movies?with_genres=${this.state.genresArr[i].id}`;
                        console.log(apiUrl);
                        axios
                            .get(apiUrl)
                            .then(data => {
                                this.setState({
                                    moviesArr: data.data,
                                    showSlider: true
                                })
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    }
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    renderMovies = () => {
        let arr = [28, 27, 53, 878, 9648];
        let mov = []

        for (let x = 0; x < 5; x++) {
            const apiUrl = `http://localhost:3001/movies?with_genres=${arr[x]}`;
            console.log(apiUrl);
            axios
                .get(apiUrl)
                .then(data => {
                    mov.push(data.data[0]);
                    console.log(data.data[0])
                    this.setState({
                        Arr: mov,
                        showC: true
                    })
                    console.log(this.state.Arr)

                })
                .catch(err => {
                    console.log(err);
                })
        }
        console.log('best', mov)

    }

    
    componentDidMount = () => {
        this.renderMovies();
        console.log(this.state.Arr)


    }
    handleClose = () => {
      this.setState({
          show: false
      })
  }

    render() {
      { if(this.state.loaded===false){
        <center>

<img src="https://i.ibb.co/mtxXsdB/gif-animations-replace-loading-unscreen.gif" alt="loadergif" border="0" style={{ width: '300px' }} />
   </center>}
   }
      const { user, isAuthenticated, isLoading } = this.props.auth0;

      if (isLoading) {
        return <div>
            <center>
            
                <img src="https://i.ibb.co/mtxXsdB/gif-animations-replace-loading-unscreen.gif" alt="loadergif" border="0" style={{ width: '300px' }} />
            </center>
        </div>;
    }

        //const fArr =[];
        //{fArr.push(this.state.Arr)}
        const types = [
            { value: "Action", label: "Action" },
            { value: "Adventure", label: "Adventure" },
            { value: "Animation", label: "Animation" },
            { value: "Comedy", label: "Comedy" },
            { value: "Crime", label: "Crime" },
            { value: "Drama", label: "Drama" },
            { value: "Family", label: "Family" },
            { value: "Fantasy", label: "Fantasy" },
            { value: "Horror", label: "Horror" },
            { value: "Music", label: "Music" },
            { value: "Mystery", label: "Mystery" },
            { value: "Romance", label: "Romance" },
            { value: "Science Fiction", label: "Science Fiction" },
        ];
        return (
            <>
            <Header/>
            <center>
            <Select
              options={types}
              onChange={this.change}
              className="selectMovies"
            />
            </center>
            <div>
              <Card className="recommend">
                <Card.Img variant="top" src="" className="Movie" />
                <Card.Body>
                  <Card.Text className="khair2">
                    Most Recommended Movies
                  </Card.Text>
                </Card.Body>
              </Card>
              <br />
              <br />
            </div>
            {
              <center>
              
                <Card style={{ width: "60rem" }} className="cards">
                  <Carousel cols={1} rows={1} gap={10} loop>
                    {this.state.Arr.map((item) => {
                      return (
                        <Carousel.Item>
                          <Card.Header name="name" style={{color:'white'}}>{item.title}</Card.Header>
                          <form onSubmit={this.addFavoriteMov}>
                            <img
                              name="name"
                              className="d-block w-100"
                              alt={item.title}
                              src={
                                item.posterPath !== null
                                  ? "https://image.tmdb.org/t/p/original/" +
                                    item.posterPath.split("/")[1]
                                  : "https://sd.keepcalms.com/i-w600/keep-calm-poster-not-found.jpg"
                              }
                              style={{ height: "65em" }}
                            />
                          </form>
                        </Carousel.Item>
                      );
                    })}
                  </Carousel>
                </Card>
              </center>
            }
            {console.log(this.state.Arr)}
           
            {<br></br>}
            {this.state.showSlider &&

<center>
    <Card >
        <Carousel cols={3} rows={1} gap={10} loop >
            {this.state.moviesArr.map(item => {
                return (
                    <Carousel.Item >
                        <Card.Header name='name'>
                            {item.title}
                        </Card.Header>
                        <form onSubmit={this.addFavoriteMov}>
                            <img
                                name='name'
                                className="d-block w-100"
                                src={item.posterPath !== null ? 'https://image.tmdb.org/t/p/original/' + (item.posterPath).split('/')[1] : 'https://sd.keepcalms.com/i-w600/keep-calm-poster-not-found.jpg'}
                                alt={item.title}
                                style={{ height: '500px' }}
                            />

                         
                            <div maxlength="137" className="card-text" style={{color:'white'}}> {item.overView} </div>
                            <small id="popularity" class="text-muted">Popularity :{item.popularity}</small><br/>
                            <small class="text-muted">Vote Average :{item.voteAverage}</small><br/>
                            <small class="text-muted">Vote Count :{item.vote_count}</small><br/>
                            <small class="text-muted">Release Data:{item.releaseData}</small><br/>


                            <Button variant="danger" id="button-addon2" type='submit'>🤍</Button>

                        </form>
                    </Carousel.Item>
                    
                )
            })}
        </Carousel>
    </Card>
</center>
} 
<AddedModal
                        show={this.state.show}
                        hide={this.handleClose}
                    />
          </>
        );
      }
    }
    export default withAuth0(Movies);