let select = document.querySelector(".select-heading")
let arrow = document.querySelector(".select-heading img")
let options= document.querySelector(".options")
let option= document.querySelectorAll(".option")
let selecttext = document.querySelector(".select-heading span")


select.addEventListener("click",()=>{
  options.classList.toggle('active-options')
  arrow.classList.toggle("rotate")
})


option.forEach((item) => {
    item.addEventListener("click", () => {
        selecttext.innerText = item.innerText;
    });
});


// chat bot 

let prompt= document.querySelector(".prompt")
let chatbtn= document.querySelector(".input-area button")
let chatContainer= document.querySelector(".chat-container")
let h1 = document.querySelector(".h1")
let userMessage = "";
let chatimg = document.querySelector("#chatbotimg")
let chatbox = document.querySelector(".chat-box")

chatimg.addEventListener("click",()=>{
   chatbox.classList.toggle("active-chat-box")
   if(chatbox.classList.contains("active-chat-box")){
    chatimg.src="cross.svg"
   }else{
    chatimg.src="chatbot.svg"
   }
})


let API_KEY = "";
const Api_url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${"AIzaSyAS4x4myVcBHy5yv39XEsf9LGS0d7aKyoo"}`;

async function getApiResponse(aichatbox) {
  try {
    let response = await fetch(Api_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: userMessage }]
          }
        ]
      }),
    });

    let data = await response.json();
    console.log("Gemini Response:", data);

    //  Show response in AI chatbox
    let aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ No response";
    aichatbox.querySelector(".text").innerText = aiText;
   

    // Remove loading icon
    let loadingImg = aichatbox.querySelector(".loading");
    if (loadingImg) loadingImg.remove();

  } catch (error) {
    console.error("❌ Error while calling Gemini API:", error.message);
    aichatbox.querySelector(".text").innerText = "Error fetching response 😢";
  }
 
}

function createchatbox(html, className) {
  let div = document.createElement("div");
  div.classList.add(className);
  div.innerHTML = html;
  return div;
}

function showLoading() {
   let html = `<p class="text"></p>
   <img src="load.gif" class="loading" width="50px"> `;
  let aichatbox = createchatbox(html, "ai-chat-box");
  chatContainer.appendChild(aichatbox);
  getApiResponse(aichatbox);
}


chatbtn.addEventListener("click",()=>{
    h1.style.display="none"
    userMessage = prompt.value
  let html = `<p class="text"></p>`;

  let userchatbox = createchatbox(html, "user-chat-box");
  userchatbox.querySelector(".text").innerText = userMessage;
  chatContainer.appendChild(userchatbox);
  prompt.value = "";
 setTimeout(showLoading, 500);
})


// virtual assistant

// let ai = document.querySelector(".virtual-assistant img")
// let speakpage = document.querySelector(".speak-page")
// let content = document.querySelector("speak-page h1")


// Text-to-Speech Function
function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "hi-IN"; // Hindi India
    window.speechSynthesis.speak(text_speak);
}

// DOM Elements
let ai = document.querySelector(".virtual-assistant img");
let speakpage = document.querySelector(".speak-page");
let content = document.querySelector(".speak-page h1");

// Speech Recognition
let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();


recognition.onresult = (event) => {
    speakpage.style.display="none"
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;

    if (content) {
        content.innerText = transcript;
    }

    // Bol kar repeat kare
    speak("Aapne kaha: " + transcript);

    // Command handle kare
    takeCommand(transcript.toLowerCase());
};

// Mic Button Click
if (ai) {
    ai.addEventListener("click", () => {
        recognition.start();
        if (speakpage) {
            speakpage.style.display="flex"
        }
    });
}

// ✅ takeCommand function
function takeCommand(message) {
    if (message.includes("open") && (message.includes("chat"))) {
        speak("okay sir");
        chatbox.classList.add("active-chat-box")
    } 
    else if (message.includes("close") && (message.includes("chat"))) {
       speak("okay sir");
        chatbox.classList.remove("active-chat-box")
    } 
    else if (message.includes("back")) {
        speak("okay sir");
        window.open("http://127.0.0.1:5503/Ai-powerd-fitness/back.html")
    }
    else if (message.includes("chest")) {
        speak("okay sir");
        window.open("http://127.0.0.1:5503/Ai-powerd-fitness/chest.html")
    }
   else if (message.includes("biceps") || (message.includes("triceps"))) {
        speak("okay sir");
        window.open("http://127.0.0.1:5503/Ai-powerd-fitness/biceps-trishep.html")
    }
    else if (message.includes("solders")) {
        speak("okay sir");
        window.open("http://127.0.0.1:5503/Ai-powerd-fitness/shoulder.html")
    }
     else if (message.includes("leg")) {
        speak("okay sir");
        window.open("http://127.0.0.1:5503/Ai-powerd-fitness/leg.html")
    }
     else if (message.includes("home")) {
        speak("okay sir");
        window.open("http://127.0.0.1:5503/Ai-powerd-fitness/index.html")
    }
}
