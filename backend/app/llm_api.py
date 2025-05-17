from groq import Groq

from models import CardRequest, BirthdayCard, WeddingCard, ChristmasCard, FuneralCard, BirthCard, ThankYouCard, CongratsCard, SomethingElseCard

def create_prompt(request: CardRequest):
    prompt = f"Schreibe eine {request.category} Karte für "

    match request.category_data:
        case BirthdayCard(name=name, age=age, charakter=charakter, interests=interests, style=style, specials=specials):
            prompt += f"{name} zum {age}, die Person ist {charakter} vom Charakter und hat diese Interessen {interests}. "

        case WeddingCard(name1=name1, name2=name2, interests1=i1, interests2=i2, style=style, specials=specials):
            prompt += f"{name1} und {name2}. Person1 hat folgende Interessen: {i1}. Person2 hat folgende Interessen: {i2}. "

        case ChristmasCard(name=name, style=style, specials=specials):
            prompt += f"Frohe Weihnachten für {name}. "

        case FuneralCard(name=name, style=style, specials=specials):
            prompt += f"Eine Trauerkarte für {name}. "

        case BirthCard(name=name, familyName=family, wishes=wishes, style=style, specials=specials):
            prompt += f"Willkommen {name} {family}! Wünsche: {wishes}. "

        case ThankYouCard(name=name, style=style, specials=specials):
            prompt += f"Eine Dankeskarte an {name}. "

        case CongratsCard(name=name, reason=reason, style=style, specials=specials):
            prompt += f"Glückwünsche an {name} für {reason}. "

        case SomethingElseCard(name=name, reason=reason, info=info, style=style, specials=specials):
            prompt += f"Eine Karte für {name}. Anlass: {reason}. Info: {info}. "

        case _:
            raise ValueError("Unbekannter Kartentyp")

    prompt += f"Schreibe die Karte in einem {style} Stil. Füge als Besonderheit {specials} ein."
    card_text = send_prompt(prompt)
    return card_text,request.category,style

def send_prompt(prompt: str) -> str:
    client = Groq(
        api_key="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",
    )

    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": "Du bist ein kreativer Assistent, der alle möglichen Karten (Grußkarten, Hochzeitkarten, uws.) in dem vorgebenen Stiel erstellt. Erstelle nur ein kurzen Text"
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