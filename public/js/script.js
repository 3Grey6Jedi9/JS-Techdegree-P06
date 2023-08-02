'use strict';

/**
 * Handling mobile menu functionality to hide/reveal sidebar on mobile layouts
 */
const wrapper = document.querySelector('.wrapper');
const sidebar = document.getElementById('my-info');
let headerBtnClicked = false;




document.querySelector('#menu-icon').addEventListener('click', () => {
  if (!headerBtnClicked) {
    // Adding content of the sidebar
    sidebar.innerHTML = `
      <div class="sidebar-info-box">
        <br>
        <div class="thumbnail-box">
          <img class="thumbnail" src= "/Images/‎profile_picture.‎001.jpeg" alt="A picture of myself">
        </div>
        <div class="dev-intro-box">
          <h5>About me...</h5>
          <p>I am a very mysterious person. I do many interesting things from coding to predicting the financial markets.</p>
          <p>I am so awesome because I dance like a pro.</p>
          <a href="/about">Learn More &rarr;</a>
        </div>
      </div>
    `;

    // Displaying the sidebar
    sidebar.style.display = 'block';

    // Collapsing the layout to make space for the sidebar
    wrapper.classList.add('show-sidebar');
  } else {
    // Hiding the sidebar
    sidebar.style.display = 'none';

    // Expanding the layout to its original state
    wrapper.classList.remove('show-sidebar');
  }

  // Toggling the button state
  headerBtnClicked = !headerBtnClicked;
});




