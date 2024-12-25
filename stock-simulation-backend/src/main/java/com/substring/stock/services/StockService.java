package com.substring.stock.services;

import com.substring.stock.models.BacktestingRequest;
import com.substring.stock.models.BacktestingResult;
import com.substring.stock.models.EducationalResource;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StockService {
	
	@Autowired
	BacktestingService backtestingService;

	public BacktestingResult backtestStrategy(BacktestingRequest request) {
		return backtestingService.runBacktest(request);
	}

	public List<EducationalResource> getEducationalResources() {
		return List.of(new EducationalResource("What is Algorithmic Trading?", "https://example.com/algorithms"),
				new EducationalResource("How to Analyze Stock Trends", "https://example.com/trends"),
				new EducationalResource("Beginner's Guide to Investing", "https://example.com/investing"));
	}
}
