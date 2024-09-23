import React from 'react'
import "./DescriptionBox.css"

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews (122)
        </div>
      </div>
      <div className="descriptionbox-description">
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non metus ac magna pharetra tempus. Donec vitae metus euismod, sollicitudin velit non, pharetra nulla. Phasellus malesuada odio ut elit blandit bibendum. Quisque quis ex quis sapien viverra vehicula non et eros. Vivamus facilisis risus sed libero pharetra, ac scelerisque urna accumsan. Integer ac purus id neque sodales tristique vel vel ante. Nulla facilisi. Aliquam fringilla, ipsum eu cursus tempus, turpis ex hendrerit risus, at interdum est orci sit amet libero. In tincidunt, erat ut aliquam porta, lacus erat.
            </p>
            <p>
            Integer ac purus id neque sodales tristique vel vel ante. Nulla facilisi. Aliquam fringilla, ipsum eu cursus tempus, turpis ex hendrerit risus, at interdum est orci sit amet libero. In tincidunt, erat ut aliquam porta, lacus erat.
            </p>
        </div>
    </div>
  )
}

export default DescriptionBox
