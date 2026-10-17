"""Shared wire contracts. Money uses minor units; IDs are opaque strings."""

from datetime import date
from typing import Generic, Literal, TypeVar
import re
from pydantic import BaseModel, ConfigDict, Field, model_validator, field_validator


class Model(BaseModel):
    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)


class FieldError(Model):
    path: str
    message: str


class ErrorDetail(Model):
    code: str
    message: str
    fields: list[FieldError] = Field(default_factory=list)


class ErrorResponse(Model):
    error: ErrorDetail


T = TypeVar("T")


class Page(Model, Generic[T]):
    items: list[T]
    total: int
    offset: int = 0
    limit: int = 20


class User(Model):
    id: str
    username: str
    phone: str | None = None
    email: str | None = None
    first_name: str = ""
    last_name: str = ""
    city_id: str | None = None
    category_ids: list[str] = Field(default_factory=list)
    photo_id: str | None = None
    message_consent: bool = False
    house_rules_accepted: bool = False
    notifications_enabled: bool = False
    sponsorship_count: int = 0
    access_status: Literal["pending_sponsors", "full"] = "pending_sponsors"
    onboarding_step: str
    verification_status: Literal["unverified", "pending", "verified"] = "unverified"


class ProfilePatch(Model):
    email: str | None = Field(default=None, max_length=254)
    first_name: str | None = Field(default=None, min_length=1, max_length=80)
    last_name: str | None = Field(default=None, min_length=1, max_length=80)
    city_id: str | None = None
    category_ids: list[str] | None = Field(default=None, max_length=12)
    photo_id: str | None = None
    message_consent: bool | None = None
    house_rules_accepted: bool | None = None
    notifications_enabled: bool | None = None

    @field_validator("email")
    @classmethod
    def email_valid(cls, value):
        if value is not None and not re.fullmatch(r"[^\s@]+@[^\s@]+\.[^\s@]+", value):
            raise ValueError("Enter a valid email address")
        return value.lower() if value else value

    @model_validator(mode="after")
    def no_null(self):
        if any(getattr(self, k) is None for k in self.model_fields_set if k != "photo_id"):
            raise ValueError("Only photo_id may be explicitly null")
        return self


class Signup(Model):
    username: str = Field(min_length=3, max_length=40, pattern=r"^[A-Za-z0-9_-]+$")
    password: str = Field(min_length=8, max_length=128)
    phone: str | None = Field(default=None, pattern=r"^\+[1-9][0-9]{7,14}$")


class Login(Model):
    username: str
    password: str = Field(max_length=128)


class Session(Model):
    session_token: str
    token_type: Literal["bearer"] = "bearer"
    expires_at: float
    user: User


class ChallengeRequest(Model):
    channel: Literal["phone", "email"]
    destination: str = Field(min_length=3, max_length=254)
    purpose: Literal["signup", "login", "change_phone"]

    @model_validator(mode="after")
    def destination_valid(self):
        if self.channel == "phone" and not re.fullmatch(r"\+[1-9][0-9]{7,14}", self.destination):
            raise ValueError("Phone must be E.164, for example +447700900001")
        if self.channel == "email":
            ProfilePatch.email_valid(self.destination)
            self.destination = self.destination.lower()
        if self.purpose in ("signup", "change_phone") and self.channel != "phone":
            raise ValueError("Signup and phone change use a phone number")
        return self


class Challenge(Model):
    id: str
    expires_at: float
    resend_after: float
    delivery: Literal["simulated"] = "simulated"
    demo_code: str | None = None


class Verify(Model):
    challenge_id: str
    code: str = Field(pattern=r"^\d{6}$")


class Attributes(Model):
    property_type: Literal["house", "flat", "land"] | None = None
    bedrooms: int | None = Field(default=None, ge=0, le=100)
    bathrooms: int | None = Field(default=None, ge=0, le=100)
    surface_m2: float | None = Field(default=None, gt=0)
    minimum_stay_months: int | None = Field(default=None, ge=1, le=1200)
    furnished: bool | None = None
    tenants: int | None = Field(default=None, ge=0, le=100)
    amenities: list[str] = Field(default_factory=list, max_length=30)
    other: str | None = Field(default=None, max_length=500)
    purchased_price_minor: int | None = Field(default=None, ge=0)
    pet_age: int | None = Field(default=None, ge=0)
    pet_age_unit: Literal["weeks", "months", "years"] | None = None
    cats: int | None = Field(default=None, ge=0, le=100)
    dogs: int | None = Field(default=None, ge=0, le=100)
    birds: int | None = Field(default=None, ge=0, le=100)
    fish: int | None = Field(default=None, ge=0, le=100)
    service_types: list[str] = Field(default_factory=list, max_length=20)
    ad_type: Literal["hiring", "selling"] | None = None
    dates: list[date] = Field(default_factory=list, max_length=60)
    ticket_type: str | None = Field(default=None, max_length=80)
    ticket_count: int | None = Field(default=None, ge=1, le=10000)
    vehicle_type: Literal["cars", "boats"] | None = None
    year: int | None = Field(default=None, ge=1900, le=2100)
    mileage_km: int | None = Field(default=None, ge=0)
    event_types: list[str] = Field(default_factory=list, max_length=20)
    guests: int | None = Field(default=None, ge=1, le=100000)
    price_max_minor: int | None = Field(default=None, ge=0)
    minimum_stay_nights: int | None = Field(default=None, ge=1)

    @model_validator(mode="after")
    def boats_no_mileage(self):
        if self.vehicle_type == "boats" and self.mileage_km is not None:
            raise ValueError("Mileage is disabled for boats")
        return self


class ListingCreate(Model):
    title: str = Field(min_length=1, max_length=160)
    description: str = Field(min_length=1, max_length=10000)
    category_id: str
    city_id: str
    postal_code: str = Field(min_length=1, max_length=30)
    town: str = Field(min_length=1, max_length=100)
    price_minor: int = Field(ge=0, le=100000000000)
    currency: Literal["GBP", "USD", "AED", "AUD", "EUR"] = "GBP"
    price_unit: Literal["item", "month", "week", "night", "hour", "event", "pet", "ticket"] = "item"
    photo_ids: list[str] = Field(default_factory=list, max_length=10)
    attributes: Attributes = Field(default_factory=Attributes)


class ListingPatch(Model):
    title: str | None = Field(default=None, min_length=1, max_length=160)
    description: str | None = Field(default=None, min_length=1, max_length=10000)
    category_id: str | None = None
    city_id: str | None = None
    postal_code: str | None = Field(default=None, min_length=1, max_length=30)
    town: str | None = Field(default=None, min_length=1, max_length=100)
    price_minor: int | None = Field(default=None, ge=0, le=100000000000)
    currency: Literal["GBP", "USD", "AED", "AUD", "EUR"] | None = None
    price_unit: (
        Literal["item", "month", "week", "night", "hour", "event", "pet", "ticket"] | None
    ) = None
    photo_ids: list[str] | None = Field(default=None, max_length=10)
    attributes: Attributes | None = None

    @model_validator(mode="after")
    def no_null(self):
        if any(getattr(self, k) is None for k in self.model_fields_set):
            raise ValueError("Listing fields may not be null")
        return self


class Listing(ListingCreate):
    id: str
    seller_id: str
    status: Literal["draft", "active", "paused", "sold", "deleted"]
    created_at: float
    updated_at: float
    unavailable: bool = False


class ListingStatus(Model):
    status: Literal["active", "paused", "sold"]
    buyer_id: str | None = None


class SponsorRequest(Model):
    sponsor_id: str
    relationship: str = Field(default="friend", max_length=100)


class SponsorDecision(Model):
    status: Literal["accepted", "declined"]


class Sponsorship(Model):
    id: str
    requester_id: str
    sponsor_id: str
    relationship: str
    status: Literal["pending", "accepted", "declined"]
    created_at: float


class Sponsorships(Model):
    incoming: list[Sponsorship]
    outgoing: list[Sponsorship]
    accepted_count: int
    required_count: int = 3


class Member(Model):
    id: str
    display_name: str
    photo_id: str | None = None
    city_id: str | None = None
    sponsorship_count: int
    verification_status: str


class OfferCreate(Model):
    amount_minor: int = Field(gt=0, le=100000000000)


class OfferAction(Model):
    action: Literal["accept", "decline", "counter"]
    amount_minor: int | None = Field(default=None, gt=0, le=100000000000)


class Offer(Model):
    id: str
    listing_id: str
    conversation_id: str
    sender_id: str
    recipient_id: str
    amount_minor: int
    currency: str
    status: Literal["pending", "accepted", "declined", "countered"]
    parent_id: str | None = None
    created_at: float


class ConversationCreate(Model):
    kind: Literal["listing", "concierge"]
    listing_id: str | None = None
    topic: Literal["general", "feedback", "contact", "report"] = "general"


class Conversation(Model):
    id: str
    kind: str
    listing_id: str | None = None
    topic: str
    created_at: float
    closed_at: float | None = None


class MessageCreate(Model):
    text: str = Field(min_length=1, max_length=4000)
    photo_id: str | None = None


class Message(Model):
    id: str
    conversation_id: str
    sender_id: str | None
    text: str
    photo_id: str | None = None
    offer_id: str | None = None
    created_at: float


class Notification(Model):
    id: str
    kind: str
    title: str
    body: str
    target_type: str
    target_id: str
    read_at: float | None = None
    created_at: float


class ReportCreate(Model):
    listing_id: str
    reason: str = Field(min_length=1, max_length=100)
    message: str = Field(min_length=1, max_length=4000)


class Report(ReportCreate):
    id: str
    status: Literal["received"] = "received"
    created_at: float


class MediaCreate(Model):
    filename: str = Field(min_length=1, max_length=120)
    content_type: Literal["image/png", "image/jpeg"]
    content_base64: str = Field(min_length=1, max_length=2800000)


class Media(Model):
    id: str
    filename: str
    content_type: str
    size: int
    content_url: str


class Reference(Model):
    id: str
    name: str


class Category(Reference):
    attribute_fields: list[str]


class Verification(Model):
    status: Literal["pending"] = "pending"


class DeleteAccount(Model):
    confirmation: Literal["DELETE"]
    reason: str = Field(default="", max_length=1000)


class Health(Model):
    status: Literal["ok"] = "ok"
    mode: str


class Suggestion(Model):
    text: str
    category_id: str | None = None


class Suggestions(Model):
    suggestions: list[Suggestion]
    recent: list[str]
    popular: list[str]


class Feed(Model):
    listings: Page[Listing]
    sponsorship_count: int
    required_sponsors: int = 3
    notifications_enabled: bool
    unread_notifications: int
    category_ids: list[str]
    yard_sale: "YardSale"


class YardSale(Model):
    id: str
    starts_at: float
    ends_at: float
    registration_closes_at: float
    registration_status: Literal["open", "closed"]
    registered: bool


class Favourite(Model):
    listing_id: str
    unavailable: bool
    listing: Listing | None = None


class Country(Reference):
    dial_code: str


class Legal(Model):
    document: Literal["terms", "cookies", "house-rules"]
    title: str
    body: str
    version: str
