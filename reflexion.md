## Reflexion

### Warum ist es eine Best Practice, Konfiguration und sensible Daten in Kubernetes getrennt von den Docker Images zu speichern? (Denke an die 12-Factor App)

Laut dem 12-Factor-Prinzip sollen Konfigurationswerte extern gehalten werden, damit sich das Image in jeder Umgebung flexibel und sicher starten lässt – ohne Rebuilds oder Hardcodierung sensibler Daten.

---

### Was ist der Hauptunterschied im Zweck zwischen einer ConfigMap und einem Secret?

Eine ConfigMap speichert nicht-sensible Konfiguration (z. B. ENV-Vars, Flags), während ein Secret speziell für sensible Daten gedacht ist (z. B. Passwörter, Tokens) und automatisch Base64-kodiert sowie restriktiver gehandhabt wird.

---

### Beschreibe die zwei Hauptarten, wie du Konfiguration (sowohl aus ConfigMaps als auch Secrets) für einen Container in einem Pod bereitstellen kannst (Nenne die YAML-Konfiguration im Pod/Deployment Spec).

**1. Als Umgebungsvariable:**

```yaml
env:
  - name: DB_PASSWORD
    valueFrom:
      secretKeyRef:
        name: my-app-secret
        key: DB_PASSWORD
```

**2. Als gemountete Datei über Volume:**

```yaml
volumes:
  - name: secret-volume
    secret:
      secretName: my-app-secret
volumeMounts:
  - name: secret-volume
    mountPath: /etc/app/secrets/
```

---

### Welchen Weg (ENV Var oder gemountete Datei) würdest du für ein kritisches Datenbank-Passwort in Produktion bevorzugen und warum?

Gemountete Datei. Sie kann vom Container gelesen werden, ohne dass der Wert als ENV-Var in Logs, Stacktraces oder Prozesslisten auftaucht – das erhöht die Sicherheit.

---

### Deine Secret YAML Datei sollte nicht in einem öffentlichen Git-Repository eingecheckt werden. Warum ist das Feld `stringData:` in der Secret-Definition zwar praktisch, aber auch ein Grund für diese Vorsicht?

`stringData` erlaubt das Einfügen von Klartextwerten – was bequem ist, aber ein Sicherheitsrisiko, falls die Datei versehentlich committet wird. Secrets sollten nur lokal verwaltet oder automatisiert erstellt werden.