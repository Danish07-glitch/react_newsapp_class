import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
      let {title,description,imageurl,newsurl,publishedAt,author,source} = this.props
     
    return (
      <div >
          <div className="card" >
          <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{zIndex:"1",left:"50%"}}>
        {source}
  </span>
                <img src={imageurl} className="card-img-top" alt="..."/>
                <div className="card-body">
                 <h5 className="card-title">{title}</h5>
                 <p className="card-text">{description}</p>
                 <p className="card-text text-secondary">By {author?author:"UNKNOWN"}  {new Date (publishedAt).toGMTString()}</p>
                <a href={newsurl} rel="noreferrer" target="_blank" className="btn btn-primary btn-sm">Read More</a>
                </div>
          </div>
      </div>
    )
  }
}

export default NewsItem