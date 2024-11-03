const createDropDownHeader = (title) => {
    const dropDownHeader = document.createElement("div");
    const dropDownHeaderText = document.createElement("p");
    dropDownHeaderText.innerHTML = title;
    dropDownHeaderText.classList.add("dropdown-header-text");

    const dropDownHeaderStatus = document.createElement("div");


    // it should display a + or - depending on if it's open
}

const createDropDownOption = (s, linked_parent) => {
    /**
     * creates a component for a drop down option.
     * adds an event listener that chooses the option when clicked.
     */
    const option = document.createElement("div");
    option.innerHTML = s;

    option.addEventListener("click", (e) => dropDownOptionCallback(e, linked_parent));
    option.classList.add("dropdown-option")
    return option;
}

const createDropDownOptionList = (options, dropDownHeader) => {
    /**
     * creates the list of dropdown options.
     */
    
    const optionList = document.createElement("div");
    optionList.classList.add("option-list");
    options.forEach(element => {
        optionList.appendChild(createDropDownOption(element, dropDownHeader));
    });

    let visible = false;
    // toggles the visibility
    const toggleVisibility = () => {
        visible = !visible
        controlVisibility()
    }

    // based on the value of the visible flag, control the behavior
    const controlVisibility = () => {
        if (visible) {
            optionList.classList.remove("closed");
            optionList.classList.add("open");
        } else {
            optionList.classList.remove("open")
            optionList.classList.add("closed");
        }
    }

    controlVisibility()

    return {visible, optionList, toggleVisibility}
}

const dropDownHeaderCallback = (e, option_list_container) => {
    /**
     * When the header is clicked, the dropdown menu should toggle its visibility
     * (If it's open, then close it, and vice versa)
     */
    console.log("dropdown header callback triggered!")
    option_list_container.toggleVisibility()
}

const dropDownOptionCallback = (e, linked_parent) => {
    /**
     * given an event and the dropdown header, replace the dropdown header's content
     * with the contents of whatever option was just selected.
     */
    linked_parent.innerHTML = e.target.innerHTML;

    // this should also toggle visibility somehow............
    linked_parent.dispatchEvent(new Event("click"));
}

const createDropDown = (title, options) => {
    /**
     * Puts everything together!
     */
    const dropDown = document.createElement("div");
    dropDown.classList.add("dropdown")
    
    const dropDownHeader = document.createElement("div");
    dropDownHeader.innerHTML = title;
    dropDownHeader.classList.add("dropdown-header");

    const optionListContainer = createDropDownOptionList(options, dropDownHeader);
    dropDownHeader.addEventListener("click", (e) => dropDownHeaderCallback(e, optionListContainer));

    dropDown.appendChild(dropDownHeader);
    dropDown.appendChild(optionListContainer.optionList);

    return dropDown;
}

/* TBH Just unify everything into one object LOL */ 



export {createDropDown}