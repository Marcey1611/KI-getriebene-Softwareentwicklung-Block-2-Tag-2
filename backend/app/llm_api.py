from groq import Groq
from dotenv import load_dotenv
import os
load_dotenv()
api_key = os.getenv('GROQ_API_KEY')

from models import CardRequest, BirthdayCard, WeddingCard, ChristmasCard, FuneralCard, BirthCard, ThankYouCard, CongratsCard, SomethingElseCard

def create_prompt(request: CardRequest):
    prompt = f"Schreibe eine {request.category} Karte für "

    data = request.category_data
    category = request.category.lower()  # nur zur Sicherheit

    match category:
        case "birthday":
            prompt += f"{data.name} zum {data.age}, die Person ist {data.charakter} vom Charakter und hat diese Interessen {data.interests}. "

        case "wedding":
            prompt += f"{data.name1} und {data.name2}. Person1 hat folgende Interessen: {data.interests1}. Person2 hat folgende Interessen: {data.interests2}. "

        case "christmas":
            prompt += f"Frohe Weihnachten für {data.name}. "

        case "funeral":
            prompt += f"Eine Trauerkarte für {data.name}. "

        case "birth":
            prompt += f"Willkommen {data.name} {data.familyName}! Wünsche: {data.wishes}. "

        case "thankyoucard":
            prompt += f"Eine Dankeskarte an {data.name}. "

        case "congrats":
            prompt += f"Glückwünsche an {data.name} für {data.reason}. "

        case "somethingelse":
            prompt += f"Eine Karte für {data.name}. Anlass: {data.reason}. Info: {data.info}. "

        case _:
            raise ValueError("Unbekannter Kartentyp")

    prompt += f"Schreibe die Karte in einem {data.style} Stil. Achte besonders drauf {data.specials} passend einzufügen."
    print(prompt)

    card_text = send_prompt(prompt)
    return card_text, category, data.style


def send_prompt(prompt: str) -> str:
    client = Groq(
        api_key=api_key,
    )

    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": "Du bist ein kreativer Assistent, der alle möglichen Karten (Grußkarten, Hochzeitkarten, uws.) in dem vorgebenen Stiel erstellt. Erstelle nur einen sehr kurzen Text"
            },
            {
                "role": "user",
                "content": prompt,
            }
        ],

        model="llama-3.3-70b-versatile",
        stream=False,
    )

    print(chat_completion.choices[0].message.content)
    return chat_completion.choices[0].message.content