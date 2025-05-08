# 3.3 Security & Infrastructure Short Answers

1. **JWT Secret Management in Production**

- JWT secrets should never be hardcoded or stored in repo.
- In production, use a secrets management service (such as AWS Secrets Manager, Azure Key Vault, or HashiCorp Vault) to securely store and access the JWT secret.
- Environment variables can be used to inject the secret at runtime, but the source of truth should be a secure, access-controlled system.
- Rotate secrets regularly and restrict access to only necessary services.

2. **One High-Availability Strategy for the API**

- Container based architecture (ECS + EC2 for example)
- Load balanced with pre-warmed instances available for failover
- Auotmated horizontal and vertical scaling of the cluster
- Replica DBs for failover
- Comprehensive health monitoring and alerts
- Bonus: Use N-API native bindings for parallelism for high compute scenarios in a Node env

3. **A CI/CD Best Practice to Deploy Securely**

- Use a multi-step CI/CD pipeline that runs on every push and pull request to main branches.
- Steps should include:
  1. **Install dependencies** with a clean, reproducible install (`npm ci`).
  2. **Lint code** for style and syntax issues (`npm run lint`).
  3. **Type check** to catch TypeScript errors early (`npm run lint:types`).
  4. **Run SAST** (Static Application Security Testing) using tools like `eslint-plugin-security`.
  5. **Scan for dependency vulnerabilities** using `npm audit`.
  6. **Secret detection** using GitHub's built-in secret scanning and/or CodeQL.
  7. **Run tests** to ensure code correctness (`npm test`).
  8. **Build the project** only if all previous steps pass (`npm run build`).
- Fail fast: If any step fails, the pipeline should stop and not proceed to build or deploy.
- Store all secrets and credentials securely in the CI/CD system, never in code or logs.
- Require approvals for production deployments and use infrastructure-as-code for consistency and auditability.
