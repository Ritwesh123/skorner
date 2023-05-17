import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";
import { Firebase } from "../../firebase/config";
import { useHistory } from "react-router";
import SignUpLoading from "../Loading/SignUpLoading";

export default function Signup() {
  const history = useHistory();
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [phone, setPhone] = useState("");
  let [password, setPassword] = useState("");
  let [loading,setLoading]=useState(false)
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    Firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user
        .updateProfile({ displayName: name }).then(() => {
          Firebase.firestore().collection("users").doc(result.user.uid).set({
            id: result.user.uid,
            name: name,
            phone: phone,
          });
        
          // Send verification email
            result.user
              .sendEmailVerification()
              .then(() => {
                alert(
                  "A verification email has been sent to your email address. Please verify your email to complete the signup process."
                );
                history.push("/login");
              })
              .catch((error) => {
                alert(error.message);
              });
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error) => {
        alert(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const validatePassword = (inputPassword) => {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~\-=?]).{8,}$/;
    return passwordPattern.test(inputPassword);
  };
  return (<>
    {loading && <SignUpLoading/> } <div>
      <div className="signupParentDiv">
        <img className="logosignup"  src={require("C:/Users/RITWESH/Desktop/skorner/src/logo/logo4.png")}  width="400px" height=""alt=""></img>
        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <br />
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
          />
          <br />
          <label>Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
          />
          <br />
          <label>Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            name="phone"
          />
         
          <br />
          <label>Password</label>
          <br />
          <input
            className="input"
            type="password"
            name="password"
            placeholder="password"
            minlength="8"
            require
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~\-=?]).{8,}$"
          />
          <br />
          {!validatePassword(password) && (
              <div className="passwordValidationMsg">
                Password should be at least 8 characters long and<br/>
                 contain at least one uppercase letter, one lowercase letter, <br/>
                 one number and one special character.
              </div>
            )}
          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link to="/login">Login</Link>
      </div>
    </div> 
    </>
  );
}
