FROM php:8.2-cli

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y \
    git \
    curl \
    zip \
    unzip \
    sqlite3 \
    libsqlite3-dev \
    libicu-dev \
    ca-certificates \
    && update-ca-certificates

# Instalar extensões PHP
RUN docker-php-ext-install pdo pdo_sqlite intl

# Instalar Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Configurar Git e Composer
RUN git config --global http.sslVerify false
RUN composer config --global process-timeout 2000
RUN composer clear-cache

# Configurar diretório de trabalho
WORKDIR /var/www/html

# Copiar os arquivos do projeto
COPY . /var/www/html

# Instalar dependências do Laravel
RUN composer install --prefer-dist --no-dev --no-scripts --no-progress

# Configurar permissões
RUN chown -R www-data:www-data /var/www/html

# Expor a porta para o Laravel Artisan
EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
