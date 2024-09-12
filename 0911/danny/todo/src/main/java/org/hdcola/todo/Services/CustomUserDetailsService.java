package org.hdcola.todo.Services;

import org.hdcola.todo.Configs.CustomUserDetails;
import org.hdcola.todo.Entities.User;
import org.hdcola.todo.Repositories.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent()){
            return new CustomUserDetails(user.get());
        } else {
            throw new UsernameNotFoundException("User not found");
        }
    }
}
