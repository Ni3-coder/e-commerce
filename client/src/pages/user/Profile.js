import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
import axios from 'axios';

const Profile = () => {
    const [auth, setAuth] = useAuth()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    //get user data
    useEffect(() => {
        const { user } = auth;
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setPhone(user.phone);
            setAddress(user.address);
        }
    }, [auth?.user]);

    // Form Function 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put("/api/v1/auth/profile", {
                name, email, password, phone, address
            });
            if (data?.error) {
                toast.error(data?.error)
            } else {
                setAuth({ ...auth, user: data?.updateUser })
                let ls = localStorage.getItem("auth")
                ls = JSON.parse(ls)
                ls.user = data.updatedUser
                localStorage.setItem("auth", JSON.stringify(ls))
                toast.success("Profile Updated successfully")
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        }
    };

    return (
        <Layout title={"Your Profile"}>
            <div className="container-fluid m-3 p-3 dashboard">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-8">
                        <div className="form-container" style={{ marginTop: "-40px" }}>
                            <form onSubmit={handleSubmit}>
                                <h4 className="title">USER PROFILE</h4>
                                <div className="mb-3">
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="exampleInputName" placeholder="Enter Your Name" />
                                </div>
                                <div className="mb-3">
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder="Enter Your Email" disabled />
                                </div>
                                <div className="mb-3">
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Enter Your Password" />
                                </div>
                                <div className="mb-3">
                                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" id="exampleInputPhone" placeholder="Enter Your Phone" />
                                </div>
                                <div className="mb-3">
                                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" id="exampleInputAddress" placeholder="Enter Your Address" />
                                </div>
                                <button type="submit" className="btn btn-primary">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;