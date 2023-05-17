import React, { Fragment, useState, useContext } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { Firebase } from "../../firebase/config";
import { AuthContext } from "../../contextStore/AuthContext";
import { useHistory } from "react-router";
import GoLoading from "../Loading/GoLoading";
const Create = () => {
  const { user } = useContext(AuthContext);
  const history = useHistory();
  let [name, setName] = useState("");
  let [category, setCategory] = useState("");
  let [sellorshare, setSellorshare] = useState("");
  let [price, setPrice] = useState("");
  let [description, setDescription] = useState("");
  let [image, setImage] = useState();
  let [loading, setLoading] = useState(false);
  let [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

  const handleSubmit = () => {
    setLoading(true);           
    let date = new Date().toDateString();
    Firebase.storage()
      .ref(`/image/${image.name}`)
      .put(image)
      .then(({ ref }) => {
        ref.getDownloadURL().then((url) => {
          // Only upload file if category is ebooks & pdfs
          if (category === "ebooks & pdfs") {
            Firebase.storage()
              .ref(`/file/${file.name}`)
              .put(file)
              .then(({ ref }) => {
                ref.getDownloadURL().then((url2) => {
                  Firebase.firestore()
                    .collection("products")
                    .add({
                      name,
                      category,
                      price,
                      description,
                      url,
                      url2,
                      userId: user.uid,
                      createdAt: date,
                    })
                    .then(() => {
                      history.push("/");
                    });
                });
              });
          } else {
            Firebase.firestore()
              .collection("products")
              .add({
                name,
                category,
                price,
                description,
                url,
                userId: user.uid,
                createdAt: date,
              })
              .then(() => {
                history.push("/");
              });
          }
        });
      });
  };

const handleOptionChange = (e) => {
  setSellorshare(e.target.value);
  if (e.target.value === "sell") {
    setPrice(e.target.Fragment.price.value);
  }
  else {
    if (e.target.value === "share")
      setPrice(0);
  }


};
 
const handleNextFieldChange = (e) => {
  if (sellorshare !== "share") {
    setPrice(e.target.value);
  }
};


return (
  <Fragment>
    <Header />
    {loading && <GoLoading />}
    <div className="centerDiv">
      <label>Name</label>
      <br />
      <input
        className="input"
        type="text"
        name="Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <br />
      <label>Category:</label>
      <select
        name="Category"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
        className="input"
      > <option >Select Category</option>
        <option value="Lecture Notes">Lecture Notes</option>
        <option value="ebooks & pdfs">ebooks & pdfs</option>
        <option value="softwares & tools">softwares & tools</option>
        <option value="online courses">online courses</option>
        <option value="textbooks">textbooks</option>
        <option value="online courses">online courses</option>
      </select>
      <br />
      <label>Sellorshare:</label>
      <select

        name="Sellorshare"
        value={sellorshare}
        onChange={handleOptionChange}
        className="input"
      > <option >select</option>
        <option value="Sell">Sell</option>
        <option value="share">share</option>

      </select>
      <br />
      <label>Price</label>
      <br />
      <input
        className="input"
        type="number"
        name="Price"
        value={price}
        onChange={handleNextFieldChange}
        // Disable the next field if option 2 is selected
        disabled={setSellorshare === "share"}
      />
      <br />
      <label>Description</label>
      <br />
      <input
        className="input"
        type="text"
        name="Description"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <br />

      <br />
      <img
        alt="Posts"
        width="200px"
        height="200px"
        src={image ? URL.createObjectURL(image) : ""}
      ></img>
      <br />
      <label>
        Upload product image:
        
        <input
          type="file"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        />
      </label>
      <br />
      <br />
      
        {(category==="ebooks & pdfs")&&(<>
          <label>
        upload file to download:
        <input type="file" 
        onChange={(e) => {
          setFile(e.target.files[0]);}} />
            </label>
          </>)}
    
      <br />
      <br />
      {/* <input type="text" onChange={ (e) => {
      setFileName(e.target.value);
                      }} /> */}

      <button className="uploadBtn" onClick={handleSubmit}>
        upload and Submit
        </button>
    </div>
  </Fragment>
);
};

export default Create;
