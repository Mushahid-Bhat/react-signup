import { useRef, useState, useEffect } from "react";


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;




const Register = () => {
    const userRef = useRef()
   

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
   

    useEffect(() => {
        const result =USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user])

    useEffect(() => {
        const result =PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match=pwd===matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let item ={user,pwd}
        console.log(user,pwd)
       let result=await fetch ("https://api-scripture-iust-dev.herokuapp.com/v1/scripture/user/new",{
        method:'POST',
        body:JSON.stringify(item),
        headers:{
            "Content-Type":'application/json',
            "Accept":'application/json'
        }
       })
       result=await result.json()
    } 

    return (
        
            
                <section>
                    
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">
                            Username:

                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            
                            aria-describedby="uidnote"
                           
                        />
                        <p id="uidnote" className={user && !validName ? "instructions" : "offscreen"}>
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>


                        <label htmlFor="password">
                            Password:
                          
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            
                            aria-describedby="pwdnote"
                            
                        />
                        <p id="pwdnote" className={user&&!validPwd ? "instructions" : "offscreen"}>
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>


                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                           
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                           
                            aria-describedby="confirmnote"
                           
                        />
                        <p id="confirmnote" className={!validMatch ? "instructions" : "offscreen"}>
                            Must match the first password input field.
                        </p>

                        <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
                    </form>
                    {/* <p>
                            <a href="#">Sign In</a>
                        
                    </p> */}
                </section>
            
        
    )
}

export default Register
