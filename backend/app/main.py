from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import Request, Response
from fastapi.responses import FileResponse
import os
from dotenv import load_dotenv

from models import CardRequest
from llm_api import create_prompt
from text_to_image.description_generation import generate_image_description
from text_to_image.img_call import generate_image

load_dotenv()
api_key_hugg = os.getenv('HUGGING_FACE_API_KEY')
api_key_groq = os.getenv('GROQ_API_KEY')


app = FastAPI()
# teste localhost:8000/download/452f9fbe-2ee3-4171-b9b0-e180922c7197


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=False,
)


#class ReferrerPolicyMiddleware(BaseHTTPMiddleware):
#    async def dispatch(self, request: Request, call_next):
#        response: Response = await call_next(request)
#        response.headers['Referrer-Policy'] = 'no-referrer'  # Oder 'strict-origin-when-cross-origin' etc.
#        return response

#app.add_middleware(ReferrerPolicyMiddleware)

@app.get("/")
async def root():
    return {"message": "This is the Backend of the Grußinator"}

@app.post("/generate-card")
async def generate_card(request: CardRequest):
    print(f"GROQ_API_KEY: {api_key_groq}")
    print(f"HUGGING_FACE_API_KEY: {api_key_hugg}")

    card_description,topic,style = create_prompt(request)
    img_desc = generate_image_description(topic,card_description,style)
    img_base64 = generate_image(img_desc)
    return {
        "prompt": card_description,
        "base64_img": img_base64,
    }