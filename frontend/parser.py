l = list()
with open("/Users/irennanicole/Desktop/archive/Symptom-severity.csv") as f:
   content = f.read()
   content = content.split("\n")[1:-1]
   for c in content:
      c = c.split(",")
      l.append(c[0].replace("_", " "))

print(l)
