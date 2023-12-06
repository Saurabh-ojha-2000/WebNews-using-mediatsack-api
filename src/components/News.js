import React, { useEffect, useState } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updatenews = async () => {
    props.setProgress(10);
    //const url = `/v1/news?access_key=900d6725f420ef69f16d8e0a8b1e3d71`;
    let data;
    axios({
        method: 'get',
        baseURL: 'https://api.mediastack.com',
        url: '/v1/news?access_key=900d6725f420ef69f16d8e0a8b1e3d71'
      }).then(response => {
        console.log(response.data.data);
        setArticles(response.data.data);
        setTotalResults(10000);
      })
      .catch(error => {
        console.log(error)
      });

    setLoading(true);
   // let data = await axios.get(url);
    props.setProgress(30);
    // let parseddata = data;
    props.setProgress(70);

   // console.log("API Response:", parseddata); // Log the response

    // if (response.data.data) {
    //   setArticles(response.data.data);
    //   setTotalResults(10000);
    // } else {
    //   console.error(
    //     "API response does not contain 'articles' property:",
        
    //   );
    // }

    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    updatenews();
  }, []);

  const fetchMoreData = async () => {
    const url = `https://api.mediastack.com/v1/news?access_key=${
      props.apikey
    }&keywords=tennis&countries=${props.country},gb,de&page=${page + 1}`;

    setPage(page + 1);
    let data = await fetch(url);
    let parseddata = await data.json();

    console.log("More Data:", parseddata); // Log the additional data

    if (parseddata.articles) {
      setArticles(articles.concat(parseddata.articles));
      setTotalResults(parseddata.totalResults);
    } else {
      console.error(
        "API response does not contain 'articles' property:",
        parseddata
      );
    }
  };

  return (
    <>
      <h1
        className="text-center"
        style={{ margin: "35px 0px", marginTop: "90px" }}
      >
        WebNews - Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>

      {loading && <Spinner />}

      {articles.length > 0 && (
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <Newsitem
                      title={
                        element.title
                          ? element.title.slice(0, 70)
                          : "Breaking News"
                      }
                      description={
                        element.description
                          ? element.description.slice(0, 90)
                          : "Done by doing research, experts, and reading news articles."
                      }
                      imageurl={
                        element.image
                          ? element.image
                          : "https://img.etimg.com/thumb/msid-104337472,width-1200,height-630,imgsize-763014,overlay-etmarkets/photo.jpg"
                      }
                      newsurl={
                        element.url
                          ? element.url
                          : "https://www.fxstreet.com/news/gold-price-extends-upside-amid-multi-year-high-yields-and-middle-east-conflict-202310110941"
                      }
                      author={element.author ? element.author : "NewsWeb"}
                      date={element.published_at}
                      source={
                        element.source ? element.source : "NewsWeb"
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      )}
    </>
  );
};

News.defaultProps = {
  country: "in",
  category: "general",
  pagesize: 9,
};

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  pagesize: PropTypes.number,
};

export default News;
