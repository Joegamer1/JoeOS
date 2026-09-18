# Deployment

Production repository: `Joegamer1/JoeOS`. Initial URL: https://joegamer1.github.io/JoeOS/.

Select **Settings → Pages → Source → GitHub Actions**. The deploy workflow runs tests, lint, types, and a Next.js static export on each push to `main`, uploads only `out/`, and deploys using GitHub's short-lived Pages/OIDC permissions. No personal access token, private API, server runtime, or infrastructure secret is needed.

The checked-in pnpm lockfile fixes dependency resolution. Use Node 22 and pnpm 11.19.0. Pull requests run the same checks without deployment permissions. Do not add private credentials to Actions or public build variables.

Local production parity:

```sh
pnpm install --frozen-lockfile
pnpm test && pnpm lint && pnpm typecheck
GITHUB_ACTIONS=true GITHUB_REPOSITORY=Joegamer1/JoeOS pnpm build
```

Check `/JoeOS/` and `/JoeOS/read/about/`, fonts/assets, app launches, terminal, and mobile layout after deployment. A local static server must mount `out/` at `/JoeOS/` for this build.

## Custom domain

Configure a domain and DNS in GitHub Pages, set repository variable `PAGES_BASE_PATH` to `/`, and `SITE_URL` to the verified HTTPS domain (no trailing slash). Re-run the workflow. Until then, canonical metadata uses `https://joegamer1.github.io/JoeOS`.

## Limits and recovery

No request-time routes, API handlers, server actions, authentication service, or dynamic image optimizer. Static content and browser-local OS behavior work here. Marathon may need a separate origin if a verified runtime requires headers Pages cannot supply; no runtime has been selected or bundled.

If a deployment fails, the existing Pages release remains available. Inspect Actions logs, fix the error, and rerun. To roll back a bad release, revert its source commit and let the workflow redeploy. Never force-push to hide history.

References: [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports), [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
