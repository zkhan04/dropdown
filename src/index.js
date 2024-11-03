import { createDropDown } from "./dropdown";
import './style.css';

const body = document.querySelector("body");

const title = "Test dropdown"
const options = ["a", "b", "c"];

body.appendChild(createDropDown(title, options));
body.appendChild(createDropDown(title, options));