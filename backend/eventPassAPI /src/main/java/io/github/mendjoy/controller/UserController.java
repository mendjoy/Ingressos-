package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public String getRoute() {
        System.out.println("Teste: entrou no método GET");
        return "ROTA OK"; // Esta mensagem deve aparecer quando você acessa a rota /user
    }
}

