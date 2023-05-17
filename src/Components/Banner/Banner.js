import React, { useState,useContext } from "react";
import DynamicPosts from "../DynamicPosts/DynamicPosts";
import {Link} from "react-router-dom";
import "./Banner.css";
import { AuthContext } from "../../contextStore/AuthContext";

function Banner() {
  let [category, setCategory] = useState();
  const { user } = useContext(AuthContext);

  return (
    <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <hr className="class-1"/>
        <div className="menuBar">
          
          <div className="categoryMenu">
         <select 
            className="dropdown"
              name="Category"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
 >
              {" "}
              <option value="null">ALL CATEGORIES</option>
              <option value="Lecture Notes">Lecture Notes</option>
              <option value="ebooks & pdfs">ebooks & pdfs</option>
              <option value="softwares & tools">softwares & tools</option>
              <option value="online courses">online courses</option>
              <option value="textbooks">textbooks</option>
              <option value="online courses">online courses</option>
            </select>
              
          </div>
          <div className="otherQuickOptions">
          <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
          <div className="btn-group mr-2" role="group" aria-label="First group">
          <button type="button" class="btn btn-secondary"><span className="btntxt" onClick={() => setCategory("Lecture Notes")} >Lecture Notes</span></button>
          <button type="button" class="btn btn-secondary"> <span className="btntxt" onClick={() => setCategory("ebooks & pdfs")} >ebooks & pdfs</span></button>
          <button type="button" class="btn btn-secondary"> <span className="btntxt" onClick={() => setCategory("softwares & tools")} >softwares & tools</span></button>
          <button type="button" class="btn btn-secondary"> <span className="btntxt" onClick={() => setCategory("online courses")} >online courses</span></button>
          <button type="button" class="btn btn-secondary"> <span className="btntxt" onClick={() => setCategory("textbooks")} >textbooks</span></button>
          <button type="button" class="btn btn-secondary"> <span className="btntxt" onClick={() => setCategory("online courses")} >online courses</span></button>
          </div>
          </div>
          </div>
        </div>
        <hr className="class-1"/>
        <div className="banner">
          {/* <img src="../../../Images/banner copy.png" alt="" /> */}
          <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
            
              <div className="carousel-item active">
              <img src={require("/opt/skorner/src/images/banner2.png")} class="d-block w-100" alt="..."/>
                  {!user && (<Link to="/signup" ><button type="button" className="btn btn-default-signup">signup</button></Link>)}
              
              
            
    </div>
                <div className="carousel-item">
                <img src={require("/opt/skorner/src/images/banner3.png")} className="d-block w-100" alt="..."/>
                 
    </div>
                  <div className="carousel-item">
                  
                  <img src={require("/opt/skorner/src/images/banner1.png")} className="d-block w-100" alt="..."/>
    </div>
                  </div>
                  <button className="carousel-control-prev" type="button" data-target="#carouselExampleControls" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                  </button>
                  <button className="carousel-control-next" type="button" data-target="#carouselExampleControls" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                  </button>
                </div>
              </div>
            </div>
            {category != null && <DynamicPosts category={category} />}
          </div>
          );
        }
        
        export default Banner;
