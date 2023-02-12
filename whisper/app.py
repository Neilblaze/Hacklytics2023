import flask
from flask import request, render_template
from tempfile import NamedTemporaryFile
import whisper

app = flask.Flask(__name__)
model = whisper.load_model("small")

def inference(audio):
    audio = whisper.load_audio(audio)
    audio = whisper.pad_or_trim(audio)
    
    mel = whisper.log_mel_spectrogram(audio).to(model.device)
    _, probs = model.detect_language(mel)    
    options = whisper.DecodingOptions(fp16 = False, task = "translate")
    result = whisper.decode(model, mel, options) 
    print(result.text)
    
    return result.text

@app.route("/", methods=["GET", "POST"])
def home():
    if request.method == "POST":
        file = request.files["file"]
        with NamedTemporaryFile(suffix="mp3") as temp:
            temp.write(file.read())
            temp.seek(0)
            transcription = inference(temp.name)
        return render_template("template.html", transcription=transcription)

    return render_template("template.html")

if __name__ == "__main__":
    app.run(debug=True)
