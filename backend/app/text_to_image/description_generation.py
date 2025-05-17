import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()
api_key = os.getenv('GROQ_API_KEY')

client = Groq(api_key=api_key)
def generate_image_description(topic,slogan,style):
    prompt = f"Generate a card description for a{topic} with this slogan: {slogan}. Please only description the picture. Style: {style}, there should be no text on the card."

    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        model="llama-3.3-70b-versatile",
    )

    print(chat_completion.choices[0].message.content)
    return chat_completion.choices[0].message.content
