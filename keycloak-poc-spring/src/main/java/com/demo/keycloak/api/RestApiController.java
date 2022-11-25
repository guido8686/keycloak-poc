package com.demo.keycloak.api;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class RestApiController {

    private final Logger log = LoggerFactory.getLogger(getClass());

    @GetMapping(value = "/test")
    public TestResponse test() {
        log.info("test request received...");
        return new TestResponse("Response from server");
    }

    public class TestResponse {

        private String message;

        public TestResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }

}