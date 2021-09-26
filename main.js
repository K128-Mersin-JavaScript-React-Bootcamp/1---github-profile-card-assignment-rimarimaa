// Main Variables
let repos = [];
let languages = [];
let codesize = [];
let userlanguages= [];
let codesizetotal = 0;
let input = document.querySelector(".get-repos");

// Get Repos Function
function fetchData() {
  fetch(`https://api.github.com/users/${input.value}/repos`)
    .then((response) => response.json())
    .then((repositories) => {
      // console.log(repositories);
      repos = repositories;
      listData(repos);
    });
}
// list data to doc Function

const listData = () => {
  // User Info
  let username = document.getElementById("username");
  username.innerHTML = repos[0].owner.login;

  let repos_no = document.getElementById("repos-no");
  repos_no.innerHTML = `${repos.length} repos`;

  // let list = document.querySelector(".data");
  repos.map((element) => {
    if (element.language != null) {
      languages.push(element.language);
    }
    codesize.push(element.size);
  });
  //  Code Percentage
  const totalItems = languages.length;
  const uniqueItems = [...new Set(languages)];
  uniqueItems.forEach((element) => {
    const numItems = languages.filter((lang) => lang == element);
    userlanguages.push(`${element} ${(numItems.length * 100) / totalItems}%`)
    console.log(`${element} ${(numItems.length * 100) / totalItems}%`);
  });


    let languagesli = document.getElementById("languagesli");
    languagesli.innerHTML = userlanguages.map(element => {
      return `<li>${element}</li>`
    })


  // Code Size
  for (let element in codesize) {
    codesizetotal += codesize[element];
  }
  let repos_size = document.getElementById('repos-size');
  repos_size.innerHTML = `${codesizetotal} mb`;

};
