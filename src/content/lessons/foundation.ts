export type LessonSection = {
  id: string
  title: { en: string; pt: string }
  content: { en: string; pt: string }
  type: 'content' | 'interactive'
  interactiveType?: 'compound-calculator'
}

export type QuizQuestion = {
  id: string
  question: { en: string; pt: string }
  options: {
    id: string
    text: { en: string; pt: string }
    isCorrect: boolean
  }[]
  explanation: { en: string; pt: string }
}

export type Lesson = {
  id: string
  slug: string
  title: { en: string; pt: string }
  description: { en: string; pt: string }
  estimatedMinutes: number
  xpReward: number
  currencyReward: number
  prerequisites: string[]
  sections: LessonSection[]
  quiz: QuizQuestion[]
}

export const foundationLessons: Lesson[] = [
  {
    id: 'lesson-1',
    slug: 'why-financial-literacy-matters',
    title: {
      en: 'Why Financial Literacy Matters',
      pt: 'Por Que a Educação Financeira Importa',
    },
    description: {
      en: 'Discover why understanding money is one of the most important life skills you can develop.',
      pt: 'Descubra por que entender sobre dinheiro é uma das habilidades mais importantes que você pode desenvolver.',
    },
    estimatedMinutes: 8,
    xpReward: 100,
    currencyReward: 50,
    prerequisites: [],
    sections: [
      {
        id: 'section-1-1',
        title: {
          en: 'The Hidden Curriculum',
          pt: 'O Currículo Oculto',
        },
        content: {
          en: `# 📚 The Hidden Curriculum

Think about everything you learned in school: math, science, history, languages.

:::stat 🤔
How much did you learn about money?
:::

For most people, the answer is **"almost nothing."**

Yet money touches **every aspect** of our lives:

- 🏠 Where we live
- 🍎 What we eat  
- ❤️ Our health and wellbeing
- 👨‍👩‍👧‍👦 Our relationships
- 🌟 Our freedom to pursue our dreams

:::keypoint
**Financial literacy** is the ability to understand and effectively use various financial skills, including personal financial management, budgeting, and investing.
:::

> "The lack of money is the root of all evil." — Mark Twain

:::tip
This isn't about becoming rich. It's about having **control over your life** and making informed decisions about your future.
:::`,
          pt: `# 📚 O Currículo Oculto

Pense em tudo que você aprendeu na escola: matemática, ciências, história, línguas.

:::stat 🤔
Quanto você aprendeu sobre dinheiro?
:::

Para a maioria das pessoas, a resposta é **"quase nada."**

Mas o dinheiro afeta **todos os aspectos** de nossas vidas:

- 🏠 Onde moramos
- 🍎 O que comemos
- ❤️ Nossa saúde e bem-estar
- 👨‍👩‍👧‍👦 Nossos relacionamentos
- 🌟 Nossa liberdade para perseguir nossos sonhos

:::keypoint
**Educação financeira** é a capacidade de entender e usar efetivamente várias habilidades financeiras, incluindo gestão financeira pessoal, orçamento e investimentos.
:::

> "A falta de dinheiro é a raiz de todo mal." — Mark Twain

:::tip
Isso não é sobre ficar rico. É sobre ter **controle sobre sua vida** e tomar decisões informadas sobre seu futuro.
:::`,
        },
        type: 'content',
      },
      {
        id: 'section-1-2',
        title: {
          en: 'The Real Cost',
          pt: 'O Custo Real',
        },
        content: {
          en: `# 💸 The Real Cost of Not Knowing

Not understanding money doesn't just mean missing opportunities—it can cost you **significantly**.

## Real Mistakes People Make

| Mistake | Potential Cost |
|---------|---------------|
| 💳 High-interest credit card debt | Thousands in interest |
| ⏰ Not starting retirement savings early | Hundreds of thousands lost |
| 🏠 Buying too much house | Years of financial stress |
| 🆘 No emergency fund | Debt for unexpected expenses |

:::warning
A **$5,000** credit card balance at 20% APR, paying only minimums, takes **21 years** to pay off and costs over **$9,000 in interest alone**!
:::

## The Compound Effect

Small financial mistakes **compound over time** into big problems.

:::example
**Bad:** Skip $5 coffee savings daily
After 30 years at 7% return = **$178,000** lost opportunity!
:::

:::keypoint
But here's the good news: **small smart decisions compound too.** That's what we're here to learn!
:::`,
          pt: `# 💸 O Custo Real de Não Saber

Não entender sobre dinheiro não significa apenas perder oportunidades—pode custar **muito caro**.

## Erros Reais que as Pessoas Cometem

| Erro | Custo Potencial |
|------|-----------------|
| 💳 Dívida de cartão com juros altos | Milhares em juros |
| ⏰ Não começar a poupar cedo | Centenas de milhares perdidos |
| 🏠 Comprar casa muito cara | Anos de estresse financeiro |
| 🆘 Sem fundo de emergência | Dívidas por gastos inesperados |

:::warning
Uma dívida de **R$5.000** no cartão a 15% ao mês pode **dobrar em poucos meses** se você pagar apenas o mínimo!
:::

## O Efeito Composto

Pequenos erros financeiros **se acumulam com o tempo** em grandes problemas.

:::example
**Ruim:** Pular economia de R$10 diários
Após 30 anos a 7% = **R$356.000** de oportunidade perdida!
:::

:::keypoint
Mas aqui está a boa notícia: **pequenas decisões inteligentes também se acumulam.** É isso que vamos aprender!
:::`,
        },
        type: 'content',
      },
      {
        id: 'section-1-3',
        title: {
          en: 'Your Journey Starts Now',
          pt: 'Sua Jornada Começa Agora',
        },
        content: {
          en: `# 🚀 Your Financial Journey Starts Now

## What You'll Learn

:::checklist
📊 Budgeting and tracking expenses
💰 Building an emergency fund
📈 Understanding compound interest
🎯 Investing basics
💼 Entrepreneur mindset
:::

## The 3 Golden Rules

1. **Spend less than you earn** — The foundation of all wealth

2. **Make your money work for you** — Through investing and compound growth

3. **Protect what you have** — Emergency funds and smart planning

:::stat 🎉
You've already taken the first step!
:::

:::expandable Why most people fail at finances
Most people fail because they:
- Never learned the basics
- Think it's too complicated
- Wait for "the right time" (which never comes)
- Try to do everything at once

**You're different.** You're here, learning, one step at a time.
:::

:::keypoint
You've already taken the first step by being here. Let's keep going! The journey of a thousand miles begins with a single step.
:::`,
          pt: `# 🚀 Sua Jornada Financeira Começa Agora

## O Que Você Vai Aprender

:::checklist
📊 Orçamento e controle de gastos
💰 Construir um fundo de emergência
📈 Entender juros compostos
🎯 Básico de investimentos
💼 Mentalidade empreendedora
:::

## As 3 Regras de Ouro

1. **Gaste menos do que ganha** — A base de toda riqueza

2. **Faça seu dinheiro trabalhar para você** — Através de investimentos e crescimento composto

3. **Proteja o que você tem** — Fundos de emergência e planejamento inteligente

:::stat 🎉
Você já deu o primeiro passo!
:::

:::expandable Por que a maioria falha em finanças
A maioria das pessoas falha porque:
- Nunca aprendeu o básico
- Acha que é muito complicado
- Espera "o momento certo" (que nunca chega)
- Tenta fazer tudo de uma vez

**Você é diferente.** Você está aqui, aprendendo, um passo de cada vez.
:::

:::keypoint
Você já deu o primeiro passo ao estar aqui. Vamos continuar! A jornada de mil milhas começa com um único passo.
:::`,
        },
        type: 'content',
      },
    ],
    quiz: [
      {
        id: 'q1-1',
        question: {
          en: 'What is financial literacy?',
          pt: 'O que é educação financeira?',
        },
        options: [
          { id: 'a', text: { en: 'The ability to read financial news', pt: 'A capacidade de ler notícias financeiras' }, isCorrect: false },
          { id: 'b', text: { en: 'The ability to understand and use financial skills effectively', pt: 'A capacidade de entender e usar habilidades financeiras efetivamente' }, isCorrect: true },
          { id: 'c', text: { en: 'Having a lot of money', pt: 'Ter muito dinheiro' }, isCorrect: false },
          { id: 'd', text: { en: 'Working in a bank', pt: 'Trabalhar em um banco' }, isCorrect: false },
        ],
        explanation: {
          en: 'Financial literacy is about understanding and effectively using financial skills like budgeting, saving, and investing.',
          pt: 'Educação financeira é sobre entender e usar efetivamente habilidades financeiras como orçamento, poupança e investimentos.',
        },
      },
      {
        id: 'q1-2',
        question: {
          en: 'What is the first golden rule of financial success?',
          pt: 'Qual é a primeira regra de ouro do sucesso financeiro?',
        },
        options: [
          { id: 'a', text: { en: 'Invest in stocks', pt: 'Investir em ações' }, isCorrect: false },
          { id: 'b', text: { en: 'Get a high-paying job', pt: 'Conseguir um emprego bem pago' }, isCorrect: false },
          { id: 'c', text: { en: 'Spend less than you earn', pt: 'Gastar menos do que ganha' }, isCorrect: true },
          { id: 'd', text: { en: 'Start a business', pt: 'Começar um negócio' }, isCorrect: false },
        ],
        explanation: {
          en: 'Spending less than you earn is the foundation of all wealth building. Without this, no amount of income will lead to financial security.',
          pt: 'Gastar menos do que ganha é a base de toda construção de riqueza. Sem isso, nenhuma quantidade de renda levará à segurança financeira.',
        },
      },
      {
        id: 'q1-3',
        question: {
          en: 'Why do small financial mistakes matter?',
          pt: 'Por que pequenos erros financeiros importam?',
        },
        options: [
          { id: 'a', text: { en: 'They don\'t really matter', pt: 'Eles realmente não importam' }, isCorrect: false },
          { id: 'b', text: { en: 'They compound over time into big problems', pt: 'Eles se acumulam em grandes problemas com o tempo' }, isCorrect: true },
          { id: 'c', text: { en: 'Banks will fix them for you', pt: 'Os bancos vão corrigi-los para você' }, isCorrect: false },
          { id: 'd', text: { en: 'Only large mistakes matter', pt: 'Apenas grandes erros importam' }, isCorrect: false },
        ],
        explanation: {
          en: 'Small mistakes compound over time, turning minor issues into major problems. But the good news is that small smart decisions also compound!',
          pt: 'Pequenos erros se acumulam com o tempo, transformando problemas menores em grandes problemas. Mas a boa notícia é que pequenas decisões inteligentes também se acumulam!',
        },
      },
    ],
  },
  {
    id: 'lesson-2',
    slug: 'understanding-income-vs-expenses',
    title: {
      en: 'Understanding Income vs Expenses',
      pt: 'Entendendo Receitas vs Despesas',
    },
    description: {
      en: 'Learn the fundamental concept that determines your financial health: the relationship between what you earn and what you spend.',
      pt: 'Aprenda o conceito fundamental que determina sua saúde financeira: a relação entre o que você ganha e o que você gasta.',
    },
    estimatedMinutes: 10,
    xpReward: 100,
    currencyReward: 50,
    prerequisites: ['lesson-1'],
    sections: [
      {
        id: 'section-2-1',
        title: {
          en: 'The Money Equation',
          pt: 'A Equação do Dinheiro',
        },
        content: {
          en: `# ⚖️ The Money Equation

Your entire financial life comes down to **one simple equation**:

:::stat Income − Expenses = ?
Your Financial Future
:::

## What Does Your Number Say?

- ✅ **Positive number** = You're building wealth
- ⚠️ **Zero** = You're breaking even (dangerous!)
- ❌ **Negative number** = You're going into debt

:::warning
This seems obvious, but **most people don't actually know their numbers!** Let's change that.
:::

## Types of Income 💵

| Type | Description | Examples |
|------|-------------|----------|
| 💼 **Active Income** | Money earned by working | Salary, wages, freelance |
| 🌱 **Passive Income** | Money earned without active work | Dividends, rental income |
| 📈 **Portfolio Income** | Money from selling investments | Stock gains, property sales |

:::tip
Most people start with only active income. Our goal is to build **all three types** over time!
:::`,
          pt: `# ⚖️ A Equação do Dinheiro

Toda sua vida financeira se resume a **uma equação simples**:

:::stat Receita − Despesas = ?
Seu Futuro Financeiro
:::

## O Que Seu Número Diz?

- ✅ **Número positivo** = Você está construindo riqueza
- ⚠️ **Zero** = Você está empatando (perigoso!)
- ❌ **Número negativo** = Você está entrando em dívida

:::warning
Isso parece óbvio, mas **a maioria das pessoas não sabe seus números!** Vamos mudar isso.
:::

## Tipos de Receita 💵

| Tipo | Descrição | Exemplos |
|------|-----------|----------|
| 💼 **Renda Ativa** | Dinheiro ganho trabalhando | Salário, freelance |
| 🌱 **Renda Passiva** | Dinheiro ganho sem trabalho ativo | Dividendos, aluguel |
| 📈 **Renda de Portfólio** | Dinheiro da venda de investimentos | Ganhos de ações |

:::tip
A maioria começa apenas com renda ativa. Nosso objetivo é construir **todos os três tipos** ao longo do tempo!
:::`,
        },
        type: 'content',
      },
      {
        id: 'section-2-2',
        title: {
          en: 'Fixed vs Variable',
          pt: 'Fixas vs Variáveis',
        },
        content: {
          en: `# 📊 Fixed vs Variable Expenses

Understanding your expenses is **crucial**. They fall into two categories:

## Fixed Expenses 🏠

Costs that **stay the same** each month:

:::checklist
Rent or Mortgage
Car payment
Insurance premiums
Subscriptions (Netflix, Spotify, gym)
Loan payments
:::

## Variable Expenses 🛒

Costs that **change** month to month:

:::checklist
Groceries
Utilities (electricity, water)
Entertainment
Dining out
Shopping
Gas/Transportation
:::

:::keypoint
## The Power of Cutting Fixed Costs 💪

Cutting a fixed expense is **more powerful** than cutting variable expenses because it saves money **automatically every month** without willpower!
:::

:::example
**Quick Wins to Save $1,000+/year:**
- Cancel 1 unused subscription = $120/year
- Negotiate insurance = $300/year
- Switch phone plan = $240/year
- Refinance a loan = $600/year
:::`,
          pt: `# 📊 Despesas Fixas vs Variáveis

Entender suas despesas é **crucial**. Elas se dividem em duas categorias:

## Despesas Fixas 🏠

Custos que **permanecem iguais** todo mês:

:::checklist
Aluguel ou Financiamento
Parcela do carro
Seguros
Assinaturas (Netflix, Spotify, academia)
Parcelas de empréstimos
:::

## Despesas Variáveis 🛒

Custos que **mudam** de mês para mês:

:::checklist
Supermercado
Utilidades (luz, água)
Entretenimento
Restaurantes
Compras
Combustível/Transporte
:::

:::keypoint
## O Poder de Cortar Custos Fixos 💪

Cortar uma despesa fixa é **mais poderoso** do que cortar despesas variáveis porque economiza dinheiro **automaticamente todo mês** sem esforço!
:::

:::example
**Vitórias Rápidas para Economizar R$2.000+/ano:**
- Cancelar 1 assinatura não usada = R$300/ano
- Negociar seguros = R$600/ano
- Trocar plano de celular = R$480/ano
- Renegociar um empréstimo = R$1.200/ano
:::`,
        },
        type: 'content',
      },
      {
        id: 'section-2-3',
        title: {
          en: 'Track Your Numbers',
          pt: 'Rastreie Seus Números',
        },
        content: {
          en: `# 🔍 Track Your Numbers

:::keypoint
**You can't improve what you don't measure!**
:::

## Step-by-Step Guide

1. **Calculate Your Income** 💵
   Add up all money coming in each month (after taxes)

2. **List Fixed Expenses** 🏠
   Everything that's the same every month

3. **Track Variable Expenses** 🛒
   Review last 3 months of bank statements

4. **Find The Gap** 🎯
   Income - All Expenses = Your Number

:::example
**Sample Calculation:**
\`\`\`
Monthly Income:      $4,000
- Fixed Expenses:    $2,000
- Variable Expenses: $1,500
─────────────────────────
= Monthly Savings:     $500
\`\`\`
:::

## Common Money Leaks 💧

Watch out for these sneaky expenses:

- 🎵 Unused subscriptions you forgot about
- ☕ Daily coffee runs ($5/day = $150/month!)
- 📱 Excessive phone plan
- 🏦 Bank fees
- 💸 Impulse purchases

:::tip
**Your homework:** Calculate your own numbers before the next lesson! Use your bank app or statements from the last 3 months.
:::

:::expandable Free Tools to Track Expenses
- **Apps:** Mint, YNAB, Personal Capital, Mobills
- **Simple:** Google Sheets or Excel
- **Old School:** Pen and paper works too!

The best tool is the one you'll actually use consistently.
:::`,
          pt: `# 🔍 Rastreie Seus Números

:::keypoint
**Você não pode melhorar o que não mede!**
:::

## Guia Passo a Passo

1. **Calcule Sua Receita** 💵
   Some todo dinheiro que entra cada mês (líquido)

2. **Liste Despesas Fixas** 🏠
   Tudo que é igual todo mês

3. **Rastreie Despesas Variáveis** 🛒
   Revise os últimos 3 meses de extratos

4. **Encontre a Diferença** 🎯
   Receita - Todas Despesas = Seu Número

:::example
**Cálculo Exemplo:**
\`\`\`
Receita Mensal:        R$5.000
- Despesas Fixas:      R$2.500
- Despesas Variáveis:  R$1.800
───────────────────────────────
= Poupança Mensal:       R$700
\`\`\`
:::

## Vazamentos Comuns de Dinheiro 💧

Fique atento a essas despesas sorrateiras:

- 🎵 Assinaturas esquecidas que não usa
- ☕ Café diário na rua (R$10/dia = R$300/mês!)
- 📱 Plano de celular excessivo
- 🏦 Taxas bancárias
- 💸 Compras por impulso

:::tip
**Sua tarefa:** Calcule seus próprios números antes da próxima lição! Use seu app do banco ou extratos dos últimos 3 meses.
:::

:::expandable Ferramentas Gratuitas para Rastrear Gastos
- **Apps:** Mobills, Organizze, GuiaBolso
- **Simples:** Google Planilhas ou Excel
- **Tradicional:** Papel e caneta também funciona!

A melhor ferramenta é aquela que você vai usar consistentemente.
:::`,
        },
        type: 'content',
      },
    ],
    quiz: [
      {
        id: 'q2-1',
        question: {
          en: 'What happens when your expenses are greater than your income?',
          pt: 'O que acontece quando suas despesas são maiores que sua receita?',
        },
        options: [
          { id: 'a', text: { en: 'You build wealth', pt: 'Você constrói riqueza' }, isCorrect: false },
          { id: 'b', text: { en: 'You break even', pt: 'Você empata' }, isCorrect: false },
          { id: 'c', text: { en: 'You go into debt', pt: 'Você entra em dívida' }, isCorrect: true },
          { id: 'd', text: { en: 'Nothing happens', pt: 'Nada acontece' }, isCorrect: false },
        ],
        explanation: {
          en: 'When expenses exceed income, you must borrow money or use savings, leading to debt.',
          pt: 'Quando as despesas excedem a receita, você deve pegar dinheiro emprestado ou usar economias, levando a dívidas.',
        },
      },
      {
        id: 'q2-2',
        question: {
          en: 'Which type of expense is your rent or mortgage?',
          pt: 'Que tipo de despesa é seu aluguel ou financiamento?',
        },
        options: [
          { id: 'a', text: { en: 'Variable expense', pt: 'Despesa variável' }, isCorrect: false },
          { id: 'b', text: { en: 'Fixed expense', pt: 'Despesa fixa' }, isCorrect: true },
          { id: 'c', text: { en: 'Passive income', pt: 'Renda passiva' }, isCorrect: false },
          { id: 'd', text: { en: 'Portfolio income', pt: 'Renda de portfólio' }, isCorrect: false },
        ],
        explanation: {
          en: 'Rent or mortgage payments are fixed expenses because they stay the same each month.',
          pt: 'Pagamentos de aluguel ou financiamento são despesas fixas porque permanecem os mesmos todo mês.',
        },
      },
      {
        id: 'q2-3',
        question: {
          en: 'Why is cutting fixed expenses more powerful than cutting variable expenses?',
          pt: 'Por que cortar despesas fixas é mais poderoso do que cortar despesas variáveis?',
        },
        options: [
          { id: 'a', text: { en: 'Fixed expenses are always larger', pt: 'Despesas fixas são sempre maiores' }, isCorrect: false },
          { id: 'b', text: { en: 'It saves money automatically every month without willpower', pt: 'Economiza dinheiro automaticamente todo mês sem esforço' }, isCorrect: true },
          { id: 'c', text: { en: 'Variable expenses can\'t be cut', pt: 'Despesas variáveis não podem ser cortadas' }, isCorrect: false },
          { id: 'd', text: { en: 'Banks prefer it', pt: 'Os bancos preferem' }, isCorrect: false },
        ],
        explanation: {
          en: 'Once you eliminate a fixed expense, the savings happen automatically every month without needing willpower or daily decisions.',
          pt: 'Uma vez que você elimina uma despesa fixa, a economia acontece automaticamente todo mês sem precisar de força de vontade ou decisões diárias.',
        },
      },
    ],
  },
  {
    id: 'lesson-3',
    slug: 'building-your-first-budget',
    title: {
      en: 'Building Your First Budget',
      pt: 'Construindo Seu Primeiro Orçamento',
    },
    description: {
      en: 'Create a practical budget that actually works using the proven 50/30/20 method.',
      pt: 'Crie um orçamento prático que realmente funciona usando o método comprovado 50/30/20.',
    },
    estimatedMinutes: 12,
    xpReward: 120,
    currencyReward: 60,
    prerequisites: ['lesson-2'],
    sections: [
      {
        id: 'section-3-1',
        title: {
          en: 'Why Budgets Fail',
          pt: 'Por Que Orçamentos Falham',
        },
        content: {
          en: `# 😤 Why Most Budgets Fail

Before we build your budget, let's understand **why most people give up:**

## The 4 Budget Killers

### 1. Too Restrictive 🔒
:::example
"I'll never eat out again!" 
→ Lasts 2 weeks → Then you binge → Guilt → Give up
:::

### 2. Too Complicated 📊
:::example
Tracking 47 different categories 
→ Takes hours → Overwhelm → Abandonment
:::

### 3. No Fun Money 😢
:::example
All work, no play 
→ Feel deprived → Resentment → Rebellion
:::

### 4. Set It and Forget It 📅
:::example
Made a budget once 
→ Life changed → Budget became irrelevant
:::

---

## What Actually Works ✅

:::keypoint
A good budget is:

- ✅ **Simple** — Easy to follow
- ✅ **Flexible** — Adapts to life
- ✅ **Realistic** — Includes fun money
- ✅ **Reviewed** — Updated monthly
:::

:::tip
The best budget is one you'll **actually stick to**, not the most detailed one!
:::`,
          pt: `# 😤 Por Que a Maioria dos Orçamentos Falha

Antes de construir seu orçamento, vamos entender **por que a maioria desiste:**

## Os 4 Assassinos de Orçamento

### 1. Muito Restritivo 🔒
:::example
"Nunca mais vou comer fora!" 
→ Dura 2 semanas → Depois você exagera → Culpa → Desiste
:::

### 2. Muito Complicado 📊
:::example
Rastrear 47 categorias diferentes 
→ Leva horas → Sobrecarga → Abandono
:::

### 3. Sem Dinheiro para Diversão 😢
:::example
Só trabalho, sem lazer 
→ Sensação de privação → Ressentimento → Rebelião
:::

### 4. Criar e Esquecer 📅
:::example
Fez orçamento uma vez 
→ Vida mudou → Orçamento ficou irrelevante
:::

---

## O Que Realmente Funciona ✅

:::keypoint
Um bom orçamento é:

- ✅ **Simples** — Fácil de seguir
- ✅ **Flexível** — Se adapta à vida
- ✅ **Realista** — Inclui dinheiro para diversão
- ✅ **Revisado** — Atualizado mensalmente
:::

:::tip
O melhor orçamento é aquele que você vai **realmente seguir**, não o mais detalhado!
:::`,
        },
        type: 'content',
      },
      {
        id: 'section-3-2',
        title: {
          en: 'The 50/30/20 Rule',
          pt: 'A Regra 50/30/20',
        },
        content: {
          en: `# 🎯 The 50/30/20 Rule

This simple framework makes budgeting **foolproof**:

:::stat 50% / 30% / 20%
Needs / Wants / Savings
:::

## The Breakdown

| Category | % | What's Included |
|----------|---|-----------------|
| 🏠 **Needs** | 50% | Housing, utilities, groceries, insurance, minimum debt payments |
| 🎉 **Wants** | 30% | Entertainment, dining out, hobbies, subscriptions, shopping |
| 💰 **Savings** | 20% | Emergency fund, retirement, investments, extra debt payments |

---

## Real Example: $4,000/month Income

### 🏠 Needs (50%) = $2,000
:::checklist
Rent: $1,200
Utilities: $150
Groceries: $400
Insurance: $150
Transportation: $100
:::

### 🎉 Wants (30%) = $1,200
:::checklist
Entertainment: $300
Dining out: $300
Subscriptions: $100
Shopping: $300
Hobbies: $200
:::

### 💰 Savings (20%) = $800
:::checklist
Emergency fund: $400
Retirement: $400
:::

:::tip
The 50/30/20 is a **starting point**, not a rigid rule! Adjust based on your situation.
:::

:::expandable When to Adjust the Percentages
- **High cost of living?** Needs might be 55-60%
- **Aggressive debt payoff?** Savings could be 30-40%
- **Low income?** Focus on needs first, build up over time
- **High income?** Push savings to 30%+
:::`,
          pt: `# 🎯 A Regra 50/30/20

Este framework simples torna o orçamento **à prova de falhas**:

:::stat 50% / 30% / 20%
Necessidades / Desejos / Poupança
:::

## A Divisão

| Categoria | % | O Que Inclui |
|-----------|---|--------------|
| 🏠 **Necessidades** | 50% | Moradia, utilidades, supermercado, seguro, pagamentos mínimos |
| 🎉 **Desejos** | 30% | Entretenimento, restaurantes, hobbies, assinaturas, compras |
| 💰 **Poupança** | 20% | Emergência, aposentadoria, investimentos, dívidas extras |

---

## Exemplo Real: R$5.000/mês de Renda

### 🏠 Necessidades (50%) = R$2.500
:::checklist
Aluguel: R$1.500
Utilidades: R$200
Supermercado: R$500
Seguro: R$150
Transporte: R$150
:::

### 🎉 Desejos (30%) = R$1.500
:::checklist
Entretenimento: R$400
Restaurantes: R$400
Assinaturas: R$100
Compras: R$400
Hobbies: R$200
:::

### 💰 Poupança (20%) = R$1.000
:::checklist
Fundo de emergência: R$500
Aposentadoria: R$500
:::

:::tip
O 50/30/20 é um **ponto de partida**, não uma regra rígida! Ajuste baseado na sua situação.
:::

:::expandable Quando Ajustar as Porcentagens
- **Alto custo de vida?** Necessidades podem ser 55-60%
- **Pagamento agressivo de dívidas?** Poupança pode ser 30-40%
- **Renda baixa?** Foque nas necessidades primeiro, construa com o tempo
- **Renda alta?** Empurre poupança para 30%+
:::`,
        },
        type: 'content',
      },
      {
        id: 'section-3-3',
        title: {
          en: 'Make It Work',
          pt: 'Faça Funcionar',
        },
        content: {
          en: `# ⚡ Make Your Budget Work

## The 4-Step Setup

1. **Calculate** your after-tax income
2. **Apply** the 50/30/20 split
3. **Compare** to your current spending
4. **Adjust** where needed

---

## The Envelope Method 💰

A powerful technique for variable expenses:

:::keypoint
1. Withdraw cash for each category
2. Put it in labeled envelopes
3. When empty, **stop spending** in that category
:::

:::tip
This makes spending **tangible and real**, unlike swiping a card where money feels imaginary!
:::

---

## Monthly Money Date 📅

Set a recurring "money date" each month:

:::checklist
Review last month's spending
Celebrate wins 🎉
Identify problem areas
Adjust next month's budget
Set one financial goal
:::

:::warning
**Don't skip this!** Life changes, and your budget should change with it.
:::

:::expandable Budget Apps to Try
**Free Options:**
- Mint - All-in-one tracking
- Personal Capital - Investment focus
- YNAB - Zero-based budgeting (free trial)
- Google Sheets - DIY approach

**Pro Tip:** The best app is one you'll check weekly!
:::`,
          pt: `# ⚡ Faça Seu Orçamento Funcionar

## A Configuração em 4 Passos

1. **Calcule** sua renda líquida
2. **Aplique** a divisão 50/30/20
3. **Compare** com seus gastos atuais
4. **Ajuste** onde necessário

---

## O Método dos Envelopes 💰

Uma técnica poderosa para despesas variáveis:

:::keypoint
1. Saque dinheiro para cada categoria
2. Coloque em envelopes etiquetados
3. Quando esvaziar, **pare de gastar** nessa categoria
:::

:::tip
Isso torna os gastos **tangíveis e reais**, diferente de passar o cartão onde o dinheiro parece imaginário!
:::

---

## Encontro Mensal com o Dinheiro 📅

Marque um "encontro com o dinheiro" todo mês:

:::checklist
Revise os gastos do mês passado
Celebre as vitórias 🎉
Identifique áreas problemáticas
Ajuste o orçamento do próximo mês
Defina uma meta financeira
:::

:::warning
**Não pule isso!** A vida muda, e seu orçamento deve mudar junto.
:::

:::expandable Apps de Orçamento para Experimentar
**Opções Gratuitas:**
- Mobills - Completo e brasileiro
- Organizze - Fácil de usar
- GuiaBolso - Sincroniza com bancos
- Google Planilhas - Abordagem DIY

**Dica:** O melhor app é aquele que você vai checar semanalmente!
:::`,
        },
        type: 'content',
      },
    ],
    quiz: [
      {
        id: 'q3-1',
        question: {
          en: 'In the 50/30/20 rule, what percentage should go to savings?',
          pt: 'Na regra 50/30/20, qual porcentagem deve ir para poupança?',
        },
        options: [
          { id: 'a', text: { en: '50%', pt: '50%' }, isCorrect: false },
          { id: 'b', text: { en: '30%', pt: '30%' }, isCorrect: false },
          { id: 'c', text: { en: '20%', pt: '20%' }, isCorrect: true },
          { id: 'd', text: { en: '10%', pt: '10%' }, isCorrect: false },
        ],
        explanation: {
          en: 'The 50/30/20 rule recommends 20% for savings, including emergency fund, retirement, and investments.',
          pt: 'A regra 50/30/20 recomenda 20% para poupança, incluindo fundo de emergência, aposentadoria e investimentos.',
        },
      },
      {
        id: 'q3-2',
        question: {
          en: 'Which category does rent/housing fall under in the 50/30/20 rule?',
          pt: 'Em qual categoria o aluguel/moradia se encaixa na regra 50/30/20?',
        },
        options: [
          { id: 'a', text: { en: 'Wants', pt: 'Desejos' }, isCorrect: false },
          { id: 'b', text: { en: 'Needs', pt: 'Necessidades' }, isCorrect: true },
          { id: 'c', text: { en: 'Savings', pt: 'Poupança' }, isCorrect: false },
          { id: 'd', text: { en: 'Investments', pt: 'Investimentos' }, isCorrect: false },
        ],
        explanation: {
          en: 'Housing is a need - something you must have to survive. It falls under the 50% needs category.',
          pt: 'Moradia é uma necessidade - algo que você precisa para sobreviver. Ela se encaixa na categoria de 50% das necessidades.',
        },
      },
      {
        id: 'q3-3',
        question: {
          en: 'What is the purpose of the envelope method?',
          pt: 'Qual é o propósito do método dos envelopes?',
        },
        options: [
          { id: 'a', text: { en: 'To make spending tangible and real', pt: 'Tornar os gastos tangíveis e reais' }, isCorrect: true },
          { id: 'b', text: { en: 'To hide money from thieves', pt: 'Esconder dinheiro de ladrões' }, isCorrect: false },
          { id: 'c', text: { en: 'To earn interest on cash', pt: 'Ganhar juros sobre o dinheiro' }, isCorrect: false },
          { id: 'd', text: { en: 'To organize bills for payment', pt: 'Organizar contas para pagamento' }, isCorrect: false },
        ],
        explanation: {
          en: 'The envelope method uses physical cash to make spending feel more real. When the envelope is empty, you stop spending in that category.',
          pt: 'O método dos envelopes usa dinheiro físico para tornar os gastos mais reais. Quando o envelope esvazia, você para de gastar nessa categoria.',
        },
      },
    ],
  },
  {
    id: 'lesson-4',
    slug: 'emergency-funds',
    title: {
      en: 'Emergency Funds: Your Safety Net',
      pt: 'Fundo de Emergência: Sua Rede de Segurança',
    },
    description: {
      en: 'Learn why an emergency fund is your first financial priority and how to build one.',
      pt: 'Aprenda por que um fundo de emergência é sua primeira prioridade financeira e como construir um.',
    },
    estimatedMinutes: 10,
    xpReward: 100,
    currencyReward: 50,
    prerequisites: ['lesson-3'],
    sections: [
      {
        id: 'section-4-1',
        title: {
          en: 'Why You Need One',
          pt: 'Por Que Você Precisa de Um',
        },
        content: {
          en: `# 🛡️ Why You Need an Emergency Fund

Life is **unpredictable**. Without an emergency fund, unexpected expenses become **financial disasters**.

## Real Emergencies That Happen

| Emergency | Typical Cost |
|-----------|--------------|
| 🚗 Car breaks down | $500 - $3,000 |
| 🏥 Medical emergency | $1,000 - $10,000+ |
| 💼 Job loss | Months without income |
| 🏠 Home repair | $500 - $5,000+ |
| 📱 Phone/laptop dies | $200 - $1,500 |

:::stat 😰
**78% of Americans** live paycheck to paycheck. Don't be one of them!
:::

---

## Without an Emergency Fund 😱

When emergencies hit with no savings:

1. **Credit cards** → 20%+ interest → Debt spiral
2. **Payday loans** → 400%+ APR → Worse debt spiral  
3. **Borrow from family** → Relationship strain
4. **Skip bills** → Late fees, damaged credit

:::warning
Each "solution" creates **more problems** than it solves!
:::

---

## With an Emergency Fund 😌

When emergencies hit WITH savings:

:::checklist
Pay the expense
Rebuild the fund
Move on with life
Sleep peacefully at night
:::

:::keypoint
**An emergency fund turns a crisis into an inconvenience.**
:::`,
          pt: `# 🛡️ Por Que Você Precisa de um Fundo de Emergência

A vida é **imprevisível**. Sem um fundo de emergência, despesas inesperadas se tornam **desastres financeiros**.

## Emergências Reais Que Acontecem

| Emergência | Custo Típico |
|------------|--------------|
| 🚗 Carro quebra | R$1.000 - R$5.000 |
| 🏥 Emergência médica | R$2.000 - R$20.000+ |
| 💼 Perda de emprego | Meses sem renda |
| 🏠 Reparo da casa | R$1.000 - R$10.000+ |
| 📱 Celular/notebook quebra | R$500 - R$3.000 |

:::stat 😰
**A maioria dos brasileiros** não tem reserva para emergências. Não seja um deles!
:::

---

## Sem um Fundo de Emergência 😱

Quando emergências acontecem sem economias:

1. **Cartões de crédito** → Juros altos → Espiral de dívidas
2. **Empréstimos** → Juros abusivos → Pior espiral
3. **Pedir à família** → Tensão nos relacionamentos
4. **Pular contas** → Multas, crédito danificado

:::warning
Cada "solução" cria **mais problemas** do que resolve!
:::

---

## Com um Fundo de Emergência 😌

Quando emergências acontecem COM economias:

:::checklist
Pague a despesa
Reconstrua o fundo
Siga em frente com a vida
Durma em paz à noite
:::

:::keypoint
**Um fundo de emergência transforma uma crise em um inconveniente.**
:::`,
        },
        type: 'content',
      },
      {
        id: 'section-4-2',
        title: {
          en: 'How Much You Need',
          pt: 'Quanto Você Precisa',
        },
        content: {
          en: `# 💰 How Much Do You Need?

## The 3 Levels

### 🌱 Level 1: Starter Fund
:::stat $1,000
Cover small emergencies while paying off debt
:::
**Timeline:** 1-3 months

### 🌿 Level 2: Basic Fund
:::stat 3 Months of Expenses
Handle job loss or major emergency
:::
**Timeline:** 6-12 months to build

### 🌳 Level 3: Full Fund
:::stat 6 Months of Expenses
Maximum security and peace of mind
:::
**Timeline:** 1-2 years to build

---

## Your Number Depends On...

| Factor | Lower Need (3 mo) | Higher Need (6+ mo) |
|--------|-------------------|---------------------|
| Job stability | Stable career | Freelance/contract |
| Income sources | Multiple | Single |
| Dependents | None | Family |
| Health | Good | Chronic conditions |
| Home | Renting | Owner (repairs!) |

:::example
**Calculate Yours:**
\`\`\`
Monthly Expenses × Months = Goal

Example:
$3,000/month × 3 months = $9,000 (Basic)
$3,000/month × 6 months = $18,000 (Full)
\`\`\`
:::

:::tip
Start with Level 1 ($1,000) as fast as possible, then work toward Level 2 and 3!
:::`,
          pt: `# 💰 Quanto Você Precisa?

## Os 3 Níveis

### 🌱 Nível 1: Fundo Inicial
:::stat R$2.000
Cobrir pequenas emergências enquanto paga dívidas
:::
**Prazo:** 1-3 meses

### 🌿 Nível 2: Fundo Básico
:::stat 3 Meses de Despesas
Lidar com perda de emprego ou emergência maior
:::
**Prazo:** 6-12 meses para construir

### 🌳 Nível 3: Fundo Completo
:::stat 6 Meses de Despesas
Máxima segurança e paz de mente
:::
**Prazo:** 1-2 anos para construir

---

## Seu Número Depende De...

| Fator | Menor (3 meses) | Maior (6+ meses) |
|-------|-----------------|------------------|
| Estabilidade | Carreira estável | Freelance |
| Fontes de renda | Múltiplas | Única |
| Dependentes | Nenhum | Família |
| Saúde | Boa | Condições crônicas |
| Moradia | Aluguel | Proprietário |

:::example
**Calcule o Seu:**
\`\`\`
Despesas Mensais × Meses = Meta

Exemplo:
R$4.000/mês × 3 meses = R$12.000 (Básico)
R$4.000/mês × 6 meses = R$24.000 (Completo)
\`\`\`
:::

:::tip
Comece com Nível 1 (R$2.000) o mais rápido possível, depois trabalhe para Níveis 2 e 3!
:::`,
        },
        type: 'content',
      },
      {
        id: 'section-4-3',
        title: {
          en: 'Build It Fast',
          pt: 'Construa Rápido',
        },
        content: {
          en: `# ⚡ Build Your Fund Fast

## Where to Keep It

Your emergency fund should be:

:::checklist
✅ Accessible — Get it within 1-2 days
✅ Safe — No risk of losing value
✅ Separate — Not mixed with spending money
:::

**Best options:**
1. 🏆 High-yield savings account (best!)
2. 💰 Money market account
3. 🏦 Regular savings account (okay)

:::warning
**NOT recommended:**
- Checking account (too easy to spend)
- Investments (too risky for emergencies)
- Cash at home (no interest, theft risk)
:::

---

## 4 Ways to Build It Faster

### 1. Automate It 🤖
:::keypoint
Set up automatic transfers on payday. Even **$25/week = $1,300/year!**
:::

### 2. Save Windfalls 🎁
Put these directly into your fund:
- Tax refunds
- Work bonuses
- Birthday money
- Sold items

### 3. Temporary Cuts ✂️
Short-term sacrifices:
- Pause subscriptions for 3 months
- Pack lunch instead of buying
- Skip dining out for a month

### 4. Side Hustle 💪
Extra income dedicated to the fund:
- Freelancing
- Selling unused items
- Part-time gig

---

:::keypoint
## Remember: This is Priority #1!

Before investing, before extra debt payments, before anything else: **build your emergency fund.**

It's not exciting, but it's the **foundation** of financial security.
:::`,
          pt: `# ⚡ Construa Seu Fundo Rápido

## Onde Guardar

Seu fundo de emergência deve ser:

:::checklist
✅ Acessível — Conseguir em 1-2 dias
✅ Seguro — Sem risco de perder valor
✅ Separado — Não misturado com dinheiro de gastos
:::

**Melhores opções:**
1. 🏆 Poupança com bom rendimento (melhor!)
2. 💰 CDB com liquidez diária
3. 🏦 Tesouro Selic

:::warning
**NÃO recomendado:**
- Conta corrente (muito fácil gastar)
- Investimentos arriscados (volatilidade)
- Dinheiro em casa (sem rendimento, risco)
:::

---

## 4 Formas de Construir Mais Rápido

### 1. Automatize 🤖
:::keypoint
Configure transferências automáticas no dia do pagamento. Mesmo **R$50/semana = R$2.600/ano!**
:::

### 2. Poupe Extras 🎁
Coloque diretamente no fundo:
- Restituição do IR
- Bônus do trabalho
- Dinheiro de presente
- Itens vendidos

### 3. Cortes Temporários ✂️
Sacrifícios de curto prazo:
- Pausar assinaturas por 3 meses
- Levar marmita em vez de comprar
- Pular restaurantes por um mês

### 4. Renda Extra 💪
Renda adicional dedicada ao fundo:
- Freelancing
- Vender itens não usados
- Trabalho de meio período

---

:::keypoint
## Lembre-se: Esta é a Prioridade #1!

Antes de investir, antes de pagar dívidas extras, antes de qualquer coisa: **construa seu fundo de emergência.**

Não é empolgante, mas é a **base** da segurança financeira.
:::`,
        },
        type: 'content',
      },
    ],
    quiz: [
      {
        id: 'q4-1',
        question: {
          en: 'What is the recommended size for a basic emergency fund?',
          pt: 'Qual é o tamanho recomendado para um fundo de emergência básico?',
        },
        options: [
          { id: 'a', text: { en: '1 month of expenses', pt: '1 mês de despesas' }, isCorrect: false },
          { id: 'b', text: { en: '3 months of expenses', pt: '3 meses de despesas' }, isCorrect: true },
          { id: 'c', text: { en: '1 year of expenses', pt: '1 ano de despesas' }, isCorrect: false },
          { id: 'd', text: { en: '$100', pt: 'R$100' }, isCorrect: false },
        ],
        explanation: {
          en: 'A basic emergency fund should cover 3 months of expenses, allowing you to handle job loss or major emergencies.',
          pt: 'Um fundo de emergência básico deve cobrir 3 meses de despesas, permitindo que você lide com perda de emprego ou emergências maiores.',
        },
      },
      {
        id: 'q4-2',
        question: {
          en: 'Where is the BEST place to keep your emergency fund?',
          pt: 'Qual é o MELHOR lugar para guardar seu fundo de emergência?',
        },
        options: [
          { id: 'a', text: { en: 'Under your mattress', pt: 'Debaixo do colchão' }, isCorrect: false },
          { id: 'b', text: { en: 'In stocks', pt: 'Em ações' }, isCorrect: false },
          { id: 'c', text: { en: 'High-yield savings account', pt: 'Conta poupança com bom rendimento' }, isCorrect: true },
          { id: 'd', text: { en: 'Checking account', pt: 'Conta corrente' }, isCorrect: false },
        ],
        explanation: {
          en: 'A high-yield savings account is accessible, safe, and separate from your spending money while earning some interest.',
          pt: 'Uma conta poupança com bom rendimento é acessível, segura e separada do seu dinheiro de gastos enquanto rende algum juro.',
        },
      },
      {
        id: 'q4-3',
        question: {
          en: 'An emergency fund turns a crisis into...',
          pt: 'Um fundo de emergência transforma uma crise em...',
        },
        options: [
          { id: 'a', text: { en: 'A bigger crisis', pt: 'Uma crise maior' }, isCorrect: false },
          { id: 'b', text: { en: 'An opportunity', pt: 'Uma oportunidade' }, isCorrect: false },
          { id: 'c', text: { en: 'An inconvenience', pt: 'Um inconveniente' }, isCorrect: true },
          { id: 'd', text: { en: 'A vacation', pt: 'Férias' }, isCorrect: false },
        ],
        explanation: {
          en: 'With an emergency fund, unexpected expenses become manageable inconveniences rather than financial disasters.',
          pt: 'Com um fundo de emergência, despesas inesperadas se tornam inconvenientes gerenciáveis em vez de desastres financeiros.',
        },
      },
    ],
  },
  {
    id: 'lesson-5',
    slug: 'the-power-of-compound-interest',
    title: {
      en: 'The Power of Compound Interest',
      pt: 'O Poder dos Juros Compostos',
    },
    description: {
      en: 'Discover why Einstein called compound interest "the eighth wonder of the world" and how it can work for you.',
      pt: 'Descubra por que Einstein chamou os juros compostos de "a oitava maravilha do mundo" e como eles podem trabalhar para você.',
    },
    estimatedMinutes: 15,
    xpReward: 150,
    currencyReward: 75,
    prerequisites: ['lesson-4'],
    sections: [
      {
        id: 'section-5-1',
        title: {
          en: 'What Is It?',
          pt: 'O Que São?',
        },
        content: {
          en: `# ✨ What is Compound Interest?

> "Compound interest is the eighth wonder of the world. He who understands it, earns it. He who doesn't, pays it." 
> — **Albert Einstein**

## Simple vs Compound Interest

### Simple Interest 📉
You earn interest only on your **original investment**.

:::example
**$1,000 at 10% simple interest:**
- Year 1: $1,000 + $100 = $1,100
- Year 2: $1,000 + $100 = $1,200
- Year 3: $1,000 + $100 = $1,300

Same $100 every year.
:::

### Compound Interest 📈
You earn interest on your original investment **AND** on the interest already earned!

:::example
**$1,000 at 10% compound interest:**
- Year 1: $1,000 + $100 = $1,100
- Year 2: $1,100 + $110 = $1,210
- Year 3: $1,210 + $121 = $1,331

Interest grows each year!
:::

---

## The Magic: Interest on Interest 🪄

:::stat After 30 years at 10%:
Simple: **$4,000** vs Compound: **$17,449**
:::

:::keypoint
That's **4x more money**, just from letting interest earn more interest!
:::`,
          pt: `# ✨ O Que São Juros Compostos?

> "Os juros compostos são a oitava maravilha do mundo. Quem entende, ganha. Quem não entende, paga."
> — **Albert Einstein**

## Juros Simples vs Compostos

### Juros Simples 📉
Você ganha juros apenas sobre seu **investimento original**.

:::example
**R$1.000 a 10% de juros simples:**
- Ano 1: R$1.000 + R$100 = R$1.100
- Ano 2: R$1.000 + R$100 = R$1.200
- Ano 3: R$1.000 + R$100 = R$1.300

Mesmos R$100 todo ano.
:::

### Juros Compostos 📈
Você ganha juros sobre seu investimento original **E** sobre os juros já ganhos!

:::example
**R$1.000 a 10% de juros compostos:**
- Ano 1: R$1.000 + R$100 = R$1.100
- Ano 2: R$1.100 + R$110 = R$1.210
- Ano 3: R$1.210 + R$121 = R$1.331

Os juros crescem cada ano!
:::

---

## A Mágica: Juros Sobre Juros 🪄

:::stat Após 30 anos a 10%:
Simples: **R$4.000** vs Composto: **R$17.449**
:::

:::keypoint
São **4x mais dinheiro**, apenas por deixar os juros renderem mais juros!
:::`,
        },
        type: 'content',
      },
      {
        id: 'section-5-2',
        title: {
          en: 'The Rule of 72',
          pt: 'A Regra dos 72',
        },
        content: {
          en: `# 🔢 The Rule of 72

A quick way to estimate how long it takes your money to **double**:

:::stat 72 ÷ Interest Rate = Years to Double
:::

## Examples

| Interest Rate | Years to Double |
|---------------|-----------------|
| 2% | 36 years |
| 4% | 18 years |
| 6% | 12 years |
| 8% | 9 years |
| 10% | 7.2 years |
| 12% | 6 years |

---

## Real World Application 🌍

At **7% average** stock market return:

:::example
**$10,000 doubles every ~10 years:**

- Start: $10,000
- Year 10: $20,000
- Year 20: $40,000
- Year 30: $80,000
- Year 40: **$160,000**

Same $10,000. Zero additional investment. Just time!
:::

---

## The Dark Side: Debt ⚠️

The Rule of 72 works **against you** with debt:

:::warning
**Credit card at 24% APR:**
72 ÷ 24 = **3 years to double**

A $5,000 debt becomes $10,000 in just 3 years if unpaid!
:::

:::keypoint
This is why high-interest debt is a **financial emergency**. It compounds against you!
:::`,
          pt: `# 🔢 A Regra dos 72

Uma forma rápida de estimar quanto tempo leva para seu dinheiro **dobrar**:

:::stat 72 ÷ Taxa de Juros = Anos para Dobrar
:::

## Exemplos

| Taxa de Juros | Anos para Dobrar |
|---------------|------------------|
| 2% | 36 anos |
| 4% | 18 anos |
| 6% | 12 anos |
| 8% | 9 anos |
| 10% | 7,2 anos |
| 12% | 6 anos |

---

## Aplicação no Mundo Real 🌍

Com **7% de retorno médio** do mercado:

:::example
**R$10.000 dobra a cada ~10 anos:**

- Início: R$10.000
- Ano 10: R$20.000
- Ano 20: R$40.000
- Ano 30: R$80.000
- Ano 40: **R$160.000**

Os mesmos R$10.000. Zero investimento adicional. Apenas tempo!
:::

---

## O Lado Negro: Dívidas ⚠️

A Regra dos 72 trabalha **contra você** com dívidas:

:::warning
**Cartão de crédito a altos juros:**
Sua dívida pode dobrar em poucos meses!

Uma dívida de R$5.000 pode virar R$10.000 rapidamente se não paga!
:::

:::keypoint
É por isso que dívidas com juros altos são uma **emergência financeira**. Elas se acumulam contra você!
:::`,
        },
        type: 'content',
      },
      {
        id: 'section-5-3',
        title: {
          en: 'Time Is Everything',
          pt: 'Tempo é Tudo',
        },
        content: {
          en: `# ⏰ Time Is Your Greatest Asset

The most powerful variable in compound interest isn't the rate—it's **TIME**.

## The Story of Three Friends

Three friends, each saving for retirement at 7% return:

### 🌟 Early Emma
- Starts at age **25**
- Invests $200/month for **10 years only**
- Stops at 35, never invests again
- Total invested: **$24,000**

### 🕐 Middle Mike  
- Starts at age **35**
- Invests $200/month for **30 years**
- Keeps going until 65
- Total invested: **$72,000**

### 😰 Late Larry
- Starts at age **45**
- Invests $400/month for **20 years**
- Double the monthly amount!
- Total invested: **$96,000**

---

## At Age 65:

| Person | Total Invested | Final Value |
|--------|----------------|-------------|
| 🌟 Early Emma | $24,000 | **$245,000** |
| 🕐 Middle Mike | $72,000 | $227,000 |
| 😰 Late Larry | $96,000 | $197,000 |

:::stat 🤯 Emma invested the LEAST but ended up with the MOST!
That's the power of starting early.
:::

---

:::keypoint
## Your Takeaway

Every year you wait costs you more than just that year's savings—it costs you **decades of compound growth** on that money.

**The best time to start was yesterday.**

**The second best time is TODAY.**
:::`,
          pt: `# ⏰ Tempo é Seu Maior Ativo

A variável mais poderosa nos juros compostos não é a taxa—é o **TEMPO**.

## A História de Três Amigos

Três amigos, cada um poupando para aposentadoria com 7% de retorno:

### 🌟 Emma (Cedo)
- Começa aos **25 anos**
- Investe R$300/mês por **10 anos apenas**
- Para aos 35, nunca mais investe
- Total investido: **R$36.000**

### 🕐 Miguel (Meio)
- Começa aos **35 anos**
- Investe R$300/mês por **30 anos**
- Continua até os 65
- Total investido: **R$108.000**

### 😰 Lucas (Tarde)
- Começa aos **45 anos**
- Investe R$600/mês por **20 anos**
- O dobro do valor mensal!
- Total investido: **R$144.000**

---

## Aos 65 Anos:

| Pessoa | Total Investido | Valor Final |
|--------|-----------------|-------------|
| 🌟 Emma | R$36.000 | **R$367.000** |
| 🕐 Miguel | R$108.000 | R$340.000 |
| 😰 Lucas | R$144.000 | R$295.000 |

:::stat 🤯 Emma investiu MENOS mas terminou com MAIS!
Esse é o poder de começar cedo.
:::

---

:::keypoint
## Sua Lição

Cada ano que você espera custa mais do que apenas a economia daquele ano—custa **décadas de crescimento composto** sobre esse dinheiro.

**O melhor momento para começar foi ontem.**

**O segundo melhor momento é HOJE.**
:::`,
        },
        type: 'content',
      },
      {
        id: 'section-5-4',
        title: {
          en: 'Try It Yourself',
          pt: 'Experimente Você',
        },
        content: {
          en: `# 🧮 See It In Action!

Use the calculator below to visualize how **YOUR** money can grow!

## Try These Scenarios:

:::tip
**Scenario 1:** What if you start with $1,000 and add $100/month for 30 years?
:::

:::tip
**Scenario 2:** What if you increase your monthly contribution by just $50?
:::

:::tip
**Scenario 3:** What happens if you start 5 years earlier vs 5 years later?
:::

Play with the numbers and watch the magic of compound interest!`,
          pt: `# 🧮 Veja em Ação!

Use a calculadora abaixo para visualizar como **SEU** dinheiro pode crescer!

## Experimente Estes Cenários:

:::tip
**Cenário 1:** E se você começar com R$1.000 e adicionar R$200/mês por 30 anos?
:::

:::tip
**Cenário 2:** E se você aumentar sua contribuição mensal em apenas R$100?
:::

:::tip
**Cenário 3:** O que acontece se você começar 5 anos antes vs 5 anos depois?
:::

Brinque com os números e veja a mágica dos juros compostos!`,
        },
        type: 'interactive',
        interactiveType: 'compound-calculator',
      },
    ],
    quiz: [
      {
        id: 'q5-1',
        question: {
          en: 'What is compound interest?',
          pt: 'O que são juros compostos?',
        },
        options: [
          { id: 'a', text: { en: 'Interest only on the original investment', pt: 'Juros apenas sobre o investimento original' }, isCorrect: false },
          { id: 'b', text: { en: 'Interest on both the original investment AND accumulated interest', pt: 'Juros sobre o investimento original E os juros acumulados' }, isCorrect: true },
          { id: 'c', text: { en: 'A type of bank fee', pt: 'Um tipo de taxa bancária' }, isCorrect: false },
          { id: 'd', text: { en: 'Interest that decreases over time', pt: 'Juros que diminuem com o tempo' }, isCorrect: false },
        ],
        explanation: {
          en: 'Compound interest means you earn interest on your principal AND on any interest you\'ve already earned, creating exponential growth.',
          pt: 'Juros compostos significa que você ganha juros sobre seu principal E sobre qualquer juro que já ganhou, criando crescimento exponencial.',
        },
      },
      {
        id: 'q5-2',
        question: {
          en: 'Using the Rule of 72, how long does it take money to double at 8% interest?',
          pt: 'Usando a Regra dos 72, quanto tempo leva para o dinheiro dobrar a 8% de juros?',
        },
        options: [
          { id: 'a', text: { en: '8 years', pt: '8 anos' }, isCorrect: false },
          { id: 'b', text: { en: '9 years', pt: '9 anos' }, isCorrect: true },
          { id: 'c', text: { en: '12 years', pt: '12 anos' }, isCorrect: false },
          { id: 'd', text: { en: '72 years', pt: '72 anos' }, isCorrect: false },
        ],
        explanation: {
          en: 'Rule of 72: 72 ÷ 8 = 9 years. At 8% interest, your money doubles approximately every 9 years.',
          pt: 'Regra dos 72: 72 ÷ 8 = 9 anos. A 8% de juros, seu dinheiro dobra aproximadamente a cada 9 anos.',
        },
      },
      {
        id: 'q5-3',
        question: {
          en: 'In the example, why did Early Emma end up with more money despite investing less?',
          pt: 'No exemplo, por que Emma terminou com mais dinheiro apesar de investir menos?',
        },
        options: [
          { id: 'a', text: { en: 'She got a higher interest rate', pt: 'Ela conseguiu uma taxa de juros maior' }, isCorrect: false },
          { id: 'b', text: { en: 'She had more time for compound growth', pt: 'Ela teve mais tempo para crescimento composto' }, isCorrect: true },
          { id: 'c', text: { en: 'She invested in better stocks', pt: 'Ela investiu em ações melhores' }, isCorrect: false },
          { id: 'd', text: { en: 'The example is wrong', pt: 'O exemplo está errado' }, isCorrect: false },
        ],
        explanation: {
          en: 'Time is the most powerful factor in compound interest. Emma\'s money had 40 years to compound, while Larry\'s only had 20 years.',
          pt: 'Tempo é o fator mais poderoso nos juros compostos. O dinheiro de Emma teve 40 anos para se acumular, enquanto o de Lucas teve apenas 20 anos.',
        },
      },
    ],
  },
]

export function getLessonById(id: string): Lesson | undefined {
  return foundationLessons.find((lesson) => lesson.id === id)
}

export function getLessonBySlug(slug: string): Lesson | undefined {
  return foundationLessons.find((lesson) => lesson.slug === slug)
}

export function getNextLesson(currentId: string): Lesson | undefined {
  const currentIndex = foundationLessons.findIndex((lesson) => lesson.id === currentId)
  if (currentIndex === -1 || currentIndex === foundationLessons.length - 1) {
    return undefined
  }
  return foundationLessons[currentIndex + 1]
}
