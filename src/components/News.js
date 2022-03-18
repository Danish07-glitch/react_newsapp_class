import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from './Spinner'
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  handleNextClick = async () => {
    if (
      !(
        this.state.page + 1 >
        Math.ceil(this.state.totalResults / this.props.pageSize)
      )
    ) {
      let url = `https://newsapi.org/v2/top-headlines?country=in&category=${
        this.props.category
      }&apiKey=8ecd12af4b8f4cd0b577c2b27b6fdac2&page=${
        this.state.page + 1
      }&pagesize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        articles: parsedData.articles,
        page: this.state.page + 1,
        loading: false,
      });
    }
  };
  handlePreviousClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${
      this.props.category
    }&apiKey=8ecd12af4b8f4cd0b577c2b27b6fdac2&page=${
      this.state.page - 1
    }&pagesize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page - 1,
      loading: false,
    });
  };

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults:0,
    };
    console.log("const");
  }
  async componentDidMount() {
    this.props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apikey}&page=1&pagesize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);

    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,

      loading: false,
    });
    document.title = `OWL- ${this.props.category} `;
    console.log("mount");
    this.props.setProgress(100)
  }
  fetchMoreData = async () => {
    this.setState({
      page:this.state.page+1
    })
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    
    let data = await fetch(url);

    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,

      loading: false,
    });
    
  };

  render() {
    return (
      <>
        {console.log("render")}
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
          <h2 className="text-center my-3">OWL--Top Headline</h2>

          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4 my-3" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    publishedAt={element.publishedAt}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
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
        {/* <div className="container text-center mx-2 d-flex justify-content-between">
          <button
            disabled={this.state.page === 1}
            className=" btn btn-dark mx-1"
            onClick={this.handlePreviousClick}
          >
            &#8592;Previous
          </button>

          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            className=" btn btn-dark mx-1"
            onClick={this.handleNextClick}
          >
            Next&#8594;
          </button>
        </div> */}
      </>
    );
  }
}
