import React, { useContext,useState } from "react";
import { useHistory } from "react-router";
import { AllPostContext } from "../../contextStore/AllPostContext";
import { PostContext } from "../../contextStore/PostContext";
import "./Header.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contextStore/AuthContext";
import { Firebase } from "../../firebase/config";
import Search from "../Search/Search";
function Header() {
  const{allPost}=useContext(AllPostContext)
  const{setPostContent}=useContext(PostContext)
  const history = useHistory();
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = allPost.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };
  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };
  const handleSelectedSearch=(value)=>{
       setPostContent(value)
       history.push("/view")

  }
  const handleEmptyClick=()=>{
     alert("No items found.., please search by product name");
  }
  const { user } = useContext(AuthContext);
  
  const logoutHandler = () => {
    Firebase.auth()
      .signOut()
      .then(() => {
        history.push("/login");
      });
  };
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
        <img className="logo" src={require("C:/Users/RITWESH/Desktop/skorner/src/logo/logo5.png") } width="160px"
        height="" />
        </div>
        
        <div className="productSearch">
          <Search />
        </div>
        
        {/* <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>  */}
        <div className="loginPage">
          {user ? (
            user.displayName
          ) : (
            <Link to="/login">
           <span><button type="button" class="btn btn-outline-warning">Login</button></span>
            
             
            </Link>
          )}
          
          
        </div>
        {user && (
          <span onClick={logoutHandler} className="logout-span">
           <button type="button" class="btn btn-outline-warning"> Logout</button>
          </span>
        )}
        
        <Link to="/create">
          {" "}
          <div className="sellMenu">
        
            <button type="button" class="btn btn-outline-warning">Sell/Share</button>
            <div className="sellMenuContent">
   

            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
