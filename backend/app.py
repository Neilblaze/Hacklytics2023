import flask
from flask import Flask, request, render_template
from flask import jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import json
from tempfile import NamedTemporaryFile
import whisper


app = Flask(__name__)
CORS(app)
model = whisper.load_model("small")

@app.route("/", methods=['GET', 'POST'])
@app.route("/root", methods=['GET', 'POST'])
def root():
    return "HealthifAI  |  Server 200 OK!"

# (Transcribe // Whisper - OpenAI)  ---------------------------------------------------------------------------

def inference(audio):
    audio = whisper.load_audio(audio)
    audio = whisper.pad_or_trim(audio)
    
    mel = whisper.log_mel_spectrogram(audio).to(model.device)
    _, probs = model.detect_language(mel)    
    options = whisper.DecodingOptions(fp16 = False, task = "translate")
    result = whisper.decode(model, mel, options) 
    print(result.text)
    
    return result.text


@app.route("/transcribe", methods=["GET", "POST"])
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

#  (Disease Prediction API)  ----------------------------------------------------------------------------------


@app.route("/result", methods=['GET', 'POST']) 
def result():
    data = request.args
    S1 = data['sym1'] ; S2 = data['sym2'] ; S3 = data['sym3'] ; S4 = data['sym4'] ; S5 = data['sym5']

    l1 = ['itching', 'skin_rash', 'nodal_skin_eruptions', 'continuous_sneezing', 'shivering', 'chills', 'joint_pain',
          'stomach_pain', 'acidity', 'ulcers_on_tongue', 'muscle_wasting', 'vomiting', 'burning_micturition', 'spotting_ urination', 'fatigue',
          'weight_gain', 'anxiety', 'cold_hands_and_feets', 'mood_swings', 'weight_loss', 'restlessness', 'lethargy', 'patches_in_throat',
          'irregular_sugar_level', 'cough', 'high_fever', 'sunken_eyes', 'breathlessness', 'sweating', 'dehydration', 'indigestion',
          'headache', 'yellowish_skin', 'dark_urine', 'nausea', 'loss_of_appetite', 'pain_behind_the_eyes', 'back_pain', 'constipation',
          'abdominal_pain', 'diarrhoea', 'mild_fever', 'yellow_urine', 'yellowing_of_eyes', 'acute_liver_failure', 'fluid_overload',
          'swelling_of_stomach', 'swelled_lymph_nodes', 'malaise', 'blurred_and_distorted_vision', 'phlegm', 'throat_irritation',
          'redness_of_eyes', 'sinus_pressure', 'runny_nose', 'congestion', 'chest_pain', 'weakness_in_limbs', 'fast_heart_rate',
          'pain_during_bowel_movements', 'pain_in_anal_region', 'bloody_stool', 'irritation_in_anus', 'neck_pain', 'dizziness', 'cramps',
          'bruising', 'obesity', 'swollen_legs', 'swollen_blood_vessels', 'puffy_face_and_eyes', 'enlarged_thyroid', 'brittle_nails',
          'swollen_extremeties', 'excessive_hunger', 'extra_marital_contacts', 'drying_and_tingling_lips', 'slurred_speech', 'knee_pain', 'hip_joint_pain',
          'muscle_weakness', 'stiff_neck', 'swelling_joints', 'movement_stiffness', 'spinning_movements', 'loss_of_balance', 'unsteadiness', 'weakness_of_one_body_side',
          'loss_of_smell', 'bladder_discomfort', 'foul_smell_of urine', 'continuous_feel_of_urine', 'passage_of_gases', 'internal_itching', 'toxic_look_(typhos)',
          'depression', 'irritability', 'muscle_pain', 'altered_sensorium', 'red_spots_over_body', 'belly_pain', 'abnormal_menstruation', 'dischromic _patches',
          'watering_from_eyes', 'increased_appetite', 'polyuria', 'family_history', 'mucoid_sputum', 'rusty_sputum', 'lack_of_concentration', 'visual_disturbances',
          'receiving_blood_transfusion', 'receiving_unsterile_injections', 'coma', 'stomach_bleeding', 'distention_of_abdomen', 'history_of_alcohol_consumption',
          'fluid_overload', 'blood_in_sputum', 'prominent_veins_on_calf', 'palpitations', 'painful_walking', 'pus_filled_pimples', 'blackheads', 'scurring', 'skin_peeling',
          'silver_like_dusting', 'small_dents_in_nails', 'inflammatory_nails', 'blister', 'red_sore_around_nose', 'yellow_crust_ooze']

    disease = ['Fungal infection', 'Allergy', 'GERD', 'Chronic cholestasis', 'Drug Reaction',
               'Peptic ulcer diseae', 'AIDS', 'Diabetes', 'Gastroenteritis', 'Bronchial Asthma', 'Hypertension',
               ' Migraine', 'Cervical spondylosis',
               'Paralysis (brain hemorrhage)', 'Jaundice', 'Malaria', 'Chicken pox', 'Dengue', 'Typhoid', 'hepatitis A',
               'Hepatitis B', 'Hepatitis C', 'Hepatitis D', 'Hepatitis E', 'Alcoholic hepatitis', 'Tuberculosis',
               'Common Cold', 'Pneumonia', 'Dimorphic hemmorhoids(piles)',
               'Heartattack', 'Varicoseveins', 'Hypothyroidism', 'Hyperthyroidism', 'Hypoglycemia', 'Osteoarthristis',
               'Arthritis', '(vertigo) Paroymsal  Positional Vertigo', 'Acne', 'Urinary tract infection', 'Psoriasis',
               'Impetigo']

    l2 = []
    for _ in range(0, len(l1)): l2.append(0)

    # Testing.csv
    tr = pd.read_csv("Testing.csv")
    tr.replace({'prognosis': {'Fungal infection': 0, 'Allergy': 1, 'GERD': 2, 'Chronic cholestasis': 3, 'Drug Reaction': 4,
                              'Peptic ulcer diseae': 5, 'AIDS': 6, 'Diabetes ': 7, 'Gastroenteritis': 8, 'Bronchial Asthma': 9, 'Hypertension ': 10,
                              'Migraine': 11, 'Cervical spondylosis': 12,
                              'Paralysis (brain hemorrhage)': 13, 'Jaundice': 14, 'Malaria': 15, 'Chicken pox': 16, 'Dengue': 17, 'Typhoid': 18, 'hepatitis A': 19,
                              'Hepatitis B': 20, 'Hepatitis C': 21, 'Hepatitis D': 22, 'Hepatitis E': 23, 'Alcoholic hepatitis': 24, 'Tuberculosis': 25,
                              'Common Cold': 26, 'Pneumonia': 27, 'Dimorphic hemmorhoids(piles)': 28, 'Heart attack': 29, 'Varicose veins': 30, 'Hypothyroidism': 31,
                              'Hyperthyroidism': 32, 'Hypoglycemia': 33, 'Osteoarthristis': 34, 'Arthritis': 35,
                              '(vertigo) Paroymsal  Positional Vertigo': 36, 'Acne': 37, 'Urinary tract infection': 38, 'Psoriasis': 39,
                              'Impetigo': 40}}, inplace=True)

    X_test = tr[l1] ; y_test = tr[["prognosis"]]
    np.ravel(y_test)

    # Training.csv
    df = pd.read_csv("Training.csv")

    df.replace({'prognosis': {'Fungal infection': 0, 'Allergy': 1, 'GERD': 2, 'Chronic cholestasis': 3, 'Drug Reaction': 4,
                              'Peptic ulcer diseae': 5, 'AIDS': 6, 'Diabetes ': 7, 'Gastroenteritis': 8, 'Bronchial Asthma': 9, 'Hypertension ': 10,
                              'Migraine': 11, 'Cervical spondylosis': 12,
                              'Paralysis (brain hemorrhage)': 13, 'Jaundice': 14, 'Malaria': 15, 'Chicken pox': 16, 'Dengue': 17, 'Typhoid': 18, 'hepatitis A': 19,
                              'Hepatitis B': 20, 'Hepatitis C': 21, 'Hepatitis D': 22, 'Hepatitis E': 23, 'Alcoholic hepatitis': 24, 'Tuberculosis': 25,
                              'Common Cold': 26, 'Pneumonia': 27, 'Dimorphic hemmorhoids(piles)': 28, 'Heart attack': 29, 'Varicose veins': 30, 'Hypothyroidism': 31,
                              'Hyperthyroidism': 32, 'Hypoglycemia': 33, 'Osteoarthristis': 34, 'Arthritis': 35,
                              '(vertigo) Paroymsal  Positional Vertigo': 36, 'Acne': 37, 'Urinary tract infection': 38, 'Psoriasis': 39,
                              'Impetigo': 40}}, inplace=True)

    X = df[l1] ; y = df[["prognosis"]]
    np.ravel(y)

    def NaiveBayes(S1, S2, S3, S4, S5):
        from sklearn.naive_bayes import MultinomialNB
        gNaBi = MultinomialNB()
        gNaBi = gNaBi.fit(X, np.ravel(y))
        from sklearn.metrics import accuracy_score
        y_pred = gNaBi.predict(X_test)
        print(accuracy_score(y_test, y_pred))
        print(accuracy_score(y_test, y_pred, normalize=False))

        psymptoms = [S1, S2, S3, S4, S5]

        for k in range(0, len(l1)):
            for z in psymptoms:
                if(z == l1[k]): l2[k] = 1

        inputtest = [l2]
        predict = gNaBi.predict(inputtest)
        predicted = predict[0]

        op = 'no'
        for a in range(0, len(disease)):
            if(disease[predicted] == disease[a]):
                op = 'yes'
                break

        if (op == 'yes'): return disease[a]
        else: return "No Disease"
        
    FinalResponse = NaiveBayes(S1, S2, S3, S4, S5)
    # return NaiveBayes(S1, S2, S3, S4, S5)


    df = pd.read_csv("symptom_precaution.csv")


    datax = df.loc[df['Disease'] == FinalResponse, ['Precaution_1', 'Precaution_2', 'Precaution_3', 'Precaution_4']].to_dict('records')
    precaution_1 = datax[0]['Precaution_1'].strip('[]"')
    precaution_2 = datax[0]['Precaution_2'].strip('[]"')
    precaution_3 = datax[0]['Precaution_3'].strip('[]"')
    precaution_4 = datax[0]['Precaution_4'].strip('[]"')

    responsex = {
        "Disease": FinalResponse,
        "Precaution_1": precaution_1,
        "Precaution_2": precaution_2,
        "Precaution_3": precaution_3,
        "Precaution_4": precaution_4,
    }

    return jsonify(responsex)


# --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

@app.route("/d3data", methods=['GET', 'POST'])
def d3data():
    data = request.args
    S1 = data['sym1'] ; S2 = data['sym2']
    S3 = data['sym3'] ; S4 = data['sym4'] ; S5 = data['sym5']

    l1 = ['itching', 'skin_rash', 'nodal_skin_eruptions', 'continuous_sneezing', 'shivering', 'chills', 'joint_pain',
          'stomach_pain', 'acidity', 'ulcers_on_tongue', 'muscle_wasting', 'vomiting', 'burning_micturition', 'spotting_ urination', 'fatigue',
          'weight_gain', 'anxiety', 'cold_hands_and_feets', 'mood_swings', 'weight_loss', 'restlessness', 'lethargy', 'patches_in_throat',
          'irregular_sugar_level', 'cough', 'high_fever', 'sunken_eyes', 'breathlessness', 'sweating', 'dehydration', 'indigestion',
          'headache', 'yellowish_skin', 'dark_urine', 'nausea', 'loss_of_appetite', 'pain_behind_the_eyes', 'back_pain', 'constipation',
          'abdominal_pain', 'diarrhoea', 'mild_fever', 'yellow_urine', 'yellowing_of_eyes', 'acute_liver_failure', 'fluid_overload',
          'swelling_of_stomach', 'swelled_lymph_nodes', 'malaise', 'blurred_and_distorted_vision', 'phlegm', 'throat_irritation',
          'redness_of_eyes', 'sinus_pressure', 'runny_nose', 'congestion', 'chest_pain', 'weakness_in_limbs', 'fast_heart_rate',
          'pain_during_bowel_movements', 'pain_in_anal_region', 'bloody_stool', 'irritation_in_anus', 'neck_pain', 'dizziness', 'cramps',
          'bruising', 'obesity', 'swollen_legs', 'swollen_blood_vessels', 'puffy_face_and_eyes', 'enlarged_thyroid', 'brittle_nails',
          'swollen_extremeties', 'excessive_hunger', 'extra_marital_contacts', 'drying_and_tingling_lips', 'slurred_speech', 'knee_pain', 'hip_joint_pain',
          'muscle_weakness', 'stiff_neck', 'swelling_joints', 'movement_stiffness', 'spinning_movements', 'loss_of_balance', 'unsteadiness', 'weakness_of_one_body_side',
          'loss_of_smell', 'bladder_discomfort', 'foul_smell_of urine', 'continuous_feel_of_urine', 'passage_of_gases', 'internal_itching', 'toxic_look_(typhos)',
          'depression', 'irritability', 'muscle_pain', 'altered_sensorium', 'red_spots_over_body', 'belly_pain', 'abnormal_menstruation', 'dischromic _patches',
          'watering_from_eyes', 'increased_appetite', 'polyuria', 'family_history', 'mucoid_sputum', 'rusty_sputum', 'lack_of_concentration', 'visual_disturbances',
          'receiving_blood_transfusion', 'receiving_unsterile_injections', 'coma', 'stomach_bleeding', 'distention_of_abdomen', 'history_of_alcohol_consumption',
          'fluid_overload', 'blood_in_sputum', 'prominent_veins_on_calf', 'palpitations', 'painful_walking', 'pus_filled_pimples', 'blackheads', 'scurring', 'skin_peeling',
          'silver_like_dusting', 'small_dents_in_nails', 'inflammatory_nails', 'blister', 'red_sore_around_nose', 'yellow_crust_ooze']

    disease = ['Fungal infection', 'Allergy', 'GERD', 'Chronic cholestasis', 'Drug Reaction',
               'Peptic ulcer diseae', 'AIDS', 'Diabetes', 'Gastroenteritis', 'Bronchial Asthma', 'Hypertension',
               ' Migraine', 'Cervical spondylosis',
               'Paralysis (brain hemorrhage)', 'Jaundice', 'Malaria', 'Chicken pox', 'Dengue', 'Typhoid', 'hepatitis A',
               'Hepatitis B', 'Hepatitis C', 'Hepatitis D', 'Hepatitis E', 'Alcoholic hepatitis', 'Tuberculosis',
               'Common Cold', 'Pneumonia', 'Dimorphic hemmorhoids(piles)',
               'Heartattack', 'Varicoseveins', 'Hypothyroidism', 'Hyperthyroidism', 'Hypoglycemia', 'Osteoarthristis',
               'Arthritis', '(vertigo) Paroymsal  Positional Vertigo', 'Acne', 'Urinary tract infection', 'Psoriasis',
               'Impetigo']

    l2 = []
    for _ in range(0, len(l1)): l2.append(0)

    # Testing.csv
    tr = pd.read_csv("Testing.csv")
    tr.replace({'prognosis': {'Fungal infection': 0, 'Allergy': 1, 'GERD': 2, 'Chronic cholestasis': 3, 'Drug Reaction': 4,
                              'Peptic ulcer diseae': 5, 'AIDS': 6, 'Diabetes ': 7, 'Gastroenteritis': 8, 'Bronchial Asthma': 9, 'Hypertension ': 10,
                              'Migraine': 11, 'Cervical spondylosis': 12,
                              'Paralysis (brain hemorrhage)': 13, 'Jaundice': 14, 'Malaria': 15, 'Chicken pox': 16, 'Dengue': 17, 'Typhoid': 18, 'hepatitis A': 19,
                              'Hepatitis B': 20, 'Hepatitis C': 21, 'Hepatitis D': 22, 'Hepatitis E': 23, 'Alcoholic hepatitis': 24, 'Tuberculosis': 25,
                              'Common Cold': 26, 'Pneumonia': 27, 'Dimorphic hemmorhoids(piles)': 28, 'Heart attack': 29, 'Varicose veins': 30, 'Hypothyroidism': 31,
                              'Hyperthyroidism': 32, 'Hypoglycemia': 33, 'Osteoarthristis': 34, 'Arthritis': 35,
                              '(vertigo) Paroymsal  Positional Vertigo': 36, 'Acne': 37, 'Urinary tract infection': 38, 'Psoriasis': 39,
                              'Impetigo': 40}}, inplace=True)

    X1_test = tr[l1] ; Y1_test = tr[["prognosis"]]
    np.ravel(Y1_test)

    # TRAINING DATA
    df = pd.read_csv("Training.csv")

    df.replace({'prognosis': {'Fungal infection': 0, 'Allergy': 1, 'GERD': 2, 'Chronic cholestasis': 3, 'Drug Reaction': 4,
                              'Peptic ulcer diseae': 5, 'AIDS': 6, 'Diabetes ': 7, 'Gastroenteritis': 8, 'Bronchial Asthma': 9, 'Hypertension ': 10,
                              'Migraine': 11, 'Cervical spondylosis': 12,
                              'Paralysis (brain hemorrhage)': 13, 'Jaundice': 14, 'Malaria': 15, 'Chicken pox': 16, 'Dengue': 17, 'Typhoid': 18, 'hepatitis A': 19,
                              'Hepatitis B': 20, 'Hepatitis C': 21, 'Hepatitis D': 22, 'Hepatitis E': 23, 'Alcoholic hepatitis': 24, 'Tuberculosis': 25,
                              'Common Cold': 26, 'Pneumonia': 27, 'Dimorphic hemmorhoids(piles)': 28, 'Heart attack': 29, 'Varicose veins': 30, 'Hypothyroidism': 31,
                              'Hyperthyroidism': 32, 'Hypoglycemia': 33, 'Osteoarthristis': 34, 'Arthritis': 35,
                              '(vertigo) Paroymsal  Positional Vertigo': 36, 'Acne': 37, 'Urinary tract infection': 38, 'Psoriasis': 39,
                              'Impetigo': 40}}, inplace=True)

    X = df[l1]

    y = df[["prognosis"]]
    np.ravel(y)

    def NaiveBayes(S1, S2, S3, S4, S5):
        from sklearn.naive_bayes import MultinomialNB
        gNaBi = MultinomialNB()
        gNaBi = gNaBi.fit(X, np.ravel(y))
        from sklearn.metrics import accuracy_score
        y_pred = gNaBi.predict(X1_test)
        print(accuracy_score(Y1_test, y_pred))
        print(accuracy_score(Y1_test, y_pred, normalize=False))

        psymptoms = [S1, S2, S3, S4, S5]

        for k in range(0, len(l1)):
            for z in psymptoms:
                if(z == l1[k]): l2[k] = 1

        inputtest = [l2]
        predict = gNaBi.predict(inputtest)
        predicted = predict[0]

        op1 = 'no'
        for a in range(0, len(disease)):
            if(disease[predicted] == disease[a]):
                op1 = 'yes'
                break

        if (op1 == 'yes'):
            return disease[a]
        else:
            return "No Disease"
        
    FinalResponse1 = NaiveBayes(S1, S2, S3, S4, S5)

    df = pd.read_csv("symptom_precaution.csv")


    datax1 = df.loc[df['Disease'] == FinalResponse1, ['Precaution_1', 'Precaution_2', 'Precaution_3', 'Precaution_4']].to_dict('records')
    precaution_1 = datax1[0]['Precaution_1'].strip('[]"')
    precaution_2 = datax1[0]['Precaution_2'].strip('[]"')
    precaution_3 = datax1[0]['Precaution_3'].strip('[]"')
    precaution_4 = datax1[0]['Precaution_4'].strip('[]"')
    
    responsex1 = {
        "Precaution_1": precaution_1,
        "Precaution_2": precaution_2,
        "Precaution_3": precaution_3,
        "Precaution_4": precaution_4,
    }
    return jsonify(responsex1)

if __name__ == "__main__":
    app.run(debug=True)
