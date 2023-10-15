document.addEventListener("DOMContentLoaded", async () => {
  // Main block
  
  const root = document.getElementById('root');
  const panels = document.getElementsByClassName('panel');
  const aboutTexts = document.getElementsByClassName('about-body');
  const navigationButtons = document.getElementsByClassName('navigation-button-direct');

  const backgroundImage = document.getElementById('background-image');
  const projectContainer = document.getElementById('project-container');
  const themeButton = document.getElementById('theme-button');
  const configIcons = document.getElementsByClassName('config-icon');
  
  updateHeaderBar(window.scrollY, window.innerHeight, navigationButtons);
  updateGithubProjects(projectContainer);
  
  themeButton.onclick = () => {
    root.classList.toggle('dark-mode');
    
    for (let i = 0; i < configIcons.length; i++) {
      configIcons[i].classList.toggle('dark-mode-icon');
    }
    
    for (let i = 0; i < panels.length; i++) {
      if (panels[i].id !== 'introductory') {
        panels[i].classList.toggle('dark-mode'); 
      }
    }
    
    for (let i = 0; i < aboutTexts.length; i++) {
      aboutTexts[i].classList.toggle('dark-mode-text');
    }
    
    for (let i = 0; i < navigationButtons.length; i++) {
      navigationButtons[i].classList.toggle('dark-mode-text');
    }
  };

  document.addEventListener("scroll", debounce(() => {
    if (window.scrollY > window.innerHeight) {
      backgroundImage.style.opacity = 0;
    } else {
      backgroundImage.style.opacity = 1;
    }
    
    updateHeaderBar(window.scrollY, window.innerHeight, navigationButtons);
  }, 5));
});

const updateGithubProjects = async (updateElement) => {
  const repoResponse = await fetch('https://api.github.com/users/andrewdotjs/repos?sort="stars"');
  const repoData = await repoResponse.json();

  repoData.forEach((repo) => {
    if (repo.id !== 520275470) {
      updateElement.innerHTML += `
        <a class="project-redirect" href="${repo.html_url}" target="_blank">
          <div class="project-card" style="background-image: url(https://github.com/andrewdotjs/${repo.name}/blob/main/card-image.jpg?raw=true); background-size: cover;">
            <div class="project-card-details">
              <h1 class="project-name header-color">${repo.name}</h1>
              <h1 class="project-sub-text sub-text-color">Personal</h1>
            </div>
          </div>
        </a>
      `;
    }
  });
}

const debounce = (func, timeout = 300) => {
  let timer;
  
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

const updateHeaderBar = (scrollYPosition, innerHeight, navigationButtons) => {
  if (scrollYPosition < innerHeight) {
    for (let i = 0; i < navigationButtons.length; i++) {
      if (navigationButtons[i].id !== "introductory-marker") {
        navigationButtons[i].style.display = "none";
      } else {
        navigationButtons[i].style.display = "block";
      }
    }
  } else if (scrollYPosition >= innerHeight && scrollYPosition < (innerHeight * 2)) {
    for (let i = 0; i < navigationButtons.length; i++) {
      if (navigationButtons[i].id !== "about-marker") {
        navigationButtons[i].style.display = "none";
      } else {
        navigationButtons[i].style.display = "block";
      }
    }
  } else if (scrollYPosition >= (innerHeight * 2) && scrollYPosition < (innerHeight * 3)) {
    for (let i = 0; i < navigationButtons.length; i++) {
      if (navigationButtons[i].id !== "project-marker") {
        navigationButtons[i].style.display = "none";
      } else {
        navigationButtons[i].style.display = "block";
      }
    }
  }
}