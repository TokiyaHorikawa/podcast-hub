create table "public"."contents" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "title" character varying not null,
    "body" text not null
);


alter table "public"."contents" enable row level security;

CREATE UNIQUE INDEX contents_pkey ON public.contents USING btree (id);

alter table "public"."contents" add constraint "contents_pkey" PRIMARY KEY using index "contents_pkey";

grant delete on table "public"."contents" to "anon";

grant insert on table "public"."contents" to "anon";

grant references on table "public"."contents" to "anon";

grant select on table "public"."contents" to "anon";

grant trigger on table "public"."contents" to "anon";

grant truncate on table "public"."contents" to "anon";

grant update on table "public"."contents" to "anon";

grant delete on table "public"."contents" to "authenticated";

grant insert on table "public"."contents" to "authenticated";

grant references on table "public"."contents" to "authenticated";

grant select on table "public"."contents" to "authenticated";

grant trigger on table "public"."contents" to "authenticated";

grant truncate on table "public"."contents" to "authenticated";

grant update on table "public"."contents" to "authenticated";

grant delete on table "public"."contents" to "service_role";

grant insert on table "public"."contents" to "service_role";

grant references on table "public"."contents" to "service_role";

grant select on table "public"."contents" to "service_role";

grant trigger on table "public"."contents" to "service_role";

grant truncate on table "public"."contents" to "service_role";

grant update on table "public"."contents" to "service_role";


