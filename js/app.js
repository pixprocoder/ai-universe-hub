const loadAllData = async () => {
  const url = "https://openapi.programming-hero.com/api/ai/tools";
  const res = await fetch(url);
  const data = await res.json();
  displayData(data.data.tools);
};

const displayData = (tools) => {
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
        <h3 class="text-2xl font-bold">Feature</h3> 
        <ul>
        <li>${tool.features[0]}</li>
        <li>${tool.features[1]}</li>
        <li>${tool.features[2]}</li>
        </ul>     
    </div>
    <hr class="my-4"/>
    <div class="date">
        <h3 class="text-2xl font-bold">${tool.name}</h3>
        <p>${tool.published_in}</p>
    </div>
    `;
    console.log(tool);
    cardContainer.appendChild(cardDiv);
  });
};

loadAllData();
