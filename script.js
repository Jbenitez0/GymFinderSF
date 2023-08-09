"use strict";


async function getAllRecords() {
  let getResultElement = document.getElementById("gym");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer patoeoZFNj4ZcEN3z.b92621bd471ac26b0d3005d700271a7c055a63e409a6c81c2107325fbd7127b2`,
    },
  };

  await fetch(`https://api.airtable.com/v0/appYoetXGVdfWMzMJ/Gyms`, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // response is an object w/ .records array

      getResultElement.innerHTML = ""; // clear student

      let newHtml = "";

      for (let i = 0; i < data.records.length; i++) {
        let image = data.records[i].fields["Image"]; // here we are getting column values
        let gymName = data.records[i].fields["Gym Name"];
    
        newHtml += `
        
<div class="expandroom spacing-between col-sm-4 cardImageText">
  <div class=" card list border-dark" style="width: 18rem;">
    <div class="d-flex">
      ${
        image
          ? `<img src="${image[0].url}" class="img-fluid" style="height: 150px; width: 286px;">`
          : ``
      }
    </div>
    <div class=" cardheight card-body">
      <h2 class="card-title card-key"><a href="index.html?id=${
        data.records[i].id
      }" class="gym-link" style="transform:(1.1);">${gymName}</h2></a>
     
    </div>
    
  </div>
</div>
        
        `;
      }

      getResultElement.innerHTML = newHtml;

    });
}

async function getOneRecord(gymId) {
  let gymsResultElement = document.getElementById("gym");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer patoeoZFNj4ZcEN3z.b92621bd471ac26b0d3005d700271a7c055a63e409a6c81c2107325fbd7127b2`,
    },
  };

  await fetch(
    `https://api.airtable.com/v0/appYoetXGVdfWMzMJ/Gyms/${gymId}`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // response is a single object

      let image = data.fields["Image"];
      let gymName = data.fields["Gym Name"];
      let address = data.fields["Address"];
      let pool = data.fields["Pool?"];
      let description = data.fields["Description"];
      let hours = data.fields["Hours"];
      let website = data.fields["Website"];
      let amenities = data.fields["Amenities"];
      let map = data.fields["Map"];
      let yelp = data.fields["rating"];
    
    let star = "";
    if (yelp == 1){
      star = "⭐";
    }
    else if(yelp == 2){
      star ="⭐⭐";
    }
    else if(yelp == 3){
      star = "⭐⭐⭐";
    }
    else if(yelp == 4){
      star = "⭐⭐⭐⭐";
    }
    else if(yelp == 5){
      star = "⭐⭐⭐⭐⭐";
    }
    
      let newHtml = `
        
         <div class="info">
  <div class="card-deck">
    <div
      class="card detail border-dark animate__animated"
      data-aos="fade-right"
      data-aos-delay="100"
    >
      <div class="card-body">
        ${
          image
            ? `<img src="${image[0].url}" class="img-fluid" style=" height: 250px; width: 300px;">`
            : ``
        }
        <h2 class="card-title">${gymName}</h2>

        <p class="card-text">${address}</p>
        <br />
        <p><img src="https://cdn.glitch.global/dcd72e49-6fe3-4d33-8ca2-9322e810efc0/yelp-logo_768x512.png?v=1691614337630" alt="yelp" style="width:80px; height:60px;"/>${star}</p>
      </div>
    </div>

    <div
      class="card detail border-dark animate__animated"
      data-aos="fade-up"
      data-aos-delay="200"
      style="width: 450px;"
    >
      <div class="card-body">
        <h2 class="card-title">Description</h2>
        <p class="card-text">${description}</p>
        <h3 class="card-title">Amenities</h3>
        <p class="card-text"> ${amenities}</p>
      </div>
    </div>
    <div
      class="card detail border-dark animate__animated"
      data-aos="fade-left"
      data-aos-delay="300"
      style="width: 450px;"
    >
      <div class="card-body">
        <h2 class="card-title">Hours</h2>
        <p class="card-text">${hours}</p>
        <br />
        <p class="card-text">
          Visit their website here:
          <a href="${website}" target="_blank"><br />${gymName}</a>
        </p>
      </div>
    </div>
  </div>
</div>
<div class="space2"></div>
<div class="info">
  <br />
  <div class="card-deck">
    <br />
    <div
      class="card detail border-dark animate__animated"
      data-aos="zoom-in"
      data-aos-delay="400"
    >
      <div class="card-body">${map}</div>
    </div>
  </div>
</div>
<br />
<div class="back">
  <br />
  <p><a href="index.html" class="btn btn-primary">Back</a></p>
</div>

`;

gymsResultElement.innerHTML = newHtml;
});
}


function searchFunction() {
  let input, filter, cardimagetext, i, x; // declare all four at once

  input = document.getElementById("myinput");
  filter = input.value.toUpperCase(); // ignore case/capitalization
  cardimagetext = document.getElementsByClassName("cardImageText");

  for (x = 0; x < cardimagetext.length; x++) {
    i = cardimagetext[x].getElementsByClassName("card-key")[0];
    if (i.innerHTML.toUpperCase().indexOf(filter) > -1) {
      cardimagetext[x].style.display = ""; // '' means show
    } else {
      cardimagetext[x].style.display = "none";
    }
  }
}

// look up window.location.search and split, so this would take
// https://dmspr2021-airtable-app.glitch.me/index.html?id=receHhOzntTGZ44I5
// and look at the ?id=receHhOzntTGZ44I5 part, then split that into an array
// ["id?=", "receHhOzntTGZ44I5"] and then we only choose the second one
let idParams = window.location.search.split("?id=");
if (idParams.length >= 2) {
  // has at least ["id?", "OUR ID"]
  getOneRecord(idParams[1]); // create detail view HTML w/ our id
} else {
  getAllRecords(); // no id given, fetch summaries
}
