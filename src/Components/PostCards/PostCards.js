import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { PostContext } from '../../contextStore/PostContext';
import { AuthContext } from '../../contextStore/AuthContext'; // Import the AuthContext
import './postcards.css';

function PostCards({ product, index }) {
  const { setPostContent } = useContext(PostContext);
  const { user } = useContext(AuthContext); // Access the user from the AuthContext
  const history = useHistory();

  const handleViewProduct = () => {
    if (user) {
      // User is logged in, allow viewing the product
      setPostContent(product);
      history.push('/view');
    } else {
      // User is not logged in, show an alert or redirect to the login page
      alert('Please log in to view the product.'); // You can customize this message or redirect to the login page
    }
  };

  return (
    <div className="card">
      <div className="card-body" key={index} onClick={handleViewProduct}>
        <img src={product.url} className="card-img-top" width="100" height="125" alt="" />
        <h5 className="card-title">{product.name}</h5>
        <h6 className="card-text">&#x20B9; {product.price}</h6>
        <a href="" className="btn btn-primary">
          Buy Now
        </a>
      </div>
    </div>
  );
}

export default PostCards;



 
/* <div className="card" key={index} onClick={()=>{ 
  setPostContent(product)
 history.push("/view")
}}>
 <div className="favorite">
   <Heart></Heart>
 </div>

  <div className="image">
   <img src={product.url} alt="" />
   </div>
 <div className="content">
   <p className="rate">&#x20B9; {product.price}</p>
  
 <span className="category"> {product.category} </span>
  <p className="name"> {product.name}</p>
 </div>
 <div className="date">
   <span>{product.createdAt}</span>
 </div> 
</div>   
       */
     

