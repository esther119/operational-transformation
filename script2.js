class Operation {
  constructor(position, value, operation) {
    this.position = position;
    this.value = value;
    this.operation = operation; // operation can only be insert/delete
  }

  toString() {
    return `${this.operation} "${this.value}" at ${this.position}`;
  }

  applyTransformation(other) {
    // one insert one delete or insert index that is before the other
    // double insert
    if (
      this.operation === "delete" ||
      other.operation === "delete" ||
      this.position < other.position
    ) {
      return new Operation(this.position, this.value, this.operation);
    }
    if (this.operation === "insert") {
      return new Operation(this.position + 1, this.value, this.operation);
    }
    // double delete
    else if (this.operation === "delete") {
      return new Operation(this.position - 1, this.value, this.operation);
    }
  }
}

function applyOperation(text, operation) {
  if (operation.operation === "insert") {
    return (
      text.slice(0, operation.position) +
      operation.value +
      text.slice(operation.position)
    );
  } else if (operation.operation === "delete") {
    return (
      text.slice(0, operation.position) + text.slice(operation.position + 1)
    );
  } else {
    console.log("invalid operation");
  }
}
// test
// const operation1 = new Operation(1, "e", "insert");
// const operation2 = new Operation(4, "!", "insert");

// console.log("Operation 1:", operation1.toString());
// console.log("Operation 2:", operation2.toString());

// // Apply transformation and print the result
// const transformedOperation1 = operation1.applyTransformation(operation2);
// const transformedOperation2 = operation2.applyTransformation(operation1);

// console.log("Transformed Operation 1:", transformedOperation1.toString());
// console.log("Transformed Operation 2:", transformedOperation2.toString());

// // Test applyOperation function
// const text = "hllo";
// const newText1 = applyOperation(text, operation1);
// const newText2 = applyOperation(newText1, transformedOperation2);

// console.log("Original Text:", text);
// console.log("New Text after applying operations:", newText2);

const insertBtn = document.getElementById("insertBtn");
const editor = document.getElementById("editor");

insertBtn.addEventListener("click", function (event) {
  // Gather inputs from both groups
  const position1 = parseInt(document.getElementById("position1").value);
  const character1 = document.getElementById("character1").value;
  const position2 = parseInt(document.getElementById("position2").value);
  const character2 = document.getElementById("character2").value;
  let transformedText = "";

  // Validate input: basic validation for demo purposes
  if (
    (isNaN(position1) || character1.length === 0) &&
    (isNaN(position2) || character2.length === 0)
  ) {
    alert("Please enter valid positions and characters.");
    return;
  }

  // Assume operation for position1 comes before position2 for simplicity
  const operation1 = new Operation(position1, character1, "insert");
  const operation2 = new Operation(position2, character2, "insert");

  console.log("Operation 1:", operation1.toString());
  console.log("Operation 2:", operation2.toString());

  // Apply transformation and print the result
  const transformedOperation1 = operation1.applyTransformation(operation2);
  const transformedOperation2 = operation2.applyTransformation(operation1);

  console.log("Transformed Operation 1:", transformedOperation1.toString());
  console.log("Transformed Operation 2:", transformedOperation2.toString());

  // Test applyOperation function
  const text = editor.innerText;
  const newText1 = applyOperation(text, operation1);
  transformedText = applyOperation(newText1, transformedOperation2);

  console.log("Original Text:", text);
  console.log("New Text after applying operations:", transformedText);

  editor.innerText = transformedText;

  // Reset input fields
  document.getElementById("position1").value = "";
  document.getElementById("character1").value = "";
  document.getElementById("position2").value = "";
  document.getElementById("character2").value = "";
});
