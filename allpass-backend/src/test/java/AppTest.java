import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.google.common.base.Charsets;
import com.google.common.io.Resources;
import java.util.ArrayList;
import java.util.Date;
import java.util.Random;
import java.util.UUID;

public class AppTest {

    public static void main(String[] args) {

        try {

//            String token = JWT.create()
//                    .withIssuer("CATSS")
//                    .withExpiresAt(new Date(System.currentTimeMillis() + 10000000 /*1 day in milliseconds*/))
//                    .sign(Algorithm.HMAC256(Resources.toString(Resources.getResource("newUserJwtSecret.key"), Charsets.UTF_8)));
//
//            System.out.println(token);
//
//            JWT.require(Algorithm.HMAC256(Resources.toString(Resources.getResource("newUserJwtSecret.key"), Charsets.UTF_8)))
//                    .withIssuer("CATSS")
//                    .build()
//                    .verify(token);

//            generateRecordsQuery();
            generateUsersQuery();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    static void generateRecordsQuery() {
        String query = "insert into data (id, account, pass, timestamp, user, username values) (";

        ArrayList<String> rows = new ArrayList<String>();
        for(int x=0; x < 500; x++) {
            String id = UUID.randomUUID().toString();
            String account = generateString(10);
            String timestamp = Integer.toString(x);
            String pass = generateString(32);
            String username = generateString(10);
            String user = "admin";
            rows.add("insert into data (id, account, pass, timestamp, user, username) values ('"
                    + id + "', '"
                    + account + "', '"
                    + pass + "', "
                    + timestamp + ", '"
                    + user + "', '"
                    + username + "');");
        }
        for(String str : rows) {
            System.out.print(str);
        }
    }

    static void generateUsersQuery() {
        String query = "insert into data (id, account, pass, timestamp, user, username values) (";

        ArrayList<String> rows = new ArrayList<String>();
        for(int x=0; x < 200; x++) {
            String id = UUID.randomUUID().toString();
            String username = generateString(10);
            String creator = "admin";
            String email = generateString(10);
            String timestamp = Integer.toString(x);
            String role = "ROLE_USER";
            String fname = generateString(10);
            String lname = generateString(10);
            String pass = generateString(32);
            rows.add("insert into users (id, username, creator, email, timestamp, role, fname, lname, pass) values ('"
                    + id + "', '"
                    + username + "', '"
                    + creator + "', '"
                    + email + "', "
                    + timestamp + ", '"
                    + role + "', '"
                    + fname + "', '"
                    + lname + "', '"
                    + pass + "');");
        }
        for(String str : rows) {
            System.out.print(str);
        }
    }

    static String generateString(int length) {
        int leftLimit = 97; // letter 'a'
        int rightLimit = 122; // letter 'z'
        int targetStringLength = length;
        Random random = new Random();

        String generatedString = random.ints(leftLimit, rightLimit + 1)
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();

        return generatedString;
    }

}