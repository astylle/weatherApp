// src/index.js
import "./styles.css"
import { toggleSidebar, callAll } from "./weather/sidebar"
import { locationSearch, clearLS} from "./weather/fetchingAPI"
// console.log(greeting);

let sidebar = document.getElementById('sidebarButton')
sidebar.addEventListener("click", toggleSidebar)

document.getElementById("search").addEventListener("submit", locationSearch)
callAll()
clearLS()
