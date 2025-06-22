# Build the frontend
FROM --platform=amd64 node:18-alpine AS frontend-build
WORKDIR /frontend
# copy only package.json 
COPY frontend/package*.json ./
# install all deps
RUN npm install --legacy-peer-deps
COPY frontend/ ./
RUN npm run build
# Stage 2: Production image (API + UI)
FROM --platform=amd64 node:18-alpine AS production
WORKDIR /app
# copy backend package.json
COPY backend/package*.json ./
# install *only* production dependencies
RUN npm install --omit=dev
# copy backend
COPY backend/ ./
# 4) copy the compiled frontend
COPY --from=frontend-build /frontend/dist ./dist/hpcuora
COPY --from=frontend-build /frontend/public ./dist/hpcuora/public
# env-vars
ENV NODE_ENV=production
EXPOSE 8000
# directly launch your entrypoint
CMD ["node", "bin/www"]

