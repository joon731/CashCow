#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <stdbool.h>
#include <unistd.h>
#include <ctype.h>

struct User {
    char name[50];
    char password[50];
};

void get_user_input(char *buffer, size_t size, bool alphanumeric) {
    while (true) {
        puts("Enter user input: ");
        fgets(buffer, size, stdin);

        size_t len = strlen(buffer);
        if (len > 0 && buffer[len - 1] == '\n') {
            buffer[len - 1] = '\0';
        }

        bool valid = true;
        for (size_t i = 0; i < len - 1; i++) {
            if (alphanumeric && !isalnum(buffer[i])) {
                valid = false;
                break;
            }
        }

        if (valid) {
            break;
        } else {
            puts("Invalid input. Please try again.");
        }
    }
}

void get_password(char *buffer, size_t size) {
    char *password = getpass("Enter password: ");
    strncpy(buffer, password, size - 1);
    buffer[size - 1] = '\0';
}

struct buyer_transaction {
    char user_id[50];
    char tid[50];
    char address[200];
};

void init_buyer_transaction(struct buyer_transaction *transaction, const char *user_id, const char *tid) {
    size_t user_id_len = strlen(user_id);
    size_t tid_len = strlen(tid);

    if (user_id_len < sizeof(transaction->user_id) && tid_len < sizeof(transaction->tid)) {
        strncpy(transaction->user_id, user_id, sizeof(transaction->user_id) - 1);
        transaction->user_id[sizeof(transaction->user_id) - 1] = '\0';

        strncpy(transaction->tid, tid, sizeof(transaction->tid) - 1);
        transaction->tid[sizeof(transaction->tid) - 1] = '\0';
    } else {
        puts("Invalid input for user_id or tid.");
    }
}

int main() {
    struct User user;
    get_user_input(user.name, sizeof(user.name), true); // Alphanumeric check
    get_password(user.password, sizeof(user.password));

    struct buyer_transaction transaction;
    init_buyer_transaction(&transaction, "JohnSmith123", "transaction456");

    memset(user.password, 0, sizeof(user.password));

    return 0;
}
