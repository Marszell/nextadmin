CREATE TABLE IF NOT EXISTS games
(
    id          BIGSERIAL PRIMARY KEY,
    name        text                        NOT NULL,
    description text,
    image_url   text                        NOT NULL,
    created_at  timestamp(3) with time zone NOT NULL default now(),
    updated_at  timestamp(3) with time zone,
    deleted_at  timestamp(3) with time zone
);
CREATE UNIQUE INDEX unique_game_name ON games (name) where deleted_at is not null;

CREATE TABLE IF NOT EXISTS payments
(
    id         BIGSERIAL PRIMARY KEY,
    name       text                     NOT NULL unique,
    image_url text NOT NULL ,
    created_at timestamp(3) with time zone NOT NULL default now(),
    updated_at timestamp(3) with time zone NOT NULL default now(),
    deleted_at timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS products
(
    id         BIGSERIAL PRIMARY KEY,
    game_id    bigint                   not null
        constraint products_game_id_fkey
            references games (id),
    name       text                     NOT NULL unique,
    price      numeric                  NOT NULL,
    image_url  text                     NOT NULL,
    quantity   int                      NOT NULL,
    description text,
    created_at timestamp with time zone NOT NULL default now(),
    updated_at timestamp with time zone NOT NULL default now(),
    deleted_at timestamp with time zone
);
CREATE UNIQUE INDEX unique_product_name ON products (name) where deleted_at is not null;


CREATE TABLE IF NOT EXISTS users
(
    id         BIGSERIAL PRIMARY KEY,
    email      text                     NOT NULL unique,
    password   text                     NOT null,
    name       text                     NOT NULL,
    created_at timestamp with time zone NOT NULL default now(),
    updated_at timestamp with time zone NOT NULL default now(),
    deleted_at timestamp with time zone
);

CREATE TABLE IF NOT EXISTS orders
(
    id             BIGSERIAL PRIMARY KEY,
    payment_id     bigint                   not null
        constraint orders_payment_id_fkey
            references payments (id),
    product_id     bigint                   not null
        constraint orders_product_id_fkey
            references products (id),
    price          numeric                  NOT NULL,
    status_order   text,
    payment_status text,
    server         text,
    created_at     timestamp with time zone NOT NULL default now(),
    updated_at     timestamp with time zone NOT NULL default now(),
    deleted_at     timestamp with time zone
);