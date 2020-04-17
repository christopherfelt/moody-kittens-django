
let kittens = [];

//  TODO FBV CreateView
// function addKitten(event) {
//   event.preventDefault();
//   let form = event.target;
//   let kitten = generateKittenProperties()
//   kittens.push(kitten);
//   saveKittens();
//   form.reset();
// }

// TODO FBV delete to remove all kittens that have gone
function removeAllKittens() {
  kittens = [];
  saveKittens();
  sumOfKittens();
}

// TODO FBV delete to remove one gone kitten
function removeKitten(id) {
  let removedKittenIndex = kittens.findIndex(k => k.id == id);
  kittens.splice(removedKittenIndex, 1);
  saveKittens();
}

// TODO FBV get sum of kittens
function sumOfKittens() {
  loadKittens();
  let sumOfKittens = kittens.length;
  document.getElementById("sum-kittens").innerText = sumOfKittens.toString();
}

// TODO Delete
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens));
  drawKittens();
}

// TODO Delete
function loadKittens() {
  let kittenData = JSON.parse(window.localStorage.getItem("kittens"));
  if (kittenData) {
    kittens = kittenData;
  }
}

// TODO Add logic to view or template. Combine with following function
function drawKittens() {
  let template = "";
  let kittensElem = document.getElementById("kittens");
  kittens.forEach(kitten => {
    template += `
          <div class="container card bg-dark text-light kitten ${kitten.mood.toLowerCase()}">
              <img
                class="img-size-1"
                src="https://robohash.org/moodykittens${kitten.img}/?set=set4"
                alt="Kitten"
              />
            <div>
              <span>Name:</span>
              <span>${kitten.name}</span>
            </div>
            ${kittenIsGone(kitten)}

          </div>
    `;
  });
  kittensElem.innerHTML = template;
}

// TODO Add logic to view or template
function kittenIsGone(kitten) {
    let template = ``;
    if (kitten.mood == "Gone") {
      template = `<div><span>Ran Away</span></div>
                  <div><button class="btn-cancel" onclick="removeKitten('${kitten.id}')">Remove</button></div>`;
    } else {
      template = `
          <div>
            <span>Mood:</span>
            <span>${kitten.mood}</span>
          </div>
          <div>
            <span>Affection:</span>
            <span>${kitten.affection}</span>
          </div>
          <div>
            <button class="btn-cancel" onclick="pet('${kitten.id}')">PET</button>
            <button onclick="catnip('${kitten.id}')">CATNIP</button>
          </div>`;
    }
    return template;
  }


// TODO Delete
function findKittenById(id) {
  return kittens.find(k => k.id == id);
}

// TODO Add simple view
function pet(id) {
  let petKitten = findKittenById(id);
  let petReaction = Math.random();
  if (petReaction > 0.7) {
    petKitten.affection++;
  } else {
    petKitten.affection--;
  }
  setKittenMood(petKitten);
  saveKittens();
}

// TODO Add simple view
function catnip(id) {
  let catnipKitten = findKittenById(id);
  catnipKitten.mood = "Tolerant";
  catnipKitten.affection = 5;

  saveKittens();
}

// TODO Add simple view
function setKittenMood(kitten) {
  if (kitten.affection > 6) {
    kitten.mood = "Happy";
  } else if (kitten.affection <= 5 && kitten.affection > 3) {
    kitten.mood = "Tolerant";
  } else if (kitten.affection <= 3 && kitten.affection > 0) {
    kitten.mood = "Angry";
  } else if (kitten.affection == 0) {
    kitten.mood = "Gone";
  }
}


// TODO Delete
function getStarted() {
  document.getElementById("welcome").remove();
  loadKittens();
  drawKittens();
}

/**
 * Defines the Properties of a Kitten
 * @typedef {{id: string, name: string, mood: string, affection: number}} Kitten
 */

// function generateKittenProperties(form){

//   let kitten = {
//     id: generateId(),
//     name: form.name.value,
//     mood: "Tolerant",
//     affection: 5,
//     img: generateImageNum()
//   };

//   return kitten
  
// }





/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
// function generateId() {
//   return (
//     Math.floor(Math.random() * 10000000) +
//     "-" +
//     Math.floor(Math.random() * 10000000)
//   );
// }

// function generateImageNum() {
//   return Math.ceil(Math.random() * 5);
}

// sumOfKittens();
