prediction1 = "";
prediction2 = "";
camera = document.getElementById("camera");
Webcam.set({
    width: 400,
    height: 450,
    image_format: 'png',
    png_quality: 100
});
Webcam.attach('#camera');

function takesnap(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="imgcaptured" src="'+data_uri+'"/>'
    });
}
console.log('ml5 version', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/R2zz5fLZy/', modelLoaded);

function modelLoaded(){
    console.log("modelLoaded");
}
function speak(){
    var synth = window.speechSynthesis;
    speak_data1 = "The first prediction is" +prediction1;
    speak_data2 = "The second prediction is" +prediction2;
    var utterThis = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById("imgcaptured");
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();

        if (results[0].label=="Happy"){
            document.getElementById("update_emoji").innerHTML="Happy";
        }

        if (results[0].label=="Sad"){
            document.getElementById("update_emoji").innerHTML="Sad";
        }

        if (results[0].label=="Angry"){
            document.getElementById("update_emoji").innerHTML="Angry";
        }

        if (results[1].label=="Angry"){
            document.getElementById("update_emoji2").innerHTML="Angry";
        }

        if (results[1].label=="Sad"){
            document.getElementById("update_emoji2").innerHTML="Sad;";
        }

        if (results[1].label=="Happy"){
            document.getElementById("update_emoji2").innerHTML="Happy";
        }
    }
}