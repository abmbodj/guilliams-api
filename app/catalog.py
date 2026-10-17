"""Phase 1 category fields inferred from the mobile form labels."""

CITIES = {
    "london": "London",
    "dubai": "Dubai",
    "sydney": "Sydney",
    "united-states": "United States",
}
CATEGORY_FIELDS = {
    "property-sale": (
        "Property for sale",
        ["property_type", "bedrooms", "bathrooms", "surface_m2", "amenities", "other"],
    ),
    "property-rent": (
        "Property for rent",
        [
            "property_type",
            "bedrooms",
            "bathrooms",
            "minimum_stay_months",
            "furnished",
            "amenities",
            "other",
        ],
    ),
    "room-rent": ("Room for rent", ["tenants", "minimum_stay_months", "amenities", "other"]),
    "holiday-home": (
        "Holiday home",
        ["bedrooms", "bathrooms", "amenities", "other", "minimum_stay_nights"],
    ),
    "cars-boats": ("Cars & boats", ["vehicle_type", "year", "mileage_km"]),
    "yard-sale": ("Yard sale", ["purchased_price_minor"]),
    "pets": (
        "Pets",
        ["pet_age", "pet_age_unit", "cats", "dogs", "birds", "fish", "other", "ad_type"],
    ),
    "tickets": ("Tickets", ["dates", "ticket_type", "ticket_count", "other"]),
    "private-catering": (
        "Private catering",
        ["event_types", "guests", "price_max_minor", "ad_type", "other"],
    ),
    "nanny-au-pair": ("Nanny/Au pair", ["service_types", "price_max_minor", "ad_type", "other"]),
    "pet-sitting": (
        "Pet sitting",
        ["cats", "dogs", "birds", "fish", "service_types", "other", "ad_type", "price_max_minor"],
    ),
    "jobs": ("Jobs", ["price_max_minor", "ad_type"]),
}
