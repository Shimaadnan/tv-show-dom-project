//You can edit ALL of the code here

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);

}
function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  let header=document.createElement('header')
  let select=document.createElement('select')
  header.appendChild(select)
  let searchbox=document.createElement('input')
  rootElem.appendChild(header)
  header.appendChild(searchbox)
   let lable=document.createElement('lable');
  header.appendChild(lable)
  lable.innerText='Displaying Episods'
  const sectionEl=document.getElementById("main-page");
  rootElem.appendChild(sectionEl)
   let spanEl=document.createElement('span')
  lable.appendChild(spanEl)
  spanEl.innerText='/73'
  for (let episode of episodeList){
        const optionEl=document.createElement('option')
        select.appendChild(optionEl)
        optionEl.innerText=episode.season.toString().padStart(3,'S0')+episode.number.toString().padStart(3,'E0')+'-'+episode.name
        const articleEl=document.createElement("article");
        const h3=document.createElement("h3");
        const image=document.createElement("img");
        let pragragh=document.createElement("p")
        sectionEl.appendChild(articleEl);
       articleEl.appendChild(h3);
       articleEl.appendChild(image);
       articleEl.appendChild(pragragh);
       h3.innerText=episode.name+'-'+episode.season.toString().padStart(3,'S0')+episode.number.toString().padStart(3,'E0');
       image.src=episode.image.medium;
       pragragh.innerHTML=episode.summary
}
 optionEl.addEventListener('change',()=>{
  
   articleEl=optionEl.value
 })
searchbox.addEventListener('input',checkMatchEpisode)
function checkMatchEpisode(){
  let matchList=episodeList.filter(episode=>{return (episode.name.toLowerCase().includes(searchbox.value.toLowerCase())||episode.summary.toLowerCase().includes(searchbox.value.toLowerCase()))
    
  

  })
  spanEl.innerText=matchList.length +' / '+ episodeList.length
  
}

let footer=document.createElement('footer');
let link=document.createElement('a')
link.setAttribute('href','https://www.tvmaze.com/')
link.innerText='TVMaze.com'
rootElem.appendChild(footer);
footer.appendChild(link);
}

// searchbox.addEventListener('input',checkMatchEpisode)
// function checkMatchEpisode(){
//   let matchList=episodeList.filter(episode=>{return (episode.name.toLowerCase().includes(searchbox.value.toLowerCase())||episode.summary.toLowerCase().includes(searchbox.value.toLowerCase()))
    

//   })
//   spanEl.innerText=matchList.length +' / '+ episodeList.length
// }


 window.onload = setup;

