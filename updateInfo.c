#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void updateEmail(char* newEmail) {
    fputs("Email updated to:\n", stdout);
    fputs(newEmail, stdout);
    putchar('\n');
}

int main(int argc, char *argv[]) {
    if (argc == 2) {
        // Simulate the update-email endpoint
        char* newEmail = argv[1];
        updateEmail(newEmail);
    } else {
        fputs("Usage: ./your_program <newEmail>\n", stderr);
    }

    return 0;
}
