import React from 'react';
import AuthenticationContext from '../authentication/authentication-context';
import history from '../services/history';
import ScrollAnimation from 'react-animate-on-scroll';
import InfiniteScroll from 'react-infinite-scroller';

export default function JYB() {
    return (
        <AuthenticationContext.Consumer>
            {({ isAuthenticated, user, feed, jyb }) => (
                <div>

                    <button onClick={() => { history.push("/admin2") }}>Admin 2</button>
                    <div className="heading">Logo</div>
                    <p>{jyb && <img src={jyb().picture.data.url} alt="jyb-logo" />}</p>

                    <div className="heading">Email</div>
                    <p>{jyb && jyb().emails[0]}</p>

                    <div className="heading">About</div>
                    <p>{jyb && jyb().about}</p>

                    <div className="heading">Bio</div>
                    <p>{jyb && jyb().bio}</p>


                    <div className="heading">Location</div>
                    <p>{jyb && `${jyb().location.city}, ${jyb().location.state}`}</p>


                    <div className="heading">Feed</div>
                    <InfiniteScroll
                        pageStart={0}
                        // loadMore={loadFunc}
                        hasMore={false}
                        loader={<div className="loader" key={0}>Loading ...</div>}
                    >
                        {
                            feed && feed().map((item, key) => (
                                <div key={key}>
                                    <ScrollAnimation animateIn="fadeIn">
                                        <label>{item.created_time}</label>
                                        <div>{item.message}</div>
                                    </ScrollAnimation>
                                    <br />
                                </div>
                            ))
                        }
                    </InfiniteScroll>
                </div>
            )}
        </AuthenticationContext.Consumer>
    )
}