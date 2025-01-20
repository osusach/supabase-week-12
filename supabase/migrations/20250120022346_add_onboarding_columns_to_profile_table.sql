create extension if not exists "pg_jsonschema" with schema "extensions";

create type "public"."education_level_type" as enum ('high_school', 'undergraduate', 'other');

create type "public"."gender_type" as enum ('male', 'female', 'non_binary', 'prefer_not_to_say');

alter table "public"."profiles" add column "city_id" bigint;

alter table "public"."profiles" add column "date_of_birth" date;

alter table "public"."profiles" add column "education_level" education_level_type;

alter table "public"."profiles" add column "field_of_study_id" bigint;

alter table "public"."profiles" add column "first_name" text;

alter table "public"."profiles" add column "gender" gender_type;

alter table "public"."profiles" add column "intended_field_of_study_id" bigint;

alter table "public"."profiles" add column "last_name" text;

alter table "public"."profiles" add column "onboarding_data" jsonb;

alter table "public"."profiles" add constraint "check_onboarding_data" CHECK (jsonb_matches_schema('{
        "type": "object",
        "properties": {
            "additional_notes": {
                "type": "string",
                "maxLength": 300
            },
            "graduation_year": {
                "type": "number"
            },
            "last_attended_institution": {
                "type": "string",
                "maxLength": 150
            }
        }
    }'::json, onboarding_data)) not valid;

alter table "public"."profiles" validate constraint "check_onboarding_data";

alter table "public"."profiles" add constraint "profiles_city_id_fkey" FOREIGN KEY (city_id) REFERENCES cities(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."profiles" validate constraint "profiles_city_id_fkey";

alter table "public"."profiles" add constraint "profiles_field_of_study_id_fkey" FOREIGN KEY (field_of_study_id) REFERENCES fields_of_study(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."profiles" validate constraint "profiles_field_of_study_id_fkey";

alter table "public"."profiles" add constraint "profiles_intended_field_of_study_id_fkey" FOREIGN KEY (intended_field_of_study_id) REFERENCES fields_of_study(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."profiles" validate constraint "profiles_intended_field_of_study_id_fkey";