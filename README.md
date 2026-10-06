# Da Silva Distribuidora - Landing Page

Landing page estática feita em HTML, CSS e JavaScript, pronta para GitHub + Vercel.

## Arquivos

- `index.html` - estrutura da página
- `styles.css` - identidade visual e responsividade
- `script.js` - WhatsApp, menu mobile e animações

## O que trocar depois

### 1. WhatsApp
Abra `script.js` e substitua:

```js
const WHATSAPP_NUMBER = "SEU_NUMERO_AQUI";
```

por um número no formato DDI + DDD + telefone, somente números.

### 2. Imagens
Os blocos com textos como `foto a inserir` foram deixados propositalmente como placeholders.
Quando você enviar as fotos reais, eles podem ser trocados por tags `<img>` ou por imagens de fundo.

### 3. Localização e contato
Procure no `index.html` pelos textos entre colchetes, como:

- `[ADICIONAR ENDEREÇO]`
- `[ADICIONAR CIDADE / UF]`
- `[ADICIONAR HORÁRIO DE ATENDIMENTO]`
- `[ADICIONAR NÚMERO]`

### 4. Depoimentos
Os depoimentos atuais estão marcados como exemplos. Substitua por avaliações reais quando tiver autorização para publicá-las.

## Publicação na Vercel

1. Crie um repositório no GitHub.
2. Envie estes arquivos para o repositório.
3. Entre na Vercel.
4. Importe o repositório.
5. Como é um site estático, não é necessário configurar framework.
6. Publique.
