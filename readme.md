# Stafe Gateway

O Stafe Gateway é um API Gateway construído utilizando o KrakenD, uma solução de alta performance para gerenciamento de APIs.

## Estrutura de Pastas

A estrutura do projeto é organizada da seguinte forma:

```
authorization-token/
├── krakend/                   # Pasta principal com configurações do KrakenD
│   ├── partials/              # Componentes reutilizáveis de configuração
│   │   ├── extra-config/      # Configurações extras para endpoints
│   │   ├── input-headers/     # Configurações de cabeçalhos de entrada
│   │   └── services/          # Definições de serviços e backends
│   ├── settings/              # Configurações gerais do gateway
│   │   └── routes/            # Definições de rotas
│   │       ├── example/       # Exemplos de rotas
│   │       └── public/        # Rotas públicas (sem autenticação)
│   └── templates/             # Templates para geração de configs
├── compose.yml                # Configuração do Docker Compose
├── krakend-config.example.json # Exemplo da configuração completa
└── readme.md                  # Este arquivo de documentação
```

## Sobre o KrakenD

KrakenD é um API Gateway de alta performance que atua como middleware entre clientes (frontend) e os serviços de backend (microserviços). Principais características:

- Alto desempenho: Processamento de milhares de requisições por segundo
- Sem estado (stateless): Fácil de escalar horizontalmente
- Agregação de APIs: Combina múltiplos endpoints de backend em uma única resposta
- Filtragem de conteúdo: Remove campos desnecessários das respostas
- Autenticação e autorização integradas

## Configuração do KrakenD

### Pasta `krakend/`

A pasta principal contém todas as configurações necessárias para o funcionamento do gateway:

#### Partials

Contém componentes reutilizáveis que podem ser incluídos nas configurações principais:

- **extra-config/**: Configurações extras para endpoints, incluindo rate limiting, circuit breaker, cache, etc.
- **input-headers/**: Define quais cabeçalhos de requisição serão passados para os serviços de backend
- **services/**: Definições de backends e serviços que o gateway se comunica

#### Settings

Configurações gerais do gateway:

- **routes/**: Definições de endpoints expostos pelo gateway
  - **example/**: Endpoints de exemplo para referência
  - **public/**: Endpoints públicos que não exigem autenticação

#### Templates

Templates utilizados para geração de configurações dinâmicas.

### Arquivo `krakend-config.example.json`

Este arquivo serve como exemplo da configuração completa do KrakenD. Ele contém:

- Definições de porta e versão
- Endpoints expostos pelo gateway
- Configuração de backends para cada endpoint
- Configurações extra como autenticação, manipulação de cabeçalhos, etc.

### Arquivo `compose.yml`

Configura o ambiente Docker para execução do gateway e serviços relacionados.

## Como Usar

1. Clone este repositório
2. Crie sua configuração baseada no arquivo de exemplo
3. Execute o gateway com Docker Compose:

```bash
docker-compose up -d
```

## Fluxo de Autenticação

O gateway implementa um fluxo de autorização por token onde:

1. As requisições chegam com um token de autorização
2. O gateway valida o token com o serviço de autenticação
3. Se válido, a requisição é encaminhada para o serviço apropriado
4. O gateway agrega as respostas e retorna ao cliente

## Desenvolvimento

Para adicionar novos endpoints ou serviços:

1. Crie as definições na pasta `krakend/settings/routes/`
2. Adicione quaisquer configurações extras em `partials/`
3. Atualize o arquivo de configuração principal
4. Reinicie o gateway

Obs: Sempre será gerado um arquivo de rotas chamado `[seu-contexto]_generated.json`, que conterá suas rotas e deverá ser importado
dentro do arquivo de `krakend.tmpl`.

## Como criar um novo endpoint

Para criar um novo endpoint no Stafe Gateway, siga os passos abaixo:

1. **Definir o tipo de rota**:
   - **Rota pública**: Crie o arquivo dentro de `krakend/settings/routes/public/[contexto]/nome-da-rota.json`
   - **Rota privada**: Crie o arquivo dentro da raiz de routes em `krakend/settings/routes/[contexto]/nome-da-rota.json`

2. **Para rotas privadas**:
   - É necessário gerar um novo template em `krakend/templates/[contexto].tmpl`
   - O template deve seguir a estrutura do arquivo `example.tmpl`
   - Exemplo de estrutura do template:
   ```
   {{ range $idx, $endpoint := .[contexto]_generated.routes  }}
     {{ if $idx }},{{ end }}
     {
       "endpoint": "{{$endpoint.endpoint}}",
       "method": "{{$endpoint.method}}",
       {{ include "input-headers/auth.tmpl"}},
       "extra_config": {
         {{ include "extra-config/proxy.tmpl" }}
       },
       "backend": [
         {{ include "services/auth-service.tmpl" }},
         {{ range $idx, $backend := $endpoint.backend }}
           {{ if $idx }},{{ end }}
           {
             "url_pattern": "{{$backend.url_pattern}}",
             "method": "{{$backend.method}}",
             "host": ["{{$backend.host}}"],
             "encoding": "{{$backend.encoding}}",
             "extra_config": {
               {{ include "extra-config/modifier-authorization-token.tmpl" }}
             }
           }
         {{ end }}
       ]
     }
   {{ end }}
   ```

3. **Configurar o arquivo JSON da rota**:
   - Defina o endpoint, método HTTP e backends necessários
   - Inclua quaisquer configurações extras específicas para este endpoint

4. **Atualizar a configuração principal**:
   - Após criar o arquivo de rota e template (se necessário), atualize a configuração principal para incluir o novo endpoint
   - Reinicie o gateway para aplicar as mudanças

5. **Importar o novo template**:
   - Para que o novo template seja processado, é necessário importá-lo no arquivo `krakend/krakend.tmpl`
   - Adicione a linha `{{ template "[contexto].tmpl" . }}` na seção de endpoints, seguindo o padrão dos templates existentes
   - Exemplo de como o arquivo `krakend.tmpl` deve ficar após a adição:
   ```
   {
       "$schema": "https://www.krakend.io/schema/v3.json",
       "version": 3,
       "name": "Stafebank - API Gateway",
       "port": 9000,
       "timeout": "30s",
       "cache_ttl": "300s",
      "endpoints": [
         {{ template "example.tmpl" . }}
         {{ template "public.tmpl" . }}
         {{ template "[contexto].tmpl" . }}
      ]
   }
   ```

