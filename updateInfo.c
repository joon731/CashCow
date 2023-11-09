#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "index.js"

void updateEmail(char* newEmail) {

    printf("Email updated to: %s\n", newEmail);
}

int main(int argc, char *argv[]) {
    if (argc == 2) {
        // Simulate the update-email endpoint
        char* newEmail = argv[1];
        updateEmail(newEmail);
    } else {
        printf("Usage: %s <newEmail>\n", argv[0]);
    }

    return 0;
}
