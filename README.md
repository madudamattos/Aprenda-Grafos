# Documentação do Projeto "Aprenda Grafos!"

## Diagrama de Classes do Domínio do Problema



### Explicação do Diagrama de Classes

O diagrama está dividido em duas arquiteturas principais: Backend, onde a lógica dos algoritmos é processada, e Frontend, onde a visualização e a interação com o usuário ocorrem.

#### Backend

- `Algorithm (Abstrata)`: Define a estrutura base para todos os algoritmos. Ela gerencia o estado da execução (`currentStep`), o grafo original e o grafo no estado atual (`originalGraph`, `currentGraph`). O método `nextStep()` é implementado por suas subclasses para avançar a lógica do algoritmo.
- `AlgorithmDijkstra`, `AlgorithmBFS`, etc.: São as implementações concretas que herdam da classe `Algorithm`. Cada uma contém a lógica específica para seu respectivo algoritmo (Dijkstra, Busca em Largura, etc.).
- `GraphJSONUtil`: Classe utilitária que serializa o estado do grafo para o formato JSON (`toJSON`) e o desserializa de volta para um objeto grafo (`fromJSON`), facilitando a comunicação com o Frontend.
- `networkx.Graph`: Uma biblioteca externa que fornece a estrutura de dados do grafo utilizada pelos algoritmos no Backend.

#### Frontend

- `Node`: Representa um nó (vértice) na interface gráfica. Possui atributos como `id`, coordenadas (`x`, `y`) e `color`.
- `Edge`: Representa uma aresta que conecta dois objetos `Node` (`source` e `target`). Contém um `id`, um peso (`weight`) e uma cor para a sua exibição.
- `Graph`: Classe que age como um contêiner, agrupando e gerenciando todos os Nodes e Edges que compõem o grafo a ser renderizado na tela.
- `Algorithm` (Abstrata): A contraparte do Backend no Frontend. É responsável por controlar a animação do algoritmo e fornecer o código fonte através do método `getText()`.
- `AlgorithmDijkstra`, `AlgorithmBFS`, etc.: Implementações que herdam da classe `Algorithm` do Frontend. Elas definem como o estado visual do grafo é atualizado a cada passo (`nextStep()`) e o código que deve ser exibido.

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
  - **Front-end**: npm
  - **Back-end**: Poetry 
- **Testes**
  - **Front-end**: Jest (para testes unitários de JavaScript).
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

Para executar o sistema "Aprenda Grafos!", siga os passos abaixo:

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

1. **Inicie o servidor de desenvolvimento**:
    Se você estiver usando um servidor de desenvolvimento para React (ex: http-server):

    ```console
    npm start
    ```

    Caso contrário, você pode abrir o arquivo `index.html` diretamente no seu navegador, mas para requisições AJAX ao back-end, um servidor HTTP é recomendado para evitar problemas de CORS.

### 3. Execução com Docker (Recomendado para Produção/Desenvolvimento Simplificado)

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
