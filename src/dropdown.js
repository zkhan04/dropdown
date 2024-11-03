const createDropDownState = () => {
    let visible = true;
    const listeners = []

    const toggleVisibility = () => {
        visible = !visible;
        listeners.forEach(listener => listener(visible));
    };

    const onVisibleChange = (callback) => {
        listeners.push(callback);
    };

    const getVisible = () => visible;

    return {
        toggleVisibility, onVisibleChange, getVisible
    };
}

const createDropDownController = (state, dropDownHeader, optionList) => {
    // when something in the optionList is clicked, replace the dropDownHeader (I think?)
    dropDownHeader.addEventListener("click", () => state.toggleVisibility());

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
    const optionList = document.createElement("div");
    optionList.classList.add("option-list");
    options.forEach(option => {
        const optionElement = document.createElement("div");
        optionElement.classList.add("dropdown-option");
        optionElement.innerHTML = option;
        optionElement.addEventListener("click", () => onclick(option));
        optionList.appendChild(optionElement);
    });
    optionList.classList.add("option-list");
    return optionList;
}

const createDropDownHeader = (title) => {
    const dropDownHeader = document.createElement("div");
    dropDownHeader.innerHTML = title;
    dropDownHeader.classList.add("dropdown-header");
    return dropDownHeader;
}

const createDropDown = (title, options) => {
    const dropDown = document.createElement("div");

    const state = createDropDownState();

    const dropDownHeader = createDropDownHeader(title);

    const onclick = (option) => {
        dropDownHeader.innerHTML = option;
        state.toggleVisibility();
    }

    const optionList = createDropDownOptionList(options, onclick);

    createDropDownController(state, dropDownHeader, optionList);

    dropDown.appendChild(dropDownHeader);
    dropDown.appendChild(optionList);
    dropDown.classList.add("dropdown");

    state.toggleVisibility();
    
    return dropDown;
}

export {createDropDown}