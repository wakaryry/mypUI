import json

def makeRaw(props):
    raw = props['myp_raw']

def makeCommon(props):
    pass

def makeStateCommon(props):
    pass

def makeOthers(props):
    pass

def propsMaker(fromFile, toFile):
    with open(fromFile, "r") as propFile, open(toFile, "w") as resultFile:
        props = json.load(propFile)
        raw = makeRaw(props)
        common = makeCommon(props)
        stateCommon = makeStateCommon(props)
        others = makeOthers(props)
        all = {**raw, **common, **stateCommon, **others}
        jsonStr = json.dumps(all, indent=4)
        resultFile.write(jsonStr)

if __name__ == "__main__":
    propsMaker("prop.json", "props.json")
