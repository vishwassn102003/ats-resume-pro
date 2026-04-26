import re

def keywords(text):
    return set(re.findall(r'\b\w+\b', text.lower()))

def score(resume, jd):
    r = keywords(resume)
    j = keywords(jd)

    matched = list(r & j)
    missing = list(j - r)

    s = (len(matched) / len(j)) * 100 if j else 0

    return {
        "score": round(s, 2),
        "matched": matched[:20],
        "missing": missing[:20]
    }
