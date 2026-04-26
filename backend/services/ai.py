import os
from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def improve_resume(resume, jd):
    prompt = f"""
Improve this resume for ATS.
Add missing keywords from JD.

Resume:
{resume}

JD:
{jd}
"""

    res = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}]
    )

    return res.choices[0].message.content
