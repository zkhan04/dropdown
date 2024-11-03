const createDropDownState = () => {
    /**
     * creates a state object. whenever the state is changed, a bunch of event listeners fire
     */
    let visible = true;
    const listeners = []

    // toggles the visible flag, and triggers each listener
    const toggleVisibility = () => {
        visible = !visible;
        listeners.forEach(listener => listener(visible));
    };

    // whenever we call onVisibleChange(callback) somewhere, that callback
    // gets added to the list of things that should occur when the dropdown is toggled.
    const onVisibleChange = (callback) => {
        listeners.push(callback);
    };

    const getVisible = () => visible;

    return {
        toggleVisibility, onVisibleChange, getVisible
    };
}

const createDropDownController = (state, dropDownHeader, optionList) => {
    // when the dropDownHeader is clicked, toggle the visibility
    dropDownHeader.addEventListener("click", () => state.toggleVisibility());

    // when the visibility is toggled, we want to edit CSS classes of the optionList so that
    // it can be hidden/revealed appropriately.
    state.onVisibleChange((visible) => {
        if (visible) {
            optionList.classList.remove("closed");
            optionList.classList.add("open");
        } else {
            optionList.classList.remove("open");
            optionList.classList.add("closed");
        }
    });
}


const createDropDownOptionList = (options, onclick) => {
    /**
     * creates the list of options that a user can select from.
     */
    const optionList = document.createElement("div");
    optionList.classList.add("option-list");
    options.forEach(option => {
        const optionElement = document.createElement("div");
        optionElement.classList.add("dropdown-option");
        optionElement.innerHTML = option;

        // the event listener is defined externally
        optionElement.addEventListener("click", () => onclick(option));
        optionList.appendChild(optionElement);
    });
    optionList.classList.add("option-list");
    return optionList;
}

const createDropDownHeader = (title) => {
    /**
     * kinda self explanatory lol
     */
    const dropDownHeader = document.createElement("div");
    dropDownHeader.innerHTML = title;
    dropDownHeader.classList.add("dropdown-header");
    return dropDownHeader;
}

const createDropDown = (title, options) => {
    /**
     * puts everything together
     */

    const state = createDropDownState();

    const dropDown = document.createElement("div");
    dropDown.classList.add("dropdown");

    const dropDownHeader = createDropDownHeader(title);

    // when an option is clicked, we wanna replace the header text with that option
    // and toggle the visibility
    const optionOnClick = (option) => {
        dropDownHeader.innerHTML = option;
        state.toggleVisibility();
    }
    
    const optionList = createDropDownOptionList(options, optionOnClick);

    createDropDownController(state, dropDownHeader, optionList);

    dropDown.appendChild(dropDownHeader);
    dropDown.appendChild(optionList);
    
    state.toggleVisibility();
    
    return dropDown;
}

export {createDropDown}