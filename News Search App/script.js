const apikey= 'ad52e02717b348509ed969c25242b4e9'
const blogContainer= document.getElementById('block-container')
const searchField=document.getElementById('search-input');
const searchButton= document.getElementById('search-button');


async function fetchRandomNews(){
    try {
        const apiUrl= `https://newsapi.org/v2/everything?q=samsung&from=2024-05-11&to=2024-05-15&apiKey=${apikey}`
        const response= await fetch(apiUrl)
        const data= await response.json();
        console.log(data)
        return data.articles;

        
    } catch (error) {
        console.error("Error fetch random news", error)
        return []
        
    }

}

searchButton.addEventListener('click', async ()=>{
    const query= searchField.value.trim();
    if(query!==""){
        try {
            const articles=await fetchNewsQuery(query);
            displayBlogs(articles);


            
        } catch (error) {
            console.error("Error fetching news by query", error)
            
        }
    }
})

async function fetchNewsQuery(query){
    try {
        const apiUrl= `https://newsapi.org/v2/everything?q=${query}&pageSize=36&apiKey=${apikey}`
        const response= await fetch(apiUrl)
        const data= await response.json();
        console.log(data)
        return data.articles;

        
    } catch (error) {
        console.error("Error fetch random news", error)
        return []
        
    }

}

 function displayBlogs(articles){
    blogContainer.innerHTML="";
    articles.forEach((article)=>{
        const blogCrad= document.createElement('div');
        blogCrad.classList.add("blog-card");
        const img = document.createElement('img');
        
        img.src = article.urlToImage || 'https://ajr.org/wp-content/themes/AJR-theme/images/news-placeholder.jpg'; // Add a placeholder image in case urlToImage is null
        img.alt = article.title;

        const title= document.createElement('h2')
        const traunketedTitle= article.title.length>30 ? article.title.slice(0,30)+"....":article.title ;
        title.textContent=traunketedTitle
        


        const descriptions = document.createElement('p');
        const truncatedDes = article.description && article.description.length > 120 ? article.description.slice(0, 120) + "..." : article.description || 'No description available.';
        descriptions.textContent = truncatedDes;
        

        
        blogCrad.appendChild(img)
        blogCrad.appendChild(title)
        blogCrad.appendChild(descriptions)
        blogCrad.addEventListener('click', ()=>{
            window.open(article.url, "_blank");
        })

        blogContainer.appendChild(blogCrad)
    })

 }

(async ()=>{
    try {
        const articles= await fetchRandomNews()
        displayBlogs(articles)
    } catch (error) {
        console.error("Error fetch random news", error)
        
    }
})();