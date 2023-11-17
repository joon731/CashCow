#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <stdbool.h>

struct User {
    char name[50];
    char password[50];
};

// Function to get user input from the console with type check
void get_user_input(char *buffer, size_t size) {
    while (true) {
        printf("Enter %s: ", buffer);
        fgets(buffer, size, stdin);

        // Remove the newline character if present
        size_t len = strlen(buffer);
        if (len > 0 && buffer[len - 1] == '\n') {
            buffer[len - 1] = '\0';
        }

        if (strlen(buffer) > 0) {
            break; // Break the loop if the input is valid
        } else {
            printf("Invalid %s. Please try again.\n", buffer);
        }
    }
}

// Define buyer_transaction
struct buyer_transaction {
    char user_id[50];
    char tid[50];
    char address[200];
};

// Function to initialize the buyer_transaction 
void init_buyer_transaction(struct buyer_transaction *transaction, const char *user_id, const char *tid) {
    strncpy(transaction->user_id, user_id, sizeof(transaction->user_id) - 1);
    strncpy(transaction->tid, tid, sizeof(transaction->tid) - 1);
}

// Function to handle submit address action (not implemented in your provided code)
void on_submit_address_clicked(const struct buyer_transaction *transaction) {
    // Implement your logic here
    printf("Address submitted successfully.\n");
}

int main() {
    // Get user input for name and password
    struct User user;
    get_user_input(user.name, sizeof(user.name));
    get_user_input(user.password, sizeof(user.password));

    // Save user data to a file (removed for security reasons)
    // save_user_data(&user); 

    // Initialize buyer_transaction 
    struct buyer_transaction transaction;
    init_buyer_transaction(&transaction, "John Smith", "transaction456");

    // Handle submit address action
    on_submit_address_clicked(&transaction);

    return 0;
}
