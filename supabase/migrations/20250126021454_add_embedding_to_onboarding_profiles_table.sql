alter table "public"."onboarding_profiles" add column "created_at" timestamp with time zone not null default now();

alter table "public"."onboarding_profiles" add column "updated_at" timestamp with time zone;

alter table "public"."onboarding_profiles" add column "embedding" vector(1536);

CREATE UNIQUE INDEX onboarding_profiles_pkey ON public.onboarding_profiles USING btree (id);

alter table "public"."onboarding_profiles" add constraint "onboarding_profiles_pkey" PRIMARY KEY using index "onboarding_profiles_pkey";