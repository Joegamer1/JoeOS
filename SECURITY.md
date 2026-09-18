# Security policy

JoeOS is a public portfolio. Treat all shipped data and client code as permanently public.

The website must not connect to Joe's homelab, Home Assistant, home network, or any private service. This includes read-only integrations, telemetry adapters, build-time fetching, API proxies, remote controls, embedded dashboards, and owner-only administration. Private access belongs in separate tools. Publish only intentionally authored case studies and media; label any simulated metrics or topology examples clearly.

Do not commit secrets, internal addresses, private topology, credentials, access tokens, production configuration, or unsanitized monitoring exports. Use `.env.local` for local-only values and keep it out of source control. Public homelab data must be allowlisted into a separate schema.

Report a vulnerability privately to the repository owner rather than opening a public issue. Add a dedicated security contact before public launch.
