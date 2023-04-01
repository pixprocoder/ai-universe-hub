const loadAllData = async () => {
  const url = "https://openapi.programming-hero.com/api/ai/tools";
  const res = await fetch(url);
  const data = await res.json();
  displayData(data.data.tools);
};

const displayData = (tools) => {
  for (const tool of tools) {
    console.log(tool);
  }
};

loadAllData();
