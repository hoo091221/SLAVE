function runCharacterFadeInToRight(element) {
    const text = element.textContent;
    const splitText = text.split("");
    element.textContent = "";
    for (let i = 0; i < splitText.length; i++) {
        element.innerHTML += "<span class='invisible'>" + splitText[i] + "</span>";
    }

    let char = 0;
    const timer = setInterval(() => {
        const span = element.querySelectorAll("span")[char];
        span.classList.add("fade-in");
        char++;

        if (char >= splitText.length) {
            clearInterval(timer);
            return;
        }
    }, 50);
}
