package com.substring.stock.services;

import com.substring.stock.models.BacktestingRequest;
import com.substring.stock.models.BacktestingResult;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class BacktestingService {
	
	 public BacktestingResult runBacktest(BacktestingRequest request) {
	        // Example implementation using mock data
	        List<Double> historicalPrices = fetchHistoricalPrices(request.getStockSymbol());
	        double initialInvestment = request.getInitialInvestment();
	        double finalValue = simulateStrategy(historicalPrices, request.getStrategy());

	        BacktestingResult result = new BacktestingResult();
	        result.setInitialInvestment(initialInvestment);
	        result.setFinalValue(finalValue);
	        result.setProfitLoss(finalValue - initialInvestment);
	        result.setProfitPercentage((finalValue / initialInvestment - 1) * 100);
	        return result;
	    }

	    private List<Double> fetchHistoricalPrices(String stockSymbol) {
	        // Mock historical price data
	        return List.of(100.0, 102.0, 104.0, 106.0, 108.0);
	    }

	    private double simulateStrategy(List<Double> prices, String strategy) {
	        // Simulate a simple "buy-and-hold" strategy
	        if ("buy-and-hold".equalsIgnoreCase(strategy)) {
	            return prices.get(prices.size() - 1); // Final price
	        }
	        return prices.get(0); // Default case
	    }
}
