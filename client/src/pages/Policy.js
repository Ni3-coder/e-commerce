import React from 'react';
import Layout from '../components/Layout/Layout';

const Policy = () => {
    return (
        <div>
            <Layout title={'Privacy Policy'}>
            <div className='row contactus'>
                <div className='col-md-6'>
                    <img src='/images/contactus.jpeg' alt='contactus' style={{ width: "100%"}} />
                </div>
                <div className="col-md-4">
                    <h1 className='bg-dark p-2 text-white text center'>Privacy Policy</h1>
                    <p className='text-justify mt-2'>
                        any privacy policy 
                    </p>
                    <p className='text-justify mt-2'>
                        any privacy policy 
                    </p>
                    <p className='text-justify mt-2'>
                        any privacy policy 
                    </p>
                    <p className='text-justify mt-2'>
                        any privacy policy 
                    </p>
                    <p className='text-justify mt-2'>
                        any privacy policy 
                    </p>
                </div>
            </div>
            </Layout>
        </div>
    )
}

export default Policy;