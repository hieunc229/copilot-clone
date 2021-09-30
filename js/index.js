var question;

var currentQuestion = 0;

var questions = [
    "Wanna start?",
    "Have you installed the latest Visual Studio Code Insider Version?",
    "Have you cloned the GitHub Repository into its own folder?",
    "Have you opened the folder in Visual Studio Code?",
    "Have you ran \"npm install\"?",
    "Have you clicked on \"Run Extension\" under in the Debugging tab?",
    "Done!"
];

(function() {

    question = document.getElementById("question");

    question.textContent = questions[0];

    $(".sel-button").hover(function() {
        $(this).css("backgroundColor", "rgb(230, 230, 230)");
    },
    function() {
        $(this).css("backgroundColor", "white");
    });

    $("#btn-yes").click(function() {
        hideButtons();
        if(currentQuestion + 1 < questions.length)
            updateQuestion();
    });

    $("#btn-no").click(function() {
        hideButtons();
        if(currentQuestion + 1 < questions.length)
            updateQuestion("Then go do it!");
    });
}());

function updateQuestion(text = null) {
    if(!text)
        currentQuestion++;
    var intervalId = setInterval(function() {
        question.textContent = question.textContent.substr(0, question.textContent.length - 1);
        if(question.textContent == "") {
            var nextText = text ? text : questions[currentQuestion];
            var intervalId2 = setInterval(function() {
                question.textContent = nextText.substr(0, question.textContent.length + 1);
                if(question.textContent == nextText) {
                    showButtons();
                    clearInterval(intervalId2);
                }
            }, 50);

            clearInterval(intervalId);
        }
    }, 50);
}

function showButtons(animate = true) {
    if(animate) {
        $("#btn-yes").animate({opacity:1}, "1s");
        $("#btn-no").animate({opacity:1}, "1s");
        $("#question").animate({top: "40%"}, "1s");
    } else {
        $("#btn-yes").css("opacity", 1);
        $("#btn-no").css("opacity", 1);
        $("#question").css("top", "40%");
    }
}

function hideButtons(animate = true) {
    if(animate) {
        $("#btn-yes").animate({opacity:0}, "1s");
        $("#btn-no").animate({opacity:0}, "1s");
        $("#question").animate({top: "45%"}, "1s");
    } else {
        $("#btn-yes").css("opacity", 0);
        $("#btn-no").css("opacity", 0);
        $("#question").css("top", "45%");
    }
}
