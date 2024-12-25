package com.substring.stock.models;

public class EducationalResource {
    private String title;
    private String url;
    
	public EducationalResource(String title, String url) {
		this.title = title;
		this.url = url;
	}
	
	public String getTitle() {
		return title;
	}
	
	public String getUrl() {
		return url;
	}
	
}

