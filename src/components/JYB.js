import React  from 'react';
import AuthenticationContext from '../authentication/authentication-context';

export default function JYB() {
return (
    <AuthenticationContext.Consumer>
        {({ isAuthenticated, user, feed, jyb }) => (
            <div>
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
                {
                    feed && feed().map((item, key) => (
                        <div key={key}>
                            <label>{item.created_time}</label>
                            <div>{item.message}</div>
                            <br />
                        </div>
                    ))
                }
            </div>
        )}
    </AuthenticationContext.Consumer>
)
}