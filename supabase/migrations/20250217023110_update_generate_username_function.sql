CREATE OR REPLACE FUNCTION public.generate_username()
 RETURNS text
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
DECLARE
    generated_username text;
    retry_count int := 0;
BEGIN
    LOOP
        generated_username := 'user' || substring(gen_random_uuid()::text FROM 1 FOR 8);

        -- Check if username already exists
        IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE username = generated_username) THEN
            RETURN generated_username;
        END IF;

        retry_count := retry_count + 1;
        IF retry_count >= 5 THEN
            RAISE EXCEPTION 'Failed to generate a unique username after 5 attempts';
        END IF;
    END LOOP;
END;
$function$
;