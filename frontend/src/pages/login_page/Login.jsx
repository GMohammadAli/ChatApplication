import React from 'react'
import { useState, useEffect } from 'react'
import "./login.scss"
import img from "../../assets/all-platforms.png"
// import validator from 'validator'
import { useNavigate } from 'react-router-dom'
// import {  } from 'react'

const getdatafromlocsto = () => {
    const data = localStorage.getItem("login_Info");
    if (data) {
        return JSON.parse(data)
    } else {
        return []
    }
}
export default function Login() {
    const Goto = useNavigate();
    let [bolin,
        setBolin] = useState(false);
    let [color,
        setColor] = useState(false);
    let [logintempinfo,
        setLogintempinfo] = useState(getdatafromlocsto());
    let [logindata,
        setLogindata] = useState({ email: "", password: "" });
    const [errorMessage,
        setErrorMessage] = useState(null);
    let [createdata,
        setCreatedata] = useState({ name: "", phone: "", email: "", password: "", repassword: "" });
    const { name, phone, email, password, repassword } = createdata;

    function logininfo(e) {
        if (!bolin) {
            setLogindata({
                ...logindata,
                [e.target.name]: e.target.value
            })

        } else {
            setCreatedata({
                ...createdata,
                [e.target.name]: e.target.value
            })
            setColor(false);
            console.log(createdata)
            setErrorMessage(null)

        }

    }

    function loginsubmit(e) {
        e.preventDefault()
        let findemail = logintempinfo.find(item => {
            return item.email === email
        })
        //    console.log(findemail.email,"find mail form data through find")
        let checkmail;
        {
            findemail
                ? checkmail = findemail.email
                : checkmail = "yhg"
        }

        console.log("serch email", checkmail, typeof (findemail), "firs data and typee")
        if (!bolin) {
            console.log(logindata)

            let datafindmaile = logintempinfo.find((ie) => {
                return ie.email === logindata.email
            })
            let loginemail;
            {
                datafindmaile
                    ? loginemail = datafindmaile
                    : loginemail = "xy*s@"
            }
            console.log(loginemail)
            console.log(logindata.email, logindata.password)
            console.log(loginemail.email, loginemail.password, "this")

            {
                logindata.email === loginemail.email && logindata.password === loginemail.password
                    ? Goto("/Home")
                    : alert("Wrong Email and Password")
            }

            setLogindata({ email: "", password: "" })

            localStorage.setItem("currentEmail", JSON.stringify(logindata.email));

        } else {

            console.log(createdata.password, createdata.password.length)

            if (password === repassword && email !== checkmail && (password.length >= 8)) {
                setBolin(false)
                setColor(false);
                setLogintempinfo([
                    ...logintempinfo, {
                        name,
                        phone,
                        email,
                        password,
                        repassword
                    }
                ]);
                setCreatedata({ password: "", repassword: "", name: "", phone: "", email: "" });
                console.log(logintempinfo);
                // localStorage.setItem('login_Info',JSON.stringify(logintempinfo));
            } else {

                if (password !== repassword) {
                    alert("Passwoed is not matching")
                    setCreatedata({ password: "", repassword: "" })
                }
                if (email === checkmail) {
                    setColor(true)
                }
                if (password.length <= 8) {
                    setErrorMessage("password shoud be grather then 8 charactor")
                    console.log("password lent is not grather then 8")
                }
            }
            console.log(logintempinfo)
        }
    }
    useEffect(() => {
        localStorage.setItem('login_Info', JSON.stringify(logintempinfo));
    }, [logintempinfo])
    return (
        <div>
            <div className="login-main-container">
                <div className="login-left-image">
                    <img src={img} alt="" />
                </div>
                <div className="login-create-right-container">

                    <div className="login-both-container">
                        {/* upper login and sign button container  */}
                        <div
                            className="login-singup-button-container"
                            onClick={() => {
                                setBolin(!bolin)
                            }}>

                            <div
                                onClick={() => {
                                    setBolin(!bolin)
                                }}
                                className="login-singup-button"
                                style={!bolin
                                    ? {
                                        transform: "translateX(00%)"
                                    }
                                    : {
                                        transform: "translateX(100%)"
                                    }}>{!bolin
                                        ? `LOGIN`
                                        : `SIGN UP`}
                            </div>

                        </div>

                        {!bolin
                            ? <div className="login-page">
                                <form className='login-form' onSubmit={loginsubmit}>
                                    <fieldset>
                                        <legend>Email</legend>
                                        <input
                                            type="email"
                                            name='email'
                                            autoComplete='off'
                                            required
                                            onChange={logininfo}
                                            value={logindata.email}
                                            placeholder="onestopsolution@gmial.com" />
                                    </fieldset>

                                    <fieldset>
                                        <legend>Password</legend>
                                        <input
                                            type="password"
                                            name='password'
                                            required
                                            onChange={logininfo}
                                            value={logindata.password}
                                            placeholder="*********" />
                                    </fieldset>
                                    <button type='submit' className='login-page-button'>Login</button>
                                    <p className='login-page-forgot-password'>
                                        <a href="#">Forgot password</a>
                                    </p>
                                </form>
                            </div>
                            : <div className="create-account">
                                <form className='login-form' onSubmit={loginsubmit}>
                                    <fieldset>
                                        <legend>Name</legend>
                                        <input
                                            type="text"
                                            name='name'
                                            autoComplete='off'
                                            value={name}
                                            onChange={logininfo}
                                            placeholder="Enter Your name" />
                                    </fieldset>
                                    <fieldset >
                                        <legend>Phone</legend>
                                        <input
                                            type="tel"
                                            pattern='[0-9]{10}'
                                            name='phone'
                                            autoComplete='off'
                                            value={phone}
                                            onChange={logininfo}
                                            placeholder="1239874569" />
                                    </fieldset>
                                    <p
                                        className='email-shock-para'
                                        style={color
                                            ? {
                                                display: "inline-block"
                                            }
                                            : {
                                                display: "none"
                                            }}>Email is allrady exist!</p>
                                    <fieldset
                                        style={!color
                                            ? {
                                                border: "2px solid rgb(199, 201, 251)"
                                            }
                                            : {
                                                border: "2px solid red"
                                            }}>
                                        <legend>Email</legend>
                                        <input
                                            type="email"
                                            name='email'
                                            autoComplete='off'
                                            value={email}
                                            onChange={logininfo}
                                            placeholder="onestopsolution@gmial.com" />
                                    </fieldset>
                                    {errorMessage === ''
                                        ? null
                                        : <p className='email-shock-para'>{errorMessage}</p>}
                                    <fieldset
                                        style={errorMessage === null
                                            ? {
                                                border: "2px solid rgb(199, 201, 251)"
                                            }
                                            : {
                                                border: "2px solid red"
                                            }}>
                                        <legend>Password</legend>
                                        <input
                                            type="password"
                                            name='password'
                                            value={createdata.password}
                                            onChange={logininfo}
                                            placeholder="*********" />
                                    </fieldset>
                                    <fieldset
                                        style={errorMessage === null
                                            ? {
                                                border: "2px solid rgb(199, 201, 251)"
                                            }
                                            : {
                                                border: "2px solid red"
                                            }}>
                                        <legend>Confirm Password</legend>
                                        <input
                                            type="password"
                                            name='repassword'
                                            value={repassword}
                                            onChange={logininfo}
                                            placeholder="*********" />
                                    </fieldset>

                                    <button type='submit' className='login-page-button sign-up-button'>SIGN UP</button>

                                </form>

                            </div>
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}
