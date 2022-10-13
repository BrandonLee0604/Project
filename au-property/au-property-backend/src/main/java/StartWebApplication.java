import controller.TestController;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackageClasses = TestController.class)
public class StartWebApplication {
    public static void main(String[] args) {
        SpringApplication.run(StartWebApplication.class, args);
    }
}
