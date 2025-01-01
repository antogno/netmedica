FROM php:8.2-apache

RUN apt-get update && apt-get install -y \
  git \
	&& docker-php-ext-install pdo pdo_mysql

COPY --from=composer:2.8.4 /usr/bin/composer /usr/bin/composer

COPY apache.conf /etc/apache2/sites-available/000-default.conf

RUN a2enmod rewrite \
  && a2enmod actions

WORKDIR /var/www/html
