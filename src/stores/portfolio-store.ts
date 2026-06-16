import { create } from 'zustand'
import type { PortfolioWithHoldings, StockQuote, TradeType, PortfolioHolding } from '@/types'

type PortfolioState = {
  portfolio: PortfolioWithHoldings | null
  watchlist: string[]
  stockQuotes: Record<string, StockQuote>
  isLoading: boolean
}

type PortfolioActions = {
  setPortfolio: (portfolio: PortfolioWithHoldings | null) => void
  updateQuotes: (quotes: StockQuote[]) => void
  addToWatchlist: (symbol: string) => void
  removeFromWatchlist: (symbol: string) => void
  executeTrade: (
    type: TradeType,
    symbol: string,
    quantity: number,
    price: number
  ) => void
  calculateTotalValue: () => number
  calculateTotalReturn: () => number
}

export const usePortfolioStore = create<PortfolioState & PortfolioActions>()(
  (set, get) => ({
    portfolio: null,
    watchlist: ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA'],
    stockQuotes: {},
    isLoading: true,

    setPortfolio: (portfolio: PortfolioWithHoldings | null) =>
      set({ portfolio, isLoading: false }),

    updateQuotes: (quotes: StockQuote[]) =>
      set((state) => ({
        stockQuotes: {
          ...state.stockQuotes,
          ...quotes.reduce(
            (acc: Record<string, StockQuote>, quote: StockQuote) => ({ ...acc, [quote.symbol]: quote }),
            {}
          ),
        },
      })),

    addToWatchlist: (symbol: string) =>
      set((state) => ({
        watchlist: state.watchlist.includes(symbol)
          ? state.watchlist
          : [...state.watchlist, symbol],
      })),

    removeFromWatchlist: (symbol: string) =>
      set((state) => ({
        watchlist: state.watchlist.filter((s: string) => s !== symbol),
      })),

    executeTrade: (type: TradeType, symbol: string, quantity: number, price: number) =>
      set((state) => {
        if (!state.portfolio) return state

        const totalValue = quantity * price
        const portfolio = { ...state.portfolio }

        if (type === 'BUY') {
          if (Number(portfolio.cashBalance) < totalValue) {
            return state
          }

          portfolio.cashBalance = (
            Number(portfolio.cashBalance) - totalValue
          ) as unknown as typeof portfolio.cashBalance

          const existingHolding = portfolio.holdings.find(
            (h: PortfolioHolding) => h.symbol === symbol
          )
          
          if (existingHolding) {
            const newQuantity = Number(existingHolding.quantity) + quantity
            const newAvgCost =
              (Number(existingHolding.avgCost) * Number(existingHolding.quantity) +
                price * quantity) /
              newQuantity

            portfolio.holdings = portfolio.holdings.map((h: PortfolioHolding) =>
              h.symbol === symbol
                ? {
                    ...h,
                    quantity: newQuantity as unknown as typeof h.quantity,
                    avgCost: newAvgCost as unknown as typeof h.avgCost,
                  }
                : h
            )
          } else {
            portfolio.holdings = [
              ...portfolio.holdings,
              {
                id: crypto.randomUUID(),
                portfolioId: portfolio.id,
                symbol,
                quantity: quantity as unknown as typeof portfolio.holdings[0]['quantity'],
                avgCost: price as unknown as typeof portfolio.holdings[0]['avgCost'],
                currentPrice: price as unknown as typeof portfolio.holdings[0]['currentPrice'],
                currentValue: totalValue as unknown as typeof portfolio.holdings[0]['currentValue'],
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            ]
          }
        } else {
          const existingHolding = portfolio.holdings.find(
            (h: PortfolioHolding) => h.symbol === symbol
          )
          
          if (!existingHolding || Number(existingHolding.quantity) < quantity) {
            return state
          }

          portfolio.cashBalance = (
            Number(portfolio.cashBalance) + totalValue
          ) as unknown as typeof portfolio.cashBalance

          const newQuantity = Number(existingHolding.quantity) - quantity
          
          if (newQuantity === 0) {
            portfolio.holdings = portfolio.holdings.filter(
              (h: PortfolioHolding) => h.symbol !== symbol
            )
          } else {
            portfolio.holdings = portfolio.holdings.map((h: PortfolioHolding) =>
              h.symbol === symbol
                ? { ...h, quantity: newQuantity as unknown as typeof h.quantity }
                : h
            )
          }
        }

        portfolio.trades = [
          ...portfolio.trades,
          {
            id: crypto.randomUUID(),
            portfolioId: portfolio.id,
            type,
            symbol,
            quantity: quantity as unknown as typeof portfolio.trades[0]['quantity'],
            price: price as unknown as typeof portfolio.trades[0]['price'],
            totalValue: totalValue as unknown as typeof portfolio.trades[0]['totalValue'],
            executedAt: new Date(),
          },
        ]

        return { portfolio }
      }),

    calculateTotalValue: () => {
      const { portfolio, stockQuotes } = get()
      if (!portfolio) return 0

      const holdingsValue = portfolio.holdings.reduce((total: number, holding: PortfolioHolding) => {
        const quote = stockQuotes[holding.symbol]
        const price = quote?.price || Number(holding.currentPrice) || 0
        return total + Number(holding.quantity) * price
      }, 0)

      return Number(portfolio.cashBalance) + holdingsValue
    },

    calculateTotalReturn: () => {
      const { portfolio } = get()
      if (!portfolio) return 0

      const totalValue = get().calculateTotalValue()
      const initialValue = Number(portfolio.initialCash)
      
      return ((totalValue - initialValue) / initialValue) * 100
    },
  })
)
