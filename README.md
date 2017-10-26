![Itelios](http://www.itelios.com.br/images/logo_itelios_orange@2x.png)

# Itelios Frontend Challenge

Bem-vindo ao desafio de admissão de front-end da Itelios! O que preparamos para este desafio é um pedacinho do que você irá fazer aqui na Itelios, caso seja admitido.

O objetivo do desafio é simples: Consumir uma json via xhttp e, com o resultado dele, montar um widget de prateleira de cross-sell. Na resposta deste request você receberá uma lista de produtos. Esta lista servirá para montar um pequeno carrossel de produtos. 

## Design

- A prateleira apresentada deve seguir o [seguinte design](desafio-front-end-itelios.jpg)
- Baseado neste layout, faça uma adaptação responsiva para celulares.

## Como realizar o teste

- Faça um fork deste repositório em seu GitHub
- Adicione ao Readme uma descrição de como executar seu projeto
- Descreva as funcionalidades do seu desafio, venda seu peixe! Por exemplo, se fez a prateleira com javascript puro, porém utilizou uma biblioteca para o carrossel, deixe isso no Readme. Se usou ES6 com um transpiler, conte isso pra gente. 
- Não há um limite de tempo, porém consideramos ideal não gastar mais que 8h neste desafio
- Faça commits parciais, para que possamos acompanhar o seu desenvolvimento.
- Em caso de dúvidas, entre em contato com flora.braz@itelios.com

## Dicas
 
- O ícone do botão é o add-shopping-plus, do Material Design. https://material.io/icons/
- A fontes utilizadas são Roboto Condensed Bold (títulos), Roboto Regular (texto corrido) e Roboto Bold (preço e preço parcelado). 
- We **<3** Vanilla Javascript. Tente executar este teste usando javascript puro. Só utilize bibliotecas como último recurso.
- We **<3** CSS responsivo, organizado, modular e feito com pré-processadores. Sinta-se livre para usar a arquitetura CSS que achar mais adequada. 
- Trabalhamos com clientes perfeccionistas, portanto tenha atenção com espaçamentos, tamanhos e estilos de fonte. 

## Critérios de avaliação

- Alcançar os objetivos propostos
- Qualidade de código
- Commits parciais, mostrando a linha de desenvolvimento
- Boa descrição das funcionalidades do desafio
- Não utilização de bibliotecas ou frameworks
- Fidelidade ao design proposto
- Adaptação mobile

## Como executar o projeto

Baixe o projeto na máquina:
```
git clone https://github.com/bysanches/itelios-frontend-challenge.git
```

Em seguida, instale as dependências e rode o build:
```
cd itelios-frontend-challenge
npm install
npm run build
```

Para rodar o projeto, pode ser utilizado o http-server do node:
```
npm install -g http-server
http-server
```

Navegue até a página em `localhost:8080`.

## Sobre o desenvolvimento

Desenvolvi a prateleira utilizando o babel para poder utilizar o es6 no desenvolvimento, sem nenhuma biblioteca javascript para a construção do carrossel.
Utilizei no grid o flexbox do css3, e me inspirei no estilo e marcação utilizado pelo bootstrap.
Para a adaptação mobile, utilizei media-queries e javascript para adaptar o flexbox e jogar as sugestões para baixo, e limitar o número de itens exibidos para 1 no caso de telas pequenas. Dessa forma a informação fica mais legível para o usuário.
A aplicação foi testada no Chrome, Firefox e Edge.

## Próximos passos

Para continuar o desenvolvimento, organizaria o componente do carrossel para garantir a reusabilidade e adicionaria testes.
Também reveria a forma como é feita a interação com o DOM, para garantir a performance da página.