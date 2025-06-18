from dotenv import load_dotenv
import os
import openai

load_dotenv()

def generate_image(prompt):
    client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    response = client.images.generate(
        model="dall-e-2",
        prompt=prompt,
        n=1,
        size="1024x1024",
        response_format="b64_json"
    )

    base64_string = response.data[0].b64_json
    print(f"Base64-String from generated Picture: {base64_string[:30]}...")

    return base64_string

