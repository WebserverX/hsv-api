import json


def getData(file):
    with open(file, "r", encoding="utf-8") as f:
        return json.load(f)


data = getData("data2.json")

bijbel = {}

for line in data:
    boek = line["book"]
    hoofdstuk = line["chapter"]
    vers = line["verse"]
    tekst = line["bible_text"]

    if boek not in bijbel:
        bijbel[boek] = {}

    if hoofdstuk not in bijbel[boek]:
        bijbel[boek][hoofdstuk] = {}

    bijbel[boek][hoofdstuk][vers] = tekst

with open("data.json", "w", encoding="utf-8") as f:
    json.dump(bijbel, f, ensure_ascii=False, indent=4)

print("data file made!")
print("done!")
