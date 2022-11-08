//You can edit ALL of the code here
//Retrieve the JSON
 function getfetch(){
fetch("https://api.tvmaze.com/shows/179/episodes")
  // Get the response and extract the JSON
  .then(function (response) {
    return response.json();
  })
  // Do something with the JSON
  .then((response) => {
    makePageForEpisodes(response);
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
    // let e=optionEl.target.value
    episodes.forEach(episode=>{if(episode.id==event.target.value){
      makePageForEpisodes([episode])
    }
  })

  })

  })
  // If something goes wrong
  .catch((error) => console.log(error));
 }

 function setup() {
   const allEpisodes = getfetch();
    // makePageForEpisodes(allEpisodes);

 }
function makePageForEpisodes(episodeList) {
    const rootElem = document.getElementById("root")
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

  // let input=document.getElementById('searchinput')

  // input.addEventListener('keyup',(event)=>{
  //   let episodes=getfetch()
  //   const searchValue=event.target.value
  //    const filteredepisodes=episodes.filter(episode=>{return (episode.name.toLowerCase().includes(searchValue.toLowerCase())||episode.summary.toLowerCase().includes(searchValue.toLowerCase()))

  //   })
  //   let spanEl=document.getElementById('count-epispde')
  //    spanEl.innerText=filteredepisodes.length +' / '+ episodes.length
  //    makePageForEpisodes(filteredepisodes)

  //  })

  // const selectedepisode=document.getElementById('secletedepisodes')
  
  //   episodes=getAllEpisodes()
  // episodes.forEach(episode=>{
  //   let optionEl=document.createElement('option')
  //   selectedepisode.appendChild(optionEl)
  //   optionEl.setAttribute('value',episode.id)
  //   optionEl.innerText=episode.season.toString().padStart(3,"S0")+episode.number.toString().padStart(3,"E0")+"-"+episode.name
  // })
  // selectedepisode.addEventListener('change',()=>{
  //   let episodes=getfetch()
  //   // let e=optionEl.target.value
  //   episodes.forEach(episode=>{if(episode.id==event.target.value){
  //     makePageForEpisodes([episode])
  //   }
  // })

  // })
  window.onload = setup;

