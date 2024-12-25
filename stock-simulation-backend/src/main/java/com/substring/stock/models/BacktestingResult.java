package com.substring.stock.models;


public class BacktestingResult {
    private double initialInvestment;
    private double finalValue;
    private double profitLoss;
    private double profitPercentage;
    
	public double getInitialInvestment() {
		return initialInvestment;
	}
	public void setInitialInvestment(double initialInvestment) {
		this.initialInvestment = initialInvestment;
	}
	public double getFinalValue() {
		return finalValue;
	}
	public void setFinalValue(double finalValue) {
		this.finalValue = finalValue;
	}
	public double getProfitLoss() {
		return profitLoss;
	}
	public void setProfitLoss(double profitLoss) {
		this.profitLoss = profitLoss;
	}
	public double getProfitPercentage() {
		return profitPercentage;
	}
	public void setProfitPercentage(double profitPercentage) {
		this.profitPercentage = profitPercentage;
	}
    
}
