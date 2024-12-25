package com.substring.stock.controllers;

import com.substring.stock.models.Portfolio;
import com.substring.stock.repositories.PortfolioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/portfolio")
@CrossOrigin(origins = "http://localhost:5173")
public class PortfolioController {

    @Autowired
    private PortfolioRepository portfolioRepository;

    @GetMapping("/{email}")
    public List<Portfolio> getUserPortfolio(@PathVariable String email) {
        return portfolioRepository.findByUserEmail(email);
    }

    @PostMapping("/addToPortfolio")
    public Portfolio addToPortfolio(@RequestBody Portfolio portfolio) {
        return portfolioRepository.save(portfolio);
    }
}

