package com.substring.stock.repositories;

import com.substring.stock.models.Login;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoginRepository extends JpaRepository<Login, Long> {
    Login findByUsername(String username);
}


