from models_result import models_predict
from fastapi import FastAPI,Query 
import requests as req


app=FastAPI()

@app.get('/')
async def index():
	return {"API":"Server Healthy | 200 OK"} #{"Api":"Welcome To Disease Prediction Api"}

@app.get('/predict')
async def predict(s1:str= Query(None),s2:str= Query(None),s3:str= Query(None),s4:str= Query(None),s5:str= Query(None)):
	
	s1=s1.replace("(","")
	s1=s1.replace(")","")
	s2=s2.replace("(","")
	s2=s2.replace(")","")
	s3=s3.replace("(","")
	s3=s3.replace(")","")
	s4=s4.replace("(","")
	s4=s4.replace(")","")
	s5=s5.replace("(","")
	s5=s5.replace(")","")
	psymptoms=[s1,s2,s3,s4,s5]
	print(psymptoms)
	return models_predict(psymptoms)

