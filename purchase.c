#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include "mongo.js"
#include "index.js"

struct User {
    char name[50];
    char password[50];
};

// Function to get user input from the console
void get_user_input(char *buffer, size_t size) {
    printf("Enter input: ");
    fgets(buffer, size, stdin);

    // Remove the newline character if present
    size_t len = strlen(buffer);
    if (len > 0 && buffer[len - 1] == '\n') {
        buffer[len - 1] = '\0';
    }
}

// Function to save user data to a file
void save_user_data(const struct User *user) {
    FILE *file = fopen("user_data.txt", "a"); // Open the file in append mode

    if (file != NULL) {
        fprintf(file, "%s,%s\n", user->name, user->password);
        fclose(file);
        printf("User data saved successfully.\n");
    } else {
        fprintf(stderr, "Error: Unable to open file for writing.\n");
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

}

// Function to handle the submit address action
void on_submit_address_clicked(struct buyer_transaction *transaction) {


    if (strlen(transaction->address) > 0) {

        printf("Address: %s\n", transaction->address);

        printf("Transaction closed.\n");
    } else {

        fprintf(stderr, "Too Short: You need to write your address.\n");
    }

}


int main() {
    // Get user input for name and password
    struct User user;
    get_user_input(user.name, sizeof(user.name));
    get_user_input(user.password, sizeof(user.password));

    // Save user data to a file
    save_user_data(&user); 

    // Initialize buyer_transaction 
    struct buyer_transaction transaction;
    init_buyer_transaction(&transaction, "John Smith", "transaction456");


    // Handle submit address action
    on_submit_address_clicked(&transaction);

    return 0;
}
