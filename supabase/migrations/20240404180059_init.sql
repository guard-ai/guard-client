SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

COMMENT ON SCHEMA "public" IS 'standard public schema';

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "postgis" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE TYPE "public"."EventLevel" AS ENUM (
    'CONFIRMED_THREAT',
    'REPORTED_THREAT',
    'CONFIRMED_INFO',
    'REPORTED_INFO',
    'NONE'
);

ALTER TYPE "public"."EventLevel" OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."Events" (
    "id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "level" "public"."EventLevel" NOT NULL,
    "category" character varying NOT NULL,
    "log_id" "uuid" NOT NULL,
    "location" "extensions"."geometry"(Point,4326)
);

ALTER TABLE "public"."Events" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."Logs" (
    "id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "region" character varying NOT NULL,
    "utterance" "text" NOT NULL
);

ALTER TABLE "public"."Logs" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."Users" (
    "id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "last_ping" timestamp with time zone DEFAULT "now"() NOT NULL,
    "location" "extensions"."geometry"(Point,4326) NOT NULL,
    "push_token" "text" DEFAULT ''::"text" NOT NULL
);

ALTER TABLE "public"."Users" OWNER TO "postgres";

ALTER TABLE ONLY "public"."Events"
    ADD CONSTRAINT "Events_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."Logs"
    ADD CONSTRAINT "Logs_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("id");

CREATE INDEX "location_index_events" ON "public"."Events" USING "btree" ("location");

CREATE INDEX "location_index_users" ON "public"."Users" USING "btree" ("location");

ALTER TABLE ONLY "public"."Events"
    ADD CONSTRAINT "public_Events_log_id_fkey" FOREIGN KEY ("log_id") REFERENCES "public"."Logs"("id");

ALTER TABLE ONLY "public"."Users"
    ADD CONSTRAINT "public_Users_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id");

ALTER TABLE "public"."Events" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."Logs" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."Users" ENABLE ROW LEVEL SECURITY;

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON TABLE "public"."Events" TO "anon";
GRANT ALL ON TABLE "public"."Events" TO "authenticated";
GRANT ALL ON TABLE "public"."Events" TO "service_role";

GRANT ALL ON TABLE "public"."Logs" TO "anon";
GRANT ALL ON TABLE "public"."Logs" TO "authenticated";
GRANT ALL ON TABLE "public"."Logs" TO "service_role";

GRANT ALL ON TABLE "public"."Users" TO "anon";
GRANT ALL ON TABLE "public"."Users" TO "authenticated";
GRANT ALL ON TABLE "public"."Users" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
