# NetMedica

<p>
	<a href="https://github.com/antogno/netmedica/blob/master/LICENSE"><img src="https://img.shields.io/github/license/antogno/netmedica" alt="License"></a>
	<a href="https://github.com/antogno/netmedica/commits"><img src="https://img.shields.io/github/last-commit/antogno/netmedica" alt="Last commit"></a>
	<a href="https://github.com/antogno/netmedica/releases/latest"><img src="https://img.shields.io/github/v/tag/antogno/netmedica?label=last%20release" alt="Last release"></a>
</p>

Simple web application made in PHP and React.

---

## Table of contents

- [What is NetMedica?](#what-is-netmedica)
- [Usage](#usage)
- [License](#license)

## What is NetMedica?

NetMedica is a simple web application made in PHP and React. More specifically, NetMedica was created using the following tools and technologies:

- Back-end:
  - PHP with [Slim Framework][1];
  - [Phoenix][2].
- Front-end:
  - [Vite][3] in TypeScript and React;
  - [Chakra UI][4].

## Usage

### Pre-requisites

- VS Code with the [Dev Containers][5] extension;
- Docker.

### Setup

#### Back-end

Copy the `.env.example` file in the root of the project, name it `.env` and change the values accordingly.

```console
$ cp backend/.env.example backend/.env
```

Then, open the folder in VS Code:

```console
$ code backend
```

Use the [command palette][6] shortcut (usually `Ctrl + Shift + P`) and start typing _container_. You should see a _Reopen in Container_ command: press `Enter`. Once done, open the container terminal (usually `Ctrl + J`), and run the following commands:

```console
$ composer install
```

```console
$ vendor/bin/phoenix init
```

```console
$ vendor/bin/phoenix migrate
```

The back-end is now accessible at [localhost:8080](http://localhost:8080).

#### Front-end

Copy the `.env.example` file in the root of the project, name it `.env` and change the values accordingly.

```console
$ cp frontend/.env.example frontend/.env
```

Then, open the folder in VS Code:

```console
$ code frontend
```

Open the folder in the container, as written above, then:

```console
$ npm i
```

### Run

Make sure the back-end containers are running and then run the following command from the front-end folder opened inside the container in VS Code:

```
$ npm run dev
```

The front-end is now accessible at [localhost:5173](http://localhost:5173).

## License

NetMedica is licensed under the terms of the [Creative Commons Zero v1.0 Universal license](https://github.com/antogno/netmedica/blob/master/LICENSE).

For more information, see the [Creative Commons website](https://creativecommons.org/publicdomain/zero/1.0).

[1]: https://www.slimframework.com/
[2]: https://github.com/lulco/phoenix
[3]: https://vite.dev/
[4]: https://chakra-ui.com/
[5]: https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers
[6]: https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette
