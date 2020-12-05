const App = document.getElementById("App");
const url = "https://api.github.com/users/";
let searchBox = "";
const header = `
  <header>
    <h1>GitHunter</h1>
  </header>
`;

const getSessionData = () =>
  JSON.parse(sessionStorage.getItem("githunter_data"));

function renderMainPage() {
  App.innerHTML =
    header +
    `
    <div class="main-page">
      <img src="https://image.flaticon.com/icons/png/512/25/25231.png" alt="GitHub logo"/>
      <h1>Welcome to <br/><span>GitHunter</span></h1>
      <input type="text" placeholder="Username"/><br/>
      <button onclick="getUserData()">Search</button> 
    </div>
  `;
}

function renderUserPage() {
  const {
    login,
    name,
    bio,
    followers,
    following,
    avatar_url,
  } = getSessionData();
  App.innerHTML =
    header +
    `
    <div class="user-page">
      <img src="${avatar_url}" alt="Profile picture"/>
      <h1>${login}</h1>
      <h2>${name}</h2>
      <p>"${bio}"</p>
      <div class="followers">
        <span class="material-icons">
          supervisor_account
        </span>
        <p>Followers ${followers}</p>
        <p>Following ${following}</p>
      </div>
      <button onclick="getRepoData()">See repositories</button>
    </div>
  `;
}

function renderReposPage() {
  const repos = getSessionData();
  App.innerHTML =
    header +
    `
    <div class="repos-page">
      <h1>${repos[0].owner.login}</h1>
      ${repos
        .map(
          ({ name, description, html_url }) => `
          <div class="card">
            <div class="card-text">
              <h2>${name}</h2>
              ${description ? `<p>${description}</p>` : ``}
            </div>
            <a href="${html_url}" target="_blank">Go to repository</a>
          </div>
      `
        )
        .join("")}
    </div>
  `;
}

// Data
async function getUserData() {
  const userInput = document.querySelector("input").value;
  const response = await fetch(`${url}${userInput}`);
  const data = await response.json();
  sessionStorage.setItem("githunter_data", JSON.stringify(data));
  renderUserPage();
}

async function getRepoData() {
  const { repos_url } = getSessionData();
  const response = await fetch(repos_url);
  const data = await response.json();
  sessionStorage.setItem("githunter_data", JSON.stringify(data));
  renderReposPage();
}

renderReposPage();
