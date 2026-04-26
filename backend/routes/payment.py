import razorpay, os
from fastapi import APIRouter

router = APIRouter()

client = razorpay.Client(auth=(
    os.getenv("RAZORPAY_KEY_ID"),
    os.getenv("RAZORPAY_KEY_SECRET")
))

@router.post("/payment")
def create():
    return client.order.create({
        "amount": 2100,
        "currency": "INR"
    })
