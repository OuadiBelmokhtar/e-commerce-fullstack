package me.obelmokhtar.productcataloguebackend.security.config;

public class JwtUtil {
    // clef privée(mot de passe) utilisé lors de la génération de la signature(crypter) du JWT avant de l'envoyer au client.
    // Ainsi que lors de la vérification de la signature(décrypter) du JWT lors de la reception d'une requete client.
    public static final String JWT_SIGN_SECRET ="mySecret4321";
    public static final String JWT_HEADER_NAME="Authorization";
    // la liste des roles comme définit ds la BD
    public static enum ROLES{
        ADMIN, USER
    }
}
