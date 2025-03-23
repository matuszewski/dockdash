# dockdash
**Dockdash** - Prosta platforma do zarządzania i monitorowania infrastrutkury kontenerowej.

*Element projektowy pracy dyplomowej*

```text
Krzysztof Matuszewski
Informatyka, studia II st., rok 2, sem. 3
AHE 2024-2025
```

### Instalowanie
W przypadku, gdy pliki z kodem źródłowym platformy nie są skopiowane z płyty CD załączonej do elementu pisemengo pracy, pobrać należy je z repozytorium na platformie GitHub i o ile

```bash
git clone git@github.com:matuszewski/dockdash.git
  cd dockdash/
```

W przypadku braku certyfikatów SSL i działania platformy z protokołem HTTP (domyślnie) przed uruchomieniem będzie trzeba wykonać taką komendę, która pozwoli na korzystanie z niezabezpieczeonej wersji połączenia.
```bash
export NODE_OPTIONS=--openssl-legacy-provider
```

### Uruchamianie serwera API
```bash
cd dockdash/api-server/
  npm install
  npm run
```

### Uruchamianie aplikacji webowej
```bash
cd dockdash/web-server/
  npm install
  npm run
```

## Używanie

### Serwer API

Pobranie listy instancji Dockera dostępnych na serwerze API

```bash
curl 127.0.0.1:4000/api/instances | jq
```

Pobieranie listy z danymi obrazów dostępnych na konkretnej instancjo Dockera z serwera API

```bash
curl 127.0.0.1:4000/api/<instance>/images | jq
```

Pobieranie listy z danymi kontenerów dostępnych na konkretnej instancjo Dockera z serwera API

```bash
curl 127.0.0.1:4000/api/<instance>/containers | jq
```

Pobieranie listy zasobów dostępnych dla konkretnej instancji Dockera z serwera API

```bash
curl 127.0.0.1:4000/api/<instance>/resources | jq
```


**Uwaga!** Pakiet _jq_ jest używany do poprawnego formatowania otrzymanej odpowiedzi i wyświetlania jej w terminalu w przyjazny sposób


## Funkcjonalności

- checking single instance availabilty
- checking multi instance availabilty
- colored and labeled API server logging divied to types of messages (info/debug/success/failure)
- logging with timestamp in 24h time format and friendly PL date format
- logging with place for future improvements as it contains as well logging entity name, currently set to 'api-server'
- loading instances configuration from JSON file
- saving instances configuration in JSON file
- loading api-server configuration from JSON file
- debug mode, and being able to change it from the config file
- verbosity mode, and being able to change it from the config file
- whole code in english language
- whole code with many comments
- functions commented in JSDoc format
- whole code formatted using Prettier (3 spaces as separator + all default and most up to date coding rules applied)
- timeouts settings picked individualy for each docker api action to take, taken from settings JSON config file
- API created in REST type
- using Axios as a new, secure and better alternative to popular Request module using in REST API
- printing ASCII art banner with dockdash logo

## Znane problemy
W przypadku napotania problemu nie opisanego w pracy bądź w tym pliku README.md można skontaktować się na adres krzysiekmatuszewski@outlook.com


## Zależności

Zarówno w przypadku elementu api-server jak i web-server, korzystają one z plików package.json, które powinny prawidłowo określać zależności i po uruchomieniu komendy do instalowania ich nie generować dodatkowych problemów.
```bash
npm install
```
Jednakże, w razie potrzeby ręcznego instalowania paczek, wystarczy zwykle doinstalować brakujące jak np. dla web-servera:
```bash
cd web-server/
  npm install @mui/material @emotion/react @emotion/styled
  npm install @mui/icons-material
  npm install react-copy-to-clipboard
  npm install recharts
  npm install <inne moduły>
```


## Przydatne komendy Docker API

Pobieranie danych na temat kontenerów dostępnych na danej instancji Docker

```bash
curl -X GET http://127.0.0.1:2375/v1.41/containers/json | jq
```

Pobieranie danych na temat obrazów dostępnych na danej instancji Docker
```bash
curl -X GET http://127.0.0.1:2375/v1.41/images/json | jq
```

Pobieranie informacji na temat instancji Docker

```bash
curl -X GET http://127.0.0.1:2375/v1.41/info | jq
# jq is optional (only for pretty-printing JSON formatted data)
```

**Uwaga!** W przypadku korzystania z Docker Desktop na systemie macOS, poniższa komenda umożliwi zestawienie połączenia TCP na porcie 2375 w celu wykonywania komend przy użyciu Docker API z zewnątrz systemu.

```bash
docker run -d \
  --name docker-api-proxy \
  -p 2375:2375 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  alpine/socat \
  TCP-LISTEN:2375,fork UNIX-CONNECT:/var/run/docker.sock
```

Gdy kontener został zatrzymany, uruchamiamy go normalnie:

```bash
docker start docker-api-proxy
```

Oraz możemy sprawdzić czy zadziałało i port 2375 jest otwarty:

```bash
curl http://localhost:2375/version
```

Przykładowe polecenia do uruchamiania testowych kontenerów

```bash
docker run -it -d --name test-alpine-2 alpine:3.21.3
docker run -it -d --name test-alpine-3 alpine:3.21.3
docker run -it -d --name test-node-2 node:current
```
