import React from 'react'

const Newsitem = (props) => {

        let { title, description, imgurl, newsUrl, author, date, source} = props;
        return (
            <div className="my-3">
                <div className="card">
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {source}
                    </span>
                    <img className="card-img-top" src={imgurl} alt="Card cap" />
                    <div className="card-body">
                        
                        <h5 className="card-title">{title}
                        </h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
}

export default Newsitem
