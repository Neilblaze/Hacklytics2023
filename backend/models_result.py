from helper import disease,l1
import pickle

from sklearn.neighbors import KNeighborsClassifier
from sklearn import tree
from sklearn.ensemble import RandomForestClassifier
from sklearn.naive_bayes import GaussianNB

import pandas as pd
import numpy as np
import joblib

#init models
RF=joblib.load("./models/RF.pkl")
DT=joblib.load("./models/DT.pkl")
NB=joblib.load("./models/NB.pkl")
KNN=joblib.load("./models/KNN.pkl")

def predict(inx,symptoms):
  lex=[]
  for i in range(0,len(l1)):
    lex.append(0)
  for k in range(0,len(l1)):
    for z in symptoms:
      if(z==l1[k]):
        lex[k]=1

  inputtest = [lex]
  predict = inx.predict(inputtest)
  predicted=predict[0]

  h='no'
  for a in range(0,len(disease)):
    if(predicted == a):
      h='yes'
      break

  if (h=='yes'):
    return (disease[predicted])
  else:
    return ("Not Found")

# serve endpoints
def models_predict(psymptoms):
	result={"DT1_DT":predict(DT,psymptoms),"DT2_RFC":predict(RF,psymptoms),"DT3_NB":predict(NB,psymptoms),"DT4_KNN":predict(KNN,psymptoms)}
	return result


