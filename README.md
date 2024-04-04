# Guard Client

## Setup

[Install bun](https://bun.sh/docs/installation)

## 🚀 How to install dependencies

```sh
bun install
```

## How to set up local database
1.  Install Docker Desktop: [Link](https://www.docker.com/products/docker-desktop/)
2.  Start database
```sh
bunx supabase init
bunx supabase start
```
3. Set up environment variables

Create a file called .env at the root of the repository, add the following environment variables from the output of `supabase start` inside that file:
```sh
REACT_NATIVE_SUPABASE_URL="<API URL>"
REACT_NATIVE_SUPABASE_KEY="<anon key>"
```

## How to run app with Expo Go
This project works best with Expo Go instead of development build
```sh
bun start
i (for iOS)
a (for Android)
```
