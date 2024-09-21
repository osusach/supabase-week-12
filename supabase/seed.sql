insert into "public"."countries" (
    id,
    name,
    iso2,
    iso3,
    local_name,
    continent
) values (
    1,
    'Chile',
    'CL',
    'CHL',
    'Chile',
    'South America'
);

insert into "public"."states" (
    id,
    name,
    country_id
) values (
    1,
    'Metropolitana',
    1
);

insert into "public"."cities" (
    id,
    name,
    state_id
) values (
    1,
    'Santiago',
    1
), (
    2,
    'Estación Central',
    1
);

insert into "public"."institutions" (
    id,
    name,
    abbreviation,
    institution_category,
    funding_type,
    address,
    website_url,
    city_id
) values (
    1,
    'Universidad de Santiago de Chile',
    'USACH',
    'university',
    'public',
    'Av. Libertador Bernardo O''Higgins, 9170022 Estación Central, Región Metropolitana',
    'https://www.usach.cl',
    2
), (
    2,
    'Pontificia Universidad Católica de Chile',
    'PUC',
    'university',
    'mixed',
    'Av. Libertador Bernardo O''Higgins 340, 8331150 Santiago, Región Metropolitana',
    'https://www.uc.cl',
    1
), (
    3,
    'Universidad de Chile',
    'UCh',
    'university',
    'public',
    'Av. Libertador Bernardo O''Higgins 1058, 8330111 Santiago, Región Metropolitana',
    'https://uchile.cl',
    1
);