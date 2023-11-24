#include <iostream>
using namespace std;
struct Node {
    int data;
    Node* next;
};

class LinkedList {
private:
    Node* head;
    Node* tail;

public:
    LinkedList() {
        head = nullptr;
        tail = nullptr;
    }

    // Function to insert a node at the end of the list
    void insert(int value) {
        Node* newNode = new Node;
        newNode->data = value;
        newNode->next = nullptr;

        if (head == nullptr) {
            head = newNode;
            tail = newNode;
        } else {
            tail->next = newNode;
            tail = newNode;
        }
    }

    // Function to display the elements in the list
    void display() {
        if (head == nullptr) {
            cout << "List is empty." << endl;
            return;
        }

        Node* current = head;
        while (current != nullptr) {
            cout << current->data << " ";
            current = current->next;
        }
        cout << endl;
    }

    // Function to get user input for 'n' integers and add them to the list
    void userInput(int n) {
        int value;
        cout << "Enter " << n << " integers:" << endl;
        for (int i = 0; i < n; ++i) {
            cin >> value;
            insert(value);
        }
    }
};

int main() {
    LinkedList list;
    int n;
    cout << "Enter the number of integers: ";
    cin >> n;

    list.userInput(n);
    cout << "Elements in the list: ";
    list.display();

    return 0;
}
