![DevThumb](https://user-images.githubusercontent.com/48355572/220209075-b5382401-8c5d-4492-8733-f54183ae736a.gif)

### Category Submission: 

- **Wacky Wildcard** 🃏
- **Smooth Shifters** 🌬️


---

### What we built 🤗
**HealthifAI** is a smart *Web application* built to provide *Seamless Healthcare solutions for Providers* & is fueled by [**Linode**](https://linode.com). 🏥⚕️

### Inspiration 💡
**Healthcare** *is one of the most important and critical industries in the world*. Providing quality medical care to patients is essential, but it is often hindered by various challenges such as overburdened healthcare workers, lack of medical devices in rural areas, and administrative stress.

![image](https://user-images.githubusercontent.com/48355572/220201124-d1813a1f-dbba-4a3b-bf64-4308bc7f4e2b.png)

With the advent of *artificial intelligence* and *machine learning*, the healthcare industry has a unique opportunity to tackle these challenges head-on and revolutionize the way medical care is delivered.

With this as context, we plan to tackle the **Provider Shortage & Burnout** and **Access to Care** strategic themes. 

![image](https://user-images.githubusercontent.com/48355572/218312595-e9a81ade-d336-4aa4-bb21-af1a6ed2d353.png)

## What it does 🤔
*HealthifAI* aims to tackle several key pain points in the healthcare industry — specifically for the following :

**Provider Shortage & Burnout :**
* Intuitive, easy & safe digital patient record entry which eliminates the need for manual and legacy record entry methods.
* We provide an ML-powered "soft diagnosis" to save time for doctors and nurses.
* We have location-based COVID-19 alerts to better equip workers.
* Multilingual *speech-to-text* notes, because it's easier!
* Reminder system to help with medication/check-ups. Keeping track of everything is hard!

![Group 30](https://user-images.githubusercontent.com/48355572/218312626-e8ba45d6-10e2-481e-85c3-422725e4a423.gif)

**Access to care :**

* Multilingual communication model that transcribes speech from any language into English. This is particularly helpful in rural areas where communication is a barrier. 
* Experimental Computer-Vision powered heart rate monitor. This transforms everyday hand-held devices into medical devices - an exciting *vision* for the future!

---

### App Tryout Link 🔗
👉  [**https://healthifai-with.tech**](https://healthifai-with.tech)  [Deployed on Vercel ▲ & Backend deployed on **Linode**]

- Frontend (Vercel URI) : http://healthifai-2023.vercel.app
- Backend (Linode URI) : https://urlx.vercel.app/backmain:5002

![image](https://user-images.githubusercontent.com/48355572/207323369-79fac574-6fb6-4aca-b531-16d7e8ac0919.png)

### Privacy & Security 🔐
**HealthifAI** handles a wide range of *sensitive information* as *healthcare data*. In the wrong hands, this data could dramatically harm individuals. We took special efforts and considerations to ensure that our platform protects the privacy and sensitive information of all of our users making it **100% GDPR compliant!**


### How we built it ⚙️
**HealthifAI** was built using **cutting-edge AI and Machine Learning technologies**, including OpenAI's whisper as well as DETR (End-to-End Object Detection) model with ResNet-50 backbone. 

![image](https://user-images.githubusercontent.com/48355572/220208520-1fbc4d4f-66b2-422a-9204-5fec5d54323f.png)

For the disease detection part, we've used a Kaggle dataset which can be found [here](https://www.kaggle.com/datasets/itachi9604/disease-symptom-description-dataset). Our machine learning model performs extremely well in terms of *disease prediction* as we benchmarked an accuracy of more than 92% over a prolonged period. Based on the inference, we also return symptom severity and basic precautions in no time!

We used the Flask framework to build a RESTful API that can handle incoming requests and return appropriate responses. For the front-end, we used *React.JS* & *Tailwind* as CSS framework. The Authentication (OAuth) has been done by *Firebase* & we’re also using the *Cloudstore database* for storing user logs. We have deployed the *front-end of our Webapp on Vercel* & most importantly, *the backend is running on* **Linode**. 

The API was integrated with the Open-AI speech-to-text model "whisper" to transcribe speech from **any** language into English. Further, Gaussian Naive Bayes for classification was implemented to "soft diagnose" patients based on their symptoms.  

![image](https://cdn.openai.com/whisper/draft-20220919a/asr-details-desktop.svg)

We're also running our custom algorithm to analyse and return the heartbeat in *realtime* using a concept called as [**photoplethysmography**](https://www.google.com/search?q=photoplethysmography), where we leverage a camera & with the capability of face detection, we record images of facial skin, as skin can represent changes in arterial blood volume between the systolic and diastolic phases of the cardiac cycle & then we return the ROI. The computer-vision powered heart rate monitor was built using image processing techniques built with OpenCV. In essence, the camera detects sensitive changes in the neck and forehead which is then used to infer heart rate.

![image](https://user-images.githubusercontent.com/48355572/218312965-55a070fc-e2f0-4c66-81e5-f22ce1d91aae.png)

---

### Permissive License ⚖️
[MIT](https://github.com/Neilblaze/HealthifAI/blob/main/LICENSE)





### Why Linode?
Building *scalable systems* are always a tricky thing. Although our app is not serving millions of customers as of now, but as software enthusiast, *we strive to build an infinitely scalable application*. And here *Linode* helped us a lot.

![image](https://user-images.githubusercontent.com/48355572/220207179-eb192246-984b-42d5-9cdd-ef8bfd0584fa.png)

> Thanks to Linode for providing us with $100 credits! 😊

---

## Design 🎨

We were heavily inspired by the revised version of **Double Diamond** design process, a model popularized by the [British Design Council](https://www.designcouncil.org.uk/our-work/news-opinion/double-diamond-universally-accepted-depiction-design-process/), which not only includes visual design, but a full-fledged research cycle in which you must discover and define your problem before tackling your solution & then finally deploy it.

![image](https://user-images.githubusercontent.com/48355572/220200827-a709ccb1-8c01-40c0-8371-f5c1d9f248b2.png)

> 1. **Discover**: a deep dive into the problem we are trying to solve.
> 2. **Define**: synthesizing the information from the discovery phase into a problem definition.
> 3. **Develop**: think up solutions to the problem.
> 4. **Deliver**: pick the best solution and build that.

Moreover, we utilized design tools like Figma, Photoshop & Illustrator to prototype our designs before doing any coding. Through this, we are able to get iterative feedback so that we spend less time re-writing code.

![image](https://user-images.githubusercontent.com/48355572/220204816-7fa2762c-3d8b-45de-bcb4-81dee4bd8c5b.png)

### Research 📚
Research is the key to empathizing with users: we found our specific user group early and that paves the way for our whole project. Here are a few of the resources that were helpful to us —

* [What do healthcare workers spend most time on?](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5801881/) | NIH
* [Measuring Heart-rate through muted videos](http://alumni.media.mit.edu/~djmcduff/assets/remote-physiology.html) | MIT Media lab
* [An overview of healthcare in rural areas](https://www.ruralhealthinfo.org/topics/healthcare-access) | Rural Health Information
* [Provider Burnout](https://www.ncbi.nlm.nih.gov/books/NBK538330/) | NIH
* [Communication in rural healthcare](https://optimizingruralhealth.org/communication-in-healthcare/) | Optimizing rural healthcare
* [Can we use ML to diagnose diseases?](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8950225/) | NIH
* [Lack of medical workers plagues developing world](https://www.reuters.com/article/us-braindrain-idINTRE49001E20081001) | Reuters
* [Linode docs](https://www.linode.com/docs) 
* [Linode Compute Instances](https://www.linode.com/docs/products/compute/compute-instances/faqs)


**CREDITS**
- **Design Resources** : Freepik, Behance
- **Icons** : Icons8, fontawesome
- **Font** : Righteous / Roboto / Raleway 

---


### Challenges we ran into 😤
Building *HealthifAI* was not without its challenges. One of our challenges was integrating the various AI and machine learning technologies into a cohesive and functional system. This required a deep understanding of each technology, as well as expertise in data processing and software engineering.  We participated in hourly review sessions to share findings of distributed research - our biggest challenge was sticking to tight schedules! Moreover, we also ran into troubles while deploying the backend on Linode, but thanks to it's amazing documentation, things got sorted quite quickly!  

> P.S.: This project was initially built at Hacklytics [*under 36 hours*, 10th Feb — 12th Feb, 2023](https://devpost.com/software/healthifai).


We are proud of finishing the project on time which seemed like a tough task as we started working on it quite late due to other commitments. We were also able to add most of the features that we envisioned for the app during ideation. And as always, working overnight was pretty fun! :)

### What's next? 🚀
The sky's the limit for **HealthifAI**. We are already exploring new ways to improve and expand the platform, including incorporating new technologies and partnering with healthcare providers to bring our vision to a wider audience. We're committed to making a real impact in the healthcare industry and changing lives for the better.

### Conclusion 🐣
That's it for now! We can't wait to see the impact that HealthifAI will have on the world. Stay tuned for updates and more exciting developments! Also, I would love to thank my project partner @subhamX for helping me, & Special thanks goes to @devencourt for resolving everyone's doubts! 🙌. 

And as always, thank you #DEV #DEVCommunity & #Linode for hosting this hackathon! 💚
 
![breaker.png](https://i.postimg.cc/YSvrrWnc/breaker.png)
