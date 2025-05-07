
let SlaveImg;

// const fileInput = document.getElementById('fileInput');
// const preview = document.getElementById('preview');

// fileInput.addEventListener('change', function () {
//     const file = this.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = function (e) {
//         preview.style.display = "block";
//         preview.src = e.target.result;
//         SlaveImg = e.target.result;
//     };
//     reader.readAsDataURL(file);
// });


// OCR 문자인식

const API_KEY = 'AIzaSyApLVPBF5TDafTo1rZdiK8BrYvAnsmTLwA';  // 실제 키로 대체하세요

function uploadImg() {

    const base64Image = SlaveImg.split(',')[1];  // Data URI 제거

    const requestBody = {
        requests: [{
            image: { content: base64Image },
            features: [{ type: "TEXT_DETECTION" }],
            imageContext: { languageHints: ["ko"] }
        }]
    };

    const xhr = new XMLHttpRequest();
    xhr.open(
        "POST",
        `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`,
        true
    );
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                const text = response.responses?.[0]?.fullTextAnnotation?.text || "인식 실패";
                document.getElementById("resultText").textContent = text;
            } else {
                console.error("OCR 오류:", xhr.status);
            }
        }
    };

    xhr.send(JSON.stringify(requestBody));
}

// 제미나이 API
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAMqnSdJ7IndRV7rjrxkvx-807xkhFJgqw';

async function askGemini(promptText) {

    const body = {
        contents: [{ parts: [{ text: promptText }] }]
    };

    const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || '(응답 없음)';

    const responseText = document.getElementById('responseText');
    responseText.style.color = '#000';
    responseText.innerHTML = marked.parse(reply); // 마크다운 문법 -> HTML 코드
    runCharacterFadeInToRight(responseText);
}

// const request = new XMLHttpRequest();
// request.open('GET', url, true);
// request.onload = function () {
//     try {

//     } catch (error) {

//     }

//     document.getElementById('menu').innerHTML = menu;
//     document.getElementById('pos').innerHTML = pos;
// };
// request.send();