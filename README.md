# Documentação do Projeto "Aprenda Grafos!"

## Diagrama de Classes do Domínio do Problema

classes: Grafo, LeGrafos, AlgoritmoGrafo

```javascript
classDiagram
    class Grafo {
        +List<Vertice> vertices
        +List<Aresta> arestas
        +adicionarVertice(Vertice v)
        +adicionarAresta(Aresta a)
        +removerVertice(Vertice v)
        +removerAresta(Aresta a)
        +toJSON(): String
    }

    class Vertice {
        +String id
        +String label
        +double x
        +double y
        +List<Aresta> arestasIncidentes
    }

    class Aresta {
        +Vertice origem
        +Vertice destino
        +double peso
        +boolean direcionada
    }

    class AlgoritmoGrafo {
        +String nome
        +String descricao
        +executar(Grafo g): List<PassoExecucao>
    }

    class PassoExecucao {
        +int numeroPasso
        +String descricao
        +EstadoGrafo estadoGrafo
    }

    class EstadoGrafo {
        +Map<String, String> estadoVertices
        +Map<String, String> estadoArestas
    }

    class Usuario {
        +String id
        +String nome
        +List<Grafo> grafosSalvos
    }

    Grafo "1" -- "*" Vertice : contém
    Grafo "1" -- "*" Aresta : conecta
    Vertice "1" -- "*" Aresta : conecta
    AlgoritmoGrafo "1" -- "*" PassoExecucao : gera
    Usuario "1" -- "*" Grafo : salva
```

### Explicação do Diagrama de Classes

- `Grafo`: Representa a estrutura principal, contendo vértices e arestas. Possui métodos para manipulação do grafo e para serialização em JSON.
- `Vertice`: Representa um nó no grafo, com um ID único, um rótulo e coordenadas para posicionamento visual.
- `Aresta`: Representa uma conexão entre dois vértices, podendo ter um peso e ser direcionada ou não.
- `AlgoritmoGrafo`: Classe abstrata ou interface que define a estrutura para os algoritmos de grafos a serem implementados (ex: Busca em Largura, Dijkstra).
- `PassoExecucao`: Representa um único passo na execução animada de um algoritmo, contendo uma descrição textual e o estado visual do grafo naquele momento.
- `EstadoGrafo`: Captura o estado dos vértices e arestas (cores, realces, etc.) em um determinado passo da execução do algoritmo.
- `Usuario`: Representa o usuário da aplicação, que pode salvar seus próprios grafos.

## Tecnologias e Ferramentas Escolhidas

### Front-end

- **HTML, CSS, JavaScript**: Base para a construção da interface web.
- **React**: Framework JavaScript para facilitar a criação e componentização do front-end, permitindo alta interatividade na criação e animação dos grafos.

### Back-end

- **Python**: Linguagem de programação escolhida para a lógica de algoritmos de grafos e manipulação de arquivos JSON.
- **Flask**: Micro-framework web Python para a construção do back-end, facilitando a integração com o front-end.
- **NetworkX**: Biblioteca Python para criação, manipulação e estudo de grafos e seus algoritmos, aproveitando a vasta gama de ferramentas disponíveis em Python para este domínio.

### Ferramentas de Desenvolvimento

- **Controle de Versão**: Git
- **Build** 
  - **Front-end**: NPM 
  - **Back-end**: Poetry
- **Testes**
  - **Front-end**: Jest (para testes unitários de JavaScript/React).
  - **Back-end**: Pytest (para testes unitários e de integração em Python).
- **Issue Tracking**: GitHub Issues
- **CI/CD**: GitHub Actions
- **Containerização**: Docker

### Frameworks Reutilizados

- **React**: Para o desenvolvimento do front-end.
- **Flask**: Para o desenvolvimento do back-end.

## Como Gerar a Documentação do Código

### Front-end (JavaScript/React)

Para gerar a documentação do código JavaScript e React, utilizaremos o **JSDoc**.

1. **Instalação do JSDoc**:

    ```console
    npm install -g jsdoc
    ```

1. **Adicionar comentários JSDoc**: Certifique-se de que seu código JavaScript e React está devidamente comentado seguindo o padrão JSDoc. Exemplo:

    ```javascript
    /**
    * @ngdoc controller
    * @name app.controller:GraphController
    * @description
    * Controlador responsável pela criação e manipulação de grafos.
    * @param {Object} GraphService Serviço para operações de grafo.
    */
    function GraphController(GraphService) {
        // ...
    }
    ```

1. **Gerar a documentação**: No diretório raiz do seu projeto front-end, execute:

    ```javascript
    jsdoc -c jsdoc.json
    ```

    (Você pode precisar criar um arquivo `jsdoc.json` para configurar as opções de saída e os diretórios de origem).

### Back-end (Python)

Para gerar a documentação do código Python, utilizaremos o **Sphinx** com o **Napoleon** (para suportar docstrings no estilo Google ou NumPy).

1. **Instalação do Sphinx e Napoleon**:

    ```console
    pip install sphinx sphinx-rtd-theme sphinxcontrib-napoleon
    ```

1. **Configurar o Sphinx**: No diretório raiz do seu projeto back-end, execute:

    ```console
    sphinx-quickstart
    ```

    Siga as instruções, certificando-se de habilitar as extensões `sphinx.ext.autodoc` e `sphinx.ext.napoleon` no seu `conf.py`.

1. **Adicionar docstrings**: Comente seu código Python utilizando docstrings no estilo Google. Exemplo:

    ```python
    def dijkstra(graph, start_node):
        """
        Executa o algoritmo de Dijkstra para encontrar os caminhos mais curtos.

        Args:
            graph (Grafo): O grafo sobre o qual o algoritmo será executado.
            start_node (Vertice): O vértice inicial.

        Returns:
            dict: Um dicionário contendo as distâncias mais curtas para cada vértice.
        """
        # ...
    ```

1. **Gerar a documentação**: No diretório `docs`, execute:

    ```console
    make html
    ```

    A documentação HTML será gerada no diretório `_build/html`.

## Como Executar o Sistema

Para executar o sistema, siga os passos abaixo:

### Pré-requisitos

- Node.js e npm (para o front-end)
- Python 3.x (Poetry será usado para gerenciar as dependências)
- Docker e Docker Compose (opcional, para execução containerizada)

### 1. Configuração do Back-end (Python/Flask)

  1. **Clone o repositório do projeto**:

      ```console
      git clone <URL_DO_SEU_REPOSITORIO>
      cd AprendaGrafos/backend
      ```

  2. **Instale o Poetry**:

      ```console
      pip install poetry
      ```

  3. **Instale as dependências do Python com Poetry**:
      O Poetry criará e ativará automaticamente um ambiente virtual para o projeto e instalará as dependências definidas no pyproject.toml.

      ```console
      poetry install
      ```

  4. **Ative o ambiente virtual do Poetry (opcional, se precisar executar comandos diretamente no ambiente)**:

      ```console
      poetry env activate
      ```

      Em seguida, execute o comando retornado.

  5. **Execute o servidor Flask**:

      ```console
      poetry run flask run
      ```

      O servidor estará disponível em <http://127.0.0.1:5000> por padrão.

### 2. Configuração do Front-end (HTML/CSS/JavaScript/React)

1. **Navegue até o diretório do front-end**:

    ```console
    cd ../frontend
    ```

1. **Instale as dependências do Node.js**:

    ```console
    npm install
    ```

1. **Inicie o servidor de desenvolvimento (se aplicável)**:
    Se você estiver usando um servidor de desenvolvimento para React (ex: http-server):

    ```console
    npm start
    ```

    Caso contrário, você pode abrir o arquivo `index.html` diretamente no seu navegador, mas para requisições AJAX ao back-end, um servidor HTTP é recomendado para evitar problemas de CORS.

### 3. Execução com Docker

Para uma execução mais simplificada e consistente, você pode usar Docker e Docker Compose.

1. **Certifique-se de ter o Docker e Docker Compose instalados.**
1. **Navegue até o diretório raiz do projeto (onde o `docker-compose.yml` estará)**.
1. **Construa as imagens e inicie os contêineres**:

    ```console
    docker-compose up --build
    ```

    Isso construirá as imagens Docker para o front-end e back-end e iniciará os serviços.
1. **Acesse a aplicação**: A aplicação estará acessível em `http://localhost:<SUA_PORTA_DO_FRONTEND>` (verifique a porta configurada no seu `docker-compose.yml`, geralmente 80 ou 8080).

### Observações

- Certifique-se de que os diretórios `backend` e `frontend` existam na estrutura do seu projeto.
- A comunicação entre o front-end e o back-end deve ser configurada para apontar para os respectivos endereços (ex: o front-end deve fazer requisições para <http://127.0.0.1:5000> se o back-end estiver rodando localmente, ou para o nome do serviço Docker se estiver usando Docker Compose).
- Para o ambiente de produção, considere configurar um servidor web como Nginx ou Apache para servir os arquivos estáticos do front-end e atuar como proxy reverso para o back-end.
