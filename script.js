//defining some global variables
const rootElem = document.getElementById("root")
const showSelect = document.getElementById("showselection");
const showselediv=document.getElementById('showsele')
const keydiv=document.getElementById('key')
const allShows = getAllShows();

window.onload = setup;
// set up function
 function setup() {
  loadPage(allShows)
 }

//Retrieve the JSON
 function getfetch(showid){
  let url=`https://api.tvmaze.com/shows/${showid}/episodes`
fetch(url)
  // Get the response and extract the JSON
  .then(function (response) {
    return response.json();
  })
  // Do something with the JSON
  .then((response) => {
    makePageForEpisodes(response);
     selecttionForEpisode(response)
    //  createShowDropDown(allShows)
     let input=document.getElementById('searchinput')
     input.addEventListener('keyup',(event)=>{
    let episodes=response
    const searchValue=event.target.value
     const filteredepisodes=episodes.filter(episode=>{return (episode.name.toLowerCase().includes(searchValue.toLowerCase())||episode.summary.toLowerCase().includes(searchValue.toLowerCase()))

    })
    let spanEl=document.getElementById('count-epispde')
     spanEl.innerText=filteredepisodes.length +' / '+ episodes.length
     makePageForEpisodes(filteredepisodes)

   })
  //  selecttionForEpisode(response)
  
   const selectedepisode=document.getElementById('secletedepisodes')
  
    episodes=response
  episodes.forEach(episode=>{
    let optionEl=document.createElement('option')
    selectedepisode.appendChild(optionEl)
    optionEl.setAttribute('value',episode.id)
    optionEl.innerText=episode.season.toString().padStart(3,"S0")+episode.number.toString().padStart(3,"E0")+"-"+episode.name
  })
  selectedepisode.addEventListener('change',()=>{
    let episodes=response
    episodes.forEach(episode=>{if(episode.id==event.target.value){
      makePageForEpisodes([episode])
    }
  })

  })

   })
  // If something goes wrong
  .catch((error) => console.log(error));
 }
//make page to show episodes of one show
function makePageForEpisodes(episodeList) {
   const sectionEl=document.createElement('section')
   sectionEl.setAttribute('class','main')
    for(let episode of episodeList){
       const articleEl=document.createElement("article")
       const h3=document.createElement("h3")
       const image=document.createElement("img")
       let pragragh=document.createElement("p")
       sectionEl.appendChild(articleEl);
       articleEl.setAttribute('class','each-film')
       articleEl.appendChild(h3);
       articleEl.appendChild(image);
       articleEl.appendChild(pragragh);
       h3.innerText=episode.name+'-'+episode.season.toString().padStart(3,'S0')+episode.number.toString().padStart(3,'E0')
        image.src=episode.image.medium
        pragragh.innerHTML=episode.summary
 }
 rootElem.innerHTML='';
   rootElem.appendChild(sectionEl)
  
   }
    // function createShowDropDown(showList) {
  //  creates drop down select menu with each option a link to the episode
  allShows.sort((a, b) => a.name.localeCompare(b.name)).forEach((show) => {
    const option = document.createElement("option"); // create option elemenfor each ep and fill the select dropdown
    showSelect.appendChild(option);
    option.innerText = `${show.name}`
    option.setAttribute('value',show.id)
  })
   showSelect.addEventListener('change',()=>{
    allShows.forEach(show=>{
      let showid=event.target.value
      console.log(showid)
      let url=`https://api.tvmaze.com/shows/${showid}/episodes`
      getfetch(showid)
    })
   })


 function selecttionForEpisode(x){
  const selectedepisode=document.getElementById('secletedepisodes')
  
    let episodes=x
  episodes.forEach(episode=>{
    let optionEl=document.createElement('option')
    selectedepisode.appendChild(optionEl)
    optionEl.setAttribute('value',episode.id)
    optionEl.innerText=episode.season.toString().padStart(3,"S0")+episode.number.toString().padStart(3,"E0")+"-"+episode.name
  })
  selectedepisode.addEventListener('change',()=>{
  
    episodes.forEach(episode=>{if(episode.id==event.target.value){
      makePageForEpisodes([episode])
    }
  })

  })
}
function loadPage(){
    allShows.forEach(show=>{
   let sectionEl=document.createElement('section')
    sectionEl.setAttribute('class','shows')
    sectionEl.setAttribute('id',show.id)
    let divone=document.createElement('div')
    divone.setAttribute('class','showinfo')
    let divtwo=document.createElement('div')
    let image=document.createElement('img')
    image.src=show.image?.medium 
    let title=document.createElement('h4')
    title.innerText=show.name
    let para=document.createElement('p')
    para.innerHTML=show.summary
    let ulEl=document.createElement('ul')
    let liOne=document.createElement('li')
    liOne.innerText=`Rated ${show.rating.average}`
    let liTwo=document.createElement('li')
    liTwo.innerText=`Genres:genres`
    let liThree=document.createElement('li')
    let liFour=document.createElement('li')
    ulEl.appendChild(liOne)
    divtwo.appendChild(ulEl)
    divone.appendChild(image)
    divone.appendChild(title)
    divone.appendChild(para)
    sectionEl.appendChild(divone)
    sectionEl.appendChild(divtwo)
    root.appendChild(sectionEl)
    sectionEl.addEventListener('click',e=>{
    getfetch(show.id)
  })
  })
  
  }
