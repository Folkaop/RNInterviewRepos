import { makeAutoObservable, runInAction } from "mobx"
import axios from "axios";
import {Quote} from "./types";



class QuotesStore {
    quotes: Quote[] = [];
    loading = true;
    error = false;

    constructor() {
        makeAutoObservable(this)
    }

    fetchQuotes = async () => {
        try {
            const response = await axios.get('https://poloniex.com/public?command=returnTicker');
            const data: Record<string, any> = response.data;
            runInAction(() => {
                this.quotes = Object.entries(data).map(([key, value]) => ({...value, ticker: key }));
                this.loading = false;
            });
        } catch (error) {
            runInAction(() => {
                this.error = true;
                this.loading = false;
            });
        }
    }
}

export default new QuotesStore();
