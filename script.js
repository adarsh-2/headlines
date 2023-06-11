let container_div = document.getElementById("container");

async function fetchnews() {

  const apiKey = "d0dfb639480c40b68ac3a3cd83ef55dd"; // this is my authentication id to access the api

  const apiEndPoint = "https://api.bing.microsoft.com/v7.0/news/search?count=24"; 
  // this is the url of api

  const search = document.getElementById("search").value;
  // here I am storing the value entered in the text box in "search" variable
  const loading = document.getElementById("loading")

  let searchingNews = search?apiEndPoint+ "&q=" + search : apiEndPoint;
  
  loading.classList.remove("hidden")
  
  const response = await fetch(searchingNews, {
    // creating response variable
    // response will go to apiEndPoint to fetch the news
    headers: {
      "Ocp-Apim-Subscription-Key": apiKey, // here we are passing the api key to access the api
    },
  })
    .then(function (response) {
      // this will store the response , the response is coming by default in Json format
      return response.json(); //
    })
    .then(function (data) {
      // data here is response.json
      // data here is JSON object
      loading.classList.add("hidden")
      const news = data.value;

      for (let i = 0; i < news.length; i++) {
        let parent = document.createElement("a");

        container_div.append(parent);

        parent.classList.add("parent-dim", "list", "shadow");

        let link = document.createElement("a");
        let div = document.createElement("div");
        let provider = document.createElement("div");
        let img = document.createElement("img");

        provider.classList.add("dim");
        div.classList.add("dim", "bold");
        img.classList.add("img-dim");

        img.src = news[i]?.image?.thumbnail.contentUrl
          ? news[i].image.thumbnail.contentUrl
          : "./Image/noimage.png";
        parent.target = "_blank";
        parent.href = news[i].url;
        provider.innerHTML = news[i].provider[0].name;
        div.innerHTML = news[i].name;

        parent.append(img);
        parent.append(link);
        parent.append(provider);
        parent.append(div);

        
      }
    })
    .catch(function (error) {
      // This block is to check if there is any error
      console.log(error); // Error will be displayed if there is any error
    });
}

fetchnews();

function searchFunc() {
    container_div.innerHTML = "";
    fetchnews();
}

const search = document.getElementById("search");

search.addEventListener("keydown",(e)=>{ // keydown event is fired when a key is pressed
  if(e.keyCode == 13) // keycode of enter is 13
  searchFunc()
})
