import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../../contextStore/PostContext";
import { Firebase } from "../../firebase/config";
import { useHistory } from "react-router";
import "./View.css";
import WhatsAppChat from "../whatsapp/WhatsAppChat";

function View() {
  let { postContent } = useContext(PostContext);
  const [userDetails, setUserDetails] = useState();
  const history = useHistory();

  useEffect(() => {
    const checkAuthentication = () => {
      Firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          // User is not logged in, redirect to login page
          history.push("/login");
        } else {
          // User is logged in, fetch user details
          let { userId } = postContent;
          if (userId === undefined) {
            history.push("/");
          } else {
            Firebase.firestore()
              .collection("users")
              .where("id", "==", userId)
              .get()
              .then((res) => {
                res.forEach((doc) => {
                  setUserDetails(doc.data());
                });
              });
          }
        }
      });
    };

    checkAuthentication();
  }, [history, postContent]);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postContent.url} alt="" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postContent.price} </p>
          <span>{postContent.name}</span>
          <p>{postContent.category}</p>
          <span>{postContent.createdAt}</span>
        </div>
        <div className="productDescription">
          <p className="p-bold">Product Description</p>
          <p>{postContent.description}</p>
        </div>
           {userDetails &&
            <div className="contactDetails">
            <p className="p-bold">Owner details</p>
            <p>Name : {userDetails.name}</p>
            <WhatsAppChat phoneNumber={userDetails.phone}/>
            </div>
            }
        {postContent.category === "ebooks & pdfs" && (
          <div className="downloadbutton">
            <a href={postContent.url2}>
              <button type="button" class="btn btn-primary btn-sm">
                DownLoad
              </button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default View;
