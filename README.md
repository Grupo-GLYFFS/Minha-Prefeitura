# Minha Prefeitura

**Acesse o app:** https://grupo-glyffs.github.io/Minha-Prefeitura/

**Vídeo do pitch:** https://vimeo.com/1248553385

[![Assistir ao pitch do Minha Prefeitura](public/img/thumb-pitch.jpg)](https://vimeo.com/1248553385)

## O problema

Quem precisa da prefeitura liga, espera e quase nunca sabe o que aconteceu depois. Não sabe a qual secretaria recorrer e não consegue acompanhar o pedido. Muita reclamação fica em grupo de WhatsApp e nunca chega à prefeitura. E quase nenhuma prefeitura deixa o morador participar pela internet.

Só 27% das prefeituras do Brasil deixaram o cidadão votar pela internet no último ano. Só 14% têm um fórum de discussão online, e só 24% têm um aplicativo próprio.
Fonte: [TIC Governo 2025, Cetic.br](https://cetic.br/pt/pesquisa/governo/indicadores/) ([E4A](https://cetic.br/pt/tics/governo/2025/prefeituras/E4A/) e [C6B](https://cetic.br/pt/tics/governo/2025/prefeituras/C6B/)).

O Brasil tem 5.570 municípios, e quase metade deles (44,8%) tem até 10 mil habitantes ([IBGE, Censo 2022](https://censo2022.ibge.gov.br/)). É nesses lugares que a falta de participação digital pesa mais.

## ODS que o app atende

- **ODS 11, Cidades e comunidades sustentáveis (o principal):** pedidos, obras, orçamento e votações abertos para quem mora na cidade.
- **ODS 10, Redução das desigualdades:** a cidade pequena com o mesmo atendimento digital da capital, em linguagem simples e com recursos de acessibilidade.
- **ODS 9, Indústria, inovação e infraestrutura:** tecnologia para cuidar da rua e atender melhor, sem fila e sem telefone.

## Como abrir o app

- **Pela internet (mais fácil):** abra https://grupo-glyffs.github.io/Minha-Prefeitura/ no navegador do computador ou do celular.
- **Pelo arquivo da entrega:** descompacte o .zip e dê dois cliques no `index.html` da pasta. Ele abre direto no navegador (Chrome, Edge ou Firefox), sem instalar nada. Precisa de internet só para as fontes, os ícones e a busca do CEP.
- **Para entrar na conta de exemplo:** clique em Entrar. O e-mail e a senha da Maria já vêm preenchidos.

Os pedidos, votos e contas que você cria ficam guardados só no seu navegador.

## O que dá para fazer no app

**Serviços da prefeitura**
- Encontrar 66 serviços, separados em 12 assuntos (saúde, educação, zeladoria, impostos e outros), com busca.
- Ver a ficha de cada serviço: o que é, quem pode usar, documentos, prazo e onde ir.
- Pedir alguns serviços pelo próprio app e receber um protocolo.
- Acompanhar, remarcar e cancelar o que pediu em Minhas solicitações.

**Pedidos de melhoria na rua**
- Avisar um problema da rua, como buraco, poste apagado, lixo ou árvore. O app sugere a categoria e estima a gravidade pelo que a pessoa escreveu.
- Digitar o CEP e ver a rua aparecer sozinha.
- Anexar foto, revisar e enviar, recebendo o protocolo na hora.
- Se já existe um pedido igual na mesma rua, o app oferece apoiar esse em vez de criar outro.
- Apoiar e seguir pedidos de vizinhos. Quanto mais apoios, mais prioridade.
- Acompanhar cada etapa: enviado, em análise, aprovado, em execução e concluído.
- Cancelar o próprio pedido e avaliar o serviço quando ele termina.

**Minha cidade e Meu bairro**
- Ver alertas da Defesa Civil, avisos da prefeitura, pedidos, obras e votações da cidade toda ou só do seu bairro.
- Ver qualquer bairro ou subprefeitura da cidade (32 subprefeituras e 96 distritos).
- Acompanhar as obras, com quanto já foi feito e a data de término.
- Votar nos projetos da cidade e do bairro e ver o resultado na hora.
- Ver o orçamento: de onde vem o dinheiro e para onde vai.

**Conta**
- Entrar com e-mail e senha. Na demonstração, os dados da Maria já vêm preenchidos; é só clicar em Entrar.
- Criar uma conta com nome, e-mail, senha e o endereço, escolhido numa lista. O endereço define o seu bairro no app.
- Perfil, meus pedidos, meus votos, o que você segue, notificações e configurações (canais de aviso e faixas de alerta).

**Acessibilidade**
- Aumentar e diminuir a letra e ligar o alto contraste, sempre à mão no topo da tela.
- Funciona no celular e no computador.

## Como cada critério foi atendido

- **Página inicial com o problema:** a Apresentação mostra o cidadão, o problema, os dados da TIC Governo 2025 com o link da fonte, a solução e os ODS (`src/paginas/Apresentacao.jsx` e `src/componentes/gs/`).
- **Navegação:** as páginas Apresentação, Como funciona, Impacto e Equipe, além de todas as telas do app, usam o mesmo menu e o mesmo rodapé (`src/componentes/Pagina.jsx`), com HTML semântico: `header`, `nav`, `main`, `section`, `article` e `footer`.
- **Simulação interativa:** os 35 pedidos de `src/dados/pedidos.js` aparecem nas listas, com filtros, busca, apoios, prioridade e etapas que mudam com o que a pessoa faz. Há outros arrays com mais de 10 itens: 66 serviços, 96 bairros, 32 subprefeituras, 12 obras e 16 notificações.
- **Formulário com validação:** Criar conta, Entrar, Abrir pedido e Solicitar serviço validam cada campo em JavaScript. Os erros aparecem embaixo do campo e num resumo no topo, e a confirmação aparece na própria página. Não há `alert()`.
- **Responsividade:** cada componente tem o seu CSS, com media queries e layouts em flexbox e grid. No celular, o app ganha uma barra de abas embaixo.
- **Acessibilidade:** link "Pular para o conteúdo", foco visível, `label` em todos os campos, `alt` nas imagens, navegação completa pelo teclado, contraste alto e a barra de acessibilidade.
- **Código e README:** pastas organizadas (ver abaixo), sem CSS inline, e este README.

## Estrutura de pastas

O projeto usa React, que organiza os arquivos por componente. A correspondência com as pastas pedidas é:

- **css:** `src/estilos/global.css` e um arquivo `.module.css` ao lado de cada componente.
- **js:** a pasta `src/` inteira (páginas, componentes, dados e regras).
- **img:** `public/img/`.

```
public/img/        imagens (avisos, obras, votações, pedidos, equipe, mapas)
src/
  paginas/         uma página por arquivo
  componentes/     partes reutilizadas, separadas por área
  dados/           dados de exemplo, um array por arquivo
  logica/          regras: prioridade, pedidos repetidos, validação, CEP
  contexto/        o que é compartilhado entre telas: conta, pedidos, votos
  estilos/         CSS geral
```

## Tecnologias

- React, Vite e React Router
- Mantine e CSS Modules
- react-hook-form e yup, para os formulários
- ViaCEP, para buscar a rua pelo CEP
- Material Symbols e Google Fonts (Plus Jakarta Sans)
- localStorage, para guardar a conta, os pedidos e as preferências no navegador

## Links

- App: https://grupo-glyffs.github.io/Minha-Prefeitura/
- Vídeo do pitch: https://vimeo.com/1248553385
- Repositório: https://github.com/Grupo-GLYFFS/Minha-Prefeitura

## Integrantes

- Fabricio Cardoso Nicoli, RM571627
- Felipe Santos, RM574050
- Leonardo de Lima Dias, RM569286
- Samuel Almeida Santos, RM572554
- Gabriel de Lucca Chiapetta Santana, RM573610

## Uso de IA

Usamos IA generativa para gerar textos, imagens e vozes do projeto: Claude (textos), ChatGPT (imagens) e ElevenLabs (vozes do vídeo). Todo o resultado foi revisado pelo grupo.
