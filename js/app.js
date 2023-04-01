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
       <label onclick="loadTool('${tool.id}')" for="detail-modal" class="btn px-3 py-1 text-lg ">Details</label>
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
  displayTool(data);
};

const displayTool = (tool) => {
  const { data } = tool;
  console.log(data);
  const parentDiv = document.getElementById("modal-container");
  parentDiv.innerHTML = `
  <div class="flex-1 border p-4 rounded">
    <h1 class="text-lg">${data.description}</h1>
    <div class="grid grid-cols-3 gap-4">
      <div class="bg-gray-600 p-4 rounded-md">
      <h1>Free of cost</h1>
      </div>
      <div class="bg-gray-600 p-4 rounded-md">
      <h1>Free of cost</h1>
      </div>
      <div class="bg-gray-600 p-4 rounded-md">
      <h1>Free of cost</h1>
      </div>
    </div>
    <div class="grid grid-cols-2">
      <div>
        <h1>Features</h1>
        <ul>
            <li>${data.integrations[0]}</li>
            <li>${data.integrations[1]}</li>
            <li>${data.integrations[2]}</li>
        </ul>
      </div>
      <div>
        <h1>integrations</h1>
      </div>
    </div>
   </div>

      <div class="flex-1">
      <img src="${data.image_link}" />
        <h1>
          ${data.input_output_examples[0].input}
        </h1>
        <h1>
          ${data.input_output_examples[0].output}
        </h1>
      </div>
  `;
};

loadAllData();
