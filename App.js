const buttons = document.querySelectorAll(".filterBtns>button");
const input = document.querySelector(".searchBox>input");
const searchBtn = document.querySelector(".searchBtn");
const result = document.querySelector(".result");

buttons.forEach((button) => {
  button.addEventListener("click", (el) => {
    activateBtn(el);
  });
});

let active = "";
function activateBtn(el) {
  if (el.target && !el.target.classList.contains("activate")) {
    if (document.querySelector(".activate")) {
      document.querySelector(".activate").classList.remove("activate");
    }
    el.target.classList.add("activate");
    active = el.target.classList[0];
  } else {
    el.target.classList.remove("activate");
    active = "";
    input.value="";
    result.innerHTML="";
    result.innerHTML=defaultElement();
  }
}
searchBtn.addEventListener("click", () => {
  if (active === "") {
    alert("Please select place or city or name.");
    return;
  }
  if (input.value === "") {
    alert("Please enter something.");
    return;
  }
    fetch("https://isro.vercel.app/api/centres")
    .then((x) => {
        if(x.ok){
            return x.json();
        }
        throw new Error(`${x.status}`);
        
      })
      .then((y) => {
        let f = true;
        result.innerHTML = "";
        y.centres.forEach((el) => {
          if (el[`${active}`].toLowerCase() == `${input.value}`.toLowerCase()) {
            // console.log(el);
            result.innerHTML += createEl(el);
            f = false;
          }
        });
        if (f) {
          input.value = "";
          result.innerHTML = "<div style='color:red'>Match not found!</div>";
        }
    })
    .catch((err)=>{
        result.innerHTML = `<div style='color:red'>${err}</div>`
    });
});

function createEl(el) {
  let ele = `<div class="searchItems"><div class="center"><h4>CENTER</h4><p>${el.name}</p></div><div class="city"><h4>CITY</h4><p>${el.Place}</p>
    </div>
    <div class="state">
        <h4>STATE</h4>
        <p>${el.State}</p>
    </div>
</div>`;
  return ele;
}
const def=[
    {
        name:"Western RRSC",
        Place:"Jodhpur",
        State:"Rajasthan"
    },
    {
        name:"Space Applications Centre",
        Place:"Ahmedabad",
        State:""
    },
    {
        name:"Vikram Sarabhai Space centre",
        Place:"Tiruvananthapuram",
        State:"Kerala"
    }
];
window.onload=()=>{
    result.innerHTML=defaultElement();
}
function defaultElement(){
    let el="";
    for(let i=0;i<def.length;i++){
        el+=createEl(def[i]);
    }
    return el;
}


