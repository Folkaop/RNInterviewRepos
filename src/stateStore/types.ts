interface QuoteData {
    ticker: string;
    last: number;
    highestBid: number;
    percentChange: number;
}

export interface Quote extends QuoteData {
    ticker: string;
    last: number;
    highestBid: number;
    percentChange: number;
}
