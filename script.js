class Operation {
  constructor(opType, amount = null, text = null) {
    this.opType = opType;
    this.amount = amount;
    this.text = text;
  }
}

class OperationSeq {
  constructor() {
    this.operations = [];
  }

  add(operation) {
    this.operations.push(operation);
  }

  apply(content) {
    let result = "";
    let index = 0;
    for (const op of this.operations) {
      switch (op.opType) {
        case "retain":
          result += content.substring(index, index + op.amount);
          index += op.amount;
          break;
        case "insert":
          result += op.text;
          break;
        case "delete":
          index += op.amount;
          break;
      }
    }
    result += content.substring(index);
    return result;
  }
}

const editor = document.getElementById("editor");
const insertBtn = document.getElementById("insertBtn");

insertBtn.addEventListener("click", function (event) {
  // Gather inputs from both groups
  const position1 = parseInt(document.getElementById("position1").value);
  const character1 = document.getElementById("character1").value;
  const position2 = parseInt(document.getElementById("position2").value);
  const character2 = document.getElementById("character2").value;

  // Validate input: basic validation for demo purposes
  if (
    (isNaN(position1) || character1.length === 0) &&
    (isNaN(position2) || character2.length === 0)
  ) {
    alert("Please enter valid positions and characters.");
    return;
  }

  // Assume operation for position1 comes before position2 for simplicity
  let operationSeq = new OperationSeq();
  if (!isNaN(position1) && character1.length > 0) {
    operationSeq.add(new Operation("retain", position1));
    operationSeq.add(new Operation("insert", null, character1));
  }
  if (!isNaN(position2) && character2.length > 0) {
    // Adjust position2 in case the first operation affects it
    const adjustedPosition2 = position1 < position2 ? position2 + 1 : position2;
    operationSeq.add(
      new Operation(
        "retain",
        adjustedPosition2 -
          (isNaN(position1) ? 0 : position1) -
          character1.length
      )
    );
    operationSeq.add(new Operation("insert", null, character2));
  }

  const transformedContent = operationSeq.apply(editor.innerText);
  editor.innerText = transformedContent;

  // Reset input fields
  document.getElementById("position1").value = "";
  document.getElementById("character1").value = "";
  document.getElementById("position2").value = "";
  document.getElementById("character2").value = "";
});
