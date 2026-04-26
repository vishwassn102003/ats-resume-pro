from fastapi import APIRouter
from pydantic import BaseModel
from services.ats import score

router = APIRouter()

class Req(BaseModel):
    resume: str
    jd: str

@router.post("/analyze")
def analyze(data: Req):
    return score(data.resume, data.jd)
