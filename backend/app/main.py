from fastapi import FastAPI

from models import CardRequest
from llm_api import send_prompt

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/generate-card")
async def generate_card(request: CardRequest):
    return {
        "prompt": send_prompt(request),
        "card_text": "Hier kommt dein generierter Grußkartentext hin."
    }