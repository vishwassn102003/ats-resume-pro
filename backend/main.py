from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes import analyze, improve, payment

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analyze.router)
app.include_router(improve.router)
app.include_router(payment.router)

@app.get("/")
def home():
    return {"message": "ATS Resume Pro API is LIVE 🚀"}
