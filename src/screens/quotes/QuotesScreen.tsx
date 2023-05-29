import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Text, View, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import quotesStore from '../../stateStore/store';
import {Quote} from "./types";


const QuoteRow = observer(({ quote }: { quote: Quote }) => {

    const [flash, setFlash] = useState(false);
    const prevQuote = useRef(quote);
    const getQuoteColor = (percentChange: number) => {
        return percentChange <= 0 ? styles.greenText : styles.redText;
    };

    //в дальнейшем можно переписать под reanimated что бы была плавная анимация измененных позиций
    useEffect(() => {
        if (prevQuote.current.last !== quote.last ||
            prevQuote.current.highestBid !== quote.highestBid ||
            prevQuote.current.percentChange !== quote.percentChange) {
            setFlash(true);

            setTimeout(() => {
                setFlash(false);
            }, 500);
        }

        prevQuote.current = quote;
    }, [quote]);

    return (
        <View style={[
            styles.row,
            styles.quoteContainer,
            flash ? styles.flashBorder : {}
        ]}>
            <Text style={[styles.cell, styles.quoteName, getQuoteColor(quote.percentChange)]}>
                {quote.ticker}
            </Text>
            <Text style={[styles.cell, styles.quoteValue, getQuoteColor(quote.percentChange)]}>
                {`Last: ${quote.last}`}
            </Text>
            <Text style={[styles.cell, styles.quoteValue, getQuoteColor(quote.percentChange)]}>
                {`Highest Bid: ${quote.highestBid}`}
            </Text>
            <Text style={[styles.cell, styles.quoteValue, getQuoteColor(quote.percentChange)]}>
                {`Percent Change: ${quote.percentChange}`}
            </Text>
        </View>
    );
});

const QuotesScreen = observer(() => {
    useEffect(() => {
        const intervalId = setInterval(() => {
            quotesStore.fetchQuotes().catch((error) => {
                console.error('An error occurred:', error);
            });
        }, 5000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    if (quotesStore.loading) {
        return <ActivityIndicator />;
    }

    if (quotesStore.error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Error: {quotesStore.error}</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {quotesStore.quotes.map((quote) => (
                <QuoteRow key={quote.ticker} quote={quote} />
            ))}
        </ScrollView>
    );
});

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    errorContainer: {
        backgroundColor: 'red',
        padding: 10,
        marginBottom: 10,
    },
    errorText: {
        color: 'white',
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        marginBottom: 5,
    },
    cell: {
        flex: 1,
    },
    quoteName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    quoteValue: {
        fontSize: 14,
    },
    redText: {
        color: 'red',
    },
    greenText: {
        color: 'green',
    },
    quoteContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
    },
    flashBorder: {
        borderColor: 'gold',
        borderWidth: 3,
    },
});

export default QuotesScreen;
