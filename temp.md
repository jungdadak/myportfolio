# services:
#  postgres:
#   image: postgres:latest
#   container_name: my_portfolio_db
#   environment:
#    POSTGRES_USER: ${POSTGRES_USER}
#    POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
#    POSTGRES_DB: ${POSTGRES_DB}
#   ports:
#    - "${POSTGRES_PORT}:5432"
#   volumes:
#    - pgdata:/var/lib/postgresql/data
#   networks:
#    - app-network

#  pgadmin:
#   image: dpage/pgadmin4
#   container_name: my_pgadmin
#   environment:
#    PGADMIN_DEFAULT_EMAIL: admin@example.com
#    PGADMIN_DEFAULT_PASSWORD: admin
#   ports:
#    - "8080:80"
#   depends_on:
#    - postgres
#   networks:
#    - app-network

# networks:
#  app-network:
#   driver: bridge

# volumes:
#  pgdata:
