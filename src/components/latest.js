import React from 'react';

const Latest = (props) => {
  // console.log(this.props);
  // Object destructuring
  const {data: {data}} = props.content;
  // console.log(data);
  const comments = props.comments;
  console.log(props.comments);

  const result = [];
  data.forEach((dataItem, index) => {
    const comment = comments.data.content.filter((item) => item.id === dataItem.contentId);
    const publishTime = new Date(dataItem.metadata.publishDate);
    const {duration} = dataItem.metadata;
    // console.log(publishTime)
    // console.log(duration)
    // console.log(comment)

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
    );
  });

  return (
    <React.Fragment>{result}</React.Fragment>
  );
};

export default Latest;
