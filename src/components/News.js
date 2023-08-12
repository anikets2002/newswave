import React from 'react'
import { useEffect , useState} from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import defImg from './assets/default.png'
import InfiniteScroll from "react-infinite-scroll-component"
const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0);

    const updateNews = async () => {
        props.setProgress(10);
        const countryParam = props.country ? `country=${props.country}&` : '';
        const categoryParam = props.category ? `category=${props.category}&` : '';
        const searchParam = props.search ? `q=${props.search}&` : '';
    
        const url = `https://newsapi.org/v2/top-headlines?${countryParam}${categoryParam}${searchParam}apiKey=9f6469fda9644940b184942e98266d3d&page=${page}&pageSize=${props.pageSize}`;        

        setLoading(true);
        try {
            let data = await fetch(url);
            props.setProgress(50);
            let parsedData = await data.json();
            props.setProgress(70);
            setArticles(parsedData.articles);
            setTotalResults(parsedData.totalResults);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
            props.setProgress(100);
        }
    };
    
    useEffect(()=>{
        updateNews();
    }, [])
 
    const fetchMoreData = async()=>{

        const countryParam = props.country ? `country=${props.country}&` : '';
        const categoryParam = props.category ? `category=${props.category}&` : '';
        const searchParam = props.search ? `q=${props.search}&` : '';
    
        const url = `https://newsapi.org/v2/top-headlines?${countryParam}${categoryParam}${searchParam}apiKey=9f6469fda9644940b184942e98266d3d&page=${page + 1}&pageSize=${props.pageSize}`;        let data = await fetch(url);
        setPage(page + 1);
        
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
        
    }

    return (
        <>
            <h2 className="text-center" style={{margin:'35px 0px', marginTop: '90px'}}>News Headlines</h2>
            {loading && <Spinner/>}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner/>}
            >
            <div className="container">
                <div className="row">
                    {articles.map((ele) => {
                        return <div className="col-md-4" key={ele.url}>
                            <Newsitem title={ele.title != null ? ele.title.slice(0, 45) : ""} description={ele.description != null ? ele.description.slice(0, 88) : ""} imgurl={ele.urlToImage ? ele.urlToImage : defImg} newsUrl={ele.url} author={ele.author} date={ele.publishedAt} source={ele.source.name} />
                        </div>
                    })}
                </div>
            </div>
            </InfiniteScroll>
            {/* <div className="container d-flex justify-content-between">
                <button disabled={page <= 1} type="button" className="btn btn-dark my-3" onClick={this.handlePrevClick}>&larr; Previous</button>
                <button disabled={Math.ceil(this.state.totalResults / props.pageSize) < page + 1} type="button" className="btn btn-dark my-3" onClick={this.handleNextClick}>Next &rarr;</button>
            </div> */}

        </>
    )
}

News.propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    search: PropTypes.string,
    pageSize: PropTypes.number,
    setProgress: PropTypes.func
};
export default News
