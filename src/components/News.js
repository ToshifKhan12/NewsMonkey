import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from "./Spinner"
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


const News = (props) => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const UpdateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=6736567ffdbe4b6886a3e8cbd7071d3e&
    page=${page}&pageSize=${props.pageSize}`; 
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);

  }

useEffect(() =>{
  document.title = `${props.category} - NewsMonkey`
  UpdateNews();

}, [])

const handlePrevClick = async () => {
    setPage(page-1)
    UpdateNews();
}

const handleNextClick = async() => {
    setPage(page+1)
    UpdateNews();
}

  const fetchMoreData = async() =>{
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=6736567ffdbe4b6886a3e8cbd7071d3e&page=${page+1}&pageSize=${props.pageSize}`; 
    setPage(page+1) 
    // setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  }

    return (
      // <div className="container my-3">
      <>
        <h1 className='text-center' style = {{marginTop: '80px'}}>NewsMonkey - Top {props.category} Headlines</h1>
        { loading && <Spinner/>}

        <InfiniteScroll
          dataLength ={ articles.length}
          next={fetchMoreData}
          // inverse={true} 
          hasMore={ articles.length !==  totalResults}
          loader={<Spinner/>}
          // scrollableTarget="scrollableDiv"
        >

          <div className="container">
        <div className="row">
        { articles && articles.map((element) => {
          return (<div className="col-md-4" key={element.url}>
              <NewsItem title={element.title?element.title.slice(0, 45):""} description={element.description?element.description.slice(0, 88):""} 
              imageUrl={element.urlToImage} newsURL={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
          </div>);
        })}
             
        </div>
        </div>
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between">
        <button  disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      {/* </div> */}

       </>
    )
  
}

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category:"General"
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  categoty: PropTypes.string,
}

export default News
