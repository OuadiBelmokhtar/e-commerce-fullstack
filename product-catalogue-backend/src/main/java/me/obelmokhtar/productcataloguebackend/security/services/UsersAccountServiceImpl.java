package me.obelmokhtar.productcataloguebackend.security.services;

import me.obelmokhtar.productcataloguebackend.security.entities.Roles;
import me.obelmokhtar.productcataloguebackend.security.entities.Users;
import me.obelmokhtar.productcataloguebackend.security.repositories.RolesRepository;
import me.obelmokhtar.productcataloguebackend.security.repositories.UsersRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UsersAccountServiceImpl implements UsersAccountService {
    private UsersRepository usersRepository;
    private RolesRepository rolesRepository;
    private PasswordEncoder passwordEncoder;

    public UsersAccountServiceImpl(UsersRepository usersRepository, RolesRepository rolesRepository, PasswordEncoder passwordEncoder) {
        this.usersRepository = usersRepository;
        this.rolesRepository = rolesRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Users addNewUser(Users user) {
        // crypter le password
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return usersRepository.save(user);
    }

    @Override
    public Roles addNewRole(Roles role) {
        return rolesRepository.save(role);
    }

    @Override
    public void addRoleToUser(String roleName, String username) {
        // FAIS ATTENTION, si @Transactionnal n’est pas utilisée ds cette classe,
        // l’ajout ds la List ne sera pas exécuté (COMMITÉ) ds la BD (oui c’est testé).
        Users user = usersRepository.findByUsername(username);
        Roles role = rolesRepository.findByName(roleName);
        user.getRoles().add(role);
    }

    @Override
    public Users loadUserByUsername(String username) {
        return usersRepository.findByUsername(username);
    }

    @Override
    public List<Users> getAllUsers() {
        return usersRepository.findAll();
    }
}
