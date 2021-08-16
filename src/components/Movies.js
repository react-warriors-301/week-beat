import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select'
import Card from 'react-bootstrap/Card'
import Carousel from 'react-grid-carousel'
import Image from 'react-bootstrap/Image'
class Movies extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            searchQuery: '',
            genresArr: [],
            moviesArr:[],
            showSlider:false,
        }
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
                    genresArr: results.data.genres
                })     
                   const needle = this.state.searchQuery;

                for (var i = 0; i < this.state.genresArr.length; i++) {
                    if (this.state.genresArr[i].name == needle) {
                        console.log()
                        const apiUrl = `http://localhost:3001/movies?with_genres=${this.state.genresArr[i].id}`;
                        console.log(apiUrl);
                        axios
                        .get(apiUrl)
                        .then(data=>{
                            this.setState({
                                moviesArr: data.data,
                                showSlider:true
                            })     
                              })
                        .catch(err=>{
                            console.log(err);
                        })
                    }
                }


            })
            .catch(err => {
                console.log(err)
            })

    }



    render() {
        const types = [

            { value: 'Action', label: 'Action' },
            { value: 'Adventure', label: 'Adventure' },
            { value: 'Animation', label: 'Animation' },
            { value: 'Comedy', label: 'Comedy' },
            { value: 'Crime', label: 'Crime' },
            { value: 'Drama', label: 'Drama' },
            { value: 'Family', label: 'Family' },
            { value: 'Fantasy', label: 'Fantasy' },
            { value: 'Horror', label: 'Horror' },
            { value: 'Music', label: 'Music' },
            { value: 'Mystery', label: 'Mystery' },
            { value: 'Romance', label: 'Romance' },
            { value: 'Science Fiction', label: 'Science Fiction' },
        ]
        
        return (
            <>
                <p>Hello from movies</p>
                <Select options={types} onChange={this.change}/>
              

                {this.state.showSlider &&
                <center>
                    <Card>
                    
                    <Carousel cols={3} rows={1} gap={10} loop >

                        {this.state.moviesArr.map(item => {
                            return (
                                <Carousel.Item>
                                <Card.Header>
                                    {item.title}
                                </Card.Header>
                               
                                <img
                                        className="d-block w-100"
                                        src={item.posterPath !== null ? 'https://image.tmdb.org/t/p/original/' + (item.posterPath).split('/')[1] : 'https://sd.keepcalms.com/i-w600/keep-calm-poster-not-found.jpg'}
                                        alt={item.title}
                                        style={{ height: '500px' }}
                                    />
                             
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


export default Movies;
