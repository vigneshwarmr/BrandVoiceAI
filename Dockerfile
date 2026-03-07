FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app

COPY backend ./backend
WORKDIR /app/backend

RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jdk
WORKDIR /app

COPY --from=build /app/backend/target/*.jar app.jar

CMD ["java", "-jar", "app.jar"]
