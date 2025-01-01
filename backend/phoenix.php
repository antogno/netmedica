<?php

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

return [
  'migration_dirs' => [
    'default' => __DIR__ . '/migrations',
  ],
  'environments' => [
    'local' => [
      'adapter' => 'mysql',
      'host' => 'netmedica-db',
      'port' => 3306,
      'username' => $_ENV['DB_USER'],
      'password' => $_ENV['DB_PASSWORD'],
      'db_name' => $_ENV['DB_NAME'],
      'charset' => 'utf8mb4',
      'collation' => 'utf8mb4_0900_ai_ci',
    ],
  ],
  'default_environment' => 'local',
  'log_table_name' => 'phoenix_log',
];
