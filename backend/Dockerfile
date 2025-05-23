# Leichtes und stabiles Basis-Image
FROM node:lts-alpine

# Setze das Arbeitsverzeichnis im Container
WORKDIR /app

# Nur die package-Dateien zuerst kopieren (für bessere Layer-Caching-Effizienz)
COPY package*.json ./

# Installiere exakt laut lockfile (schnell + reproduzierbar)
RUN npm ci

# Restliche App kopieren
COPY . .

# Dokumentiere den App-Port (für Tools / späteres Deployment)
EXPOSE 3000

# Starte App via npm start (definiert in package.json)
CMD ["npm", "start"]
