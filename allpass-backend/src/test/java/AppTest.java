import java.util.ArrayList;
import java.util.Random;
import java.util.UUID;

public class AppTest {

    public static void main(String[] args) {

        String query = "insert into data (id, account, pass, timestamp, user, username values) (";

        ArrayList<String> rows = new ArrayList<String>();
        for(int x=0; x < 100; x++) {
            String id = UUID.randomUUID().toString();
            String account = generateString(10);
            String timestamp = Integer.toString(x);
            String pass = generateString(32);
            String username = generateString(10);
            String user = "admin";
            rows.add("insert into data (id, account, pass, timestamp, user, username) values (\'"
                    + id + "\', \'"
                    + account + "\', \'"
                    + pass + "\', "
                    + timestamp + ", \'"
                    + user + "\', \'"
                    + username + "\');");
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