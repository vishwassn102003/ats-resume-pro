from fastapi import APIRouter
from pydantic import BaseModel
from services.ai import improve_resume

router = APIRouter()

class Req(BaseModel):
    resume: str
    jd: str

@router.post("/improve")
def improve(data: Req):
    return {"result": improve_resume(data.resume, data.jd)}
