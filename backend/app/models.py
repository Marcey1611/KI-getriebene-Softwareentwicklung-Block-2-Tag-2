from pydantic import BaseModel
from typing import Optional, Union

class BirthdayCard(BaseModel):
    name: str
    age: int
    charakter: str
    interests: str
    style: str
    specials: str

class WeddingCard(BaseModel):
    name1: str
    interests1: str
    name2: str
    interests2: str
    style: str
    specials: str

class ChristmasCard(BaseModel):
    name: str
    style: str
    specials: str

class FuneralCard(BaseModel):
    name: str
    style: str
    specials: str

class BirthCard(BaseModel):
    name: str
    familyName: str
    wishes: str
    style: str
    specials: str

class ThankYouCard(BaseModel):
    name: str
    style: str
    specials: str

class CongratsCard(BaseModel):
    name: str
    reason: str
    style: str
    specials: str

class SomethingElseCard(BaseModel):
    name: str
    reason: str
    info: str
    style: str
    specials: str

class CardRequest(BaseModel):
    category: str
    category_data: Union[
        BirthdayCard,
        WeddingCard,
        ChristmasCard,
        FuneralCard,
        BirthCard,
        ThankYouCard,
        CongratsCard,
        SomethingElseCard
    ]