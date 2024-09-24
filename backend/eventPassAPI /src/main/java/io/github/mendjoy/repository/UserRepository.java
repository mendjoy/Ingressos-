package io.github.mendjoy.repository;

import io.github.mendjoy.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    public boolean existsByEmail(String email);

    public boolean existsByUsername(String username);

}
