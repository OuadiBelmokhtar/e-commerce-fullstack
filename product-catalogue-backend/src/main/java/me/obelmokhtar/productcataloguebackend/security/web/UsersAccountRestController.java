package me.obelmokhtar.productcataloguebackend.security.web;

import lombok.Data;
import me.obelmokhtar.productcataloguebackend.security.entities.Roles;
import me.obelmokhtar.productcataloguebackend.security.entities.Users;
import me.obelmokhtar.productcataloguebackend.security.services.UsersAccountService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UsersAccountRestController {
    private UsersAccountService usersAccountService;

    public UsersAccountRestController(UsersAccountService usersAccountService) {
        this.usersAccountService = usersAccountService;
    }

    @PostMapping(path = "/users")
    public Users addUser(@RequestBody Users users) {
        return usersAccountService.addNewUser(users);
    }

    @PostMapping(path = "/roles")
    public Roles addRole(@RequestBody Roles role) {
        return usersAccountService.addNewRole(role);
    }

    @PostMapping(path = "addRoleToUser")
    public void addRoleToUser(@RequestBody UserRoleForm userRoleForm) {
        usersAccountService.addRoleToUser(userRoleForm.getRoleName(), userRoleForm.getUsername());
    }

    @GetMapping(path = "/users")
    public List<Users> getAllUsers() {
        return usersAccountService.getAllUsers();
    }
}

@Data
class UserRoleForm {
    private String username;
    private String roleName;
}
