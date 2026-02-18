# NOMAD

## Run With Docker

```bash
docker compose up --build
```

- Frontend: `http://localhost:8080`
- Backend health: `http://localhost:5000/`

## Kubernetes (Base Manifests)

Apply in order:

```bash
kubectl apply -f deploy/k8s/namespace.yaml
kubectl apply -f deploy/k8s/backend-secrets.example.yaml
kubectl apply -f deploy/k8s/backend.yaml
kubectl apply -f deploy/k8s/frontend.yaml
kubectl apply -f deploy/k8s/ingress.yaml
```

Update before apply:
- Docker image names in `deploy/k8s/backend.yaml` and `deploy/k8s/frontend.yaml`
- Host in `deploy/k8s/ingress.yaml`
- Secret values in `deploy/k8s/backend-secrets.example.yaml`
