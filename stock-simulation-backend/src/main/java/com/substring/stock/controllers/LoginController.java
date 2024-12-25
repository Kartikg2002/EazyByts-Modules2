package com.substring.stock.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import com.substring.stock.jwt.JwtUtil;
import com.substring.stock.models.Login;
import com.substring.stock.repositories.LoginRepository;

@RestController
@RequestMapping("/login")
public class LoginController {

	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private LoginRepository loginRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private UserDetailsService userDetailsService;
	@Autowired
	private JwtUtil jwtUtil;

	@PostMapping("/save")
	public Boolean save(@RequestBody Login loginData) {
		loginData.setPassword(passwordEncoder.encode(loginData.getPassword()));
		Login data =  loginRepository.save(loginData);
		if(data!=null) {
			return true;
		}
		return false;
	}
	
	@GetMapping("/isTokenExpired/{token}")
	public Boolean isTokenExpired(@PathVariable("token") String token) {
		Boolean value = this.jwtUtil.isTokenExpired(token);
		return value;
	}
	
	@PostMapping("/check")
	public ResponseEntity<?> login(@RequestBody Login request) throws Exception {

		this.doAuthenticate(request.getUsername(), request.getPassword());

		UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
		String token = this.jwtUtil.generateToken(userDetails);
		
		return ResponseEntity.status(HttpStatus.CREATED).body(token);
	}

	private void doAuthenticate(String username, String password) {

		UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(username,
				password);
		try {
			authenticationManager.authenticate(authentication);
		} catch (BadCredentialsException e) {
			throw new BadCredentialsException(" Invalid Username or Password  !!");
		}

	}

//    @ExceptionHandler(BadCredentialsException.class)
//    public String exceptionHandler() {
//        return "Credentials Invalid !!";
//    }

}
