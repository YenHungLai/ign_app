// TODO:
//  latest posts, what goes on there???
//  Use async and await if have time
// tailwind build ./src/tailwind.src.css -c ./tailwind.js -o .src/tailwind.css

import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import './tailwind.css';

import Articles from './components/articles'
import Videos from './components/videos'
import Latest from './components/latest'

class App extends Component {
  constructor() {
    super()
    this.state = {
      content: [],
      comments: [],
      tabs: ''
    }
  }

  async componentDidMount() {
    // Get content from API
    await axios.get('https://cors-anywhere.herokuapp.com/https://ign-apis.herokuapp.com/content', {params: {count: 20}})
      .then((res) => {
        console.log('contents', res);
        this.setState({content: res})
      })

    // Extract data field from content.
    const {data: {data}} = this.state.content
    // Get ids of content to get comments for each post.
    const ids = data.map((item) => {
      return item.contentId
    })
    console.log(ids);

    // Get comment for each post using their id.
    await axios.get('https://cors-anywhere.herokuapp.com/https://ign-apis.herokuapp.com/comments', {params: { ids } })  // Object literal
      .then(res => {
        console.log(`comments`, res);
        this.setState({comments: res})
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleClick = (event) => {
    this.setState({
      tabs: event.target.value
    })
  }

  render() {
    // conditionally render tabs
    let tab;
    switch (this.state.tabs) {
      case 'article':
        tab = <Articles content={this.state.content} comments={this.state.comments} />
        break;
      case 'videos':
        tab = <Videos content={this.state.content} comments={this.state.comments} />
        break;
      case 'latest':
        tab = <Latest content={this.state.content} comments={this.state.comments} />
        break;
      default:
    }

    return (
      <div className='container mx-auto'>
        <h1 className='heading'>Latest News</h1>
        <div className='flex lg:flex-row flex-col'>
          <div className='tabs-group'>
            <button className='btn tabs'
              onClick={this.handleClick} value='latest'>
              <i className="fas fa-check-circle text-grey"></i><span>&nbsp;&nbsp;&nbsp;</span>
              Latest</button>

            <button className='btn tabs'
              onClick={this.handleClick} value='videos'>
              <i className="fas fa-play text-grey"></i><span>&nbsp;&nbsp;&nbsp;</span>
              Videos</button>

            <button className='btn tabs'
              onClick={this.handleClick} value='article'>
              <i className="fas fa-file-alt text-grey"></i><span>&nbsp;&nbsp;&nbsp;</span>
              Article</button>
          </div>
          <div>{tab}</div>
        </div>
      </div>
    );
  }
}

export default App;
