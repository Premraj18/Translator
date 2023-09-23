const toggleBtn = document.querySelector(".toggle-btn");
const toggleBtnIcon = document.querySelector(".toggle-btn i");
const dropDownMenu = document.querySelector(".dropdown-menu");

toggleBtn.onclick = function () {
    dropDownMenu.classList.toggle("open");
    const isOpen = dropDownMenu.classList.contains("open");

    toggleBtnIcon.classList = isOpen
        ? "fa-solid fa-xmark"
        : "fa-solid fa-bars";
};

const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const selectTag = document.querySelectorAll("select");
const translateBtn = document.querySelector("button");
const exchangeIcon = document.querySelector(".exchange");
const icons = document.querySelectorAll(".row i");

selectTag.forEach((tag, id) => {
    for (const country_code in countries) {
        // console.log(countries[country_code]);
        let selected;
        if (id == 0 && country_code == "en-US") {
            selected = "selected";
        }
        else if (id == 1 && country_code == "hi-IN") {
            selected = "selected";
        }
        else {
            let option = `<option value="${country_code}" ${selected} >${countries[country_code]}</option>`
            tag.insertAdjacentHTML("beforeend", option);
        }
    }
});

exchangeIcon.addEventListener("click", () => {
    let tempText = fromText.value;
    console.log(selectTag[0].value);
    tempLang = selectTag[0].value;
    fromText.value = toText.value;
    selectTag[0].value = selectTag[1].value;
    toText.value = tempText;
    selectTag[1].value = tempLang;
})

translateBtn.addEventListener("click", () => {
    let text = fromText.value;
    let translateFrom = selectTag[0].value;
    let translateTo = selectTag[1].value;
    // console.log(text, translateFrom, translateTo);
    if(!text) return;
    toText.setAttribute("placeholder", "Translating...");
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl).then(res => res.json()).then(data => {
        console.log(data);
        toText.value = data.responseData.translatedText;
        toText.setAttribute("placeholder", "Translating...");
    });
})

icons.forEach(icon => {
    icon.addEventListener("click", ({ target }) => {
        // console.log(target);
        if (target.classList.contains("icon1")) {
            if (target.id == "from") {
                navigator.clipboard.writeText(fromText.value);
                target.innerText = "check";
                target.title = "Password Copied";

                setTimeout(() => {
                    target.innerHTML = "content_copy";
                    target.title = "";
                }, 2000)
            }
            else {
                navigator.clipboard.writeText(toText.value);
                target.innerText = "check";
                target.title = "Password Copied";

                setTimeout(() => {
                    target.innerHTML = "content_copy";
                    target.title = "";
                }, 2000)
            }
        }
        else {
            let call;
            if(target.id == "from"){
                call = new SpeechSynthesisUtterance(fromText.value);
                call.lang = selectTag[0].value;
                // target.classList.toggle("bx-play");
                // target.classList.toggle("bx-pause");
                // setTimeout(() => {
                //     target.classList.remove("bx-pause");
                //     target.classList.add("bx-play");
                // }, 500)
               
            }
            else{
                call = new SpeechSynthesisUtterance(toText.value);
                call.lang = selectTag[1].value;
                // target.classList.toggle("bx-play");
                // target.classList.toggle("bx-pause");
                // setTimeout(() => {
                //     target.classList.remove("bx-pause");
                //     target.classList.add("bx-play");
                // }, 500)
            }
            speechSynthesis.speak(call);
        }
    })
})