package com.substring.stock.controllers;

import com.substring.stock.models.Stock;
import com.substring.stock.models.BacktestingRequest;
import com.substring.stock.repositories.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import com.substring.stock.services.StockService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController
@RequestMapping("/api/stocks")
@CrossOrigin(origins = "http://localhost:5173")
public class StockController {

    private RestTemplate restTemplate=new RestTemplate();
	
    @Autowired
    private StockRepository stockRepository;
    @Autowired
    private StockService stockService;

    @GetMapping
    public List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }

    @PostMapping
    public Stock createStock(@RequestBody Stock stock) {
        return stockRepository.save(stock);
    }

    @GetMapping("/{symbol}")
    public Stock getStockBySymbol(@PathVariable String symbol) {
        return stockRepository.findBySymbol(symbol);
    }
    
    @GetMapping("/real-time/{symbol}")
    public String getRealTimeStockData(@PathVariable String symbol) {
        String apiKey = "a91f4feab5a5ba34aeef5fa22263f243";
        String url = "https://api.marketstack.com/v1/eod?access_key="+apiKey+"&symbols="+symbol;

        return restTemplate.getForObject(url, String.class);
    }
    
    // Backtesting endpoint
    @PostMapping("/backtest")
    public ResponseEntity<?> backtestStrategy(@RequestBody BacktestingRequest request) {
        return ResponseEntity.ok(stockService.backtestStrategy(request));
    }

    // Educational tools endpoint
    @GetMapping("/education")
    public ResponseEntity<?> getEducationalResources() {
        return ResponseEntity.ok(stockService.getEducationalResources());
    }
    
}


