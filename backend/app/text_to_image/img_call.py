from huggingface_hub import InferenceClient
from dotenv import load_dotenv
import os
from io import BytesIO
from uuid import uuid4
import base64
from PIL import Image


load_dotenv()
api_key = os.getenv('HUGGING_FACE_API_KEY')
dummy_uuid = "452f9fbe-2ee3-4171-b9b0-e180922c7197"

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



def generate_image_dummy(img_prompt):
    return image_to_base64("/app/images/452f9fbe-2ee3-4171-b9b0-e180922c7197.png"),"452f9fbe-2ee3-4171-b9b0-e180922c7197"

def image_to_base64(path: str) -> str:
    with Image.open(path) as img:
        buffered = BytesIO()
        img.save(buffered, format="PNG")  # Oder "JPEG" je nach Bild
        img_bytes = buffered.getvalue()
        base64_str = base64.b64encode(img_bytes).decode("utf-8")
        return base64_str
#generate_image(llm_description)

