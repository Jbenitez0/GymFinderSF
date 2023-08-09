"use strict";
console.log("hi");
async function getAllRecords() {
  let getResultElement = document.getElementById("bod");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer patr7wxxnZPornxoM.4cd7c2430849909da5cc1647e720289d5b3286a453ace08bcc7c6bb1300efb4f`,
    },
  };

  await fetch(
    `https://api.airtable.com/v0/appIoY76hoJ9I0YJ7/Table%201`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // response is an object w/ .records array

      getResultElement.innerHTML = ""; // clear student

      let newHtml = "";

      for (let i = 0; i < data.records.length; i++) {
        let name = data.records[i].fields["Name"]; // here we are getting column values
        let role = data.records[i].fields["Role"];
        let picture = data.records[i].fields["Picture"];
        let linkedin = data.records[i].fields["linkedin"];
        newHtml += `
        
<div class="expandroom spacing-between col-sm-4 cardImageText">
  <div class="card list border-dark" style="width: 18rem;">
    <div class="d-flex">
      ${
        picture
          ? `<img src="${picture[0].url}" class="img-fluid" style="height: 200px; width: 286px;">`
          : ``
      }
    </div>
    <div class="cardheight card-body">
      <h2 class="card-title card-key">${name}</h2></a>
      <h3 class="card-text">${role}</h3>
       <a href="${linkedin}" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/600px-LinkedIn_logo_initials.png" alt="LinkedIn logo" width="32" height="32"></a>
    </div>
  </div>
</div>
        
        `;
      }

      getResultElement.innerHTML = newHtml;
    });
}

let idParams = window.location.search.split("?id=");
if (idParams.length >= 2) {
  // has at least ["id?", "OUR ID"]
  getOneRecord(idParams[1]); // create detail view HTML w/ our id
} else {
  getAllRecords(); // no id given, fetch summaries
}
