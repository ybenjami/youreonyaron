
const mediumArticlefetch = function(json){
    const container = document.getElementById('mediumArticles');

    const array = json.items.slice(0, 3).map(item => {
        let parser = new DOMParser();
        let parsedHtml = parser.parseFromString(item.description, 'text/html');
        const paragraph = parsedHtml.getElementsByTagName("p")[0]
        const publishDate = new Date(item.pubDate);
        return`
        <div class="carousel-item white-text blue-grey darken-1" href="#">
          <div class="row">
            <div class="col l3 m12 center-align">
              <h5 class="">${item.title}</h5>
                <span><a href="${item.link}">Read</a></span>
                <span> <p>${publishDate.toDateString()}</p></span>
                ${item.categories.map(cat => {
                  return `<div class="chip">${cat} </div>`
                }).join('')}
            </div>
            <div class="col l9 hide-on-small-only">
              <img src="${item.thumbnail}" >
            </div>
            </div>
        </div>`
    }).join('');
    container.innerHTML= array
    
    var car = document.querySelectorAll('.carousel')
    M.Carousel.init(car, {
      fullWidth: true,
      indicators: true
    });

}

const bioFetch = function(json){
    const container = document.getElementById('bioSection');
    const image = `<img src='${json.feed.image}' class="circle responsive-img"> `;
    container.innerHTML = image;
}


fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@youreonyaron').then((res) => res.json()).then((data) => {
    mediumArticlefetch(data);
    bioFetch(data);
    });