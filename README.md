# ETA Industrial JBS - Dourados-MS

Aplicação web interativa desenvolvida para representar visualmente uma planta industrial de tratamento de água em um painel supervisório moderno.

O projeto foi criado como uma experiência visual focada em clareza, interação e apresentação profissional, com o diagrama como elemento principal da interface.

## Objetivo

- Transformar um diagrama técnico em uma experiência digital interativa.
- Representar equipamentos, conexões, estados e fluxo visualmente.
- Criar uma interface adequada para apresentação e demonstração.
- Manter a aplicação leve, estática e preparada para hospedagem em plataformas como Netlify.

## Stack

- HTML5
- CSS3
- JavaScript ES6+
- SVG
- DOM APIs
- `requestAnimationFrame`
- Módulos JavaScript nativos

Não foram utilizados frameworks ou bibliotecas externas. A aplicação funciona como um projeto estático, sem backend e sem dependências de build.

## Arquitetura

A estrutura foi organizada por responsabilidade:

### `index.html`

Estrutura base da página, viewport do diagrama e controle principal da experiência.

### `css/style.css`

Sistema visual da aplicação, incluindo:

- identidade visual industrial;
- fundo escuro;
- cores teal e cyan;
- estados visuais de equipamentos;
- tubulações e partículas;
- responsividade da área de visualização;
- estados do botão de interação.

### `js/diagram-data.js`

Modelo central da aplicação, contendo:

- equipamentos;
- áreas visuais;
- conexões;
- rotas SVG;
- estados da simulação;
- informações de referência;
- validação interna do grafo.

### `js/flow-animation.js`

Motor responsável por:

- renderizar o diagrama;
- controlar a máquina de estados;
- criar e movimentar partículas;
- atualizar equipamentos e tubulações;
- controlar a progressão manual;
- evitar duplicação de animações;
- preservar os estados concluídos.

### `js/main.js`

Camada de integração da interface, responsável por:

- inicializar a aplicação;
- conectar o botão de avanço;
- controlar zoom e pan;
- sincronizar o estado visual com a interação do usuário.

## Experiência de uso

A interface foi reduzida ao essencial:

- diagrama completo como protagonista;
- indicador discreto de etapa e status;
- botão `AVANÇAR` para controlar a progressão;
- animação visual contínua dentro de cada etapa;
- destaque dos equipamentos e das tubulações ativas;
- zoom por gesto de roda ou trackpad;
- pan por arraste.

O usuário controla o ritmo da apresentação. A aplicação não avança automaticamente entre etapas.

## Decisões técnicas

### Modelo orientado a dados

Equipamentos e conexões são definidos em uma fonte central de dados. O renderizador consulta esse modelo para criar o diagrama, evitando coordenadas e regras duplicadas em diferentes arquivos.

### Grafo dirigido

As conexões possuem origem, destino, rota visual e tipo de fluxo. Isso permite validar a estrutura e manter a animação alinhada ao modelo visual.

### Máquina de estados

A execução utiliza estados explícitos:

- `IDLE`
- `RUNNING`
- `WAITING`
- `COMPLETED`

A progressão é autorizada por uma única ação: `advanceSimulation()`.

### Animação com `requestAnimationFrame`

As partículas são atualizadas usando tempo decorrido entre frames. Isso mantém a movimentação fluida e evita múltiplos timers concorrentes.

### Validação interna

O modelo é validado antes da renderização para identificar IDs duplicados, conexões inválidas, rotas degeneradas e referências inconsistentes.

## Contribuição para meu aprendizado

Este projeto contribuiu para o desenvolvimento prático de conhecimentos em:

- modelagem de sistemas visuais orientados a dados;
- construção de grafos dirigidos;
- renderização dinâmica com SVG;
- animações baseadas em tempo real;
- máquinas de estados para interfaces interativas;
- separação de responsabilidades em aplicações front-end;
- manipulação avançada do DOM;
- responsividade e composição de diagramas complexos;
- validação de estruturas antes da execução;
- investigação e correção de problemas de interação;
- preparação de aplicações estáticas para deploy.

## Perfil da entrega

O resultado é uma aplicação:

- leve;
- modular;
- sem backend;
- sem dependências externas;
- compatível com hospedagem estática;
- preparada para publicação em plataformas como Netlify;
- adequada para demonstrações, apresentações e portfólio técnico.

## Observação

Os dados apresentados na interface são referências visuais e educacionais. A aplicação não está conectada a sensores, equipamentos ou sistemas operacionais reais.
