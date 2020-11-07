
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

const heroArticlefetch = function(json){
    const container = document.getElementById('heroArticle');
    const item = json.items[0];
    const publishDate = new Date(item.pubDate);

    let parser = new DOMParser();
    let parsedHtml = parser.parseFromString(item.description, 'text/html');
    const paragraph = parsedHtml.getElementsByTagName("p")[0]
 
    const hero = `<div class="card col s12 m12 l8 offset-l2">
        <div class="card-content col">
        <span class="card-title grey-text text-darken-4">${item.title}</span>
        
          <div class="card-image waves-effect waves-block waves-light">
          <img class="activator heroImage" src="${item.thumbnail}">
        </div>
            <p>${paragraph.innerHTML}</p>
        </div>
        <span> <p>${publishDate.toDateString()}</p></span>
          ${item.categories.map(cat => {
                return `<a class="btn-small disabled list-pad">${cat} </a>`
          }).join('')}
        
        <p><a href="${item.link}">Read</a><i class="material-icons right">chevron_right</i></p>
      </div>`
    container.innerHTML= hero
}

const bioFetch = function(json){
    const container = document.getElementById('bioSection');
    const image = `<img src='${json.feed.image}'> `;
    container.innerHTML = image;
}


fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@youreonyaron').then((res) => res.json()).then((data) => {
    heroArticlefetch(data);
    mediumArticlefetch(data);
    bioFetch(data);
    });