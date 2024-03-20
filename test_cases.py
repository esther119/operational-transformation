import unittest
from ot import Operation, apply_operation

class TestOperation(unittest.TestCase):
    def test_single_insert(self):
        text = 'Hllo'
        op = Operation(1, 'e', 'insert')
        text = apply_operation(text, op)
        self.assertEqual(text, 'Hello')

    def test_single_delete(self):
        text = 'Hello'
        op = Operation(1, '', 'delete')
        text = apply_operation(text, op)
        self.assertEqual(text, 'Hllo')

    def test_concurrent_inserts(self):
        text = 'Hlo'
        op1 = Operation(1, 'e', 'insert')
        op2 = Operation(3, 'l', 'insert')
        text = apply_operation(text, op1)
        text = apply_operation(text, op2)
        self.assertEqual(text, 'Hello')

    def test_concurrent_deletes(self):
        text = 'Hello'
        op1 = Operation(1, '', 'delete')
        op2 = Operation(3, '', 'delete')
        text = apply_operation(text, op1)
        text = apply_operation(text, op2)
        self.assertEqual(text, 'Hlo')

    def test_insert_then_delete(self):
        text = 'Hello'
        op1 = Operation(1, 'e', 'insert')
        op2 = Operation(2, '', 'delete')
        text = apply_operation(text, op1)
        text = apply_operation(text, op2)
        self.assertEqual(text, 'Hllo')

    def test_transform_inserts(self):
        op1 = Operation(1, 'e', 'insert')
        op2 = Operation(2, 'l', 'insert')
        transformed_op = op2.apply_transformation(op1)
        self.assertEqual(str(transformed_op), 'insert "l" at 3')

    def test_transform_deletes(self):
        op1 = Operation(1, '', 'delete')
        op2 = Operation(2, '', 'delete')
        transformed_op = op2.apply_transformation(op1)
        self.assertEqual(str(transformed_op), 'delete "" at 1')

    def test_transform_insert_delete(self):
        op1 = Operation(1, 'e', 'insert')
        op2 = Operation(2, '', 'delete')
        transformed_op = op2.apply_transformation(op1)
        self.assertEqual(str(transformed_op), 'insert "e" at 1')

if __name__ == '__main__':
    unittest.main()
