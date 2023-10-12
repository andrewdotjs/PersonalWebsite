document.addEventListener("DOMContentLoaded", async () => {
  // Main block

  const backgroundImage = document.getElementById('background-image');
  const navBar = document.getElementById('navigation-bar');
  const overviewText = document.getElementsByClassName('overview-text');
  const overviewImage = document.getElementById('overview-image');
  const projectContainer = document.getElementById('project-container');
  
  updateGithubProjects(projectContainer);

  document.addEventListener("scroll", debounce(() => {
    if (window.scrollY > window.innerHeight) {
      backgroundImage.style.opacity = 0;
    } else {
      backgroundImage.style.opacity = 1;
    }
  }, 5));
});

const updateGithubProjects = async (updateElement) => {
  const userResponse = await fetch('https://api.github.com/users/andrewdotjs');
  const userData = await userResponse.json();

  const repoResponse = await fetch('https://api.github.com/users/andrewdotjs/repos?sort="stars"');
  const repoData = await repoResponse.json();

  updateElement.innerHTML = `
    <a class="repo-redirect text-color" href="${userData.html_url}" target="_blank">
      <div class="project-card">
        <img class="user-image" src="./public/icons/github.svg">
        <h1 class="user-info" id="user-login">@${userData.login}</h1>
      </div>
    </a>
  `;

  repoData.forEach((repo) => {
    if (repo.id !== 520275470) {
      updateElement.innerHTML += `
        <a class="repo-redirect" href="${repo.html_url}" target="_blank">
          <div class="project-card" style="background-image: url(https://github.com/andrewdotjs/${repo.name}/blob/main/card-image.jpg?raw=true); background-size: cover;">
            <div class="repo-details">
              <h1 class="repo-name header-color">${repo.name}</h1>
              <h1 class="repo-sub-text sub-text-color">Personal</h1>
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