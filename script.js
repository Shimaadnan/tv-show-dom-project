//You can edit ALL of the code here

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);

}
const rootElem = document.getElementById("root");
function makePageForEpisodes(episodeList) {
  // const rootElem = document.getElementById("root");
  const header=document.createElement('header')
  rootElem.appendChild(header)
  const sectionEl=document.createElement('section')
  rootElem.appendChild(sectionEl)
  sectionEl.setAttribute('class','main')
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  for(let episode of episodeList){
  const articleEl=document.createElement("article")
        const h3=document.createElement("h3")
        const image=document.createElement("img")
        let pragragh=document.createElement("p")
        sectionEl.appendChild(articleEl);
       articleEl.appendChild(h3);
       articleEl.appendChild(image);
       articleEl.appendChild(pragragh);
       h3.innerText=episode.name+'-'+episode.season.toString().padStart(3,'S0')+episode.number.toString().padStart(3,'E0')
       image.src=episode.image.medium
       pragragh.innerHTML=episode.summary
}
}
const input=document.getElementById('searchinput')
input.addEventListener('input',matchEpisode)
function matchEpisode(){

  const allEpisodes=getAllEpisodes()
   let matchList=allEpisodes.filter(episode=>{return (episode.name.toLowerCase().includes(input.value.toLowerCase())||episode.summary.toLowerCase().includes(input.value.toLowerCase()))})
    let spanEl=document.getElementById('count-epispde')
    spanEl.innerText=matchList.length +' / '+ allEpisodes.length
    makePageForEpisodes(matchList);
  

  // })

}




 window.onload = setup;

