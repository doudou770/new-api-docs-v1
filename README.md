# FlyReq API Docs

A Next.js documentation site for FlyReq API.

## Development

Run the development server:

```bash
bun install

bun dev
```

Open http://localhost:3000 with your browser to see the result.

## Build

Build the application for production:

```bash
bun run build
```

## Docker

Docker images are built and published to GitHub Container Registry manually from GitHub Actions.

Default image name:

```text
ghcr.io/doudou770/new-api-docs-v1:latest
```

Repository: [doudou770/new-api-docs-v1](https://github.com/doudou770/new-api-docs-v1)

### Docker Compose Deployment

Create `docker-compose.yml` on your server:

```yaml
services:
  flyreqapi-docs:
    image: ghcr.io/doudou770/new-api-docs-v1:latest
    container_name: flyreqapi-docs
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
      PORT: 3000
      HOSTNAME: 0.0.0.0
      # Optional: enable Google Analytics
      # NEXT_PUBLIC_GA_ID: G-XXXXXXXXXX
      # Optional: enable AI search/chat API
      # INKEEP_API_KEY: your_api_key
      # AI_BASE_URL: https://api.inkeep.com/v1
      # AI_MODEL: inkeep-qa-sonnet-4
```

Before the first deployment, open **Actions -> Build Docker Image** in GitHub and click **Run workflow**. After it succeeds, the `latest` image will be available from GHCR.

If the package visibility is private, log in on the server first:

```bash
echo "YOUR_GITHUB_TOKEN" | docker login ghcr.io -u doudou770 --password-stdin
```

The token needs permission to read packages.

Start the service:

```bash
docker compose up -d
```

View logs:

```bash
docker compose logs -f flyreqapi-docs
```

Update to the latest image:

```bash
docker compose pull
docker compose up -d
```

Stop the service:

```bash
docker compose down
```

### GitHub Actions

The workflow is located at `.github/workflows/docker-image.yml`.

It runs when:

- the workflow is manually triggered from GitHub Actions

The workflow publishes:

- `latest`
- `sha-<commit>` for every built commit

Make sure GitHub Actions has package write permission:

1. Open the GitHub repository.
2. Go to **Settings -> Actions -> General**.
3. Under **Workflow permissions**, select **Read and write permissions**.

## Project Structure

| Path                      | Description                  |
| ------------------------- | ---------------------------- |
| `app/(home)`              | Landing page and home pages  |
| `app/[lang]/docs`         | Documentation pages (i18n)   |
| `app/api/search/route.ts` | Search API endpoint          |
| `content/docs/`           | Documentation content (MDX)  |
| `lib/source.ts`           | Content source configuration |

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Next.js features and API
