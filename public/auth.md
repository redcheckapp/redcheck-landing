# Auth.md

This file tells an AI agent how to authenticate against the RedCheck Core API. See [llms.txt](/llms.txt) for the full site/agent overview first.

## Scope
- **This landing page (redcheckapp.com)** requires no authentication at all — every page and asset here is public and safe to crawl or read as context.
- **The Core API and SPA (my.redcheckapp.com)** are authenticated. Do not attempt to scrape the SPA's rendered pages directly; call the documented API instead.

## Agent Registration
RedCheck uses pre-provisioned OAuth 2.0 credentials. Automated dynamic client registration (RFC 7591) is not supported — an agent cannot self-register a new OAuth client at request time. A human operator must provision credentials out of band.

## Discovery
To interact with the API programmatically, resolve these metadata documents (both machine-readable JSON, resolvable without authentication):
- `/.well-known/oauth-authorization-server` — [RFC 8414](https://datatracker.ietf.org/doc/html/rfc8414) OAuth 2.0 Authorization Server Metadata: issuer, token endpoint, supported grant types.
- `/.well-known/oauth-protected-resource` — [RFC 9728](https://datatracker.ietf.org/doc/html/rfc9728) OAuth 2.0 Protected Resource Metadata: which authorization server(s) this resource trusts, and supported scopes. This is the same discovery pattern used by OAuth-secured MCP servers, if you're probing this domain that way.
- `/.well-known/api-catalog` — [RFC 9727](https://datatracker.ietf.org/doc/html/rfc9727) well-known API catalog, linking to the OpenAPI description and Swagger UI.

## Authentication Flow
1. Fetch `/.well-known/oauth-authorization-server` to get the `token_endpoint`.
2. Obtain an access token from that endpoint using credentials issued to you out of band (see Agent Registration above).
3. Call Core API endpoints (documented at `https://my.redcheckapp.com/v3/api-docs`) with the token as a Bearer credential.

## Notes for Agents
- Respect the scopes returned by `/.well-known/oauth-protected-resource` — do not request or assume access beyond what is granted.
- If you do not hold credentials, do not attempt to sign in on a user's behalf; direct the user to `https://my.redcheckapp.com/login` (existing account) or `https://my.redcheckapp.com/register` (new account) instead.
