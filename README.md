# Docker Healthcheck Tester

Ein einfaches Tool, um das Verhalten von Docker Healthchecks zu studieren.

## Build
    
```bash
sh build.sh
```

## Run

```bash
sh run.sh
```

Ein Express Server wird gestartet auf port 3000. Der Healthcheck ist unter `/health` erreichbar.

Jeder Start des Healthchecks wird vom Server im stdout geloggt.

Der Status-String des Healthchecks kann geändert werden durch ein `POST /health/NEW_STATUS` (z.B. `POST /health/DOWN`).

Folgende Status-Strings sind speziell und verursachen ein bestimmtes Verhalten:
- `SLOW`: Antworte sind um 30s verzögert
- `THROW`: Antworte mit einem 500er Status Code