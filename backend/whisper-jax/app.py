import flask
from flask import Flask, request, render_template
from flask import jsonify
from flask_cors import CORS

import base64
import os
from functools import partial
from multiprocessing import Pool

import gradio as gr
import numpy as np
import requests
from processing_whisper import WhisperPrePostProcessor
from transformers.models.whisper.tokenization_whisper import TO_LANGUAGE_CODE
from transformers.pipelines.audio_utils import ffmpeg_read

API_URL = os.getenv("API_URL")
API_URL_FROM_FEATURES = os.getenv("API_URL_FROM_FEATURES")

language_names = sorted(TO_LANGUAGE_CODE.keys())
CHUNK_LENGTH_S = 30
BATCH_SIZE = 16
NUM_PROC = 8

app = Flask(__name__)
CORS(app)

@app.route("/", methods=['GET', 'POST'])
@app.route("/root", methods=['GET', 'POST'])
def root():
    return "HealthifAI  |  Server 200 OK!"



# (Transcribe // Whisper JAX - OpenAI)  ---------------------------------------------------------------------------
# TODO Complete this function


@app.route("/transcribe-jax", methods=["GET", "POST"])
def transcribe():
    print("hello")
    if request.method == "POST":
        print(request.files, "req1")
        file = request.files["file"]
        with NamedTemporaryFile(suffix="mp3") as temp:
            temp.write(file.read())
            temp.seek(0)
            transcription = inference(temp.name)
            print("hi")
        return jsonify({"transcription": transcription})

    return jsonify({"error": "No file found in the request."})








def query(payload):
    response = requests.post(API_URL, json=payload)
    return response.json(), response.status_code


def inference(inputs, language=None, task=None):
    payload = {"inputs": inputs, "task": task}

    # langauge can come as an empty string from `None` default, so we handle it separately
    if language:
        payload["language"] = language

    data, status_code = query(payload)

    if status_code == 200:
        text = data["text"]
    else:
        text = data["detail"]

    return text


def chunked_query(payload):
    response = requests.post(API_URL_FROM_FEATURES, json=payload)
    return response.json()


def forward(batch, task=None):
    feature_shape = batch["input_features"].shape
    batch["input_features"] = base64.b64encode(batch["input_features"].tobytes()).decode()
    outputs = chunked_query(
        {"batch": batch, "task": task, "feature_shape": feature_shape}
    )
    outputs["tokens"] = np.asarray(outputs["tokens"])
    return outputs


if __name__ == "__main__":
    processor = WhisperPrePostProcessor.from_pretrained("openai/whisper-large-v2")
    pool = Pool(NUM_PROC)

    def transcribe_chunked_audio(file_upload, task):

        inputs = file_upload

        with open(inputs, "rb") as f:
            inputs = f.read()

        inputs = ffmpeg_read(inputs, processor.feature_extractor.sampling_rate)
        inputs = {"array": inputs, "sampling_rate": processor.feature_extractor.sampling_rate}

        dataloader = processor.preprocess_batch(inputs, chunk_length_s=CHUNK_LENGTH_S, batch_size=BATCH_SIZE)

        try:
            model_outputs = pool.map(partial(forward, task=task), dataloader)
        except ValueError as err:
            # pre-processor does all the necessary compatibility checks for our audio inputs
            return err, None

        post_processed = processor.postprocess(model_outputs)
        return warn_output + post_processed["text"]

    demo.queue()
    demo.launch()