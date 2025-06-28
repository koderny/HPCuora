#!/bin/bash


npx dotenv sequelize db:migrate
npx dotenv sequelize db:seed:all
npm start
