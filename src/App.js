// TODO:
//  time created
//  latest posts

import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import './tailwind.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      content: [],
      comments: [],
      articles: [],
      videos: [],
      latest: [],
      tabs: ''
    }
  }

  async componentDidMount() {
    // get data from API
    await axios.get('https://cors-anywhere.herokuapp.com/https://ign-apis.herokuapp.com/content', {params: {count: 20}})
      .then((res) => {
        console.log('contents', res);
        this.setState({content: res})
      })

    const {data: {data}} = this.state.content
    const ids = data.map((item) => {
      return item.contentId
    })
    console.log(ids);

    await axios.get('https://cors-anywhere.herokuapp.com/https://ign-apis.herokuapp.com/comments', {params: { ids } })  // object literal
      .then(res => {
        console.log(`comments`, res);
        this.setState({comments: res})
      })
      .catch(err => {
        console.log(err);
      })

    this.setState({articles: this.getArticles()})
    this.setState({videos: this.getVideos()})
    this.setState({latest: this.getLatest()})
  }

  // get articles
  getArticles = () => {
    // object destructuring
    const {data: {data}} = this.state.content
    console.log(`data`, data);

    // filter out articles
    let articles = data.filter(item => item.contentType === 'article')
    // articles = articles.sort((a, b) => {return a.metadata.publishDate - b.metadata.publishDate})
    console.log(articles);

    // get article images
    let result = []

    articles.forEach((article, index) => {
      const comment = this.state.comments.data.content.filter(item => item.id === article.contentId)
      const publishTime = new Date(article.metadata.publishDate)
      console.log(publishTime);
      // console.log(comment);

      // get 1 image
      result.push(
        <div className='flex border border-solid border-t-0 border-l-0 border-r-0 p-3' key={index}>
          <img src={article.thumbnails[0].url} alt='not found' key={index}/>

          <div className='flex flex-col ml-5'>
            <div className='text-red font-bold'>
              <label>{publishTime.getDate()}th, {publishTime.getHours()}:{publishTime.getMinutes()}</label>
              <span className='fa-stack fa-1x'>
                <i className="fas fa-comment text-red fa-stack-1x"></i>
                <i className="fas fa-comment text-white fa-stack-1x fa-xs"></i>
              </span>
              <label>{comment[0].count}</label>
            </div>
            <h3 className='hover:text-purple hover:underline'>{article.metadata.headline}</h3>
          </div>
        </div>
      )
      // each article has 3 images
      // article.thumbnails.forEach((item, index) => {
      //   art_images.push(<img src={item.url} alt='not found' key={index}/>)
      // })
    })
    // console.log(art_images);
    return result
  }

  getVideos = () => {
    // object destructuring
    const {data: {data}} = this.state.content
    // console.log(`data`, data);

    // filter out videos
    const videos = data.filter(item => item.contentType === 'video')
    console.log(`video`, videos);

    let result = []
    videos.forEach((video, index) => {
      const comment = this.state.comments.data.content.filter(item => item.id === video.contentId)
      const publishTime = new Date(video.metadata.publishDate)
      const {duration} = video.metadata
      const minutes = Math.floor(duration/60)
      let seconds = duration % 60
      if(seconds < 10) seconds = '0' + seconds
      console.log(publishTime)
      console.log(duration)
      console.log(minutes)
      console.log(seconds)

      result.push(
        <div className='flex border border-solid border-t-0 border-l-0 border-r-0 p-3' key={index}>
          <div className='flex flex-no-shrink'>
            <div className='z-10 self-end flex absolute w-24 h-8 border border-red rounded bg-red text-white justify-center items-center'>
              <i className="fab fa-youtube mr-2"></i>
              <span>{minutes}:{seconds}</span>
            </div>
            <img className='' src={video.thumbnails[0].url} height={video.thumbnails[0].height} width={video.thumbnails[0].width} alt='not found' key={index}/>
          </div>


          <div className='flex flex-col ml-5'>
            <div className='text-red font-bold'>
              <label>{publishTime.getDate()}th, {publishTime.getHours()}:{publishTime.getMinutes()}</label>
              <span className='fa-stack fa-1x'>
                <i className="fas fa-comment text-red fa-stack-1x"></i>
                <i className="fas fa-comment text-white fa-stack-1x fa-xs"></i>
              </span>
              <label className=''>{comment[0].count}</label>
            </div>
            <h3 className='hover:text-purple hover:underline'>{video.metadata.description}</h3>
          </div>
        </div>
      )
    })
    return result
  }

  getLatest = () => {
    // object destructuring
    let {data: {data}} = this.state.content
    data.forEach((item) => console.log(item.metadata.publishDate))

    let result = []
    data.forEach((dataItem, index) => {
      const comment = this.state.comments.data.content.filter(item => item.id === dataItem.contentId)
      const publishTime = new Date(dataItem.metadata.publishDate)
      const {duration} = dataItem.metadata
      console.log(publishTime)
      console.log(duration)
      console.log(comment)

      result.push(
        <div className='flex border border-solid border-t-0 border-l-0 border-r-0 p-3' key={index}>

          <img className='' src={dataItem.thumbnails[0].url} alt='not found' key={index}/>

          <div className='flex flex-col ml-5'>
            <div className='text-red font-bold'>
              <label>{publishTime.getDate()}th, {publishTime.getHours()}:{publishTime.getMinutes()}</label>
              <span className='fa-stack fa-1x'>
                <i className="fas fa-comment text-red fa-stack-1x"></i>
                <i className="fas fa-comment text-white fa-stack-1x fa-xs"></i>
              </span>
              <label>{comment[0].count}</label>
            </div>
            <h3 className='hover:text-purple hover:underline'>{dataItem.metadata.description}</h3>
          </div>
        </div>
      )
    })
    return result
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
        tab = this.state.articles
        break;
      case 'videos':
        tab = this.state.videos
        break;
      case 'latest':
        tab = this.state.latest
        break;
      default:
    }

    return (
      <div className='container mx-auto'>
        <h1 className='heading'>Latest News</h1>
        <div className='flex flex-row'>
          <div className='tabs-group'>
            <button className='btn tabs'
              onClick={this.handleClick} value='latest'>
              <i class="fas fa-check-circle text-grey"></i><span>&nbsp;&nbsp;&nbsp;</span>
              Latest</button>

            <button className='btn tabs'
              onClick={this.handleClick} value='videos'>
              <i class="fas fa-play text-grey"></i><span>&nbsp;&nbsp;&nbsp;</span>
              Videos</button>

            <button className='btn tabs'
              onClick={this.handleClick} value='article'>
              <i class="fas fa-file-alt text-grey"></i><span>&nbsp;&nbsp;&nbsp;</span>
              Article</button>
          </div>
          <div>{tab}</div>
        </div>
      </div>
    );
  }
}

export default App;
