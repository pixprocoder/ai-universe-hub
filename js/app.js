const loadAllData = async () => {
  const url = "https://openapi.programming-hero.com/api/ai/tools";
  const res = await fetch(url);
  const data = await res.json();
  displayData(data.data.tools);
};

const displayData = (tools) => {
  const showAll = document.getElementById("show-all-btn");

  if (tools.length >= 6) {
    tools = tools.slice(0, 6);
    showAll.classList.remove("hidden");
  } else {
    // showAll.classList.add("block");
  }

  tools.forEach((tool) => {
    const cardContainer = document.getElementById("card-container");
    const cardDiv = document.createElement("div");
    const classList = ["border", "rounded", "p-6"];
    cardDiv.classList.add(...classList);
    cardDiv.innerHTML = `
    <img
        class="rounded"
        src="${tool.image}"
        alt=""
    />
    <div class="feature-container">
        <h3 class="text-2xl font-bold my-2">Feature</h3> 
        <ul>
        <li>${tool.features[0]}</li>
        <li>${tool.features[1]}</li>
        <li>${tool.features[2]}</li>
        </ul>     
    </div>
    <hr class="my-4"/>
    <div class="date flex justify-between items-center">
        <div>
        <h3 class="text-2xl font-bold">${tool.name}</h3>
        <p class="my-2">${tool.published_in}</p>
        </div>
       <div>
       <label onclick="loadTool('${tool.id}')" for="my-modal-3" class="btn px-3 py-1 text-lg ">Details</label>
       </div>
    </div>
    `;
    // console.log(tool.id);
    cardContainer.appendChild(cardDiv);
  });
};

const loadTool = async (id) => {
  console.log(id);
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
};

loadAllData();
