import React, { useState } from 'react';
import './Footer.css';

function Footer() {
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (item) => {
    if (activeItem === item) {
      setActiveItem(null);
    } else {
      setActiveItem(item);
    }
  };

  return (
    <div className="footerParentDiv">
      <div className="content">
        <div>
          <div className="heading">
            <p>ABOUT US</p>
          </div>
          <div className="list">
            <ul>
              <li onClick={() => handleItemClick('community')}>About skorner community</li>
              <li onClick={() => handleItemClick('team')}>About team</li>
              <li onClick={() => handleItemClick('contact')}>Contact Us</li>
            </ul>
          </div>
        </div>
        <div>
          <div className="heading">
            <p>SKORNER</p>
          </div>
          <div className="list">
            <ul>
              <li>Help</li>
              <li>Sitemap</li>
              <li>Legal & Privacy information</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer">
        {activeItem === 'community' &&(<div className="item"><img src={require('C:/Users/RITWESH/Desktop/skorner/src/logo/logo6.png')}width="100"height="100"/> 
        <p> About Skorner</p><p>Welcome to the skorner community, a platform where individuals can share and sell the resources they have, creating opportunities for others to make better use of them. Connect with like-minded individuals, explore a wide range of resources, and contribute to a sustainable and collaborative ecosystem. Join us in promoting a culture of sharing, sustainability, and empowerment within our community</p></div>)}
        {activeItem === 'team' && (<div className="item"><img src={require('C:/Users/RITWESH/Desktop/skorner/src/logo/logo6.png')}width="100"height="100"/> 
        <h2>Team Members</h2>
        <p><span>Ayan Rai</span> &nbsp; &nbsp;
        <span>Ritwesh Tripathi</span> &nbsp; &nbsp;
        <span>Aradhana Yadav</span> &nbsp; &nbsp;
        <span>Ajay Yadav</span></p></div>)}
        {activeItem === 'contact' &&(<div className="item"><img src={require('C:/Users/RITWESH/Desktop/skorner/src/logo/logo6.png')}width="100"height="100"/> 
        <p>contact us: </p>
    <div class="row">
  <div class="column">
  <img src={require('C:/Users/RITWESH/Desktop/skorner/src/logo/insta.png')}width="" height=""/>
  </div>
  <div class="column">
  <img src={require('C:/Users/RITWESH/Desktop/skorner/src/logo/whatsapp.png')}width="" height=""/>
  </div>
  <div class="column">
  <img src={require('C:/Users/RITWESH/Desktop/skorner/src/logo/twitter.png')}width="" height=""/>
  </div>
</div>
        </div>)}
        {activeItem === null && (
          <img
            className="logo7"
            src={require('C:/Users/RITWESH/Desktop/skorner/src/logo/logo7.png')}
            
          />
        )}
      </div>
    </div>
  );
}

export default Footer;

