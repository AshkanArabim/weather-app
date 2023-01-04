import dom from "./dom.js";
import data from "./data.js";
import css from "./style.css";

const graphs = document.querySelectorAll(".hourly-chart > *");

let h = 0;
for (let graph of graphs) {
  h += 10
  graph.style.height = `${h}px`;
}

dom();