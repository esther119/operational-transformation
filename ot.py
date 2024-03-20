class Operation: 
    def __init__(self, position, value, operation):
        self.position = position
        self.value = value 
        self.operation = operation #operation can only be insert/delete
    def __str__(self):
        return f'{self.operation} "{self.value}" at {self.position}'        

    def apply_transformation(self, other): 
        # one insert one delete or insert index that is before the other
        # double insert 
        if (self.operation == "delete" or other.operation == 'delete') or self.position < other.position: 
            return Operation(self.position, self.value, self.operation)
        if self.operation == 'insert': 
            return Operation(self.position+1, self.value, self.operation)
        # double delete 
        elif self.operation == 'delete': 
            return Operation(self.position-1, self.value, self.operation)
    
def apply_operation(text, operation): 
    if operation.operation == 'insert': 
        return text[:operation.position] + operation.value + text[operation.position:]
    elif operation.operation == 'delete':
        return text[:operation.position] + text[operation.position+1:]
    else: 
        print('invalid operation')

# Example usage:
op1 = Operation(1, 'e', 'insert')
op2 = Operation(4, '!', 'insert')

# Simulating concurrent operations
# Transform op2 against op1
op2_prime = op2.apply_transformation(op1)
print('op2 prime',op2_prime)

text = 'Hllo'
text = apply_operation(text, op1)
text = apply_operation(text, op2_prime)

print(text)
