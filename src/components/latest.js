import React from 'react';

const Latest = (props) => {
  // console.log(this.props);
  // Object destructuring
  const {data: {data}} = props.content;
  // console.log(data);
  const comments = props.comments;

  const result = [];
  data.forEach((dataItem, index) => {
    const comment = comments.data.content.filter((item) => item.id === dataItem.contentId);
    const publishTime = new Date(dataItem.metadata.publishDate);
    const year = publishTime.getFullYear();
    const date = publishTime.getDate();
    const month = publishTime.getMonth() + 1;
    let hours = publishTime.getHours();
    let minutes = publishTime.getMinutes();
    hours = ('0' + hours).slice(-2);
    minutes = ('0' + minutes).slice(-2);

    if (dataItem.contentType === 'article') {
      result.push(
          <div className='flex border border-solid border-t-0 border-l-0 border-r-0 p-3' key={index}>

            <img className='' src={dataItem.thumbnails[0].url} alt='not found' key={index}/>

            <div className='flex flex-col ml-5'>
              <div className='text-red font-bold'>
                <label>{hours}:{minutes} {month}/{date}/{year}</label>
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
    } else if (dataItem.contentType === 'video') {
      // Video duration
      const {duration} = dataItem.metadata;
      const durationMinutes = Math.floor(duration/60);
      let durationSeconds = duration % 60;
      if (durationSeconds < 10) durationSeconds = '0' + durationSeconds;

      result.push(
          <div className='flex border border-solid border-t-0 border-l-0 border-r-0 p-3' key={index}>
            <div className='flex flex-no-shrink'>
              <div className='z-10 self-end flex absolute w-24 h-8 border border-red rounded bg-red text-white justify-center items-center'>
                <i className="fab fa-youtube mr-2"></i>
                <span>{durationMinutes}:{durationSeconds}</span>
              </div>
              <img className='' src={dataItem.thumbnails[0].url} height={dataItem.thumbnails[0].height} width={dataItem.thumbnails[0].width} alt='not found' key={index}/>
            </div>


            <div className='flex flex-col ml-5'>
              <div className='text-red font-bold'>
                <label>{hours}:{minutes} {month}/{date}/{year}</label>
                <span className='fa-stack fa-1x'>
                  <i className="fas fa-comment text-red fa-stack-1x"></i>
                  <i className="fas fa-comment text-white fa-stack-1x fa-xs"></i>
                </span>
                <label className=''>{comment[0].count}</label>
              </div>
              <h3 className='hover:text-purple hover:underline'>{dataItem.metadata.description}</h3>
            </div>
          </div>
      );
    }
  });

  return (
    <React.Fragment>{result}</React.Fragment>
  );
};

export default Latest;
