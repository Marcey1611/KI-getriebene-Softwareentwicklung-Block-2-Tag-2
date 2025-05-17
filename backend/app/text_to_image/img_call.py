from huggingface_hub import InferenceClient
from dotenv import load_dotenv
import os
from io import BytesIO
from uuid import uuid4
import base64

load_dotenv()
api_key = os.getenv('HUGGING_FACE_API_KEY')

def save_img(image):
    uuid = uuid4()
    file_name = f"{uuid}.png"
    file_path = f"/images/{file_name}"
    os.makedirs("/images", exist_ok=True)
    image.save(file_path)
    return uuid

def convert_img(image):
    img_io = BytesIO()
    image.save(img_io, format="PNG")  # oder "JPEG"
    img_io.seek(0)
    img_base = base64.b64encode(img_io.read()).decode("utf-8")

    return img_base

def generate_image(img_prompt):
    client = InferenceClient(
        provider="fal-ai",
        api_key=api_key
    )
    try:
    # output is a PIL.Image object
        image = client.text_to_image(
            img_prompt,
            model="stabilityai/stable-diffusion-3.5-large",
        )
        uuid = save_img(image)
        return convert_img(image), uuid
    except Exception as e:
        print(e)
        print("Your Credits on Huggingface is most likely exceeded! Visit https://huggingface.co/settings/billing to see if you have anything left!")



#generate_image(llm_description)

