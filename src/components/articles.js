import React from 'react';

const Articles = (props) => {
  // console.log(this.props);
  // Object destructuring
  const {data: {data}} = props.content;
  // console.log(data);
  const comments = props.comments;
  console.log(props.comments);
  // Filter out articles
  const articles = data.filter((item) => item.contentType === 'article');
  // articles = articles.sort((a, b) => {return a.metadata.publishDate - b.metadata.publishDate})
  console.log(articles);

  // Get article images
  const result = [];

  articles.forEach((article, index) => {
    const comment = comments.data.content.filter((item) => item.id === article.contentId);
    const publishTime = new Date(article.metadata.publishDate);
    console.log(publishTime);
    console.log(comment);

    // Get 1 image
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
    );
    // each article has 3 images
    // article.thumbnails.forEach((item, index) => {
    //   art_images.push(<img src={item.url} alt='not found' key={index}/>)
    // })
  });

  return (
    <React.Fragment>{result}</React.Fragment>
  );
};

export default Articles;
