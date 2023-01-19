let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
  const form = document.querySelector("form");
  form.addEventListener("submit", handleSubmit);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(e.target);
    let toy = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    };

    addNewToy(toy);
    renderToyCard(toy);
  };

  function renderToyCard(toy) {
    const div = document.createElement("div");
    div.className = "card";

    const h2 = document.createElement("h2");
    h2.textContent = toy.name;

    const img = document.createElement("img");
    img.src = toy.image;
    img.className = "toy-avatar";

    const p = document.createElement("p");
    p.textContent = `${toy.likes} likes`;

    const button = document.createElement("button");
    button.textContent = "Like";
    button.className = "like-btn";
    button.addEventListener("click", () => {
      console.log("click");
      toy.likes += 1 ;
      p.textContent = `${toy.likes} likes`;
      addLikes(toy);
    });


    div.appendChild(h2);
    div.appendChild(img);
    div.appendChild(p);
    div.appendChild(button);
   

    document.querySelector("#toy-collection").appendChild(div);
  }

  
  fetch ("http://localhost:3000/toys")
  .then (res => res.json())
  .then (toys => toys.forEach(renderToyCard));

  function addNewToy(newToy) {
    fetch ('http://localhost:3000/toys', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
  },
  body: JSON.stringify(newToy)
  })
  .then (res => res.json())
  .then (toy => console.log(toy))
}

function addLikes(toy) {
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
  },
  body: JSON.stringify(toy)
})
.then (res => res.json())
.then (likes => console.log(likes))
}

