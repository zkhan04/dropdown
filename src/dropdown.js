const createDropDown = (title, options) => {
    /**
     * Puts everything together!
     */
    let is_visible = false;

    // the element that houses everything
    const dropDown = document.createElement("div");
    dropDown.classList.add("dropdown");

    // the "header" of the dropdown. 
    // consists of the title/selected option
    // and a symbol representing the status (is it open or closed?)
    const dropDownHeader = document.createElement("div");
    const dropDownTitle = document.createElement("div");
    dropDownTitle.innerHTML = title;
    dropDownTitle.classList.add("title");

    const dropDownStatus = document.createElement("div");
    dropDownStatus.classList.add("status");

    dropDownHeader.appendChild(dropDownTitle);
    dropDownHeader.appendChild(dropDownStatus);
    dropDownHeader.classList.add("dropdown-header");

    // creates a single option for a dropdown.
    const createDropDownOption = (s) => {
        const option = document.createElement("div");
        option.innerHTML = s;

        // selects the option and hides the dropdown
        option.addEventListener("click", () => {
            dropDownTitle.innerHTML = s;
            toggleVisibility();
        })

        return option;
    }

    // a list of all the dropdown options!
    const optionList = document.createElement("div");
    optionList.classList.add("option-list");
    options.forEach(element => {
        optionList.appendChild(createDropDownOption(element));
    });

    // toggles the visibility
    const toggleVisibility = () => {
        is_visible = !is_visible;
        controlVisibility();
    }

    // based on the value of the is_visible flag, display or hide the list of options
    const controlVisibility = () => {
        if (is_visible) {
            optionList.classList.remove("closed");
            optionList.classList.add("open");
            dropDownStatus.innerHTML = "-";
        } else {
            optionList.classList.remove("open");
            optionList.classList.add("closed");
            dropDownStatus.innerHTML = "+";
        }
    }

    // when the header is clicked, the options should also be hidden
    dropDownHeader.addEventListener("click", () => toggleVisibility());
    dropDown.appendChild(dropDownHeader);
    dropDown.appendChild(optionList);

    controlVisibility();
    return dropDown;
}

export {createDropDown}