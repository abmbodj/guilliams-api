export const CITIES: Record<string, string> = {
  london: "London",
  dubai: "Dubai",
  sydney: "Sydney",
  "united-states": "United States",
};

export const CATEGORY_FIELDS: Record<
  string,
  { name: string; fields: string[] }
> = {
  "property-sale": {
    name: "Property for sale",
    fields: [
      "property_type",
      "bedrooms",
      "bathrooms",
      "surface_m2",
      "amenities",
      "other",
    ],
  },
  "property-rent": {
    name: "Property for rent",
    fields: [
      "property_type",
      "bedrooms",
      "bathrooms",
      "minimum_stay_months",
      "furnished",
      "amenities",
      "other",
    ],
  },
  "room-rent": {
    name: "Room for rent",
    fields: ["tenants", "minimum_stay_months", "amenities", "other"],
  },
  "holiday-home": {
    name: "Holiday home",
    fields: [
      "bedrooms",
      "bathrooms",
      "amenities",
      "other",
      "minimum_stay_nights",
    ],
  },
  "cars-boats": {
    name: "Cars & boats",
    fields: ["vehicle_type", "year", "mileage_km"],
  },
  "yard-sale": {
    name: "Yard sale",
    fields: ["purchased_price_minor"],
  },
  pets: {
    name: "Pets",
    fields: [
      "pet_age",
      "pet_age_unit",
      "cats",
      "dogs",
      "birds",
      "fish",
      "other",
      "ad_type",
    ],
  },
  tickets: {
    name: "Tickets",
    fields: ["dates", "ticket_type", "ticket_count", "other"],
  },
  "private-catering": {
    name: "Private catering",
    fields: ["event_types", "guests", "price_max_minor", "ad_type", "other"],
  },
  "nanny-au-pair": {
    name: "Nanny/Au pair",
    fields: ["service_types", "price_max_minor", "ad_type", "other"],
  },
  "pet-sitting": {
    name: "Pet sitting",
    fields: [
      "cats",
      "dogs",
      "birds",
      "fish",
      "service_types",
      "other",
      "ad_type",
      "price_max_minor",
    ],
  },
  jobs: {
    name: "Jobs",
    fields: ["price_max_minor", "ad_type"],
  },
};
