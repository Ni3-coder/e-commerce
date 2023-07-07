import React from 'react';
import Layout from '../components/Layout/Layout';

const About = () => {
    return (
        <Layout title={"About Us"}>
            <div className="row contactus">
                <div className="col-md-6">
                    <img src="/images/about.jpeg" alt="contactus" style={{ width: "100%"}} />
                </div>
                <div className="col-md-4">
                <h1 className="bg-dark p-2 text-white text center">About Us</h1>
                    <p className="text-justify mt-2">
                        any query and info about product feel free to call anytime we 24x7 available 
                        any query and info about product feel free to call anytime we 24x7 available
                        any query and info about product feel free to call anytime we 24x7 available
                        any query and info about product feel free to call anytime we 24x7 available
                        any query and info about product feel free to call anytime we 24x7 available
                        any query and info about product feel free to call anytime we 24x7 available
                        any query and info about product feel free to call anytime we 24x7 available
                        any query and info about product feel free to call anytime we 24x7 available
                        any query and info about product feel free to call anytime we 24x7 available
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default About;