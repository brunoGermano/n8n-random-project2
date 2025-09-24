# n8n Custom Node - Gerador de Números Aleatórios 🎲

Bem-vindo a este projeto de teste! O objetivo aqui é criar um conector (nó) personalizado para a fantástica plataforma de automação n8n.

## 🤔 Por que n8n?

No mundo do desenvolvimento, estamos constantemente conectando APIs, movendo dados e criando lógicas complexas. O n8n simplifica tudo isso transformando tarefas de código em fluxos de trabalho visuais e intuitivos. Para um desenvolvedor, isso significa menos tempo escrevendo código repetitivo de integração e mais tempo focando em soluções de alto nível. Automatizar e integrar se torna fácil, rápido e até divertido! 🚀

Este projeto demonstra como estender o poder do n8n, criando uma nova ferramenta para a sua "caixa de ferramentas" de automação: um nó que busca números verdadeiramente aleatórios da API Random.org.

## Tecnologias Utilizadas 🚀

Para rodar este projeto, você precisará ter familiaridade e instalar as seguintes ferramentas:

* [n8n](https://n8n.io/): A plataforma de automação de fluxo de trabalho.

* [Docker & Docker Compose](https://www.docker.com/): Para criar e orquestrar nossos contêineres de forma consistente.

* [Node.js (v22 LTS)](https://nodejs.org/en): O ambiente de execução para o n8n e nosso nó customizado.

* [TypeScript](https://www.typescriptlang.org/): Para um código mais limpo, seguro e manutenível.

* [PostgreSQL](https://www.postgresql.org/): Nosso banco de dados para o n8n, mais robusto que o padrão.

## Pré-requisitos 📋

Antes de começar, garanta que você tenha os seguintes softwares instalados na sua máquina:

1. **Git**: Para clonar o repositório.

2. **Docker e Docker Compose:** [Siga o guia oficial de instalação do Docker.](https://docs.docker.com/engine/install/ubuntu/) <!-- Substitua pelo seu link -->

3. **NVM (Node Version Manager):** Recomendado para gerenciar as versões do Node.js.
    Bash
   
        # Instalar o NVM
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
        # Após instalar, feche e reabra o terminal

5. **Node.js v22 LTS:**
    Bash
    
        # Instalar e usar a versão 22
        nvm install 22
        nvm use 22

## Como Rodar o Projeto 🏎️

Siga estes passos para configurar e executar o ambiente completo na sua máquina local.

1. **Clone o Repositório**

Primeiro, clone este repositório para a sua máquina.
Bash

    git clone https://github.com/seu-usuario/seu-repositorio.git
    cd seu-repositorio

2. **Configure as Variáveis de Ambiente**

O n8n precisa de credenciais para se conectar ao banco de dados PostgreSQL. Nós gerenciamos isso através de um arquivo .env.
Bash

    # Crie uma cópia do arquivo de exemplo
    cp .env.example .env

O arquivo .env já vem com valores padrão que funcionam localmente, mas sinta-se à vontade para alterá-los se desejar.

(**Observação:** O arquivo .env está listado no .gitignore para garantir que segredos nunca sejam enviados para o repositório).

3. **Instale as Dependências do Nó**

Navegue até a pasta do nosso conector customizado e instale as dependências usando o npm.
Bash

    cd custom-nodes/n8n-nodes-random
    npm install

4. **Compile o Nó Customizado**

Com as dependências instaladas, compile o código TypeScript para JavaScript, que é o que o n8n irá executar.
Bash
    
    npm run build
    # Volte para a pasta raiz do projeto
    cd ../../

5. **Suba os Serviços com Docker Compose**

Agora, vamos iniciar o n8n e o banco de dados PostgreSQL!
Bash

    docker compose up -d

### 🐧 Dica para usuários Linux: Se você encontrar erros de permissão ao iniciar o Docker, pode ser necessário ajustar o dono da pasta de dados do n8n. Execute o comando abaixo na raiz do projeto:
    
    sudo chown -R 1000:1000 n8n-data

## Como Testar o Nó ✅

Após iniciar os contêineres, o ambiente estará pronto em alguns instantes.

1. **Acesse o n8n** no seu navegador: http://localhost:5678.

2. **Configure sua conta de administrador** no primeiro acesso.

3. Clique em **"Add workflow"** para criar um novo fluxo de trabalho.

4. Clique no ícone + para adicionar um novo nó. Na barra de busca, digite **"Random"**.

5. Seu nó customizado deverá aparecer, com o ícone de dado! 🎉

6. Arraste-o para a área de trabalho, preencha os campos "Min" e "Max" e clique em **"Execute Node"** para ver a mágica acontecer.

## Informações Adicionais ✨

Aqui estão alguns comandos úteis do Docker para gerenciar o ambiente:

* **Ver os logs do n8n em tempo real:**
    Bash
    
        docker compose logs -f n8n

* **Parar todos os serviços:**
    Bash
    
        docker compose down

* **Parar e remover os volumes (reset completo):**
    Bash
    
        docker compose down -v

Este README.md cobre todos os pontos necessários e serve como um excelente guia para qualquer pessoa que queira executar e avaliar este projeto.

