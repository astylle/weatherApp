// src/index.js
import "./styles.css"
import { toggleSidebar } from "./websiteFunctions/sidebar"
import { locationSearch } from "./weather/fetchingAPI"
// console.log(greeting);

let sidebar = document.getElementById('sidebarButton')
sidebar.addEventListener("click", toggleSidebar)

document.getElementById("search").addEventListener("submit", locationSearch)


