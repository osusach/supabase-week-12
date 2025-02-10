alter table "public"."onboarding_profiles" drop constraint "check_onboarding_data";

alter table "public"."onboarding_profiles" add constraint "check_onboarding_data" CHECK (jsonb_matches_schema('{
        "type": "object",
        "properties": {
            "additional_notes": {
                "maxLength": 500,
                "type": ["string", "null"]
            },
            "graduation_year": {
                "type": ["number", "null"]
            },
            "last_attended_institution": {
                "maxLength": 100,
                "type": ["string", "null"]
            }
        },
        "required": ["additional_notes", "graduation_year", "last_attended_institution"]
    }'::json, onboarding_data)) NOT VALID not valid;

alter table "public"."onboarding_profiles" validate constraint "check_onboarding_data";