# dockdash
**Dockdash** - Prosta platforma do zarządzania i monitorowania infrastrutkury kontenerowej.

*Element projektowy pracy dyplomowej*

```text
Krzysztof Matuszewski
Informatyka, studia II st., rok 2, sem. 3
AHE 2024-2025
```

## Instalowanie
W przypadku, gdy pliki z kodem źródłowym platformy nie są skopiowane z płyty CD załączonej do elementu pisemengo pracy, pobrać należy je z repozytorium na platformie GitHub. Do uruchomienia obu aplikacji potrzebne jest zainstalowane środowisko uruchomieniowe Node.js w wersji 23.1.0, na której platforma była testowana. Pozostałe zależności powinny zostać zainstalowane automatycznie po wykonaniu odpowiednich, wymienionych później komend.

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

## Korzystanie z serwera API

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


## Notatki

- sprawdzanie dostępności pojedynczej instancji Dockera
- sprawdzanie dostępności wielu instancji Dockera
- kolorowe, opatrzone etykietami logi podzielone na typy wiadomości (info/debug/success/failure)
- mechanizm tworzenia logów z czasem zdarzenia - timestampt w przyjaznym formacie polskiej daty i czasu
- mechanizm tworzenia logów podatny na przyszłą rozbudowę posiadając nazwę obiektu wytwarzającego logi - obecnie domyslnie 'api-server' 
- ładowanie konfiguracji instancji Dockerowych z pliku JSON
- zapisywanie konfiguracji instancji Dockerowych do pliku JSON
- ładowanie konfiguracji serwera API z pliku JSON
- tryb debugowania możliwy do zmiany z poziomu pliku konfiguracyjnego
- tryb verbosity możliwy do zmiany z poziomu pliku konfiguracyjnego
- możliwość zmiany portu serwera API z poziomu pliku konfiguracyjnego
- dobre opisanie kodu źródłowego komentarzami
- kod źródłowy wraz z komentarzami w języku angielskim
- funkcje posiadające opisy w komentarzach zgodne z formatem JSDoc
- kod sformatowany przy użyciu Prettier (jako separator zostały użyte 3 spacje)
- ustawienia czasów - timeoutów poszczególnych działań jest możliwe osobno z poziomu pliku konfiguracyjnego
- API zgodne z zasadami REST API
- używanie Axiosa zamiast pakietu Request
- dodane ASCII art w postaci banera z logiem platofrmy Dockdash w serwerze API
