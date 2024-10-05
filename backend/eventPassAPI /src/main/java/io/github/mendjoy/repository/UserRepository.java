package io.github.mendjoy.repository;

import io.github.mendjoy.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserRepository extends JpaRepository<User, Integer> {

    public boolean existsByEmail(String email);

    public boolean existsByUsername(String username);

    public User findByUsername(String username);

    public User findByEmail(String email);

}
