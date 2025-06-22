# # Build for React. Converts TSX and React into a static html bundle
FROM --platform=amd64 node:18-alpine AS frontend-build

WORKDIR /frontend

COPY frontend/package*.json ./

RUN npm install --legacy-peer-deps

COPY frontend/ ./

RUN npm run build

# Build for API. Converts Typescript into Javascript for production
FROM --platform=amd64 node:18-alpine as production

WORKDIR /backend

COPY backend/package*.json ./

RUN npm install

COPY backend/ ./



# Production level Image: Inherits from built api and frontend images

COPY --from=frontend-build /frontend/dist ./dist/hpcuora

COPY --from=frontend-build /frontend/public ./dist/hpcuora/public


EXPOSE 8000

CMD ["/bin/bash", "-c", "npm run db:reset && node bin/www"]

