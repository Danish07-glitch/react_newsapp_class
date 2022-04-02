import React,{useState,useEffect} from "react";
import NewsItem from "./NewsItem";
import Spinner from './Spinner'
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import Scroll from './Scroll';

const News=(props)=>{
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
 
  const handleNextClick = async () => {
    setPage(page+1)
    updateNews();
  };
  const handlePreviousClick = async () => {
    setPage(page-1)
    updateNews();
  };

  const  updateNews=async ()=> {
    props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apikey}&page=${page}&pagesize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    document.title = `OWL- ${props.category} `;
    console.log("mount");
    props.setProgress(100)
  }

  useEffect(() => {
    updateNews();
  }, [])
  
  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pagesize=${props.pageSize}`;
    setPage(page+1)
    let data = await fetch(url);

    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    
  };


    return (
      <>
      
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
          <h2 className="text-center my-3">OWL--Top Headline</h2>

          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4 my-3" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    publishedAt={element.publishedAt}
                    description={
                      element.description
                        ? element.description.slice(0, 88) + "..."
                        : ""
                    }
                    imageurl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://img.etimg.com/thumb/msid-90249915,width-1070,height-580,imgsize-105812,overlay-etmarkets/photo.jpg"
                    }
                    newsurl={element.url}
                    author={element.author}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
          </div>
        </InfiniteScroll>
        <Scroll/>
        
        {/* <div className="container text-center mx-2 d-flex justify-content-between">
          <button
            disabled={state.page === 1}
            className=" btn btn-dark mx-1"
            onClick={handlePreviousClick}
          >
            &#8592;Previous
          </button>

          <button
            disabled={
              state.page + 1 >
              Math.ceil(state.totalResults / props.pageSize)
            }
            className=" btn btn-dark mx-1"
            onClick={handleNextClick}
          >
            Next&#8594;
          </button>
        </div> */}
      </>
    );
  }


 News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};
 News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News