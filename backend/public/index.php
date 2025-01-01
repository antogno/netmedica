<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface;
use Slim\Exception\HttpNotFoundException;
use Slim\Factory\AppFactory;

require __DIR__ . '/../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

$app = AppFactory::create();

$error_middleware = $app->addErrorMiddleware(true, true, true);
$error_middleware->setErrorHandler(HttpNotFoundException::class, function (Request $request, Throwable $exception, bool $displayErrorDetails) {
  $response = new Slim\Psr7\Response();

  $response
    ->getBody()
    ->write(json_encode([
      'status' => 'error',
      'message' => 'Endpoint non trovato',
    ]));

  return $response
    ->withHeader('Content-Type', 'application/json')
    ->withStatus(404);
});

$app->add(function (Request $request, RequestHandlerInterface $handler) {
  $response = $handler->handle($request);

  return $response
    ->withHeader('Access-Control-Allow-Origin', $_ENV['CLIENT_BASE_URL'])
    ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
    ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});

$app->get('/api/progetti', function (Request $request, Response $response) {
  $params = $request->getQueryParams();

  $id_medico = $params['id_medico'] ?? null;
  $tipo_chiamata = $params['tipo_chiamata'] ?? null;

  $data = [];

  if (is_null($id_medico)) {
    $data['id_medico'] = 'Il parametro "id_medico" è obbligatorio';
  } else if (!ctype_digit($id_medico)) {
    $data['id_medico'] = 'Il parametro "id_medico" deve essere di tipo numerico';
  }

  if (is_null($tipo_chiamata) || empty(trim($tipo_chiamata))) {
    $data['tipo_chiamata'] = 'Il parametro "tipo_chiamata" è obbligatorio';
  }

  if (!empty($data)) {
    $response
      ->getBody()
      ->write(json_encode([
        'status' => 'fail',
        'data' => $data,
      ]));

    return $response
      ->withHeader('Content-Type', 'application/json')
      ->withStatus(400);
  }

  $data = [];

  try {
    $pdo = new PDO($_ENV['DB_URL'], $_ENV['DB_USER'], $_ENV['DB_PASSWORD'], [
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
      PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
  } catch (PDOException $e) {
    $response
      ->getBody()
      ->write(json_encode([
        'status' => 'error',
        'message' => 'Errore interno del server',
      ]));

    return $response
      ->withHeader('Content-Type', 'application/json')
      ->withStatus(500);
  }

  $data = $pdo->query('SELECT * FROM progetti')->fetchAll();

  $response
    ->getBody()
    ->write(json_encode([
      'status' => 'success',
      'data' => $data,
    ]));

  return $response
    ->withHeader('Content-Type', 'application/json')
    ->withStatus(200);
});

$app->run();
