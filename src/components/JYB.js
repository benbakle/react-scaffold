import React, { useState, useEffect } from 'react';
import { useAuthentication } from '../authentication/authentication-context';
import history from '../services/history';
import ScrollAnimation from 'react-animate-on-scroll';
import InfiniteScroll from 'react-infinite-scroller';

export default function JYB() {
    const [_jyb, setJYB] = useState();
    const [_feed, setFeed] = useState();
    const { feed, jyb } = useAuthentication();

    useEffect(() => {
        setFeed(feed);
        setJYB(jyb);
    }, [feed, jyb])

    return (
        <>
            {
                _jyb &&
                <>
                    <button onClick={() => { history.push("/admin2") }}>Admin 2</button>
                    <div className="heading">Logo</div>
                    <p><img src={_jyb.picture.data.url} alt="jyb-logo" /></p>

                    <div className="heading">Email</div>
                    <p>{_jyb.emails[0]}</p>

                    <div className="heading">About</div>
                    <p>{_jyb.about}</p>

                    <div className="heading">Bio</div>
                    <p>{_jyb.bio}</p>

                    <div className="heading">Location</div>
                    <p>{`${_jyb.location.city}, ${_jyb.location.state}`}</p>
                </>
            }

            <div className="heading">Feed</div>
            {/* <InfiniteScroll
                pageStart={0}
                // loadMore={loadFunc}
                hasMore={false}
                loader={<div className="loader" key={0}>Loading ...</div>}
            > */}
            {
                _feed && _feed.map((item, key) => (
                    <div key={key}>
                        <ScrollAnimation animateIn="fadeIn">
                            <label>{item.created_time}</label>
                            <div>{item.message}</div>
                        </ScrollAnimation>
                        <br />
                    </div>
                ))
            }
            {/* </InfiniteScroll> */}
        </>
    )
}