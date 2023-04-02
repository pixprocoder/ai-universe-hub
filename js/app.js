const loadAllData = async () => {
  const url = "https://openapi.programming-hero.com/api/ai/tools";
  const res = await fetch(url);
  const data = await res.json();
  displayData(data.data.tools);
};

const displayData = (tools) => {
  // const showAll = document.getElementById("show-all-btn");
  // Date operations
  let arr = [];
  tools.map((tool) => {
    console.log(tool.published_in);
    const dates = tool.published_in;
    const newDate = new Date(dates);
    const day = newDate.getDate();
    const month = newDate.getMonth();
    const year = newDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    arr.push(formattedDate);
  });
  console.log(arr);

  // if (tools.length >= 6) {
  //   tools = tools.slice(0, 6);
  //   showAll.classList.remove("hidden");
  // } else {
  //   showAll.classList.add("block");
  // }

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
  const parentDiv = document.getElementById("modal-container");
  const modalLeftContainer = document.getElementById("modal-left-container");

  // Description
  const desc = document.getElementById("modal-description");
  desc.innerText = `${data.description}`;

  // Pricing And Plan
  const pricingDiv = document.getElementById("modal-price-container");
  pricingDiv.innerHTML = "";
  const { pricing } = data;
  pricing.forEach((e) => {
    const div = document.createElement("div");
    const classList = ["rounded-md", "p-4", "bg-gray-600", "text-green-300"];
    div.classList.add(...classList);
    div.innerHTML = `
       <h1>${e.plan}</h1>
       <h1>${e.price}</h1>
     `;
    pricingDiv.appendChild(div);
  });

  // Features and Integrations
  const featureUlContainer = document.getElementById("feature-ul");
  featureUlContainer.innerText = "";
  const integrationUlContainer = document.getElementById("integration-ul");
  integrationUlContainer.innerText = "";

  const values = Object.values(data.features);
  values.forEach((e) => {
    const featureLi = document.createElement("li");
    featureLi.innerText = `${e.feature_name}`;
    featureUlContainer.appendChild(featureLi);
  });
  const { integrations } = data;
  integrations.forEach((e) => {
    const integrationLi = document.createElement("li");
    integrationLi.innerText = `${e}`;
    integrationUlContainer.appendChild(integrationLi);
  });

  //modal-right-container
  const modalRightContainer = document.getElementById("modal-right-container");
  const image = document.getElementById("modal-img");
  const input = document.getElementById("modal-input");
  const output = document.getElementById("modal-output");
  image.src = `${data.image_link[0]}`;
  input.innerText = `${data.input_output_examples[0].input}`;
  output.innerText = `${data.input_output_examples[0].output}`;
  modalRightContainer.appendChild(image);
  modalRightContainer.appendChild(input);
  modalRightContainer.appendChild(output);
};

loadAllData();
