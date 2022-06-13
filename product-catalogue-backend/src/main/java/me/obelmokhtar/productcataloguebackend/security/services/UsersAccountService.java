package me.obelmokhtar.productcataloguebackend.security.services;

import me.obelmokhtar.productcataloguebackend.security.entities.Roles;
import me.obelmokhtar.productcataloguebackend.security.entities.Users;
import me.obelmokhtar.productcataloguebackend.security.repositories.UsersRepository;

import java.util.List;

public interface UsersAccountService {
    Users addNewUser(Users user);
    Roles addNewRole(Roles role);
    void addRoleToUser(String roleName, String username);
    Users loadUserByUsername(String username);
    List<Users> getAllUsers();
}
