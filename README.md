# Educational AI Chatbot - Frontend

Este é um projeto Angular para fornecer uma interface web acessível ao chatbot educacional inclusivo.

> **Projeto de TCC - Ciência da Computação (UNISINOS)**
> **Aluno:** Rodrigo Silveira dos Santos
> **Orientador:** Prof. Dr. Mateus Raeder

## Estrutura de Diretórios

```plaintext
educational-ai-chatbot-frontend/
│
├── src/
│   ├── app/
│   │   ├── core/          # Serviços e componentes globais (Auth, API Service)
│   │   ├── features/      # Módulos e componentes específicos (Chat, Onboarding)
│   │   ├── shared/        # Componentes, diretivas e pipes compartilhados
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   ├── app.routes.ts
│   ├── assets/            # Arquivos estáticos (imagens, fontes, configs VLibras)
│   ├── environments/      # Configurações de ambiente
│   ├── index.html
│   ├── main.ts
│   ├── styles.scss        # Estilos globais e temas de alto contraste
├── angular.json           # Configurações do Angular CLI
├── package.json           # Dependências e scripts do npm
├── tsconfig.json          # Configurações do TypeScript
└── ...
```

## Descrição dos Diretórios

- **src/**: Diretório principal do código-fonte.
  - **app/**: Contém a aplicação Angular.
    - **core/**: Serviços e componentes que são usados em toda a aplicação (ex: serviços de autenticação, guardas de rota).
    - **features/**: Módulos e componentes específicos de funcionalidades (ex: módulo de usuário, módulo de produtos).
    - **shared/**: Componentes, diretivas, pipes e models que são compartilhados entre diferentes partes da aplicação.
  - **assets/**: Arquivos estáticos como imagens e fontes.
  - **environments/**: Configurações específicas para diferentes ambientes (ex: desenvolvimento, produção).
  - **styles.scss**: Arquivo de estilos globais.

## Tecnologias Utilizadas

* **Angular:** Framework front-end para desenvolvimento web.
* **TypeScript:** Linguagem de tipagem estática para JavaScript.
* **Angular Material:** Biblioteca de componentes visuais do Material Design para Angular.
* **RxJS:** Biblioteca para programação reativa.
* **Web Speech API:** Para reconhecimento de voz (Speech-to-Text) e síntese de fala (Text-to-Speech).
* **VLibras:** Integração para tradução automática em Libras.
* **Karma:** Framework de testes unitários.
* **Sass:** Pré-processador CSS.

## Boas Práticas

1. **Modularização**: Divida a aplicação em módulos para facilitar a manutenção e a escalabilidade.
2. **Componentização**: Crie componentes reutilizáveis e mantenha-os pequenos e focados em uma única responsabilidade.
3. **Serviços**: Use serviços para lógica de negócios e comunicação com APIs.
4. **Roteamento**: Configure o roteamento de forma clara e organizada.
5. **Reutilização**: Antes de criar novas funcionalidades globais, certifique-se de que elas ainda não foram criadas, como botões, diretivas, diálogos, snack-bars, pipes, etc.
6. **Acessibilidade**: É desejável que as regras de acessibilidade sejam aplicadas em toda a interface do projeto.
7. **Testes**: Tudo que for desenvolvido deve ter 100% de cobertura de testes.

# Como Executar o Projeto

## Pré-requisitos
Certifique-se de ter as seguintes ferramentas instaladas:
- Node.js (versão 22.20.0)
- npm (versão 11.6.1)
- Ancular CLI (versão 20.3.3)


### Instalando e executando a aplicação

1. **Instalar Dependências**:
```shell
npm install
```
2. **Executar com as configurações de Desenvolvimento**:
```shell
npm run start:dev # para ambiente de desenvolvimento local
```

